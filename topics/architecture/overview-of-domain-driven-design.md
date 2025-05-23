---
title: Overview of domain driven design
description: Domain Driven Design (DDD) improves software by creating clear domain models and shared language between developers and business experts, helping solve complex business problems effectively.
date: 2022-06-21
github_id: R-Jim
redirect:
  - /s/KlHGdA
---

### What is Domain Driven Design?

A software design approach focusing on the **Domain**, one of the keys to an application success, by creating a rich and meaningful **Domain model** using rules and conventions like **Ubitious language**, **Event storming**, etc.

By enforcing the conversation around the domain. It removes _communication lag_ between **Developers** and **Domain/Business experts**.

### Removal of vocabulary ambiguity

Domain expert speaks in business term while developer speaks in technical. DDD introduces **Ubiquitous language**, a common rigorous medium, build between both parties to define statements, software solutions, etc, without any ambiguity - hence the term _rigorous_.

### Better understanding of the business domain

Through the drawn out **Domain model, Domain events** important aspects of the business are clarified, speculated for potential features, issues, and critical business flow can be prioritized for enhancement and scalability.

### Technology independent

The core of DDD is about the design decisions and transitions that were made in modeling the domain. So, without being too involved in the technical aspects, the development team has more options to select or adopt new technology.

### Human aspects

With the output diagrams and conversation, stakeholders/PMs have a better statistic to measure the success of the project.

From the resources management side, It reduces the time for newcomers to grasp the overall system by discarding most translation documentation for business/technical terms and promoting discussions with others.

And for developers, It is always important to understand the problems that we are using technology to solve.

### When to use DDD

DDD is designed to tackle complex business domains so it might not be the best for applications with minor domain complexity but high technical complexity. Required discipline and dedicated development team and domain experts.

Here are some example domains that used DDD:

- https://github.com/ibm-cloud-architecture/vaccine-solution-main (distribution)
- https://github.com/ddd-by-examples/library (booking).

### References

- https://herbertograca.com/category/development/book-notes/domain-driven-design-by-eric-evans/
- Domain-driven design by Eric Evans
