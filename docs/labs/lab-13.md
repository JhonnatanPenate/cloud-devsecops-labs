# Lab 13 · Event Platform on Kubernetes

| | |
|---|---|
| **Area** | Containers & Kubernetes |
| **Tag** | [`lab-13`](https://github.com/JhonnatanPenate/cloud-devsecops-labs/tree/lab-13) |
| **Course** | Cloud Development II · ESEN · 2026 |

← [Back to the README](../../README.md)

## Goal
Create a local Kubernetes cluster with kind, run Kafka inside it, containerize the producer/consumer app and connect it to Kafka only through the Service name.

## What was built
- [`k8s/kind-cluster-config.yaml`](../../k8s/kind-cluster-config.yaml): cluster definition.
- [`k8s/kafka-deployment.yaml`](../../k8s/kafka-deployment.yaml): Kafka Deployment and Service.
- [`k8s-app/`](../../k8s-app): producer/consumer and Dockerfile.
- [`k8s/producer-job.yaml`](../../k8s/producer-job.yaml) and [`k8s/consumer-deployment.yaml`](../../k8s/consumer-deployment.yaml).

## How to run
```bash
kind create cluster --config k8s/kind-cluster-config.yaml --name devsecops-lab
kubectl apply -f k8s/kafka-deployment.yaml
docker build -t devsecops-lab/k8s-app:1.0 k8s-app
kind load docker-image devsecops-lab/k8s-app:1.0 --name devsecops-lab
kubectl apply -f k8s/consumer-deployment.yaml -f k8s/producer-job.yaml
kubectl logs -l app=billing-consumer
```

## Result
Producer and consumer exchange messages through `kafka:9092` (Service discovery), never `localhost` or a Pod IP.

## Technical decisions
- Service names are stable while Pod IPs change on every restart.

## Notes & lessons learned
- Local images must be loaded into the kind node (`kind load docker-image`) before Pods can use them.

---
[← Lab 12](lab-12.md) · [Lab 14 →](lab-14.md)
