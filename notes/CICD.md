---
title: null
description: null
date: null
tags:
  - development
redirect:
  - /s/9Pglnw
---

### CI

- Avoid merge conflicts
- Auto merge source code from different locals
- Constantly build & test
- Notify when bug arrives
- Only merge if `no errors`

### CD

- After code is compiled & merge
- Code is moved to another env for more test
- Passed these tests, code is ready for production
- CD ensures a safety net for production code
  - i.e: once code is shipped to production, it can still be tested and notify bugs

### The CI/CD pipeline

- Automatic // infinite loop of testing, notifying and building
- Saves times. prevents developers to deal with merge conflicts and bugs
- Provides constant feedback
- The pipeline keeps traverse between production // source code for bug tracking

---

#### Reference

- https://kylefarmer85.medium.com/what-is-ci-cd-76d71b82898d
