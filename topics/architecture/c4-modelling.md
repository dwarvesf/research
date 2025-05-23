---
title: "Breaking down complexity: the role of abstractions and UML in C4 modelling"
description: Understanding and conveying software architecture can be a daunting task, especially when dealing with non-technical stakeholders or diverse development teams. This article delves into the challenges of traditional methods like complex UML diagrams and non-descriptive box-and-line drawings. We introduce the C4 model, a powerful framework that simplifies these challenges by using layered abstractions and visualizations. Explore how the model breaks down software architecture into comprehensible levels, Context, Container, Component, and Code, and offers guidelines on creating effective diagrams. Real-world examples illustrate the application of the C4 model, making it an invaluable tool for creating a shared understanding and ensuring clear, meaningful communication among all parties involved.
date: 2024-05-23
authors:
  - R-Jim
tags:
  - graphical-notation
  - software-design
redirect:
  - /s/IGIaJQ
---

![](assets/c4-modelling.pdf)

## Problem statement

When conveying the software architecture to non-tech people/other developers, we will face the following restrictions:

- UML complexity or nondescriptive box and line drawing.
- Lacking domain knowledge or context.
- Confusing Technical terms and vocabulary.
- Difficulties when doing direct communication, and nonconclusive presentation of the solution.

## C4 model

The C4 model leverages abstractions as common languages and visualization to describe the structure of the software system.

## Abstractions

Abstractions are a means for developers and non-tech/business people to understand the context and the software architecture that is outside of their knowledge domain/level of expertise.

Abstractions must be devised and agreed upon by all involved parties. The process will consume a substantial amount of effort and time when going through multiple meetings and selecting the people responsible as the source of truth for the abstractions.

To help define the abstractions, the C4 model uses the granularity in software architecture and divides the level of abstractions into:

- **Context** of the Software system.
- **Container**.
- **Component**.
- **Code**.

### System-level context

System-level context is the highest level of abstraction. It is a package, a composition of the software system and other dependent systems, that delivers value to its users.

The system context abstractions include:

- The user of the system(people or machine), the context that the user was placed in, and the pain points.
- The main software system, the provided solution, and how it solves pain points.
- Dependent systems, why those are needed, and which information is required from the main software system.

### Container

Multiple containers exist inside a system context, each container is an abstraction of an application or a datastore. A container is something that needs to be running for the overall software system to work.

Example: A shopping e-commerce system requires a web/mobile application to display the inventory, a back-end API to calculate and return the available inventory, and a data store to store all the inventory information. The web/mobile application, back-end API, and data store are the containers, each container is responsible for the operation of the e-commerce system.

### Component

Component is a set of functions and classes bounded behind an interface. Each component helps complete the operational flows of its parent container.

Example: When sending a request to withdraw to the back-end API container of a banking system:

- The OAuth component authenticates the user requesting the withdrawal.
- Ledger component checks the available withdrawal amount.
- The notification/email component sends the withdrawal status to registered contacts.

### Code

Code is the specific implementation that built the component. Through code elements, the component describes in detail its conditions, outputs, exceptions, optional and fallback flows.

Example: An Authentication component selects the appropriate method based on the user credentials:

- If is a pair of email and password, validates the email pattern, verifies the password and the hashed password stored in the database.
- If is a token, verifies the hash is from the same user, and checks if the token is expired.

## Visualization

To visualize the software architect abstractions, we can use UML elements, box and line diagrams, etc... and enforce these guidelines:

- The diagram must convey the solution meant for that specific domain.

- The diagram elements must be clear, uniform, and meaningful and have a legend to explain the usage of each element.

- Strive to lose the <https://c4model.com/bingo/>.

## Case by case

The C4 model’s diagram, for the amount of effort and the value that it brings, will most likely be the source of truth for other design documents, diagrams, and feature discussions, and as a result, the level of abstractions and how we visualize it should focus on the value we want to deliver.

## Reference

- <https://c4model.com/>
