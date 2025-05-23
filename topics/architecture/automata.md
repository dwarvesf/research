---
title: Automata
description: Things about automata that devs should know
date: 2024-10-22
authors:
  - tieubao
tags:
  - automata
redirect:
  - /s/n-b2Jg
---

### What are Finite State Automata and why should a programmer know about them?

Formally, an FSA is a algebraic structure `F = ⟨Σ, S, s0, F, δ⟩` where `Σ` is the input alphabet, `S` is a set of states, `s0 ∈ S` is a particular start state, `F ⊆ S` is a set of accepting states, and `δ:S×Σ → S` is the state transition function.

1/ Short answer, it is a technique that you can use to express systems with concrete states (as opposed to quantum states / probability distributions).

Put simply, it is an effective way to represent the path(s) from a starting state to the end state(s) of the system that you care about. Using regular expressions as a fairly easy to understand example, let's look at the pattern AB+C (imagine that that plus is a superscript). I would expect to this pattern to accept strings such as "ABC", "ABBC", "ABBBC", etc. A at the start, C at the end, some number of B's in the middle (greater than or equal to one).

If you think about it, it's almost easier to think about this in terms of a picture. Faking it with text (and that my parentheses are a loopback arc), you can see that A (on the left), is the starting state and C (on the right) is the end state on the right.

```
      _
     ( )
A --> B --> C
```

From FSAs, you can continue your journey into computational complexity by heading over to the land of Turing Machines.

However, you can also use state machines to represent real behaviors and systems. In my world, we use them to model certain workflow of actual people working with components that are extremely intolerant of mistakes in state order. As in, "A had better happen before C or there will be a very serious problem. Make that be not possible right now."

2/ FSA are primarily a **thinking tool**, not a programming technique.

FSA provides a **clear, formal way** to describe and model systems with multiple states and transitions. This is useful in scenarios where systems must respond to a sequence of events.

Being able to model systems in terms of states and transitions helps developers design clear, maintainable, and bug-free applications.

[Source](https://stackoverflow.com/questions/364193/what-are-finite-state-automata-and-why-should-a-programmer-know-about-them)

### What is the difference between finite state machine and finite automata?

Both "Finite State Machine" FSM and "Finite Automata" (or Finite State Automata) FA means same, represents an abstract mathematical model of computation for the class of regular languages.

The word "Finite" significance the presence of the finite amount of memory in the form of the finite number of states Q.

Generally in formal-theory (or theory of computation), we prefer to use the word "Automata" – to emphasise that our machine is 'automatic' machine (self-moving: like our computer), "automatic" in the sense that once you have been defined transition rules, you do not need to apply any explicit intelligent to process strings (you just need to refer transition rules at each step). Remember our ultimate aim behind defining transition machines is to automate the computational task.

By the way, automata or state-machines are a graphical representation to describe transition rules.

You can also use "Transition Tables" or "Transition function" like `δ(q0, a) → q1`. Basically, all uses for the same purpose just to define "Mappings".

[Source](https://stackoverflow.com/questions/22354706/can-anyone-please-explain-difference-between-finite-state-machine-and-finite-aut)

### How does "δ:Q×Σ → Q" read in the definition of a DFA

`×` means Cartesian product (that is a set), and `→` is a mapping.
`δ: Q×Σ → Q` says `δ` is a transition function that defined mapping from `Q×Σ` to `Q`. Where, Domain of `δ` is `Q×Σ` and Range is `Q`.

Note: [Cartesian Product](http://en.wikipedia.org/wiki/Cartesian_product) itself a mathematical that all possible order pair (mapping) between two sets.

You can also say:

`δ` is a transition function that defined mapping between (or say associates) Cartesian product of set of states `Q` and language symbols `Σ` into set of state `Q`. This is abbreviated by `δ:Q×Σ → Q`

Here, `Q` is finite set of states and `Σ` is a finite set of language symbols.

Additionally in any automated you can represent transition function in tree ways.

1. [Transition Table](http://en.wikipedia.org/wiki/State_transition_table#Common_forms)
2. [Transition graph](http://en.wikipedia.org/wiki/State_diagram) or say state diagram.
3. Transition function: a finite set of mapping rules. e.g. `{δ(q0, a) → q1, δ(q1, a) → q2}`

In DFA. `δ:Q×Σ → Q` can also be written like `δ(Q,Σ) → Q` It's similar to function. In `δ` function two input arguments are state `Q` and a language symbol `Σ` and returned value is `Q`.

**What is meaning of `δ(Q,Σ) → Q`**

Suppose in your set of transition function δ you have an element `δ(q0, a) → q1` this means. If the present state is `q0` then by consuming a symbol you can shift to state `q1`. And the state-diagram for `δ(q0, a) → q1`: `(q0)---a---►(q1)`

Some authors write `δ ⊆ Q×Σ → Q` in formal DFA definition that means `δ` is a Partial function (not defined on full Domain `Q×Σ`)

[Source](https://stackoverflow.com/questions/14870130/how-does-%ce%b4q%c3%97%ce%a3%e2%86%92q-read-in-the-definition-of-a-dfa-deterministic-finite-automat?noredirect=1&lq=1)

### State machine vs. workflow

1/ The major difference between a workflow engine and a state machine lies in focus. In a workflow engine, a transition to the next step occurs when a previous action is completed, whilst a state machine needs an external event that will cause branching to the next activity. In other words, the state machine is event-driven and the workflow engine is not. [Source](https://workflowengine.io/blog/workflow-engine-vs-state-machine/)

2/ A state machine (which is a map of states with transitions between them) would allow loops as opposed to a sequential workflow, which precedes down different branches until done. [Source](https://stackoverflow.com/questions/8840527/what-is-the-difference-between-state-machine-and-workflow?rq=3)

### DFA vs. NFA

#### DFA (Deterministic finite automaton) robot

- This robot **only looks at one tile at a time** and knows **exactly what to do** next, no matter what.
- It has **one set of instructions** for each tile color. If it sees a red tile, it knows for sure what its next move is.
- It's **very strict** and follows only one route to figure out if the path is correct.
  For example:
  - If it sees a red tile, it moves forward.
  - If it sees a blue tile, it turns around. It **never gets confused** and always knows the next step.

#### NFA (Non-deterministic finite automaton) robot

- This robot is a little different. When it sees a tile, it can **imagine multiple possibilities** and think about all of them at once.
- It might say, "Hmm, when I see a red tile, I could move forward, turn around, or even jump! Let me think about all these options at once."
- The robot **explores multiple paths** at the same time, as if it can split into multiple versions of itself.
  For example:
  - When it sees a red tile, it might think, "I can either move forward or jump over it."
  - It checks **all options** at the same time and decides if the path is correct by looking at all the possibilities.

#### Difference in capabilities

- **DFA robot**: It's faster because it always knows exactly what to do. But it might need a lot of instructions because it can't explore different options. It has to account for every possible situation.
- **NFA robot**: It’s more flexible because it can explore lots of possibilities at the same time. But in the real world, it might take a little longer to check all those options.

#### Key points

- **DFA**: One option at a time, very efficient but can be strict.
- **NFA**: Many options at once, more flexible but can take more time to figure things out.
