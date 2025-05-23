---
title: React 18
description: React 18 was released in March 2022. This release focuses on performance improvements and updating the rendering engine.
date: 2022-06-06
authors:
  - trankhacvy
tags:
  - engineering
  - frontend
  - react
redirect:
  - /s/KCBFeA
---

React 18 was released in March 2022. This release focuses on performance improvements and updating the rendering engine.

## React 18 feature quick guide

Now let's look at each of these updates in more detail.

## Concurrency in React

- Concurrency is not a feature, per se. It’s a new behind-the-scenes mechanism that enables React to prepare multiple versions of your UI at the same time.
- A key property of Concurrent React is that rendering is interruptible. React may start rendering an update, pause in the middle, then continue later. It may even abandon an in-progress render altogether.
- Another example is the reusable state. Concurrent React can remove sections of the UI from the screen, then add them back later while reusing the previous state.

## New React 18 features

### Automatic batching

- Batching is when React groups multiple state updates into a single re-render for better performance. For example, if you have two state updates inside of the same click event, React has always batched these into one re-render.

```plain_text
function App() {
  const [count, setCount] = useState(0);
  const [flag, setFlag] = useState(false);

  function handleClick() {
    setCount(c => c + 1); // Does not re-render yet
    setFlag(f => !f); // Does not re-render yet
    // React will only re-render once at the end (that's batching!)
  }

  return (
    <div>
      <button onClick={handleClick}>Next</button>
      <h1 style={{ color: flag ? "blue" : "black" }}>{count}</h1>
    </div>
  );
}

```

- However, React wasn’t consistent about when it batches updates. For example, if you need to fetch data, and then update the state in the `handleClick` above, then React would not batch the updates, and perform two independent updates.
- Starting in React 18, all updates will be automatically batched, no matter where they originate from. This means that updates inside of timeouts, promises, native event handlers or any other event will batch the same way as updates inside of React events.

```plain_text
function handleClick() {
  setCount(c => c + 1);
  setFlag(f => !f);
  // React will only re-render once at the end (that's batching!)
}

setTimeout(() => {
  setCount(c => c + 1);
  setFlag(f => !f);
  // React will only re-render once at the end (that's batching!)
}, 1000);

fetch(/*...*/).then(() => {
  setCount(c => c + 1);
  setFlag(f => !f);
  // React will only re-render once at the end (that's batching!)
})

```

### What if I don’t want to batch?

- You can use `ReactDOM.flushSync()` to opt out of batching:

```plain_text
import { flushSync } from 'react-dom'; // Note: react-dom, not react

function handleClick() {
  flushSync(() => {
    setCounter(c => c + 1);
  });
  // React has updated the DOM by now
  flushSync(() => {
    setFlag(f => !f);
  });
  // React has updated the DOM by now
}

```

## Transitions

- Transitions allow you to mark updates as transitions, which tells React that they can be interrupted and avoid going back to Suspense fallbacks for already visible content.

```plain_text
import {startTransition} from 'react';

// Urgent: Show what was typed
setInputValue(input);

// Mark any state updates inside as transitions
startTransition(() => {
  // Transition: Show the results
  setSearchQuery(input);
});

```

- Updates wrapped in startTransition are handled as non-urgent and will be interrupted if more urgent updates like clicks or key presses come in. If a transition gets interrupted by the user (for example, by typing multiple characters in a row), React will throw out the stale rendering work that wasn’t finished and render only the latest update.
- `useTransition`: a hook to start transitions, including a value to track the pending state.
- `startTransition`: a method to start transitions when the hook cannot be used.

## Suspense on the server

- Server-side rendering (abbreviated to “SSR” in this post) lets you generate HTML from React components on the server, and send that HTML to your users. SSR lets your users see the page’s content before your JavaScript bundle loads and runs. SSR in React always happens in several steps:
- On the server, fetch data for the entire app.
- Then, on the server, render the entire app to HTML and send it in the response.
- Then, on the client, load the JavaScript code for the entire app.
- Then, on the client, connect the JavaScript logic to the server-generated HTML for the entire app (this is “hydration”).
- The key part is that each step had to finish for the entire app at once before the next step could start. This is not efficient if some parts of your app are slower than others, as is the case in pretty much every non-trivial app.
- React 18 lets you use `<Suspense>` to break down your app into smaller independent units which will go through these steps independently from each other and won’t block the rest of the app. As a result, your app’s users will see the content sooner and be able to start interacting with it much faster. The slowest part of your app won’t drag down the parts that are fast. These improvements are automatic, and you don’t need to write any special coordination code for them to work.

## Strict mode

- Strict Mode is a tool that helps identify coding patterns that may cause problems when working with React, like impure renders.
- React 18 introduces a new development-only check to Strict Mode. This new check will automatically unmount and remount every component, whenever a component mounts for the first time, restoring the previous state on the second mount.
- Before this change, React would mount the component and create the effects:

```plain_text

* React mounts the component.
  * Layout effects are created.
  * Effects are created.

```

- With Strict Mode in React 18, React will simulate unmounting and remounting the component in development mode:

```plain_text

* React mounts the component.
  * Layout effects are created.
  * Effects are created.
* React simulates unmounting the component.
  * Layout effects are destroyed.
  * Effects are destroyed.
* React simulates mounting the component with the previous state.
  * Layout effects are created.
  * Effects are created.

```

## How to upgrade to React 18

- React 18 introduces a new root API which provides better ergonomics for managing roots. The new root API also enables the new concurrent renderer, which allows you to opt-into concurrent features.

```plain_text
// Before
import { render } from 'react-dom';
const container = document.getElementById('app');
render(<App tab="home" />, container);

// After
import { createRoot } from 'react-dom/client';
const container = document.getElementById('app');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<App tab="home" />);

```

## Conclusion

- In a summary, React 18 comes with a few breaking changes, depending on how you use it. But all in all, it also brings out-of-the-box performance improvements including batching more by default, which removes the need to manually batch updates in application or library code.
- Upgrading to React 18 should be straightforward, give it a try and let us know what you think.
