# Lab 06 · Multi-environment Infrastructure

| | |
|---|---|
| **Area** | Infrastructure as Code |
| **Tag** | [`lab-06`](https://github.com/JhonnatanPenate/cloud-devsecops-labs/tree/lab-06) |
| **Course** | Cloud Development II · ESEN · 2026 |

← [Back to the README](../../README.md)

## Goal
Store Terraform state remotely in S3 with DynamoDB locking, and deploy three independent environments (dev, staging, prod) of the same module with workspaces.

## What was built
- [`backend-bootstrap/`](../../backend-bootstrap): versioned S3 bucket for state and the `terraform-locks` DynamoDB table.
- Remote backend configuration in [`environments/dev/`](../../environments/dev).
- Workspaces `default`/`staging`/`prod` mapped to environment names and per-environment settings (tags, criticality) through `locals`.

## How to run
```bash
cd backend-bootstrap && terraform init && terraform apply
cd ../environments/dev
terraform init
terraform workspace new staging
terraform workspace new prod
terraform workspace select prod && terraform apply
```

## Result
Three buckets and three websites from one module, each with its own state file under the same backend.

## Technical decisions
- Remote state + locking prevents two people from applying at the same time and corrupting state.
- Workspaces reuse the same code; only the parameters change between environments.

## Notes & lessons learned
- The IAM user needed an extra permission before the bootstrap could create the DynamoDB table.
- `time_sleep` resources wait for IAM propagation before dependent resources are created.

---
[← Lab 05](lab-05.md) · [Lab 07 →](lab-07.md)
