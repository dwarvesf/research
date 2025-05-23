---
title: null
description: null
date: null
tags:
  - cloud-pattern
  - engineering
  - microservice
redirect:
  - /s/3fzvXQ
---

### Context

- In a distributed environment, there can be situations where faults are due to unanticipated events, and that might take much longer to fix. Result the complete failure of a service. In these situations it might be pointless for an application to continually retry an operation that is unlikely to succeed, and instead the application should quickly accept that the operation has failed and handle this failure accordingly.
- Sometime, failed service could have bad effect to other services about: delay, performance and reduce UX of users

### Solution

A circuit breaker acts as a proxy for operations that might fail. The proxy should monitor the number of recent failures that have occurred, and use this information to decide whether to allow the operation to proceed, or simply return an exception immediately.

The proxy have 3 state:

- Closed: The request from the application is routed to the operation. Count the number of recent failure, if the failure count more than threshold => Set state to Open.
- Open: The request/msg from the application fails immediately and an exception is returned. Start a timeout, when timer come, => set state to Half-Open
- Half-Open: A limited number of request sent to the service, if those are OK. Seem the service is OK => Set state to Close.

### Considerations

When using the circuit breaker, we might need to care about:

- Exception Handling
- Logging
- Recoverability
- Testing Failed Operations
- Manual Override

![[circuit-breaker-diagram.png]]

---

#### Reference

- https://docs.microsoft.com/en-us/azure/architecture/patterns/circuit-breaker
- https://martinfowler.com/bliki/CircuitBreaker.html
