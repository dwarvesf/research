---
title: "Go commentary #20: Go turns 15"
short_title: "#20 Go Turns 15"
description: The 15th anniversary of the Go open source release
date: 2024-11-15
authors:
  - fuatto
tags:
  - go-weekly
  - golang
redirect:
  - /s/BuYiXQ
---

## [Go Turns 15](https://go.dev/blog/15years)

- So much has changed since [Go's 10 year anniversery](https://go.dev/blog/10years)

  - Go’s user base x3 in the past five years, making it one of the fastest growing languages.
  - From its beginnings just fifteen years ago, Go has become a top 10 language and the language of the modern cloud.

- It's a year of for loop:

  - [Go 1.22 in February](https://go.dev/blog/go1.22)

    - Fixed the accidental sharing of loop variables between iterations:

    ```go
    func main() {
      done := make(chan bool)

      values := []string{"a", "b", "c"}
      for _, v := range values {
          go func() {
              fmt.Println(v)
              done <- true
          }()
      }

      // wait for all goroutines to complete before exiting
      for _ = range values {
          <-done
      }
    }
    ```

    - Support for ranging over integer

    ```go
    package main

    import "fmt"

    func main() {
        for i := range 10 {
            fmt.Println(10 - i)
        }
        fmt.Println("go1.22 has lift-off!")
    }
    ```

    - Improved performance

      - Memory optimization in the Go runtime improves CPU performance by 1-3%, while also reducing the memory overhead of most Go programs by around 1%.

      - In Go 1.21, we shipped profile-guided optimization (PGO) for the Go compiler and this functionality continues to improve. One of the optimizations added in 1.22 is improved devirtualization, allowing static dispatch of more interface method calls. Most programs will see improvements between 2-14% with PGO enabled.

    - Standard library additions

      - A new **math/rand/v2** package provides a cleaner, more consistent API and uses higher-quality, faster pseudo-random generation algorithms. See the proposal for additional details.

      - The patterns used by **net/http.ServeMux** now accept methods and wildcards.

        For example, the router accepts a pattern like _GET /task/{id}/_, which matches only GET requests and captures the value of the {id} segment in a map that can be accessed through Request values.

      - A new _Null[T]_ type in **database/sql** provides a way to scan nullable columns.

      - A Concat function was added in package **slices**, to concatenate multiple slices of any type.

  - [Go 1.23 in August](https://go.dev/blog/go1.23)

    - Range expressions in a _“for-range”_ loop may now be iterator functions, such as `func(func(K) bool)`. This supports user-defined iterators over arbitrary sequences. There are several additions to the standard slices and maps packages that work with iterators, as well as a new iter package. As an example, if you wish to collect the keys of a map m into a slice and then sort its values, you can do that in Go 1.23 with slices.Sorted(maps.Keys(m)).

    - Preview support for generic type aliases.

    - Tool improvements

      - Starting with Go 1.23, it’s possible for the Go toolchain to collect usage and breakage statistics to help understand how the Go toolchain is used, and how well it is working. This is _Go telemetry_, an opt-in system. Please consider opting in to help us keep Go working well and better understand Go usage.

      - The go command has new conveniences. For example, running `go env -changed` makes it easier to see only those settings whose effective value differs from the default value, and `go mod tidy -diff` helps determine the necessary changes to the _go.mod_ and _go.sum_ files without modifying them. Read more on the Go command in the release notes.
      - The `go vet` subcommand now reports symbols that are too new for the intended Go version.

- For next 15 years:

  - Evolving Go to better leverage the capabilities of current and future hardware

  - Go 1.24 will have a totally new map implementation under the hood that’s more efficient on modern CPUs.
  - Prototyping new garbage collection algorithms designed around the capabilities and constraints of modern hardware.

  - Some improvements will be in the form of new APIs and tools so Go developers can better leverage modern hardware.

  - Working on making Go better for AI—and AI better for Go (LangChainGo & Genkit)

---

https://go.dev/blog/15years

https://go.dev/blog/10years

https://go.dev/blog/go1.22

https://go.dev/blog/go1.23
