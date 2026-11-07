# Lab 08 · Centralized Monitoring and Alerting

| | |
|---|---|
| **Area** | Infrastructure as Code |
| **Tag** | [`lab-08`](https://github.com/JhonnatanPenate/cloud-devsecops-labs/tree/lab-08) |
| **Course** | Cloud Development II · ESEN · 2026 |

← [Back to the README](../../README.md)

## Goal
Add email alerting with CloudWatch Alarms and SNS, and a central dashboard for the checkout service, then prove that a real alarm reaches the team inbox.

## What was built
- [`observability/alerting.tf`](../../observability/alerting.tf): SNS topic and email subscription.
- [`observability/alarms.tf`](../../observability/alarms.tf): error-rate and latency alarms.
- [`observability/dashboard.tf`](../../observability/dashboard.tf): dashboard with metrics and recent logs.
- [`scripts/trigger-alert-test.js`](../../scripts/trigger-alert-test.js): pushes error metrics to trigger the alarm.

## How to run
```bash
cd observability
terraform apply -var="alert_email=<your-email>"
# confirm the SNS subscription email
cd .. && node scripts/trigger-alert-test.js
```

## Result
The error alarm moved to `ALARM` and the notification arrived by email.

## Technical decisions
- Alarms notify through SNS so more channels can be added without changing the alarms.

## Notes & lessons learned
- The email subscription must be confirmed, or alarms fire without reaching anyone.

---
[← Lab 07](lab-07.md) · [Lab 09 →](lab-09.md)
