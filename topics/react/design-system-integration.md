---
title: Design system integration in React
short_title: Design system integration
description: Learn how to integrate design systems in React applications with comprehensive coverage of design tokens, atomic components, and accessibility standards.
date: 2024-10-29
authors:
  - zlatanpham
tags:
  - design-system
  - react
  - storybook
redirect:
  - /s/-uUflA
---

Design system integration in React involves creating a set of reusable, consistent, and easily maintainable components that reflect your app’s design guidelines. Integrating a design system helps ensure visual and functional consistency across your application while allowing for scalability as new components and features are added. Design systems often include UI components, design tokens, typography, colors, icons, spacing guidelines, and accessibility standards.

**Key steps and concepts for design system integration in react**

1. Define the core design tokens (colors, typography, spacing, etc.)
2. Build atomic components (buttons, inputs, typography)
3. Create composable, flexible components
4. Establish and use a component library framework (Storybook)
5. Implement accessibility standards
6. Use context and theming for adaptable designs

### 1. Define core design tokens

**Design tokens** are the fundamental building blocks of your design system. They represent design decisions like colors, typography, and spacing in a consistent, reusable format. By defining tokens, you create a single source of truth that makes updates and adjustments easy across the app.

**Example: Design tokens in a JSON format**

```json
{
  "colors": {
    "primary": "#007bff",
    "secondary": "#6c757d",
    "background": "#f8f9fa",
    "text": "#212529"
  },
  "typography": {
    "fontFamily": "Arial, sans-serif",
    "fontSize": {
      "small": "12px",
      "medium": "16px",
      "large": "24px"
    }
  },
  "spacing": {
    "small": "4px",
    "medium": "8px",
    "large": "16px"
  }
}
```

You can then access and apply these tokens in your components, ensuring they follow consistent visual guidelines.

**In a React component:**

```js
import tokens from "./tokens.json";

const Button = ({ children }) => (
  <button
    style={{
      backgroundColor: tokens.colors.primary,
      color: tokens.colors.background,
      padding: tokens.spacing.medium,
      fontSize: tokens.typography.fontSize.medium,
      fontFamily: tokens.typography.fontFamily,
    }}
  >
    {children}
  </button>
);
```

### 2. Build atomic components

Atomic design breaks down UI elements into **atoms**, **molecules**, **organisms**, **templates**, and **pages**. This approach helps in building reusable, low-level components that can be combined and customized to create more complex components and layouts.

**Atomic design hierarchy:**

- **Atoms**: Smallest, single-purpose components like buttons, inputs, or labels.
- **Molecules**: Combinations of atoms, such as an input field with a label.
- **Organisms**: Groups of molecules that form distinct sections, like a header or a form.
- **Templates and pages**: Higher-level layouts or complete screens that use organisms and molecules.

**Example: Button component (atom)**

```jsx
const Button = ({ label, onClick, variant = "primary" }) => {
  const styles = {
    primary: {
      backgroundColor: tokens.colors.primary,
      color: tokens.colors.background,
    },
    secondary: {
      backgroundColor: tokens.colors.secondary,
      color: tokens.colors.background,
    },
  };

  return (
    <button style={styles[variant]} onClick={onClick}>
      {label}
    </button>
  );
};
```

**Example: Form component (molecule)**

```jsx
const FormField = ({ label, type = "text", value, onChange }) => (
  <div>
    <label>{label}</label>
    <input type={type} value={value} onChange={onChange} />
  </div>
);
```

### 3. Create composable, flexible components

Design systems benefit from **flexible components** that can adapt to different use cases without being overly rigid. Use **props** and **styled-system** libraries (e.g., styled-components or emotion) to make your components customizable.

```jsx
import styled from "styled-components";
import tokens from "./tokens.json";

const Button = styled.button`
  padding: ${tokens.spacing.medium};
  font-size: ${tokens.typography.fontSize.medium};
  color: ${({ variant }) => tokens.colors[variant]};
  background-color: ${({ bg }) => bg || tokens.colors.background};
`;
```

This approach allows the Button component to be reusable, enabling different colors and backgrounds with minimal code.

### 4. Establish and use a component library framework (Storybook)

