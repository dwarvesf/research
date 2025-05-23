---
title: An introduction to atomic CSS
description: This article provides an overview of Atomic CSS, including its definition, variations, purposes, and how it compares to other CSS approaches.
date: 2022-10-13
authors:
  - ngolapnguyen
github_id: ngolapnguyen
tags:
  - atomic-css
  - css
  - frontend
redirect:
  - /s/htEAsg
---

## Definition

A definition to Atomic CSS:

> Atomic CSS is the approach to CSS architecture that favors small, single-purpose classes with names based on visual function.

Some might also call it Functional CSS, or [CSS utilities](https://designsystem.digital.gov/utilities/). Basically, you can say an Atomic CSS framework is a collection of the CSS like these:

```css
.m-0 {
  margin: 0;
}

.text-red {
  color: red;
}
```

We have quite a few utilities-first CSS framework like [Tailwind CSS](https://tailwindcss.com/), [Windi CSS](https://windicss.org/) and [Tachyons](https://tachyons.io/), etc. And there are also some UI libraries that come with some CSS utilities as the complement to the framework, for example [Bootstrap](https://getbootstrap.com/docs/5.1/utilities/api/) and [Chakra UI](https://chakra-ui.com/docs/features/style-props).

## Variations

### Static

Similar to how we write normal CSS, we define a unit-based design system for spacing, color, typography, etc. Take a look at these default utility classes from Tailwind:

```css
# 1 unit ~ 0.25rem .m-4 {
  margin: 1rem;
}

.m-8 {
  margin: 2rem;
}
```

**Advantages**

- Easy to set up and use.
- Immutable styles that speak for themselves (by good naming convention).

### Programmatic

This style involves using a build tool to automatically generate styles based on what it finds in the HTML.

For example, given this:

```html
<div class="Bgc(#0280ae) C(#fff) P(20px)">Lorem ipsum</div>
```

The following CSS would be generated:

```css
.Bgc\(#0280ae\) {
  background-color: #0280ae;
}
.C\(#fff\) {
  color: #fff;
}
.P\(20px\) {
  padding: 20px;
}
```

Another example would be Tailwind's JIT mode:

```html
<div className="bg-[#FFF] font-[24px]">...</div>
```

**Advantages**

- Easy to use.
- Stylesheets generated during the build process are fully optimized with no unused styles.
- Much more flexible & spontaneous (... just like inline style).

## Purposes

### Atomic CSS keeps things simple

- Classes are immutable. They only do one thing.
- Naming is straight forward. It's easy to tell what a class does at a glance.
- Using a utility class in an HTML file is unambiguous - we know what we are changing, without concern of breaking something, somewhere else.
- Easy to pick-up without diving too deep into actual stylesheets.

### Atomic CSS keeps things consistent

- Unit-based so styles are consistent & scalable. Let's look into how Tailwind setup their default styles again:
  - `m-4 -> margin: 1rem`, `m-8 -> margin: 2rem` -> 1 unit ~ 0.25rem. With this, when we see `m-40`, we can easily deduce that it's `10rem`.
- Designs that follow an atomic system will be easier for developers to implement.
  - An offset of 1 or 2 pixels while dragging components around in Figma might be neglectible, but applying those styles to the app will bloat it with "magic numbers" that feel random & irrelevant.
  - With designers & developers agreeing on a common styling system, developers still know what they have to use when encountering "magic numbers" in the design. They can see a `padding: 63px` and know the designers actually meant `padding: 64px` (divisible by 4).

### Atomic CSS is not inline styles

Inline styles have long been deemed a bad practice, and many people dislike Atomic CSS because they think _it shares the same suffer with inline styles_.

Here’s an example:

> What if we want to change everything with a `.black` class to be navy instead?

An easy solution would be finding all instances of `.black` with our Text Editor and replace them manually. However, it's a _tedious_ deed, and exactly what is frowned upon by the community. People value _reusability_.

**But we do have reusability with Atomic CSS** (along with many other things).

#### Reusability

Reusability of Atomic CSS comes from the way we use them. With libraries such as React, it's easy to define a _reusable_ component, with all the styles bundled inside. Now changing the color of a widely-used button is a one-line operation:

```jsx
export const CommonButton = () => {
  return (
    <button type="button" className="bg-primary">
      Button
    </button>
  );
};
```

Combining with suitable tools, we can make it even more flexibile:

```jsx
import { css } from "@linaria/core";

const reusableButtonClassName = css`
  @apply p-2 rounded bg-white font-base border-secondary;
  line-height: 1;

  @screen md {
    @apply font-xl;
  }
`;

const reusableActiveButtonClassName = css`
  @apply border-primary;
`;

export const CommonButton = ({ isActive }) => {
  return (
    <button
      type="button"
      className={[
        "reusableButtonClassName",
        isActive && "reusableActiveButtonClassName",
      ]}
    >
      Button
    </button>
  );
};
```

As you can see, we are utilizing the strength of both Atomic CSS and [[CSS in JS]].

#### Abstraction

With atomic classes, it is possible to create abstractions that would be impossible with inline styles.

```html
<p style="font-family: helvetica; color: rgb(20, 20, 20)">
  Inline styles suck.
</p>
<p class="helvetica rgb202020">Badly written CSS isn't very different.</p>
<p class="sans-serif color-dark">Utility classes allow for abstraction.</p>
```

The first two examples shown above would require a manual find-and-replace in order to update styling were the design to change. The styles in the third example can be adjusted in a single place within a stylesheet.

#### Tooling

Sass, Less, PostCSS, Autoprefixer… The CSS community has created a lot of useful tools that weren’t available for inline styles.

#### Brevity

Rather than writing out verbose inline styles, atomic classes can be terse abbreviations of declarations. It’s less typing: `mt-0` vs `margin-top: 0`, `flex` vs `display: flex`, etc.

#### Specificity

Inline styles have the 2nd highest level of specificity (only less than `!important`) .The lower specificity of atomic classes compared to inline styles is a good thing. It allows more versatility.

#### Possibilities

Utility classes can do things inline styles can't.

Inline styles do not support media queries, pseudo selectors, `@supports`, or CSS animations. Perhaps you have a single hover effect you want to apply to disparate elements rather than to only one component.

```css
.circle {
  border-radius: 50%;
}

.hover-radius-0:hover {
  border-radius: 0;
}
```

Simple reusable media query rules can also be turned into a utility class. Its common to use a classname prefix for small, medium and large screen sizes. Here is an example of a flexbox class that will only apply on medium and large screen sizes:

```css
@media (min-width: 600px) {
  .md-flex {
    display: flex;
  }
}
```

## Atomic CSS is not all or nothing

There's no doubt CSS utilities can cover a lot of common use-cases, but it's not all we need. There are plenty of cases where utility classes aren’t the best option:

- If you need to change a lot of styles for a particular component inside of a media query.
- If you want to change multiple styles conditionally during run-time, based on a component's state.

Refer back to [this section](#Reusability) for a sample scenario. Utility classes can coexist with other approaches. It's just a good idea to define base styles and sane defaults globally.

## References

- https://antfu.me/posts/reimagine-atomic-css
- https://css-tricks.com/growing-popularity-atomic-css/
- https://css-tricks.com/lets-define-exactly-atomic-css/
