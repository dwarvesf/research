---
title: null
description: null
date: null
tags:
  - nextjs
redirect:
  - /s/1KoBqw
---

After Googling, I've come up with a solution

Nextjs has a feature called `Rewrites`. Rewrites allows us to map an income request for a different destination request path. We're going to Rewrite it as below:

````async rewrites() {
    return [
      {
        has: [
          {
            type: "host",
            value: "(?<host>.*)",
          },
        ],
        source: "/",
        destination: "/hosts/:host",
      }
    ];
  },```
After applying Rewrite, every time a user logs in `<username>.example.com` => The request will be rewritten as `example.com/hosts/<username>`, we can also use `getStaticProps`  (SG mechanism) to get a `username` => Query user info => Render html. => Improve performance

P/s: This post refers to Next.js users. So for non-Next.js, it might be hard to understand. I found this a very interested topic to note down. I figure it might make a good reference.

---

#### Reference

- https://nextjs.org/docs/basic-features/data-fetching
- https://nextjs.org/docs/api-reference/next.config.js/rewrites
````
