---
title: JavaScript modules
description: Modules have always been a part of JavaScript development and providing mechanisms for splitting JavaScript programs up into separate modules that can be imported when needed was the absolutely necessity for JavaScript developers.
date: 2022-06-27
authors:
  - namtrhg
github_id: namtrhg
tags:
  - frontend
  - javascript
  - modules
redirect:
  - /s/KQE9AA
---

**Modules** have always been a part of JavaScript development and providing mechanisms for splitting JavaScript programs up into separate modules that can be imported when needed was the absolutely necessity for JavaScript developers.

> "Modules are like building blocks that we can create software by combining."

### So what is a module?

A module is just simply a file that exports its own code.

### Why do we need it?

- Modules gives our code **structure** and **boundaries**. One's code will be hard to organize and maintain if they don't use modules and no one wants all the codes mingling with each others.
- Modules also allow developers share code to the world through a package manager like NPM.

## History of JavaScript's modules

In order to understand about the development of JavaScipt's modules, we need to walk through 4 stages: Vanilla, IIFEs, CommonJS and ESM.

### Vanilla (1990s - early 2000s)

When JavaScript was first invented by Brendan Eich in 1995, it was known to have been created in 10 days and the creator himself doesn't think that his programing language would be as popular as today.

> “No one thought JavaScript would be used at the wide scale it is. Not just reaching lots of people on the Web, but large application like Gmail… To write large code, you don’t just want this little snippet language that I made for beginners…“ Bredan Eich (Creator of JavaScript)

So modules aren't a thing back then, developers would mostly used inline-scripting and script-tags and no one would think of scalability, maintaining a large code base would be a nightmare because there is no structures and organizations.

#### YAHOO manifesto

Around 2006, a global manifesto was raised by a team of UI developers from YAHOO which was **"Global Variable are dangerous"**. The point they trying to make is that using global variable is a risky practice and all the people back then are engaging in. Global variables can spark conflict between naming if there are many people involving in developing the same program and since everyone can access it, it is not very secure.

#### YAHOO Solution?

Create a huge Global namespace object and parse all the variables in that object.

> **Example**: YAHOO.value.getValue

### IIFEs (early to late 2000s)

IFFEs or Immediately invoked function expression was used with closures to keep the private data hidden, basically the ideal is that you only need to care of what the function returns and not what happen inside it.

#### Example

```js
var Dialogue = function () {
  //private variables
  var dialogue;
  //exposed functions
  return {
    hello: function () {
      dialog = "Hello Dwarves!";
      console.log(dialogue);
    },
    goodbye: function () {
      dialog = "Goodbye Dwarves!";
      console.log(dialogue);
    },
  };
};
```

At this stage we have solve the Global namespace pollution problem but we haven't got to the point that we can swapping modules with one another and copy/paste function happens all the time.

### CommonJS (early to mid 2010)

Around 2009, people are hype about the potential of JavaScript, you can now run JavaScript on the server-side. And come with that a proposal was made for JavaScript to have a standard way to include other modules. Node created a module implementations name CommonJS.

#### Implementation of CommonJS:

- **Import**: using `require()` method.
- **Export**: **module** object using `module.exports`.

This was design for server development.

#### Synchronus modules loading

- **MODULE.\_LOAD**: Node caches it's modules (Node check for cache files, if it not there it will create an instance and caches it).
- **MODULE.\_COMPILE**: Create a `require` function that speciffic for each modules and generate a wrapper function to scope variables the run the wrapper function.

#### Node module wrapper function

```js
(function (exports, require, module, __filename, __dirname) {
  // Module code actually lives in here
});
```

#### Example

```js
//dialogue.js
var getDialog (function (){
    console.log("Hello Dwarves!");
})
module.exports = getDialogue;
```

```js
//main.js
const sayHello = require("./dialogue.js");
```

At this time, CommonJs is a real noviation, organizing files and maintaining code has become much easier.

### ESM (2010s - present)

ESM or ES modules was supported by all major browsers and was the first **built-in module** in JavaScript and introduce top-level `await` functionality for module imports.

#### Top-level await

A feature accessible within modules is top level await. This implies that the await keyword is functional. It enables modules to function as sizable asynchronous functions, allowing code to be assessed before usage in parent modules without preventing the loading of siblings.

#### ESM Asynchronus ?

The loading and parsing for ESM modules is indeed asynchronous, but the execution of the code in them is synchronous and serialized based on the order they are imported.

#### Implementation ESM:

- **Import**: using `import` method.
- **Export**: using `export` method.

#### Example

```js
//Export syntax

//dialog.js
export default const dialog = "Hello Dwarves!";

//utils.js
export const getHours = () => //do something;
export const getMinutes = () => //do something;
```

```js
//Import syntax

import dialog from "./dialog.js";

import * as utility from "./utils.js";
import { getHours, getMinutes } from "./utils.js";
```

#### ESM in the browsers

ESM has a specfic module type in the browser which they are processed differently and create a fallback for older browsers using bundle.

```html
<!-- Adding module script -->
<script type="module" src="main.js"></script>
<!-- Fallback for older browsers -->
<script nomodule src="bundle.js"></script>
```

### CommonJS vs ESM

- Right now ESM was supported on all browsers and the latest version of Node except version below version 12.
- ESM waits to execute any code in a module until all of it's imports have been loaded and parsed, then does the binding/side-effects stuff in the relative order that they happen.
- ESM imports are asynchronous (which also allows for top-level `await`).
- CJS executes imports as it finds them, blocking until they finish.
- CJS works in Node but does **not** work in browsers.

### Conclusion

Although CommonJS can still be used for server development since synchronous wasn't an issue and it was built by Node, using ESM is still the better way to keep the syntax consistent if you were to develop client-side and server-side with JavaScript.

#### Reference

- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules
- https://dev.to/adamcoster/commonjs-and-esm-importexport-compatibility-by-simple-example-50pl
- https://www.w3schools.com/js/js_modules.asp
- https://nodejs.org/api/modules.html
- https://www.infoworld.com/article/2653798/javascript-creator-ponders-past--future.html
