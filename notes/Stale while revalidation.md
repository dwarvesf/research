---
title: null
description: null
date: null
tags:
  - cache
  - http
  - practice
redirect:
  - /s/x-broA
---

### Concept

- The **`Cache-Control`** HTTP header holds _directives_ (instructions) for caching (https://developer.mozilla.org/en-US/docs/Web/HTTP/Caching) in both requests and responses.
- **`stale-while-revalidation`** is an extension **`Cache-Control`** directives which are not part of the core HTTP caching standards document.
- **`stale-while-revalidation`** indicates the client will accept a stale response, while asynchronously checking in the background for a fresh one. The _seconds_ value indicates how long the client will accept a stale response. Note that the time does not start at the time of the request itself, but, for example, after `max-age` has elapsed.
- Support for setting `stale-while-revalidate` alongside `max-age` in your `Cache-Control` response header is available in Chrome 75 (https://chromestatus.com/feature/5050913014153216) and Firefox 68(https://bugzilla.mozilla.org/show_bug.cgi?id=1536511).

```
Cache-Control: stale-while-revalidate=<seconds>
```

### Example

When you set the HTTP response header like below, this setting means

```text
Cache-Control: max-age=1, stale-while-revalidate=59
```

- If a request for the time is repeated within the next 1 second, the previously cached value will still be fresh, and used as-is, without any revalidation.
- If a request is repeated between 1 and 60 seconds later, then the cached value will be stale, but will be used to fulfill the API request. At the same time, "in the background," a revalidation request will be made to populate the cache with a fresh value for future use.
- If a request is repeated after more than 60 seconds, then the stale response isn't used at all, and both fulfilling the browser's request and the cache revalidation will depend on getting a response back from the network.

---

#### Reference

- https://web.dev/stale-while-revalidate
- https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control
- https://nextjs.org/blog/next-9-5
