---
title: "The removal of Apache Kafka's dependency on Zookeeper"
description: Kafka has been using Zookeeper for a variety of important functions. It uses Zookeeper to keep track of which brokers are part of the Kafka cluster. This is a critical task, as it enables Kafka to ensure that each broker is working properly and that the entire cluster is functioning as intended...
date: 2023-09-13
authors:
  - fuatto
github_id: fuatto
icy: 10
tags:
  - engineering
  - kafka
  - zookeeper
redirect:
  - /s/RlawBQ
---

## Before the removal

### Importance of Zookeeper

Kafka has been using [Zookeeper](https://cwiki.apache.org/confluence/display/ZOOKEEPER/ProjectDescription) for a variety of important functions. It uses Zookeeper to keep track of which brokers are part of the Kafka cluster. This is a critical task, as it enables Kafka to ensure that each broker is working properly and that the entire cluster is functioning as intended.

Additionally, Zookeeper is responsible for electing the leader of a given partition. This is a complex task that requires significant computational power, and Zookeeper is well-suited to handle it.

Another important function that Zookeeper performs for Kafka is storing configurations for topics/permissions and current offsets of each consumer group. Managing configurations is critical for ensuring that Kafka is able to function properly as a distributed system and that each consumer is receiving the correct information.

Finally, Zookeeper sends health-check notifications to Kafka for a variety of events. This includes new topics being created, brokers coming up or dying, and topics being deleted.

### Downsides to Zookeeper

Despite its many advantages, there are also some downsides to using Zookeeper. One challenge is that the Kafka Controller state or metadata often does not match the Zookeeper state. This can lead to confusion and make it difficult to determine the current state of the cluster.

Additionally, there can be performance issues when a broker joins or leaves a cluster, as Zookeeper can be overloaded by a high number of leader elections. Despite these challenges, many organizations continue to find Zookeeper to be a valuable tool in managing their Kafka clusters, and Kafka continues to rely on it for its important functions.

## Why

The Kafka Controller **state** or **metadata** often does not match the Zookeeper state. Despite this, Kafka uses Zookeeper for several important tasks. For example, it keeps track of which brokers are a part of the Kafka cluster and is responsible for electing the leader of a given partition. Additionally, it stores configurations for topics/permissions and current offsets of each consumer group. Lastly, it sends health-check notifications to Kafka for events such as new topics being created, brokers coming up or dying, and topics being deleted.

One of the advantages of using Zookeeper is simpler deployment and configuration, as it is a _separate Java service_. However, there are also some downsides to using Zookeeper. Performance issues occur when a broker joins or leaves a cluster, as Zookeeper can be overloaded by a high number of leader elections. In addition, scaling Kafka only supports a limited number of partitions, up to **200k partitions**.

Despite the potential challenges, Kafka continues to rely on Zookeeper for its important functions, and many organizations continue to find it a valuable tool in managing their Kafka clusters.

## Architecture

![](assets/the-removal-of-apache-kafka's-dependency-on-zookeeper_kafka_architecture.webp)

### In the old architecture

The controller is a crucial component of the system that manages the state of the Kafka cluster. Upon election, the controller loads its state from a Zookeeper quorum consisting of multiple nodes. This state includes information about topics, their partitions, and the brokers that host these partitions. Once the controller has loaded its state, it begins pushing updates to other nodes in the cluster using `LeaderAndIsr` and `UpdateMetadata` messages. These updates ensure that all nodes in the cluster are aware of the latest state of the system, and that they can take appropriate actions in response to changes in this state. Overall, the controller plays a critical role in ensuring the smooth functioning and reliability of the Kafka cluster.

![](assets/the-removal-of-apache-kafka's-dependency-on-zookeeper_kafka-controller-apis.webp)

### In **KRaft Mode**

Kafka has been using Zookeeper for various critical tasks, such as keeping track of which brokers are part of the Kafka cluster, electing leaders for partitions, storing configurations for topics/permissions, and current offsets of each consumer group, and sending health-check notifications to Kafka.

Despite its advantages, using Zookeeper also poses challenges when it comes to performance and consistency in Kafka's metadata. For example, Zookeeper can be overloaded by a high number of leader elections, especially when a broker joins or leaves a cluster. Additionally, Kafka Controller state or metadata often does not match the Zookeeper state, leading to confusion and difficulty in determining the current state of the cluster.

To address these challenges, Kafka introduced KRaft mode, which replaces the Zookeeper quorum with the Controller quorum. The Controller quorum manages all metadata stored in Zookeeper, including topics, partitions, ISRs, and configs, among others. An active controller is elected using [Raft](https://raft.github.io/), a consensus algorithm that does not rely on any external system. The leader controller handles RPC calls from the brokers, while the follower controllers replicate the data written to the active controller to be ready in case the active controller fails.

With the KRaft mode, the controller quorum does not need to load state from Zookeeper when the leadership changes, which significantly improves performance. Instead, the brokers fetch updates from the active controller via the new `MetadataFetch` API, tracking the offset of the last update fetched and only requesting newer updates.

Kafka's KRaft mode offers various advantages over Zookeeper, such as simpler deployment and configuration since Zookeeper is a separate Java service. Furthermore, it addresses the performance issues associated with Zookeeper, especially when a broker joins or leaves a cluster, by reducing the number of leader elections.

In conclusion, KRaft mode is a crucial improvement to Kafka's architecture, ensuring smooth functioning and reliability of the Kafka cluster by providing a better alternative to Zookeeper for managing Kafka's metadata.

![](assets/the-removal-of-apache-kafka's-dependency-on-zookeeper_time-shutdown-operations-kafka.webp)

For simple local setup, can refer to [Apache Kafka's quickstart guide](https://kafka.apache.org/quickstart) . For more detailed configurations, you can refer to [Kafka's kraft config](https://kafka.apache.org/documentation/#kraft_config)

## References

- [https://www.conduktor.io/kafka/zookeeper-with-kafka/](https://www.conduktor.io/kafka/zookeeper-with-kafka/ "https://www.conduktor.io/kafka/zookeeper-with-kafka/")
- [https://developer.confluent.io/learn/kraft/](https://developer.confluent.io/learn/kraft/ "https://developer.confluent.io/learn/kraft/")
- [https://raft.github.io/](https://raft.github.io/ "https://raft.github.io/")
- [https://cwiki.apache.org/confluence/display/KAFKA/KIP-500%3A+Replace+ZooKeeper+with+a+Self-Managed+Metadata+Quorum](https://cwiki.apache.org/confluence/display/KAFKA/KIP-500%3A+Replace+ZooKeeper+with+a+Self-Managed+Metadata+Quorum "https://cwiki.apache.org/confluence/display/KAFKA/KIP-500%3A+Replace+ZooKeeper+with+a+Self-Managed+Metadata+Quorum")
- [https://kafka.apache.org/documentation/#zk](https://kafka.apache.org/documentation/#zk "https://kafka.apache.org/documentation/#zk")
