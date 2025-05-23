---
title: null
description: null
date: null
tags:
  - pattern
  - system-design
  - throttling
redirect:
  - /s/8OS-hg
---

Control the consumption of resources used by an instance of an application, an individual tenant, or an entire service.

### Context

- The load on a cloud application typically varies over time based on the number of active users or the types of activities they are performing.
- Sometime, huge number of request exceeded system's capacity, make system have poor performance or event failure.

### Solution

If it's not suitable for autoscaling, an alternative strategy to autoscaling is to allow applications to use resources only up to a limit, and then throttle them when this limit is reached.

- Rejecting requests from an individual user who's already accessed system APIs more than n times per second over a given period of time.
- Disabling or degrading the functionality of selected nonessential services so that essential services can run unimpeded with sufficient resources. For example, if the application is streaming video output, it could switch to a lower resolution.
- Using load leveling to smooth the volume of activity (Would show detail about this in Queue-based Load Leveling pattern) + Priority Queue pattern
- Deferring operations being performed on behalf of lower priority applications or tenants.

### Consideration

- Impact whole system, should consider in early stage of system design.
- Throttling must be performed quickly.
- If a service needs to temporarily deny a user request, it should return a specific error code so the client application understands that the reason
- Throttling can be used as a temporary measure while a system auto-scales.
- If your system still can not operation after throttling, we should consider scaling it up for better capacity

### When to use

- ensure that a system continues to meet service level agreements
- prevent a single tenant from monopolizing the resources provided by an application
- handle bursts in activity
- Cost optimization

![[Pattern_Throttling.png]]

---

#### Reference

- https://docs.microsoft.com/en-us/azure/architecture/patterns/throttling
- https://docs.firstdecode.com/microservices-architecture-style/design-patterns-for-microservices/throttling-pattern/
