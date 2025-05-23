---
title: Unstable package installation in Docker
description: An explanation of the challenges with package versioning that lets Docker builds unstable
date: 2024-08-01
authors:
  - baenv
tags:
  - devbox
  - docker
  - nix
redirect:
  - /s/kauBkQ
---

For example, let's suppose that we have the following `Dockerfile`.

```Dockerfile
FROM ubuntu:20.04
RUN apt-get update && apt-get install -y python3
```

Imagine that the first time you build your Docker image, the version of Python is 3.8.1. However, today when the latest version of Python is 3.9.1, you want to build Docker image again. Transparently, your two images are different no matter that you are using the same Dockerfile. It means you can’t reproduce the same environment in which your application is running.

If you are familiar with Docker, more than one solution pops into your mind. The easiest way is to specify a specific version to install like the following.

```Dockerfile
FROM ubuntu:20.04
RUN apt-get update && apt-get install -y python3=3.8.10-0ubuntu1~20.04.1
```

In this way, the instability can be decreased but can not resolve the issue completely. The reasons can be listed as follows.

- Indirect dependencies: even though you specify the version for main packages, these dependencies that you can’t control, can be changed over time.

- Packages are not supported: Ubuntu repositories can be changed. So your build will fail once any required packages/versions are removed from repositories.

- Ubuntu mirrors aka copies of main Ubuntu repositories can be changed also. Once the packages that you need, are not available, the building will fail.

We have some keywords related to better solutions that I only list here for reference.

- Local cache
- Private registry
- Multistage builds
