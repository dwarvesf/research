---
title: Typesafe client server
description: A code generation layer that bridges the gap between frontend and backend more effectively.
date: 2023-12-06
authors:
  - tienan92it
github_id: tienan92it
icy: 10
tags:
  - code-generation
  - fullstack
  - typesafe
redirect:
  - /s/AV2VEA
---

### Motivation

In traditional software development, defining models and API clients is a fundamental step when using strongly-typed languages.

- **Models**: represent various data structures such as objects, request parameters, and response types.
- **API client**: acts as an intermediary, handling requests to the backend and binding the data to the models.

Syncing these elements between the backend and frontend is important in the software development process.However, this synchronization is often manual and error-prone, leading to inconsistencies that can cause runtime failures and bugs.
To address this challenge, typesafe client-server architecture introduces a code generation layer that bridges the gap between frontend and backend more effectively.

Using API definitions in JSON or YAML format as the single source of truth, the code generator automatically validates and generates the necessary models and API clients for the frontend and corresponding models and API endpoints for the backend. This ensures that both ends of the application speak the same "data language," and any changes in the API are reflected on both sides promptly and accurately.

![](assets/typesafe-client-server.webp)

This automated approach not only minimizes human error but also streamlines the development process, as developers can now focus on building features rather than fixing mismatches between the FE and BE. By adopting this typesafe client-server system, teams can enhance collaboration, accelerate time-to-market, and deliver a more reliable product.

### Benefits

- **Enhanced reliability**: The automatic code generation ensures consistency between the frontend and backend, reducing the risk of runtime failures.
- **Early error detection**: Any inconsistencies or errors in the API are detected during the code generation process, allowing for early detection and resolution.
- **Improved developer productivity**: Developers can focus on feature development instead of manual synchronization tasks, increasing overall productivity.
- **Security enhancements**: The typesafe client-server architecture helps prevent security vulnerabilities by ensuring that data is properly handled and transferred between the frontend and backend.
- **Documentation and collaboration**: API definitions serve as documentation and a common language for developers and stakeholders, facilitating collaboration and understanding.
- **Refactoring and scalability**: When changes are made to the API, the code generation process helps identify and update affected areas, making refactoring and scalability easier.

### How to use effectively

- **API first development**: Start by designing API definitions that accurately represent the desired functionality and data structures.
- **Automate code generation**: Set up automation tools to generate code whenever changes are made to the API definitions. This ensures that the frontend and backend stay in sync.
- **Continuous integration**: As part of the CI/CD pipeline, validate the API definitions and ensure that the auto-generated code does not have manual edits. This maintains the integrity of the synchronization process.
- **Testing**: Conduct thorough unit and integration tests for both the frontend and backend. With Swagger, automated tests can be generated and run based on the API definitions, further ensuring the reliability of the system.
- **Documentation**: Utilize tools like Swagger UI or ReDoc to provide interactive API documentation. This helps developers and non-technical stakeholders understand and experiment with the API.
- **Version control**: As the API evolves, make sure to version it to manage changes effectively and maintain backward compatibility.

### Supported frameworks/tools

[openapi-generator](https://openapi-generator.tech/): Official tool to validate Swagger spec and generate clients. Using Axios for client requests.
[Orval](https://next.orval.dev/): Generate code in various clients (axios, swr, react-query…). Support mock data with [msw](https://mswjs.io/) and [faker](https://fakerjs.dev/)

### References

- https://openapi-generator.tech
- https://orval.dev
- https://docs.stoplight.io/docs/spectral/eb68e7afd463e-spectral-in-java-script
- https://swagger.io/specification
- https://trpc.io
