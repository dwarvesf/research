---
title: "Case study: Write-heavy scalable and reliable inventory platform"
description: How Doordash designed a successful write-heavy scalable and reliable inventory platform
date: 2023-02-28
authors:
  - tienan92it
discord_id: "antran#3200"
tags:
  - inventory-platform
  - observability
  - scalability
  - doordash
  - low-latency
  - reliability
  - write-heavy
redirect:
  - /s/jow4Dg
---

https://doordash.engineering/2023/02/22/how-doordash-designed-a-successful-write-heavy-scalable-and-reliable-inventory-platform/
TLDR;
**Case study:** Write-heavy scalable and reliable inventory platform

**The technical requirements**

- High Scalability
- High reliability
- Low latency
- High observability

**Database table optimization**

- **Choose a natural primary key instead of auto-incrementing a primary key**: combined primary key naturally constructed from business parameters -> reduce columns and query more efficiently because all our queries are mostly centered around those business parameters.
- **Cleanup DB indexes**:
  - Add missing indexes for all the queries
  - Remove unnecessary indexes
- **Reduce the column count**: put some of the frequently updated columns into one single JSONB column -> There are pros and cons based on use cases
- **Configure TTL for fast-growing tables**: add TTL for high-intensity-write tables which do not need to have data for too long
- ** Batch and rewrite queries within one SQL request whenever possible in API and DB**: this will save a lot of QPS for downstream services and databases.
