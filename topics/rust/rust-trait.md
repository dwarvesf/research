---
title: Rust trait
description: "Rust's **trait** system is a powerful feature that enables developers to define shared behavior across different types. Traits play a crucial role in achieving code reusability, abstraction, and flexibility..."
date: 2024-07-03
authors:
  - trankhacvy
tags:
  - rust
  - trait
redirect:
  - /s/1n0_bg
---

Rust's **trait** system is a powerful feature that enables developers to define shared behavior across different types. Traits play a crucial role in achieving code reusability, abstraction, and flexibility.

## Understanding traits

In Rust, a trait is a collection of methods that can be implemented by types to define shared behavior. Think of traits as a way to express what abilities a type should have, without dictating its internal structure. This promotes a high degree of abstraction and allows for code that is more generic and adaptable.
Traits are similar to a feature often called `interfaces` in other languages, although with some differences.

```rust
trait Shape {
    fn area(&self) -> f64;
}
```

In the example above, we define a trait named `Shape` with a single method, `area`. This trait can then be implemented by various types to provide their own implementation of the `area` method.

## Implementing traits

To use a trait, a type must implement it by providing its own implementation for each of the trait's methods. This is achieved through the `impl` keyword.

```rust
struct Circle {
    radius: f64,
}

impl Shape for Circle {
    fn area(&self) -> f64 {
        std::f64::consts::PI * self.radius * self.radius
    }
}

```

Now, instances of `Circle` can leverage the functionality provided by the `Shape` trait.

## Default implementation

Rust allows you to provide default implementations for trait methods. This means that implementing types can choose to override the default behavior if needed. Let's enhance our `Shape` trait with a default method for `perimeter`:

```rust
trait Shape {
    fn area(&self) -> f64;

    fn perimeter(&self) -> f64 {
        0.0 // Default implementation for perimeter
    }
}

struct Circle {
    radius: f64,
}

impl Shape for Circle {
    fn area(&self) -> f64 {
        std::f64::consts::PI * self.radius * self.radius
    }
}

```

Now, any type implementing `Shape` will automatically have a default `perimeter` method, but it can choose to provide its own implementation.

## Trait as parameters

Traits can be used as parameters to functions, enabling polymorphism and enhancing the flexibility of your code. Consider a function that calculates and prints the area of any type implementing the `Shape` trait:

```rust
fn print_area(shape: impl Shape) {
    println!("Area: {}", shape.area());
}

fn main() {
    let circle = Circle { radius: 3.0 };
    print_area(circle);
}
```

Here, the `print_area` function takes any type that implements the `Shape` trait as a parameter. This allows us to use the function with various shapes without modifying its code.

## Trait bound

To make functions even more flexible, you can use trait bounds to specify that a generic type must implement a certain trait. For instance:

```rust
fn print_area<T: Shape>(shape: T) {
    println!("Area: {}", shape.area());
}

fn main() {
    let circle = Circle { radius: 3.0 };
    print_area(circle);
}
```

Now, the `print_area` function can accept any type `T` as long as it implements the `Shape` trait.

## Conclusion

Traits in Rust provide a powerful mechanism for defining shared behavior, promoting code reuse and adding polymorphism in our code. By understanding how to implement traits, provide default behavior, use traits as parameters, and apply trait bounds, you can leverage this feature to write more modular and adaptable Rust code.
