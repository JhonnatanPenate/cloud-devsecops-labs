# Lab 01 · DevSecOps Pipeline Design

| | |
|---|---|
| **Area** | DevSecOps |
| **Tag** | Conceptual (no code) |
| **Course** | Cloud Development II · ESEN · 2026 |

← [Back to the README](../../README.md)

## Goal
Analyze a pre-built GitHub Actions pipeline to understand how security is automated in CI/CD: SAST with CodeQL, SCA with Trivy, secret detection with Gitleaks, SBOM generation and a security gate that blocks the pipeline on critical findings.

## What was covered
- Job-by-job analysis of a DevSecOps workflow (`devsecops-pipeline.yml`) following a GitFlow trigger model (`main` / `develop`).
- Dependency graph between jobs (`needs:`): which jobs are skipped when a scan fails.
- Why `gitleaks` needs `fetch-depth: 0` (it scans the full history, not only the last commit).
- Trivy severity filtering (`CRITICAL,HIGH`) and the line in the security gate that fails the run.
- SBOM formats (CycloneDX / SPDX) and their role in software supply-chain security.

## Result
A design reference for the pipeline that was implemented in [Lab 3](lab-03.md) and [Lab 4](lab-04.md).

## Technical decisions
- Security checks run **before** deployment (shift-left), so an insecure commit never reaches AWS.
- Each scanner covers a different risk: code (CodeQL), dependencies (Trivy), credentials (Gitleaks), inventory (SBOM).

## Notes & lessons learned
- This lab was conceptual: no code from it lives in this repository. Its design is implemented in Labs 3–4.

---
[Lab 02 →](lab-02.md)
