---
title: A quick intro to WebAssembly
description: Discover how WebAssembly, a fast, portable binary format designed for running C, C++, and Rust on the web, outperforms JavaScript by enabling near-native execution speeds in browsers and servers.
date: 2020-06-15
tags:
  - wasm
redirect:
  - /s/NJ05cg
---

If you haven’t heard of WebAssembly yet, then you will soon. It’s one of the industry’s best-kept secrets, but it’s everywhere. It’s supported by all the major browsers, and it’s coming to the server-side, too. It’s fast. It’s being used for gaming. It’s an open standard from the World Wide Web Consortium (W3C), the main international standards organization for the web.

## Format definition

WebAssembly (abbreviated Wasm) is a **binary instruction format** for a stack-based virtual machine. Wasm is designed as a portable target for compilation of high-level languages like C/C++/Rust, enabling deployment on the web for client and server applications.

## Why WebAssembly?

### Recall of assembly

In the old days, when you had to work on a computer to do something like for example, add two numbers and print the result, you had to write instructions in the binary language. These instructions were specific to an architecture of a processor like the 8086 microprocessor or x86 processor. These binary instructions are collectively called the machine code. However, writing machine code with bare hands was a tedious and error-prone task. Also, reading a machine code was at times impossible.

Hence, the text-based Assembly language was created. This **Assembly language was human-readable and one could easily program or read the Assembly language**. To convert the Assembly code into machine code, a compiler AKA assembler is used (along with the linker). **Assembly language is the lowest form of abstraction over machine code since it directly compiles to the machine code of the given processor architecture.**

Other compiled languages like C or C++ also compile to machine code, however, these languages are processor agnostic. This means the compiler used by these languages does the actual job of compilation to machine code.

However, these languages don’t always guarantee the performance similar to the Assembly language because as the program grows larger and many program files are involved, the compiler has to make predictions on how to best compile the program.

Hence, the machine code generated from these languages may not be very optimized and may run slower. This also means, no language like C or C++ gets close to generating a very optimized machine code like the Assembly language can do.

### What WebAssembly actually is

The term **WebAssembly (AKA Wasm)** is inspired by the Assembly language since it is the lowest form of text-based human-readable language which generates very optimized and blazing fast programs in machine code.

What WebAssembly is trying to achieve is **to create a language that can run as fast as possible, closer to Assembly speeds but on the Web. Even though WebAssembly is a language in itself, its main intention is to create a toolchain for other programming languages like C, C++, Rust, etc. to compile directly to WebAssembly**. This way, web programmers can write programs in the language of their choice and run inside a browser. But as we know, only JavaScript language can be understood by the web browsers and JavaScript is not so popular when it comes to speed, then how WebAssembly is going to run inside a browser and speed things up?

### What about Javascript?

JavaScript is an **interpreted language**. This means we do not have to compile the JavaScript source code before sending it to the browser. An interpreter can take the raw JavaScript code and run it for you.

JavaScript is also a **dynamically typed language**, unlike C and C++. This means variables declared using var can store any type of data type like int, string, boolean and also complex data types like object and array. **The lack of type system is what makes JavaScript slow to run**. A statically typed language can produce a much efficient machine code because of the information it has about the data like its type and size.

**So whenever you think, a statically typed language like C or C++ is making your life a living hell for no reason, think about the performance.**

### Historical reason of poor performance in JavaScript

You might ask, why JavaScript was designed this way if it is so poor when it comes to speed? For that, we need to understand its history.

In the initial days of Web, web browsers were used to display static pages. Normally these pages were non-interactive. **To add some interaction**, a new language was introduced in the Netscape browser back in 1995 by Brendan Eich. This new language was **JavaScript (previously called the LiveScript) and it took 10 days for him to design it.**

Knowing that Java was a rich, complex, compiled language aimed at professional programmers, Netscape and others also wanted a lightweight interpreted language to complement Java. This language would need to appeal to nonprofessional programmers much like Microsoft's Visual Basic and interpretable for easy embedding in webpages

> If I had done classes in JavaScript back in May 1995, I would have been told that it was too much like Java or that JavaScript was competing with Java … I was under marketing orders to make it look like Java but not make it too big for its britches … [it] needed to be a silly little brother language.

**Nothing good can come out of 10 days but for 10 days worth of effort, JavaScript was a marvel**. Other languages and plugins like ActionScript, Silverlight, and Flash came along but **JavaScript won the battle.**

JavaScript was not designed by considering the performance in mind. It had to just work inside a browser and provide API to work with DOM. But since many browsers tried to adopt it in their own way, it had to be standardized.

**Ecma International is the standards organization that standardizes JavaScript and the Technical Committee 39 (TC39) manages this standard**. This standard is known as EcmaScript and the EcmaScript phrase is also used interchangeably with JavaScript since JavaScript trademark is owned by Oracle Corporation.

### How does Javascript work?

**EcmaScript specification tells how JavaScript should be implemented by the browser so that a JavaScript program runs exactly the same in all the browsers, but it does not tell how JavaScript should run inside these browsers. It is up to the browser vendor to decide.**

