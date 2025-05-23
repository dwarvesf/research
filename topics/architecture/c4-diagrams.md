---
title: C4 diagrams
description: C4 diagrams use a four-level model to clearly visualize software system architecture, helping teams understand system context, containers, components, and code implementation.
date: 2022-04-17
github_id: monotykamary
redirect:
  - /s/3Zni-A
---

## What are C4 diagrams?

C4 diagrams, or the [C4 model](https://c4model.com/), is used to diagram domain and implementation abstractions of system software architectures. These diagrams represent system architectures in a semantically consistent format that can stand by itself with little to no prior context as they always incorporate a name, description, with relevant contexts such as type of technology or its deployment location. The semantics used for C4 diagrams are coincidentally very similar to [[State, Explain, Link]]. It is focused as an "abstraction-first" approach to diagramming, with the hierarchy of abstractions of the model going down 4 levels:

1. **System context diagram** - shows the context of the entire system with related entities
2. **Container diagram** - a high level shape of the architecture and how it fits the IT environment
3. **Component diagram** - decompose containers into components to show implementation abstractions
4. **Code** - shows how the component is implemented as programmable code

![](assets/c4-diagrams_c4-overview.webp)

The C4 model isn't strictly static when it comes to these levels and also supports supplementary diagrams, such as **system landscape diagrams**, **dynamic diagrams**, **deployment diagrams**, etc.

## The story of C4 diagrams

The C4 model was created by Simon Brown, designed with the goal for it to be a developer friendly approach to diagramming. The high level representations of these diagrams incidentally also allowed it to assist in communication between software development teams and product teams. The abstractions make it suitable for software consulting and allows us to do architecture evaluations and risk identification.

#### Reference

- <https://c4model.com/>
- <https://en.wikipedia.org/wiki/C4_model>
