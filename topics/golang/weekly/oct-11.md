---
title: "Go commentary #15: using Go embed, and Reflect"
short_title: "#15 Go embed and Reflect"
description: Quick notes on Go embed and Go Reflect
date: 2024-10-11
authors:
  - fuatto
tags:
  - go-weekly
  - golang
redirect:
  - /s/KkT-Rw
---

## [Using Go Embed](https://www.bytesizego.com/blog/go-embed)

- The `go:embed` directive tells the Go compiler to include files and folders into the compiled binary at build time. This means your application can access these resources directly from memory without needing to read from the disk at runtime.

- Usage:

  - with a single file message.txt ("hello from bytesizego!")

  ```go
  package main

  import (
    _ "embed"
    "fmt"
  )

  //go:embed message.txt
  var message string

  func main() {
    fmt.Println(message) // hello from bytesizego!
  }

  ```

  - with multiple files

  ```go
  package main

  import (
    _ "embed"
    "fmt"
  )

  //go:embed messages/*.txt
  var messages embed.FS

  func main() {
    files, _ := messages.ReadDir("messages")
    for _, file := range files {
      data, _ := messages.ReadFile("messages/" + file.Name())
      fmt.Printf("File: %s\nContent: %s\n\n", file.Name(), data)
    }
  }
  ```

  - with a directory (the path specified in ReadFile is relative to the embedded root.)

  ```go
  package main

  import (
    "embed"
    "fmt"
  )

  //go:embed static
  var staticFiles embed.FS

  func main() {
    data, _ := staticFiles.ReadFile("static/index.html")
    fmt.Println(string(data))
  }
  ```

- Limitations:

  - File Size: Embedding large files can significantly increase your binary size.
  - File Changes: Changes to the embedded files require recompilation.

## [Reflecting on Go Reflection](https://www.dolthub.com/blog/2024-10-04-reflecting-on-reflect/)

- Context: using generative AI tooling, generated code using Reflect package

```go
bsVal := reflect.ValueOf(blockStore).Elem()

tables := bsVal.FieldByName("tables")

typ := tables.Type()
fmt.Printf("tables.Type: %v\n", typ)
for i := 0; i < typ.NumField(); i++ {
  fmt.Printf("tables %d: %s\n", i, typ.Field(i).Name)
}
for i := 0; i < typ.NumMethod(); i++ {
  fmt.Printf("method %d: %s\n", i, typ.Method(i).Name)
}
```

- [Laws of reflection](https://go.dev/blog/laws-of-reflection)

  - Reflection goes from interface value to reflection object

  - Reflection goes from reflection object to interface value

  - To modify a reflection object, the value must be settable

  => In short, the _Interface_ method is the inverse of the _ValueOf_ function, except that its result is always of static type interface{}.
  Reiterating: Reflection goes from interface values to reflection objects and back again.

- Zeroth Law: Use reflect at your own peril. Misuse it, and it will _panic_ with no regrets.

---

https://www.bytesizego.com/blog/go-embed

https://www.dolthub.com/blog/2024-10-04-reflecting-on-reflect/
