---
title: Retain scroll position in infinite scroll
description: Infinite scroll has become a popular web design technique in recent years, as it offers several benefits over traditional pagination models. However, it can also present some painful challenges for accessibility and usability.
date: 2023-04-24
authors:
  - nguyend-nam
tags:
  - frontend
  - swr-infinite
  - web-design
redirect:
  - /s/zvF7Uw
---

## Infinite scroll - benefits and challenges

Infinite scroll has become a popular web design technique in recent years, as it offers several benefits over traditional pagination models such as reducing page load times or minimizing the need for users to browse through multiple pages. However, it can also present some painful challenges for accessibility and usability. One of the most common issues happens when you are scrolling the list, then click on an item to view its detail (and of course, is navigated to another page). When going back to the list, you lose your previous scroll position and have to scroll all the way to find the item you clicked on before.

![](assets/retain-scroll-position-in-infinite-scroll_infinite_scrolling.webp)

_Image Source: [https://www.explainxkcd.com](https://www.explainxkcd.com/wiki/index.php/1309:_Infinite_Scrolling)_

## Solution

In this article, we will show you an approach using the session storage to store the scroll position, with the infinite scroll implemented using [`useSWRInfinite`](https://swr.vercel.app/docs/pagination.en-US#useswrinfinite).

```javascript
export const LIST_STATES_KEY = 'infinite-scroll-list-states'

export default function createRetainPositionStore<
	T extends SWRInfiniteResponse<any, any>,
>(storeKey = LIST_STATES_KEY) {
	function useRetainPosition({ swr }: { swr: T }) {
		// ...
	}

	function handleSaveStates({ swr }: { swr: T }) {
		// ...
	}

	return { useRetainPosition, handleSaveStates }
}
```

Let's begin by creating a `createRetainPositionStore` that takes in a key that we will use to store and retrieve data from the session storage.

We will also implement two functions inside, one to handle the behaviors before routing happens, and another one for those when we go back to the page and want to retain the scroll position. Both of them accept the parameter of `swr` which is the [response](https://swr.vercel.app/docs/pagination.en-US#return-values) of the `useSWRInfinite()`.

```javascript
function handleSaveStates({ swr }: { swr: T }) {
  sessionStorage.setItem(storeKey, JSON.stringify({ swrSize: swr.size, scrollPosition: window.scrollY }))
}
```

The function above simply stores an object with `swrSize` and `scrollPosition` to the session storage. When a user clicks on an item and is navigated to the detail page, we call this function along with the routing function to store the vertical scroll position (`scrollPosition`) and also the number of pages (or a group of several consecutive items) that infinite scroll already loaded (`swrSize`).

```javascript
function useRetainPosition({ swr }: { swr: T }) {
  const documentHeight = document?.documentElement.scrollHeight || 0
  const listStates = JSON.parse(sessionStorage.getItem(storeKey) || '{}')

  useEffect(() => {
    if (typeof listStates.scrollPosition !== 'number') {
      return undefined
    }

    if (documentHeight > listStates.scrollPosition) {
      window.scrollTo(0, listStates.scrollPosition)
      sessionStorage.removeItem(storeKey)
    }
  }, [documentHeight, listStates.scrollPosition])

  useEffect(() => {
    if (typeof listStates.swrSize !== 'number') {
      return undefined
    }

    if (listStates.swrSize > 1) {
      swr.setSize(listStates.swrSize)
    }
  }, [listStates.swrSize, swr])
}
```

The hook `useRetainPosition` is called in the listing page that uses the infinite scroll technique, so that everytime we visit the page, the two `useEffect`s help us to retrieve the data from the session storage. The `scrollPosition` is used for scrolling the page to the previous position. The `swrSize`, on the other hand, is passed to the `setSize` function to tell `swr` how many pages already loaded before we were navigated to the item detail page.

This makes sense since as mentioned above, when user clicks on an item and is navigated to the detail page, we will store those data to the session storage, and when user wants to go back to the listing page, `useRetainPosition` can retrieve those data and the page will be scrolled to the previous position. After calling `window.scrollTo(0, listStates.scrollPosition)`, don't forget to remove the relating data from the session storage to prevent unwanted scrolling behaviors of the page in the future.

## Reference

- https://www.explainxkcd.com/wiki/index.php/1309:_Infinite_Scrolling
