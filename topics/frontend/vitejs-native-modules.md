---
title: ViteJS native modules
description: ViteJS takes full advantage of the availability of native ES modules in the browser and the rise of JavaScript tools written in compile-to-native languages by introducing pre-bundles dependancies using esbuild.
date: 2022-07-04
authors:
  - namtrhg
github_id: namtrhg
tags:
  - esm
  - frontend
  - native-modules
  - vitejs
redirect:
  - /s/EZL-rg
---

Before ES modules was supported in the browser, we have no native mechanism for authoring JavaScript modules in a modularized fashion. That is why the concept of **"bundling"** and tools like Webpack, Rollup, and Parcel exist to improve the development experience for frontend developers.

However, when our project started to expand more, the amount of modules might increase from a hundred to thousands of modules which lead to performance bottleneck for **JavaScript-based** toolings.

### Why Vite faster

Vite takes full advantage of the availability of native ES modules in the browser and the rise of JavaScript tools written in compile-to-native languages by introducing `pre-bundles dependancies` using `esbuild` which was written in Go which is 10-100x faster than JavaScript-based bundlers.

### Server built architecture

#### Bundle based dev server

Bundle-based dev server like Webpack built your application by combining all the source-code and modules into a JavaScript-based bundle, everything is done on the server-side and when you change something, the entire application has to build from the start.

#### Native ESM based dev server

Vite's approach was instead of bundling all everything on the server, it only bundles modules when the browser requires them through HTTP request.

This architecture provides a faster dev server by avoiding bundling all the application on the server and utilizing the power of modules handling of the browsers.

### Update when built

Rebuilding the whole bundle after making changes to your source code in a bundler-based build system is inefficient for the obvious reason that the update speed would degrade linearly with the app's size.

**HMR (Hot module replacement)** is applied to native ESM in Vite. Vite consistently performs HMR updates quickly regardless of the size of your application by only needing to precisely invalidate the chain between the updated module and its nearest HMR boundary when a file is changed.

### Why bundle for production

Despite the fact that native ESM is now generally supported, deploying unbundled ESM in production is still wasteful (even with HTTP/2) since nested imports require extra network round trips. It is still preferable to bundle your code with tree-shaking, lazy-loading, and common chunk splitting to get the best loading performance in production (for better caching).

### Why not bundle with ESBuild?

While `esbuild` is lightning-quick and a very capable bundler for libraries, some crucial features required for bundling apps, specifically code-splitting and CSS handling, are still **under development**. `Rollup` is currently more capable and adaptable in several areas and being used in production.

### References

- https://vitejs.dev/guide/why.html
- https://www.telerik.com/blogs/whats-vite-guide-modern-super-fast-project-tooling
