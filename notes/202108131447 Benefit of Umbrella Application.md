---
title: null
description: null
date: null
tags:
  - elixir
redirect:
  - /s/Ujcf6A
---

An advantage to using the umbrella structure is that the applications are structured as standalone applications. This can help to give clearer boundaries between the applications and to separate application concerns. For example, an application in the umbrella should only call the public apis of another umbrella application. However, this is not enforced and private apis can still be called.

The individual applications in the umbrella have their own configuration files, tests and separate `mix.exs` files which can be compiled, run and tested as one big application because they are in the umbrella. However, a single application can still be run and tested standalone when working inside the application directory (in `apps/app_name`).

In my opinion there can also be drawbacks to this. A drawback to the umbrella is that you have `1 + app_count` different config and mix files to manage. Additionally your source files will be nested deeper, e.g. in `apps/app_name/lib/app_name/...` instead of just `lib/app_name`, which makes it harder to navigate the source code.

In many cases I find that an umbrella app is not necessary for the project I'm working on, because the applications in the umbrella are never going to run standalone anyway. Often I prefer having projects with different namespaces in the `lib/` folder while still treating them as applications with separate responsiblities.

[Docs for "Dependencies and umbrella projects" at elixir-lang.org](https://elixir-lang.org/getting-started/mix-otp/dependencies-and-umbrella-projects.html)

---

Source: https://stackoverflow.com/questions/59958055/what-are-the-benefits-of-umbrella-applications
