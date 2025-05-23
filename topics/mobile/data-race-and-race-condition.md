---
title: Data race and race condition
description: Learn the difference between data race and race condition in multithreaded programming, and discover how mutex and atomic operations ensure data safety by controlling access to shared resources.
date: 2022-12-11
github_id: pthung1311
icy: 10
redirect:
  - /s/t4_jIQ
---

This article will present a concept, which is `Data Race`. And what are we going to do to ensure data safety in multithreaded programming.

Also, a concept quite related to this topic is `Race Condition`. If you don't know yet, try to learn it.

## What is Data race?

In fact, I think some people are quite confusing of `Data race` concept and `Race Condition` concept.

### Concept

`Data Race` occurs when two or more threads access a `shared resource` with at least one thread changing the value on that memory area.

> It's look similar to the concept of `Race Condition`. We will analyze those two relationships in the following section.

The conditions for `Data Race` to occur are as follows:

- There are 2 or more threads accessing the shared resource (shared data) to read or write. Specifically, the shared resource is a variable or an object.
- There is at least one thread that changes the value of that variable or object. If all threads only read data, there will be no data race.

### For example

In fact, an example of a `Data Race` is the classic ATM withdrawal problem. Suppose you have 1 ATM card and 1 Visa Debit card with the same link to a bank account and withdraw money at the same time. There is still 50 \$ in the account, just enough to make a bowl of really cool vermicelli and a cup of iced tea. I simultaneously withdraw at both ATMs 50 \$. If I don't process the data race, I will be lucky to withdraw a total of 100 \$ on both machines.

### Solution

When there are many threads reading and writing to the shared resource, the probability of a data race is very high. So solving this problem is also quite simple.

- We need to ensure that only one thread can access the shared resource at a time.
- Each thread will take turns manipulating the shared resource.
- The action keeps repeating until all is satisfied.

> In programming, the piece of code used to `read/write shared resources` is called a `critical section/critical region.`

Taking turns using the `critical section` is a mechanism for handling the `Data Race`, called the `mutex`. Also known as `mutual exclusion`.

That sequence of actions is called an `atomic operation` with the following properties:

- Execute as a `single operation`.
- Execution is not interrupted by any thread.
  And you also have to pay attention to the Dead Lock problem when locked forever.

## Data race vs. race condition

The two problems `Data Race and Race Condition` are often equated as one. However, it describes two different problems in `multi-thread` programming.

**Race Condition**

- Will focus on the execution **order** of threads.
- The problem of timing or execution order of the threads in the program makes the final result not as expected.

**Data Race**

- Focus on the valuable side of data
- The values are overwritten with each other. Leads to reading the value will be wrong.

The solutions to these two problems are quite similar. Just make sure one thread is accessing the critical section at a time.

### Relationship

In fact, `Race Condition` occurs due to `Data Race` and `Data Race` leads to `Race Condition`. Not very different, but these two issues are not dependent on each other.

- A program can have a `data race` without a `race condition`.
- Or have a `race condition` without a `data race`.

Let's see an example as follows.

```Swift
var number = 100
let concurrentQueue = DispatchQueue(label: "concurrentQueue", attributes: .concurrent)
concurrentQueue.async {
    print("#1: \(self.number) - 50")
    self.number -= 50
}

concurrentQueue.async {
    print("#2: \(self.number) / 2")
    self.number /= 2
}
DispatchQueue.main.asyncAfter(deadline: .now() + 0.05) {
    print(self.number)
    self.number = 100
}
```

```
# Result
#2: 100 / 2
#1: 50 - 50
0

#1: 100 - 50
#2: 50 / 2
25
```

This is an example of doing a simple expression of `100 - 50 / 2`. Try running the above sequence many times, and you will see very surprising results.

You can also easily see the results of different runs `(25 & 0)`. It is also the order in which you execute the expression `100 - 50 / 2`.

- If subtracting first, it will be `25`
- If dividing first, it will be `0`

### Other cases

It do have a reciprocal relationship. However, there are many cases where one does not have the other. I can summarize as follows:

- Having a `Race Condition` leads to a `Data Race` (example above)

- There is `Race Condition` but no `Data Race`

See the following example:

```Swift
concurrentQueue.async {
    for i in 1...10 {
        print("🔴 \(i)")
    }
}
concurrentQueue.async {
    for i in 1...10 {
        print("🔵 \(i)")
    }
}
```

It's just that they're strong, everyone runs. If you think about the sequence of threads, this will fall into the `Race Condition` and have no effect on the data at all.

- Have `Data Race` without `Race Condition`

Take a look at this example.

```Swift
var number: Int = 0
DispatchQueue.concurrentPerform(iterations: 500) { i in
    print("\(i) : \(Thread.current)")
    number = i
}
print(number)
```

Each time you execute it, you will get a different result. The main cause is `DispatchQueue.concurrentPerform`, which executes the code on `different Threads`. The number of Threads depends on the decision system.

Together these threads change the value of `number`. Almost everything happens instantaneously together. There is no conflict between Threads. Or does one affect the other. Therefore, the phenomenon of Race Condition almost does not occur.

## Summarize

In this article, we know the difference between `Race Condition` and `Data Race`. And relationship between `Race Condition` and `Data Race`. Race conditions and Data Races can lead to unexpected behavior in our code. So it would be best if you have aware about this.

## References

- [Race condition vs. data race: the differences explained](https://www.avanderlee.com/swift/race-condition-vs-data-race)
- [Data race và mutual exclusion](https://viblo.asia/p/007-data-race-va-mutual-exclusion-4dbZNGvmlYM)
