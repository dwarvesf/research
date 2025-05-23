---
title: null
description: null
date: null
tags:
  - micro-frontend
redirect:
  - /s/W9entg
---

### What is Micro-frontend?

An architectural style where independently deliverable frontend applications are composed into a greater whole

**Benefits**

- Smaller, more cohesive and maintainable codebases
- More scalable organisations with decoupled, autonomous teams
- The ability to upgrade, update, or even rewrite parts of the frontend in a more incremental fashion than was previously possible
- Easier maintenance: Keeping frontend repositories small and specialized allows them to be more easily understood, and this simplifies long-term maintenance and testing.

### Micro-Frontend in actions

#### Build-time integration

- Publish each micro frontend as a package and have the container application include them all as library dependencies.

```js
{
  "name": "@shop/container",
  "version": "1.0.0",
  "description": "E-commercial website",
  "dependencies": {
    "@shop/products": "^1.0.0",
    "@shop/order": "^1.0.0",
    "@shop/user-profile": "^1.0.0"
  }
}
```

Cons

- Have to re-compile and release every single micro frontend in order to release a change to any individual part of the product.

#### Run-time integration via iframes

- Use iframe to connect other micro frontends.

```html
<html>
  <head>
    <title>Shop</title>
  </head>
  <body>
    <h1>Welcome to Shop</h1>

    <iframe id="app-container"></iframe>

    <script type="text/javascript">
      const microFrontendsByRoute = {
        "/": "https://products.shop.com/index.html",
        "/order": "https://order.shop.com/index.html",
        "/user-profile": "https://profile.shop.com/index.html",
      };

      const iframe = document.getElementById("app-container");
      iframe.src = microFrontendsByRoute[window.location.pathname];
    </script>
  </body>
</html>
```

Cons

- Difficult to make page responsive
- Difficult to integrate between different parts of application, make routing, history, and deep-linking more complicated

#### Run-time integration via JavaScript

- Each micro frontend is included onto the page using a `<script>` tag, and upon load exposes a global function as its entry-point. The container application then determines which micro frontend should be mounted, and calls the relevant function to tell a micro frontend when and where to render itself.

```html
<html>
  <head>
    <title>Shop</title>
  </head>
  <body>
    <h1>Welcome to Shop</h1>

    <!-- These scripts don't render anything immediately -->
    <!-- Instead they attach entry-point functions to `window` -->
    <script src="https://products.shop.com/bundle.js"></script>
    <script src="https://order.shop.com/bundle.js"></script>
    <script src="https://profile.shop.com/bundle.js"></script>

    <div id="app"></div>

    <script type="text/javascript">
      // These global functions are attached to window by the above scripts
      const microFrontendsByRoute = {
        "/": window.renderProducts,
        "/order": window.renderOrder,
        "/user-profile": window.renderUserProfile,
      };
      const renderFunction = microFrontendsByRoute[window.location.pathname];

      // Having determined the entry-point function, we now call it,
      // giving it the ID of the element where it should render itself
      renderFunction("app");
    </script>
  </body>
</html>
```

#### Run-time integration via Web Components

- Define each micro frontend as an HTML custom element for the container to instantiate.

```html
<html>
  <head>
    <title>Shop</title>
  </head>
  <body>
    <h1>Welcome to Shop</h1>

    <!-- These scripts don't render anything immediately -->
    <!-- Instead they each define a custom element type -->
    <script src="https://products.shop.com/bundle.js"></script>
    <script src="https://order.shop.com/bundle.js"></script>
    <script src="https://profile.shop.com/bundle.js"></script>

    <div id="app"></div>

    <script type="text/javascript">
      // These element types are defined by the above scripts
      const webComponentsByRoute = {
        "/": "micro-frontend-products",
        "/order": "micro-frontend-order",
        "/user-profile": "micro-frontend-user-profile",
      };
      const webComponentType = webComponentsByRoute[window.location.pathname];

      // Having determined the right web component custom element type,
      // we now create an instance of it and attach it to the document
      const root = document.getElementById("app");
      const webComponent = document.createElement(webComponentType);
      root.appendChild(webComponent);
    </script>
  </body>
</html>
```

Cons

- Don't support server-side rendering
- No 100% browser support

#### Cross-application communication

1. [Custom event](https://developer.mozilla.org/en-US/docs/Web/Events/Creating_and_triggering_events)
2. Cross-application communication via routing

#### Serverside rendering / universal rendering

- Server-side rendering is always tricky problem.
- Use [Server Side Includes](https://en.wikipedia.org/wiki/Server_Side_Includes) to plug in page-specific content from fragment HTML files:

#### Cons of micro-frontend

- Duplication of dependencies => increase payload size
- App performance
- Learning curve
- Only suitable for medium, large projects

---

#### Reference

- https://micro-frontends.org/
- https://martinfowler.com/articles/micro-frontends.html
- https://www.tomsoderlund.com/programming/micro-frontends-a-microservice-approach-to-front-end-web-development
- https://github.com/ChristianUlbrich/awesome-microfrontends
