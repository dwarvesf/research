---
title: Build polymorphic React components with Typescript
description: This article provides a step-by-step guide on how to build polymorphic React components with Typescript, covering the necessary concepts and techniques to create flexible and reusable components.
date: 2022-09-26
authors:
  - trankhacvy
github_id: trankhacvy
tags:
  - frontend
  - polymorphic-component
  - react
  - typescript
redirect:
  - /s/l49I2g
---

Let's say we want to create a `Text` component with React and Typescript. A basic implementation could look like:

```typescript
import React from 'react'

type TextProps = {
  children: React.ReactNode
  size?: 'sm' | 'md' | 'lg'
  color?: 'default' | 'primary' | 'secondary'
  className?: string
}

const Text = ({ children, className, size, color }: TextProps) => {
  // hooks to return CSS class base on component props
  const classes = useGetClasses('Text', { size, color })

  return <p className={clsx(classes, className)}>{children}</p>
}
```

This component works for simple use-cases but if we care about semantic HTML (use HTML heading tags to display titles or subtitles, `<p/>` for paragraph) it doesn't help. We need to adjust the above implementation by adding a `as` (you can name it anything you like) property to determine which tag we want to render.

```typescript
type TextProps = {
    children: React.ReactNode
    as?: any // We don't know the type of this property yet
}

const Text = ({ children, as, ...rest }: TextProps) => {
    // other code
    ...

    const Component = as || 'p';

    return (
        <Component {...rest}>{children}</Component>
    )
}

// Usage
// display with h1 tag
<Text as='h1'>Title</Text>
// display with p tag
<Text as='p'>Long paragraph</Text>
```

Our `Text` component works as expected but these are some couple of issues:

- `as` property is `any` so we can pass anything we want even invalid tag.
- We want to pass more attributes which belong to the HTML tag we provide

```typescript
<Text as="label" htmlFor="username">
  Username
</Text>
```

To fix the first issue, we need `as` only accepts a valid React element type. Fortunately, we can achieve this by using : `React.ElementType`. Update the implementation:

```typescript
import React from 'react';

type TextProps<C extends React.ElementType> = {
  children: React.ReactNode;
  as?: C;
  // other properties
};

const Text = <C extends React.ElementType>({ children, as }: TextProps<C>) => {
  // other code
    ...

  const Component = as || 'p';

  return <Component>{children}</Component>;
};
```

Now typescript will complain if you try to pass an invalid html tag

```typescript
// It's ok
<Text as='p'>Hello world</Text>
// Error!!!! Type '"vincenzo"' is not assignable to type 'ElementType<any> | undefined'
<Text as='vincenzo'>Hello world</Text>
```

To solve second issue, once again, React provides us a useful type `React.ComponentPropsWithoutRef`.

```typescript
type TextProps<C extends React.ElementType> = {
  children: React.ReactNode;
  as?: C;
} & React.ComponentPropsWithoutRef<C>;
```

Essentially, the type of `TextProps` is an object type containing `children`, `as` and all valid component properties that correlates with `as` tag.

Now, let’s give the solution a try! We try to add `htmlFor` property to a `Text` component with `as` is `p`. That’s wrong, and righty caught by TypeScript with the error: `Property 'htmlFor' does not exist on type...`

```typescript
// It's ok
<Text as='label' htmlFor='username'>
    Username
</Text>
// Error!!!! Property 'htmlFor' does not exist on type 'IntrinsicAttributes & { children: ReactNode; as?: "p" | undefined; }....
<Text as='p' htmlFor='username'>
    Username
</Text>
```

Our component is looking good right now but we still have an issue. The `as` property is optional, if we omit it, the component will render as `p` tag (as we expected) but Typescript can't know about this so it can't check the valid properties for this component.

```typescript
// No error !!! But it should be
<Text htmlFor="username">User</Text>
```

To fix this issue, we need to assign a default type for type parameters in a generic type.

```typescript
const Text = <C extends React.ElementType = 'p' /* default type */>({
  children,
  as,
  ...rest
}: TextProps<C>) => {
  // other code
   ...

  const Component = as || 'p';

  return <Component {...rest}>{children}</Component>;
};
```

