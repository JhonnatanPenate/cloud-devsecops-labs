# Lab 15 · Autoscaling and Resilience on Kubernetes

| | |
|---|---|
| **Area** | Containers & Kubernetes |
| **Tag** | [`lab-15`](https://github.com/JhonnatanPenate/cloud-devsecops-labs/tree/lab-15) |
| **Course** | Cloud Development II · ESEN · 2026 |

← [Back to the README](../../README.md)

## Goal
Install metrics-server, autoscale status-api with an HPA under real load, and demonstrate self-healing, zero-downtime rolling updates and a PodDisruptionBudget.

## What was built
- [`k8s/metrics-server-kind-patch.json`](../../k8s/metrics-server-kind-patch.json): patch so metrics-server works on kind.
- [`k8s/status-api-hpa.yaml`](../../k8s/status-api-hpa.yaml): CPU-based HorizontalPodAutoscaler.
- [`k8s/status-api-pdb.yaml`](../../k8s/status-api-pdb.yaml): PodDisruptionBudget.
- status-api v2 for the rolling update.

## How to run
```bash
kubectl apply -f k8s/status-api-hpa.yaml
kubectl get hpa status-api-hpa --watch   # while generating load
kubectl delete pod <status-api-pod>      # self-healing
kubectl set image deployment/status-api status-api=devsecops-lab/status-api:2.0
kubectl apply -f k8s/status-api-pdb.yaml
```

## Result
Replicas grew under load and shrank afterwards; a deleted Pod was replaced automatically; v2 rolled out with no failed requests.

## Technical decisions
- HPA reacts to real CPU usage instead of a fixed replica count.
- A PDB protects availability during voluntary disruptions such as node maintenance.

## Notes & lessons learned
- metrics-server needs extra flags on kind, applied through the patch file.

---
[← Lab 14](lab-14.md) · [Lab 16 →](lab-16.md)
