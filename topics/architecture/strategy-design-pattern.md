---
title: Strategy design pattern, the concept, use cases and difference with the state design pattern
description: Strategy design pattern, a behavioral design pattern that denote the functionality of a family of interchangeable classes to a interface, the context, with the helper objects, selects the appropriate implementation of the interface.
date: 2024-07-11
authors:
  - R-Jim
tags:
  - design-pattern
  - gang-of-four
redirect:
  - /s/Q7J0qw
---

![](assets/strategy-design-pattern.pdf)

## Problem statement

The separation of a renowned cookbook, by cuisine culture, into distinct cookbooks(strategies on how to cook dishes): The owner restaurant of the cookbook keeps a single cookbook to prevent the leaking of trade secrets. To maintain standards, the head cooks must use the cookbook to follow the complicated recipes. When the restaurant grows, conflicts happen between head cooks taking turns to use the single cookbook.

=> The cookbook divides into multiple cookbooks based on their type(appetizer, main dish, side dish, ...) and cuisine culture(asian, french, italy, ...). The head cook selects the cook books(strategies) by their station and their dish's cuisine.

## `Strategy` design pattern

Strategy design pattern is about grouping classes with similar functionality, an interface is created to represent their functions, and each class has implementation following the interface.

To choose the correct strategy, the context uses the provided information and selects the appropriate implementation/strategy of the interface.

Example:

```go
// Given an interface to group classes with similar functionality
type Calculation interface {
 func Calculate(x, y int) int // calculate two numbers: x and y, return int result
}

// Implementations
type CalculationAdd Calculation

// Calculate returns the addition result of x and y
func (c CalculationAdd) Calculate(x, y int) int {
 return x + y
}

type CalculationMinus Calculation

// Calculate returns the subtraction result of x and y
func (c CalculationMinus) Calculate(x, y int) int {
 return x - y
}

// The program calculator, from the input operator, calculates two numbers and prints the result
func main() {
 var x, y int
 x, y = env.GetInputNumbers()
 var operation string
 operation = env.GetInputOperation()

 var calculation Calculation
 // Select calculation
 switch operation {
 case "ADD":
 calculation = CalculationAdd
 case "Minus":
 calculation = CalculationMinus
 }

 log.Printf("Result of operation %d %s %d is: %d, x, operation, y, calculation.Calculate(x, y))
}
```

## Use cases

Strategy design patterns commonly used in systems with diverse business flows, a few examples:

- Route planning system that changes based on the provided vehicle type.
- Transaction system that deals with different types of charging, subscription, and discount.

## Vs `State` design pattern

State can be considered as an extension of Strategy. Both patterns are based on composition.
They change the behavior of the context by delegating some work to helper objects.

| Strategy                                                                                                  | State                                                                                                                       |
| --------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| An interface is created by the similarity of function, the helper objects select the appropriate strategy | Each class represents a 'State'. The helper objects transition the context to its state and then perform the State behavior |
| Object strategy completely independent and unaware of each other                                          | Doesn't restrict dependencies, may aware and initiate transitions from one state to another                                 |

## Reference

- https://refactoring.guru/design-patterns/strategy
