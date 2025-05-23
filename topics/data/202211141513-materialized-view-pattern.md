---
title: Materialized view pattern
description: Materialized view is the cache of views. It pre-computes, stores, and optimizes data access when created, and automatically refreshes to ensure real-time data availability.
date: 2022-11-14
authors:
  - haongo138
tags:
  - data
  - database
  - sql
  - data-warehouse
  - materialized-view
redirect:
  - /s/-N2uuQ
---

**Materialized view pattern**
TL,DR;
Versus "normal" view

- A normal view provides ease-of-use and flexibility features, but it DOES NOT speed up data access
- A Materialized view is the cache of views. It pre-computes, stores, and optimizes data access when created, and automatically refreshes to ensure real-time data availability

**Usecases**

- In data warehouses that have a large number of complex queries on large tables, consume a lot of time & resource, materialized views can eliminate the overhead of expensive joins and aggregations by responding to queries by pre-computed results.
- Especially useful for queries that can be anticipated and repeatedly use the same subquery results.

**Two main refresh strategies**
1/ Complete refresh

- Running within one transaction
- At the beginning, the old data of the materialized view is deleted
- Then, the new data is inserted by running the underlying SQL query.
- At the end of the refresh, the transaction is committed, and the new data is visible for all users.
  Pros: During this process, users can still use the materialized view and see the old data
  Cons: This process can take a long time as the number of rows that the materialized view contains

2/ Fast refresh (“incremental refresh” would be more appropriate)
In most cases, this method is much faster than a Complete Refresh

- A fast refresh requires having a materialized view log on each of the source tables that are referenced in the materialized view
- There are several preconditions to enable Fast Refresh, and if only one of them is missing, the Fast Refresh method does not work (can debug by using dbms_mview.explain_mview)

**References**

- https://learn.microsoft.com/en-us/azure/architecture/patterns/materialized-view
- https://docs.oracle.com/en/database/oracle/oracle-database/18/dwhsg/refreshing-materialized-views.html#GUID-BB945209-8D69-4FC7-844E-35C9ED7C8A80

#data
@brain master