The previous example we had should now throw an error, that is when you pass `htmlFor` to the `Text` component without an `as` prop. It's magic. ✨✨

We still can improve our `Text` component. As we know, some html tags have some internal properties like `color`, if we want to provide our own `color` property (or other properties), we just don't want to mess it up. We need to filter our own properties out of internal properties.

```typescript
// our custom text properties
type Props {
    color?: 'primary' | 'secondary',
    size?: 'sm' | 'md' | 'lg'
}
// omit internal properties
Omit<React.ComponentPropsWithoutRef<C>, keyOf Props>
```

The full implementation looks like

```typescript
type Props<C extends React.ElementType> = {
  children: React.ReactNode;
  as?: C;
  color?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  // other properties...
};

type TextProps<C extends React.ElementType> = Props<C> &
  Omit<React.ComponentPropsWithoutRef<C>, keyof Props<C>>;

const Text = <C extends React.ElementType = 'p'>({
  children,
  as,
  ...rest
}: TextProps<C>) => {
  // other code
    ...

  const Component = as || 'p';

  return <Component {...rest}>{children}</Component>;
};
```

Our `Text` component is strongly typed.

Now, let's take it one step further. We want our solution works for other components not only `Text`. To make our solution reuseable, we can add one more generic type which represent the custom component.

Before going ahead, follow the `separation of concerns` principle, we should move `as` property out of our custom properties and define its own type.

```
type AsProp<C extends React.ElementType> = {
  as?: C;
};
```

Our reuseable solution will look like

```typescript
type AsProp<C extends React.ElementType> = {
  as?: C;
};

type PropWithAs<C extends React.ElementType, P = {}> = P & AsProp<C>;

export type PolymorphicComponentProps<
  C extends React.ElementType,
  Props = {}, // adding one more generic type
> = PropWithAs<C, Props> &
  Omit<React.ComponentPropsWithoutRef<C>, keyof PropWithAs<C, Props>>;
```

Now we can go ahead and use `PolymorphicComponentProps` on our components as follows:

```typescript
// Text component
type TextProps = {
  children: React.ReactNode;
  color?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
 // other properties...
};

const Text = <C extends React.ElementType = 'p'>({
  children,
  as,
  ...rest
}: PolymorphicComponentProps<C, TextProps>) => {
    // other code
    ...

  const Component = as || 'p';

  return <Component {...rest}>{children}</Component>;
};

// Usage
<Text as='h1'>Heading</Text>
<Text as='label' htmlFor='username'>
Username
</Text>

// Button component
type ButtonProps = {
  children: React.ReactNode;
  color?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
 // other properties...
};

const Button = <C extends React.ElementType = 'button'>({
  children,
  as,
  ...rest
}: PolymorphicComponentProps<C, ButtonProps>) => {
    // other code
    ...

  const Component = as || 'button';

  return <Component {...rest}>{children}</Component>;
};

// Usage
<Button>Submit</Text>
<Button as='a' href='/login'>Login</Text> // act as a link

```

Everything works like a charm. ✨✨

## How about `ref`?

To write a functional component which support Ref forwarding, we can use `React.forwardRef` function. The `Button` component will be look like

```typescript
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const { children, ...rest } = props

  return (
    <button ref={ref} {...rest}>
      {children}
    </button>
  )
})
```

To create polymorphic component, we need to replace `HTMLButtonElement` with a generic type `C`. Unfortunately we can't do that, `forwardRef()` is a function call so we can't define a generic type. So we came up with defining type for the function inside `forwardRef()`.

```typescript
const Button = React.forwardRef(
  <C extends React.ElementType = 'button'>(
    props: PolymorphicComponentProps<C, ButtonProps>,
    ref: unknown, // we still don't know yet
  ) => {
    const { as, children, ...rest } = props
    const Component = as || 'button'
    return (
      <Component ref={ref} {...rest}>
        {children}
      </Component>
    )
  },
)
```

So what type of the`ref` object? Remember this guy `React.ComponentPropsWithoutRef`? he has a brother named `React.ComponentPropsWithRef` which includes all the relevant component props based on the element type, plus the ref object. Let's define a new helper type, `PolymorphicRef`, that returns the type of the ref object for the polymorphic component.