[Storybook](https://storybook.js.org/) is a popular tool for creating isolated component libraries, documenting components, and allowing team members to interact with components outside of the application environment.

**Set up Storybook**

Install Storybook in your React project.

```sh
npx sb init
```

**Write stories for components**

Each component should have its own story, describing its appearance with various props and states.

```jsx
// Example: Button.stories.js
import React from "react";
import { Button } from "./Button";

export default {
  title: "Design system/Button",
  component: Button,
};

export const Primary = () => (
  <Button variant="primary" label="Primary Button" />
);
export const Secondary = () => (
  <Button variant="secondary" label="Secondary Button" />
);
```

**Benefits:**

- Provides a single source of truth for UI components, where designers and developers can collaborate.
- Enables interactive testing of each component’s variations, ensuring they meet design requirements.
- Encourages consistency across components, as each component variation is clearly documented.

### 5. Implement accessibility standards

Design systems must prioritize accessibility to create inclusive applications. Follow **WCAG guidelines** and use accessible components, ensuring that all users can interact with your app.

- **Color contrast**: Use tokens that meet accessibility standards for contrast. Tools like axe can test for color contrast and other accessibility issues.

- **Aria roles and attributes**: Use ARIA attributes for interactive components like buttons, modals, and dialogs to improve screen reader support.

```jsx
// Example: Accessible button with ARIA
const Button = ({ label, onClick, ariaLabel, variant = "primary" }) => (
  <button
    onClick={onClick}
    style={{ backgroundColor: tokens.colors[variant] }}
    aria-label={ariaLabel}
  >
    {label}
  </button>
);
```

- **Keyboard navigation**: Ensure that all components can be navigated via keyboard. Focus management is crucial, especially for modal dialogs or dynamic components like carousels.

```jsx
// Example: Focus management in a modal
import { useEffect, useRef } from "react";

const Modal = ({ isOpen, onClose, children }) => {
  const closeButtonRef = useRef();

  useEffect(() => {
    if (isOpen) {
      closeButtonRef.current.focus();
    }
  }, [isOpen]);

  return isOpen ? (
    <div role="dialog" aria-modal="true" tabIndex={-1}>
      <button ref={closeButtonRef} onClick={onClose}>
        Close
      </button>
      {children}
    </div>
  ) : null;
};
```

Tools:

- `axe-core` and `eslint-plugin-jsx-a11y` for testing accessibility issues.
- `Storybook accessibility addon` to validate and fix issues while developing components.

### 6. Use context and theming for adaptable designs

To support **themes** (e.g., dark and light modes), use **context providers** to pass theme values down to components. This enables consistent theming and allows the user to switch themes easily.

**Example: Theming with context**

1. Create theme context:

```jsx
import React, { createContext, useContext, useState } from "react";
import tokens from "./tokens.json";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));

  const themeStyles = theme === "light" ? tokens.light : tokens.dark;

  return (
    <ThemeContext.Provider value={{ theme, themeStyles, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
```

2. Consume theme context in components:

```jsx
const ThemedButton = ({ label }) => {
  const { themeStyles } = useTheme();
  return (
    <button
      style={{
        backgroundColor: themeStyles.colors.primary,
        color: themeStyles.colors.background,
      }}
    >
      {label}
    </button>
  );
};
```

3. Switch themes in app:

```jsx
function App() {
  const { toggleTheme } = useTheme();
  return (
    <div>
      <ThemedButton label="Click me" />
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
}
```

### Summary

| Technique                           | Purpose                                                                                  |
| ----------------------------------- | ---------------------------------------------------------------------------------------- |
| **Design tokens**                   | Centralize colors, typography, and spacing for consistent styling                        |
| **Atomic components**               | Build scalable, reusable components from basic building blocks                           |
| **Composable, flexible components** | Ensure flexibility for various use cases using props and dynamic styling                 |
| **Storybook**                       | Document, test, and showcase all components, ensuring design and functionality alignment |
| **Accessibility standards**         | Improve usability for all users, following WCAG and ARIA best practices                  |
| **Context and theming**             | Support adaptable designs, allowing for light and dark themes or other custom themes     |

By integrating these techniques, you can build a design system that is robust, adaptable, and consistent, making it easier to scale and maintain the UI over time.
