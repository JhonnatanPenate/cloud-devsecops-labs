# DevSecOps pipeline · Labs 1–4

← [Back to the README](../../README.md)

```mermaid
flowchart LR
    Dev([Developer]) -->|git push| GH[GitHub Actions]
    subgraph Gates [Security & quality gates]
        CQ[CodeQL<br/>SAST]
        GL[Gitleaks<br/>secrets]
        TV[Trivy<br/>dependencies]
        SB[SBOM]
        POL{Security<br/>policy gate}
        SQ[SonarCloud<br/>quality gate]
    end
    GH --> CQ & GL & TV & SB
    CQ & GL & TV --> POL
    POL --> SQ
    SQ -->|all green| TF[Terraform apply]
    TF --> S3[(S3 static website)]
    POL -. any critical finding .-> X[Pipeline blocked]
```

Deployment depends on every security job, so a single critical finding stops the release. Labs: [1](../labs/lab-01.md) · [2](../labs/lab-02.md) · [3](../labs/lab-03.md) · [4](../labs/lab-04.md)
