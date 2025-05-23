---
title: Database locking
description: Learn how explicit locking techniques in PostgreSQL help manage concurrency control and prevent data conflicts in high workload databases by using table-level, row-level, and advisory locks effectively.
date: 2023-04-22
github_id: vhbien000
icy: 10
redirect:
  - /s/9wEMvQ
---

Some of us had built a game, while others were familiar with e-commerce platforms, dapps, or even all of these types of applications, and more. Each type of software that we were working on needed different techniques, some of which were similar. So the same problem can happen in every software product. In this post, we will discuss an issue in high workload databases together. It is **Concurrency Control**.

Let's consider that we have an e-bank application that includes an account table. Each account stores the balance, and we need to subtract when there is a withdrawal transaction and add when there is a deposit transaction.

Assume that the system is developed included following steps:

- Select the sender's balance
- Check sender's balance
- Select the recipient's balance
- Subtract/add balances of both sender and recipient
- Update balance

With all of the loose steps above, we can imagine that there are a few gaps here. So problems can arise at any time. For example, imagine that we have two users: A with a balance of \$300 and B, whose balance is not relevant here. And we also have two separate transactions: the first requests sending \$200 from A to B, and the second is for \$300.

We can see very transparent issue here when both of these transactions come in the same time, select sender's balance in the same time that is $300, and get success in the same time, first updates the balance of A to \$100, while second updates it to \$0.

This is just a simple example. We also have many related scenarios like this, but listing all of them is not the purpose of this post. We will use it as an issue that helps us open the door to one of the techniques used by databases to resolve the problem: **Explicit Locking**.

> _Note that I will approach the problem by using PostgreSQL, so every concept in this article should be biased towards this database. Different databases can be implemented in different ways with different concepts and names, but under the hood, they should be similar._

## Firstly, what is the Explicit Locking in Database?

Database locking is one of the most common mechanisms that helps us achieve concurrency control in a database by preventing multiple transactions from accessing the same data simultaneously. The first thing that we need to explore is the types of locking in SQL databases.

As I know, we have two popular types of database locking

- **Shared locks** allow multiple transactions to read a resource simultaneously, but prevent other transactions from modifying the locked resource until the lock is released. They are helpful when we need to read data frequently but modify it infrequently.
- **Exclusive locks** are used when a transaction needs to modify data. This type of lock prevents any other transaction from accessing the same data until the lock is released. This means that when a transaction holds an exclusive lock on a resource, it has the ability to modify the data without interference from other transactions.

Besides these types of locks, some database also support others such as following

- Update locks can be used to protect a resource from being modified while it is being read.
- Intent Locks signal the intention to acquire a shared or exclusive lock on a resource. This can be thought of as a lock of locks.
- Schema Locks are used to prevent concurrent schema modifications.

Besides the type, we also split database locking to a few level depends on the scope of this lock as following.

```
         +----------------------------------------------------+
         |                                                    |
         |                DATABASE LEVEL LOCKING              |
         |                                                    |
         |   +--------------------------------------------+   |
         |   |                                            |   |
         |   |             TABLE LEVEL LOCKING            |   |
         |   |                                            |   |
         |   |  +--------------------------------------+  |   |
         |   |  |                                      |  |   |
         |   |  |         PAGE LEVEL LOCKING           |  |   |
         |   |  |                                      |  |   |
         |   |  |  +-----------------------------+     |  |   |
         |   |  |  |                             |     |  |   |
         |   |  |  |     ROW LEVEL LOCKING       |     |  |   |
         |   |  |  |                             |     |  |   |
         |   |  |  +-----------------------------+     |  |   |
         |   |  |                                      |  |   |
         |   |  +--------------------------------------+  |   |
         |   |                                            |   |
         |   +--------------------------------------------+   |
         |                                                    |
         +----------------------------------------------------+
```

_Image 1: Locking scopes_

| Locking Level       | Description                                                                                                                                        |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| Database-level lock | The highest level of locking that can be applied to a database. This lock prevents any concurrent access to the entire database.                   |
| Table-level lock    | A lock applied to an entire table, preventing any concurrent access to the table.                                                                  |
| Page-level lock     | A lock applied to a single page of data in a table, preventing any concurrent access to that page.                                                 |
| Row-level lock      | The most granular level of locking, applied to a single row of data in a table. This allows for concurrent access to other rows in the same table. |

