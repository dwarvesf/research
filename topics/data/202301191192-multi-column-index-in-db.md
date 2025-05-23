---
title: Multi-column index in DB
description: Multi-column index in DB
date: 2023-01-19
authors:
  - hmhoang13
tags:
  - database
  - composite-index
  - index
  - multi-column-index
redirect:
  - /s/darNdA
---

**Multi-column index in DB**

Databases support creating composite indexes (index on multiple columns). If you specify the columns in the right order in the index definition, a single composite index can speed up several kinds of queries on the same table.
Suppose that a table has the following specification:

```sql
CREATE TABLE test (
    id         INT NOT NULL,
    col1  CHAR(30) NOT NULL,
    col2  CHAR(30) NOT NULL,
    col3  CHAR(30) NOT NULL,
    PRIMARY KEY (id),
    INDEX name (col1, col2, col3)
);
```

The index name is used for lookups in the following queries:

```sql
SELECT * FROM tbl_name WHERE col1=val1;
SELECT * FROM tbl_name WHERE col1=val1 AND col2=val2;
SELECT * FROM tbl_name WHERE col1=val1 AND col2=val2 AND col3=val3;
```

The index name is not used for lookups in the following queries:

```sql
SELECT * FROM tbl_name WHERE col2=val2;
SELECT * FROM tbl_name WHERE col2=val2 AND col3=val3;
```

**Summary**: If the table has a multiple-column index, any leftmost prefix of the index can be used by the optimizer to look up rows.
