---
title: Shadow DOM
description: Shadow DOM is a web standard that allows encapsulation of HTML, CSS, and JavaScript within a specific context.
date: 2023-05-16
authors:
  - trankhacvy
github_id: trankhacvy
tags:
  - dom
  - frontend
  - shadow-dom
  - web-api
redirect:
  - /s/j4g3hg
---

I'm currently working on a new application called Javis, which operates as a Chrome extension. Functioning as an AI assistant, Javis is designed to facilitate a smooth and enriching web browsing experience for users. During its testing phase in Chrome, I faced a unique challenge - **Javis's CSS clashed with the webpage's CSS**. The result was a distortion of both the application's and the webpage's interfaces. Following a research, I unearthed a potent solution - the Shadow DOM. In this piece, I aim to explain the concept of Shadow DOM and shed light on the its advantage of encapsulating style.

## What is Shadow DOM?

Shadow DOM is a web standard that allows encapsulation of HTML, CSS, and JavaScript within a specific context. Shadow DOM allows hidden DOM trees to be attached to elements in the regular DOM tree — this shadow DOM tree starts with a shadow root, underneath which you can attach any element, in the same way as the normal DOM.

![](assets/shadow-dom.svg) Source: https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_shadow_DOM

There are some bits of shadow DOM terminology to be aware of:

- **Shadow host**: The regular DOM node that the shadow DOM is attached to.
- **Shadow tree**: The DOM tree inside the shadow DOM.
- **Shadow boundary**: the place where the shadow DOM ends, and the regular DOM begins.
- **Shadow root**: The root node of the shadow tree.

When working with the shadow DOM, you have the power to manipulate its nodes just like you would with non-shadow nodes. This includes appending children, setting attributes, and applying styles using `element.style.color` or a `<style>` element within the shadow DOM. The key distinction is that any code within the shadow DOM remains encapsulated, unable to affect elements outside of it, providing a valuable encapsulation feature.

## Basic usage

Now that we understand the importance of Shadow DOM, let's explore how to create and manipulate Shadow DOM. You can create Shadow Dom by attaching a shadow root to any element using the `Element.attachShadow()` method. This takes as its parameter an options object that contains one option — `mode` — with a value of `open` or `closed`:

```js
const shadowOpen = host.attachShadow({ mode: "open" });
const shadowClosed = host.attachShadow({ mode: "closed" });
```

- `open`: The shadow DOM/ internal DOM of the component is accessible from outside JavaScript.
- `closed`: The shadow DOM/ internal DOM of the component is not accessible outside JavaScript. The `<video>` tag is an example of closed-mode shadow root.

## Conclusion

Shadow DOM provides a powerful tool for developers creating website extensions, widgets, and similar interactive components. It offers the benefit of encapsulation, ensuring styles and scripts do not clash with the host page, that can significantly enhance the reliability and user experience of your applications.

## References

- https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_shadow_DOM
