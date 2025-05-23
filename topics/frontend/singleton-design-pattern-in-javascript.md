---
title: Singleton design pattern in Javascript
description: The Singleton design pattern is a design pattern that restricts the instantiation of a class to one object.
date: 2022-10-16
authors:
  - chinhld12
github_id: chinhld12
tags:
  - design-pattern
  - frontend
redirect:
  - /s/z4FQCQ
---

## Overview

For global state management in some frameworks like ReactJs; we already have Redux, React Context, Recoil, and Mobx... for handling that. But if we only need the vanilla javascript for handling specific state and avoid using the library to manage the state (like minimizing the bundle-size, avoid on creating too many instances...), we can use the help of design patterns.

## What is the Singleton Design Pattern?

![](assets/singleton-design-pattern-in-javascript_singleton-pattern.webp)

Singleton design pattern is the pattern in that we only create one static instance of the class.

Which can be accessed in all components, and functions without recreating or conflicting the instances.

### Example

```javascript
// Filename: singleton.js

class MyNameClass {
  constructor() {
    this._name;
  }

  set name(value) {
    this._name = value;
  }

  get name() {
    return this._name;
  }
}

const Singleton = function () {
  let instance;

  function createInstance() {
    return new MyNameClass();
  }

  return {
    getInstance: function () {
      if (!instance) {
        instance = createInstance();
      }
      return instance;
    },
  };
};

export const singleton = Singleton();
```

The `createInstance` function for creating the instance of `MyNameClass`.

When requested the instance from `MyNameClass`, the method `getInstance` will be invoked. In the `getInstance` method only creating new `MyNameClass` when the instance of the class is not created and return the created instance.

```javascript
// Filename: index.js

import { singleton } from "./Singleton";

function main() {
  const instanceOne = singleton.getInstance();
  instanceOne.name = "John Doe";

  const instanceTwo = singleton.getInstance();
  console.log("The second instance with name: ", instanceTwo.name);
  // Output - The second instance with name: John Doe

  console.log("Is same instance? ", instanceOne === instanceTwo);
  // Output - Is same instance?  true
}

main();
```

- At first we assign `instanceOne` variable with the instance returned from the `singleton.getInstance()`
- Then we set the `name` from `instanceOne` with value is `John Doe`
- After that, we create another constant `instantTwo` with the `singleton` object again.
- This time we will make a compare from the value to the instance, from the output that we can see the `name` from `instanceTwo` is same as the value we already set from `instanceOne` (is `John Doe` and is not `undefined` value), and both instance is the same with the returned is `true`.

## Pros and cons

### Pros

- You can be sure that a class has only a single instance.
- A global access point to that instance.
- The singleton only initialized once.

### Cons

- The Singleton is violate to the Single Responsibility Principle, via the SRP definition that a class only should only have one responsibility. But with the singleton pattern, it can carry too many responsibilities at the same time, this can make a deadlock when used in concurrency / multi-threads.
- The singleton design is getting us difficult to write the unit test.

## Conclusion

With the only initialized once and can use in the global context, the singleton design pattern is very useful for some specific cases where we only need to store the data that using in the global and fewer changes like database connection, user profile account config...
