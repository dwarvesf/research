---
title: null
description: null
date: null
tags:
  - data
  - sql
  - practice
redirect:
  - /s/oxqeag
---

### Orm vs plain SQL

- Raw: make all query by self from scratch
- ORM: Object relational mapping: programing technique for converting data between incompatible type systems using OOP
- SQL Generator: utility sql tool for generate Entity model, query.

Factors affecting the technique decision

- Productivity: spend time for development and maintain. Work with many different DB system, can replace in future
- Security: SQL injection
- Performance

**Practice**:

- Use ORM for almost case, with DEEP understanding the library. Raw is supported in ORM
- Use Raw and SQL Generator for some special case

### Indexing

The best technique for improve performance in database is to use indexes well. A index is a data structure that the database uses to correlate value to the rows where these values occur in a given column. An index provides an easy way for the database to find values more quickly than the brute-force method of searching the whole table from top to bottom. Index can also help an Update or Delete statement by finding the rows quickly (primary key)

Misunderstanding when use indexes:

- Index Aren't Standard: ANSI SQL standard says nothing about indexes.
- Defining no indexes or not enough indexes
- Defining too many indexes or indexes that don't help
- Running queries that no index can help

Using INSERT, UPDATE, DELETE, the database has to update the index data structures for that table to be consistent so that our subsequent searches use these indexes to find the right set of rows reliably.

There's no benefit to creating indexes that we don't use:

- index on primary key column
- index for a long string type
- not going to search for specific values(datetime)
- make compound indexes that are redundant or seldom used (can use join, search, sorting order criteria)

**Practice**

Indexing base on the requirement or what queries are important to optimize

- Measure the application code to find out the bottle-neck. Don't make informed decisions without information. Tool: pgfouine
- Using Explain to make a report of query analysis - query execution plan(QEP).

- Make Index with condition CREATE UNIQUE INDEX line_items_prod_var_null_idx ON line_items (product_id) WHERE variant_id IS NULL

- Rebuild the index data: Over time, as we update and delete rows, the indexes may become fragmented overtime - SQL system tool

### Rounding errors

- Fractional Number(float, decimal) is common type in db: money, measurement: length, weight, capacity, temperature, time.
- infinite precision VS finite precision: 1/3 vs 0.33
- IEEE 754 represents floating-point numbers in a base-2 format. The Float data can't represent exactly in binary. The reason is we try to convert base-10 to base-2 https://docs.oracle.com/cd/E19957-01/806-3568/ncg_goldberg.html

Practice:

- Use Numeric or Decimal in SQL for fixed-precision fractional numbers

### Query practice

- Use alias make the more readable query
- Prefer = than like than like 'prefix%' than like '%content%'
- Using WITH for complex query
- Avoid DISTINCT, should verify the reason of duplicated record
- Avoid Select \*, spell out all columns you need(Select, Insert)

Get row with Greatest value per group. Follow the Single-Value rule to build the query. The rows in each group are those rows with the same value in the column or columns you name after GROUP BY. Every column in the select-list of a query must have a single value row per row group.

### Search a simple text

- Optimize search text in db
- Poor performance solution: wildcard (%) that matches zero or more characters.

**Practice:**

- full-text search: support from db
- third-party search engines - right tool for the right job
- implement from scratch: XXX, Keywords, XXXKeywords. Create a procedure for searching. Make a trigger for update Keywords and XXXKeywords when Update or Insert data to XXX table

---

#### Reference

- https://pragprog.com/titles/bksqla/sql-antipatterns/
- https://www.enterprisedb.com/blog/postgresql-query-optimization-performance-tuning-with-explain-analyze
- https://www.technical-recipes.com/2011/ieee-754-floating-point-to-binary-conversion/
