---
title: Rendering strategies in React
short_title: Rendering strategies
description: React rendering strategies with in-depth coverage of client-side rendering (CSR), server-side rendering (SSR), and static site generation (SSG).
date: 2024-10-29
authors:
  - zlatanpham
tags:
  - react
redirect:
  - /s/wR5AHQ
---

Client-side rendering (CSR), server-side rendering (SSR), and static-site generation (SSG) are three key rendering strategies in modern web development. Each approach has unique advantages and trade-offs, impacting application performance, SEO, and user experience.

### Client-side rendering (CSR)

CSR is the default rendering approach in React applications, where everything from data fetching to rendering happens in the browser. The server delivers a minimal HTML file with a JavaScript bundle, and React takes over from there, rendering the content on the client's side.

#### How it works

- The browser downloads the JavaScript bundle, which contains the React code.
- React builds the UI on the client by executing the JavaScript code.
- Data fetching happens after the page loads, potentially leading to a delay before content appears.

#### Advantages

- **Fast initial deployment**: Easier to deploy and manage since there's no server-rendering setup.
- **Rich interactivity**: Great for SPAs (single page applications) with dynamic, highly interactive UI elements.
- **Simplified development**: Client-side data fetching and rendering simplify development in many scenarios.

#### Disadvantages

- **Initial load time**: Users may experience a blank page or loading spinner until the JavaScript bundle downloads and renders.
- **SEO challenges**: Since the HTML is minimal, search engines may struggle to crawl and index content, although some modern crawlers can render JavaScript.
- **Performance**: Large bundles can lead to slow page load times, especially on low-bandwidth connections.

#### Example in React

In CSR, data fetching happens on the client side, typically using hooks like `useEffect`.

```jsx
import { useState, useEffect } from "react";

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(`/api/users/${userId}`)
      .then((response) => response.json())
      .then((data) => setUser(data));
  }, [userId]);

  return user ? <div>{user.name}</div> : <div>Loading...</div>;
}
```

### Server-side rendering (SSR)

SSR generates HTML on the server for each request. When the user requests a page, the server processes the JavaScript, fetches any necessary data, and returns a fully-rendered HTML page. React components are rendered to HTML strings on the server and sent to the client, where React "hydrates" (attaches event listeners) to the HTML.

#### How it works

- The server generates HTML with the initial content and sends it to the client.
- The client receives a fully-rendered HTML page and hydrates it, enabling interactivity.
- Additional JavaScript for further user interactions loads in the background.

#### Advantages

- **Improved SEO**: The initial HTML page is fully rendered, making it easily crawlable by search engines.
- **Faster time to interactive (TTI)**: The user sees the fully-rendered content sooner, as it doesn't rely solely on client-side JavaScript for initial render.
- **Content accessibility**: Even users on slow networks or with JavaScript disabled can see the initial page content.

#### Disadvantages

- **Server load**: Each request requires the server to render the page, increasing server workload, especially with many requests.
- **Complexity**: Requires server infrastructure and additional setup, which can increase complexity.
- **Hydration time**: The browser still needs to download JavaScript and hydrate the page, which can create a slight delay for interactivity.

#### Example in Next.js

Next.js is a React framework that simplifies SSR. With Next.js, you can use `getServerSideProps` to fetch data and render it on the server.

```jsx
// pages/profile/[id].js

import React from "react";

export async function getServerSideProps(context) {
  const { id } = context.params;
  const res = await fetch(`https://api.example.com/users/${id}`);
  const user = await res.json();

  return { props: { user } };
}

export default function UserProfile({ user }) {
  return <div>{user.name}</div>;
}
```

### Static-site generation (SSG)

SSG generates HTML at build time. Unlike SSR, which renders HTML on each request, SSG pre-renders pages as static files and serves them on request. This is ideal for content that doesn't change frequently, as it combines the benefits of SSR with the speed of serving static files.

#### How it works

- The pages are pre-rendered at build time, creating static HTML files.
- When a user requests a page, the server serves the static HTML directly from a CDN or hosting server.
- Any dynamic content or interactivity can be added client-side, often using JavaScript to fetch data or modify the UI after load.

#### Advantages

- **Fast performance**: Since the pages are static files, they load very quickly from a CDN or server.
- **SEO-friendly**: Like SSR, the static HTML is crawlable by search engines.
- **Low server load**: No need to generate HTML per request, reducing server resources.

#### Disadvantages

- **Less flexibility**: Pages are generated at build time, so content updates require a new build and deployment.
- **Not ideal for highly dynamic content**: SSG is less suitable for frequently changing content, as updates won't appear until the next build.
- **Extra build time**: Large sites can have long build times if each page needs to be generated statically.

#### Example in Next.js

In Next.js, `getStaticProps` generates static pages at build time. This is perfect for content like blog posts or product pages.

```jsx
// pages/posts/[id].js

