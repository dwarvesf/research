---
title: Nix - minimum changes, minimum redundancies
description: An overview of how Nix addresses issues like shadow copies in Docker builds, improving build efficiency and speed
date: 2024-08-01
authors:
  - baenv
tags:
  - devbox
  - docker
  - nix
redirect:
  - /s/LgBm1w
---

The reproducible issue is resolved in the [previous part](≈%20Nix%20-%20Build%20the%20same%20thing%20at%20any%20time.md). But we still have another problem when using Docker build, it is shadow copies. This issue comes from the underutilization of Content-addressable storage in Docker of Docker build. It even lets build time slower.

- [Content-addressable storage in Docker](content-addressable-storage-in-docker.md)
- [Nix is faster than Docker build](nix-is-faster-than-docker-build.md)
