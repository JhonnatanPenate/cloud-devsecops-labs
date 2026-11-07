# Lab 11 · Enterprise Integration with API Gateway

| | |
|---|---|
| **Area** | Event-driven |
| **Tag** | [`lab-11`](https://github.com/JhonnatanPenate/cloud-devsecops-labs/tree/lab-11) |
| **Course** | Cloud Development II · ESEN · 2026 |

← [Back to the README](../../README.md)

## Goal
Expose a public HTTP API with API Gateway backed by two Lambda functions: one receives orders and queues them in SQS, the other reports health.

## What was built
- [`lambda/create-order.js`](../../lambda/create-order.js) and [`lambda/health.js`](../../lambda/health.js).
- [`api-gateway/main.tf`](../../api-gateway/main.tf): HTTP API, routes `POST /orders` and `GET /health`, Lambda integrations and permissions, SQS queue, and a Lambda role allowed only to send to that queue.

## How to run
```bash
cd api-gateway && terraform apply
curl <api_url>/health
curl -X POST <api_url>/orders -H "Content-Type: application/json" -d '{"productId":"sku-100","amount":25}'
```

## Result
`201 Created` for a valid order, `400 Bad Request` when `productId` or `amount` is missing, and the message available in SQS.

## Technical decisions
- Validation happens at the edge, so invalid orders never reach the queue.
- The Lambda role only has `sqs:SendMessage` on its own queue.

---
[← Lab 10](lab-10.md) · [Lab 12 →](lab-12.md)
