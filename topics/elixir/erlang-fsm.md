---
title: Erlang finite state machine
description: The Power of Finite State Machines
date: 2024-07-12
authors:
  - hieuphq
tags:
  - elixir
  - erlang
  - fsm
redirect:
  - /s/EUL3zQ
---

Finite State Machines (FSMs) are a crucial concept in computer science and software development, providing a robust method for modeling the behavior of systems. Erlang, a language designed for concurrency, fault tolerance, and distributed computing, offers unique advantages when implementing FSMs. In this note, we'll explore how Erlang excels in handling FSMs, using the Catch Chicken Machine as a practical example.

## Why Erlang?

1. **Concurrency**: Erlang's lightweight processes and efficient message-passing make it ideal for concurrent systems.
2. **Fault tolerance**: Built-in mechanisms for error detection and recovery enhance system reliability.
3. **Distributed computing**: Native support for distributed systems allows easy scaling and resilience.

## The catch chicken machine: a practical example

The Catch Chicken Machine is a simple yet illustrative example of a finite state machine implemented in Erlang. It models a system where a chicken-catching robot moves between states based on external inputs and internal logic.

## States and transitions

- **Idle**: The initial state, waiting for a command to start.
- **Searching**: Actively looking for a chicken.
- **Catching**: Attempting to catch a detected chicken.
- **Resting**: Taking a break after a catch or a failed attempt.

## Implementation practices

1. **Define states and events**: Clearly define each state and the events that trigger transitions.

   ```erlang
   -define(STATES, [idle, searching, catching, resting]).
   -define(EVENTS, [start, chicken_spotted, chicken_caught, chicken_escaped, rest]).
   ```

2. **State transition logic**: Use Erlang's pattern matching to implement transition logic.

   ```erlang
   handle_event(start, idle) ->
       {next_state, searching};
   handle_event(chicken_spotted, searching) ->
       {next_state, catching};
   handle_event(chicken_caught, catching) ->
       {next_state, resting};
   handle_event(chicken_escaped, catching) ->
       {next_state, searching};
   handle_event(rest, resting) ->
       {next_state, idle}.
   ```

3. **Concurrency and messaging**: Leverage Erlang's messaging capabilities to handle state transitions.

   ```erlang
   loop(State) ->
       receive
           Event ->
               {next_state, NewState} = handle_event(Event, State),
               loop(NewState)
       end.
   ```

4. **Fault tolerance**: Implement error handling to ensure the FSM can recover from unexpected states or failures.
   ```erlang
   handle_event(_, _) ->
       {next_state, idle}.
   ```

## Benefits of using Erlang for FSMs

- **Scalability**: Erlang's ability to handle numerous concurrent processes allows the FSM to scale efficiently.
- **Reliability**: The language's emphasis on fault tolerance ensures that the FSM can recover gracefully from errors.
- **Clarity**: Pattern matching and clear state definitions make the FSM logic easy to understand and maintain.

## Conclusion

Erlang's unique features make it an excellent choice for implementing finite state machines. By following best practices and leveraging the language's strengths, developers can create robust, scalable, and reliable FSMs. The Catch Chicken Machine example demonstrates how Erlang's concurrency, fault tolerance, and clear syntax contribute to effective FSM implementation. Embrace Erlang for your FSM needs and experience the benefits firsthand.