_Table 1: Locking levels_

In this post, we just only focus on the Table and Row Level Locking.

**Table level locks** are used to prevent access to a full table or relation by any transactions. The behavior of the lock depends on its type and is not always the same. Generally, these locks are automatically used by the database when proper behavior is triggered. However, you can also acquire a specific lock using the `LOCK` command.

There are several lock modes available for databases, varying in level and type of locking. The key difference between lock types is the set of other lock types that they can conflict with. This means that when a lock is set on a particular table, it prevents other transactions from acquiring conflicting locks. It is important to note that a transaction can conflict with itself.

For example in the PostgreSQL, we have following table that represents the Conflicting Locks Modes.

Sure, here's the updated table with "ACCESS SHARE" added to the second column before "ROW SHARE":

| REQUESTED LOCK MODE    | ACCESS SHARE | ROW SHARE | ROW EXCLUSIVE | SHARE UPDATE EXCLUSIVE | SHARE | SHARE ROW EXCLUSIVE | EXCLUSIVE | ACCESS EXCLUSIVE |
| ---------------------- | ------------ | --------- | ------------- | ---------------------- | ----- | ------------------- | --------- | ---------------- |
| ACCESS SHARE           |              |           |               |                        |       |                     |           | X                |
| ROW SHARE              |              |           |               |                        |       |                     | X         | X                |
| ROW EXCLUSIVE          |              |           |               |                        | X     | X                   | X         | X                |
| SHARE UPDATE EXCLUSIVE |              |           |               | X                      | X     | X                   | X         | X                |
| SHARE                  |              |           | X             | X                      |       | X                   | X         | X                |
| SHARE ROW EXCLUSIVE    |              |           | X             | X                      | X     | X                   | X         | X                |
| EXCLUSIVE              |              | X         | X             | X                      | X     | X                   | X         | X                |
| ACCESS EXCLUSIVE       | X            | X         | X             | X                      | X     | X                   | X         | X                |

