---
title: "Go commentary #3: Generic collections, generics constraints, AI bot"
short_title: "#3 Generic Collections, Generics Constraints, AI Bot"
description: "Implementing generic collections in Go: challenges and solutions, with examples of sortable sets and constraints. Updates on Go's generics support and insights on a new AI bot being developed for the Go community. Stay current with Go's evolving ecosystem and best practices for using generics effectively."
date: 2024-07-12
authors:
  - fuatto
tags:
  - generics
  - go-weekly
  - golang
redirect:
  - /s/BMYiWQ
---

## [Writing generic collection types in Go: the missing documentation](https://www.dolthub.com/blog/2024-07-01-golang-generic-collections/#the-solution)

- Context:

  - Generics were released in Go 1.18 (~2y), is not used very much - only in some good cases for methods in _slices_ and _maps_ packages.

- Problem:

  - Wanted to write a sortable Set (slice or map) of any type but the documents for a generic collection are poor and immature.

  ```go
  type Sortable[T comparable] interface {
      Less(member T) bool
  }

  type Name struct {
      First string
      Last string
  }

  func (n Name) Less(member Name) bool {
      return n.First < member.First || n.First == member.First && n.Last < member.Last
  }

  var _ Sortable[Name] = Name{}
  ```

  ```go
  type SortableSet[T Sortable] interface { // cannot use generic type Sortable[T comparable] without instantiation
      Add(member T)
      Size() int
      Contains(member T) bool
      Sorted() []T
  }
  ```

  - Can try what built-in slices does in slices.go

  ```go
  func Index[S ~[]E, E comparable](s S, v E) int {
      for i := range s {
          if v == s[i] {
              return i
          }
      }
      return -1
  }
  ```

  ```go
  type SortableSet[T Sortable[E], E comparable] interface {
      Add(member T)
      Size() int
      Contains(member T) bool
      Sorted() []T
  }
  ```

  - But not work for map:

  ```go
  type MapSet[T Sortable[E], E comparable] struct {
      members map[T]struct{} // invalid map key type T (missing comparable constraint)
  }
  ```

- Solution:

  ```go
  // Type set used only for constraints, not vars
  type SortableConstraint[T comparable] interface {
      comparable
      Sortable[T]
  }

  type SortableSet[T SortableConstraint[T]] interface {
      Add(member T)
      Size() int
      Contains(member T) bool
      Sorted() []T
  }

  type SliceSet[T SortableConstraint[T]] struct {
      members []T
  }

  type MapSet[T SortableConstraint[T]] struct {
      members map[T]struct{}
  }
  ```

- Conclusion:

  - Current Google rearch results are not really helpful since the immaturity

  - The official Go documentations (proposal/ language spec) are too long

  - This article is very handy as considerably pioneering in real life implementation at [@Dolt](https://github.com/dolthub/dolt)

  - Cheat sheet found in spec by the authors:

  ```
  type argument      type constraint                // constraint satisfaction

  int                interface{ ~int }              // satisfied: int implements interface{ ~int }
  string             comparable                     // satisfied: string implements comparable (string is strictly comparable)
  []byte             comparable                     // not satisfied: slices are not comparable
  any                interface{ comparable; int }   // not satisfied: any does not implement interface{ int }
  any                comparable                     // satisfied: any is comparable and implements the basic interface any
  struct{f any}      comparable                     // satisfied: struct{f any} is comparable and implements the basic interface any
  any                interface{ comparable; m() }   // not satisfied: any does not implement the basic interface interface{ m() }
  interface{ m() }   interface{ comparable; m() }   // satisfied: interface{ m() } is comparable and implements the basic interface interface{ m() }

  ```

## [Russ Cox is working on a bot](https://github.com/golang/go/discussions/67901)

- Context:

  - As there is [@gopherbot](https://github.com/gopherbot) to try to help automate: labeling, commenting, changing issues' status...

  - Gaby (Go AI Bot) is being built (experiment) for what LLMs can be used effectively (including identifying what they should not be used for).

  - Source is not official nor open, can help snoop around in [this search](https://github.com/golang/go/issues?q=is%3Aissue+is%3Aopen+commenter%3Agabyhelp) and help send feedback.

---

- <https://www.dolthub.com/blog/2024-07-01-golang-generic-collections/#the-solution>
- <https://go.dev/ref/spec>
- <https://github.com/golang/go/discussions/67901>
- <https://pkg.go.dev/rsc.io/gaby>
