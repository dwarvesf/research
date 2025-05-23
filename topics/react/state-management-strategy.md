---
title: State management strategy in React
short_title: State management strategy
description: Discover state management strategies, best practices, and when to use each approach for scalable, efficient React applications
date: 2024-10-29
authors:
  - zlatanpham
tags:
  - react
redirect:
  - /s/5M647A
---

State management is a core architectural topic in React, especially as applications grow in complexity. While local component state (using `useState` or `useReducer`) is suitable for small to medium apps, more sophisticated state management strategies become essential as your app scales.

### Local component state with hooks

React’s native `useState` and `useReducer` are sufficient for managing state at the component level and are efficient for isolated, reusable components. However, challenges arise when dealing with deeply nested or cross-component data dependencies.

**Example use case**

Use `useReducer` for managing local form state with multiple dependent fields.

```js
const initialFormState = { name: "", email: "", password: "" };

function formReducer(state, action) {
  switch (action.type) {
    case "UPDATE_FIELD":
      return { ...state, [action.field]: action.value };
    case "RESET":
      return initialFormState;
    default:
      return state;
  }
}

function SignupForm() {
  const [state, dispatch] = useReducer(formReducer, initialFormState);

  const handleChange = (e) => {
    dispatch({
      type: "UPDATE_FIELD",
      field: e.target.name,
      value: e.target.value,
    });
  };

  return (
    <form>
      <input name="name" value={state.name} onChange={handleChange} />
      <input name="email" value={state.email} onChange={handleChange} />
      <input
        name="password"
        type="password"
        value={state.password}
        onChange={handleChange}
      />
      <button type="button" onClick={() => dispatch({ type: "RESET" })}>
        Reset
      </button>
    </form>
  );
}
```

**When to use local state**:

- Isolated components with minimal data dependencies.
- Simple, short-lived UI states, such as form inputs, toggles, or animations.

### Global state with context API

The React Context API is suitable for small to medium global state needs, such as user authentication or theme settings. It’s lightweight but can cause re-rendering issues if used improperly in large applications.

**Example of centralized authentication state**

```jsx
const AuthContext = React.createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (userData) => setUser(userData);
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  return useContext(AuthContext);
}

// Usage:
function Navbar() {
  const { user, logout } = useAuth();
  return user ? (
    <button onClick={logout}>Logout</button>
  ) : (
    <button>Login</button>
  );
}
```

**When to use context API**:

- Lightweight global state, like theme, user, or language settings.
- Avoid for complex or frequently updated data, as it can lead to excessive re-renders.

### Redux or Zustand for complex global state

Redux is well-suited for applications with highly structured, complex, or cross-cutting state needs. It provides predictable state management via a single store and supports middleware for logging, async actions, and more. Alternatively, **Zustand** is a lightweight state management library that’s simpler to set up and more flexible than Redux.

**Example of global cart management with Redux Toolkit**

Using Redux Toolkit, you can simplify Redux by automatically generating action creators and reducers.

```js
import { createSlice, configureStore } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addItem: (state, action) => {
      state.push(action.payload);
    },
    removeItem: (state, action) => {
      return state.filter((item) => item.id !== action.payload);
    },
  },
});

const store = configureStore({ reducer: { cart: cartSlice.reducer } });

// Actions for dispatching:
export const { addItem, removeItem } = cartSlice.actions;
export default store;
```

**Redux vs. Zustand**:

- **Redux**: More verbose but provides structure, middleware support, and a strong ecosystem (dev tools, middleware for async actions).
- **Zustand**: Minimal boilerplate, straightforward API, and avoids creating a global Redux-like store by encouraging state encapsulation.

**When to use Redux or Zustand**:

- Cross-cutting data dependencies that multiple components need access to.
- Scenarios that benefit from immutability (Redux) or a reactive, hook-based approach (Zustand).

### Async data and server state with React Query or SWR

Tools like `React Query` and `SWR` are ideal for handling server data. They help manage caching, re-fetching, and synchronization with server data, which is particularly useful in data-intensive applications.

**Example use case**: React Query simplifies handling server state by caching data and re-fetching when necessary. It also manages states like loading, error, and refetching automatically.

```jsx
import { useQuery, QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

function fetchUser(userId) {
  return fetch(`/api/user/${userId}`).then((res) => res.json());
}

function UserProfile({ userId }) {
  const { data, error, isLoading } = useQuery(
    ["user", userId],
    () => fetchUser(userId),
    {
      staleTime: 5 * 60 * 1000, // Data remains fresh for 5 minutes
    },
  );

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorDisplay message={error.message} />;
  return <div>User: {data.name}</div>;
}

// Usage in App:
<QueryClientProvider client={queryClient}>
  <UserProfile userId={1} />
</QueryClientProvider>;
```

**React Query vs. SWR**:

- **React Query**: More feature-rich and configurable; supports pagination, optimistic updates, and complex cache invalidation.
- **SWR**: Lightweight with a more declarative approach; suitable for simpler use cases.

**When to use React Query or SWR**:

- Server-side data that needs caching, synchronization, and refresh-on-focus.
- Use React Query for applications with complex server data dependencies and SWR for simpler needs.

### Combined approach with context + React Query

For scalable applications, a hybrid approach works well, where:

- Context handles small, rarely-changing global state (like theme or user settings).
- React Query or SWR manages server state (API data).
- Local state and custom hooks organize isolated or ephemeral component-specific state.

**Example hybrid structure**:

```jsx
const UserContext = React.createContext();

function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

function useUserData(userId) {
  return useQuery(["user", userId], () => fetchUser(userId), {
    staleTime: 5 * 60 * 1000,
  });
}

function UserComponent() {
  const { user, setUser } = useContext(UserContext);
  const { data: userData } = useUserData(user.id);

  useEffect(() => {
    if (userData) setUser(userData);
  }, [userData, setUser]);

  return <div>Welcome, {user ? user.name : "Guest"}!</div>;
}

// Usage:
<AppProvider>
  <UserComponent />
</AppProvider>;
```

**Benefits of the combined approach**:

- Avoids overloading context with complex state management.
- Improves separation of concerns by delegating responsibilities: local state for UI, context for global app state, and React Query for async/server state.

### Key takeaways

- **Local state** for isolated, ephemeral data.
- **Context API** for lightweight global state that rarely changes.
- **Redux/Zustand** for structured, complex state management across large applications.
- **React Query/SWR** for async data, caching, and server-side synchronization.
- **Combined approach** for scalable, maintainable architecture.
