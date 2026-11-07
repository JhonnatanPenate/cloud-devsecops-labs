# Lab 04 · End-to-End DevSecOps Pipeline

| | |
|---|---|
| **Area** | DevSecOps |
| **Tag** | [`lab-04`](https://github.com/JhonnatanPenate/cloud-devsecops-labs/tree/lab-04) |
| **Course** | Cloud Development II · ESEN · 2026 |

← [Back to the README](../../README.md)

## Goal
Add security and quality controls to the deployment pipeline so that AWS is updated only when the code passes every check, and prove that an insecure commit is blocked.

## What was built
- Sample Node.js application in [`src/`](../../src) with Jest tests in [`tests/`](../../tests) and coverage.
- Pipeline jobs: CodeQL (SAST), Gitleaks (secrets), Trivy (dependencies), SBOM generation, a security policy gate, SonarCloud quality gate and Terraform deployment, plus a manual destroy job. Reference copy: [`docs/pipeline/deploy.yml`](../pipeline/deploy.yml).
- SonarCloud project connected through `SONAR_TOKEN`.

## How to run
```bash
npm install
npm test            # Jest + coverage
# push to main to run the full pipeline
```

## Result
Green end-to-end run with all jobs passing; Gitleaks reports *no leaks* on the clean commit.

## Technical decisions
- Deployment depends on every security job (`needs:`), so one failure stops the release.
- SBOM is generated on every run to keep an inventory of dependencies.

## Notes & lessons learned
- **Controlled secret test.** Commit *"Prueba de bloqueo: secreto de prueba"* adds an obviously fake Stripe-format key (`sk_live_51Hxxxx…`) on purpose; Gitleaks blocked the pipeline, and the next commit reverts it. The value is not a real credential.
- When this repository was published, **GitHub push protection** detected the same fake key and blocked the push until it was marked as a test value: a second layer of defense on top of the pipeline.

---
[← Lab 03](lab-03.md) · [Lab 05 →](lab-05.md)
