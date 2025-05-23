---
title: Redis streaming
description: Learn how to use Redis Streaming for event sourcing and messaging with Docker setup, stream publishing, reading, consumer groups, and message claiming in Redis key-value database.
date: 2023-04-21
github_id: R-Jim
icy: 10
redirect:
  - /s/Gj7Khg
---

## What is Redis

Redis is an in-memory key-value database. It is open-source software that can be used as a database, cache, and message broker. Redis supports a wide range of data structures such as strings, hashes, lists, sets, sorted sets with range queries, bitmaps, hyperloglogs, and geospatial indexes with radius queries.

## What is Redis streaming

Redis Streaming is a feature of Redis, "A Redis stream is a data structure that acts like an **append-only** log". Redis Streaming uses a combination of Redis lists and Redis publish/subscribe to create a stream of data.

## Use cases for Redis streaming

- Redis Streaming can be used as a quick-to-implement option for event-sourcing type systems that already have Redis integrated into the system architect.

- A messaging service that is quick to setup and use with Redis-CLI, provides fairly minimal latency and massive throughput

## Setting up Redis container

**Prerequisites**: assume that you already have docker installed. If not then can refer to [Docker](https://www.docker.com/get-started/)

First, we need to pull the Redis docker image:

```
docker pull redis
```

<br/>

Then run the Redis docker container:

```
docker run -it --name redis-container -d redis
```

<br/>

Next, check if the container is up and running:

```
docker ps
```

Make sure to copy the Redis container's ID from the `CONTAINER_ID` section.

<br/>

To enter the Redis running container and execute the Redis command:

```
docker exec -it my_redis_container_id redis-cli
```

Finally, you should be able to see the terminal with the current host and port of the Redis container. (exp: `127.0.0.1:6379`)

```
➜  ~ docker exec -it 8876bd52e316 redis-cli
127.0.0.1:6379>
```

## Publish to a stream

When inside the Redis-CLI, running:

```
XADD mystream * sensor-id 1234
```

Will create a stream called `mystream` (if the stream does not exist), and add a new event entry to the stream with:

- `*` is replaced as the unique ID of the entry, and has a fixed format of `milliseconds-counter`. when given `*`, Redis will automatically generate the unique ID.

- `sensor-id 1234` is the entry data, with `sensor-id` as a field and `1234` as a value.

The result is the event entry's ID:

```
"1682082190877-0"
```

## Read entries from a stream

To read all entries from `mystream`:

```
XREAD STREAMS mystream 0
```

The result includes:

```
1) 1) "mystream"                // the stream
   2) 1) 1) "1682082190877-0"   // event entry id
         2) 1) "sensor-id"      // field
            2) "1234"           // value
```

The command has options like `COUNT` to select a number of entries:

```
XREAD COUNT 2 STREAMS mystream 0
```

To read all entries starting from an event entry from `mystream`:

```
XREAD STREAMS mystream 1682082190877-0
```

<br/>

To create a **consumer** that read the incoming entries that come after executing `XADD`:

```
XREAD BLOCK 0 STREAMS mystream $
```

Where `0` of `BLOCK` is the milliseconds that the consumer will wait for the incoming message (with `0` to wait until the message is received). `$` to specify the entry ID, when first reading the stream we can use `$` to fetch the newest entries then can replace it with an entry ID and read from it onward:

```
XREAD BLOCK 0 STREAMS mystream 1682082158921-0
```

## Consumer group

The case for the consumer group is that, for an event entry in the stream, we want to consume the event and perform different processes based on each group's functionality.

Exp: given an `item_payment_completed` event, we will have 2 consumer groups `update_item_stock` and `send_payment_notification`. Because they have different functionality, most of the time they will be represented as microservices, and one will be scaled up differently or replaced.

A consumer group is created from a stream using `XGROUP CREATE`. A Group contains `PEL`(Pending Entries List) and `consumers`:

```
XGROUP CREATE mystream mygroup $
```

The `$` is the entry ID to set where the group should start reading from (`$` will have the effect of the group consuming only new messages).

<br/>

### Read as a group's consumer

To nominate a consumer to read messages from the stream:

```
XREADGROUP GROUP mygroup Alice STREAMS mystream >
```

Where:

- `Alice` is the consumer's name. (Redis will automatically create one if not exist)
- `>` is the special ID to read only new messages never delivered to other consumers of the group so far.
- After execution, the result entries will be put into the `PEL` with the consumer name.

To see all the messages that are pending read of that consumer:

```
XREADGROUP GROUP mygroup Alice STREAMS mystream 0
```

From the returned result, the consumer `Alice` can now process the assigned events

<br/>

To see all the pending messages of the group:

```
XPENDING mystream mygroup
```

The result includes:

```
1) (integer) 8          // total pending message of the group
2) "1681479850819-0"    // id of the start message
3) "1682086334466-0"    // id of the end message
4) 1) 1) "Alice"        // consumer name
      2) "8"            // number of pending messages assign to the consumer
```

<br/>

After complete processing, the consumer can mark a pending message as complete with:

```
XACK mystream mygroup 1682086334466-0
```

The message `1682086334466-0` will be removed from `PEL` of the group, and that entry will be removed from `XREADGROUP 0` of the assigned consumer

<br/>

### Claiming messages from other consumers

**Notes**: `XCLAIM` and `XAUTOCLAIM` only work for messages that is in the `PEL` of the group.

**Scenario**: `Alice` consumer is stuck processing an event so other consumers need to step in and claim the message.

```
XCLAIM mystream mygroup Bob 3600000 1526569498055-0
```

Where:

- `Bob` is the other consumer name
- `3600000` is the minimum idle time required to claim the event, by milliseconds
- `1526569498055-0` is the event ID that is pending and was assigned to consumer `Alice`

After the event is claimed by `Bob`, `Bob` can now retrieve the event with `XREADGROUP 0` to process, and `XACK` it.

<br/>

In `XCLAIM` we will need the event ID (exp: retrieved from `XPENDING`) before claiming the message. With `XAUTOCLAIM`:

```
XAUTOCLAIM mystream mygroup Bob 3600000 0-0 COUNT 1
```

We can automatically claim any pending messages in `mystream` that has the minimum of `3600000` idle time from `mygroup` and assign it to `Bob`. To split the `XAUTOCLAIM` payload, we can use the optional `COUNT` to limit the number of event claims.

## References

- [Redis documentation](https://redis.io/docs/)
- [Redis streams tutorial](https://redis.io/docs/data-types/streams-tutorial/)
