const { SQSClient, ReceiveMessageCommand, DeleteMessageCommand } = require('@aws-sdk/client-sqs');
const { SNSClient, PublishCommand } = require('@aws-sdk/client-sns');

const REGION = 'us-east-1';
// URL de la cola: terraform output (ej. orders_queue_url)
const QUEUE_URL = process.env.ORDERS_QUEUE_URL;
if (!QUEUE_URL) throw new Error('Define la variable de entorno ORDERS_QUEUE_URL');
const TOPIC_ARN = process.env.ORDER_EVENTS_TOPIC_ARN;
if (!TOPIC_ARN) throw new Error('Define la variable de entorno ORDER_EVENTS_TOPIC_ARN');

const sqsClient = new SQSClient({ region: REGION });
const snsClient = new SNSClient({ region: REGION });

async function main() {
  console.log('Revisando la cola de pedidos de la API...');

  const { Messages } = await sqsClient.send(new ReceiveMessageCommand({
    QueueUrl: QUEUE_URL,
    MaxNumberOfMessages: 10,
    WaitTimeSeconds: 10,
  }));

  if (!Messages || Messages.length === 0) {
    console.log('No llegaron pedidos nuevos.');
    return;
  }

  for (const msg of Messages) {
    const order = JSON.parse(msg.Body);

    await snsClient.send(new PublishCommand({
      TopicArn: TOPIC_ARN,
      Message: JSON.stringify(order),
      Subject: 'NuevoPedido',
    }));

    console.log(`[fan-out] Pedido ${order.orderId} republicado en SNS para todos los interesados.`);

    await sqsClient.send(new DeleteMessageCommand({
      QueueUrl: QUEUE_URL,
      ReceiptHandle: msg.ReceiptHandle,
    }));
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});