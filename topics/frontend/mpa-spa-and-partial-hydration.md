---
title: MPA, SPA and partial hydration
description: MPA, SPA and partial hydration are three different approaches to building web applications.
date: 2022-03-24
authors:
  - huygn
github_id: huygn
tags:
  - frontend
redirect:
  - /s/5oKkIg
---

If you've been on Twitter lately, you might've seen the term "Partial Hydration" as well as MPA going along and hyped by web advocates, wondering what about them?

## MPA

"Multi-page-app", opposes the more commonly known "Single-page-app". The idea is now that we're back to the web era of 10 years ago of truly "static" websites. Each link navigation triggers a full-page reload to the new HTML page with no SPA-style navigation (a navigation style that doesn't trigger a full page reload, but replace the current page with the new page, similar to an app-like experience).

### Why?

The web community has spent huge efforts to make SPA faster and more SEO friendly than how it was originally introduced: SSR and streaming mechanisms allow for making meaningful content visible as fast as possible. But we've come to a realization: nothing beats an MPA in terms of speed of page loading and SEO.

SSR did a wonderful job bringing faster page loads to SPA, but the problem still exists: we've been sending really huge, mostly unused, JavaScript payloads to users.

## Why not SPA?

With the current advanced web technologies, mainly web libraries/frameworks like React, Preact, Vue, Svelte, etc - most companies opt to build their web products completely with those libraries. Since these frameworks are excellent in building SPAs, we've been seeing a lot more SaaS products as SPA now more than ever.

SPA isn't technically a bad thing, it makes navigation feels more "native" and smooth - with features like preloading and background fetching for new pages that the user might likely visit. In fact, it's so great that a lot of recognizable web software are built as an SPA: Facebook, Twitter, Notion, etc...

However, SPA does come with a cost that is not so obvious at first glance: **a large initial bundle size**.

### The SPA story

The way most SPAs works is that (almost) everything in our web UI is composed with JavaScript (with or without frameworks). JavaScript is run this way to create HTML at run-time, with the most basic form of this pattern being `document.createElement("div")`. Now, imagine if every text, button, section, popup, and relevant UI components of our website were built using this pattern. Why is it not-so-good to use SPA?

The answer: [It's the cost of JavaScript](https://timkadlec.com/remembers/2020-04-21-the-cost-of-javascript-frameworks/). Unlike raw HTML, using JavaScript to create HTML implies unseen overhead. This amounts to the cost of downloading, parsing, and executing JavaScript. Even before we can see anything on the screen, the browser has to run all of this to completion in order to show us something meaningful. Depending on the context, this effect can cause long delays between when a user visits a site and when a meaningful content is visible to that user. Nowadays, web performance tools measures and categorizes this delay as one of the most [important metric for frontends: (LCP)](https://web.dev/lcp/).

### SSR & hydration

Then we have SSR "Server Side Rendering" - used to improve LCP and provide better SEO capability for SPAs. In React, this feature is handled with `ReactDOMServer.renderToString`. The idea is simple: render the whole React tree to raw HTML on server and return it to browser. The user will then be able to see content immediately after HTML is downloaded.

Now we have the best of both worlds, with SPA & SSR - an app-like experience with fast content delivery time!

Not so fast. We’re still missing one final piece - the raw HTML returned by our server won't be fully interactive (e.g: the "counter" state won't change when we click buttons). In order to make our page interactive, we have to "hydrate" it.

**Hydration** is the process of turning the raw HTML we returned earlier to a fully interactive React tree of components. For React, this can be done using the `ReactDOM.hydrate` method. So full process would be:

1. `renderToString` & send the (html) string to clients on the server
2. Loads the corresponding React component and hydrate it on the client:
   - `import Page from "pages/home"`
   - `hydrate(Page, document.getElementById("app"))`

"Sooo that’s still all good!". Yes, except for one thing: do we really need ALL our components to be interactive? Probably not, especially for cases when we're building a basic landing/marketing site using React, where most of our content is static except for subscribe forms, sliders, etc. Hydrating the whole page in this scenario is called _hydration waste_: only some components are actual interactive components, yet we hydrate everything from the top down, which in turn makes our [time-to-interactive (TTI)](https://web.dev/interactive/) longer.

## Partial hydration

This concept proposes hydrating only parts of the entire site - parts where we need interactivity, this in turn help us to ship less JavaScript to the client by only hydrating demanding components. Thus, we improving page load time & time-to-interactive. As of now, only some static site frameworks support this out of the box: [Astro](https://docs.astro.build/core-concepts/component-hydration) & [Marko](https://markojs.com/).

To implement this from scratch in a React project, although doable, requires [quite a lot of implementation](https://medium.com/@luke_schmuke/how-we-achieved-the-best-web-performance-with-partial-hydration-20fab9c808d5), and it may be hard to debug issues in the process.

## MPA, SPA or Partial Hydration?

Same old answer: it depends. If you’re building an analytics dashboard, sports betting portal, or just a better version of PowerPoint, stick with SPA (and SSR, if needed). These types of websites have lots of interactive UI to make Partial Hydration just not worth it.

Otherwise, if it's your landing site, similar to [netlify.com](http://netlify.com/) or [dwarves.foundation](https://dwarves.foundation/), which essentially just has only 1-2 pieces of UI that require JavaScript to run, and you’re building it with React: try to apply Partial Hydration where possible. While `react-static` or `gatsby` does not (yet) support partial hydration, you can try out [astro.build](https://astro.build/). Here, partial hydration is a first class citizen, and it comes with a decent static site generator with good React support.

For MPA, if you prefer to keep building your site with React, you can still make it with an MPA. Just do SSR on the server and AVOID hydrating the whole page on the client. Obviously interactive components won't be interactive, but at least it's a good start.
