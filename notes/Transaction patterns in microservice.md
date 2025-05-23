---
title: null
description: null
date: null
tags:
  - microservice
  - pattern
redirect:
  - /s/INAZaw
---

### Two-phase commit pattern

- Global transaction context
- Prepare phrase, lock resources -> commit phase
- Abort if error

**Pros**

- Atomic transaction, read-write isolation

**Cons**

- Synchronous, delay during calling services, blocking resources -> bottleneck, deadlock

**Q&A** How do we handling errors during commit phrase -> retry on commit error?!, global transaction context tracking and calling delete all committed objects?!

### Saga pattern

- Local transaction, communicate through event bus
- Send rollback event to rollback changes (compensation transaction)

**Pros**

- Asynchronous, local transaction so there is no lock on any object/row

**Cons**

- Difficult to bug and maintain event messages as system grows
- No read isolation: committed data of a service might be gone after a second due to compensation transaction

---

#### Reference

https://developers.redhat.com/blog/2018/10/01/patterns-for-distributed-transactions-within-a-microservices-architecture
