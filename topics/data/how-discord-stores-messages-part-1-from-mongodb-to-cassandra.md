---
title: How discord stores messages part 1 from mongodb to cassandra
description: Learn how Discord migrated from MongoDB to Cassandra for scalable, low-maintenance data storage, handling billions of messages with predictable performance and eventual consistency.
date: 2023-06-02
github_id: fuatto
icy: 10
redirect:
  - /s/8sY0ow
---

## Introduction

The story of how Discord stores data, what technologies they have used/ been using to "adapt" the continuously growing users data.

<br/>

## Context

In early 2015, Discord was built choosing MongoDB for its quick data iteration. All data was stored in a single MongoDB replica set intentionally - but planned everything for easy migration to a new database (MongoDB sharding is too complicated to use and not stable)

Their MongoDB collection with a single compound index `(channel_id, created_at)` could no longer handle 100 million messages (around November 2015), therefore the migration to a new database.

<br/>

## Choosing the right database

To understand the read/write patterns and identify the current problems are prerequisite:

- Discord's reads were mostly random and the read/write ratio was 50/50
- Voice chat heavy Discord servers sent ~1000 messages a year at the time but returning these messages to a user could result in random seeks on disk, hence [disk cache eviction](https://www.mongodb.com/community/forums/t/how-to-check-cache-eviction-occurred-or-not-how-to-simulate-cache-eviction/172040)
- Private text chat heavy Discord servers sent ~100k to 1 million messages a year and the requested data is only recent. Since these servers usually have less than 100 members at which the requested data rate is low, it is unlikely to be in disk cache.
- Large public Discord servers have thousands of members that could produce millions of messages a year and they request very often. Therefore the data is usually in the disk cache.
- Upcoming features would be: view your mentions for the last 30 days then jump to that point, jump to pinned messages, full-text search => more random reads!

Then the requirements:

- **Linear scalability** - Not reconsider the solution later or manually re-shard data
- **Automatic failover** - Self heal
- **Low maintenance** - It should work once set up. Only need to add more nodes as data grows
- **Proven to work** - Not too new tech
- **Predictable performance** - Keep the alerts going off at API's response time 95th percentile goes above 80ms and no Redis or Memcached messages
- **Not a blob store** - writing thousands of messages per second would not work well
- **Open source** - Independent

**Cassandra** was the only database that fulfilled all of the requirements: can just add nodes to scale and tolerate a loss of nodes with no impact on the app, Netflix and Apple also have thousands of Cassandra nodes, minimum seeks as the related data is stored contiguously and it's open source.

<br/>

## Data modeling

Bear in mind that [Cassandra is a distributed database](https://cassandra.apache.org/doc/latest/cassandra/data_modeling/intro.html) :
**KKV database** - the first K stands for partition key used to partition data among the nodes while the second K is clustering key used for sorting within a partition.

In the indexed message in MongoDB using (channel_id, created_at), the `channel_id` became the partition key, but since two messages can have the same creation time so the Snowflake `message_id` is the better clustering key.

The simplified schema for message table would look like:

```
CREATE TABLE messages (
  channel_id bigint,
  message_id bigint,
  author_id bigint,
  content text,
  PRIMARY KEY (channel_id, message_id)
) WITH CLUSTERING ORDER BY (message_id DESC);
```

Even Cassandra advertises that it can support 2GB partitions but it immediately shows warning logs (100MB specifically - this would be a threshold underlying the implementation in Cassandra) when importing the existing messages and clearly that the schema needs updating to bound the size of partitions as a Discord channel would perpetually grow in size.

Bucket the messages by time (10 days - after estimation) would guarantee the size less than 100MB, buckets had to be derivable from the `message_id` or a `timestamp`:

```
DISCORD_EPOCH = 1420070400000
BUCKET_SIZE = 1000 * 60 * 60 * 24 * 10

def make_bucket(snowflake):
   if snowflake is None:
       timestamp = int(time.time() * 1000) - DISCORD_EPOCH
   else:
       # When a Snowflake is created it contains the number of
       # seconds since the DISCORD_EPOCH.
       timestamp = snowflake_id >> 22
   return int(timestamp / BUCKET_SIZE)


def make_buckets(start_id, end_id=None):
   return range(make_bucket(start_id), make_bucket(end_id) + 1)
```

Cassandra supports compound partition keys:

```
CREATE TABLE messages (
   channel_id bigint,
   bucket int,
   message_id bigint,
   author_id bigint,
   content text,
   PRIMARY KEY ((channel_id, bucket), message_id)
) WITH CLUSTERING ORDER BY (message_id DESC);
```

<br/>

## Eventual consistency

Right after launching, the bug tracker found that the `author_id` was null despite of being a required field. It happens in the scenario that a user edits a message at the same time another one deletes the same message, the row only had values of primary key and the text while the rest is null.

The explanation for this behavior of Cassandra is that Cassandra is an [AP](https://en.wikipedia.org/wiki/CAP_theorem) database which means it trades consistency for availability (as Discord wanted).

The simple solution to this problem is just to delete any message that has required columns null. Cassandra cannot delete data immediately, it has to replicate deletes to other nodes and do it even if other nodes are temporarily unavailable. It does this by writing a "tombstone" living for a configurable amount of time (10 days by default) and the data is permanently deleted when time expires.

Deleting a column and writing null to a column are the exact same thing, that is they both generate a tombstone. This means that an average message having 4 values set out of 16 columns generates 12 tombstones in Cassandra for no reason. The solution for this is just write only non-null values to Cassandra.

This has 1 flaw only realized after rolling out about 6 months that a public Discord server has a channel with only 1 message left after the user deleted millions of messages before, causing the Cassandra to scan millions of tombstones every time a user loads this channel. The solution was just adjust the lifespan of tombstones from 10 days down to 2 days because of running the [builtin Cassandra repair](https://docs.datastax.com/en/archived/cassandra/2.1/cassandra/tools/toolsRepair.html#toolsRepair__description) every night and update the query code to track empty buckets.

<br/>

## Future plan

At the time, Discord were running 12-node cluster with a replica factor of 3. Continue to add new Cassandra nodes seems fine as Netflix and Apple were running hundreds of nodes.

- Near term:
  - Upgrade Cassandra 2 to Cassandra 3 that would help reduce storage size by more than 50%
  - Handle better with more data on 1 node (from 1TB to 2TB)
- Long term:
  - Explore [Scylla](https://www.scylladb.com/) - a Cassandra compatible database written in C++, as data grows the repair time increase and Scylla claims to have significantly lower repair time.
  - Build a system to archive unused channels to flat files on Google Cloud Storage and load them back on-demand (most likely no need)

<br/>

## References

- https://www.mongodb.com/community/forums/t/how-to-check-cache-eviction-occurred-or-not-how-to-simulate-cache-eviction/172040
- https://cassandra.apache.org/doc/latest/cassandra/data_modeling/intro.html
- https://datacadamia.com/cassandra/cassandra#kkv_store
- https://en.wikipedia.org/wiki/CAP_theorem
- https://discord.com/blog/how-discord-stores-billions-of-messages
