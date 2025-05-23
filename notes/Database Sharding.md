---
title: null
description: null
date: null
tags:
  - database
  - sharding
  - engineering
redirect:
  - /s/_zIftw
---

### Why?

Data-driven app need ability to scale dynamically to against significant growth in the future

### What?

- Database architecture
- Horizontal partitioning - separating one table’s rows into multiple different tables (partitions)

### How?

- Breaking up one’s data into 2 or more smaller chunks (logical shards)
- Chunks are distributed across separate DB nodes (physical shards)
- Exemplify a shared-nothing architecture - means that they don’t share any of the same data or computing resources
- A table can be replicate to all shared as a ref table
- Can be implement in both BE layer and DB layer (clickhouseDB)

### Benefit

- Facilitate horizontal scaling (scaling out) by adding more machines to an existing stack in other to spread out the load and allow for more traffic and faster processing <> scaling up - add more compute power by upgrade hardware
- Ignore limitation of non-distributed database in terms of storage and compute power.
- Increasing speed of query stmt (each shard query itself instead of all rows)
- Avoid the the impact of outages (an outage is likely to affect only a single shard)

### Limitation

- Complexity of shared DB architecture implementation
- Manage data across multiple shard locations instead of one point
- Shards eventually become unbalanced
- Difficult to return to its unsharded architecture
- Sharding isn’t natively supported by every database engine

### Sharding architectures

- Key Based Sharding: hashing a value from new data to determine which shard the data should go to
- Range Based Sharding: Using range of given value to determine target shard to store data
- Directory Based Sharding: Implement a lookup table for shard system.
