---
title: From multi repo to monorepo a case study with Nghenhan Turbo monorepo
description: Learn how migrating to a Turbo-powered monorepo cut build times by 60%, boosted developer productivity by 40%, and simplified dependency management in a real trading platform case study.
date: 2023-03-20
tags:
  - engineering
  - framework
  - technique
  - web
redirect:
  - /s/dmm9pA
---

In this case study, we share our experience of transitioning from multi-repository structure to a monorepo using [Turbo](https://radar.d.foundation/Turborepo-0dd18b38468c4859a8beaae7bf6c511c) in our project. This migration led to numerous benefits, including a 60% reduction in build times, a 40% increase in developer productivity, and simplified dependency management. Our goal is to offer valuable insights and lessons learned throughout our journey to help others considering a similar transition.

## Introduction

Over the past two years, we have developed NgheNhan - a trading platform that not only enables users to manage their accounts efficiently but also allows them to analyze market data and trading performance in realtime.

As the project expanded, our team faced challenges in managing dependencies and deploying updates across multiple repositories. Coordinating changes between components and maintaining consistency across codebases became increasingly difficult as our engineering team grew. This prompted our decision to migrate to a monorepo structure using Turbo.

## Challenges

Throughout the migration process, we encountered several challenges such as updating reusable components, including integrating different codebases into the new monorepo structure, refactoring code and dependency packages to ensure compatibility, caching previous builds to speed up build times with minimizing the Javascript bundle size, and updating development processes to reflect the new workflow.

These challenges necessitated updating references to files and components to match the new structure and ensuring the correct integration of all code into the new repository.

As we move forward, we may face challenges related to scalability and flexibility. However, we firmly believe that the benefits of the monorepo approach far outweigh these challenges, and we are confident in our ability to address them proactively.

## Solution: Turbo and the monorepo advantage

Turbo, a purpose-built tool for managing monorepos, offers numerous benefits that streamline the development process. Some of these advantages include:

- **Simplified dependency management:** Managing dependencies is much easier with Turbo's automatic dependency management features, ensuring that all components use the correct versions of shared libraries and frameworks.
- **Enhanced collaboration:** Turbo's unified codebase enables developers to collaborate and share code more efficiently, resulting in faster development cycles and overall improved productivity.
- **Faster builds and testing:** With Turbo's parallel and incremental build capabilities, build times are significantly reduced. Remote caching further accelerates builds by reusing previously built files, ultimately leading to faster development cycles and increased reliability.
- **Improved code reuse:** Consolidating all code into a single repository allows for better code reuse across different projects, reducing duplication and elevating code quality.
- **Reduced complexity:** The monorepo structure simplifies the development process, making it easier for team members to navigate and comprehend the codebase.

## Migration process

Here is the diagram for the full flow of the migration process of our apps:

![](assets/from-multi-repo-to-monorepo-a-case-study-with-nghenhan-turbo-monorepo_8dc9116f98bf7a170ec249c0e63ad699_md5.webp)

Our migration process entailed several well-planned steps to ensure a seamless transition to a monorepo using Turbo:

1. **Setting up Turbo:** We started by configuring Turbo to manage our dependencies, scripts, and builds within the monorepo.
1. **Consolidating code:** We migrated all of our code from multiple repositories into a single Turbo repository, updating dependencies and organizing reusable code in a scalable manner. This also involved configuring CI/CD builds on Vercel for our apps.
1. **Refactoring:** We thoroughly analyzed our existing codebase, identifying areas where components were tightly coupled or resources were excessively shared. We refactored these components to improve the reliability and scalability of our codebase, positively impacting bundle size and performance.
1. **Preview app with Storybook:** We created a preview app using Storybook to better understand the input/output of each component and ensure that everything was working as expected. This made it easier for our developers to integrate components into our apps in the future.
1. **Extensive testing and deployment:** After completing the migration and refactoring efforts, we thoroughly tested and deployed our codebase to ensure that everything was working as expected. We resolved any issues that arose during the testing process and made certain that our apps ran smoothly in the live environment.

## Results and key learnings

The migration to a monorepo with Turbo was a success, with several noteworthy benefits:

- **Improved collaboration**: Our developers experienced a 40% increase in productivity due to better code sharing and a unified codebase.
- **Faster builds**: Build times were reduced by 60% with Turbo's parallel and incremental build capabilities.
- **Simplified dependency management**: Turbo's automatic dependency management features made managing dependencies across our codebase much easier.
- **Improved code reuse**: Consolidating all code into one repository facilitated code reuse across projects, reducing duplication and improving code quality.
- **Reduced complexity**: The monorepo structure simplified our development process, making it easier for team members to navigate and understand the codebase.

Throughout the migration process, we learned several valuable lessons:

1. Thorough planning and preparation are crucial for a successful migration.
2. Clear communication and collaboration among team members ensure a smoother transition.
3. Monitoring and addressing potential scalability and maintainability issues are essential for long-term success.

> The transition to a monorepo with Turbo has been a game-changer for our team. We can now collaborate more effectively, build faster, and manage dependencies with ease, enabling us to focus on delivering high-quality software. — _An Tran, Lead Developer at NgheNhan_

## Conclusion

The migration to a monorepo using Turbo required significant effort, but the results have been overwhelmingly positive. Our team experienced improved collaboration, faster build times, simplified dependency management, and better code quality. We remain committed to continuously refining our code management practices and leveraging tools like Turbo to stay at the forefront of software development.

**Follow us on**

- Website: [https://dwarves.foundation](https://dwarves.foundation/)
- Discord: [https://discord.gg/dfoundation](https://discord.gg/dfoundation)
- Fanpage: [https://www.facebook.com/dwarvesf](https://www.facebook.com/dwarvesf)
- LinkedIn: [https://www.linkedin.com/company/dwarvesf](https://www.linkedin.com/company/dwarvesf/)
- Substack: [https://memo.d.foundation/](https://memo.d.foundation/)
