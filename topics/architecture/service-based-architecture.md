---
title: Service based architecture
description: Service-based architecture offers a flexible, middle-ground approach between monoliths and microservices, ideal for managing complex business needs without the overhead of full microservice complexity.
date: 2022-06-21
github_id: monotykamary
redirect:
  - /s/cQcwfg
---

## What is service-based architecture?

Service-based architecture is a kind of hybrid or middle-ground architecture between microservices and a monolith and is noted as a pragmatic architecture style due to its flexibility. Like a microservice architecture, it is essentially a distributed architecture, but it doesn't come with the cost of or complexity of other distributed architectures.

![](assets/service-based-architecture_pasted-image-20220922153254.webp)

### What are the differences between microservices, service-oriented, and service-based architectures?

> Microservices Architecture and Service-Oriented Architecture (SOA) are considered service-based architectures

Mark Richards, one of the authors who helped coin the term in the book _Fundamentals of Software Architecture: An Engineering Approach_, notes that service-based architectures lie as a **superset** of microservice and service-oriented architectures. The most notable patterns shared between the architectures, service contracts and a reliance on the [[BASE model]] with regard to database transactions.

## Why use a service-based architecture?

It is quite arguably a one-size fits a lot of stuff architecture. It is very suitable for projects that contain business requirements a bit too complex to manage (or otherwise accrue technical debt) with a monolith. Likewise, it also doesn't require the level of loose coupling you would typically see in a strict microservice environment.

#### References

- Fundamentals of Software Architecture: An Engineering Approach—by Mark Richards, Neal Ford
- https://microservices.io/
- https://en.wikipedia.org/wiki/Microservices
- https://nofluffjuststuff.com/magazine/2015/10/the_challenges_of_service_based_architecture
