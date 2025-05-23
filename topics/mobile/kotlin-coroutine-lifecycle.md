---
title: Kotlin coroutine lifecycle
description: Learn the difference between CoroutineScope and CoroutineContext, understand the Job lifecycle states, and discover how cooperative cancellation works in Kotlin coroutines for effective concurrency control.
date: 2022-10-10
github_id: khanhtruong
redirect:
  - /s/XlQTJw
---

As you may know about coroutine previously, coroutine is a structured concurrency, which means it can control flow to ensure that every concurrent tasks work well until it completed or being canceled. Because of that, each coroutine have it own lifecycle and scope, represent by CoroutineContext and CoroutineScope.

## Coroutine context vs coroutine scope

Before we dive in coroutine lifecycle, we should know the difference between `coroutine context` and `coroutine scope`, so that we don't misunderstand them.

Reference from [Kotlin - doc](https://kotlinlang.org/docs/coroutines-and-channels.html#structured-concurrency)

> `Coroutine scope` is responsible for the structure and parent-child relationships between different coroutines. New coroutines usually need to be started inside a scope.

- FYI: coroutine builders like `launch` or `async` all extend from CoroutineScope. Which means you cannot run a coroutine without CoroutineScope.

> `Coroutine context` stores additional technical information used to run a given coroutine, like the coroutine custom name, or the dispatcher specifying the threads the coroutine should be scheduled on.

The difference is what they are invented for. `Coroutine scope` invented purpose was to the control scope of a coroutine, and how a new coroutine can be launched. On the other hand, `Coroutine context` is to provide elements that are responsible for threading.

Checking the `CoroutineContext` code, we hard to find any clue that could result in a life-cycle awareness. But, maybe it child does.

## Coroutine life-cycle

As you may know when we create a coroutine through coroutine builder, we got an instance of `Job`. Job is a cancellable thing with a life-cycle that culminates in its completion. In the end coroutine life-cycle is Job life-cycle, and Job life-cycle specified by its states.

> Under the hood, Job is a `coroutine context` when it implement `CoroutineContext.Element`(an interface of CoroutineContext)

### Job states

Job state is a combination of three variables `isActive`, `isCompleted`, and `isCancelled`. You can see all avaiable states of a Job in the below table:

| State                          | isActive | isCompleted | isCancelled |
| ------------------------------ | -------- | ----------- | ----------- |
| New (optional initial state)   | false    | false       | false       |
| Active (default initial state) | true     | false       | false       |
| Completing (transient state)   | true     | false       | false       |
| Cancelling (transient state)   | false    | false       | true        |
| Cancelled (final state)        | false    | true        | true        |
| Completed (final state)        | false    | true        | false       |

- isActive: A Job is in an **active state** when it is created or started. However, coroutine builders that accept a parameter `start` can create a Job with false on `isActive`(**new state**) and later on be activated by calling `start` or `join` function.
- isCancelled: A failure of an active Job with an exception makes it cancelling. Or you can cancel a Job at any time with `cancel` function that forces it to transition to the **cancelling state** immediately. A job can only archive **cancelled state** when it finished executing its work and all its children are completed.
- isCompleted: By calling `CompletableJob.complete` we transitions the Job to the **completing state**. It waits in the **completing state** until all its children completed before transitioning to the **completed state**.
  - Note that **completing state** is purely internal to the job. For an outside observer a completing job is still active, while internally it is waiting for its children.

The state machine of Job will look something like this:
![Job states](https://khanhth-public-image-raw.s3.ap-southeast-1.amazonaws.com/job-states.png)

### Cancellation of a coroutine

While **completed state** is quite straightforward to understand, canceling a coroutine may be hard for you. So how can we cancel a coroutine when it's in the middle of the execution?

### Cancellation is cooperative

> Due to [Kotlin-doc](https://kotlinlang.org/docs/cancellation-and-timeouts.html#cancellation-is-cooperative) : Coroutine cancellation is cooperative. A coroutine code has to cooperate to be cancellable. Any suspend function can be canceled, but if a coroutine is working in a computation and does not check for the cancellation, then it cannot be canceled until its finish work.

Try to run below example in playground

```kotlin
val job = launch {
    repeat(1000) { i ->
        println("job: I'm sleeping $i")
    }
}
delay(1300L) // delay a bit
println("main: I'm tired of waiting!")
job.cancelAndJoin() // cancels the job
println("main: Now I can quit.")

----------- Output -----------
job: I'm sleeping 0
job: I'm sleeping 1
job: I'm sleeping 2
job: I'm sleeping 3
job: I'm sleeping 4
job: I'm sleeping 5
...
```

An endless `job: I'm sleeping...` is printed without any sight of cancellation happening. This proves that a coroutine cannot be canceled when it is in the middle of an execution. How can our coroutine be cancellable?

### Making coroutine pleasure to cancel

Conceptually, we have two ways to cancel our coroutine with pleasure:

- Using `suspendCancellableCoroutine` function like `delay` or `yield`. Whenever we need to ensure our coroutine is active before starting a time-consuming computation.
- Second, we could manually check for the coroutine state in the middle of a Job through the `isActive` variable.

Take a look at this snippet code block for the second approach:

```kotilin
import kotlinx.coroutines.*

fun main() = runBlocking {
    val startTime = System.currentTimeMillis()
    val job = launch(Dispatchers.Default) {
        var nextPrintTime = startTime
        var i = 0
        while (isActive) {
            // print a message twice a second
            if (System.currentTimeMillis() >= nextPrintTime) {
                println("job: I'm sleeping ${i++} ...")
                nextPrintTime += 500L
            }
        }
    }
    delay(1300L) // delay a bit
    println("main: I'm tired of waiting!")
    job.cancelAndJoin() // cancels the job and waits for its completion
    println("main: Now I can quit.")
}

----------- Output -----------
job: I'm sleeping 0 ...
job: I'm sleeping 1 ...
job: I'm sleeping 2 ...
main: I'm tired of waiting!
main: Now I can quit.
```

> Avoiding wasting computation on a redundant Job by using `isActive` variable.

## Summarize

In this article, we know the difference between CoroutineScope and CoroutineContext. From the purpose of CoroutineContext, we know that the coroutine life-cycle is the Job life-cycle. And Job life-cycle is specified by the combination of `isActive`, `isCompleted`, and `isCancelled` variables. How coroutine cancellation work and ways to apply it in code.

## References

- [Kotlin-doc: CoroutineContext & Dispatchers](https://kotlinlang.org/docs/coroutine-context-and-dispatchers.html)
- [Kotlin-doc: Job](https://kotlinlang.org/api/kotlinx.coroutines/kotlinx-coroutines-core/kotlinx.coroutines/-job/)
- [Kotlin-doc: Cancellation](https://kotlinlang.org/docs/cancellation-and-timeouts.html#cancellation-is-cooperative)
