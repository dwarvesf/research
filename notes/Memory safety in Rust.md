---
title: null
description: null
date: null
tags:
  - rust
redirect:
  - /s/cpIZOg
---

The garbage collector of Golang helps developers by automatically freeing the memory of their programs when it is not needed anymore. However, keeping track of the memory and cleaning it could impact the performances of our programs.

Meanwhile, Rust's mechanism in memory safety acts different. Dividing in `stack` and `heap`. It predicts when will the data be out of used and automatically drop (remove) it, which reduces the cost of memory management during runtime.

The obsolence of garbage collector then enhance and speed up performance, which make this language become one of the top choices for 2021.

---

#### Reference

- https://stackoverflow.blog/2020/01/20/what-is-rust-and-why-is-it-so-popular/
- https://serokell.io/blog/rust-guide
- https://blog.rust-lang.org/2021/05/11/edition-2021.html
- https://msrc-blog.microsoft.com/2019/07/22/why-rust-for-safe-systems-programming/
