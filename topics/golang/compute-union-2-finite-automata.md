---
title: "Efficient union of finite automata in Golang: a practical approach"
description: An in-depth guide on implementing the union of finite automata in Golang, focusing on practical efficiency and performance considerations.
date: 2024-09-05
authors:
  - minhluuquang
tags:
  - pattern-matching
  - state-machines
  - finite-automata
  - golang
redirect:
  - /s/gN9XSQ
---

## 1. What is Finite Automata? (A Simple Explanation)

Finite Automata (FA), also known as Finite State Machines, are abstract computational models used to recognize patterns or process sequences of symbols. They consist of:

- A finite set of states
- A set of input symbols (alphabet)
- Transitions between states based on input symbols
- An initial state
- A set of final (accepting) states

FAs can be deterministic (DFA) or nondeterministic (NFA). In a DFA, each state has exactly one transition for each input symbol, while in an NFA, a state can have multiple transitions for the same input symbol or even transitions without consuming any input (epsilon transitions).

FAs are widely used in text processing, pattern matching, and lexical analysis in compilers. They efficiently recognize regular languages, making them suitable for tasks like validating email addresses or searching for specific patterns in text.

## 2. What is Computing the Union of Two Finite Automata?

Computing the union of two finite automata means creating a new automaton that accepts all strings accepted by either of the original automata. In other words, if we have two FAs, A and B, their union FA will accept a string if it's accepted by either A or B (or both).

Theoretically, this is done by:

- Creating a new start state
- Adding epsilon transitions from this new start state to the start states of both input automata
- Combining all states and transitions from both automata
- Making all final states from both automata final in the new automaton

This process essentially creates an NFA that represents the union of the languages recognized by the two input automata.

## 3. What is Different Between the Academic Approach and Practical Approach?

The academic approach to computing the union of finite automata, as described above, is straightforward but can be inefficient in practice. The main differences are:

**Academic Approach**:

- Creates a new start state and adds epsilon transitions
- Combines all states from both automata
- Results in an NFA that may need further processing (e.g., determinization) for efficient matching

**Practical Approach**:

- Avoids creating unnecessary states
- Focuses on reachable states only
- Aims to create a more efficient structure for actual pattern matching
- May produce a hybrid automaton that's neither fully deterministic nor fully nondeterministic
- Optimizes for memory usage and matching speed in real-world scenarios

The practical approach, as implemented in Quamina, tries to balance theoretical correctness with performance considerations for large-scale pattern matching.

## 4. How Do We Solve This Using Golang Code?

The Quamina library implements the union of finite automata using a practical approach in the `mergeFAStates` function. Here's a detailed explanation of the implementation:

```go
func mergeFAStates(state1, state2 *faState, keyMemo map[faStepKey]*faState, printer printer) *faState {
    // Memoization to avoid redundant computations
    mKey := faStepKey{state1, state2}
    combined, ok := keyMemo[mKey]
    if ok {
        return combined
    }

    // Combine field transitions
    fieldTransitions := append(state1.fieldTransitions, state2.fieldTransitions...)
    combined = &faState{table: newSmallTable(), fieldTransitions: fieldTransitions}

    // Memoize the result
    keyMemo[mKey] = combined

    // Unpack the transition tables
    u1 := unpackTable(state1.table)
    u2 := unpackTable(state2.table)
    var uComb unpackedTable

    // Merge transitions
    for i, next1 := range u1 {
        next2 := u2[i]
        switch {
        case next1 == next2:
            uComb[i] = next1
        case next2 == nil:
            uComb[i] = next1
        case next1 == nil:
            uComb[i] = next2
        case i > 0 && next1 == u1[i-1] && next2 == u2[i-1]:
            uComb[i] = uComb[i-1]
        default:
            var comboNext []*faState
            for _, nextStep1 := range next1.states {
                for _, nextStep2 := range next2.states {
                    comboNext = append(comboNext, mergeFAStates(nextStep1, nextStep2, keyMemo, printer))
                }
            }
            uComb[i] = &faNext{states: comboNext}
        }
    }

    // Pack the combined table
    combined.table.pack(&uComb)

    // Combine epsilon transitions
    combined.table.epsilon = append(state1.table.epsilon, state2.table.epsilon...)

    return combined
}
```

## Key Aspects of This Implementation:

1. **Memoization**: The function uses a `keyMemo` map to store already computed merged states, avoiding redundant computations and potential infinite recursion.
2. **Combining field transitions**: The field transitions from both input states are combined immediately.
3. **Table unpacking**: The transition tables of both input states are unpacked into a more manageable format for merging.
4. **Merging transitions**: The function iterates through all possible transitions (0-255 for byte values) and merges them according to several rules:
   - If both transitions are the same, use that transition.
   - If one transition is `nil`, use the non-`nil` transition.
   - If the transition is the same as the previous byte value, reuse the previous merged result.
   - For different non-`nil` transitions, recursively merge the next states.
5. **Packing the combined table**: After merging, the combined table is packed back into the efficient `smallTable` format.
6. **Combining epsilon transitions**: Epsilon transitions from both input states are combined.

## Advantages:

- Avoids creating unnecessary states by only merging reachable states.
- Handles both deterministic and nondeterministic aspects of the input automata.
- The memoization technique prevents redundant computations, improving efficiency for large automata.
- The use of the `smallTable` structure keeps the memory footprint low.
- By merging transitions byte-by-byte, it maintains compatibility with UTF-8 encoded input.

## Trade-offs:

- The resulting automaton may not be minimal or fully deterministic.
- The recursive nature of the function could lead to stack overflow for extremely large or complex automata.
- Performance depends on the structure of the input automata and can vary significantly based on their complexity.

In practice, this implementation provides a good balance between theoretical correctness and practical efficiency for the pattern matching tasks Quamina is designed to handle. It allows for the combination of multiple patterns into a single automaton structure that can be efficiently traversed during the matching process.
