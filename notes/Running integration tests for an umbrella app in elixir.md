---
title: null
description: null
date: null
tags:
  - elixir
redirect:
  - /s/U_kq6A
---

The umbrella project is meant to be an umbrella facility really, you can't add code nor tests to it. I can see two options:

1. Add the tests to the application that depends on all others (if you have one)
2. Create another application in apps that is where you will store all integration tests

In any case, remember that ExUnit has the concept of tags and you can tag all integration tests as such and use the tag system to include/exclude tests at will. This should help you manage tests as they grow in number.

---

#### Reference

- https://stackoverflow.com/questions/32825944/running-integration-acceptance-tests-for-an-umbrella-app-in-elixir
