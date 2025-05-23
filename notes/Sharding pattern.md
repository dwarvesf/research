---
title: null
description: null
date: null
tags:
  - pattern
redirect:
  - /s/vXrDPQ
---

### What

This advanced pattern focuses on horizontally scaling data through sharding.

### Context

A centralized database could have problem:

- Storage space: huge volume of data that could increase significantly over time.
- Computing resources: Number of concurrent users could be overwhelming. A single db could reach the limit.
- Network Bandwidth
- Geography: Sometime, due to laws, we have to put data in the country. E.g: Vietnam, Chinese

Vertically scaling can only the temporary solution for big system.

### Solution

Divide the data store into horizontal partitions or shards. Each shard has the same schema, but holds its own distinct subset of the data. A shard is a data store in its own right (it can contain the data for many entities of different types), running on a server acting as a storage node.

Separating one table’s rows into multiple different tables, known as partitions. Each partition has the same schema and columns, but also entirely different rows.

Benefit of Sharding pattern:

- Horizontal scaling, scaling is adding more shards, not required super strong hardware.
- Reduce contention and improve performance by load balancing between shards.
- In the cloud, shards can be located physically close to the users

Each shard should have the same data-dividing algorithm. Where the data is stored should base on one or more attributes of data, should be static and not depend on data that might change.

When application access the data, the sharding logic should direct to the necessary shards. Oftentimes, sharding is implemented at the application level, meaning that the application includes code that defines which shard to transmit reads and writes to. However, some database management systems have sharding capabilities built in, allowing you to implement sharding directly at the database level.

### Sharding strategies

- The Lookup strategy: must create and maintain a lookup table that uses a shard key to keep track of which shard holds which data. In a nutshell, a lookup table is a table that holds a static set of information about where specific data can be found. E.g: Data with region code is 1 (Asia) data should be store in Asia's shard.
- The Range strategy involves sharding data based on ranges of a given value. To illustrate, let’s say you have a database that stores information about all the products within a retailer’s catalog. You could create a few different shards and divvy up each products’ information based on which price range they fall into
- The Hash strategy involves using a value taken from newly written data — such as a customer’s ID number, a client application’s IP address, a ZIP code, etc. — and plugging it into a hash function to determine which shard the data should go to

Each strategy should suite with specific requirements, we should carefully choose based on business/system logic.

### When should you shard

- The amount of data would exceed the storage capacity of single database node. E.g: Ethereum
- The volume of writes or reads to the database surpasses what a single node or its read replicas can handle, resulting in slowed response times or timeouts
- Huge bandwidth that would outpaces the bandwidth available for single node

=> In very very big system should use shard

### Considerations

- Huge complexity
- Unbalance sharding
- No way back: After you sharding, really difficult to comeback
- Isn’t natively supported by every database engine

![[DB_image_1_cropped.png]]

---

#### Reference

- https://www.digitalocean.com/community/tutorials/understanding-database-sharding
- https://docs.microsoft.com/en-us/azure/architecture/patterns/sharding
