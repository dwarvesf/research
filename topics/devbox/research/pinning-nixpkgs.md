---
title: Pinning nixpkgs in Nix
description: An explanation of pinning nixpkgs in Nix and its importance for reproducible builds
date: 2024-08-01
authors:
  - baenv
tags:
  - devbox
  - docker
  - nix
redirect:
  - /s/p9WUJA
---

Pinning nixpkgs means you can choose the version of nixpkgs, and then all packages required for building your application and its dependencies are fetched from this nixpkgs version where the version of each package is specified and not changed over time.

```nix
let
  nixpkgs = fetchTarball {
    url = "https://github.com/NixOS/nixpkgs/archive/20.09.tar.gz";
    sha256 = "1wg61h4gndm3vcprdcg7rc4s1v3jkm5xd7lw8r2f67w502y94gcy";
  };
  pkgs = import nixpkgs {};
in
```

What happens once you do not specify the pinning version of nixpkgs? In this case, Nix uses your local nixpkgs version by default.

---

#### References

_FAQ/Pinning Nixpkgs_. (n.d.). NixOS Wiki. Retrieved August 2, 2024, from https://nixos.wiki/wiki/FAQ/Pinning_Nixpkgs
