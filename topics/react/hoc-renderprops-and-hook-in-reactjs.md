---
title: Hoc renderprops and hook in Reactjs
description: Learn how to refactor React.js components using HOC, render props, and hooks to create reusable toggle logic that follows the DRY principle and simplifies state management.
date: 2019-04-12
tags:
  - react
redirect:
  - /s/4bnnaw
---

## Introduction

HOC, Render-props, hook are different techniques to create reusable or composable logic in React.js.

Take a look at the use case where we have a button to toggle the visibility of some text:

```javascript
import React, { Component } from 'react';

class App extends Component {
  constructor() {
    super()
    this.state = {
      isTextABCVisbible: true
    }
  }

  togggleTextABC = () => {
    this.setState((state) =>({
      isTextABCVisbible: !state.isTextABCVisbible
    }))
  }

  render() {
    return (
      <div className="App">
        <button onClick={this.togggleTextABC}>Toggle Text ABC Visble</button>
        {this.state.isTextABCVisbible && <h1>ABC</h1>}
      </div>
    );
  }
}

export default App;
view rawApp.js hosted with ❤ by GitHub
```

![](assets/hoc-renderprops-and-hook-in-reactjs_c02d8b16fe8c6c8b864064441c8ac84d_md5.webp)

But if i want to add more text like XYZ and i want another button that toggle the text XYZ, i will have to create visible state for button and the method for toggle its visibility

![](assets/hoc-renderprops-and-hook-in-reactjs_c02d8b16fe8c6c8b864064441c8ac84d_md5.webp)

```javascript
import React, { Component } from 'react';

class App extends Component {
  constructor() {
    super()
    this.state = {
      isTextABCVisbible: true,
      isTextXYZVisible: true
    }
  }

  togggleTextABC = () => {
    this.setState((state) =>({
      ...state,
      isTextABCVisbible: !state.isTextABCVisbible
    }))
  }

  toggleTextXYZ = () => {
    this.setState((state) =>({
      ...state,
      isTextXYZVisible: !state.isTextXYZVisible
    }))
  }

  render() {
    return (
      <div className="App">
        <button onClick={this.togggleTextABC}>Toggle Text ABC Visble</button>
        {this.state.isTextABCVisbible && <h1>ABC</h1>}

        <button onClick={this.toggleTextXYZ}>Toggle Text ABC Visble</button>
        {this.state.isTextXYZVisible && <h1>XYZ</h1>}
      </div>
    );
  }
}

export default App;
view rawApp.js hosted with ❤ by GitHub
```

This work but it’s not DRY. We gonna refactor the code with some methods above that help us write code that doesn’t violate DRY principle.

### Refactor the component with render props

