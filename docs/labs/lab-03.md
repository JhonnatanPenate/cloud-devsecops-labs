# Lab 03 · Continuous Deployment with Infrastructure as Code

| | |
|---|---|
| **Area** | DevSecOps |
| **Tag** | [`lab-03`](https://github.com/JhonnatanPenate/cloud-devsecops-labs/tree/lab-03) |
| **Course** | Cloud Development II · ESEN · 2026 |

← [Back to the README](../../README.md)

## Goal
Build the repository from scratch: a static website on Amazon S3 defined with Terraform and deployed automatically by a GitHub Actions workflow on every push.

## What was built
- [`infra/`](../../infra): S3 bucket with static website hosting, public-access configuration, bucket policy and `index.html` upload.
- `.github/workflows/deploy.yml` (visible at tag `lab-03`): checkout, AWS credentials from GitHub Secrets, `terraform init` and `terraform apply`.
- Dedicated IAM user (`devsecops-lab-user`) with programmatic access; keys stored only as repository secrets.
- `.gitignore` that keeps Terraform state and providers out of version control.

## How to run
```bash
cd infra
terraform init
terraform apply -var="bucket_name=<unique-name>"
# open the website_url output
terraform destroy -var="bucket_name=<unique-name>"
```

## Result
Every push to `main` deploys the site; Terraform prints the `website_url` output.

## Technical decisions
- Terraform state can contain sensitive data, so it is never committed.
- Credentials live in GitHub Secrets, not in the workflow file.

## Notes & lessons learned
- The workflow later moved to [`docs/pipeline/deploy.yml`](../pipeline/deploy.yml) as a reference copy; it is not active in this consolidated repository.

---
[← Lab 02](lab-02.md) · [Lab 04 →](lab-04.md)
