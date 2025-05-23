---
title: Hook architecture in React
short_title: Hook architecture
description: React hooks architecture with in-depth coverage of custom hooks, state management, and side effects handling.
date: 2024-10-29
authors:
  - zlatanpham
tags:
  - hooks
  - react
redirect:
  - /s/nLTPcw
---

Hooks architecture in React refers to the systematic approach of using hooks to manage state, side effects, and reusable logic across components. **Custom hooks** are one of the most powerful features, allowing you to encapsulate and reuse complex logic independently of component structure. Custom hooks improve code readability, keep components lean, and make stateful logic portable and composable.

### Key concepts in hooks architecture

- Separation of concerns with custom hooks
- Encapsulating side effects
- Dependency management in hooks
- Combining multiple custom hooks

### Separation of concerns with custom hooks

By creating custom hooks, we can isolate specific pieces of logic or state, making components simpler and easier to test. Custom hooks follow the same naming conventions and usage patterns as built-in hooks but encapsulate domain-specific or app-specific logic.

**Example: `useFetch` hook for data fetching**

```jsx
import { useState, useEffect } from "react";

function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(url)
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, [url]);

  return { data, loading, error };
}
```

Usage:

```js
function UserProfile({ userId }) {
  const { data, loading, error } = useFetch(`/api/users/${userId}`);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading data.</p>;

  return <div>{data.name}</div>;
}
```

**Benefits**:

- **Reusability**: The `useFetch` hook can be used in any component needing data from an API.
- **Isolation of concerns**: Data fetching logic is isolated, keeping components focused on UI and presentation.

### Encapsulating side effects

Side effects (like fetching data, managing subscriptions, or setting timeouts) often clutter component code. By moving these side effects into custom hooks, we can encapsulate the logic and improve component readability.

**Example: `useDocumentTitle` hook for updating the document title**

```js
import { useEffect } from "react";

function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title;
  }, [title]);
}
```

Usage:

```js
function HomePage() {
  useDocumentTitle("Home - My App");
  return <div>Welcome to the Home Page</div>;
}
```

**Benefits**:

- **Isolation of side effects**: The document title logic is separate from the component's main UI, simplifying the component.
- **Reusability**: `useDocumentTitle` can be reused across pages or components that need to set the document title.

### Dependency management in hooks

Custom hooks require careful handling of dependencies to avoid bugs, stale data, or unintended behaviors. `useEffect`, `useMemo`, and `useCallback` hooks depend on stable dependencies to function predictably.

**Example: Managing dependencies with `useMemo`**

Suppose we need to calculate an expensive value in a hook, which depends on certain props or state. Using `useMemo` ensures the computation only runs when necessary.

```js
import { useMemo } from "react";

function useExpensiveCalculation(data) {
  const result = useMemo(() => {
    // Expensive calculation here
    return data.reduce((sum, num) => sum + num, 0);
  }, [data]);

  return result;
}
```

Usage:

```js
function Stats({ numbers }) {
  const total = useExpensiveCalculation(numbers);
  return <div>Total: {total}</div>;
}
```

**Benefits**:

- **Efficiency**: By memoizing the result, we avoid recalculating every render, improving performance.
- **Stable dependencies**: Carefully setting dependencies ensures the calculation only reruns when `data` changes.

