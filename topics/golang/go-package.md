---
title: Package first design
description: In Go, packages serve as the basic building blocks for creating modular, reusable, and maintainable software.
date: 2024-10-25
authors:
  - tieubao
tags:
  - golang
  - package
redirect:
  - /s/OevFkQ
---

Here's another article that I want to reassure everyone to know about it. As Go pushes more type [composition over inheritance](https://go.dev/doc/faq#Is_Go_an_object-oriented_language), the POV on building 'unit' is different compare to other languages.

In Go, packages serve as the basic building blocks for creating **modular, reusable**, and maintainable software. Go's philosophy encourages developers to organize their code in a package-oriented way.

Treat your packages as base units. This means that, from the outset, you should structure your project into reusable, well-encapsulated packages, each with a clear purpose.

### Key concepts

1. **Encapsulation and exporting**

By default, Go keeps all symbols (functions, variables, constants, types) within a package private unless they are explicitly exported. Exported symbols in Go start with an uppercase letter. This helps enforce encapsulation, exposing only what's necessary for external users while keeping the internal details hidden.

For example:

```go
// This function is public and can be used outside the package.
func Add(a, b int) int {
    return a + b
}

// This function is private to the package.
func subtract(a, b int) int {
    return a - b
}
```

2. **Separation of concerns**

Packages should follow the principle of separation of concerns. Each package should serve a single purpose or set of related tasks. This makes the codebase more understandable and easier to maintain.

For instance, if you're building a web server, you might separate concerns into different packages like:

- `http`: Handles HTTP requests and responses.
- `router`: Manages routing of different endpoints.
- `db`: Manages database interactions.

3. **Directory structure**
   Go’s tooling is designed to work seamlessly with a package-oriented directory structure. Each directory contains its own package, which can be imported by other parts of your project.

Here's an example directory structure:

```go
myproject/
  ├── go.mod
  ├── cmd/            // For command-line tools and executables
  │   └── myapp/
  │       └── main.go
  ├── pkg/            // For libraries and reusable code
  │   └── http/
  │       └── handler.go
  ├── internal/       // For non-public packages
  │   └── config/
  │       └── config.go
  └── vendor/         // Third-party dependencies (if needed)
```

4. **Testing in packages**

Each package should also contain its own unit tests, which are placed in the same directory as the package itself, following Go's testing framework. Test files are named with the `_test.go` suffix and can test both exported and internal functions of a package.

Example:

```go
// In mathutil/add_test.go
package mathutil

import "testing"

func TestAdd(t *testing.T) {
    result := Add(2, 3)
    if result != 5 {
        t.Errorf("Expected 5, but got %d", result)
    }
}
```

5. **Modularity and reusability**

By structuring your code into distinct packages, you create **reusable** building blocks. These packages can be easily shared across different projects or within teams, and since Go’s import system relies on unique paths, there’s no conflict as long as each package’s import path is unique.

### How to apply

To apply package-oriented development with a focus on reusability, follow these steps. Keeping reusability in mind from the start ensures your code is modular, maintainable, and adaptable for future projects.

Please take note that all below examples are to demonstrate the approach

1. **Identify core domains and reusable utility needs**

- **Define key domains**: Break down the main areas of functionality (or domains) in your project, such as `users`, `orders`, or `products` for an e-commerce app.
- **Identify reusable utilities**: List any generic functionalities, like string manipulation or date formatting, that multiple domains might need. Plan to create specific utility packages for these, separate from domain logic.

Example Structure:

```go
myproject/
  ├── users/
  ├── orders/
  └── util/
       ├── stringutil/
       └── timeutil/
```

2. **Design each package to be self-contained and purpose-driven**

- Each package should have a **single responsibility**, encapsulating everything it needs for its function. This approach makes it easier to reuse entire packages across projects.
- Avoid mixing different concerns. A `users` package, for example, should contain everything about user management (e.g., types, validation, storage) without including unrelated functions.

This single responsibility design ensures that when you need similar functionality in another project, you can reuse the package without modification.

3. **Create generalized, flexible functions**

- When writing functions within a package, think about how they might be used in other contexts. Avoid overly specific parameters or hardcoded values that tie functions to one scenario.
- For instance, instead of a `ValidateUserEmail` function, create a `ValidateEmail` function in a `validation` utility package, making it applicable to emails in any domain.

4. **Use interfaces to decouple dependencies**

- Define interfaces to allow flexible interactions between packages. Instead of directly calling functions from another package, define an interface in the calling package. This way, different implementations can be plugged in as needed.
- For example, if `orders` needs data from `users`, create an interface in `orders` that describes only the needed methods, letting any `User` service that meets this interface be used.

```go
// orders/service.go
package orders

type UserFetcher interface {
    GetUser(userID int) (User, error)
}

type OrderService struct {
    UserService UserFetcher
}
```

Using interfaces like this enhances reusability because each package relies on general contracts rather than specific implementations.

5. **Structure utility packages for broad use**

- Create focused utility packages that are purpose-driven and independent of specific domains. For instance, `stringutil` could contain generic string functions, while `timeutil` could handle time parsing and formatting.
- Organizing utilities in this way makes them truly reusable across any project or domain.

This organization avoids the common “catch-all” `utils` package, promoting well-structured, reusable functions that don’t add unnecessary dependencies.

6. **Document with reusability in mind**

- Write clear documentation for each package, focusing on its purpose, its public API, and how to use it. Document with the mindset that another developer (or future you) may want to reuse it in a different context.
- For utility functions, provide examples in the documentation to clarify their general use.

This documentation makes it easier for others to understand and adopt your package, increasing the likelihood of reuse.

7. **Write independent unit tests for each package**

- Write tests for each package that validate its functionality independently of the rest of the project. This not only ensures correctness but also supports reusability, as each package can be confidently reused without additional modification or testing.
- Use test files (ending with `_test.go`) within each package and focus on testing each function’s behavior as if it were in a standalone environment.

8. **Refactor with reusability in mind**

- As you add features, continually review and refactor to ensure packages remain focused and reusable. If a package is accumulating functions that don’t belong, refactor those into new packages, keeping each package aligned with its single responsibility.

Periodic refactoring keeps packages easy to understand, maintain, and reuse, avoiding monolithic packages that are hard to untangle or apply to new contexts.

---

- **Code organization**: Dividing functionality into small, focused packages keeps the code clean and organized.
- **Reusability**: Once written, a package can be reused in many projects or different parts of a large project.
- **Maintainability**: With a well-structured package layout, code becomes easier to maintain, modify, and extend.
- **Collaboration**: Teams can work on separate packages concurrently, as each package represents an independent unit of functionality.
- **Testing and debugging**: Since each package is modular, testing becomes easier, and debugging issues can be done within the context of specific packages.