```typescript
type PolymorphicRef<C extends React.ElementType> = React.ComponentPropsWithRef<C>['ref']

const Button = React.forwardRef(<C extends React.ElementType = 'button'>(props: PolymorphicComponentProps<C, ButtonProps>, ref: PolymorphicRef<C>) => {
  const { as, children, ...rest } = props
  const Component = as || 'button'
  return (
    <Component ref={ref} {...rest}>
      {children}
    </Component>
  )
})
```

Our `Button` component still isn't strongly typed. We need to explicitly defined the type annotation for it. `Button` component will be receive `ButtonProps` and return a JSX

```typescript
type ButtonComponent = (props: ButtonProps) => React.ReactElement | null;
```

The final step is to update `ButtonProp` to support `PolymorphicRef`

```typescript
// new helper type which includes the `ref` property for the polymorphic component
type PolymorphicComponentPropsWithRef<
  C extends React.ElementType,
  Props = {}
>
 = PolymorphicComponentProps<C, Props> & { ref?: PolymorphicRef<C> }

type CustomButtonProps = {
  children: React.ReactNode;
  color?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
};

type ButtonProps<C extends React.ElementType> = PolymorphicComponentPropsWithRef<
  C,
  CustomButtonProps
>

type ButtonComponent = <C extends React.ElementType = 'button'>(
  props: ButtonProps<C>,
) => React.ReactElement | null

const Button: ButtonComponent = React.forwardRef(
  <C extends React.ElementType = 'button'>(
    props: ButtonProps<C>,
    ref: PolymorphicRef<C>
  ) => {
    const { as, children, ...rest } = props;

    const Component = as || 'button';
    return (
      <Component ref={ref} {...rest}>
        {children}
      </Component>
    );
  }
);

// Useage
const buttonRef1 = React.useRef<HTMLButtonElement | null>(null);
const buttonRef2 = React.useRef<HTMLDivElement | null>(null);

// It's ok
<Button ref={buttonRef1}>Button1</Button>
// Error!!!! Type 'MutableRefObject<HTMLDivElement | null>' is not assignable to type 'RefObject<HTMLButtonElement>'...
<Button ref={buttonRef2}>Button2</Button>

```

Finally, we now have a complete solution.

```typescript
import React from 'react'

// base types
type AsProp<C extends React.ElementType> = {
  as?: C
}

type PropWithAs<C extends React.ElementType, Props = {}> = Props & AsProp<C>

type PolymorphicComponentProps<C extends React.ElementType, Props = {}> = PropWithAs<C, Props> & Omit<React.ComponentPropsWithoutRef<C>, keyof PropWithAs<C, Props>>

type PolymorphicRef<C extends React.ElementType> = React.ComponentPropsWithRef<C>['ref']

type PolymorphicComponentPropsWithRef<C extends React.ElementType, Props = {}> = PolymorphicComponentProps<C, Props> & { ref?: PolymorphicRef<C> }

// Usage

// Text component
type CustomTextProps = {
  children: React.ReactNode
  color?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
}

type TextProps<C extends React.ElementType> = PolymorphicComponentProps<C, CustomTextProps>

const Text = <C extends React.ElementType = 'p'>({ children, as, ...rest }: TextProps<C>) => {
  const Component = as || 'p'

  return <Component {...rest}>{children}</Component>
}

// Button component
type CustomButtonProps = {
  children: React.ReactNode
  color?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
}

type ButtonProps<C extends React.ElementType> = PolymorphicComponentPropsWithRef<C, CustomButtonProps>

type ButtonComponent = <C extends React.ElementType = 'button'>(props: ButtonProps<C>) => React.ReactElement | null

const Button: ButtonComponent = React.forwardRef(<C extends React.ElementType = 'button'>(props: ButtonProps<C>, ref: PolymorphicRef<C>) => {
  const { as, children, ...rest } = props

  const Component = as || 'button'
  return (
    <Component ref={ref} {...rest}>
      {children}
    </Component>
  )
})
```

Congratulation, we have successfully built a strongly typed Polymorphic React Component with Typescript. 🎉🎉🎉🎉
