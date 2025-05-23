---
title: Sql practices orm vs plain sql
description: Learn how to choose between raw SQL, ORM, and SQL generators, optimize database performance with smart indexing, avoid rounding errors, and write efficient queries for better security and speed.
date: 2021-07-07
tags:
  - database
  - sql
redirect:
  - /s/WJpmtA
---

## Definition

- Raw: make all query by self from scratch ORM: Object relational mapping: programing technique for converting data between incompatible type systems using OOP
- SQL Generator: utility sql tool for generate Entity model, query.

## Factors that affects the technique decision

- Productivity: spend time for development and maintain. Work with many different DB system, can replace in future
- Security: SQL injection
- Performance

### Practice

Use ORM for almost case, with DEEP understanding the library. Raw is supported in ORM Use Raw and SQL Generator for some special case

## Indexing

The best technique for improve performance in database is to use indexes well. A index is a data structure that the database uses to correlate value to the rows where these values occur in a given column. An index provides an easy way for the database to find values more quickly than the brute-force method of searching the whole table from top to bottom. Index can also help an Update or Delete statement by finding the rows quickly (primary key)

### Misunderstanding when using indexes

- Index Aren't Standard: ANSI SQL standard says nothing about indexes.
- Defining no indexes or not enough indexes
- Defining too many indexes or indexes that don't help
- Running queries that no index can help

Using INSERT, UPDATE, DELETE, the database has to update the index data structures for that table to be consistent so that our subsequent searches use these indexes to find the right set of rows reliably.

There's no benefit to creating indexes that we don't use

- Index on primary key column
- Index for a long string type
- Not going to search for specific values(datetime)
- Make compound indexes that are redundant or seldom used (can use join, search, sorting order criteria)

### Practice

Indexing base on the requirement or what queries are important to optimize

Measure the application code to find out the bottle-neck. Don't make informed decisions without information.

- Tool: pgfouine
- Using `Explain` to make a report of Query Analysis - Query Execution Plan(QEP).

### Make index with condition

CREATE UNIQUE INDEX line_items_prod_var_null_idx

ON line_items (product_id)

WHERE variant_id IS NULL

### Rebuild the index data

Over time, as we update and delete rows, the indexes may become fragmented overtime - SQL system tool

### Rounding errors

Fractional Number(float, decimal) is common type in db: money, measurement: length, weight, capacity, temperature, time. infinite precision VS finite precision: 1/3 vs 0.33

IEEE 754 represents floating-point numbers in a base-2 format. The Float data can't represent exactly in binary. The reason is we try to convert base-10 to base-2

See more reference at [Oracle’s document.](https://docs.oracle.com/cd/E19957-01/806-3568/ncg_goldberg.html)

### Practice

Use Numeric or Decimal in SQL for fixed-precision fractional numbers

### Query practice

- Use alias make the more readable query
- Prefer `=` than `like` than `like 'prefix%'` than `like '%content%'`
- Using `WITH` for complex query
- Avoid `DISTINCT`, should verify the reason of duplicated record
- Avoid `Select *`, spell out all columns you need(Select, Insert)

Get row with Greatest value per group. Follow the Single-Value rule to build the query. The rows in each group are those rows with the same value in the column or columns you name after GROUP BY. Every column in the select-list of a query must have a single value row per row group.

## Search a simple text

- Optimize search text in db
- Poor performance solution: wildcard (%) that matches zero or more characters.

### Practice

- Full-text search: support from db
- Third-party search engines - right tool for the right job
- Implement from scratch: `XXX`, `Keywords`, `XXXKeywords`. Create a procedure for searching. Make a trigger for update `Keywords` and `XXXKeywords` when Update or Insert data to `XXX` table

### Reference

- [pragprog.com/titles/bksqla/sql-antipatterns](https://pragprog.com/titles/bksqla/sql-antipatterns/)
- [www.enterprisedb.com/blog/postgresql-query-optimization-performance-tuning-with-explain-analyze](https://www.enterprisedb.com/blog/postgresql-query-optimization-performance-tuning-with-explain-analyze)
- [technical-recipes.com/2011/ieee-754-floating-point-to-binary-conversion](http://technical-recipes.com/2011/ieee-754-floating-point-to-binary-conversion)
