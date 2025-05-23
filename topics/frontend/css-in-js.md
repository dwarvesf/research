---
title: Css in JS
description: CSS-in-JS is a styling technique where Javascript is used to style the component.
date: 2022-08-11
authors:
  - trankhacvy
github_id: trankhacvy
tags:
  - css-in-js
  - frontend
redirect:
  - /s/A2ENWw
---

**CSS-in-JS** is a styling technique where Javascript is used to style the component. These are multiple implementations of this concept in the form of libraries such as [emotion](https://emotion.sh), [styled-component](https://styled-components.com/), [JSS](https://cssinjs.org). They aim to tackle the limitations of CSS, such as lack of dynamic functionality, scoping, and portability.

## Benefits

### Scoping

With CSS-in-JS, writing new styles cannot affect anything else in other places on the site, so there’s no need to worry about writing a style that has bad or unintended consequences elsewhere due to a selector in the global scope.

### Avoid naming collisions

[Naming is hard](https://hilton.org.uk/blog/why-naming-things-is-hard). CSS-in-JS libraries automatically generate unique selectors for what’s being styled. We don't need to think about naming.

### Dynamic functionality

As CSS-in-JS is essentially JavaScript code, you can apply complex logic to your style rules, such as loops, conditionals, variables, state-based styling, and more.

### Dead code elimination

CSS-in-JS helps with removing dead code. The only styles that are loaded are the styles for the components in use at any given time. There’s no shipping of any unused styles. When a component dies, so does its style.

### Developer ergonomics

It can be nice to have styles in the same file (or otherwise very close to) the component itself. In the same way, some developers feel very comfortable in JSX. Also, being able to style things without any scoping worry means developers may feel empowered about styling rather than intimidated by it.

## Disadvantages

### Runtime cost

When CSS is generated from JavaScript at runtime, in the browser, there is an inherent overhead. Some CSS-in-JS libraries try to overcome this overhead by extracting CSS files during the build time (like [linaria](https://linaria.dev)), but it comes with other [trade-offs](https://github.com/styled-components/styled-components/issues/2377)

### Learning curve

CSS-in-JS definitely has a learning curve, especially if you have used neither component-based frameworks nor web components before. Besides learning the new syntax, you also need to pick up a new way of thinking, which needs time and might slow down your development workflow for a while.

### Unreadable class names

Automatically generated selectors significantly worsen code readability. This can be a huge concern for you if you regularly use your browser’s developer tools for debugging. Currently, many CSS-in-JS libraries try to provide meaningful class names based on the declaration name or component name in development mode. Some of them even let you customize the class name generator function. In production mode, though, the class names are still hard to read and debug.

### Extra bundle size

Adding another library to a web page increases the page size, which can negatively impact page load time.

## Reference

- https://en.wikipedia.org/wiki/CSS-in-JS
- https://webdesign.tutsplus.com/articles/an-introduction-to-css-in-js-examples-pros-and-cons--cms-33574
- https://medium.com/dailyjs/what-is-actually-css-in-js-f2f529a2757
- https://github.com/styled-components/styled-components/issues/2377
