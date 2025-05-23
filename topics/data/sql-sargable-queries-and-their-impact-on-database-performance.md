---
title: SQL saragable queries and their impact on database performance
description: Structured Query Language (SQL) is widely used for managing data in relational database management systems (RDBMS). In the context of SQL, the optimization of database queries forms the foundation for efficient data retrieval, providing quicker response times and increasing overall database performance. One key strategy to optimize SQL queries involves the concept of "Sargable" queries...
date: 2023-09-14
authors:
  - monotykamary
github_id: monotykamary
tags:
  - database
  - performance
  - sql
  - sargable-queries
redirect:
  - /s/9N2l7Q
---

Structured Query Language (SQL) is widely used for managing data in relational database management systems (RDBMS). In the context of SQL, the optimization of database queries forms the foundation for efficient data retrieval, providing quicker response times and increasing overall database performance. One key strategy to optimize SQL queries involves the concept of "Sargable" queries.

"Sargable" is derived from "Search ARGument ABLE," signifying that a query can successfully utilize indexes for efficient execution. It is a term that was initially introduced in a 1979 research paper titled "Access Path Selection in a Relational Database Management System" authored by P. Griffiths Selinger et al. (DBA.StackExchange.com). The fundamental idea behind sargable queries is geared towards forming SQL statements that allow the query execution engine to make the best use of indexes whenever available.

## Sargable vs. non-sargable queries

A central feature differentiating sargable from non-sargable queries is the manner in which operations are executed on indexed columns. Non-sargable queries include function calls or operations that use an indexed field in the WHERE clause, a feature that hinders the usage of indexes.

| Non-sargable Query                                                  | Sargable Query                                                                              |
| ------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| `SELECT * FROM myTable WHERE SUBSTRING(myColumn, 1, 3) = 'ABC';`    | `SELECT * FROM myTable WHERE myColumn LIKE 'ABC%';`                                         |
| `SELECT * FROM myTable WHERE DATEDIFF(day, myDate, GETDATE()) = 7;` | `SELECT * FROM myTable WHERE myDate >= DATEADD(day, -7, GETDATE()) AND myDate < GETDATE();` |
| `SELECT * FROM myTable WHERE ISNULL(myColumn, 'N/A') = 'N/A';`      | `SELECT * FROM myTable WHERE myColumn IS NULL;`                                             |

### Wildcards

Attempting to use wildcards at the beginning of a string in a LIKE clause also tends to create non-sargable conditions. For instance, the condition `WHERE name LIKE '%prefix%'` usually results in a table or index scan, which is significantly slower than an index seek.

Let's consider a simple example. Suppose we have a table called "Customers" with columns "CustomerID", "Name", and "Address". We want to find all customers who live in a particular city. A non-sargable query would be:

```sql
SELECT * FROM Customers WHERE Address LIKE '%New York%';
```

This query is not sargable because the LIKE operator does not allow the query engine to use an index on the Address column. However, we can modify the query to make it sargable:

```sql
SELECT * FROM Customers WHERE Address = 'New York';
```

Now, the query engine can use an index on the Address column to optimize the search process.

### Handling NULL values

Another important aspect of sargable queries is handling NULL values properly. The returned dataset will be empty if we do not handle NULL values correctly. For example, consider the following query:

```sql
SELECT * FROM Customers WHERE Name IS NOT NULL;
```

This query is not sargable because the `IS NOT NULL` predicate does not allow the query engine to use an index. To make this query sargable, we can modify it to:

```sql
SELECT * FROM Customers WHERE Name IS NOT NULL AND Address IS NOT NULL;
```

Now, the query engine can use an index on the Name and Address columns to optimize the search process.

### Calling with functions

A non-sargable query may look like `WHERE YEAR(dateColumn) = 2022`. The problem with such a query is that it requires evaluation of the function `YEAR(dateColumn)` for each row in the table, thus preventing us to use any pre-existing index on `dateColumn`, an operation leading to inefficient table scans.

Sargable queries aim at performing operations responsibly by avoiding function calls on indexed columns whenever possible. For instance, reversing the non-sargable condition from

```sql
SELECT *
FROM myTable
WHERE YEAR(dateColumn) = 2023;
```

to

```sql
SELECT *
FROM myTable
WHERE dateColumn >= '2023-01-01' AND dateColumn < '2024-01-01';
```

allows the query optimizer to use our indexes and not run the function on every row.

## Impact on performance

The distinction between sargable and non-sargable queries lies primarily in how efficiently they facilitate usage of indexes. Sargable queries allow the database engine to perform index seeks, a process whereby only the matching data in index pages are read, hence reducing the consumption of [[SQL and how it relates to Disk Reads and Writes|input/output (IO) resources and time]].

Several advantages come from employing sargable queries. The main benefit lies in leveraging indexes, thereby improving search speed. Depending on the data type and column values, diverse index types such as clustered indexes, non-clustered indexes, and columnstore indexes can be used.

## Conclusion

In modern databases, where massive data sizes are common, improving query performance can significantly impact the overall system speed and efficiency. Sargable queries provide a crucial optimization strategy that should be taken into account during SQL programming and query design.

By understanding how sargable queries can take advantage and efficiently use indexes, database administrators, and developers can significantly boost search speeds and performance. Furthermore, ways to convert non-sargable queries into sargable queries by avoiding function calls on indexed columns and leveraging efficient use of the LIKE operator and wildcards should be studied for regular practice.

## References

- https://stackoverflow.com/questions/799584/what-makes-a-sql-statement-sargable
- https://www.sqlshack.com/how-to-use-sargable-expressions-in-t-sql-queries-performance-advantages-and-examples/
- https://www.tech-recipes.com/uncategorized/sargable-queries-in-sql-server-with-examples/
- https://www.mssqltips.com/sqlservertip/6795/improve-sql-server-query-performance-searchable-arguments/
- https://dba.stackexchange.com/questions/162263/what-does-the-word-sargable-really-mean
