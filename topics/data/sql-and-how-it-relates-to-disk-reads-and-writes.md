---
title: Sql and how it relates to disk reads and writes
description: Sequential read/write operations involve accessing data in a continuous, linear manner. This typically occurs when transferring large files or accessing a large file on the drive. In sequential read/write operations, the drive can read or write data from a series of blocks, allowing for faster performance...
date: 2023-09-06
authors:
  - monotykamary
github_id: monotykamary
icy: 10
tags:
  - data
  - random-reads
  - random-writes
  - sequential-reads
  - sequential-writes
  - engineering
redirect:
  - /s/uuLKzA
---

## What are random and sequential reads and writes?

Random and sequential reads and writes refer to the way data is accessed, read, and written on hard disks

![](assets/sql-and-how-it-relates-to-disk-reads-and-writes_disk-sequential-random-access.webp)

Sequential read/write operations involve accessing data in a continuous, linear manner. This typically occurs when transferring large files or accessing a large file on the drive. In sequential read/write operations, the drive can read or write data from a series of blocks, allowing for faster performance.

Random read/write operations, on the other hand, involve accessing small files scattered throughout the drive. This is common when opening multiple files or applications simultaneously, such as a Word document, a spreadsheet, and a web browser. In random read/write operations, the drive needs to access data from random blocks repeatedly, which can result in slower performance. Hard drives have a harder time with random operations compared to SSDs, as the read/write head has to position itself to get the requested data, increasing seek time.

TL;DR: Sequential reads and writes involve accessing data in a continuous, linear manner, while random reads and writes involve accessing small files scattered throughout the drive. Hard drives generally perform better in sequential operations compared to random operations due to the physical limitations of the read/write head.

## What does this mean for database design?

Random and sequential reads and writes have implications for CQRS (Command Query Responsibility Segregation) and database design. CQRS is an architectural pattern that separates read and write operations for a data store, allowing for optimized performance, scalability, and security.

In the context of random and sequential reads and writes, CQRS can benefit from the separation of read and write operations. For example, the read side can use a schema optimized for queries, which may involve more random reads, while the write side can use a schema optimized for updates, which may involve more sequential writes. This separation allows for independent scaling of read and write workloads, potentially reducing lock contentions and improving overall performance.

Moreover, CQRS can take advantage of different storage technologies for read and write operations, such as using SSDs for random reads and traditional hard drives for sequential writes. This flexibility can lead to better performance and resource utilization, depending on the specific use case and requirements of the application.

## Sql operation on disk reads/writes

In the context of SQL operations and hard disk actions, different SQL operations can result in either sequential or random read/write actions on the hard disk. Here's a breakdown of some common SQL operations and their corresponding hard disk actions:

1. **SELECT**: Reading data from a table can be either sequential or random, depending on the query and the organization of the data on the disk. If the data is well-organized and the query accesses contiguous blocks, it can result in sequential reads. However, if the data is scattered across the disk, it can result in random reads.

2. **INSERT**: Inserting new data into a table can be either sequential or random, depending on the organization of the data and the table structure. For example, if the data is appended to the end of the table, it can result in sequential writes. However, if the data is inserted into various locations within the table, it can result in random writes.

3. **UPDATE**: Updating existing data in a table can result in random read/write operations, as the data to be updated may be scattered across the disk.

4. **DELETE**: Deleting data from a table can also result in random read/write operations, as the data to be deleted may be scattered across the disk.

5. **INDEX**ing: Creating or updating indexes can result in both sequential and random read/write operations, depending on the organization of the data and the index structure. For example, creating a clustered index can result in sequential writes, while creating a non-clustered index can result in random writes.

## Optimizing sql for better sequential reads/writes

To optimize PostgreSQL database performance for sequential reads and writes, you can follow these general recommendations:

1. **Table partitioning**: Partition large tables into smaller, more manageable pieces to improve query performance and reduce the amount of data that needs to be scanned.

2. **Indexing**: Create appropriate indexes to speed up query execution and minimize random disk access. Be cautious not to over-index, as it can slow down write operations.

3. **Optimize query execution**: Use the **EXPLAIN** command to analyze query plans and identify potential bottlenecks. Optimize queries by rewriting them or adjusting configuration parameters to improve performance.

4. **Separate tablespaces on different disk drives**: Physically store each tablespace on a different disk drive to prevent the disk from being overloaded with I/O operation requests.

5. **Tune configuration parameters**: Customize PostgreSQL configuration parameters, such as shared_buffers, work_mem, and maintenance_work_mem, to improve read and write performance.

6. **Write-ahead log (WAL) configuration**: Adjust WAL configuration parameters, such as wal_buffers, checkpoint_timeout, and checkpoint_completion_target, to optimize write performance.

7. **Filesystem optimization**: Disable `atime` (the timestamp at which the file was last accessed) for the data files to save CPU cycles).

8. **Use CLUSTER or pg_repack**: Reorganize the table data to match the index order, which can improve the performance of sequential scans.

Remember that each PostgreSQL database server's environment is different, so it's essential to test and adjust these recommendations according to your specific needs and use case.

## Conclusion

In summary, SQL operations can result in either sequential or random read/write actions on the hard disk, depending on the organization of the data, the table structure, and the specific operation being performed. The impact of sequential and random reads and writes on SQL database performance can be significant, and it is important to design the database disk storage in such a way that maximum sequential I/O may be performed to optimize performance.

## References

- https://www.redhat.com/architect/pros-and-cons-cqrs
- https://www.baeldung.com/cs/sequential-vs-random-write
- https://superuser.com/questions/1325962/sequential-vs-random-i-o-on-ssds
- https://medium.com/design-microservices-architecture-with-patterns/cqrs-design-pattern-in-microservices-architectures-5d41e359768c
- https://learn.microsoft.com/en-us/azure/architecture/patterns/cqrs
- https://www.howtogeek.com/769286/sequential-vs-random-read-write-operations-for-storage/
- https://www.usenix.org/legacyurl/impact-sequential-and-random-io
- http://www.eventstore.com/cqrs-pattern
- https://medium.com/codex/cqrs-design-pattern-5-things-you-should-know-ecaab3f406cc
- https://stackoverflow.com/questions/2100584/difference-between-sequential-write-and-random-write
- https://www.redhat.com/architect/illustrated-cqrs
- https://kislayverma.medium.com/architecture-pattern-cqrs-7a91e9050b0d
- https://www.techpowerup.com/forums/threads/sequential-r-w-vs-random-r-w.268820/
- https://itnext.io/a-practical-guide-to-cqrs-af4e2d797383
- https://anarsolutions.com/when-to-go-for-cqrs-design-pattern/
- https://superuser.com/questions/1474993/trying-to-understand-random-access-write-versus-sequential-access-writes
- https://docs.aws.amazon.com/prescriptive-guidance/latest/modernization-data-persistence/cqrs-pattern.html
- https://blog.risingstack.com/when-to-use-cqrs/
- https://news.ycombinator.com/item?id=35878961
- https://www.upsolver.com/blog/cqrs-event-sourcing-build-database-architecture
- https://betterprogramming.pub/cqrs-software-architecture-pattern-the-good-the-bad-and-the-ugly-e9d6e7a34daf
- https://condusiv.com/sequential-io-always-outperforms-random-io-on-hard-disk-drives-or-ssds/
- https://www.linkedin.com/pulse/how-cqrs-solves-problem-overloading-transactional-database-gontu-1e
- https://dba.stackexchange.com/questions/285809/do-databases-optimize-random-write-and-read-operations