The term “[render prop](https://cdb.reacttraining.com/use-a-render-prop-50de598f11ce)” refers to a technique for sharing code between React components using a prop whose value is a function.
A component with a render prop takes a function that returns a React element and calls it instead of implementing its own render logic.

```javascript
import React, {Component} from 'react'

class Toggle extends Component {
  constructor() {
    super()
    this.state = {
      isToggle: false,
    }
  }

  toggle = () => {
    this.setState(state=>({isToggle:!state.isToggle}))
  }

  render () {
    return this.props.children({ isToggle:this.state.isToggle, toggle:this.toggle })
  }
}

export default Toggle
view rawtoggle.js hosted with ❤ by GitHub
```

What is repetitive methods and states is the state to store component is visibility and the method to toggle that state so we encapsulate it in the render props component and expose it through function render props. Child props is reserve props in react that present any child component nested in side its component.

```javascript
import React, { Component } from 'react';
import Toggle from './Toggle'

class App extends Component {
  render() {
    return (
      <>
        <Toggle>
          {({isToggle, toggle})=>(
            <>
              {isToggle && (<span>ABC</span>)}
              <button onClick={toggle}>toggle</button>
            </>
          )}
        </Toggle>
        <Toggle>
          {({isToggle, toggle})=>(
            // Only here has access to render props's scope
            <>
              {isToggle && (<span>XYZ</span>)}
              <button onClick={toggle}>toggle</button>
            </>
          )}
        </Toggle>
      </>
    );
  }
}

export default App;
view rawApp.js hosted with ❤ by GitHub
```

The cons of this approach is only component inside it’s scope which is its child component has access to its passed data to it’s child components

### Refactor the component using HOC component

A higher-order component (HOC) is an advanced technique in React for reusing component logic. HOCs are not part of the React API,. The are a pattern that emerges from React’s compositional nature.
Concretely, **a higher-order component is a function that takes a component and returns a new component.**
Component return by HOC Component is freely to modified it’s params components by actions such as:

- Wrap it inside different component
- Pass props to it
- …etc

Let’s create HOC component that modify our main component by pass it’s state and.

```javascript
import React, {Component} from 'react'

const withToggle = (C, field) => (
  class C extends Component {
    constructor () {
      super()
      const {field} = this.props
      this.state = {
        [field]: false
      }
    }

    render () {
      const {field} = this.props
      const {Field} = this.state
      const Cprops = {
        [`is${field}Toggle`]: Field,
        [`toggle${field}`]: () => {
          this.setState(state=>({[field]:!state[field]}))
        }
      }
      return <C {...Cprops} {...this.props}/>
    }
  }
)

export default withToggle
view rawwithToggle.js hosted with ❤ by GitHub
```

Component created by withToggle will have state **{field}** which is second parameter passes to withToggle function and method
that will toggle field pass in our component.

```javascript
import React, { Component } from 'react';
import Toggle from './Toggle'
import withToggle from './withToggle'

class App extends Component {
  render() {

    const {isAsdToggle, toggleAsd} = this.props
    const {isDasToggle, toggleDas} = this.props
    return (
      <>

        {isDasToggle && (<span>Das</span>)}
        <button onClick={toggleDas}>toggle</button>

        {isAsdToggle && (<span>Asd</span>)}
        <button onClick={toggleAsd}>toggle</button>

        <Toggle>
          {({isToggle, toggle})=>(
            <>
              {isToggle && (<span>ABC</span>)}
              <button onClick={toggle}>toggle</button>
            </>
          )}
        </Toggle>
        <Toggle>
          {({isToggle, toggle})=>(
            // Only here has access to render props's scope
            <>
              {isToggle && (<span>XYZ</span>)}
              <button onClick={toggle}>toggle</button>
            </>
          )}
        </Toggle>
      </>
    );
  }
}

export default withToggle(withToggle( App, 'Asd' ), 'Das');
view rawApp.js hosted with ❤ by GitHub
```

High-order Component can also wrap other Hoc-order Component as well. The first component inject into our App component:

- state: isAsdToggle, isDasToggle
- method: toggleAsd, toggleDas

While the second inject into first high-order component

- state: isAsdToggle
- method: toggleAsd

![](assets/hoc-renderprops-and-hook-in-reactjs_c02d8b16fe8c6c8b864064441c8ac84d_md5.webp)

### Refactor the component using hook

Hooks are a new addition in React 16.8. They let you use state and other React features without writing a class. You can read more about hook at [https://reactjs.org/docs/hooks-intro.html](https://reactjs.org/docs/hooks-intro.html)

You can create a custom hook that implement toggle state via useState and the method to toggle that state then expose our component outside. **But remember that, custom hook can only be used in functional react.js component.**

```javascript
import {useState} from 'react'

const useToggle = () => {
  const [isToggle, setToggle] = useState(false)
  const toggle = () => setToggle(!isToggle)
  return [isToggle, toggle]
}

export default useToggle
view rawuseToggle.js hosted with ❤ by GitHub
```

useState is a primartive hook that allow to create state in non class component and hook. Its return An array: [state, state’s setter].

```javascript
import React, { Component } from 'react';
import Toggle from './Toggle'
import withToggle from './withToggle'
import useToggle from './useToggle'

const App = (props)  => {
  const [isXzcToggle, toggleXzc] = useToggle()
  const {isAsdToggle, toggleAsd} = props
  const {isDasToggle, toggleDas} = props

  return (
      <>
        {isXzcToggle && (<span>Xzc</span>)}
        <button onClick={toggleXzc}>toggle Xzc</button>

        {isDasToggle && (<span>Das</span>)}
        <button onClick={toggleDas}>toggle Das</button>

        {isAsdToggle && (<span>Asd</span>)}
        <button onClick={toggleAsd}>toggle Asd</button>

        <Toggle>
          {({isToggle, toggle})=>(
            <>
              {isToggle && (<span>ABC</span>)}
              <button onClick={toggle}>toggle Abc</button>
            </>
          )}
        </Toggle>
        <Toggle>
          {({isToggle, toggle})=>(
            // Only here has access to render props's scope
            <>
              {isToggle && (<span>XYZ</span>)}
              <button onClick={toggle}>toggle Xyz</button>
            </>
          )}
        </Toggle>
      </>
 )
}

export default withToggle(withToggle( App, 'Asd' ), 'Das');
view rawApp.js hosted with ❤ by GitHub
```

## Conclusion

Although Hook is the best solution to reduce DRY in react.js application in mine opinion, HOC component and render props is still a viable choice in some specific or edge use case.

Source code repository: [https://github.com/phmngocnghia/demo-hoc-render-props-hook](https://github.com/phmngocnghia/demo-hoc-render-props-hook)
