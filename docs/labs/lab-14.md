# Lab 14 · Optimized Containers, Probes and Ingress

| | |
|---|---|
| **Area** | Containers & Kubernetes |
| **Tag** | [`lab-14`](https://github.com/JhonnatanPenate/cloud-devsecops-labs/tree/lab-14) |
| **Course** | Cloud Development II · ESEN · 2026 |

← [Back to the README](../../README.md)

## Goal
Build an optimized multi-stage image with health checks, run it with multiple replicas and resource limits, and expose it through an Ingress controller.

## What was built
- [`status-api/`](../../status-api): Express API and multi-stage Dockerfile (production dependencies only, non-root user).
- [`k8s/status-api-deployment.yaml`](../../k8s/status-api-deployment.yaml): replicas, requests/limits, liveness and readiness probes on `/health`, Service.
- [`k8s/status-api-ingress.yaml`](../../k8s/status-api-ingress.yaml): Ingress for ingress-nginx.

## How to run
```bash
docker build -t devsecops-lab/status-api:1.0 status-api
kind load docker-image devsecops-lab/status-api:1.0 --name devsecops-lab
kubectl apply -f k8s/status-api-deployment.yaml
kubectl apply -f k8s/status-api-ingress.yaml
curl http://localhost/
```

## Result
Responses alternate between Pod hostnames, showing load balancing across replicas.

## Technical decisions
- Multi-stage builds keep build tools out of the final image.
- Readiness keeps traffic away from Pods that are not ready; liveness restarts Pods that hang.

---
[← Lab 13](lab-13.md) · [Lab 15 →](lab-15.md)
