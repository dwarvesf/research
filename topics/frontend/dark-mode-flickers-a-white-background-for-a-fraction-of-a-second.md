---
title: Dark mode flickers a white background for a fraction of a second
description: "The dark mode feature uses local storage to store a user's preference for future usage. The problem is that when the dark mode is enabled and the page is reloaded, there's a flicker of a white background all over the page before it turns dark. This happens for a fraction of a second and doesn't look natural."
date: 2022-08-11
authors:
  - zlatanpham
github_id: zlatanpham
tags:
  - dark-mode
  - frontend
  - tips
redirect:
  - /s/C8zyag
---

The dark mode feature uses local storage to store a user's preference for future usage. The problem is that when the dark mode is enabled and the page is reloaded, there's a flicker of white background all over the page before it turns dark. This happens for a fraction of a second and doesn't look natural.

Following is the implementation we normally do when setting up this feature. This works by detecting if the dark mode is enabled from `localStorage` and adding a CSS class called `dark` to the `<html>` tag so all elements that are descendants of that element will turn to dark styling.

```html
<html>
  <head>
    ...
    <link href="./light.css" />
    <link href="./dark.css" />
  </head>
  <body>
    ...
    <script src="./main.js" />
  </body>
</html>
```

```js
// main.js
//...
if (window.localStorage.getItem("theme") === "dark") {
  document.documentElement.classList.add("dark");
}
```

However, the dark styling is only applied if the `main.js` file is called so it will be expected to see the flash of light styling.

To fix this, put the scripts inside the `<head>` tag, even before the `<link>` or `<style>` tags:

```html
<html>
  <head>
    <script type="text/javascript">
      if (window.localStorage.getItem("theme") === "dark") {
        document.documentElement.classList.add("dark");
      }
    </script>
    ...
    <link href="./light.css" />
    <link href="./dark.css" />
  </head>
  <body>
    ...
    <script src="./main.js" />
  </body>
</html>
```

By doing this, the page rendering will be blocked when the engine detects the `<script>` inside the `<head>` tag. While the renderer is idle, the JavaScript interpreter will assign the `dark` value to the CSS class list of `<html>` before the `dark.css` is loaded.

## Reference

- https://stackoverflow.com/questions/63033412/dark-mode-flickers-a-white-background-for-a-millisecond-on-reload
