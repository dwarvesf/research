---
title: Go in software engineering
description: "An overview of Go's key features, including simplicity, concurrency support, and interface-driven OOP. Explores Go's strengths in cloud applications and utility development, and its role in software engineering practices for maintaining resilient programs over time."
date: 2020-08-07
authors:
  - hieuphq
tags:
  - engineering
  - golang
redirect:
  - /s/r1QRNQ
---

Go is a type-safe, cloud-native language designed for simplicity with first-class support for concurrency.

The software community has been hungering for a small, simple, easy-to-learn and pragmatic programming language. Go fits the bill with:

## Simplicity

Go's beauty lies in its powerful simplicity. A list of NO's in Go design contains generics, ternary operation, pointer arithmetic,…. These features are missing because it doesn't fit, and it affects compilation speed, and end up making the language too complicated.

It's not what it included that makes it great; it's what is left out. Even at the expense of writing more code, simplicity acts as a key feature.

### First-class support for concurrency

Go is not the first language that comes up with concurrency. We had Erlang for that a while ago. But Go is one of the few mainstream languages get it right.

Relying on CSP & "sharing by communicating" model plus the light-weight go-routine implementation makes concurrent programming perform at the best experience. If concurrency plays a vital part in your application, Go should be the first thing in your mind.

### Interface-driven OOP

This guy enables duck typing and dependency injection, two forms that extremely fruitful while avoiding the complexities of inheritance, which proves a notable downside in practice.

## Why Go

Let's be frank, Go is not a language for everything.

- It can't compare with Elixir in term of development speed.
- Rust beats it hard when it comes to performance.
- Simplicity alone? Try Python

Go has its place and shines the brightest with the following application types:

- Cloud application: Go's native feature set made it a naturally fit for the cloud, with concurrency built-in feature, Go is the best choice in the market for the two most common architecture in the cloud: micro-services and distributed system.
- Utilities and stand-alone tools: Go was born to beat the compilation time. It's a savior that the program can be compiled in shorter time and minimal size compare to most of other languages, allow it to be packed and distributed quickly.

## Go in software engineering

> Software engineering is what happens to programming when you add time and other programmers.-Russ Cox

Programming is hard. You have a problem, you write a program to solve it. Your program turns out great and works thing out - that's programming. But keeping your program work over time is struggling in many levels. More people coming, your business logic changes or some of your 3rd party library is no more working.

Software Engineering is about keeping your program resilient over time. And Go was born to live by that code, with a firm promise that the program we wrote in day 1 will compile and run perfectly in the future. All of the language technical design and toolset that were made by the concern of Software Engineering aims to simpler the program, make it easier to maintain, coordinate and evolve.
