---
title: Tackling server state complexity in frontend development
description: Frontend development has become increasingly complex over the years, and with it, the need for efficient state management.
date: 2023-03-11
authors:
  - zlatanpham
github_id: zlatanpham
tags:
  - state-management
  - frontend
  - react
redirect:
  - /s/RgaLjw
---

Frontend development has become increasingly complex over the years, and with it, the need for efficient state management. Global State is one such programming pattern that has emerged as a solution to the problem of prop drilling. Prop drilling is the process of passing data through multiple levels of nested components, which can make code difficult to maintain. By managing and sharing state across multiple components, Global State reduces the need to pass data through each component, resulting in cleaner and more maintainable code.

While Global State is convenient, it has its limitations, particularly when it comes to server-state data. Most applications consume and manipulate data from synchronous and asynchronous sources, commonly referred to as Client State and Server State. Historically, developers have treated both types of state as Global State.

```js
const globalState = {
  // Client state
  isMenuOpen: false,
  alerts: [...],
  // Server state
  user: {...},
  cart: {...},
  orders: [...],
  customers: [...],
  ...
}
```

However, Server State and Client State differ in nature. While Client State is entirely controlled by the client, Server State is remotely persisted. The source of truth is outside of the application's control, and when dealing with data that changes frequently, it's crucial to keep Global State in sync with the remote world. This synchronization requires dealing with caching, outdated requests, updating data in the background, and memory management—factors that ensure efficient data handling and prevent performance issues.

Redux users may already be familiar with the challenges of storing API responses in Global State, which requires boilerplate code to handle loading state, error state, and revalidation when data becomes stale.

Fortunately, libraries are available to deal with Server State more effectively than Global State. Two popular libraries among developers are [SWR](https://swr.vercel.app/) and [React-Query](https://react-query-v3.tanstack.com/). While these libraries have differences, their purpose is the same: to provide a simple interface for storing asynchronous data and abstract away the complexity of dealing with server-state data.

Consider the following code comparison between Redux and React-Query:

```js
// Redux
export const fetchUser = createAsyncThunk('user/fetchUser', async () => {
  const response = await fetch('/api/user');
  const data = await response.json();
  return data;
});

const userSlice = createSlice({
  name: 'user',
  initialState: { data: {}, loading: false, error: null },
  reducers: { ... },
  extraReducers: (builder) => {
    builder.addCase(fetchUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

// React-Query
const { data, isLoading, error } = useQuery('user', fetch('/api/user'))
```

In this comparison, Redux requires more lines of code and additional boilerplate to handle loading and error states. On the other hand, React-Query simplifies the process significantly, making it easier for developers to maintain the code.

In conclusion, Global State management is useful in many ways, but its limitations should be considered when deciding whether to use it. If state comes from Server sources, it's important to assess whether it should be treated as Global State or not. In cases where dealing with server-state data is necessary, libraries like SWR and React Query can simplify the process by abstracting the complexities.
