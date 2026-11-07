# Lab 10 · Distributed Enterprise Patterns: CQRS and Saga

| | |
|---|---|
| **Area** | Event-driven |
| **Tag** | [`lab-10`](https://github.com/JhonnatanPenate/cloud-devsecops-labs/tree/lab-10) |
| **Course** | Cloud Development II · ESEN · 2026 |

← [Back to the README](../../README.md)

## Goal
Add a CQRS read model in DynamoDB fed by a consumer, and an orchestrated Saga that compensates completed steps when a later step fails.

## What was built
- [`events/read-model.tf`](../../events/read-model.tf): `orders-read-model` DynamoDB table.
- [`scripts/update-read-model.js`](../../scripts/update-read-model.js) and [`scripts/query-orders.js`](../../scripts/query-orders.js): write and read sides.
- [`scripts/saga-orchestrator.js`](../../scripts/saga-orchestrator.js) and [`scripts/run-saga-demo.js`](../../scripts/run-saga-demo.js): reserve inventory → charge payment → confirm, with compensations.

## How to run
```bash
cd events && terraform apply
cd ..
node scripts/update-read-model.js
node scripts/query-orders.js
node scripts/run-saga-demo.js
cd events && terraform destroy
```

## Result
Orders appear in the read model; failed sagas release inventory and refund payment in reverse order.

## Technical decisions
- Reads are served from a model optimized for queries, separate from the write flow.
- Without distributed transactions, each step needs an explicit compensating action.

## Notes & lessons learned
- Final cleanup of Labs 9–10 destroys every event and read-model resource.

---
[← Lab 09](lab-09.md) · [Lab 11 →](lab-11.md)
