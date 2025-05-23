---
title: Lessons learned from being a part of corporate micro frontend implementation
description: Discover how micro-frontend architecture boosts large-scale frontend development with independent teams, shared components, and efficient communication for scalable, maintainable, and collaborative web applications.
date: 2023-04-24
tags:
  - micro-frontend
  - web
redirect:
  - /s/DA-Rbg
---

## Introduction

As we venture further into the dynamic world of frontend development, we developers are on a constant quest for techniques that boost productivity, maintainability, and collaboration among multiple teams. Micro-frontends have risen to prominence as a favored architectural choice for achieving these goals. In this article, we'll dive into the experiences and insights we've gained from a recent corporate micro-frontend implementation project, shedding light on the technical specifics and best practices that can be applied to comparable endeavors.

## Project scope and motivation

The project involved the creation of a plethora of modules for a large-scale application, with various teams and vendors collaborating simultaneously. Some of the modules included:

- Auth
- Ordering
- Locations
- Parking
- Vouchers
- etc

To accommodate the diverse teams and foster independent development, we decided to adopt a micro-frontend architecture. This approach enabled each team to work on their respective modules with increased autonomy, flexibility, and minimal interference.

### Defining micro-frontend boundaries

The boundaries separating different micro-frontends were established based on each module's functionality, their respective domain areas, and the teams in charge of their development. Our primary objective was to minimize interdependencies and decrease coupling between the distinct parts of the application. This strategic division facilitated efficient development, simplified maintainability, and enhanced scalability.

## Tools, frameworks, and libraries

We employed [Webpack Module Federation](https://webpack.js.org/concepts/module-federation/) for configuring the micro-frontends, as it offered a solid and efficient method for sharing and loading code between them. This technology facilitated dynamic loading of modules at runtime, enabling seamless integration and a streamlined development process.

```solidity
// The team's shared script which contains the config for module federation
const { sharedConfig } = require('shared-script');

module.exports = sharedConfig(() => ({
  ...
  // Include needed micro-frontend modules
  remotes: [
    'auth',
    'ordering',
    'vouchers'
    ...
  ],
}));
```

## Communication and data sharing

Communication and data sharing between micro-frontends were managed through a combination of shared libraries, RESTful API calls, and event-driven architectures such as publish-subscribe patterns. Challenges arose in ensuring data consistency, versioning, and resolving conflicts. These were addressed through effective communication between teams, the use of well-defined protocols for data exchange, and employing state management libraries like Redux or [Zustand](https://github.com/pmndrs/zustand) to maintain a single source of truth.

```solidity
// The team's shared script which contains the config for module federation
const { sharedConfig } = require('shared-script');

module.exports = sharedConfig(() => ({
  ...
  // Include needed micro-frontend modules
  remotes: [
    'auth',
    'ordering',
    'vouchers'
    ...
  ],
}));
```

## Code quality, testing, and deployment

While each team was responsible for defining their own code quality standards, we implemented a Continuous Integration (CI) setup to measure common testing outputs using tools like [SonarCloud](https://www.sonarsource.com/). This ensured that the final deployment could pass the required regression tests, even with varying conventions between teams.

For deployment purposes, each micro-frontend was treated as an independently deployable unit. This allowed for faster release cycles and reduced the impact of potential issues during deployment, as they would be isolated to the specific micro-frontend being deployed. However, it's important to note that there is no guard in version bump, which means we have to be cautious when making changes to shared components. To ensure that we don't accidentally break other micro-frontends, we have a dedicated maintainer team in charge of the common modules. Any changes made to the shared components are communicated to the other teams in advance to minimize the risk of version conflicts and ensure smooth deployments.

## Encouraging consistency and collaboration

Although consistency in conventions wasn't strictly enforced, our focus was on ensuring that the final deployment passed regression tests. To promote collaboration, we put policies in place for cross-team code review and established common channels for sharing concerns and discussing solutions. We also held regular sync-up meetings to keep teams aligned and address any emerging issues.

## The importance of shared components

We used a shared UI library for common components and global styles, complete with documentation for styling conventions. The library was built using a widely-adopted frontend framework, ensuring that it was easily accessible and familiar to all teams. We encouraged teams to propose changes to shared components when necessary, ensuring that the library evolved to meet the needs of all developers.

To manage versioning and dependencies, we utilized a dedicated package manager for handling shared components. This streamlined the process of updating and distributing these components across different micro-frontends while minimizing the risk of version conflicts.

## Key lessons learned and best practices

1. **Make use of a shared UI library and maintain a strong design team** to ensure consistency in the application's appearance and functionality. Utilize a widely-used frontend framework and a dedicated package manager to streamline the management of shared components.
2. **Prioritize communication and collaboration over strict conventions**. Encourage cross-team code review and establish common channels for sharing concerns and discussing solutions. Regular sync-up meetings can also be advantageous in keeping teams aligned and addressing emerging issues.
3. **Guarantee that each team has a clear comprehension of their responsibilities** and the boundaries of their micro-frontends. Design micro-frontends to encompass specific business domains or user experiences, minimizing interdependencies and reducing coupling between different parts of the application.
4. **Set up a CI system **to measure common testing outputs and ensure that the final deployment can pass the required regression tests. Treat each micro-frontend as an independently deployable unit to enable faster release cycles and reduce the impact of potential deployment issues.
5. **Utilize a combination of shared libraries**, API calls, and event-driven architectures to handle communication and data sharing between micro-frontends. Create well-defined protocols for data exchange and implement robust error-handling strategies to gracefully manage unforeseen issues during communication or data sharing.

## Wrapping up

Micro-frontend implementation presents a flexible and efficient approach to handling large-scale frontend development with multiple teams and vendors. By adopting best practices and learning from real-world experiences, organizations can harness this architecture to enhance productivity, collaboration, and maintainability in their frontend projects. By delving into the technical aspects and addressing potential challenges, developers can unlock the full potential of micro-frontend architecture and create scalable, modular, and maintainable applications that cater to the needs of diverse teams and stakeholders.
