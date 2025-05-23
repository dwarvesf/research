---
title: "Go commentary #7: Releases, websockets, and struct behavior"
short_title: "#7 Go 1.23, Websockets, and Structs"
description: Exploring Go 1.23 release notes, the new home for nhooyr/websocket, and common mistakes with Go structs and slices.
date: 2024-08-16
authors:
  - fuatto
tags:
  - networking
  - go-weekly
  - golang
redirect:
  - /s/a52MWg
---

## [Go 1.23 Release Note](https://go.dev/doc/go1.23)

- Full notes that you should skim through to get full-fledged of Go 1.23

## [A New Home for nhooyr/websocket](https://coder.com/blog/websocket)

- [nhooyr/websocket](https://github.com/nhooyr/websocket) is adopted by [Coder](https://coder.com/), CDE - Cloud Development Environment

## [Go structs are copied on assignment ](https://jvns.ca/blog/2024/08/06/go-structs-copied-on-assignment/)

- Inspired by [Common Go Mistakes](https://100go.co/)

```go
type Thing struct {
    Name string
}

func main() {
  thing := Thing{"record"}
  other_thing := thing
  other_thing.Name = "banana"
  fmt.Println(thing)            // {record}
}
```

```go
type Thing struct {
  Name string
}

func findThing(things []Thing, name string) *Thing {
  for _, thing := range things {
    if thing.Name == name {
      return &thing
    }
  }
  return nil
}

func main() {
  things := []Thing{Thing{"record"}, Thing{"banana"}}
  thing := findThing(things, "record")
  thing.Name = "gramaphone"
  fmt.Println(things)           // [{record} {banana}]
}
```

=> fix:

```go
func findThing(things []Thing, name string) *Thing {
  for i := range things {
    if things[i].Name == name {
      return &things[i]
    }
  }
  return nil
}
```

```go
func main() {
	x := []int{1, 2, 3, 4, 5}
	y := x[2:3]
	fmt.Println(y)
	y = append(y, 555)          // y = {3, 555}
	fmt.Println(x)              // {1, 2, 3, 555, 5}
}
```

=> fix:

```go
func main() {
	x := []int{1, 2, 3, 4, 5}
	y := x[2:3:3]
	fmt.Println(y)
	y = append(y, 555)          // y = {3, 555}
	fmt.Println(x)              // {1, 2, 3, 4, 5}
}
```

---

- https://go.dev/doc/go1.23
- https://coder.com/blog/websocket
- https://github.com/coder/websocket
- https://jvns.ca/blog/2024/08/06/go-structs-copied-on-assignment/
- https://100go.co/
