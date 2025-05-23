---
title: Fixed-output derivation in Nix
description: An explanation of fixed-output derivations in Nix and their role in ensuring reproducible builds
date: 2024-08-01
authors:
  - baenv
tags:
  - devbox
  - docker
  - nix
redirect:
  - /s/cRFhsA
---

On different machines with different nixpkgs versions, Nix build will result different packages.

To handle this issue, Fixed-output derivation is raised. It simply means the result of the Nix build called derivation, is represented by a fixed hash. Any change when re-building will let the hash change. Once the current hash and the new hash are different, the build fails.

The question is how can we know this hash in the first build time? Simply, just mock a random value, then run build to get the right hash in the error message as below.

```bash
hash mismatch in fixed-output derivation '/nix/store/...':
  wanted: sha256-AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=
  got:    sha256-ACTUALCORRECTHASHHEREXXXXXXXXXXXXXXXXXXXXX=
```

This mechanism does not just only prevent Nix build from wrong global nixpkgs but also helps on tracking whether something, is
downloaded from the internet, is right.

As you can see, even when Nix has mechanisms to decrease the risk of downloading resources from unreliable sources, it also can
control everything downloaded from the Internet, and can be used to build and result the same package at any time.

---

#### References

_Nix: what are fixed-output derivations and why use them?_ (2023, February 24). Brian McGee. Retrieved August 2, 2024, from
https://bmcgee.ie/posts/2023/02/nix-what-are-fixed-output-derivations-and-why-use-them/

_Advanced Attributes - Nix Reference Manual_. (n.d.). nix.dev. Retrieved August 2, 2024, from https://nix.dev/manual/nix/2.18/
language/advanced-attributes.html?highlight=outputHash
