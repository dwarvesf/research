---
title: Zaplib post-mortem
description: "Zaplib is a frontend framework that helps to port your JS/TS app to Rust/Wasm. This idea was found after the founder's painful work at https://webviz.io when he had to use a bundle of manual memory management techniques such as ArrayBuffers, WebWorkers for performance optimization. Back up with the assumption that an intricate web app like Figma also uses Wasm, they thought there would be a lot of companies experiencing a similar performance issue with their applications and those companies would be keen on using their new tool to 10x speed up the apps."
date: 2022-05-01
authors:
  - zlatanpham
github_id: zlatanpham
tags:
  - performance
  - frontend
  - rust
  - wasm
redirect:
  - /s/AOTieA
---

[Zaplib](https://zaplib.com/) is a frontend framework that helps to port your JS/TS app to Rust/Wasm. This idea was found after the founder's painful work at https://webviz.io when he had to use a bundle of manual memory management techniques such as ArrayBuffers, WebWorkers for performance optimization. Back up with the assumption that an intricate web app like Figma also uses Wasm, they thought there would be a lot of companies experiencing a similar performance issue with their applications and those companies would be keen on using their new tool to 10x speed up the apps. And yes, the story was convincing in theory but was a failure in real-world implementations. Here are their takeaways after a year working on the tool:

- They took a week to port a JS simulator of one of their initial users to Rust. It was 5% faster and definitely was not a compelling result. Rust only helps with its faster linear algebra functions but the simulator was already developed with those functions optimized in JS. Rust is faster than JS in some cases, but from their continuing experiments (the previous example was one of them), those cases are rarer than they expected.
  > The performance gain is on the order of 2x some of the time, not 10x most of the time. The big 10x gains do appear when you really lean on Rust’s zero-cost abstractions — processing a million tiny Rust structs is faster than a million JS objects for reasons of memory layout and avoiding the GC — but this is a rare case.
- They did one successfully make a migration greatly faster as their promise but quickly realized it was due to WebGL, not because of Rust or Wasm. They looked back the case of Figma and it was the same story.
  > Figma files are processed in C++/Wasm, and this is likely a huge speedup, but most of Figma’s performance magic is due to their WebGL renderer.

We might think it could be a pivot for them to move away from Rust/Wasm and approach WebGL rerender as an alternative. They did think about it but the market demand certainly doesn't look promising as they initially visioned and doubt if it's still worth a startup opportunity.

#### Reference

- https://zaplib.com/docs/blog_post_mortem.html
- https://news.ycombinator.com/item?id=30960509
