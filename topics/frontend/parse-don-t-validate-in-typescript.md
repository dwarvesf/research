---
title: "Parse, don't validate in TypeScript"
description: 'The "parse, don''t validate" approach is about processing incoming data and failing in a controlled manner if parsing fails.'
date: 2023-01-05
authors:
  - namtrhg
github_id: namtrhg
tags:
  - frontend
  - typescript
  - validation
redirect:
  - /s/eMtyRw
---

The _**"parse, don't validate"**_ approach is all about processing incoming data and failing in a controlled manner if parsing fails. It is all about leveraging trustworthy, secure, and typed data structures within your code and ensuring that all incoming data is handled at the very edges of your systems. Instead of passing receiving data deep into your code, parse it immediately and fail quickly if necessary.

Parsing is better than validation because it requires you to explicitly handle every incoming data. It provides a type-safe method of working and makes it difficult to spread harmful material throughout your apps and data storage. However, it is true that parsing frequently incorporates data validation.

## Overview

### What is parsing?

- **Parsing** is the process of analyzing a string or symbol either in natural language, computer languages or data structures, conforming to the rules of a formal grammar.
- The **"_process of analyzing_"** and **"_conforming to the rules of a_ [_thingy_]"** are crucial here. _Thingy_ is our schema and type, which in this instance may be thought of as forming our _formal grammar_ (don't worry if you don't know what it means). _Process of analyzing_ is the work our code does when trying to fit data to the schema & type. The reason why we are saying “schema & type” is that we want them somehow to be the same thing, instead of two separate things that may or may not be in sync.

### Examples in TypeScript with yup

#### Example

```ts
import * as yup from "yup";

let schema = yup.object().shape({
  name: yup.string().required(),
  age: yup.number().required().positive().integer(),
  email: yup.string().email(),
});
// data from an API, from user, etc. Note that the type would be `any`
// (or perhaps `unkown`) as we don't really know what it looks like
// if it comes from outside
const data: any = {
  name: "jimmy",
  age: 24,
};
// check validity
schema.isValid(data).then(function (valid) {
  console.log("isValid?", valid); // => true
  // do something with the data, however, it's still `any`/`unkown`....
});
```

We still don't have a _type_ for our 'data,' as you can see. It remains 'any/unknown'. Sure, we can typecast it, but it introduces a problem: we now have to maintain a'schema' and a 'type' separately, by hand, with nothing ensuring they match.

#### Example with Typecast

```ts
let userSchema = yup.object().shape({
  name: yup.string().required(),
  age: yup.number().required().positive().integer(),
  email: yup.string().email(),
});

type UserType = {
  name: string;
  age: number;
  email: string;
};
// check validity
schema.isValid(data).then(function (valid) {
  const user = data as UserType; // it's valid so let's cast!
});
```

Still, how can you ensure that 'userSchema' and 'UserType' are in sync? Do they even stand for the same thing?

#### Example with parsing function

```ts
// Let's use some custom type aliases for readability
type PositiveInteger = number;
type Email = string;
type URL = string;
// Type guards to validate invidiual values, fields
const isPositiveInteger = (x: any): x is PositiveInteger =>
  yup.number().required().positive().integer().isType(x);
const isEmail = (x: any): x is Email =>
  yup.string().required().email().isType(x);
const isString = (x: any): x is string => yup.string().required().isType(x);
// UserType again, now with our custom type aliases
type UserType = {
  name: string;
  age: PositiveInteger;
  email?: Email;
};
/**
parse, don't validate
compiler can help us quite a bit here to make sure the parsing
is actually correct
*/
const parseToUserType = (x: any): UserType | Error => {
  let { name, age, email, website, createdOn } = x;
  if (!isString(name)) return new Error("invalid name");
  if (!isPositiveInteger(age)) return new Error("invalid age");
  email = isEmail(email) ? email : undefined; // optional, silently drop invalid values
  return { age, name, createdOn, email, website };
};
// Business logic is pretty awesome now!
function myHandler(): Response {
  const userType: UserType | Error = parseToUserType(data);

  if (userType instanceof Error) return { error: "Ohh there was a 400 error" };
  // use UserType normally, do what ever you want
  return { message: `Welcome, ${userType.name}` };
}
```

- Business logic can now parse any data to `UserType`. \_Just remember to check whether there’s an Error or not.
- We are using more precise types than `string` or `number`\_ due to how type aliases work.
- The error-prone, dangerous, not-that-well-type-checked code is limited to type guards.
- TS compiler makes sure our parser actually works. _We can safely write our_`_(x: any) => UserType | Error` parser function with good support from the type checker.

### Reference

https://lexi-lambda.github.io/blog/2019/11/05/parse-don-t-validate/ https://en.wikipedia.org/wiki/Parsing https://itnext.io/parse-dont-validate-incoming-data-in-typescript-d6d5bfb092c8