import React from "react";

export async function getStaticProps({ params }) {
  const res = await fetch(`https://api.example.com/posts/${params.id}`);
  const post = await res.json();

  return { props: { post } };
}

export async function getStaticPaths() {
  const res = await fetch("https://api.example.com/posts");
  const posts = await res.json();

  const paths = posts.map((post) => ({
    params: { id: post.id.toString() },
  }));

  return { paths, fallback: false };
}

export default function Post({ post }) {
  return <div>{post.title}</div>;
}
```

### Comparing CSR, SSR, and SSG

| Feature               | CSR (client-side rendering)                     | SSR (server-side rendering)                             | SSG (static-site generation)                      |
| --------------------- | ----------------------------------------------- | ------------------------------------------------------- | ------------------------------------------------- |
| **Data fetching**     | Client-side (after page load)                   | Server-side (on each request)                           | Server-side (at build time)                       |
| **Rendering**         | Browser                                         | Server for initial, browser for subsequent interactions | Server at build time, browser for interactions    |
| **Best for**          | Highly interactive apps, SPAs                   | SEO-sensitive, frequently updated content               | Static content, rarely changing pages             |
| **SEO**               | Limited SEO (due to initial blank HTML)         | Great SEO (initial HTML contains full content)          | Great SEO (pre-rendered HTML at build time)       |
| **Initial load time** | Depends on bundle size, slower initial load     | Faster initial load, HTML is pre-rendered               | Fastest (serving static files), low latency       |
| **Content freshness** | Real-time updates                               | Real-time updates                                       | Stale until next build                            |
| **Hosting cost**      | Lower hosting cost (only needs a static server) | Higher hosting cost (server processes each request)     | Lower hosting cost (can use CDN for static files) |

### Choosing between CSR, SSR, and SSG

- **CSR** is best for SPAs or applications with highly interactive interfaces that don't rely heavily on SEO, such as dashboards and internal tools.
- **SSR** is suitable for applications that require both SEO and dynamic content, like e-commerce sites or blogs with frequently updated content.
- **SSG** is ideal for static content that doesn't change often, like documentation sites, blog pages, or marketing landing pages.

### Combining CSR, SSR, and SSG

In some cases, applications use a **hybrid approach** to leverage the strengths of each technique. For instance:

- **Next.js** allows you to use SSG for pages with static content, SSR for dynamic pages, and CSR for client-specific interactions.
- **Incremental static regeneration (ISR)** in Next.js enables automatic regeneration of static pages at a specified interval, combining the benefits of SSG and SSR for frequently updated content.

**Example hybrid approach in Next.js**

In this example, we use SSG with ISR for product pages and CSR for interactive features like adding items to a cart.

```jsx
// pages/product/[id].js

import { useState } from "react";

export async function getStaticProps({ params }) {
  const res = await fetch(`https://api.example.com/products/${params.id}`);
  const product = await res.json();

  return { props: { product }, revalidate: 60 }; // ISR: regenerates every 60 seconds
}

export async function getStaticPaths() {
  const res = await fetch("https://api.example.com/products");
  const products = await res.json();

  const paths = products.map((product) => ({
    params: { id: product.id.toString() },
  }));

  return { paths, fallback: "blocking" };
}

export default function Product({ product }) {
  const [cart, setCart] = useState([]);

  const addToCart = () => {
    setCart((prevCart) => [...prevCart, product]);
  };

  return (
    <div>
      <h1>{product.name}</h1>
      <button onClick={addToCart}>Add to Cart</button>
    </div>
  );
}
```

- **SSG with ISR** serves the product page with updated data every 60 seconds.
- **CSR** is used for the cart functionality, allowing client-side interactions without reloading the page.

### Summary

Choosing between CSR, SSR, and SSG depends on your application's needs for SEO, content freshness, interactivity, and performance. In many modern apps, a hybrid approach allows you to take advantage of each strategy where it's most beneficial, creating a fast, SEO-friendly, and interactive experience. Leveraging frameworks like Next.js simplifies managing these different rendering methods in a single React application, making it easier to build performant, user-friendly applications.
