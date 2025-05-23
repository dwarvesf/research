---
title: React fiber
description: Fiber is the new reconciliation algorithm since React 16, a completely backward-compatible rewrite of the old reconciler (Stack Reconciler).
date: 2022-10-13
authors:
  - ngolapnguyen
discord_channel: engineering
tags:
  - engineering
  - react
redirect:
  - /s/ukhSvQ
---

### An introduction to React fiber

Fiber is the new reconciliation algorithm since React 16, a completely backward-compatible rewrite of the old reconciler (Stack Reconciler).

### Purposes

- Improved performance by breaking the limits of the call stack. It allows dividing the work into multiple chunks & divide the rendering work over multiple frames. This lets it pause or restart work conditionally.
- Control over the priority of the work. Work being divided into smaller chunks mean we can essentially prioritize each chunk based on its context. E.g: Functions that originate from user actions should be processed before less-important background functions.
- Better suitability for advanced UI (animations, layouts & gestures) as a result of the priority control.
- … (some other new features)

By breaking up the work into smaller chunks that can be paused, resumed, or aborted based on a set priority order, React fiber helps apps deliver a more fluid experience.

With the old Stack Reconciler, reconciliation and rendering work weren’t separated & performed synchronously without interruption. Render changes can only be inserted after current stack was cleared. This often resulted in lagging inputs and choppy frame rates.

### References

- https://www.geeksforgeeks.org/reactjs-reconciliation/
- https://www.velotio.com/engineering-blog/react-fiber-algorithm
- https://flexiple.com/react/react-fiber/
