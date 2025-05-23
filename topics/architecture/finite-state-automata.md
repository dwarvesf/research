---
title: Finite state automata
description: Learn what finite-state automata are, how they model systems using states and transitions, and see practical examples of state machines in programming with key concepts like states, events, and transitions.
date: 2022-06-28
github_id: monotykamary
redirect:
  - /s/eE8kuA
---

## What are finite-state automata?

A **finite state automaton (FSM)** (**FSA**, plural: automata), or better known as a state machine, is a mathematical model of with a constraint such that the abstract machine can be only and exactly be one of a finite number of states at any point in time. Finite state here is typically represented as a string or equivalent enumeration.

## Mathematical model

As per the general classification noted on the [Wikipedia page on finite-state machines](https://en.wikipedia.org/wiki/Finite-state_machine), deterministic finite-state machine has 5 main variables associated with its definition (a quintuple): $(\Sigma, S, s_0, \delta, F)$.

- $\Sigma$ is the _input alphabet_ (a finite non-empty set of symbols) -> our events;
- $S$ is a finite non-empty set of states;
- $s_0$ is an _initial state_, an element of $S$;
- $\delta$ is the state-transition function: $\delta: S \times \Sigma \rightarrow S$; and
- $F$ is the set of _final states_, a (possibly empty) subset of $S$.

Given an initial state $s_0$, to transition our state to the next state, our transition would simply be:

$$
\delta: s_0 \times \Sigma \rightarrow S
$$

If we were to reach a final state starting from a known set of states, our transition would look like:

$$
\delta: S \times \Sigma \rightarrow F
$$

### Simplified meaning

For our purposes, we just need to understand that a `transition` function takes a `state` and an `event` to move on to a **new** `state`. What type of state and what subset it belongs to is up to the developer's discretion.

```typescript
type State = string
type Event = string

const transition = (state: State, event: Event): State => ...
```

## Coming from algebraic data types

If you're coming from algebraic data types (ADTs), you may have noticed that state machines are nested ADTs that encode states and events as data types. In this case, we take advantage of nesting or combining pairs of sum/union types (example in Rescript):

```typescript
type elapsed = float;

type taskStatus =
  | NotStarted
  | Running
  | Paused
  | Done;

type input =
  | Start
  | Pause
  | Resume
  | Finish;

let transition = (state, input) =>
  switch (state, input) {
  | (NotStarted, Start) => Running
  | (Running, Pause) => Paused
  | (Running, Finish) => Done
  | (Paused, Resume) => Running
  | (Paused, Finish) => Done
  | (Running, Tick) => Running
  | _ => state
  };
```

## States and relevance in the _domain_

In [[Domain Driven Design]] (DDD) and in [[Event storming]], there doesn't seem to be space for states in the domain. This is most likely because there is a separation of concern between the behavior of commands against what gets updated in the aggregate. DDD does allow classification of entities, such as classifying customer statuses, and these of course have business meaning. However, DDD doesn't specify any technical concerns such as the persistence of state or where a state transition should occur and what effects should happen.

## References

- https://en.wikipedia.org/wiki/Finite-state_machine
- https://wickstrom.tech/finite-state-machines/2017/11/10/finite-state-machines-part-1-modeling-with-haskell.html
- https://dev.to/margaretkrutikova/modelling-domain-with-state-machines-in-reasonml-n29
- https://blog.honosoft.com/2019/10/31/partial-state-machine/
