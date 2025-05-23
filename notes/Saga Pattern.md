---
title: null
description: null
date: null
tags:
  - microservice
  - pattern
redirect:
  - /s/5UB-Aw
---

The saga design pattern is a way to manage data consistency across microservices in distributed transaction scenarios.

### Context

- You have applied the Database per Service pattern. Each service has its own database. Some business transactions, however, span multiple service so you need a mechanism to implement transactions that span services.
- For example, let’s imagine that you are building an e-commerce store where customers have a credit limit. The application must ensure that a new order will not exceed the customer’s credit limit. Since Orders and Customers are in different databases owned by different services the application cannot simply use a local ACID transaction.

### Solution

- Implement each business transaction that spans multiple services is a saga. A saga is a sequence of local transactions.
- Each local transaction updates the database and publishes a message or event to trigger the next local transaction in the saga. If a local transaction fails because it violates a business rule then the saga executes a series of compensating transactions that undo the changes that were made by the preceding local transactions.

- There are two ways of coordination sagas:
  - Choreography - each local transaction publishes domain events that trigger local transactions in other services
  - Orchestration - an orchestrator (object) tells the participants what local transactions to execute

### Resulting context

- Benefit: It enables an application to maintain data consistency across multiple services without using distributed transactions
- Drawback: The programming model is more complex

### When to used

- Ensure data consistency in a distributed system without tight coupling.
- Roll back or compensate if one of the operations in the sequence fails.

![[From_2PC_To_Saga.png]]

---

#### Reference

- https://microservices.io/patterns/data/saga.html
- https://docs.microsoft.com/en-us/azure/architecture/reference-architectures/saga/saga
- https://blog.couchbase.com/saga-pattern-implement-business-transactions-using-microservices-part/
