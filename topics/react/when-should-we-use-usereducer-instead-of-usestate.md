---
title: When should we use useReducer instead of useState?
description: "Imagine we have a component with multiple states. It is simple enough not to use state management libraries. `useState` is surely a choice for the sake of brevity and clarity. But are there any issues we have to deal with? In this article, I want to make some improvements on `useState` hook and how we can replace it with `useReducer` as an alternative solution."
date: 2023-03-01
authors:
  - leduyhien152
github_id: leduyhien152
tags:
  - state-management
  - components
  - frontend
  - react
redirect:
  - /s/KJ3fQQ
---

Imagine we have a component with multiple states. It is simple enough not to use state management libraries. `useState` is surely a choice for the sake of brevity and clarity. But are there any issues we have to deal with? In this article, I want to make some improvements on `useState` hook and how we can replace it with `useReducer` as an alternative solution.

## The problem

Let's take a look at the code below:

```jsx
function EditCalendarEvent() {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState();
  const [attendees, setAttendees] = useState([]);

  return (
    <>
      <input value={title} onChange={(e) => setTitle(e.target.value)} />
      {/* ... */}
    </>
  );
}
```

The component is used to update a calendar event. Sadly, it has several problems:

- Using too many `useState` hooks make your code look like a mess, especially when the list of state grows longer and longer.
- No safeguards. In other words, you may not guarantee that state is updated accurately. There’s nothing preventing you from choosing an end date that’s before the start date. You can validate other related states first but only if you remember (or even know) they exist.

## An improvement of `useState`

To improve the code above, we can gather all states in one big object:

```jsx
function EditCalendarEvent() {
  const [event, setEvent] = useState({
    title: "",
    description: "",
    attendees: [],
  });

  return (
    <>
      <input
        value={event.title}
        onChange={(e) => setEvent({ ...event, title: e.target.value })}
      />
      {/* ... */}
    </>
  );
}
```

Look better. However, there are still potential pitfalls:

- Always remember to spread on `...event` so you don’t mess up by mutating the object directly and subsequently causing React to not rerender as expected.

- You can validate before updating states but the validations are separated and somehow hard to control all of them.

One solution is using a curried function:

```jsx
function EditCalendarEvent() {
  const [event, setEvent] = useState({
    title: "",
    description: "",
    attendees: [],
  });

  const handleChange = (field) => (e) => {
    // Validate and transform event to ensure state is always valid
    // in a centralized way
    // ...
    setEvent({ ...event, [field]: e.target.value });
  };

  return (
    <>
      <input value={event.title} onChange={handleChange("title")} />
      {/* ... */}
    </>
  );
}
```

Do not forget that there are two ways to update state now and make sure you pick the right one or else the curried function will be meaningless.

## Adopting `useReducer` as an alternative to `useState`

Many people know `useReducer`, but a small number of them actually want to use it. With `useReducer`, we could rewrite the code to be like this:

```jsx
function EditCalendarEvent() {
  const [event, updateEvent] = useReducer(
    (prev, next) => {
      return { ...prev, ...next };
    },
    { title: "", description: "", attendees: [] },
  );

  return (
    <>
      <input
        value={event.title}
        onChange={(e) => updateEvent({ title: e.target.value })}
      />
      {/* ... */}
    </>
  );
}
```

The `useReducer` hook helps you control transformations from state A to state B. This guarantees your states are always valid, in a fully **centralized** way. So with this model, even if the code becomes more complex, new states are added, we can still manage and maintain them without so much effort.

```jsx
function EditCalendarEvent() {
  const [event, updateEvent] = useReducer(
    (prev, next) => {
      const newEvent = { ...prev, ...next };

      // Ensure that the start date is never after the end date
      if (newEvent.startDate > newEvent.endDate) {
        newEvent.endDate = newEvent.startDate;
      }

      // Ensure that the title is never more than 100 chars
      if (newEvent.title.length > 100) {
        newEvent.title = newEvent.title.substring(0, 100);
      }
      return newEvent;
    },
    { title: "", description: "", attendees: [] },
  );

  return (
    <>
      <input
        value={event.title}
        onChange={(e) => updateEvent({ title: e.target.value })}
      />
      {/* ... */}
    </>
  );
}
```

## Other use cases for `useReducer`

As can be seen from code above, `useReducer` might replace `useState` for "complex state", and moreover we do not need to follow the redux style. I still believe `useReducer` is underestimated.

Here is an example of toggling state with `useReducer`:

```jsx
function EditCalendarEvent() {
  const [value, toggleValue] = useReducer((prev) => !prev, false);

  return (
    <>
      <button onClick={toggleValue}>Toggle</button>
    </>
  );
}
```

The implementation is simple, and it really shows the flexibility of `useReducer`.

If you love Redux, sure, you can adhere the action-based pattern as well. It is important to keep in mind that you must always treat the state value of the `useReducer` hook as immutable. To avoid running into this problem, `Immer` is one of the best choice.

## The conclusion

In general, developers prefer `useState` to `useReducer`. It is not their fault since `useState` is more familiar and introduced from the very first tutorial of hooks. However, the ability to supply a function that controls state transitions of `useReducer` is great and surely worth your consideration.

## Reference

- https://dev.to/builderio/a-cure-for-react-usestate-hell-1ldi
