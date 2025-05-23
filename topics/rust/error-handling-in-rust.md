---
title: Error handling on Rust
description: "nrecoverable errors are those that occur when something goes fundamentally wrong, and the program cannot safely proceed. For example, if a file that is essential for the program to run is missing or corrupted, the program can panic and display an appropriate error message. Rust provides a mechanism for handling such situations through the **`panic!`** macro. When a **`panic!`** occurs, the program stops execution, unwinding the stack and providing a clear panic message..."
date: 2024-07-03
authors:
  - trankhacvy
tags:
  - error-handling
  - rust
redirect:
  - /s/Kz8eMg
---

## **Introduction**

In the world of programming, errors are inevitable. Rust, a modern systems programming language, takes a unique approach to error handling by categorizing errors into two main types: **unrecoverable** and **recoverable**. This distinction allows developers to manage errors more effectively, ensuring robust and reliable code.

### **Unrecoverable Errors: The Power of Panic!**

Unrecoverable errors are those that occur when something goes fundamentally wrong, and the program cannot safely proceed. For example, if a file that is essential for the program to run is missing or corrupted, the program can panic and display an appropriate error message. Rust provides a mechanism for handling such situations through the **`panic!`** macro. When a **`panic!`** occurs, the program stops execution, unwinding the stack and providing a clear panic message.

```rust
fn main() {
    let divisor = 0;

    if divisor == 0 {
        panic!("Division by zero error occurred!");
    }

    let result = 10 / divisor;
    println!("Result: {}", result);
}
```

While panicking is not a solution for every error, it's a powerful tool for signaling critical issues and preventing the program from continuing in an undefined state.

### **Recoverable Errors: Embracing `Option` and `Result`**

In contrast to unrecoverable errors, recoverable errors are situations where the program can gracefully handle the issue and proceed with execution. Rust provides two main types to address these errors: **`Option`** and **`Result`**.

### Working with **`Option`**

**`Option`** is used when a computation might return a value or nothing. It prevents the need for null or undefined values, enhancing the safety of the code.

```rust
fn find_element(arr: &[i32], target: i32) -> Option<usize> {
    for (i, &elem) in arr.iter().enumerate() {
        if elem == target {
            return Some(i);
        }
    }
    None
}

fn main() {
    let arr = [1, 2, 3, 4, 5];
    let target = 3;

    match find_element(&arr, target) {
        Some(index) => println!("Element found at index: {}", index),
        None => println!("Element not found"),
    }
}
```

### Working with **`Result`**

**`Result`** is similar to **`Option`** but includes an **`Err`** variant to hold information about the error that occurred. This makes it suitable for functions that may return an error.

```rust
use std::fs::File;

fn open_file(file_path: &str) -> Result<File, std::io::Error> {
    File::open(file_path)
}

fn main() {
    let file_path = "example.txt";
    match open_file(&file_path) {
        Ok(file) => {
            // File opened successfully, continue with further operations
            println!("File opened successfully!");
            // ...
        }
        Err(error) => {
            // Error occurred while opening the file, handle it appropriately
            println!("Error opening file: {}", error);
            // ...
        }
    }
}

```

### **`unwrap` and `expect`: Proceed with Caution**

The **`unwrap`** and **`expect`** methods are convenient but should be used judiciously. They extract the value from **`Option`** or **`Result`** and panic if the value is **`None`** or **`Err`**. While they can simplify code, excessive use may lead to unexpected panics.

```rust
use std::fs::File;

fn open_file(file_path: &str) -> Result<File, std::io::Error> {
    File::open(file_path)
}

fn main() {
    let file_path = "example.txt";
    let file = open_file(&file_path).unwrap();

    println!("File opened successfully!");
}
```

### **Early-Return Error Handling with `?`**

The **`?`** operator provides a concise way to propagate errors early in a function. It can be used with functions that return **`Result`** or **`Option`**, automatically unwrapping the value or returning early on an error.