Every browser provides a JavaScript engine that runs the JavaScript code. The Netscape browser used the SpiderMonkey JavaScript engine. This engine was a rudimentary interpreter with no optimizations. Running the JavaScript code with this engine was slow but it worked.

As you can see from the diagram above, the job of the first JavaScript engine was to take the JavaScript source code and compile it to the binary instructions (machine code) that a CPU can understand.

A rudimentary JavaScript engine contains a baseline compiler whose job is to compile JavaScript source code into an intermediate representation (IR) which is also called the bytecode and feeds this bytecode to the interpreter. The interpreter takes this bytecode and converts to the machine code which is eventually run on the machine’s hardware (CPU).

This is *just like how Java works but the bytecode generation is done by the programmer and bytecode is shared universally rather than the source code*.

A baseline compiler’s job is to compile code as fast as possible and generate less-optimized bytecode (or machine code in other cases). **Since the interpreter has an unoptimized bytecode to work with, the application speed will be slow, however, the application bootstrap time will be very less.**

> _SpiderMoney JavaScript has evolved into a piece of complex machinery to produce highly optimized machine code and currently used in the Firefox browser. You can follow this documentation for the source code._

When it comes to a **highly dynamic and interactive web application,** the user experience is very poor with this model of JavaScript execution. This problem was faced by **Google’s Chrome browser while displaying Google Maps on the web**. To increase the JavaScript performance on the web, they had to come up with a better approach. Google Chrome from the early days uses the **V8 JavaScript engine.** In the beginning, to improve the JavaScript performance, they added two pieces in their JavaScript engine pipeline as shown below.

In the 2010 version of the V8 JavaScript engine, there were two main pieces of machinery that did the heavy lifting for the engine. The full-codegen was the **baseline compiler** whose job was to **spit out unoptimized machine code as fast as possible for faster application bootstrap.** As the application was running, the **crankshaft compiler** would **kick in and optimize the source code and replace the parts of the machine code generated by the baseline compiler**. This optimization would result in better application performance as better and better machine code is generated. *However, this process comes with the cost of large CPU overhead and memory consumption. Hence V8 has to come up with another model.*

The above version of the JavaScript engine does not contain an interpreter. **This is a JIT (Just-In-Time) compilation model** as code is compiled to the machine level on the fly and later optimized, also to the machine code.

## How JavaScript is optimized?

There are various criteria for optimizing JavaScript code. Before JavaScript code is passed to the interpreter or baseline compiler, it has to first get parsed into an Abstract Syntax Tree (AST) which is a tree-like structure of the code.

_When we run a JavaScript application, we do not need all the code at the application startup time_. For example, if we have a function that is called on the user action, like a button click, that code can be parsed later.

Identifying things that need to be parsed immediately and generating machine code is the best strategy for faster application bootstrap. Sometimes, JavaScript code contains unnecessary complex logic that can be simplified. For example, a `for` to increment an integer can be inlined using `+` operations n number of times. This process is called Loop unrolling. Similar optimizations can be made using function inlining.

**The lack of type system in JavaScript is what makes JavaScript engine produce less optimized machine code.** Hence, based on already defined values, a JavaScript engine can guess the data types of the variables and generate better machine code.

Meanwhile, what JavaScript engine can also do is **gather profiling data of the code execution and look for the code that runs slower.** This code is called **the “Hot” code** perhaps because it burns the CPU. This code can be further optimized and replaced with an optimized machine code. Considering these things in mind and other problems caused by full-codegen and crankshaft, the V8 team created a new version of the V8 engine from the ground up. This new version of the JavaScript engine was released in 2017.

As you can see from the above figure, the V8 team introduced a new interpreter pipeline Ignition whose job was to generate the bytecode from the JavaScript source code using a baseline compiler and later interpret that bytecode using an interpreter.

The **TurboFan optimization compiler can optimize this bytecode in the background**(in separate threads) as the application is running and generate a very optimized machine code that will be replaced eventually. Turbofan receives the profiling data from the Ignition interpreter and looks for the code that is Hot. **It can make the guesses on how to optimize the code better (by guessing the data types) and optimize or de-optimize the code**.

## The invention of asm.js

So far we have understood that a lot of throughs, efforts and money have been put into developing JavaScript engines to cope up with complex JavaScript applications and somehow, make it faster.

When everybody was working hard to develop faster JavaScript engines, a team at Mozilla went off the books. Back in 2013, they created a subset of JavaScripti which has the feature of statically typed language and manual memory management. They called it the asm.js.

```javascript
function add(a, b) {
  return a + b;
}
```

The add function takes two values and returns the concatenated value (sum). When we want to generate a highly optimized machine code, we need the data type of the variable arguments a and b. However, we don’t have that in JavaScript.

Even if had to make guess, we can’t be sure. *Because a and b can be integers or strings or a mix of both. But let’s say, we were expecting only 32-bit integers, how possibly we can inform this to a JavaScript engine?*

This is where asm.js specifications come into the picture

```javascript
function add(a, b) {
  a = a | 0;
  b = b | 0;
  return (a + b) | 0;
}
```

