---
title: null
description: null
date: null
tags:
  - elixir
redirect:
  - /s/Z82WTQ
---

Just to clarify the naming, they are both functions. One is a named function and the other is an anonymous one. But you are right, they work somewhat differently and I am going to illustrate why they work like that.

Let's start with the second, `fn`. `fn` is a closure, similar to a `lambda` in Ruby. We can create it as follows:

```erlang
x = 1
fun = fn y -> x + y end
fun.(2) #=> 3
```

A function can have multiple clauses too:

```erlang
x = 1
fun = fn
  y when y < 0 -> x - y
  y -> x + y
end
fun.(2) #=> 3
fun.(-2) #=> 3
```

Now, let's try something different. Let's try to define different clauses expecting a different number of arguments:

```erlang
fn
  x, y -> x + y
  x -> x
end
** (SyntaxError) cannot mix clauses with different arities in function definition
```

Oh no! We get an error! We cannot mix clauses that expect a different number of arguments. A function always has a fixed arity.

Now, let's talk about the named functions:

```erlang
def hello(x, y) do
  x + y
end
```

As expected, they have a name and they can also receive some arguments. However, they are not closures:

```erlang
x = 1
def hello(y) do
  x + y
end
```

This code will fail to compile because every time you see a `def`, you get an empty variable scope. That is an important difference between them. I particularly like the fact that each named function starts with a clean slate and you don't get the variables of different scopes all mixed up together. You have a clear boundary.

We could retrieve the named hello function above as an anonymous function. You mentioned it yourself:

```erlang
other_function(&hello(&1))
```

And then you asked, why I cannot simply pass it as `hello` as in other languages? That's because functions in Elixir are identified by name **and** arity. So a function that expects two arguments is a different function than one that expects three, even if they had the same name. So if we simply passed `hello`, we would have no idea which `hello` you actually meant. The one with two, three or four arguments? This is exactly the same reason why we can't create an anonymous function with clauses with different arities.

Since Elixir v0.10.1, we have a syntax to capture named functions:

```erlang
&hello/1
```

That will capture the local named function hello with arity 1. Throughout the language and its documentation, it is very common to identify functions in this `hello/1` syntax.

This is also why Elixir uses a dot for calling anonymous functions. Since you can't simply pass `hello` around as a function, instead you need to explicitly capture it, there is a natural distinction between named and anonymous functions and a distinct syntax for calling each makes everything a bit more explicit (Lispers would be familiar with this due to the Lisp 1 vs. Lisp 2 discussion).

Overall, those are the reasons why we have two functions and why they behave differently.

---

Source: https://stackoverflow.com/questions/18011784/why-are-there-two-kinds-of-functions-in-elixir?rq=1
