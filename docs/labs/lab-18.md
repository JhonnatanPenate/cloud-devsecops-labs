# Lab 18 · Cost Governance (FinOps Operate)

| | |
|---|---|
| **Area** | FinOps |
| **Tag** | [`lab-18`](https://github.com/JhonnatanPenate/cloud-devsecops-labs/tree/lab-18) |
| **Course** | Cloud Development II · ESEN · 2026 |

← [Back to the README](../../README.md)

## Goal
Automate cost governance: enable Cost Anomaly Detection, deploy a scheduled Lambda that audits S3 buckets for required cost tags and reports by email, and review the Cost Optimization pillar of the Well-Architected Framework.

## What was built
- [`lambda-governance/tag-compliance-checker.js`](../../lambda-governance/tag-compliance-checker.js): lists buckets and reports those missing `CostCenter` or `Environment`.
- [`governance/main.tf`](../../governance/main.tf): Lambda, least-privilege role (`s3:ListAllMyBuckets`, `s3:GetBucketTagging`, `sns:Publish` on one topic), daily EventBridge schedule, SNS topic and email subscription.
- Cost Anomaly Detection monitor for AWS services, and a Well-Architected workload review (console).

## How to run
```bash
cd governance
terraform apply -var="alert_email=<your-email>"
aws lambda invoke --function-name devsecops-lab-tag-compliance-checker --payload "{}" --cli-binary-format raw-in-base64-out response.json
terraform destroy -var="alert_email=<your-email>"
```

## Result
`{"nonCompliantCount":1}` and an email report listing the bucket without the required tags.

## Technical decisions
- Governance by code: the check runs every day without anyone opening Cost Explorer.
- The Lambda role can only read tags and publish to its own topic.

## Notes & lessons learned
- Final cleanup of Labs 17–18 destroyed both the governance stack and the budget; both Terraform states ended empty.

---
[← Lab 17](lab-17.md)
