---
title: null
description: null
date: null
tags:
  - practice
  - versioning
redirect:
  - /s/B8_PxQ
---

Versioning system that represents the product version, using a formal convention based on 3 parts in alpha numerics.

#### Format

A 3-component number in the format of "X.Y.Z", in which

- X: Major version
- Y: Minor version
- Z: Patch version

#### The purpose of SemVer

Semantic Versioning represents changes and bug fixes. It shows how software moves closer to release target through different development phases. It tracks what's going on with the software as new plugins, add-ons, libraries and extensions are being built almost everyday.

#### In software dependency context

We have a definition of dependency software, means a software depends on another software. Using SemVer as rule of version release will better help manage dependency.

For example A website depends on Hugo platform. In the event that these twos both follow Semver, when Hugo updates from version 4.2.0 to 4.2.1, you'll know for sure it's not a breaking change, you'll be able to update the website dependency without thinking twice.

#### How SemVer works

- Major version number: For incompatible API changes.
- Minor version number: Roll-out new backwards-compatible features.
- Patch version number: Introduce backwards-compatible bug fixes.

#### Note

- The first version starts at 0.1.0 and not at 0.0.1, since no bug fixes there. We start off with a set of features as the first draft.
- What's done before 1.0.0 is only the development phase. That's where you focus on making the product usable.

---

#### Reference

- https://www.researchgate.net/publication/333333382_What_Do_Package_Dependencies_Tell_Us_About_Semantic_Versioning
- https://docs.npmjs.com/about-semantic-versioning
