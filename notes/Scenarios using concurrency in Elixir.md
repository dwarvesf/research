---
title: null
description: null
date: null
tags:
  - concurrency
  - elixir
redirect:
  - /s/kD647Q
---

### Fire and forget

Tell the system to execute some code asynchronously and not care about when it finishes, nor the result.

Solution: `Task` abstraction in elixir. Tasks are processes meant to run a single action within their life-cycle

Practice:

Run a one-off action in Elixir to spawn the tasks under a supervision tree. We can easier to manage the processes(clean)

```elixir
Task.Supervisor.start_child/2
```

The default strategy for the Task.Supervisor is `:temporary` - never restarted.

Implementation:

- In the `Application` we add a `Task.Supervisor`, is named such as: AwesomeTaskSupervisor
- When we spawn a process, we start a child task with AwesomeTaskSupervisor name.

```elixir
Task.Supervisor.start_child(AwesomeTaskSupervisor, process_func)
```

### Fan-in/fan-out

Tell the system to execute consists of multiple operation. We run asynchronously, but care about the results. Example: uploading a bunch of docs to S3, sending a batch of emails to people.

Solution: Task without using a supervisor

Implementation:

- Using Enum.map/2 and Task.async/1 to generate the processes.
- Using Enum.map/2 and Task.await/1 to wait all of processes are done

### Scheduling work

Tell the system run some work periodically every N minutes/hours/etc.

Solution: GenServer abstraction. We save the period rule in the genserver. Using `Process.send_after/3` to trigger the `handle_info/2` processing function.

Library: [Quantum](https://github.com/quantum-elixir/quantum-core)

### Caching data

Tell the system cache the frequently data. Such as: caching the frequently response, temperature data.

Solution:

- Agents abstraction: a single process, therefore, we got bottleneck
- ETS: faster, support concurrency reads and writes
- GenServers

Library: https://github.com/sasa1977/con_cache

---

#### Reference

- https://gist.github.com/hieuphq/f949e2a7074b0f23edb5f7dee2ad2533
- https://functional.works-hub.com/learn/elixir-practical-concurrency-3794f
