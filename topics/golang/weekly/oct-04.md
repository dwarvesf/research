---
title: "Go commentary #14: Golang compile-time evaluation and Go bindings to SQLite using wazero"
short_title: "#14 Compile-time eval & SQLite with wazero"
description: A quick toolings for compile-time evaluation and SQLite wrapper with WebAssembly runtime for Go
date: 2024-10-04
authors:
  - fuatto
tags:
  - go-weekly
  - golang
redirect:
  - /s/0P_Xng
---

## [Prep: Golang comptime. Pure blasphemy](https://github.com/pijng/prep)

- A small Go tool that enables compile-time function evaluation. By using `prep.Comptime`, you can evaluate functions at build time, replacing them with their computed results. Just like `comptime` from Zig. Except it's not.

- Features
  - Compile-Time Evaluation: Replace function calls with their computed results at build time.
  - Simple Integration: Use prep as both a Go library and a standalone executable.
  - Tooling Support: Easily integrate prep with your Go build process using -toolexec.

```go
package main

import (
  "fmt"
  "github.com/pijng/prep"
)

func main() {
  // This will be evaluated at compile-time
  result := prep.Comptime(fibonacci(300))

  fmt.Println("Result:", result)
}

func fibonacci(n int) int {
  fmt.Printf("calculating fibonacci for %d\n", n)

  if n <= 1 {
    return n
  }

  return fibonacci(n-1) + fibonacci(n-2)
}
```

- Build `go build -a -toolexec="prep <absolute/path/to/project>" main.go`

- Limitations

  - Currently, prep.Comptime only supports basic literals as arguments.

  ```go
  // Pass a basic literal directly
  func job() {
    prep.Comptime(myFunc(1))
  }

  // Use a variable with the value of basic literal from the same scope as wrapped function
  func job() {
    x := 1
    y := 2
    prep.Comptime(myFunc(x, y))
  }
  ```

  - Only functions that can be fully resolved with the provided literal arguments can be evaluated at compile-time, therefore it is impossible to use any values from IO operations.

## [go-sqlite3: Go bindings to SQLite using wazero](https://github.com/ncruces/go-sqlite3)

- Go module **github.com/ncruces/go-sqlite3** is a cgo-free SQLite wrapper. It provides a **database/sql** compatible driver, as well as direct access to most of the C SQLite API.

- It wraps a Wasm build of SQLite, and uses wazero as the runtime. Go, [wazero](https://github.com/tetratelabs/wazero) and x/sys are the only runtime dependencies.

```go

import "database/sql"
import _ "github.com/ncruces/go-sqlite3/driver"
import _ "github.com/ncruces/go-sqlite3/embed"

var version string
db, _ := sql.Open("sqlite3", "file:demo.db")
db.QueryRow(`SELECT sqlite_version()`).Scan(&version)
```

---

https://github.com/pijng/prep

https://github.com/ncruces/go-sqlite3

https://github.com/tetratelabs/wazero
