---
title: Error handling patterns
description: Quick note on error handling patterns in programming languages
date: 2024-10-14
authors:
  - tieubao
tags:
  - error
  - golang
redirect:
  - /s/jYkBBA
---

Error handling is one of the most critical aspects of software development, as it ensures that applications behave correctly even in the presence of unexpected inputs or conditions. Over the years, many error-handling patterns have evolved in different programming languages.

### 1. Return codes/status codes

This is one of the most basic forms of error handling and is common in older, low-level programming languages such as C. A function returns a value that indicates whether it succeeded or failed. For example, it might return `0` for success or `-1`for failure. The caller is responsible for checking the return value and handling any errors.

Always check the return values when using this pattern. Missing a check can easily lead to silent bugs that are hard to trace.

**Example**:

```c
int divide(int a, int b, int *result) {
    if (b == 0) {
        return -1;  // error: division by zero
    }
    *result = a / b;
    return 0;  // success
}

int main() {
    int result;
    if (divide(10, 0, &result) != 0) {
        printf("Error: Division by zero!\n");
    }
}
```

**Pros**:

- Simple and efficient.
- Minimal overhead, making it suitable for systems with limited resources.

**Cons**:

- Error checking can be easily forgotten, leading to silent failures.
- Leads to code that's cluttered with return value checks.

### 2. Exceptions (Try-Catch)

Exceptions are a more modern and structured way of handling errors, used in languages like Python, Java, and C#. When an error occurs, the program "throws" an exception, which can be caught and handled using a `try-catch` block. This separates normal flow from error-handling logic.

Don't overuse exceptions for flow control, and **never swallow** exceptions without logging or handling them properly. Always catch specific exceptions rather than using generic ones like `Exception` in Python or `Throwable` in Java.

**Example**:

```python
try:
    result = 10 / 0
except ZeroDivisionError as e:
    print(f"Error occurred: {e}")
```

**Pros**:

- Clean separation between normal logic and error-handling logic.
- Handles deep errors without cluttering every function with return value checks.
- Allows for handling different types of exceptions.

**Cons**:

- Can add runtime overhead.
- Misuse can lead to code that’s hard to debug, especially if exceptions are caught but not properly handled.

### 3. Error objects or results

This pattern forces the function to return an object that explicitly represents either a successful result or an error. It is commonly used in functional programming languages like Rust, Haskell, and also in Swift. In Rust, for example, the `Result` type can be `Ok` for success or `Err` for failure.

Embrace this pattern when available. It forces you to **deal with both success and error cases**explicitly, reducing the likelihood of missed error handling.

**Example** (Rust):

```rust
fn divide(a: i32, b: i32) -> Result<i32, String> {
    if b == 0 {
        return Err("Division by zero".to_string());
    }
    Ok(a / b)
}

fn main() {
    match divide(10, 0) {
        Ok(result) => println!("Result: {}", result),
        Err(e) => println!("Error: {}", e),
    }
}
```

**Pros**:

- Forces explicit error handling, making it harder to ignore errors.
- More functional and compositional, especially useful for chaining operations.

**Cons**:

- Can be verbose, especially if multiple layers of functions need to return and propagate `Result` types.

### 4. Assertions

Assertions are a debugging tool that checks if certain conditions hold true. If the assertion fails, the program crashes, usually with a helpful error message. This pattern is mainly used for development and debugging, not for production error handling.

**Don’t use assertions for regular error handling**. They are meant for development and debugging purposes, not for catching user-facing errors in production.

**Example** (Python):

```python
def divide(a, b):
    assert b != 0, "Division by zero!"
    return a / b

divide(10, 0)  # This will raise an AssertionError
```

**Pros**:

- Simple and effective for catching bugs during development.
- Forces assumptions to be explicitly stated in the code.

**Cons**:

- Typically disabled in production, so they don’t handle errors in live environments.
- Not suitable for recoverable errors.

### 5. Callbacks (Error-First)

In environments that deal with asynchronous operations, like Node.js, error-first callbacks are a common pattern. The first parameter of the callback is an error (if any), and the second is the result.

When using callbacks, **always check the error argument** first. Don’t forget to handle errors properly in every callback.

**Example** (JavaScript):

```javascript
function divide(a, b, callback) {
  if (b === 0) {
    return callback(new Error("Division by zero"), null);
  }
  callback(null, a / b);
}

divide(10, 0, (err, result) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log(result);
  }
});
```

**Pros**:

- Works well for asynchronous operations.
- Error handling is explicit.

**Cons**:

- Can lead to "callback hell" when multiple asynchronous operations are nested.

### 6. Promise-based error handling

Promises are an evolution of callbacks, mainly used in asynchronous programming (e.g., JavaScript). They allow for cleaner handling of asynchronous operations, using `.then()` for success and `.catch()` for errors.

Use Promises to make your asynchronous code more readable. Pay attention to the **promise chain**, and always handle `.catch()` for potential errors.

**Example** (JavaScript):

```javascript
function divide(a, b) {
  return new Promise((resolve, reject) => {
    if (b === 0) reject(new Error("Division by zero"));
    else resolve(a / b);
  });
}

divide(10, 0)
  .then((result) => console.log(result))
  .catch((error) => console.error(error.message));
```

**Pros**:

- Cleaner and more readable than callbacks, especially when using `async/await`.
- Easier to handle chained asynchronous operations.

**Cons**:

- Errors in promise chains can be tricky to debug if `.catch()` blocks are misused or omitted.

### 7. Pattern matching

Pattern matching is used in functional languages like Haskell, Rust, and Scala to handle different outcomes of a computation. This allows developers to decompose data structures and handle each case explicitly.

Pattern matching is powerful, but be sure to **handle all possible cases**. If you miss one, your program might crash or behave unexpectedly.

**Example** (Rust):

```rust
fn divide(a: i32, b: i32) -> Result<i32, String> {
    if b == 0 {
        Err("Division by zero".to_string())
    } else {
        Ok(a / b)
    }
}

fn main() {
    match divide(10, 0) {
        Ok(result) => println!("Result: {}", result),
        Err(e) => println!("Error: {}", e),
    }
}
```

**Pros**:

- Forces exhaustive handling of different error cases.
- Provides a clear and readable syntax for handling both success and error cases.

**Cons**:

- Can be overcomplicated for simple error handling needs.

### 8. Panic (Crash)

Some languages like Rust and Go use panics for non-recoverable errors. A panic results in the program crashing. In Rust, panics can be caught, but in general, this pattern is reserved for situations where the program can't reasonably continue.

**Use panics sparingly**. They should only be used for truly exceptional, unrecoverable errors, not for ordinary cases like bad user input.

**Example** (Go):

```go
package main

import "fmt"

func divide(a, b int) int {
    if b == 0 {
        panic("Division by zero!")
    }
    return a / b
}

func main() {
    fmt.Println(divide(10, 0))
}
```

**Pros**:

- Useful for catching serious, non-recoverable errors.
- Forces developers to think about critical error scenarios.

**Cons**:

- Crashes the program, which may not be desirable in production.
- Can be overused in scenarios where graceful error handling is possible.
