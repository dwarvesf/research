---
title: null
description: null
date: null
tags:
  - generator
  - golang
redirect:
  - /s/NbawhA
---

### Story about generate a file

We usually run a command line in the golang project to generate a file, such as: the mock implementation for an interface.

```go
type UserRepo interface {
    Get(userID uint32) (*model.User, error)
    List() ([]model.User, error)
    ...
}
```

The old way, we make script in makefile and declare a step to generate the mock files. It's look like that

```shell
gen-mock:
    mockgen -source=./pkg/repo/repo.go -destination=./pkg/repo/mocks/repo.go
    mockgen -source=./pkg/google/service.go -destination=./pkg/google/mocks/service.go
    ...
```

### Problem

- We need to update the `makefile` for the new one. It make our `makefile` become huge
- We can make the typo mistake when we type the long file path

### Solution

Using the generate tool from go tool:

1. Setup the CLI application for generate file. In this case, we are using mockgen
2. Declare the generate tag in our source code `user_repo.go`

```go
import (
    "myapp/model"
)

//go:generate mockgen -source=./user_repo.go -destination=./mocks/user_repo.go
type UserRepo interface {
    Get(userID uint32) (*model.User, error)
    List() ([]model.User, error)
    ...
}
```

3. Run the go generate command

```shell
$ go generate ./...
```

This tool will help we generate a new mock file in our project at `myapp/model/mocks/user_repo.go`. We don't make our `makefile` become messy anymore

---

#### Reference

- https://blog.golang.org/generate
- https://pkg.go.dev/std
