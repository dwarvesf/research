---
title: Going through use cases of the prototype design pattern and it place among the creational patterns
description: "Prototype, one of the creational patterns, minimize efforts when recreating new from the exist object by cloning the 'prototype' of it."
date: 2024-06-10
authors:
  - R-Jim
tags:
  - gang-of-four
  - graphical-notation
  - software-design
redirect:
  - /s/mwNbqw
---

![](assets/prototype-design-pattern.pdf)

## Problem statement

We want a copy of an object, but the config only initialized at runtime, its fields and methods were private, or its properties were manipulated through multiple processes, so it is difficult to recreate the object. For example:

- DB Access Object with credentials only provide in runtime.
- A ledger object has transaction histories, which are protected through private fields, and exposes a Total() function to get the total balance. To replicate the whole ledger, we must recreate all its transaction histories.

## Prototype design pattern

Request a Clone of the object(Prototype) without the need to look up its class and implementation.

The target object must turn into a 'Prototype' by having a Clone() function to mirror the object with sufficient properties for the user of the cloned object. For example:

```
//The following example is in Go. We are building an RPG with a Hero object, and a new Skill called 'Mimic' needs to create a copy of the Hero with the same level.
type Hero struct {       // level, experience, and killLogIDs are private to avoid editing the Hero object
 level         int64
 experience    int64
 killLogIDs    []int64
}

type (h *Hero) KillConfirm(targetID int64) {
 h.killLogIDs = append(killLogIDs, targetID)
 h.experience += 10

 if h.experience >= 100 {
 h.level += 1
 h.experience -= 100
 }
}

// Creates a clone of the Hero without repeating the whole kill log
type (h *Hero) Clone() Hero {
 return Hero {
 level: h.level,
 experience: h.experience,
 killLogIDs: h.killLogIDs,
 }
}
```

## Case by case

When developing a system, the Prototype design pattern works in tandem with other creation patterns:

- Factories, abstract factories, and builders help create the original object. Prototype provides a clone of the object without the need to call the above patterns
- Prototype behaves opposite to the singleton pattern. Singleton pattern focuses on having a single instance for operational flow. Prototype can Clone the object in the middle of its processing flow for other uses without changing the original object.

The most common use cases for Prototype design patterns are:

- Credential/Access objects for Database or external services
- Ledger/Bank statement objects, we clone the object to the statistics and simulations.

## Reference

- https://refactoring.guru/design-patterns/prototype
