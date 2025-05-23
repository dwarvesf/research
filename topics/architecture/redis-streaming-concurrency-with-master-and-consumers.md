---
title: Redis streaming concurrency with master and consumers
description: Learn how to implement a Redis streaming master-consumers pattern to delegate messages, handle concurrency, and avoid data conflicts using Redis commands like XREADGROUP and XCLAIM.
date: 2023-05-16
github_id: R-Jim
icy: 10
redirect:
  - /s/ty0RhQ
---

## The problem statement

[[Redis streaming]] is to have multiple consumers processing incoming messages simultaneously.

The current system uses Redis streaming to quickly process incoming messages and is required to have the ability to scale up the processing power with concurrency, given specific time frames (exp: duplicating consumer pods). The order of processing incoming messages is ignored to push POC releases.

As the business model grows, we encounter a case where 2 or more messages need to be processed concurrently got pick up by 2 consumers, and processed at the same time, resulting in data conflict. The only restriction is we must use the current infrastructure and Redis, without introducing a new event messaging platform(exp: Kafka).

<br/>

## The master, consumers pattern

The master, consumers pattern is about having a master act as a **proxy to traffic control** to decide which consumers to delegate the incoming message to.

In Redis streaming, only consumers in a group can pick up incoming messages in the stream, read then acknowledge the message as completed.

To implement the pattern, the master will be a glorified consumer. The master will have the priority to first `XREADGROUP >` the incoming message, read then choose which consumer to delegate to using `XCLAIM`. Finally, consumers can use `XREADGROUP 0` to process the delegated messages.

The reason the master must `XREADGROUP` is:

- The message needs to be processed to know which consumer to deliver to.
- To use `XCLAIM` on a message so other consumers can not read it, it must be in the `PEL`(Pending Entries List). A message can only be in `PEL` after a consumer runs `XREADGROUP`.

<br/>

## Example implementation

We will be handling messages containing `ticket_id`. Messages with the same `ticket_id` must be handled orderly one by one.

This will also include saving the current session and failure recovery for pending messages.

<br/>

### Redis configs

- `ticket_stream`, business services will `XADD` messages to this stream. The master then delegates messages from this stream to consumers.

- `concurrency_stream_group`, consumer group.

Redis objects for the master:

- `tickets`, a key/value map of processing `ticket_id`:

  - `ticket_id` key, data:
    - `consumer_name`, the current processor consumer for the `ticket_id`.
    - `message_ids`, list ids of processing messages with the same `ticket_id`.

- `consumers`, a key/value map of `consumers`:
  - `consumer_name` key, data:
    - `healthURL`, the URL for the master to check if the consumer is alive.
    - `ticket_ids`, list of processing ticket ids.

<br/>

### Master consumer service

An API service with access to Redis client.

<br/>

Configs:

- `ticket_stream`.
- `concurrency_stream_group`.
- `master`, master consumer name, used to call `XREADGROUP`.

<br/>

Endpoints:

- `api/consumers/register`, the consumers call this to register itself to the master, update `consumers` with `healthURL`.

- `api/messages/acknowledge`, the consumers call this to notify successful of consuming the message. The master updates `tickets`, and `consumer` to remove the completed message.

<br/>

Delegate Flow:

- First, the master reloads the last session from Redis's `tickets`, and `consumers` objects.

- Delegate incoming messages from `ticket_stream` to consumers:
  - `XREADGROUP ticket_stream concurrency_stream_group master >`, get incoming messages under `master` consumer, then parse for `ticket_id`.
  - Check `tickets` for the current `ticket_id`'s processing consumer. If not exist, can choose a random consumer from `consumers`.
  - From the selected consumer, the master calls `XCLAIM` to delegate the message to the selected consumer.
  - Update `tickets`, and `consumers` with the `ticket_id` and `message_id`.

<br/>

Failure recovery flow:

- Offline consumers recovery, cronjob (exp: thread with `sleep`):
  - Ping consumers in `consumers` (through `healthURL`) for the health check.
  - If failed to call `healthURL`, check `ticket_ids` for processing `ticket_id`
  - For each `ticket_id`, check `tickets` for processing `message_ids` then delegate those to another consumer.
- Idle messages recovery with `XAUTOCLAIM`, cronjob (exp: a thread with `sleep`), for messages in the `PEL` of `ticket_stream` but not exist in the `tickets` map.
  - `XAUTOCLAIM` to get idle messages passed `min_idle_time`.
  - Parse the messages for `ticket_id`.
  - Delegate the messages to consumers:
    - If `ticket_id` exists in `tickets` map, call processing consumer health:
      - If the consumer is alive, delegate the message to that consumer.
      - If the consumer is disconnected, delegate the event and the rest of the events in the `ticket_id` to another consumer.
    - If `ticket_id` does not exist, delegate the event to a random consumer.
  - Update `tickets`, and `consumers` with the `ticket_id` and `message_id`.

<br/>

### Delegated consumers

An API service with access to Redis client.

<br/>

Configs:

- `ticket_stream`.
- `concurrency_stream_group`.
- `consumer`, consumer name, used to call `XREADGROUP`, `XACK`.
- `master_register_api_url`, use to register the consumer to the master.
- `master_acknowledge_api_url`, use to notify completion of processing a message to the master.

<br/>

Endpoints:

- `api/health`, to check if the consumer is alive

<br/>

Flow:

- First, the consumer pings the master via `master_register_api_url` to register itself to the master, input `consumer` name, and `api/health`.
- `XREADGROUP ticket_stream concurrency_stream_group consumer 0` gets delegated messages.
- Process the message according to business requirements.
- After processed, `XACK` to mark the message as completed, and remove it from the `PEL`
- Call `master_acknowledge_api_url` to notify that the consumer has completed processing of the message.

<br/>

## References

- [Redis documentation](https://redis.io/docs/)
- [Redis streams tutorial](https://redis.io/docs/data-types/streams-tutorial/)
