# Lab 07 · Observability with OpenTelemetry and CloudWatch

| | |
|---|---|
| **Area** | Infrastructure as Code |
| **Tag** | [`lab-07`](https://github.com/JhonnatanPenate/cloud-devsecops-labs/tree/lab-07) |
| **Course** | Cloud Development II · ESEN · 2026 |

← [Back to the README](../../README.md)

## Goal
Instrument the Node.js checkout with OpenTelemetry to produce nested traces across three simulated services, and send logs and custom metrics to CloudWatch with IAM permissions managed by Terraform.

## What was built
- [`src/`](../../src): `orderService`, `inventoryService` and `paymentService` with parent/child spans.
- [`scripts/tracing.js`](../../scripts/tracing.js): OpenTelemetry Node SDK initialization.
- [`scripts/run-observed-checkout.js`](../../scripts/run-observed-checkout.js): runs orders and publishes logs and metrics to CloudWatch.
- [`observability/main.tf`](../../observability/main.tf): log group `/devsecops-lab/checkout-service` and CloudWatch permissions.

## How to run
```bash
cd observability && terraform init && terraform apply
cd .. && node scripts/run-observed-checkout.js
```

## Result
Spans printed for every order and log events visible in the CloudWatch log group.

## Technical decisions
- Traces explain *where* time is spent inside a request; metrics and logs explain *how often* and *why*.

## Notes & lessons learned
- Spans are exported in batches, so they appear a few seconds after the request finishes.

---
[← Lab 06](lab-06.md) · [Lab 08 →](lab-08.md)
