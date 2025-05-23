---
title: Why Virtual DOM is fast?
description: React and Vue, two popular front-end frameworks, both use Virtual DOM to improve page rendering efficiency. Understanding the concept of Virtual DOM sheds light on an important aspect of performance optimization on the client side.
date: 2022-08-09
authors:
  - zlatanpham
github_id: zlatanpham
tags:
  - performance
  - frontend
  - react
  - virtual-dom
redirect:
  - /s/4e9q1A
---

React and Vue, two popular front-end frameworks, both use Virtual DOM to improve page rendering efficiency. Understanding the concept of Virtual DOM sheds light on an important aspect of performance optimization on the client side.

Under the hood, virtual DOM is a mapping of JavaScript objects to actual DOM. In React, an example of this looks like this:

```js
{
  tag: "ul",
  props: {},
  children: [{
    tag: "li",
    props: {
      className: "item"
    },
    children: ["item", 1]
  }]
}
```

The output of the above Virtual DOM is translated to the following HTML:

```html
<ul>
  <li className="item">item 1</li>
</ul>
```

We can see that React implements a one-to-one correspondence between the Virtual DOM and the browser's DOM. However, how is this relationship beneficial to page rendering speed? Let's take a look at a simple example to illustrate how React achieves this efficiency.

When a state changes, React performs the following steps:

- Generate a new Virtual DOM
- Compare the differences between the new Virtual DOM and the previous Virtual DOM
- Generate a diff object
- Traverse the diff objects and update the actual DOM

Now let's consider the initial Virtual DOM is the previous state and the below is the new Virtual DOM after a state change:

```js
{
  tag: "ul",
  props: {
    className: 'list'
	},
  children: []
}
```

When you map the steps to compare an initial virtual DOM with the new virtual DOM, you can see that a series of changes occur:

- Check `ul` tag; nothing has changed, so keep it untouched.
- Check `ul` props; a new `className` prop appears, register the change in the diff object.
- Check `children`; the array of children is now empty; register the change in the diff object.
- Traverse the diff object and do a batch update to modify the actual DOM (which probably invokes `classList.add` and `removeChildren` method).

After all, building a new JavaScript object tree and then running a diffing algorithm on the two trees does not sound like it would be performant at all. Why would we need to go through all of those extra steps if, in the end, we are still making the same DOM changes? The purpose of the whole process is to limit the number of times you call a method, and the frequency with which DOM updates occur. We can see this most clearly through the following two scenarios:

- Grouping all updates together and applying them in one batch is a better idea than synchronizing the updates as they occur.
- Be able to identify unnecessary changes. For example, when a state makes a change to an attribute of an element, and the subsequent state change causes the removal of that element, it's easy to see that the former update is unnecessary.

Minimizing DOM updates is a big win in performance optimization because it reduces the number of computations that must be performed in order to render the page. Because [[Why DOM manipulation is slow? | DOM manipulation invokes complex algorithms]], "diffing" the virtual DOM is much cheaper than performing all of those calculations.

An important point to note here is that we need to correct the assumption that the Virtual DOM is fast. This isn't actually the case—it's slow. However, it is faster than performing unnecessary real DOM updates.

## Reference

- [Rich Harris - Rethinking reactivity talk at YGLF 2019](https://www.youtube.com/watch?v=AdNJ3fydeao)