> In the future, this step will be handled automatically by [React compiler](https://react.dev/learn/react-compiler#what-does-the-compiler-do)

### Combining multiple custom hooks

For more complex scenarios, multiple custom hooks can be combined, keeping components modular and avoiding deeply nested hooks. You can chain hooks to build up increasingly complex functionality without cluttering a single hook.

**Example: Using `useAuth` and `useFetch` together**

```js
// useAuth.js import { useState } from "react";

function useAuth() {
  const [user, setUser] = useState(null);

  const login = (userData) => setUser(userData);
  const logout = () => setUser(null);

  return { user, login, logout };
}

// useUserData.js import useFetch from "./useFetch";

function useUserData(userId) {
  const { data, loading, error } = useFetch(`/api/users/${userId}`);
  return { data, loading, error };
}

// Usage in a component

function Dashboard({ userId }) {
  const { user, login, logout } = useAuth();
  const { data: userData, loading } = useUserData(userId);

  return (
    <div>
      {user ? (
        <div>
          <button onClick={logout}>Logout</button>
          {loading ? (
            <p>Loading user data...</p>
          ) : (
            <p>Welcome, {userData.name}</p>
          )}
        </div>
      ) : (
        <button onClick={() => login({ id: userId, name: "John Doe" })}>
          Login
        </button>
      )}
    </div>
  );
}
```

**Benefits**:

- **Modularity**: Each hook handles a specific concern (auth or fetching data), so they're independently reusable and testable.
- **Encapsulation**: The component doesn't need to understand the logic inside each hook, only the returned data and functions.

### Best practices for custom hooks

**Use clear naming conventions**: Name hooks descriptively, starting with `use`, such as `useAuth`, `useFetchData`, or `useToggle`. This helps with readability and code consistency.

**Return only necessary data and functions**: Custom hooks should return only the data and functions the component actually needs. This minimizes the hook's API surface and reduces complexity.

```js
// Better: return only what's needed
function useToggle(initialState = false) {
  const [state, setState] = useState(initialState);
  const toggle = () => setState((prev) => !prev);
  return [state, toggle];
}
```

**Handle edge cases and errors gracefully**: Build error handling directly into hooks, where applicable. This keeps components from dealing with low-level error handling, focusing only on displaying relevant information to the user.

```js
function useFetch(url) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then(setData)
      .catch(setError);
  }, [url]);

  return { data, error };
}
```

**Encapsulate complex state logic**: If you find yourself managing complex state logic (e.g., multiple variables, resetting state), consider using `useReducer` within the hook.

```jsx
import { useReducer } from "react";

function formReducer(state, action) {
  switch (action.type) {
    case "update":
      return { ...state, [action.field]: action.value };
    case "reset":
      return action.initialState;
    default:
      return state;
  }
}

function useForm(initialState) {
  const [state, dispatch] = useReducer(formReducer, initialState);

  const updateField = (field, value) =>
    dispatch({ type: "update", field, value });
  const resetForm = () => dispatch({ type: "reset", initialState });

  return [state, updateField, resetForm];
}
```

**Testing custom hooks**: Test custom hooks in isolation to ensure they behave as expected under various scenarios. Tools like **React testing library's `renderHook`** make it easy to test hooks directly.

```js
import { renderHook, act } from "@testing-library/react-hooks";
import useToggle from "./useToggle";

test("should toggle state", () => {
  const { result } = renderHook(() => useToggle());

  act(() => {
    result.current[1](); // Call toggle function
  });

  expect(result.current[0]).toBe(true); // Assert the toggled state
});
```

### Combining techniques in a custom hook system

Imagine you need a custom hook system for managing user authentication, including login, logout, fetching user data, and handling user permissions. We'll create modular hooks that interact but remain individually reusable.

1.  **`useAuth` for authentication**: Manages login and logout functions and holds user session data.
2.  **`useUserData` for data fetching**: Fetches user-specific data from the server.
3.  **`usePermissions` for role-based access**: Checks permissions based on the user's roles.

**Combining custom hooks**:

```js
// useAuth.js
function useAuth() {
  const [user, setUser] = useState(null);

  const login = (userData) => setUser(userData);
  const logout = () => setUser(null);

  return { user, login, logout };
}

// useUserData.js
import useFetch from "./useFetch";

function useUserData(userId) {
  const { data, loading, error } = useFetch(`/api/users/${userId}`);
  return { data, loading, error };
}

// usePermissions.js
function usePermissions(userRoles = []) {
  const hasPermission = (permission) => userRoles.includes(permission);
  return { hasPermission };
}

// Usage in a component
function AdminDashboard({ userId }) {
  const { user, login, logout } = useAuth();
  const { data: userData, loading: dataLoading } = useUserData(userId);
  const { hasPermission } = usePermissions(userData ? userData.roles : []);

  return (
    <div>
      {user ? (
        <div>
          <button onClick={logout}>Logout</button>
          {dataLoading ? (
            <p>Loading user data...</p>
          ) : hasPermission("admin") ? (
            <p>Welcome, Admin {userData.name}</p>
          ) : (
            <p>Access denied</p>
          )}
        </div>
      ) : (
        <button onClick={() => login({ id: userId, name: "Jane Doe" })}>
          Login
        </button>
      )}
    </div>
  );
}
```

By modularizing each piece of the authentication system into separate custom hooks, we ensure that each hook is individually testable, reusable, and manageable. This approach keeps the `AdminDashboard` component focused on rendering, with minimal logic.

### Summary

Custom hooks provide a powerful way to architect stateful and reusable logic in React applications. By following best practices and focusing on modularity, you can create hooks that are easy to test, maintain, and scale across complex applications. The approach to combining, organizing, and testing these hooks leads to clean, efficient, and high-quality code.
