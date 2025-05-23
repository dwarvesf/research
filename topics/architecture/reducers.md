---
title: Reducers
description: Learn how frontend reducers act as single state machines with non-deterministic states, using algebraic data types for clear state management and enabling parallelizable operations in React and Redux.
date: 2022-05-22
github_id: monotykamary
redirect:
  - /s/MDqaXA
---

_This note refers to frontend reducers, and not to be confused with other reducers like from MapReduce._

## Prior art

Although reducers can be represented as a simple switch case of events, the mainstream application of reducers happens either in React's `useReducer` hook, or on Redux in which many of its qualities were motivated from Facebook's Flux architecture.

![](assets/reducers_flux_architecture.webp)

Along with Elm, the composition of these architectures are very similar to union types (called custom types in Elm) in algebraic data types (ADTs). Unlike normal state machines, we don't encode state in our ADT and assume the initial state of the reducer is the only state.

## As a state machine

With regard to state management, reducers are essentially single state machines. Although dispatched events doesn't change the initial state, we expect the events to progress the data "context" of the machine. We can refer this as non-deterministic states. For instance, the non-deterministic state of the counter is the incremented `value`:

![](assets/reducers_counter_reducer_state_machine.webp)

We will use ReScript in our example to better represent our reducers as ADTs. In ReScript, the average reducer would look as such:

```typescript
type state = int
type action = Increment | Decrement

export let transition = (state, action) =>
  switch (action) {
    | Increment => state + 1
    | Decrement => state - 1
  }
```

Its composition is very similar when we encode state and convert it into a state machine:

```typescript
type state = Idle(int)
type event = Increment | Decrement

export let initial = Idle(0)
export let transition = (state, event) =>
  switch (state, event) {
    | (Idle(value), Increment) => Idle(value + 1)
    | (Idle(value), Decrement) => Idle(value - 1)
  }
```

### Tradeoffs vs a regular state machine

Here a reducer has no concept of a "finite" state here, such that state can be represented finitely with a string. This is an inherent tradeoff that also gives us a useful advantage. Assuming the "context" or non-deterministic state of the reducer uses addition/multiplication, the reducer itself would follow the associative law. This gives us the benefit of converting any reducer that follows the associative law to parallelize its operations.

#### Reference

- https://en.wikipedia.org/wiki/Union_(set_theory)
- https://guide.elm-lang.org/types/custom_types.html
- https://erikras.com/blog/reducer-single-state-machine
- https://facebook.github.io/flux/
- https://redux.js.org/understanding/history-and-design/prior-art
- https://github.com/jas-chen/rx-redux
