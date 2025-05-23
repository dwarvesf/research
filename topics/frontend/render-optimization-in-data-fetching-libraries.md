---
title: Render optimization in data-fetching libraries
description: Data-fetching libraries are software tools or frameworks that can help improve the performance and scalability of your application by handling network requests and data processing more efficiently.
date: 2023-06-08
authors:
  - tienan92it
github_id: tienan92it
tags:
  - data-fetching
  - engineering
  - frontend
redirect:
  - /s/5ibnwg
---

Data-fetching libraries are software tools or frameworks that can help improve the performance and scalability of your application by handling network requests and data processing more efficiently. In React, one of the key challenges these libraries address is optimizing rendering to avoid unnecessary re-rendering of components when the underlying data remains unchanged. This helps to prevent situations where components re-render multiple times despite no changes in the data, resulting in improved efficiency and smoother user experiences.

Let's dive in how it works.

## Deduplication

Data-fetching libraries typically use caching strategies to reduce the number of network requests that need to be made, and improve the performance of the application. By using a unique key as the identifier and stale-while-revalidate as cache validation, the library will return responses from cached data or make a network request.

![](assets/render-optimization-in-data-fetching-libraries_render-optimization-in-data-fetching-1.webp)

## Data selection

Everytime a request is sent, the corresponding components will be updated by 3 very common stateful values:

```json
{ data, error, fetching }
```

Look at `fetching`, this flag is quite useful if you want to display a loading indicator. But it's also kinda unnecessary if you don't do that. Then your component will render twice even though nothing changed in data because this flag is always true when a request is in-flight and otherwise. Unexpected render happens when a hook request is used like:

```js
const data = useRequest(...)
```

For this use-case, most libraries is designed to notify on what properties are using in component only. So it's recommended to use destructuring instead:

```js
const { data, error } = useRequest(...)
```

## Structural sharing

Structural sharing is the most advance feature that can optimize rendering over data selection. One of the data-fetching libraries has turned on out of the box is [React Query](https://tanstack.com/query/latest/). To use this feature, makes sure your data is kept referential identity on every level. As an example, suppose we have the following data structure:

```json
[
  { "id": 1, "name": "Learn React", "status": "active" },
  { "id": 2, "name": "Learn React Query", "status": "todo" }
]
```

Now suppose first todo is changed into the *done* state:

```diff
[
- { "id": 1, "name": "Learn React", "status": "active" },
+ { "id": 1, "name": "Learn React", "status": "done" },
 { "id": 2, "name": "Learn React Query", "status": "todo" }
]
```

Structural sharing will attempt to compare the old state and the new and keep as much of the previous state as possible.

This comes in very handy when using selectors for partial subscriptions:

```js
// ✅ will only re-render if _something_ within todo with id:2 changes
// thanks to structural sharing
const { data } = useTodo(2);
```

In some instances, especially when having very large datasets, structural sharing *can* be a bottleneck. Let's use it carefully.

## References

- https://tkdodo.eu/blog/react-query-render-optimizations
- https://nextjs.org/docs/app/building-your-application/data-fetching
- https://swr.vercel.app/docs/advanced/performance
- https://tanstack.com/query/latest/docs/react/guides/caching
