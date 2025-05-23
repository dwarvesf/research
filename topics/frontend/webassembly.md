---
title: Webassembly
description: WebAssembly (abbreviated *Wasm*) was launched in 2017 as a low-level assembly-like language with a compact binary format, so it’s fast to load, execute, and run with near-native performance.
date: 2023-01-05
authors:
  - tienan92it
github_id: tienan92it
tags:
  - performance
  - frontend
  - sandbox
  - webassembly
redirect:
  - /s/ko7y8w
---

### What

WebAssembly (abbreviated *Wasm*) was launched in 2017 as a low-level assembly-like language with a compact binary format, so it’s fast to load, execute, and run with near-native performance. It is designed as a portable target for the compilation of high-level languages like C/C++/Rust, enabling deployment on the web for client and server applications. That means you do not write WebAssembly, you compile other high-level languages to it.

![](assets/webassembly_wasm-architecture.webp)

### How

With JavaScript, the code is included in the website and is interpreted as it runs because JavaScript variables are dynamic. The only way to know what the types are for sure is to monitor the code as it executes, which is what the JavaScript engine does. Once the engine is satisfied that it knows the variable’s types, it can convert that section of code into machine code.

![](assets/webassembly_wasm-js-how-it-work.webp)

WebAssembly isn’t interpreted but, rather, is compiled into the WebAssembly binary format by a developer ahead of time. Because the variable types are all known ahead of time, when the browser loads the WebAssembly file, the JavaScript engine doesn’t need to monitor the code. It can simply compile the code’s binary format into machine code.

![](assets/webassembly_wasm-how-it-works.webp)

### High-level goals

- Be fast, efficient, and portable -- WebAssembly code can run at near-native speed regardless of platform.
- Be readable and easily debuggable -- although WebAssembly is a low-level assembler-like language, it has a human-readable text format. This makes it possible to write, read and debug code yourself.
- Be secure -- Actually, WebAssembly is specified to be run during a safe and sandboxed execution environment. Like other web code, it'll enforce the browser's same-origin and permissions policies.
- Don’t break the web -- WebAssembly is designed so that it plays nicely with other web technologies and maintains backwards compatibility.

### Use cases

- Image / video editing.
- Peer-to-peer applications (games, collaborative editing, decentralized and centralized).
- Music applications (streaming, caching).
- Live video augmentation.
- VR and augmented reality (very low latency).
- Scientific visualization and simulation.
- Developer tooling (editors, compilers, debuggers, …).
- Fat client for enterprise applications (e.g. databases).

### Reference

https://developer.mozilla.org/en-US/docs/WebAssembly https://webassembly.org/ https://livebook.manning.com/book/webassembly-in-action/chapter-1/ https://www.xenonstack.com/insights/a-beginners-guide-to-webassembly
