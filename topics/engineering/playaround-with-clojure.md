---
title: Playaround with Clojure
description: Discover Clojure, a dynamic, functional Lisp dialect hosted on the JVM, offering powerful concurrency, immutable data structures, and seamless Java integration for efficient multithreaded programming.
date: 2019-09-06
tags:
  - clojure
redirect:
  - /s/bef_tw
---

## Definition

Clojure is a dynamic, general-purpose programming language, combining the approachability and interactive development of a scripting language with an efficient and robust infrastructure for multithreaded programming. Clojure is a **compiled language**, yet remains **completely dynamic** – every feature supported by Clojure is supported at runtime. Clojure provides easy **access to the Java frameworks**, with optional type hints and type inference, to ensure that calls to Java can avoid reflection.

Clojure is a **dialect of Lisp**, and shares with Lisp the code-as-data philosophy and a powerful macro system. Clojure is predominantly a functional programming language, and features a rich set of immutable, persistent data structures. When mutable state is needed, Clojure offers a software transactional memory system and reactive Agent system that ensure clean, correct, multithreaded designs.

## Why Clojure

Clojure combines of:

- A Lisp
- for Functional programming
- symbiotic with an established Platform
- designed for Concurrency

### 1. Lisp is a good thing

- Often emulated/pillaged, still not duplicated
- Lambda calculus yields an extremely small core
- Almost no syntax
- Core advantage still code-as-data and syntactic abstraction
- What about the standard Lisps (Common Lisp and Scheme)?
- Slow/no innovation post standardization
- Core data structures mutable, not extensible
- No concurrency in specs
- Good implementations already exist for JVM (ABCL, Kawa, SISC et al)
- Standard Lisps are their own platforms
- Clojure is a Lisp not constrained by backwards compatibility
- Extends the code-as-data paradigm to maps and vectors
- Defaults to immutability
- Core data structures are extensible abstractions
- Embraces a platform (JVM)

### 2. languages and platforms

- VMs, not OSes, are the platforms of the future, providing:
- Type system
- Dynamic enforcement and safety
- Libraries
- Abstract away OSes
- *Huge* set of facilities
- Built-in and 3rd-party
- Memory and other resource management
- GC is platform, not language, facility
- Bytecode + JIT compilation
- Abstracts away hardware
- Language as platform vs. language + platform
- Old way - each language defines its own runtime
- GC, bytecode, type system, libraries etc
- New way (JVM, .Net)
- Common runtime independent of language
- Language built for platform vs language ported-to platform
- Many new languages still take 'Language as platform' approach
- When ported, have platform-on-platform issues
- Memory management, type-system, threading issues
- Library duplication
- If original language based on C, some extension libraries written in C don’t come over
- Platforms are dictated by clients
- 'Must run on JVM' or .Net vs 'must run on Unix' or Windows
- JVM has established track record and trust level
- Now also open source
- Interop with other code required
- C linkage insufficient these days
- Java/JVM *is* language + platform
- Not the original story, but other languages for JVM always existed, now embraced by Sun
- Java can be tedious, insufficiently expressive
- Lack of first-class functions, no type inference, etc
- Ability to call/consume Java is critical
- Clojure is the language, JVM the platform

### 3. Concurrency and the multi-core future

- Immutability makes much of the problem go away
- Share freely between threads
- But changing state a reality for simulations and for in-program proxies to the outside world
- Locking is too hard to get right over and over again
- Clojure’s software transactional memory and agent systems do the hard part

### 4. Features

- [Dynamic development](https://clojure.org/about/dynamic)
- [Functional programming](https://clojure.org/about/functional_programming)
- [Lisp](https://clojure.org/about/lisp)
- [Runtime polymorphism](https://clojure.org/about/runtime_polymorphism)
- [Concurrent programming](https://clojure.org/about/concurrent_programming)
- [Hosted on the JVM](https://clojure.org/about/jvm_hosted)

### Dynamic development

First and foremost, Clojure is dynamic. That means that a Clojure program is not just something you compile and run, but something with which you can interact. Clojure is not a language abstraction, but an environment, where almost all of the language constructs are reified, and thus can be examined and changed. This leads to a substantially different experience from running a program, examining its results (or failures) and trying again. In particular, you can grow your program, with data loaded, adding features, fixing bugs, testing, in an unbroken stream.

### Dynamic compilation

Clojure is a compiled language, so one might wonder when you have to run the compiler. You don’t. Anything you enter into the REPL or load using load-file is automatically compiled to JVM bytecode on the fly. Compiling ahead-of-time is also possible, but not required.
