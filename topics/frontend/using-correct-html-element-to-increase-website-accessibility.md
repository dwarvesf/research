---
title: Using correct Html element to increase website accessibility
description: Using the correct HTML element can significantly improve the accessibility of your website.
date: 2019-08-23
authors:
  - zlatanpham
tags:
  - accessibility
  - frontend
  - html
redirect:
  - /s/jZd5rQ
---

## Website accessibility

Website accessibility is a term for approaching a website of which the potential user are people with disabilities (eye disorders or illiterate). This audience type can’t be able to approach a visualize website. They must depend on keyboard or Screen Reader supporting tool instead.

Website accessibility is also a factor to evaluate the website quality of Google Lighthouse. Developers can enhance the accessibility of a website by categorizing the current elements, as long as the reader system can identify and have those elements delivered to readers.

## Why we need to use the correct HTML

For example, a control button to play a video on your site could be marked up like this:

```javascript
<div>Play video</div>
```

But as you'll see in greater detail later on, it makes sense to use the correct element for the job:

```javascript
<button>Play video</button>
```

Not only do HTML `<button>`s have some suitable styling applied by default (which you will probably want to override), they also have built-in keyboard accessibility — users can navigate between buttons using the Tab key and activate their selection using `Return` or `Enter`.

Semantic HTML doesn't take any longer to write than non-semantic (bad) markup if you do it consistently from the start of your project. Even better, semantic markup has other benefits beyond accessibility:

1. **Easier to develop with** — as mentioned above, you get some functionality for free, plus it is arguably easier to understand.
2. **Better on mobile** — semantic HTML is arguably lighter in file size than non-semantic spaghetti code, and easier to make responsive.
3. **Good for SEO** — search engines give more importance to keywords inside headings, links, etc. than keywords included in non-semantic `<div>`s, etc., so your documents will be more findable by customers.
