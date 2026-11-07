const { SQSClient, ReceiveMessageCommand, DeleteMessageCommand } = require('@aws-sdk/client-sqs');

const REGION = 'us-east-1';
// URL de la cola: terraform output (ej. notifications_queue_url)
const QUEUE_URL = process.env.NOTIFICATIONS_QUEUE_URL;
if (!QUEUE_URL) throw new Error('Define la variable de entorno NOTIFICATIONS_QUEUE_URL');
const client = new SQSClient({ region: REGION });

async function main() {
  console.log('Revisando la cola de notificaciones...');
  const { Messages } = await client.send(new ReceiveMessageCommand({
    QueueUrl: QUEUE_URL,
    MaxNumberOfMessages: 10,
    WaitTimeSeconds: 10,
  }));

  if (!Messages || Messages.length === 0) {
    console.log('No llegaron mensajes nuevos. Intenten de nuevo en unos segundos.');
    return;
  }

  for (const msg of Messages) {
    const event = JSON.parse(msg.Body);
    const order = event.detail;
    console.log(`[notification-service] Enviando confirmación por correo para la orden ${order.orderId}`);

    await client.send(new DeleteMessageCommand({
      QueueUrl: QUEUE_URL,
      ReceiptHandle: msg.ReceiptHandle,
    }));
  }

  console.log(`Procesados ${Messages.length} mensaje(s).`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
