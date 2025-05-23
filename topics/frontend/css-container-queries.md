---
title: Css container queries
description: Container Queries is a CSS feature that allows us to style elements based on the size of a container.
date: 2022-09-02
authors:
  - tienan92it
github_id: tienan92it
tags:
  - css
  - frontend
  - guide
  - responsive-design
redirect:
  - /s/F3mTRA
---

Published on August 30, 2022, Chrome 105 included Container Queries, one of the most highly requested features in CSS.

## The problem with media queries

When we want to create a responsive layout, we can use media queries to adjust styles based on the screen size of the device viewing our site. However, media queries have some limitations. For example, we cannot use them to style individual components based on their parent's width; we can only adjust the entire page. This is problematic because we cannot create responsive components; only responsive pages.

## What is Container Queries?

The CSS3 property "container queries" allows us to style elements based on the size of a container. It is similar to a Media Query, except it evaluates against the size of a container instead of the size of the viewport.

## How to use Container Queries?

To query a component based on its parent width, we need to use the `container-type` property with possible values: `size`, `inline-size`, `block-size`, `style`, `state`.

```css
.sidebar {
  container-type: inline-size;
}
```

Now we can start to query a container using `@container`. This will query the nearest containment context.

```css
@container (min-width: 300px) {
  .content {
    display: none;
  }
}
```

Additionally, Containers can be named with `container-name` property. This allows us to query a specific container.

```css
.sidebar {
  container-type: inline-size;
  container-name: my-sidebar;
}
```

or shorthand syntax

```css
.sidebar {
  container: my-sidebar / inline-size;
}
```

Then, to query a specific container, we can use `@container` with `container-name`.

```css
@container my-sidebar (min-width: 300px) {
  .content {
    display: none;
  }
}
```

## Browser support

Currently, Container Queries is only available in [modern browsers](https://caniuse.com/?search=Container%20Queries):

- Chrome 105+
- Safari 15+
- Edge 105+

Universal support can be achieved by using [Polyfill](https://github.com/GoogleChromeLabs/container-query-polyfill).

## Reference

- https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Container_Queries
- https://javascript.plainenglish.io/css-container-queries-3393fbeb6ea8
- https://ishadeed.com/article/container-queries-are-finally-here/
- https://developer.chrome.com/docs/devtools/css/container-queries/
