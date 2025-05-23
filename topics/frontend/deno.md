---
title: Deno
description: Discover Deno, a secure JavaScript runtime built in Rust with native TypeScript, WASM, and ESM support, designed for modern web APIs and easy deployment without complex build tools.
date: 2022-03-17
github_id: huygn
redirect:
  - /s/i2lIOQ
---

## What

- A new JavaScript runtime, written in Rust (JsVM 💃🏻)
- Built to follow the standard Web API
- Take advantage of TypeScript, WASM and ESM module (and support them natively)
- "Node" written weirdly backwards

## Why

![](assets/deno_kfo8ecl.webp)

- Deno follows the standard Web API [and is leading the industry in implementing them](https://github.com/denoland/deno/pull/11941)
  - This is with the aim to make JS/TS project ideally more universal
- secure by default
  - requires `--allow-*` flags to enable specific features like read/write, network access, etc...
  - This is so a random project/module can't read your file system unless you **explicitly** allow it to
- no need for `npm install`, pre-bundling (e.g: `tsc`/`webpack`/`package.json`) dances and rituals
- Perfect to deploy on modern platforms like Cloudflare Workers and [Deno deploy](https://deno.com/deploy/docs)

## Why not?

- Although native ESM and `script type="module"` is widely supported in modern browsers, some very new APIs like `URLPattern` is not completely supported everywhere
- dependencies on Deno are imported by URL, so it makes it somewhat messy, but [`import map`](https://deno.land/manual/linking_to_external_code/import_maps) can be used to improve readability
  - `import lodash from "https://deno.land/x/lodash@4.17.19"`
  - `deno` will download available imports online and cache locally before running

## What about Node.js?

- Node.js and its ecosystem has grown into a messy place
- History of inconsistent authoring/bundling [formats](https://dev.to/iggredible/what-the-heck-are-cjs-amd-umd-and-esm-ikm) (cjs, amd, umd)
- Node 16 adds ESM support, but before moving to ESM format, 2 things needed to happen:
  - the library author has to [break backward compatibility](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c#pure-esm-package)
  - library users have to [migrate their project to an ESM format](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c#pure-esm-package)
  - just imagine the whole Node.js ecosystem going through this 💥
- Confusion with JavaScript in the browser (e.g: `require` vs `import`)
- Non-standard & incompatible with modern JavaScript

## Extras

Deno also removes one most confusing part when developing JavaScript: build tools.

Webpack/Babel and their bundling process is the most over-engineered (albeit necessary) part of JavaScript development. Just needing to know how bundlers work to effectively leverage them is a crucial part of writing & authoring JavaScript projects/libraries, and has been over the recent decade.

Node.js developers often need to work with Webpack & Babel just to have the convenience to write their code in modern JavaScript (e.g: `import` vs `require`) or be able to work with TypeScript.

Deno, on the other hand, strives to move along with the modern JavaScript standard by defaulting to ESM, with native support for all standard APIs and TypeScript/JSX, removing the need to rely on build tools.

> "Now we can sit down and write actual JavaScript instead of spending half a day initialize new project with Webpack, Babel, JSX and another half to configure Jest to read our `.babelrc` config. _Such. fresh. air._"

### Deno deploy

Similar to Cloudflare Workers, Deno deploy is a serverless deployment platform using the Service Worker API to create deployments, currently in (free) public beta.

What's really cool about Deno deploy is that it only requires a link to your entry file to deploy, and deploy time is super fast.

![](assets/deno_gygtlws.webp)

Interesting projects to follow:

- https://github.com/exhibitionist-digital/ultra
- https://github.com/lucacasonato/fresh
