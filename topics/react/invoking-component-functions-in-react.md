---
title: Invoking component functions in React
description: What happens if you invoked the component function directly in React?
date: 2023-01-09
authors:
  - namtrhg
tags:
  - components
  - frontend
  - hooks
  - react
redirect:
  - /s/xydlww
---

**What happens if you invoked the component function directly in React?:
Let's take a look at this example:**

```javascript
const ExampleComponent = () => {
  const [input, setInput] = useState("");
  //do something here
};

export const App = () => {
  const [show, setShow] = useState(false);
  return (
    <div>
      <button onClick={() => setShow(!show)} />
      {show && ExampleComponent()}
    </div>
  );
};
//This will trigger error "Render more hooks than during the previous render"
//Solution: use <ExampleComponent /> instead
```

**So why does this happen?**

- By doing so, you are essentially integrating ExampleComponent and App into a super component and treating ExampleComponent as a custom hook that is executed immediately before the return statement, which means that whenever some states in ExampleComponent change, the entire App re-renders.

- The first time the App renders, the show state is false therefore the ExampleComponent doesn't render and only use 1 hook.

- When we click the button, the show state is true which makes the ExampleComponent render and trigger the second hook in the ExampleComponent which violates [React rule of hooks](https://reactjs.org/docs/hooks-rules.html).

**How to avoid it?**

- Use React Component Syntax <ExampleComponent /> which translate into React.createElement(ExampleComponent, null) making the properties of that component in the VDOM tree controlled by the ExampleComponent.