```rust
use std::fs::File;
use std::io::{self, Read};

// A function that reads a file and returns the content as a String
fn read_file_content(file_path: &str) -> Result<String, io::Error> {
    // Attempt to open the file
    let mut file = File::open(file_path)?;

    // Read the content of the file into a String
    let mut content = String::new();

    // Use the ? operator to handle the Result returned by read_to_string
    // If an error occurs, it is returned immediately.
    file.read_to_string(&mut content)?;

    // Return the content
    Ok(content)
}

fn main() {
    // Specify the file path
    let file_path = "example.txt";

    // Attempt to read the file and handle the result
    match read_file_content(file_path) {
        Ok(content) => {
            println!("File content:\n{}", content);
        }
        Err(error) => {
            eprintln!("Error reading the file: {}", error);
            // Handle the error as needed
        }
    }
}
```

### **Handling Multiple Errors: Creating Custom Errors**

Up until now, our focus has been on handling a single error. However, what if your function has the potential to return multiple errors, and you want the caller to precisely identify and handle each error scenario? In such cases, Rust allows you to implement your own custom error types.

```rust
#[derive(Debug)]
enum MyError {
    Io(std::io::Error),
    Parse(std::num::ParseIntError),
}

fn read_and_parse(path: &str) -> Result<i32, MyError> {
    let file_content = std::fs::read_to_string(path);

    match file_content {
        Ok(file_content) => match file_content.trim().parse::<i32>() {
            Ok(num) => Ok(num),
            Err(err) => Err(MyError::Parse(err)),
        },
        Err(err) => Err(MyError::Io(err)),
    }
}

fn main() {
    let file_path = "example.txt";

    match read_and_parse(file_path) {
        Ok(parsed_value) => {
            println!("File content parsed successfully: {}", parsed_value);
        }
        Err(my_error) => {
            eprintln!("Error: {:?}", my_error);

            // You can also perform specific error handling based on the error variant
            match my_error {
                MyError::Io(io_error) => {
                    eprintln!("IO Error Details: {}", io_error);
                    // Additional IO error handling logic can be added here
                }
                MyError::Parse(parse_error) => {
                    eprintln!("Parse Error Details: {}", parse_error);
                    // Additional parse error handling logic can be added here
                }
            }
        }
    }
}
```

Notice that we can't use **?** on **std::fs::read_to_string(path)** because if an error occurs, **?** will attempt to convert the errors (std::io::Error or std::num::ParseIntError) to our custom error, MyError. However, it doesn't know how to perform this conversion. To address this, we have to implement the `From` trait on our custom error.

```rust
impl From<std::io::Error> for MyError {
    fn from(err: std::io::Error) -> MyError {
        MyError::Io(err)
    }
}

impl From<std::num::ParseIntError> for MyError {
    fn from(err: std::num::ParseIntError) -> MyError {
        MyError::Parse(err)
    }
}

// We can finally rewrite read_and_parse
fn read_and_parse(path: &str) -> Result<i32, MyError> {
    let file_content = std::fs::read_to_string(path)?;
    let num = file_content.trim().parse::<i32>()?;
    Ok(num)
}
```

## **Making Your Error Composable**

While our custom error solution is functional, seasoned developers often recommend implementing the **`std::error::Error`** trait for custom errors. By embracing this practice, our error becomes easily composable with other parts of the program, offering users the ability to obtain a string representation of an error. This is achieved by ensuring implementations for both **`fmt::Debug`** and **`fmt::Display`** are provided.

```rust
#[derive(Debug)]
enum MyError {
    Io(std::io::Error),
    Parse(std::num::ParseIntError),
}

impl std::error::Error for MyError {
    fn source(&self) -> Option<&(dyn std::error::Error + 'static)> {
        match self {
            MyError::Io(err) => Some(err),
            MyError::Parse(err) => Some(err),
        }
    }
}

impl std::fmt::Display for MyError {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        match self {
            MyError::Io(err) => write!(f, "IO error: {}", err),
            MyError::Parse(err) => write!(f, "Parse error: {}", err),
        }
    }
}
```

## References:

- https://doc.rust-lang.org/book/ch09-00-error-handling.html
- https://blog.burntsushi.net/rust-error-handling/
