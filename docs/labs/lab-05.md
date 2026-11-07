# Lab 05 · Modular Infrastructure with Terraform

| | |
|---|---|
| **Area** | Infrastructure as Code |
| **Tag** | [`lab-05`](https://github.com/JhonnatanPenate/cloud-devsecops-labs/tree/lab-05) |
| **Course** | Cloud Development II · ESEN · 2026 |

← [Back to the README](../../README.md)

## Goal
Turn the S3 website from Labs 3–4 into a reusable, documented and versioned Terraform module.

## What was built
- [`modules/static-site/`](../../modules/static-site): the module (`main.tf`, `variables.tf`, `outputs.tf`) with its documented interface in [`README.md`](../../modules/static-site/README.md).
- [`environments/dev/`](../../environments/dev): an environment that consumes the module.
- Semantic versioning of the module (`v1.0.0`) with a Git tag.

## How to run
```bash
cd environments/dev
terraform init
terraform apply
terraform destroy
```

## Result
Same website as before, now created through `module "site"`: behavior unchanged, code organized for reuse.

## Technical decisions
- Separation of responsibilities: the module describes *how* a site is built, the environment decides *which* values to use.
- Inputs and outputs are documented so the module can be used without reading its internals.

## Notes & lessons learned
- The original semantic-version tags (`v1.0.0`, `v2.0.0`) were replaced by the `lab-XX` tags when the labs were consolidated into this repository.

---
[← Lab 04](lab-04.md) · [Lab 06 →](lab-06.md)
