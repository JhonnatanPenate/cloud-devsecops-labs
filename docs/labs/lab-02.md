# Lab 02 · Code Quality and Quality Gates with SonarQube

| | |
|---|---|
| **Area** | DevSecOps |
| **Tag** | Conceptual (no code) |
| **Course** | Cloud Development II · ESEN · 2026 |

← [Back to the README](../../README.md)

## Goal
Interpret SonarQube reports, classify findings by type and severity, fix them, and define the quality gate that the CI pipeline must pass.

## What was covered
- Coverage diagnosis per file and against an 80% threshold.
- Classification of findings: Bug, Vulnerability, Security Hotspot and Code Smell, with corrected code for each case.
- Quality gate on **new code** (Sonar way): reliability, security, maintainability, coverage and duplication.
- Integration settings in [`sonar-project.properties`](../../sonar-project.properties): sources, exclusions and the LCOV coverage report path.

## Result
The quality gate configuration later used by the SonarQube job of the pipeline in [Lab 4](lab-04.md).

## Technical decisions
- The gate evaluates new code so legacy debt does not block every merge, while nothing new makes it worse.
- Lowering the coverage threshold to make the pipeline pass hides risk instead of reducing it.

## Notes & lessons learned
- Conceptual lab: the analysis was done on a provided report. The resulting configuration is part of the repository from Lab 4 on.

---
[← Lab 01](lab-01.md) · [Lab 03 →](lab-03.md)
