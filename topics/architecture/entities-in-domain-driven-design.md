---
title: Entities in domain driven design
description: Learn how Domain-Driven Design (DDD) uses entity identity and continuity to improve software by linking developers and domain experts for better system maintenance and scalability.
date: 2022-03-28
github_id: R-Jim
redirect:
  - /s/MOuKgg
---

## Recap on DDD

A software design focusing on the **Domain**, one of the keys to a program success, by removing _communication lag_ between **Developers** and **Domain Experts**, _separate important Domain-specific components_ for maintenance and scalability.

## A) Entities Defined by **Identity**

_ID or Identity, identify 2 objects with the same attributes_ (2 persons with the same name, DoB but different ID card number).

## B) Entities Defined by **Thread of continuity**

_A set of fingerprints or traces of an object when going through multiple systems._

### Examples

#### Real case world view

- **Banking(A)**, a banknote(paper money) will have an ID that identifies it on the digital systems or a physical log book even if all of its attributes are the same as another banknote(value, printing date, printing batch, etc..).

- **Online shopping service(A, B)**, an order has ID.
  - After checkout, the system sends the order ID to the payment service.
  - After payment completes, the system calls the Shipping service API to generate shipment with a tracking ID.
  - On the shopping website, from the order detail page, the user can check payment, shipping status. In the payment, shipping system, order ID, and details can be viewed. When receiving the package, order ID, shipping fee, and total items, prices can be viewed.

#### In-System implementation

- **Generated ID(A)**.

- **Combination of attributes(A)**, a batch of newspapers identify by name, city, and publish date.

- **Logging Request time(B)**, when calling to a service, that service will log the request and identify it by request time in combination with an IP address (not recommended if the caller is a middleware service or gateway).

## Entities's role in DDD

_Establish continuity so that behavior can be clear and predictable_, We need to focus on how the system revolves around that entity and decide the identifier, not the reverse.

- **A online shopping site for furniture**, the user only check brand name, model number, maybe design, and color for comparison between chairs or tables. Having a separate ID for each item might impact the decision on how to implement checkout(that item with ID is sold out so the user will need to find a similar item with a different ID).

#### References

- https://herbertograca.com/category/development/book-notes/domain-driven-design-by-eric-evans/

- Domain-driven design by Eric Evans
