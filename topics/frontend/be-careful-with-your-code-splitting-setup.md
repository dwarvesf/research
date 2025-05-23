---
title: Be careful with your code splitting setup
description: Learn how improper Webpack code-splitting can cause React virtual lists to reset scroll position unexpectedly and how grouping related chunks fixes navigation glitches in mobile-first PWAs.
date: 2017-07-17
tags:
  - engineering
  - practice
  - technique
redirect:
  - /s/eLikDQ
---

I thought I have been through hell this evening. Took me 6 hours debugging in the deep dark of hell. Oh right.

The app I have been worked on was a mobile-first PWA built with React, so naturally there is an infinite/virtual list somewhere in the app.

When I created `Explore` component, which basically a version of `ItemList`— an infinite list using [react-virtualized](https://github.com/bvaughn/react-virtualized) — with list items inside, sounds good and all.

Except, clicking a list item doesn’t immediately navigate to `ItemDetail` page. There is a weird frame in between the list view and list detail view.

That frame — when I scroll down and click the 3rd or 4th item, instantly the virtual list reset it’s `scrollTop` to `0`, moving the scrolled view port back to the beginning, then navigate to the ItemDetail page.

My good old `ItemList` never had this problem. Inevitably, I copied 100% code from my old list to this new list view, but the problem persist.

Skipping my hell crawling and debugging process, the culprit was, surprisingly, due to my code splitting setup.

Let me explain.

Unlike most people out there who use [react-router](https://reacttraining.com/react-router/), I use [found](https://github.com/4Catalyzer/found/) for routing, but it doesn’t matter, the problem lies in how I setup code-splitting for the app.

I have this in my route config:

```plain_text
{
  path: '/',
  Component: App,
  children: [
    {
      path: 'explore',
      getComponet: () => import('pages/home/Explore').then(m => m.default),
    },
    {
      // My old ItemList component
      path: 'items',
      getComponent: () =>
        import(/* webpackChunkName: "item" */ 'pages/items/ItemList').then(
          m => m.default,
        ),
    },
    {
      path: 'items/:id',
      getComponent: () =>
        import(/* webpackChunkName: "item" */ 'pages/items/ItemDetail').then(
          m => m.default,
        ),
    },
  ],
}
```

I used Webpack’s magic comment to group related chunks, in this case, ItemList and ItemDetail are grouped under item chunk.

> When I givepages/home/Explorethe same chunk name withspages/items/ItemDetail, that weird frame goes away.

So the working version be like:

```plain_text
{
  path: '/',
  Component: App,
  children: [
    {
      path: 'explore',
      // use same chunkName "item" for Explore component
      getComponet: () => import(/* webpackChunkName: "item" */ 'pages/home/Explore').then(
        m => m.default
      ),
    },
    {
      path: 'items/:id',
      getComponent: () => import(/* webpackChunkName: "item" */ 'pages/items/ItemDetail').then(
        m => m.default,
      ),
    },
  ],
}
```

It took me so long to notice this because chunks grouping are one of those easy-to-forget type of things, you did it once and rarely look back.

My guess it that it took time to load `item` chunk when navigate from `Explore` component, but theres no reason for the virtual list to reset its own `scrollTop` before navigating.

Now that this is partly solved, I need to look deeper to the implementation of the virtual list to see if anything can lead to above problem. It could also due to my naive, immature understanding of how code-splitting works.
