# Lab 16 · Packaging with Helm

| | |
|---|---|
| **Area** | Containers & Kubernetes |
| **Tag** | [`lab-16`](https://github.com/JhonnatanPenate/cloud-devsecops-labs/tree/lab-16) |
| **Course** | Cloud Development II · ESEN · 2026 |

← [Back to the README](../../README.md)

## Goal
Package the status-api manifests into a parameterized Helm chart, deploy dev and prod releases from the same chart, and practice upgrade and rollback.

## What was built
- [`status-api-chart/`](../../status-api-chart): `Chart.yaml`, templates for Deployment, Service, Ingress, HPA and PDB.
- [`values.yaml`](../../status-api-chart/values.yaml) (dev defaults) and [`values-prod.yaml`](../../status-api-chart/values-prod.yaml) (more replicas and resources).

## How to run
```bash
helm lint status-api-chart
helm install dev status-api-chart/
helm install prod status-api-chart/ -f status-api-chart/values-prod.yaml
helm upgrade dev status-api-chart/ --set replicaCount=3
helm rollback dev 1
```

## Result
Two releases from one chart with different replica counts; an upgrade rolled back to the previous revision.

## Technical decisions
- One chart, many environments: differences live only in values files.
- Helm keeps release history, so rollback is a single command.

## Notes & lessons learned
- The loose manifests from Labs 14–15 were removed from the cluster before installing the chart to avoid conflicts.

---
[← Lab 15](lab-15.md) · [Lab 17 →](lab-17.md)
