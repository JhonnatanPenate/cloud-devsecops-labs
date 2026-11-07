# Lab 17 · Cost Analysis and Optimization (FinOps Inform & Optimize)

| | |
|---|---|
| **Area** | FinOps |
| **Tag** | [`lab-17`](https://github.com/JhonnatanPenate/cloud-devsecops-labs/tree/lab-17) |
| **Course** | Cloud Development II · ESEN · 2026 |

← [Back to the README](../../README.md)

## Goal
Explore AWS Cost Explorer with the course account, analyze a sample cost dataset with Python to find untagged resources and waste, and create a monthly budget with Terraform.

## What was built
- [`finops/analyze_costs.py`](../../finops/analyze_costs.py): pandas analysis of [`aws-cost-sample.csv`](../../finops/aws-cost-sample.csv) (total cost, cost by service, untagged resources, optimization candidates).
- [`finops-budget/`](../../finops-budget): AWS Budgets monthly budget with an 80% actual-spend alert.

## How to run
```bash
cd finops && python analyze_costs.py
cd ../finops-budget
terraform apply -var="alert_email=<your-email>"
```

## Result
Report of cost by service, untagged resources and waste candidates (orphan EBS volumes, an unused Elastic IP, an oversized RDS instance).

## Technical decisions
- Tagging is the base of cost attribution: untagged spend cannot be assigned to a team.
- Budgets alert on actual or forecasted spend before the bill arrives.

## Notes & lessons learned
- Cost Explorer can take up to 24 hours to show data after it is enabled.

---
[← Lab 16](lab-16.md) · [Lab 18 →](lab-18.md)
