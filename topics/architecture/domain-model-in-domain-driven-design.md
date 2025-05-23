---
title: Domain model in domain driven design
description: Learn what a Domain Model is in Domain Driven Design, including key components like Domain events, Commands, Aggregates, and Bounded Contexts to organize business knowledge effectively.
date: 2022-07-02
github_id: R-Jim
redirect:
  - /s/O0fznw
---

## What is domain model

In [[Overview of Domain Driven Design|Domain Driven Design]], Domain Model is the organized and structured **knowledge of the business problem**. Represents as a diagram, code examples, or written documentation, and **must** be accessible and understandable by **everyone** involved with the project.

### Components of domain model

The vocabulary and key concepts of the domain, and the relationships among all of the entities. These are mainly divided into **Domain events**, **Commands**, **Aggregates**, and **Bounded context**:

### Domain events

_A statement in past tense_ describes the **things that happened** in a business system that alternates the state of the entity. e.g: Order submitted, Shopping cart updated.

### Commands

_A verb in present tense_ describes the action that triggers the corresponding **domain event**. It is either user or system actions.

- e.g: `Add product` (Command) -> `Shopping cart updated` (Domain event)

### Aggregates

Represented by a _minimal cluster_ of associated objects(domain events, commands, and actors) that we treat as a unit for data change. Each has a boundary and only exposes its root (**Aggregate Root**) which allows other objects to reference it.

- e.g: A team wants to update its member role according to each project: </n> `Project, Update member role` (Aggregate Root) -> `Project's member role updated`</n>

### Bounded context

A high-level structure consists of categorizations of functionality, represents a circle or square, that groups related entities together. It can bound parts of an aggregate or multiple aggregates.

- e.g: In an aggregate for the shopping process, we draw the bounded contexts for **Shopping cart**, and **Offers**: </n> Shopping cart (`User` -> `Add product to cart` -> `Cart updated`) -> Offers (`Promotiational Offers Identified` -> `Offers added`)

## References

- https://herbertograca.com/category/development/book-notes/domain-driven-design-by-eric-evans/
- Domain-driven design by Eric Evans
- https://creately.com/blog/diagrams/event-storming/
- https://www.jamesmichaelhickey.com/domain-driven-design-aggregates/
- https://serialized.io/java/working-with-aggregates/
