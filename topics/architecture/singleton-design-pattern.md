---
title: A tour of Singleton design pattern with Golang
description: Singleton real-world problem, concept, solution, use cases, implementations, pros & cons, references
date: 2024-06-10
authors:
  - anhnh12
tags:
  - design-pattern
  - gang-of-four
  - golang
  - software-design
redirect:
  - /s/F3u7DQ
---

![](assets/singleton-design-pattern.pdf)

## Problem

Just imagine we need to build a simple web page to show live subscribers of a Youtube channel. Main object here is "subscriber" so we need a tool (counter) to update number of subscribers in real-time.

There are 2 actors: subscribers (Youtube) and visitors (our web page)

When a user subscribes to a channel, we update the counter by +1. And we do the same for other incoming subscribers, but there are 2 things we have to keep in mind:

- Handle concurrent subscription requests from users properly. Or else there will be a chance that we misscount a portion of subscribers
- Use the same counter to update/get live subscriptions for all actors (subscribers & visitors)

## Singleton overview

**Singleton** is one of **Creational design patterns**. It has some characteristics:

- One class/type can only create/have one single instance
- Provide a global access to that single instance
- We have many Singleton implementations to be used in single/multi-thread environment based on specific use case

## What does Singleton resolve?

Back to our above analogy with subscription counter, we can use Singleton to instatiate the counter and provide its global access.

- All subscribers and visitors will access the same counter so data will be consistent
- Since this is a multi-thread use case (e.g. multiple subscribers can subscribe simultaneously), we need to make sure the counter instantiation thread-safe

## Applicability

Use Singleton when you need to manage one & only instance of a resource (e.g. configuration, logger, etc.)

## Approaches

There are 2 ways to implement Singleton pattern:

<table border="0">
	<tr>
    <td><b style="font-size:20px">Eager</b></td>
    <td><b style="font-size:20px">Lazy</b></td>
	</tr>
	<tr>
		<td>Initialize the instance as soon as your app is started</td>
		<td>Initialize the instance as the first time it is requested (e.g. the counter is only instantiated when the first subscription is made)</td>
	</tr>
	<tr>
		<td>Should only be applied to light-weight resource since it will take a lot of compute power at the beginning and reduce the app performance</td>
		<td>Should not be applied to heavy-size resource since it will unnecessary take a lot of compute power at the beginning and reduce the app performance</td>
 	</tr>
 	<tr>
 		<td>Simple to implement, don't have to worry about race condition</td>
		<td>More complex implementation, need to make sure the instantiation is thread-safe to avoid creating redundant instances</td>
 	</tr>
</table>

## Pseudocode (golang)

First, define `counter` struct

```go
type counter struct {
	views int
}
```

<br/>

**Eager initialization**

```go
var instance *counter = &counter{}

func getCounter() *counter {
	return instance
}
```

<br/>

**Lazy initialization**: use _double-checked locking mechanism_ to avoid unnecessary lock when the instance has already been initialized

```go
var instance *counter

func getCounter() *counter {
	// instance has not been initialized
	if instance == nil {
		// lock to avoid multiple instances are created simultaneously by multi threads
		lock.Lock()
		defer lock.Unlock()

		// need to recheck because first check can be passed by multiple gorountines
		if instance == nil {
			instance = &counter{}
		}
	}

	// when instance has already been initialized -> return
	return instance
}
```

## Benefits & drawbacks

**Benefits**<br/>
You can assure that the class/type has only one instance if the implementation is done properly.

**Drawbacks**<br/>

- Tight coupled codebase<br/>
- Hard to debug<br/>
- Write unit tests will be tricky<br/>
- Limited use cases<br/>

## References

- https://refactoring.guru/design-patterns/singleton
