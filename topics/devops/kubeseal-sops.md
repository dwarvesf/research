---
title: Kubeseal sops
description: Learn how to securely manage Kubernetes secrets using Kubeseal and Sops to encrypt and store secrets safely in public repos while ensuring only your cluster can decrypt them.
date: 2022-09-28
github_id: nguyennh4522
redirect:
  - /s/EK4FVg
---

- `Kubeseal`: Encrypt your Secret into a SealedSecret, which is safe to store - even to a public repository. The SealedSecret can be decrypted only by the controller running in the target cluster and nobody else (not even the original author) is able to obtain the original Secret from the SealedSecret. SealedSecret is composed of two parts:

  - Cluster-side controller: `sealed-secrets-controller` - generate keypair and decrypt secrect.
  - Client-side utility: `kubeseal` - uses asymmetric crypto to encrypt secrets that only the controller can decrypt.

- `Sops`: Sops is a binary able to encrypt configuration files. But rather than encrypting the whole file Sops understands format (JSON, YAML, INI, etc) and will only encrypt the values of each line (with AWS KMS, GCP KMS, Azure Key Vault, age, and PGP).

## How it works

![](assets/kubeseal-&-sops_kubeseal_&_sops.webp)

- Source code repo: contains secret was encrypted by `sops`
- Github action: use `sops` to decrypt secret and `kubeseal` to seal secret and push it to infrastructure repo
- Infrastructure repo: save all Kubernetes config
- Cluster: use `sealed-secrets-controller` to decrypt sealedsecret to secret and apply it

## Core benefits

- **Easy management**: Developers can update secret without devops.
- **Security**: The secret will be encrypted and cannot be decrypted without the key provided by devops.

## Reference

- https://github.com/bitnami-labs/sealed-secrets
- https://github.com/mozilla/sops
