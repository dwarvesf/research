---
title: Nix - build the same thing at any time
description: An overview of how Nix enables deterministic Docker image builds through reproducible builds, pinning, and Flakes
date: 2024-08-01
authors:
  - baenv
tags:
  - devbox
  - docker
  - nix
redirect:
  - /s/au8QAQ
---

Nix gives us the ability to build Docker image with minimum deterministic by providing some solid mechanisms.

Firstly, using Nix, we can specify exactly the version of each package and its dependencies, and keep it completely the same each time the package build happens. It is called reproducible build.

To achieve it, Nix originally combined two mechanisms, Pinning nixpkgs and Fixed-output derivation.

- [Pinning nixpkgs](pinning-nixpkgs.md)
- [Fixed-output derivation](fixed-output-derivation.md)

Above is not all. Nix raised a new feature called [Flake](../introduction/¶%20Nix%20Flakes.md) that has input and output that are determined exactly. To do it, Flake defines a standard structure for a Nix project where input (dependencies) and output are specified and locked. So your build now can avoid the dependency on the global state of Nix.
