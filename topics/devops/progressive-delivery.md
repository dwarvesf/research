---
title: Progressive delivery
description: Progressive delivery lets teams release new software features gradually using feature flags and mature CI/CD pipelines to reduce risks and improve user experience.
date: 2022-09-25
github_id: zlatanpham
redirect:
  - /s/0P6NXw
---

Progressive delivery is a modern software development methodology for gradually rolling out new features in order to assess the user response and limit the potential negative impact. With progressive delivery, features are released first to an internal QA team, then to real users in a controlled, measured manner.

One of the key advantages of progressive delivery is that it makes your release process more resilient to errors and negative user experiences. For instance, if you detect errors at 1% of your traffic, you've only potentially impacted 1% of revenue or 1% of customer satisfaction.

![](assets/progressive-delivery_engineering-progressive-delivery.webp)

## Progressive delivery contract

The practice of progressive delivery sounds good in theory but requires strict requirements to make it effective:

- CI/CD is already part of your delivery pipeline
- `master` branch is always releasable
- Every new feature includes a [[Feature flags | feature flag]]

### Mature CI/CD pipelines

When starting out with progressive delivery, teams need mature CI/CD pipelines. A mature process includes:

- Automated build and automated testing triggered for every commit.
- Developers should commit their changes frequently into the baseline.
- Deployment can be accomplished with a simple command or click.

### Master is always releasable

Every change merged into `master` must preserve the releasability of `master`. Releasable means the revision can be released to production with the requirements of:

- Changelog and documentation reflect the current feature set.
- All features have undergone quality assurance by a set of appropriate users in an appropriate environment.
- The regression test suite passes.

### A feature flag is required for every new feature

Feature flags are one of the core components of progressive delivery. Without them, it is impossible to test in production on real users with very low risk. Feature flags achieve 2 things:

- They allow continuous release to be maintained while still allowing big features to be merged into main (disabled by a feature flag) before they are fully tested.
- They give us a quick way to disable features in the event that a feature breaks the release.

## Reference

- https://www.optimizely.com/optimization-glossary/progressive-delivery/
- https://handbook.sourcegraph.com/departments/engineering/dev/tools/continuous_releasability/
- https://www.cloudbees.com/blog/progressive-delivery-vs-continuous-delivery
