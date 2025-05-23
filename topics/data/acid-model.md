---
title: Acid model
description: Learn how the ACID model ensures database transaction reliability with atomicity, consistency, isolation, and durability for accurate, secure, and concurrent data management in ACID-compliant systems.
date: 2022-04-18
github_id: monotykamary
redirect:
  - /s/iGVCUg
---

## What is the ACID model?

ACID is an acronym that generally describes the necessity for consistency of a transaction in a database. The acronym stands for:

- **Atomicity**: Each transaction is handled as a unit of work that is either properly carried out or halted. When it is halted, the transaction is reverted to the previous state before the transaction to ensure validity of all data in the database.
- **Consistency**: Although self-explanatory with regard to data, any rules, constraints, cascades, and triggers must have valid and consistent data.
- **Isolation**: Transactions cannot affect or jeopardize the integrity of other transactions by interacting with them while they are still in progress. This means a majority of transactions that are ACID should run concurrently.
- **Durability**: After a commit of a completed transaction, we can be assured that the transaction itself will be persisted in the event of a network partition or a power outage. _This does not assume or take in consideration single-upset events._

![](assets/acid-model_acid_acronym_diagram.webp)

## Why use ACID?

ACID is particularly important for businesses when there is a high requirement for consistent and durable data. Data consistency or loss of data would eventually translate to loss of revenue, especially if the software in question is critical for daily operations or strategic analysis. Thresholds for requiring an ACID compliant database would be:

- Requirement in order of transactions and activities
- Low to zero tolerance for incomplete transactions
- Multiple access of processes or users to the database
- Low to zero tolerance for showing stale data to users

## What is ACID compliance?

Successfully hitting the requirements for the acronym would essentially give the database ACID compliance. When the database has proof ACID-compliant documents and management, business get to benefit for the insurance of:

- **Less user disruptions**: When a system or business logic fails to handle a case, database durability should prevent users from noticing big issues.
- **Protected transactions:** ACID compliant transactions regarding fiat or money transfers prevents loss of capital when an operation fails.
- **Consistent accuracy:** ACID compliance ensures a high level of correctness with regard to aggregation of data, such as totals in a bank balance. You can be assured that the total is consistent to the activities that have taken place.
- **Cost savings and reduced risk:** With relevance to finance, ACID transactions prevent double spending or cases of irretrievable capital.
- **Precise timeliness:** Record access of ACID compliant data means that data will always be up-to-date, regardless of what transactions are currently in progress. ACID compliance ensures concurrency control such that, transactions must reach a state that is consistent to the user accessing the data.

## What databases are ACID compliant?

Most relational databases are ACID compliant, such as MySQL, PostgreSQL, Oracle, SQLite, and Microsoft SQL Server. NoSQL databases such as Apache's CouchDB, ArangoDB, or IBM's Db2 also implement or follow a close implementation of ACID for compliance.

#### Reference

- https://database.guide/what-is-acid-in-databases/
- https://phoenixnap.com/kb/acid-vs-base
- https://www.indeed.com/career-advice/career-development/acid-database
