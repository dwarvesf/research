---
title: Applying mock service worker (MSW) for seamless web development
description: Mock Service Worker (MSW) is an API mocking library that leverages the Service Worker API to intercept requests. It offers unique features that set it apart from traditional mocking libraries, making it a go-to choice for developers. With MSW, you can seamlessly mock both RESTful and GraphQL APIs, providing flexibility for various API architectures. Additionally, MSW supports both Node.js and browser environments, enabling consistent API mocking across different parts of your application.
date: 2023-06-19
authors:
  - hthai2201
github_id: hthai2201
tags:
  - api-mocking
  - frontend
  - mock-service-worker
  - web-development-tool
redirect:
  - /s/mi0Rdw
---

## Introduction

Mock Service Worker (MSW) is an API mocking library that leverages the Service Worker API to intercept requests. It offers unique features that set it apart from traditional mocking libraries, making it a go-to choice for developers. With MSW, you can seamlessly mock both RESTful and GraphQL APIs, providing flexibility for various API architectures. Additionally, MSW supports both Node.js and browser environments, enabling consistent API mocking across different parts of your application. Let's explore how MSW empowers developers to reliable web applications by seamlessly working in both Node.js and browser environments

## Applying MSW for API interception in development

MSW operates client-side by using a Service Worker to intercept requests. However, we don't have to write any of the worker's code by ourselves, but rather copy the worker file distributed by the library. This CLI will help us to do that

```bash
npx msw init <PUBLIC_DIR> --save
```

To configure the worker:

```js
// src/mocks/browser.js
import { setupWorker } from "msw";
import { handlers } from "./handlers"; // list of request handlers

// This configures a Service Worker with the given request handlers.
export const worker = setupWorker(...handlers);
```

To start the worker:

```js
// src/index.js
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

if (process.env.NODE_ENV === "development") {
  const { worker } = require("./mocks/browser");
  worker.start();
}

ReactDOM.render(<App />, document.getElementById("root"));
```

Let's consider a scenario where we have an `App` component, as shown in the code snippet below. This component makes an API request, which may not be fully implemented on the backend side, or we might want to test how our component handles in different response data or error responses

```js
// src/App.js
function App() {
  const { data, error } = useFetch("https:/example.com/api/usage");
  if (error) {
    return <div className="error">{error.message}</div>;
  }
  return (
    <div className="App">
      <h1>API mocking example</h1>
      <div>{data.firstName}</div>
    </div>
  );
}
```

Now, we can mock api response by adding MSW handlers

```js
// src/mocks/handlers.js
import { rest } from "msw";

export const handlers = [
  //respond with mock data
  rest.get("https:/example.com/api/usage", (req, res, ctx) => {
    return res(
      ctx.status(301),
      ctx.json({
        id: 1,
        firstName: "Dwarves",
      }),
    );
  }),
  // Alternatively, throw an error
  rest.get("https:/example.com/api/usage", (req, res, ctx) => {
    return res(ctx.status(500), ctx.json({ message: "Internal Server Error" }));
  }),
];
```

This allows us to verify that our component behaves correctly and handles various API responses or errors gracefully, even if the backend is not fully implemented or we want to test different scenarios without relying on the actual API response.

## Applying MSW for React testing

One of the most common use cases for MSW is leveraging its request handlers for integration tests. MSW allows you to seamlessly incorporate mocking into any Node process To configure the server:

```js
// src/mocks/server.js
import { setupServer } from "msw/node";
import { handlers } from "./handlers";

// This configures a request mocking server with the given request handlers.
export const server = setupServer(...handlers);
```

Before running your test, start the MSW server:

```js
beforeAll(() => server.listen());
```

After each test, make sure to clean up by stopping the server and resetting any request handlers that were added on runtime:

```js
afterEach(() => {
  server.resetHandlers();
  cleanup();
});

afterAll(() => server.close());
```

Basic example of an integration test over the `App` component.

```js
import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("passes", async () => {
  render(<App />);

  expect(
    // Expect the mocked response to be present in the DOM.
    await screen.findByText(`Dwarves`),
  ).toBeInTheDocument();
});
```

you also can add additional handlers during runtime to handle different scenarios in different tests. Here's an example:

```js
test("handle error responses", async () => {
  render(<App />);
  // a runtime handler which
  server.use(
    rest.get("https:/example.com/api/usage", (req, res, ctx) => {
      return res(ctx.json({ message: "Internal Server Error" }));
    }),
  );
  const errorElement = screen.getByText("Internal Server Error", {
    className: "error",
  });
  expect(errorElement).toBeInTheDocument();
});
```

The `server.use` function allows us to add a runtime handler to our mock server. However, it's important to note that any handlers added in runtime will be removed when `server.resetHandlers()` is called.

## Reference

- [Mocking API servers with mock service worker (MSW)](https://blog.openreplay.com/mocking-api-servers-with-mock-service-worker-msw/)
- [MSW documentation](https://mswjs.io/docs/)
