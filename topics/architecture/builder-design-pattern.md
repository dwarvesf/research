---
title: Introduce the builder pattern and its use cases
description: Builder, one of the creational patterns, allows user to construct complex object step by step while still maintaining flexibility.
date: 2024-06-10
authors:
  - tuanddd
tags:
  - design-pattern
  - gang-of-four
redirect:
  - /s/L3vacw
---

![](assets/builder-design-pattern.pdf)

## Problem statement

We want to create complex object without worrying too much about the hows, we could use Factory pattern to abstract away those details and just give us the output, but the drawback is you get a fixed same object everytime. There will be cases where you need to tweak some properties of that object to get the desired result, look no further than the Builder pattern.

## Builder design pattern

Create a Builder of the object you wanna build, e.g. QueryBuilder, ButtonBuilder, etc,...

Add methods that act as steps to gradually build your object, this method must return an instance of the builder itself to allow method chainning (not required but a very distinct feature of this pattern).

Have a method that finalizes and output the actual object, conventionally it's called "build()".

Let's say we to build a Drink object, consider the following example of a DrinkBuilder class:

```ts
class DrinkBuilder implements Builder {
  private drink: Drink;
  private name = "";
  private ingredients = [];

  constructor() {}

  name(n: string) {
    this.name = n;
    return this;
  }

  addIngredient(name: string, ml: number) {
    this.ingredients.push({ name, ml });
    return this;
  }

  // where the actual building happens
  mix() {
    return new Drink(this.name, this.ingredients);
  }
}
```

And then we can use it like this:

```ts
new DrinkBuilder()
  .name("JagerBomb")
  .addIngredient("Jagermeister", 30)
  .addIngredient("Redbull", 120)
  .mix();

new DrinkBuilder()
  .name("JagerGrenade")
  .addIngredient("Jagermeister", 30)
  .addIngredient("Tequila", 30)
  .addIngredient("Vodka", 30)
  .addIngredient("Redbull", 50)
  .mix();
```

Notice how by defining each step as method we (the consumer, one that uses the builder) can easily add/skip/modify certain properties of the object, this would all have been hidden away by the Factory class. And the method chaining helps with the readability too.

## Real life examples

jQuery was one of the early pioneers to adopt this pattern in their APIs, those little `$(something).on("click", func).toggle("class")...` is the Builder pattern in action. In fact, the javascript ecosytem is very fond of this pattern, some other libraries that make use of this are:

- [wretch](https://github.com/elbywan/wretch) - a wrapper for native Fetch API with intuitive syntax
- [zod](https://github.com/colinhacks/zod) - a schema validation library
- [Spotify Nodejs wrapper](https://github.com/thelinmichael/spotify-web-api-node) - A wrapper for Spotify's web api
- and many others...

## Pros & cons

Pros:

- Readablity: each step of the builder communicates clearly what it's doing and what parameters it requires.
- Flexibility: the ability to add X, modify Y, skip Z without modifying the internal logic.

Cons:

- For each object that you wanna build, you will need to create a separate Builder class for it, this can quickly become a problem as the codebase grows.

## Reference

- <https://refactoring.guru/design-patterns/builder>
