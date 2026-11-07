# Infrastructure as Code & observability · Labs 5–8

← [Back to the README](../../README.md)

```mermaid
flowchart LR
    subgraph Code [Terraform code]
        MOD[modules/static-site<br/>v1.0.0]
        ENV[environments/dev<br/>workspaces]
    end
    ENV -->|uses module| MOD
    ENV -->|state + lock| BE[(S3 state bucket<br/>+ DynamoDB locks)]
    ENV --> DEV[dev site] & STG[staging site] & PRD[prod site]

    APP[Checkout app<br/>OpenTelemetry] -->|logs + metrics| CW[CloudWatch]
    CW --> DASH[Dashboard]
    CW --> ALM{Alarms<br/>errors · latency}
    ALM --> SNS[SNS topic] --> MAIL([Team email])
```

Labs: [5](../labs/lab-05.md) · [6](../labs/lab-06.md) · [7](../labs/lab-07.md) · [8](../labs/lab-08.md)
