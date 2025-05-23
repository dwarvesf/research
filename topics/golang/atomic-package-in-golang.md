---
title: Atomic package in golang
description: Learn how to solve race conditions in Go by using the sync/atomic package for atomic operations and pointers, offering faster and simpler alternatives to mutex locks in concurrent programming.
date: 2022-08-09
github_id: hieuphq
redirect:
  - /s/6Gxs9A
---

We often run some functions asynchronously in real projects using the go routine. The problem we're facing is race-condition when updating the same variable. The solutions can be using a mutex lock or concurrency patterns to change our situation using the channels. However, In this document, we want to solve this problem when we want to update the same memory resource. Go standard library provide `sync/atomic` package to solve our problem.

## Problem

We need to add a value to an integer value. It's elementary logic until we run the logic many times and asynchronously. Run three times with a loop of 2000; our expectation is 6000. However, the result is not stable: many times with values less than 6000.

```go
package main

import (
  "fmt"
  "sync"
)

func main() {
  var i int32
  var wg sync.WaitGroup

  wg.Add(3)

  go Process(&i, &wg)
  go Process(&i, &wg)
  go Process(&i, &wg)

  wg.Wait()
  fmt.Println("i:", i)
}

func Process(variable *int32, wg *sync.WaitGroup) {
  defer wg.Done()

  for i := 0; i < 2000; i++ {
    *variable++ // The race condition
  }
}
```

## Solutions

### Using mutex

We run three go routines in the above example code to update the same `i` variable. Our expectation: The value always equals 6000. However, we got the race condition. The simple solution is to pass a `mutex` lock to update the value synchronously.

```go
func Process(variable *int32, wg *sync.WaitGroup, mu *sync.Mutex) {
  defer wg.Done()
  for i := 0; i < 2000; i++ {
    mu.Lock()
    *variable++
    mu.Unlock()
  }
}
```

### Using atomic

Package `sync/atomic` offers primitives for atomic memory that are low-level and useful for implementing synchronization algorithms. It encapsulates the synchronous logic in the utility functions.

```go
func Process(variable *int32, wg *sync.WaitGroup) {
  defer wg.Done()
  for i := 0; i < 2000; i++ {
    atomic.AddInt32(variable, 1)
  }
}
```

### Benchmark solutions

Below is a benchmark test for three implementations. The logic using `atomic` is faster than `mutex lock`, around 33.14% in this case.

| Benchmark                         | Run   | Speed           |
| --------------------------------- | ----- | --------------- |
| BenchmarkAddValueRacedCondition-8 | 93110 | 12423 ns/op     |
| BenchmarkAddValueWithMutex-8      | 10000 | 126994 ns/op    |
| BenchmarkAddValueWithAtomic-8     | 14080 | **84896 ns/op** |

In the meantime, this package support functions to interact with some types in Golang: int32, int64, uint32, uint64, and the pointer. The implementation with Pointer is an excellent feature. It can get easier to apply the help of the atomic package for other types. It provides an interface to store, update, and retrieve a value of a specific type and is asynchronously included.

## Atomic pointer use case

We build our system using Metabase as a reporting service. Metabase provides the API to interact with the dashboard via RESTful. A JWT token is used to authenticate the request. We need a logic to update the JWT token while the other business logic uses the JWT token.

```go
package main

type MetabaseConn struct {
  Token string
}

func main() {
  SyncConfig()
}

func ShowConnection(p *atomic.Value) {
  for {
    time.Sleep(2 * time.Second)
    fmt.Println(p, p.Load())
  }
}

func SyncConfig() {
  c := make(chan bool)
  s := MetabaseConn{Token: "init jwt token"}
  p := atomic.Value{}
  p.Store(&s)

  go ShowConnection(&p)

  go func() {
    for {
      time.Sleep(5 * time.Second)
      newToken := fmt.Sprintf("updated %d", time.Now().Unix())
      newConn := MetabaseConn{Token: newToken}
      p.Swap(&newConn)
    }
  }()

  <-c
}
```

`SyncConfig` is invoked as a go routine. The `MetabaseConn` object will be created by the inline method and swapped out for the current connection object. This is feasible with only variables, but doing so would necessitate putting in place a **lock-unlock** implementation. The atomic package abstracts this and ensures that each load and save is handled one after the other. This is a simple example of a not-so-common usage scenario.

## Conclusion

Atomic types in Go are a simple approach to handling shared resources. It eliminates the need to maintain a mutex to limit resource access. This is not to say that mutexes are obsolete, as they are still useful in other cases. Finally, `atomic.Pointer` is an excellent approach to incorporate atomic memory primitives into your program. It is a simple approach to prevent data races without the use of complicated mutex code.

## Reference

- https://pkg.go.dev/sync/atomic
- https://www.geeksforgeeks.org/atomic-variable-in-golang/
- https://betterprogramming.pub/atomic-pointers-in-go-1-19-cad312f82d5b
