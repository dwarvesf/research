---
title: Component communication and decoupling
description: Learn key React component communication methods like props drilling, Context API, event emitters, global stores, and custom hooks to build decoupled, maintainable, and flexible applications.
date: null
redirect:
  - /s/CHRnNQ
---

````markdown
---
authors:
  - "thanh"
date: "2024-10-29"
description: "Explore essential techniques like props drilling, Context API, custom hooks, and event emitters"
tags:
  - "react"
title: "Component communication and decoupling in React"
short_title: "Component communication and decoupling"
---

Component communication and decoupling are crucial in React, especially for large applications where components may need to share data or trigger actions without being tightly coupled. Decoupling allows components to be reusable, maintainable, and flexible, reducing the risk of cascading changes across the app.

**Core patterns for component communication and decoupling**

1. Props drilling (direct parent-child communication)
2. Lifting state up
3. Context API for shared state
4. Event emitter (pub/sub) pattern for loose coupling
5. Redux, Zustand, or global store for cross-component state
6. Custom hooks for shared logic

### Props drilling (direct parent-child communication)

Props drilling refers to passing data through multiple component layers until it reaches the intended child component. While simple, it can quickly become unmanageable as the component tree grows deeper.

**Example: Direct data passing through props**

```js
function Parent() {
  const [message, setMessage] = useState("Hello from Parent!");

  return <Child message={message} />;
}

function Child({ message }) {
  return <GrandChild message={message} />;
}

function GrandChild({ message }) {
  return <div>{message}</div>;
}
```
````

**When to use props drilling**:

- When the data is only needed by a single child or a small subtree.
- Avoid in deeply nested trees or large apps where data needs to be accessed at many levels.

**Drawbacks**:

- Scalability issues as the app grows.
- Makes refactoring difficult since any change in the middle component chain affects multiple components.

### Lifting state up

Lifting state up means moving the shared state to the closest common ancestor of the components that need to share it. This approach encourages clear data flow and keeps the components tightly coupled only to the extent needed.

**Example: Managing form state across fields**

```js
function Form() {
  const [formState, setFormState] = useState({ name: "", email: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <NameField value={formState.name} onChange={handleChange} />
      <EmailField value={formState.email} onChange={handleChange} />
    </div>
  );
}

function NameField({ value, onChange }) {
  return <input name="name" value={value} onChange={onChange} />;
}

function EmailField({ value, onChange }) {
  return <input name="email" value={value} onChange={onChange} />;
}
```

**When to use lifting state up**:

- Useful when a group of sibling components needs to share data or rely on a single source of truth.
- Works well for managing form data, settings, or small sections of shared UI state.

**Drawbacks**:

- Can make parent components bulky and harder to manage if used excessively in large apps.

### Context API for shared state

The Context API enables you to share data across components without drilling props down through multiple layers. It’s ideal for relatively static or infrequently updated global state, such as theme or user settings.

```js
const ThemeContext = React.createContext();

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

function ThemedComponent() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <div className={`app ${theme}`}>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
}
```

**When to use Context API**:

- When you need to share relatively static data or infrequent updates across multiple components (e.g., theme, language, auth).
- Avoid for frequently updated data as it can lead to unnecessary re-renders across the component tree.

**Drawbacks**:

- Overusing context for dynamic or frequently changing state can lead to performance bottlenecks.
- Context is less suitable for data that changes rapidly or is complex (consider Redux/Zustand for such cases).

### Event emitter (pub/sub) pattern for loose coupling

The event emitter pattern allows components to communicate by publishing and subscribing to events. This decouples the components, as they don’t need to know each other’s presence—only the event itself.

**Example: Basic event emitter**

You could create a simple event emitter utility to allow different parts of the app to subscribe to and emit events.

```js
// EventEmitter.js
export const EventEmitter = {
  events: {},
  subscribe(event, callback) {
    if (!this.events[event]) this.events[event] = [];
    this.events[event].push(callback);
  },
  emit(event, data) {
    if (this.events[event])
      this.events[event].forEach((callback) => callback(data));
  },
};

// Usage in components:
function ComponentA() {
  useEffect(() => {
    EventEmitter.emit("message", "Hello from ComponentA");
  }, []);

  return <div>Component A</div>;
}

function ComponentB() {
  useEffect(() => {
    EventEmitter.subscribe("message", (msg) => alert(msg));
  }, []);

  return <div>Component B</div>;
}
```

**When to use event emitters**:

- Useful when you need decoupled communication between non-related components.
- Ideal for notifications, global events, or handling loosely coupled actions.

**Drawbacks**:

- Overuse can make the data flow unpredictable and hard to trace.
- Debugging is more complex, as event emissions are asynchronous and may be harder to track down.

### Global store (Redux/Zustand) for cross-component state

Global stores like Redux or Zustand provide a single source of truth for application-wide state. This is essential when different parts of the app need to access or manipulate shared data, especially if it’s complex or requires consistent behavior.

**Example: Notifications with Redux**

Using Redux for managing notifications, components can dispatch actions to add or remove notifications without needing direct knowledge of where or how they’re displayed.

```js
// notificationSlice.js
import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notifications",
  initialState: [],
  reducers: {
    addNotification: (state, action) => {
      state.push(action.payload);
    },
    removeNotification: (state, action) => {
      return state.filter((notif) => notif.id !== action.payload);
    },
  },
});

export const { addNotification, removeNotification } =
  notificationSlice.actions;
export default notificationSlice.reducer;

// Usage in components:
function AddNotificationButton() {
  const dispatch = useDispatch();
  const handleAddNotification = () => {
    dispatch(addNotification({ id: Date.now(), message: "New Notification" }));
  };

  return <button onClick={handleAddNotification}>Add Notification</button>;
}

function NotificationList() {
  const notifications = useSelector((state) => state.notifications);

  return (
    <ul>
      {notifications.map((notif) => (
        <li key={notif.id}>{notif.message}</li>
      ))}
    </ul>
  );
}
```

**When to use global store**:

- When multiple parts of the app need access to complex, consistent data.
- For cross-cutting data like notifications, authentication, or async data that requires global consistency.

**Drawbacks**:

- Can be overkill for small or medium applications.
- Adds complexity and boilerplate, though libraries like Redux Toolkit reduce some of this overhead.

### Custom hooks for shared logic

Custom hooks are a highly effective way to encapsulate and share logic, especially side effects, across components. Hooks allow shared functionality to be implemented in multiple components without duplication or tight coupling.

**Example: Shared fetching logic with custom hook**

```jsx
function useFetch(url) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(url)
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, [url]);

  return { data, error, loading };
}

// Usage in components:
function UserList() {
  const { data: users, loading, error } = useFetch("/api/users");

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading users</div>;

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

**When to use custom hooks**:

- For sharing logic that involves side effects or reusable state management.
- To avoid HOCs or render props in cases where hooks are simpler and more readable.

**Drawbacks**:

- Custom hooks should be modular and focused on a single concern to avoid complexity.
- Managing dependencies in hooks can be challenging and requires careful planning.

### Key takeaways

- **Direct communication** (props drilling, lifting state) works for small, simple hierarchies.
- **Context API** suits lightweight shared state, avoiding heavy re-renders.
- **Event emitters** allow decoupled, loosely coupled communication but can lead to debugging complexity.
- **Global store (Redux, Zustand**) is essential for complex, cross-cutting state needs.
- **Custom hooks** are ideal for encapsulating reusable side effects and shared logic without extra component layers.

```

```
