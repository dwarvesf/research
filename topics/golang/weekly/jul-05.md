---
title: "Go weekly #2: Go 1.23 iterators"
short_title: "#2 Go 1.23 Iterators"
description: Exploring the new Go package for iterators - learn what it is, what the controversy is about, and how to use it.
date: 2024-07-05
authors:
  - fuatto
tags:
  - iterators
  - go-weekly
  - golang
redirect:
  - /s/5-Ernw
---

## [Why People are Angry over Go 1.23 Iterators](https://www.gingerbill.org/article/2024/06/17/go-iterator-design/)

- Context:
  - Most languages provide standardized way to iterate over values stored in [containers](https://en.wikipedia.org/wiki/Container_(abstract_data_type)).
- Problem:

  - Go has `for` `range` for maps, slices, strings, arrays and channels but no generic mechanism for user-written containers.

  - Short list of some non-generic iterators:

    - _runtime.CallersFrames_: returns `runtime.Frames` iterates over stack frames; `Frames` has a `Next` method and a bool to check if there are more frames.

    - _bufio.Scanner_: iterates through an `io.Reader`; `Scan` method advances to the next value, `Bytes` method to return the value and `Err` to return error.

    - _database/sql.Rows_: iterates through the results of a query; also has `Scan` method.

  - Before Generics were introduced, no way to write an interface that described an iterator that would cover all of the use cases...

- Solution:

  - Go 1.22 proposal of adding package `iter` can range over integers and functions:

  ```go
  type (
    Seq[V any]     func(yield func(V) bool) bool
    Seq2[K, V any] func(yield func(K, V) bool) bool
  )
  ```

  (Seq2 represents a sequence of paired values: key-value, index-value or value-error)

  - An iterator is a function that passes successive elements of a sequence to a callback function `yield`, it returns true if it should continue, false if it should stop.

  ```go
  type (
      Yield[V any] func(V bool)
      Yield2[K, V any] func(K,V) bool
  )
  ```

  - Examples:

  ```go
  func Backward[E any](s []E) func(func(int, E) bool) {
      return func(yield func(int, E) bool) {
          for i := len(s)-1; i >= 0; i-- {
              if !yield(i, s[i]) {
                  // Where clean-up code goes
                  return
              }
          }
      }
  }

  s := []string{"a", "b", "c"}
  for _, el in range Backward(s) {
    fmt.Print(el, " ")
  }
  // c b a
  ```

- Conclusion:
  - The `for range` is getting complex:
    - _return true_ => _continue_
    - _return false_ => _break_
  - Feels too functional than an imperative language
  - Still the purpose is good, let's wait to see the adoption in community after awhile

---

- https://www.gingerbill.org/article/2024/06/17/go-iterator-design/
- https://github.com/golang/go/issues/61897
- https://en.wikipedia.org/wiki/Container_(abstract_data_type)
