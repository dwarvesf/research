---
title: Validation with Zod
description: Zod is the TypeScript-first schema validation library with static type inference.
date: 2023-01-17
authors:
  - namtrhg
github_id: namtrhg
tags:
  - parsing
  - frontend
  - typescript
redirect:
  - /s/JkQ1yA
---

**Zod** is the TypeScript-first schema validation library with static type inference. It's functional approach to data validation is [[Parse, don't validate in TypeScript]] which parses the data in order to validate and catch errors.

## Why use Zod?

- **TypeScript support:** Zod has TypeScript support, which lets developers to detect type issues early on, making it easier to discover and repair bugs.
- **Improved data quality:** Developers may guarantee that the data they are working with is in the right format and fulfills particular restrictions by utilizing Zod to validate and coerce input data. This can assist to reduce mistakes and enhance data quality overall.
- **Simplified code:** Developers may easily design and maintain validation code because to Zod's clear and simple syntax for constructing schemas. This can assist to decrease the amount of boilerplate code required and make it easier to reason about the data flowing through an application.
- **Flexibility:** Zod may be used in a number of situations, including online forms, REST APIs, and others. It also allows developers to construct custom validation methods, allowing them to validate data using their own business logic.
- **Lightweight:** Zod is a lightweight library with no external dependencies.
- **Cross-platform:** Zod works in both browser and Node.js, allowing it to be utilized in a wide range of applications and environments.

## How to use Zod

### Example using validate method

```ts
const z = require("zod");

// Define a schema for the input data
const schema = z.object({
  name: z.string(),
  phone_number: z.number().min(0).max(12),
  email: z.string().email(),
});

// Input data to be validated and coerced
const input = {
  name: "Dwarves Foundation",
  phone_number: 123456,
  email: "team@dwarves.foundation",
};

// Validate and coerce the input data
const data = schema.validate(input);
console.log(data);
/*
{
  name: 'Dwarves Foundation',
  phone_number: 123456,
  email: 'team@dwarves.foundation',
}
*/
```

In this example, we define a schema using the Zod library that specifies the types and constraints for the input data. The `schema.validate(input)` function is used to validate and coerce the input data to match the schema. If the input data is valid and meets all the constraints defined in the schema, it will be returned in a proper format, otherwise it will throw an error with the validation issues.

In this case, the input data is an object that has a name, phone number, and email address. According to the standard, the name and email should be strings, and the phone number should be a number between 0 and 12.

It also ensure that the email is valid email.

This way the application can be sure that the data it is receiving is in the correct format, and that any issues with the data will be caught early on.

### Example using parse method

The `parse()` method in the Zod validation library is used to parse and validate input data, and return the parsed data in the correct format. It is similar to the `validate()` method, but it also removes any extra properties from the input data that are not defined in the schema.

```ts
const z = require('zod');

// Define a schema for the input data
const schema = z.object({
  name: z.string(),
  phone_number: z.number().min(0).max(12),
  email: z.string().email(),
});

// Input data to be parsed and validated
const input = {
  name: 'Dwarves Foundation',
  phone_number: 123456
  email: 'team@dwarves.foundation',
  extra_property: 'This should not be included in the output'
};

// Parse and validate the input data
const data = schema.parse(input);
console.log(data);
/*
{
  name: 'Dwarves Foundation',
  phone_number: 123456,
  email: 'team@dwarves.foundation',
}
*/
```

In this example, the input data contains an extra property `extra_property` which is not defined in the schema, it will be removed from the parsed data, resulting in a cleaner object without any unnecessary properties.

`parse()` method is useful when the input data may contain extra properties that are not needed by the application. It also ensures that the input data matches the schema and that any issues with the data will be caught early on.

It's also worth mentioning that, like `validate()`, if the incoming data does not match the schema, `parse()` will throw an exception indicating the validity issues.

## Zod vs Yup

**Zod** and **Yup** are both JavaScript libraries for data validation, but they have some key differences:

- Syntax: Zod and Yup have different syntax for defining schemas. Zod uses a fluent interface with a chainable API, while Yup uses a plain object to define the schema.
- TypeScript support: Zod is built with TypeScript, which means it has excellent typings, making it easy to use in a TypeScript environment. Yup does not have built-in TypeScript support, but it can be used in a TypeScript environment with the use of an additional package.
- Error message: Yup allows to specify custom error messages for each field, which can be useful for displaying error messages to the end-user. Zod, on the other hand, does not provide a way to specify custom error messages.
- Utility functions: Zod provides a number of utility functions such as the ability to extract values from an object based on a schema, and to create an object with default values based on a schema. Yup does not have similar utility functions.
- Performance: Zod is smaller in size and it's faster than Yup, which means it could be a better choice for applications that need to handle a large amount of data validation.
- Popularity: Yup is more popular than Zod because it's been around longer and has a larger community of developers.

Both Zod and Yup are robust validation libraries, and the choice between them is based on your project's specific demands, syntax preference, and the capabilities that you require.

## References

- <https://zod.dev/>
- <https://github.com/jquense/yup>
- <https://blog.logrocket.com/comparing-schema-validation-libraries-zod-vs-yup/>
- <https://blog.logrocket.com/schema-validation-typescript-zod/>
