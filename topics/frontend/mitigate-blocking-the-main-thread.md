---
title: Mitigate blocking the main thread
description: "We all know that for web applications, perceived performance is highly importance for our users. For data intensive SPAs with CPU-intensive tasks, the single-threaded nature of Javascript starts to hinder the application's perceived performance when you cannot fit those CPU-intensive tasks into a 16.67 ms/frame window (translates to 60fps). That doesn't even account for code execution time of frameworks (React, Vue...etc), which then leaves you with approximately only a 10 ms/frame window or less to complete all your tasks on the main thread to make user interaction feel smooth and snappy."
date: 2022-08-31
authors:
  - yyyyaaa
tags:
  - performance
  - javascript
redirect:
  - /s/0PaMaA
---

We all know that for web applications, perceived performance is highly importance for our users. For data intensive SPAs with CPU-intensive tasks, the single-threaded nature of Javascript starts to hinder the application's perceived performance when you cannot fit those CPU-intensive tasks into a 16.67 ms/frame window (translates to 60fps). That doesn't even account for code execution time of frameworks (React, Vue...etc), which then leaves you with approximately only a 10 ms/frame window or less to complete all your tasks on the main thread to make user interaction feel smooth and snappy.

Fortunately for us, JavaScript provides a couple of tools to solve these problems with some new features: Threading (through Web Worker) and Coroutines (through generators).

## Threading with web worker

If you don't know what a Web Worker is, check out [Parallelism in JavaScript](./parallelism-in-javascript.md) for a quick introduction.

With Web Worker we can offload a bunch of processing to another thread and it will not impact the performance of the main thread. Sounds perfect, but it comes with a cost: `serialization`.

Because of the heavy sandboxing of JS environment, using web workers only works well if we have small to medium inputs and outputs. Because all of the data transported between the main thread and worker thread is going to be serialized, which blocks the main thread while that happens (unless you are using binary formats like Shared Array Buffer or Typed Arrays, which comes with other caveats that is outside of the scope of this note).

If `serialization` is not a problem for your app then Web Worker will probably do a great job to enhance your app's performance and UX.

For real time apps that require continuously recalculation of data when new data comes, you can implement a game-loop-like updater function inside the web worker code to periodically emit data to main thread once per an interval time limit. That pattern works well because it allows you to control how often main thread should receive new data and UI should rerender.

## Coroutines with generators

When you have a serialization problem with Web Worker, another tool you can reach for is coroutines.

You are most likely already aware of coroutines in one form or another. A coroutine is basically a thread of programming logic that is working its way to completion at the same time as other things are doing the same. Or to put it simply: a coroutine is an execution that can be suspended and resumed.

Generators was introduced in ES6, adding the capability of suspending and resuming code execution. Here's a number generator that generates from 1 to 99:

```javascript
function* numberGen(maxValue = 100) {
  let currentValue = 0;
  while (currentValue < maxValue) {
    currentValue++;
    yield currentValue;
  }
}

// Generate and get numbers
const sequence = numberGen();
console.log(sequence.next()); // Prints : { value: 1, done: false }
console.log(sequence.next()); // Prints : { value: 2, done: false }
// When it reaches the 99th call
console.log(sequence.next()); // Prints : { value: 99, done: true }
```

So, ES6 generator allows us to run code and yield values whenever we like but it's still a rough tool, for our problem we need to combine generator with browser's `requestIdleCallback()` to request main thread to do an amount of work when it's idle, then see if there is enough time left to do more work, if not yield control back to main thread then queue another run the next time main thread is idle. Luckily somebody smart already thought of that, you can checkout [js-coroutines](https://github.com/miketalbot/js-coroutines) for a complete implementation and evaluate if it solves your app's problem.

## References

- https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator
- https://javascript.info/generators
- https://developer.mozilla.org/en-US/docs/Web/API/Window/requestIdleCallback
