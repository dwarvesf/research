---
title: UseEffect double calls in React 18
description: "In the React 18 version, the `useEffect` hook has been updated to called twice compare to only one in the older version in StrictMode."
date: 2022-06-11
authors:
  - namtrhg
tags:
  - frontend
  - react
  - use-effect
redirect:
  - /s/F26_ug
---

In the React 18 version, the `useEffect` hook has been updated to called twice compare to only one in the older version in StrictMode.

### What are the changes and why?

- Beginning with React 18, when in development mode, the components will be mounted, unmounted, and then mounted once again in StrictMode.
- In the future, React would support a functionality that allows React to add and remove sections of the UI while maintaining state in the future. For example, when a user back history from a screen and then revisit it, React should be able to show the previous screen right away. React would do this by un-mounting and re-mounting trees with the same component state as before.
- This functionality will improve the performance of React projects out of the box, but necessitate components to be resilient to effects being mounted and un-mounted several times. The majority of effects will operate as-is, however some will presume they are only mounted or destroyed once (which means the new behavior might cause trouble for the existing use of useEffect that intends to trigger mount and unmount once).
- React 18 adds a new development-only check in StrictMode to identify these issues. After a component mounts for the first time, this new check will immediately unmount and remount it, restoring the previous state on the second mount.

### What are the differences?

- In React 17 the useEffect hook gets call every time the component is mounted.
- In React 18 each component is mounted, then unmounted, and then remounted and an useEffect call with no dependencies will be run double-time in strict mode.

### Example of useEffect in React 18

We can confirm the behavior by using the cleanup function of the useEffect hook.

```js
useEffect(() => {
  console.log("Hello Dwarves!");
  return () => console.log("Cleanup..");
}, []);
```

The output to the console should look like this:

```sh
Hello Dwarves!
Cleanup..
Hello Dwarves!
```

**Solution**

Embrace the double-firing and make sure your clean up function works (so double-firing in development doesn't hurt).

**Get around (not recomended)**

You can create a custom hook so that the useEffect get called only once, although this approach can cause leaks and overall not the best practice in engineering.

```ts
export const useEffectOnce = (effect: () => void | (() => void)) => {
  const destroyFunc = useRef<void | (() => void)>();
  const effectCalled = useRef(false);
  const renderAfterCalled = useRef(false);
  const [val, setVal] = useState<number>(0);

  if (effectCalled.current) {
    renderAfterCalled.current = true;
  }

  useEffect(() => {
    // only execute the effect first time around
    if (!effectCalled.current) {
      destroyFunc.current = effect();
      effectCalled.current = true;
    }

    // this forces one render after the effect is run
    setVal((val) => val + 1);

    return () => {
      // if the comp didn't render since the useEffect was called,
      // we know it's the dummy React cycle
      if (!renderAfterCalled.current) {
        return;
      }
      if (destroyFunc.current) {
        destroyFunc.current();
      }
    };
  }, []);
};
```

#### Reference

- https://reactjs.org/blog/2022/03/29/react-v18.html#new-strict-mode-behaviors
- https://www.techiediaries.com/react-18-useeffect/
- https://dev.to/ag-grid/react-18-avoiding-use-effect-getting-called-twice-4i9e
