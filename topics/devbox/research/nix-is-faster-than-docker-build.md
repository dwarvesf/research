---
title: Nix is faster than Docker build
description: An exploration of how Nix outperforms Docker in building images, leveraging its deep understanding of package dependencies and content-addressable storage
date: 2024-08-01
authors:
  - baenv
tags:
  - devbox
  - docker
  - nix
redirect:
  - /s/7JaPIw
---

As I mentioned in the [Build the same thing at any time](≈%20Nix%20-%20Build%20the%20same%20thing%20at%20any%20time.md), Nix knows the exact content of packages and dependencies before builds. So it can take advantage of this characteristic to avoid duplicated building different layers with the same content but different instructions.

It is even too great to take advantage of content-addressable storage. Nix can do more than that.

With a deep understanding of Nix on the package that it prepares to build. Nix can build a dependency tree exactly. From this insight, Nix groups all closely related packages and their dependencies in the same layer. Besides, files of large sizes can be placed in a separate layer to maximize the cache. In this way, the needed number of layers is decreased and is more effective.

Nix can evaluate the changeability of each package depending on update history, the place in the dependency tree, and the type of the package. Then it uses some complex techniques to determine the order of layers. So the layers with the least changed layers are placed at the bottom.

Instead of copying the same files to different layers. Nix creates symlinks or hardlinks to share resources between layers. It helps Nix optimize the size of the image but still maintains the logical structure. Thereby increasing the pull/push speed significantly. As a result of this ability, dependencies changing now can just only update the reference links.

One more point, Nix creates Docker images from scratch. It means Nix does not need any available image as a base layer as a normal Docker build. For example, we usually need Ubuntu and Alpine images to build our Docker image.

Finally, creating a Docker image in Nix is just building the program into a package with Nix and making sure it works. Then turn it into a docker image. The build-time dependencies are actually not needed here. So it is easy to remove built-time related tools and redundant libraries.

After all the above things, we have a Nix with the ability to build Docker image more efficiently, faster, and cheaper.

---

#### References

_Using the build cache._ (n.d.). Docker Docs. Retrieved August 2, 2024, from <https://docs.docker.com/guides/docker-concepts/building-images/using-the-build-cache/>

Wang, E. (2022, September 13). _Construction and analysis of the build and runtime dependency graph of nixpkgs_. Tweag. Retrieved August 2, 2024, from <https://www.tweag.io/blog/2022-09-13-nixpkgs-graph/>

_Understanding the image layers_. (n.d.). Docker Docs. Retrieved August 2, 2024, from <https://docs.docker.com/guides/docker-concepts/building-images/understanding-image-layers/>

_What is the difference between a symbolic link and a hard link?_ (2008, October 9). Stack Overflow. Retrieved August 2, 2024, from <https://stackoverflow.com/questions/185899/what-is-the-difference-between-a-symbolic-link-and-a-hard-link>

Rugyt, A. (2024, March 15). _Nix is a better Docker image builder than Docker's image builder_. Xe Iaso. Retrieved August 2, 2024, from <https://xeiaso.net/talks/2024/nix-docker-build/>
