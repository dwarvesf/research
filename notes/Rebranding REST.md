---
title: null
description: null
date: null
tags:
  - api
  - RESTful
redirect:
  - /s/-bAuYQ
---

## The demand of API

- Too many devices that try to access the app (laptop, desktop, native mobile)
- Demand for dataset increases
- Microservices' interoperability: an app can be run in many programming language to support multiple platforms -> Everything must be in sync > they msut understand each other -> Agree on communication protocol and API

## It comes with standard

- Many layers
  - Application (for user)
  - Application layer standards (xml. http, https)
  - Transport layer

and standards are hard to set due to the creative space (website layout, UI)

## Benefit of APIs

- APIs allows browsers to speak multiple request to servers > fetch back data without reloading
- The contract between FE/BE: transfer state
- REST: architectural proposal of how to use HTTP components (URL, header & body).

## The current issue w REST APIs

- Large URL: too many parameters
- Complex objects URLs: chunky URLs
- Resource identifiers explosion?
- Number of devices and experiences increase, the flow between those devices starts diverting. > difference experience between each platforms -> different APIs approach

-> Multiple APIs should be adopted -> Throw out the reusability

**Imo** REST is specifically made for distributed system (for multipe devices). Web-service APIs are documented as REST APIs, not RESTful > The reason for rebranding REST is to differentiate it with RESTful APIs.

---

#### Reference

- https://medium.com/hackinghabits/rest-api-guidelines-are-insufficient-we-need-something-better-f56d91d195f2
- [Distinguish URI and URL](https://danielmiessler.com/study/difference-between-uri-url/)
- [rebranding REST](https://kieranpotts.com/rebranding-rest/)
