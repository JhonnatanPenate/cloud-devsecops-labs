# Lab 12 · Enterprise Messaging: SNS Fan-out

| | |
|---|---|
| **Area** | Event-driven |
| **Tag** | [`lab-12`](https://github.com/JhonnatanPenate/cloud-devsecops-labs/tree/lab-12) |
| **Course** | Cloud Development II · ESEN · 2026 |

← [Back to the README](../../README.md)

## Goal
Add a fan-out pattern with SNS on top of the API orders, delivering the same message to independent billing and shipping queues, and compare it with Kafka.

## What was built
- [`api-gateway/fanout.tf`](../../api-gateway/fanout.tf): `order-events` SNS topic, billing and shipping queues, subscriptions and queue policies.
- [`scripts/sns-fanout-consumer.js`](../../scripts/sns-fanout-consumer.js): reads the API queue and publishes to the topic.

## How to run
```bash
cd api-gateway && terraform apply
# set ORDERS_QUEUE_URL and ORDER_EVENTS_TOPIC_ARN from terraform output
node scripts/sns-fanout-consumer.js
# poll billing and shipping queues in the SQS console
terraform destroy
```

## Result
The same order arrives independently in both the billing and the shipping queue.

## Technical decisions
- SNS pushes one copy per subscriber (fan-out); Kafka keeps an ordered log that consumers read at their own pace.

---
[← Lab 11](lab-11.md) · [Lab 13 →](lab-13.md)