_Table 2: Conflicting Lock Modes at Table Level [[1]](#1)_

Another common concept is **Row level locks**. At this level, locks do not affect data querying; they only block writers and lockers to the same rows. Row level locks can be released at transaction end or during savepoint rollback, just like table level locks.

Similar to table level locks, row level locks also have different lock modes and each of them may conflict with others. The following table provides a description of these modes:

| REQUESTED LOCK MODE | FOR KEY SHARE | FOR SHARE | FOR NO KEY UPDATE | FOR UPDATE |
| ------------------- | ------------- | --------- | ----------------- | ---------- |
| FOR KEY SHARE       |               |           |                   | X          |
| FOR SHARE           |               |           | X                 | X          |
| FOR NO KEY UPDATE   |               | X         | X                 | X          |
| FOR UPDATE          | x             | X         | X                 | X          |

_Table 3: Conflicting Row-Level Locks [[2]](#2)_

In addition to the database-defined locks listed above, some databases provide a means for creating locks that have application-defined meanings, called advisory locks. These locks are not used automatically; sometimes, we need the ability to customize the lock mechanism, so we implement advisory locks on the application level and control them manually.

For example, we can acquire an advisory lock in PostgreSQL in two ways:

- Advisory lock at the session level. In this case, the lock is not released automatically after the transaction is done, so we need to release it manually.
- Advisory lock at the transaction level, which looks more similar to regular locks. We do not need an explicit unlock operator to release it.

In the implementation, advisory locks try to acquire an `EXCLUSIVE` lock on a specific relation or table and prevent other transactions from accessing it.

We're good to move on to the next part, where we'll discuss the actual problem.

## Why do we need these lock, and how can we choose the right type of locking?

**Firstly, we continue with the problem that is raised at the beginning of this post.**

In this scenario, both transactions updated the balances of the same accounts at the same time, leading to a data conflict. The final balances of account X and account Y are different depending on which transaction committed first.

To avoid this problem, we can use `SELECT FOR UPDATE` to lock the rows that we want to update until the transaction is committed. This ensures that only one transaction can modify the selected rows at a time, preventing data conflicts. Here's an example of how we can transfer money using `SELECT FOR UPDATE`:

```SQL
BEGIN TRANSACTION;

SELECT balance FROM accounts WHERE account_number = 'A' FOR UPDATE;
-- Locks the row for account A

SELECT balance FROM accounts WHERE account_number = 'B' FOR UPDATE;
-- Locks the row for account B

UPDATE accounts SET balance = balance - 500 WHERE account_number = 'A';
-- Deduct $500 from account A

UPDATE accounts SET balance = balance + 500 WHERE account_number = 'B';
-- Add $500 to account B

COMMIT;
-- Releases the locks and commits the transaction
```

In this way, another transaction that also wants to select for update on the balance of A and B needs to wait until the current transaction is committed. This prevents data from conflicting.

**How about advisory lock, when we should use this?**

Suppose you have a distributed system with multiple servers that need to process messages from a message queue. Each server is responsible for reading messages from a specific subset of the queue, and you want to ensure that no two servers process the same message at the same time.

One approach would be to use SELECT ... FOR UPDATE to lock the message rows as they are being processed. However, this would require all the servers to use the same database connection, which could become a bottleneck and limit scalability. Additionally, if a server crashes or loses its connection to the database, its locks would be released and the same message could potentially be processed by another server.

A better approach would be to use advisory locks. Each server could use its own database connection to acquire an advisory lock on the message ID before processing it. This would prevent other servers from processing the same message concurrently, even if they are using different database connections or even different databases.

Here's an example script that demonstrates the use of advisory locks in PostgreSQL:

```SQL
-- Assume we have a message queue table with an ID column and a status column
CREATE TABLE message_queue (
  id SERIAL PRIMARY KEY,
  status TEXT
);

-- Function to process a message with a given ID
CREATE OR REPLACE FUNCTION process_message(id BIGINT)
RETURNS VOID AS $$
DECLARE
  lock_acquired BOOLEAN;
BEGIN
  -- Attempt to acquire an advisory lock on the message ID
  lock_acquired := pg_try_advisory_lock(id);

  -- If the lock was acquired, update the message status and commit the transaction
  IF lock_acquired THEN
    UPDATE message_queue SET status = 'processing' WHERE id = $1;
    COMMIT;
    -- Do some processing here...
    UPDATE message_queue SET status = 'processed' WHERE id = $1;
    COMMIT;
  ELSE
    -- The lock was not acquired, so another server must be processing this message
    RAISE NOTICE 'Could not acquire lock for message ID %', id;
  END IF;
END;
$$ LANGUAGE plpgsql;

-- Call the process_message function with a specific message ID
SELECT process_message(123);
```

In general, advisory locks should be used sparingly and only when necessary. They can add complexity to the application code and can also be a source of contention and performance issues if not used correctly.

## Conclusion

Explicit locking is the most accessible way to resolve concurrency control in high workload databases. Depending on the context of your application or feature, you can choose the proper type/level of database locking to avoid data conflicts, considering the pros and cons. However, this is not the only option. You can also choose other methods, such as implementing a queue or a separate service that divides and rules every request to your database. I hope this post helps you choose the right way to implement your application in the future.

## REFERENCES

- <a id="1">[1]</a> “Documentation: 15: 13.3. Explicit Locking.”, Table 13.2. Conflicting Lock Modes, PostgreSQL, https://www.postgresql.org/docs/current/explicit-locking.html. Accessed 23 April 2023.
- <a id="2">[2]</a> “Documentation: 15: 13.3. Explicit Locking.”, Table 13.3. Conflicting Row-Level Locks, PostgreSQL, https://www.postgresql.org/docs/current/explicit-locking.html. Accessed 23 April 2023.
- <a id="3">[3]</a> “Advisory Locks and How to Use Them.” shiroyasha.io, 16 November 2017, https://shiroyasha.io/advisory-locks-and-how-to-use-them.html. Accessed 23 April 2023.
- <a id="4">[4]</a>“Richard Clayton - Distributed Locking with Postgres Advisory Locks.” Richard Clayton, 16 February 2020, https://rclayton.silvrback.com/distributed-locking-with-postgres-advisory-locks. Accessed 23 April 2023.
- <a id="5">[5]</a>“Locking in Databases and Isolation Mechanisms | by Denny Sam | inspiringbrilliance.” Medium, https://medium.com/inspiredbrilliance/what-are-database-locks-1aff9117c290. Accessed 23 April 2023.
