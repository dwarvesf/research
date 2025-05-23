---
title: null
description: null
date: null
tags:
  - cqrs
  - engineering
  - pattern
redirect:
  - /s/6ZXGiQ
---

### What

- a pattern that separates read and update operations for a data store

### Why - problem and context

- Large, heavy DB load system. In big system, there is a huge number of db access (Read/Write). It could have bad effect to performance and data consistency.
- In traditional architectures, the same data model is used to query and update a database. That's simple and works well for basic CRUD operations. In more complex applications, however, this approach can become unwieldy.
- Read and Write data are often asymmetrical.

### How - to solve the problem

- CQRS separates reads and writes into different models, using commands to update data, and queries to read data.

  - Commands should be task-based, rather than data centric. ("Book hotel room", not "set ReservationStatus to Reserved").
  - Commands may be placed on a queue for asynchronous processing, rather than being processed synchronously.
  - Queries never modify the database. A query returns a DTO that does not encapsulate any domain knowledge.

- For greater isolation, you can physically separate the read data from the write data. In that case, the read database can use its own data schema that is optimized for queries. The read store can be a read-only replica of the write store, or the read and write stores can have a different structure altogether.

### Benefit

- Independent scaling. CQRS allows the read and write workloads to scale independently, and may result in fewer lock contentions.
- Optimized data schemas. The read side can use a schema that is optimized for queries, while the write side uses a schema that is optimized for updates.
- Security. It's easier to ensure that only the right domain entities are performing writes on the data.
- Separation of concerns.
- Simpler queries

### Considerations

- Complexity
- Messaging
- Eventual consistency: Read and Write DB need to be consistent

---

#### Reference

- https://docs.microsoft.com/en-us/azure/architecture/patterns/cqrs
- https://martinfowler.com/bliki/CQRS.html
