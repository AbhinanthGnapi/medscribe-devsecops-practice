# MedScribe Frontend - DevSecOps Practice

## Overview

This repository demonstrates the implementation of a DevSecOps pipeline for the MedScribe Frontend using GitHub Actions. The pipeline automates software supply chain security by generating an SBOM, validating dependency licenses, digitally signing build artifacts, and enforcing security policies.

---

## DevSecOps Features

### 1. SBOM Generation

Generates a CycloneDX Software Bill of Materials (SBOM) for every push and pull request.

**Workflow**

- `.github/workflows/sbom-generation.yml`

**Output**

- `sbom.json`

**Purpose**

- Provides visibility into project dependencies.
- Improves software supply chain transparency.
- Helps identify vulnerable components.

---

### 2. License Compliance

Checks project dependencies against an approved license policy.

**Workflow**

- `.github/workflows/license-compliance.yml`

**Configuration**

- `config/allowed-licenses.json`

**Purpose**

- Prevents the use of unauthorized licenses.
- Ensures dependency license compliance.

---

### 3. Artifact Signing

Builds the application and digitally signs the generated build artifact using Cosign.

**Workflow**

- `.github/workflows/artifact-signing.yml`

**Security**

- Private key stored as GitHub Secret (`COSIGN_PRIVATE_KEY`)
- Password stored as GitHub Secret (`COSIGN_PASSWORD`)
- Public verification key stored in `security/cosign.pub`

**Generated Artifacts**

- `medscribe-frontend.zip`
- `medscribe-frontend.zip.sig`

**Purpose**

- Ensures artifact authenticity.
- Protects against tampering.
- Enables signature verification.

---

### 4. Policy Enforcement

Enforces security policies during CI.

**Workflow**

- `.github/workflows/policy-enforcement.yml`

The workflow validates that:

- SBOM is available
- License policy exists
- Public signing key exists

If any required policy is not satisfied, the workflow fails.

---

## Repository Structure

```
.github/
└── workflows/
    ├── artifact-signing.yml
    ├── license-compliance.yml
    ├── policy-enforcement.yml
    └── sbom-generation.yml

config/
└── allowed-licenses.json

scripts/
└── check-licenses.cjs

security/
└── cosign.pub

sbom.json
README.md
```

---

## GitHub Secrets

| Secret             | Description                           |
| ------------------ | ------------------------------------- |
| COSIGN_PRIVATE_KEY | Private key used for artifact signing |
| COSIGN_PASSWORD    | Password protecting the private key   |

---

## CI/CD Security Pipeline

```
Developer Push
       │
       ▼
GitHub Actions
       │
       ├── SBOM Generation
       ├── License Compliance
       ├── Build Project
       ├── Artifact Signing
       └── Policy Enforcement
                │
                ▼
         Secure Build Artifacts
```

---

## Technologies Used

- React
- Vite
- GitHub Actions
- CycloneDX
- Cosign
- Node.js

---

## Implemented DevSecOps Controls

| Feature            | Status |
| ------------------ | ------ |
| SBOM Generation    | ✅     |
| License Compliance | ✅     |
| Artifact Signing   | ✅     |
| Policy Enforcement | ✅     |
