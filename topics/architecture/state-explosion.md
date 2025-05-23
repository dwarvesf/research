---
title: State explosion
description: Learn how statecharts solve the state explosion problem in state machines using parallel states, hierarchical states, and guard conditions for simpler and more efficient designs.
date: 2022-05-22
github_id: monotykamary
redirect:
  - /s/Mk9kRg
---

## What is state explosion?

The main problem that’s stopping widespread usage of state machines is the fact that beyond very simple examples, state machines often end up with numerous states, a lot of them with identical transitions. [[Statecharts]] solve this _state explosion_ problem.

![State explosion](https://statecharts.dev/valid-invalid-enabled-disabled-changed-unchanged.svg)

Similar to [nested positive if statements](https://stackoverflow.com/questions/4369822/early-returns-vs-nested-positive-if-statements), state explosions represent combinatorially complex growth of states. This can also be seen with nested [[Product types]].

## How do statecharts solve this problem?

### Parallel states

Separating nested finite states into individual states that can be progressed with the same or different events:

![Parallel state machine](https://statecharts.dev/valid-invalid-enabled-disabled-changed-unchanged-parallel.svg)

### Hierarchical states

Reorganizing nested finite states into a hierarchy, such that the finite state of a child state machine is dependent on the transition between the parent and child machines:

![Hierarchical state machines](https://statecharts.dev/valid-invalid-enabled-disabled-changed-unchanged-parallel-hierarchy.svg)

### Guards (conditions)

Guards here serve as a pre-condition to a transition, which essentially prevents a transition from occurring based on a condition:

![Guard conditions](https://statecharts.dev/valid-invalid-enabled-disabled-changed-unchanged-parallel-guarded.svg)

#### Reference

- https://statecharts.dev/state-machine-state-explosion.html
