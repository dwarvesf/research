---
title: null
description: null
date: null
tags:
  - elixir
redirect:
  - /s/ONpqYQ
---

The main issue with this architecture is that the apps aren’t really split for the right reason. In a growing (in terms of code added over time) application it will most likely slow you down the more code you add as the boundaries become more brittle and blurred. The reason for this effect is that umbrella child apps are intended to be created as a way to **deploy** each of them separately, hence the individual configuration and mix project. So unless you’re deploying the apps separately, there is no benefit from using an umbrella app.

There may come a time when you need to, but I can guarantee moving into an umbrella app configuration, retrofitting on an existing app is the easier option than consolidating child apps.

> Umbrella child apps are intended to be created as a way to **deploy** each of them separately

## A better alternative

I’m not advocating to never use umbrella apps, but I think in most cases it’s better not to use one until you have the requirement to deploy a child app separately.

The alternative is to create a good old elixir application using ‘mix new’ and placing all of your apps into their own folders. You can still accomplish the same architecture without using an umbrella app and as a side bonus you’ll be able to quickly iterate and change your mind on decisions as you learn more about your business domain and perhaps elixir too! This is a much easier way to get started with Elixir, in fact [Phoenix recommends to structure your apps in this way](https://hexdocs.pm/phoenix/contexts.html) through contexts.

My experience with umbrella apps has mostly been one of trying to reduce its complexity and favour modules over apps.

In fact, in [Elixir's official documentation](https://elixir-lang.org/getting-started/mix-otp/dependencies-and-umbrella-projects.html#dont-drink-the-kool-aid) where it explains some of the benefits of using Umbrella apps, it does state a disclaimer:

> While it provides a degree of separation between applications, those applications are not fully decoupled, as they are assumed to share the same configuration and the same dependencies.

---

#### Reference

- https://dev.to/jackmarchant/the-problem-with-elixir-umbrella-apps-850
