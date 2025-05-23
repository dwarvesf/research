---
title: Prevent layout thrashing
description: Layout Thrashing happens, when you request layout information of an element or the document, while the layout is in an invalidated state.
date: 2022-09-11
authors:
  - thanhlmm
github_id: thanhlmm
tags:
  - performance
  - frontend
redirect:
  - /s/eb8_GA
---

## What is layout thrashing

![](assets/prevent-layout-thrashing_layout-thrashing.webp)

Layout thrashing means forcing the browser to calculate a layout that is never rendered to the screen, which hurts performance.

## Why

Layout Thrashing happens, when you request layout information of an element or the document, while the layout is in an **invalidated state**.

```js
// any DOM or CSSOM change flags the layout as invalid
document.body.classList.add("foo");

// reads layout == forces layout calculation
const box = element.getBoundingClientRect();

// write/mutate
document.body.appendChild(someBox);

//read/measure
const color = getComputedStyle(someOtherBox).color;
```

Mixing Layout Read & Layout Mutation must wait for the browser to recalculate the layout and reflow to return your Layout value.

![](assets/prevent-layout-thrashing_dont-touch-me.webp)

## How to fix

We can resolve the problem by isolating your reads from your writes. The steps would be:

- Batch Read Layout first
- Then Mutate Layout later

```js
// reads layout
const box = element.getBoundingClientRect();
const color = getComputedStyle(someOtherBox).color;

// write
document.body.classList.add("foo");
document.body.appendChild(someBox);
```

Or use a library such as [fastdom](https://github.com/wilsonpage/fastdom) which abstracts those steps:

```js
import fastdom from "fastdom";

function resizeAllParagraphsToMatchBoxWidth(paragraphs, box) {
  fastdom.measure(() => {
    const width = box.offsetWidth;

    fastdom.mutate(() => {
      for (let i = 0; i < paragraphs.length; i++) {
        paragraphs[i].style.width = width + "px";
      }
    });
  });
}
```

## How to debug

Open `Performance Tab` on Dev tool, slow down your CPU, and click `Start Profiling`.

![](assets/prevent-layout-thrashing_layout-thrashing-debug.webp)

Find purple tasks and get info in detail:

<video src="https://afarkas.github.io/layout-thrashing/material/layout-thrashing-debug.mp4" controls></video>

## List of commands causing layout thrashing we need to be careful when using it

Generally, all APIs that synchronously provide layout metrics will trigger forced reflow/layout. Check out [this gist](https://gist.github.com/paulirish/5d52fb081b3570c81e3a) for additional cases and details.

## Reference

- https://gist.github.com/paulirish/5d52fb081b3570c81e3a
- https://afarkas.github.io/layout-thrashing/#/
