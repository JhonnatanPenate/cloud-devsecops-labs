# Lab 09 · Event-driven Architecture

| | |
|---|---|
| **Area** | Event-driven |
| **Tag** | [`lab-09`](https://github.com/JhonnatanPenate/cloud-devsecops-labs/tree/lab-09) |
| **Course** | Cloud Development II · ESEN · 2026 |

← [Back to the README](../../README.md)

## Goal
Publish `OrderCreated` events to an EventBridge bus, route them with two rules to two SQS queues, and process each copy with an independent consumer.

## What was built
- [`events/main.tf`](../../events/main.tf): custom bus, two rules, two targets, two queues and their queue policies.
- [`scripts/publish-order-event.js`](../../scripts/publish-order-event.js): publisher.
- [`scripts/poll-inventory.js`](../../scripts/poll-inventory.js) and [`scripts/poll-notifications.js`](../../scripts/poll-notifications.js): independent consumers.

## How to run
```bash
cd events && terraform apply
cd ..
node scripts/publish-order-event.js
# set INVENTORY_QUEUE_URL and NOTIFICATIONS_QUEUE_URL from terraform output
node scripts/poll-inventory.js
node scripts/poll-notifications.js
```

## Result
`Apply complete! Resources: 12 added`. One published event is consumed once by each service.

## Technical decisions
- Queues between EventBridge and the consumers decouple them and allow retries if a consumer is down.

## Notes & lessons learned
- EventBridge needs a few seconds to route the event before the queues are polled.

---
[← Lab 08](lab-08.md) · [Lab 10 →](lab-10.md)
