---
title: Event sourcing overview
description: Event sourcing records all changes as events, allowing e-commerce platforms to track detailed order history and generate flexible analytics for better business insights and future-proof data management.
date: 2022-12-05
github_id: R-Jim
icy: 10
redirect:
  - /s/ccekKQ
---

## What is event sourcing

A database design revolves around **Events**. **Events** retain all business-critical information for auditing, market simulations, and future requirements that scale with the growth of the business.

## Problem scenario: e-commerce platform

We build an e-commerce platform. From all orders that successfully checked out, we generated a detailed report for sellers to improve their product's attraction to buyers.

### Change to the requirement

To be competitive with other platforms. We need to generate analytics for product retention when in the buyer's cart. So we need to have `order_log` to have data each time product's quantity changes in the cart.

But we only have the analytics when the implementation launches in production, and all previous data before the implementation is lost. This cycle will repeat everytime a new requirement coming in.

With the never-ending changes in business trends. We/Skateholders/Sellers/Buyers, can **never know which data is critical for the business survival in the future**.

## Event sourcing

### Event

Event sourcing saves all information that happens in our system as **Events**. From the e-commerce platform scenario, an order's **event** is when something happens to the order (`order_created_event`, `product_added_event`, `product_removed_event`,...).

An Event mainly consists of `Entity_ID`, `Type`, `Data`, `Metadata`, and `Version`:

- `Entity_ID` is the identifier of the event's domain object.
  Exp: `order: {id: 1}` -> `order_event: {entity_id: 1}`
- `Type` defines what happened to the domain object.
  Exp: `order_created`, `product_added`, `product_removed`,...
- `Data` saves changes that happened to the domain object.
  Exp:

```
	product_added_event: {
	    data: [
		    { product_id: book_1, quantity: 3 }
		]
	}
```

- `Metadata` saves all user interactions and system metrics.
  Exp:

```
  	product_added_event: {
		metadata: {
			user_ip: 192.168.1.1
			app: e-commerce-platform.v1-0-0
			device: macbook
			response_time: 405ms
		}
	}
```

### Event Store

A `database_table` stores events. **Only allowed Append** new event and **Read** from an event store. Event store naming will follow the domain object (`order_event_store`, `product_event_store`).

### State

When composing events, we get a State of a domain object.

Exp: Get current products in order with `id == 1`.
We have list of `events` with `entity_id == 1`:

```
	events: [
		{ type: "product_added", data: [{ product_id: book, quantity: 1 }]},
		{ type: "product_added", data: [{ product_id: book, quantity: 3 }, { product_id: pen, quantity: 2 }]},
		{ type: "product_removed", data: [{ product_id: book, quantity: 2 }]}
	]
```

By composing all `events` we will have the `order` state with all current products:

```
	order: {
		id: 1,
		products: [
			{ product_id: book, quantity: 2 },
			{ product_id: pen, quantity: 2 }
		]
	}
```

With that same `events` we can compose a state for retention rate information:

```
	order: {
		id: 1,
		products: [
			{ product_id: book, retention_rate: 0.5 },
			{ product_id: pen, retention_rate: 1 }
		]
	}
```

These are **State Projection**. Through **Projector**, we present states that fit our business needs.

And through our business process, we build states to validate if an event is valid to append to the event store with **Aggregation**.

%%### Append event to Event store%%

%%From FE, Client application's request, need to transform into an event%%

%%### Read from Event store%%

%%#### Projector

Projector handle how we compose the event to get the usuable State of the domain oject

#### Snapshot

To reduce composing time when number of events start to grow. Snapshot is a State in a specifict time. To get the latest state, with a snapshot as base, with just need to compose rest of event from snapshot to now%%

## References

- [Beginner's guide to event sourcing | Event Store](https://www.eventstore.com/event-sourcing)
- [Keynote: event sourcing - Greg Young - DPC2016](https://www.youtube.com/watch?v=I3uH3iiiDqY)
- [Learning-topics: event sourcing](https://discord.com/channels/462663954813157376/1009812700022456400)
- [Diagram about the thought process from normal CRUD operation into event sourcing](https://miro.com/app/board/uXjVPZswY00=/?share_link_id=338629629501)
