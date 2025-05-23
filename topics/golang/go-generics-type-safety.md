---
title: How does Go achieve type safety when it enables generics?
description: A quick note on How does Go achieve type safety when it enables generics
date: 2024-10-14
authors:
  - tieubao
tags:
  - generics
  - golang
redirect:
  - /s/dyxkog
---

Go introduced generics with Go 1.18, which was officially released in March 2022. This update allowed Go developers to write more flexible and reusable code by supporting type parameters, enabling functions, and data structures to work with different types without sacrificing type safety.

Before this, Go was known for its simplicity and type safety but lacked the kind of flexibility that generics bring, which is a feature common in other languages like Java, C#, and C++. Generics were one of the most anticipated features in Go's development, and the 1.18 release was a significant milestone for the language.

Go achieves type safety with generics through **type parameters** and **type constraints**. Here’s how it works:

### 1. Type parameters

When you define a function, method, or data structure with generics, you specify a type parameter in square brackets `[]`. This type parameter allows the function or type to accept different types without being tied to a specific one. However, the type still needs to conform to certain rules, which leads to the next part—**type constraints**.

Example of a generic function with type parameters:

```go
func Print[T any](items []T) {
    for _, item := range items {
        fmt.Println(item)
    }
}
```

In this case, `T` is a type parameter, and `any` is a built-in constraint that allows any type.

### 2. Type constraints

Type constraints are used to limit what types the type parameter `T` can represent. Go enforces type safety by ensuring that the types passed to a generic function or type comply with these constraints. A type constraint can either be a specific interface or a built-in constraint like `comparable`, `any`, or custom-defined ones.

Example using a constraint:

```go
// A custom constraint interface that requires a type to implement a method
type Stringer interface {
    String() string
}

func ToString[T Stringer](val T) string {
    return val.String()
}
```

In this example, only types that implement the `Stringer` interface can be used as `T`, ensuring type safety at compile time.

### 3. Compile-time checking

Go’s compiler checks the types at compile time. If the provided type doesn’t satisfy the constraint, the program won’t compile, ensuring that incorrect types are not passed to a function or data structure. This is crucial for maintaining Go’s philosophy of simplicity and robustness in type safety.

### 4. Underlying type consistency

Go also leverages underlying types in some constraints. For example, the `comparable` constraint ensures that the type parameter can be compared using `==` or `!=`. For this to work, the compiler ensures that any type passed to a function constrained by `comparable` supports these operations, preventing runtime errors.

### 5. Explicit and simple type inference

Go simplifies type safety by inferring types when possible. If the compiler can deduce the type parameter from the context, you don’t need to explicitly specify it, but the compiler still checks that the type is valid according to the constraints.

Example with inferred type:

```go
func Add[T int | float64](a, b T) T {
    return a + b
}

result := Add(3.0, 4.5) // Go infers T as float64
```

### Commutative diagram

$$
\begin{CD}
\text{GenericCode} @>\text{Parse}>> \text{AST} @>\text{TypeCheck}>> \text{TypedAST} \\
@V\text{Instantiate}VV @V\text{Infer}VV @VV\text{Compile}V \\
\text{ConcreteCode} @>>\text{Verify}> \text{TypeSafeCode} @>>\text{Generate}> \text{ExecutableCode}
\end{CD}
$$

This diagram shows the process of how Go handles generic code:

1. Generic code is parsed into an Abstract Syntax Tree (AST).
2. The AST undergoes type checking, which involves constraint checking and type inference.
3. The resulting TypedAST is then compiled into executable code.
4. Alternatively, generic code can be instantiated with concrete types, verified for type safety, and then generated into executable code.

### Summary

In conclusion, Go achieves type safety with generics through a combination of compile-time type checking, constraint satisfaction, and type inference.

1. **Type parameters** that allow flexibility.
2. **Type constraints** to enforce rules about what types are allowed.
3. **Compile-time type checking** to prevent invalid types from being used.
4. **Simple and explicit type inference** while maintaining safety through constraints.
