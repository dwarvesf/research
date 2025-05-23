---
title: Shadow copies in Docker builds
description: An explanation of shadow copies in Docker builds
date: 2024-08-01
authors:
  - baenv
tags:
  - devbox
  - docker
  - nix
redirect:
  - /s/5SimJw
---

One more issue that comes from internet access of Docker build is Shadow copies aka redundant files that are not cleaned after new versions of packages are installed.

For example

```Dockerfile
FROM ubuntu:20.04
RUN apt-get update && apt-get upgrade -y
RUN apt-get install -y some-package
```

Remind that the Docker build creates a separate layer for each RUN statement. Referring to the above Dockerfile, we can simply explain it as follows.

- The base layer is Ubuntu
- The second layer contains every file that is updated by `apt-get upgrade`.
- The third layer contains new packages

Clearly, the upgrade happens at the second layer without affecting the base layer. This means that new versions of packages are installed without removing old versions of files that are no longer used.

This issue makes the size of the image increase unnecessarily. We can resolve this by Multistage builds also.

But why do we not resolve all the above issues from its root cause?

---

#### References

_Understanding the image layers_. (n.d.). Docker Docs. Retrieved August 2, 2024, from https://docs.docker.com/guides/docker-concepts/building-images/understanding-image-layers/
