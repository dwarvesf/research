---
title: null
description: null
date: null
tags:
  - microservice
redirect:
  - /s/XiXWaQ
---

### Context

- In cloud-based and distributed applications, components of the system often need to provide information to other components as events happen.
- Asynchronous messaging is an effective way to decouple senders from consumers, and avoid blocking the sender to wait for a response.

### Solution

Introduce an asynchronous messaging subsystem that includes the following:

- An input messaging channel used by the sender. The sender packages events into messages, using a known message format, and sends these messages via the input channel.
- One output messaging channel per consumer. The consumers are known as subscribers.
- A mechanism for copying each message from the input channel to the output channels for all subscribers interested in that message. This operation is typically handled by an intermediary such as a message broker or event bus.

### Some framework, library

- Redis, RabbitMQ, Kafka
- Cloud solution: Azure (Service Bus, Events Bus, Event Grid), Google Cloud (Pub/Sub), AWS (Pub/Sub Messaging)

### When to use

- An application needs to broadcast information to a significant number of consumers
- An application can send information to consumers without requiring real-time responses from the consumers.
- An application needs to communicate with one or more independently-developed applications or services, which may use different platforms, programming languages, and communication protocols

### Considerations

When using the pattern, we might need to care about:

- Subscription handling: consumer could subscribe/unsubscribe as need
- Security: Only authenticated service could access
- Subsets of messages: consumer could select what to subscribe, via topic or content filtering
- Wildcard subscribers: consumer could use wildcard to subscribe/unsubscribe
- Bi-directional communication: This pattern is treated as unidirectional, no 2-way contact
- Message ordering: The order in which consumer instances receive messages isn't guaranteed, and doesn't necessarily reflect the order
- Message priority
- Poison Message: should prevent message that have invalid data, or could break the service
- Repeated messages: The messaging infrastructure should detect and remove duplicated message
- Message expiration
- Message scheduling

![[pubsub.png]]

---

#### Reference

- https://docs.microsoft.com/en-us/azure/architecture/patterns/publisher-subscriber
- https://hackernoon.com/publish-subscribe-design-pattern-introduction-to-scalable-messaging-781k3tae
