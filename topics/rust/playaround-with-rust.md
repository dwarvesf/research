---
title: Playaround with Rust
description: "Learn how Mozilla uses Rust to build safer, parallel browsers by leveraging Rust's ownership, immutability, lifetime tracking, and expression-based design for error-free, efficient code."
date: 2019-08-30
tags:
  - rust
redirect:
  - /s/wgXv8Q
---

Mozilla intends to use Rust as a platform for prototyping experimental browser architectures.

Specifically, the hope is to develop a browser that is more amenable to safe and parallel than the existing ones, while also being less prone to common C++ coding errors.

## What makes Rust special

### Ownership

- Each value in Rust has a variable that's called its **owner,** there can only be one owner at a time
- When the owner goes out of scope, the value will be dropped
- Variable scope is a range within a program for which an item is valid

Let’s take this example:

```javascript
let x = String::from("hello");

let y = x;
```

It creates variable `x` in the stack, len 5, cap 5, ptr to heap contain content. When assigning `y = x`, Rust disable the `x in the stack(no longer usable), and create new y` have ptr to ptr of `x`

Let's take another example

```javascript
let x = 5;

let y = x;
```

`x` still usable after assign. The reason for that is an integer in Rust is saved in stack -> implemented Copy trait. The price of a copy in the stack does not as expensive as the other heap types(String).

Therefore, Rust let users do this by implement `Copy` trait for some types that save in stack(integer type, boolean type, floating-point type, character type, tuple that only contain above types). Other types that allocating memory in the heap when implementing Drop trait. That mean variables of that type will drop if out of scope. And if a user tries to implement Copy trait for this will raise compile-time error.

### Immutable

Variables in Rust immutable by default, can not change throughout its lifetime. Thus, it resolves the problem of safety in Rust. If things are immutable by default, Rust compiler can easily pick up any side-affect, mutability during compile-time and guarantee application correctness.

## Variable declaration

### Go

```javascript
var x int // x = 0 -- a.k.a zero value
```

### Rust

```javascript
let x: i64 // x is un-addresable value, cannot be use util set x = somevalue
```

## Expression-base language

Rust is *primarily* an expression language. This means that most forms of value-producing or effect-causing evaluation are directed by the uniform syntax category of *expressions*. Each kind of expression can typically *nest* within each other kind of expression, and rules for evaluation of expressions involve specifying both the value produced by the expression and the order in which its sub-expressions are themselves evaluated.

In contrast, statements in Rust serve *mostly* to contain and explicitly sequence expression evaluation.

Rust allow user do something like

```javascript
let y = if x == 5 {
    10 // y = 10
 } else {
    15 // y =15
}
```

## Lifetime

Because of the borrowing. The way Rust compiler check if you are trying to use a variable that borrowed by the other. Rust will compile this

```javascript
fn main() {
    let x;
    {
        let y = 5;
        x= &y
    }
    println!("{}",x)
}
```

into this

```javascript
fn main() {
   'a: {
        let x;
        'b: {
            let y = 5;// y have an amount of 'b lifetime(let say: 10 energy)
            x= &y// so y will be no longer valid when it out of energy
        }// when y go here, it runs out of energy <=> energy = 0
// therefore, Rust compiler can know that, oh, y is no longer exist
// and then x trying to borrow it
// x is now borrowing from the deallocated memory
    println!("{}",x)
   }
}
```

Hence, we can say, no matter what we do with **borrowing**, Rust must know the lifetime of parameter, it we don't provide it, Rust stopping what you do by the error: *missing lifetime specifier*.\*\*

_E.g:_ When you are trying to put the function parameter by borrow some variable, or trying to borrow the function parameter inside function, Rust need to know the lifetime of it, otherwise, Rust compiler will stopping by the error

```javascript
fn largest(x: &i64,y: &i64) -> &i64 {
    if x > y {
        x
    } else {
        y
    }
}

fn main() {
        let x;
        {
            let y = 5;
            x = &y;
            println!("{}", largest(&x, &y))
        }
}
```

![](assets/playaround-with-rust_8b2e8ecd35a0b2b6be39e220dcb4c333_md5.webp)

In order to correct the function, we just put the lifetime in parameter like:

```javascript
fn largest(x: &i64, y: &i64) -> &i64 {
   if x > y {
       x
   } else {
       y
   }
}
```