In the modified code above, we are overriding `a` and `b` with the value of `a` and `b` value respectively but with a binary or condition. What this would do is to convert the values of `a and b int 32-bit integers`.

The asm.js specification specifies *only 3 types* that you can use in your JavaScript code, `the 32-bit integer`, and `the 32-bit` & `64-bit floating-point numbers`. This makes your code easy to compile with high precision.

However, how this code is compiled and converted to machine code depends on the JavaScript engine behind the scenes. The first support of asm.js came in the SpiderMonkey engine of the Firefox browser.

If our JavaScript code contains `"use asm";` annotation and the JavaScript code has been written according to asm.js specifications, SpiderMonkey could efficiently convert the JavaScript code into optimized machine code.

After the successful proof-of-concept demonstration by the Mozilla team, other browser vendors like Chrome and Edge rolled out support for the asm.js specifications. Applications written in asm.js were relatively faster than their counterparts written in normal JavaScript.

Apart from a virtual type system, asm.js specification tells us to write our JavaScript code inside a function called as a module. We need to **instantiate this module by providing an ArrayBuffer which acts like a heap memory.** **By abstracting the memory of our module from the memory of the main JavaScript thread**, we don’t have the necessary overhead of dynamic memory management and garbage collection provided by the JavaScript engines. Let’s write a sample asm.js module by hand.

But first, let's understand the asm.js module structure

```javascript
function MyAsmModule(stdlib, foreign, heap) {
  "use asm";

  // module body...
  return {
    export1: f1,
    export2: f2,
    // ...
  };
}
```

From the example above, `MyAsmModule` function is the `asm.js` module that we will *instantiate later*. Let’s understand the arguments to this function and return value.

- The `stdlib` argument is an object that contains standard JavaScript libraries accepted in asm.js specifications (listed here).
- The `foreign` object contains references to the external JavaScript functions that our module depends on, also called the foreign function interface (FFI).
- The `heap` argument is the raw ArrayBuffer which will be used as a heap for memory storage optionally required by the module.

In the end, our asm.js module has to export some functions which will be consumed by a JavaScript program. Let’s use the add function as one of the exports of our asm.js module and instantiate with a *1kb heap memory.*

```javascript
function Calc(stdlib, foreign, heap) {
  "use asm";
  function add(a, b) {
    a = a | 0;
    b = b | 0;
    return (a + b) | 0;
  }
  return {
    add: add,
  };
}

var stdlib = null;
var foreign = null;
var heap = new ArrayBuffer(1000); // 1kb

// create module instance
var calc = Calc(stdlib.foreign, heap);

// call `add` function
var result = calc.add(1, 2);
console.log(result);
```

In the above example, we are telling the JavaScript engine that *we want to run this JavaScript code as asm.js module with the help of* `"use asm";` annotation. We have also provided data types of the function parameters and return value. This works just fine, as you can see the result in the console.

However, even though you can write asm.js modules by hand, *it is not feasible for large scale projects*. But, *there are some toolchains available to compile programs* written in a statically typed language to asm.js. For example, the add function can be compiled from this C code.

```javascript
int add( int a, int b ) {
 return a + b;
}
```

## How asm.js code runs faster

If a **browser’s JavaScript engine** is capable of understanding asm.js code, then it will **treat asm.js JavaScript differently** than other normal JavaScript code.

The first thing it will do is **compile JavaScript code to machine code with high precision since the** `asm.js` code contains type information beforehand. The machine code generated from the asm.js code is close to the Assembly machine code.

Also, it will **keep heap of the asm.js module different from the main JavaScript thread since it does not need garbage collection and tracking**. Since an `asm.js` module manages its memory manually, the overall performance of the code will be better than code that needs dynamic memory allocations and management. Even after with such convincing reasons, \*`asm.js` specifications were never standardized` and it needed a fresher perspective. This is **where WebAssembly comes in and solves the problems of asm.js.**

_The asm.js specifications are not standardized and it is obsoleted by WebAssembly._

### The inception of WebAssembly

`asm.js` was a successful experiment *but writing optimized JavaScript code by hand was tough and error-prone*. There are *no standard build-toolchains to convert your JavaScript code into* `asm`.js, because it’s not an easy road either.

On the other hand, `asm.js` code *adds extra complexity in the application* and may at times, *the optimized JavaScript code size is larger than the unoptimized one*, making it harder to transfer over the network.

Considering these things in mind, `asm.js` needed an overhaul. This optimized code that a JavaScript engine can run should be as light as possible. Also, *it needed to be standardized* so that all the browsers can support it. To address these issues, `the Minimal Viable Product (MVP) development of WebAssembly started as a collaborative effort between Mozilla, Google, and other teams around 2015.`

In this effort, the first blueprint of WebAssembly was conceptualized. **WebAssembly is a binary format of instructions just like a machine code but for a stack machine.**

**What is a stack machine?**

A `stack machine`, unlike a `register machine`, works with a `stack`. A stack is a data structure to store some data in linear order. You can push a value on the stack and it will go on the top of the previous value in the stack. However, you can not pull a value from anywhere. You can only pop or pull the value that is on the top of the stack.
