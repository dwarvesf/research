---
title: Testing strategies in React
short_title: Testing strategies
description: React testing with unit, integration, and end-to-end approaches
date: 2024-10-29
authors:
  - zlatanpham
tags:
  - react
  - testing
redirect:
  - /s/ITfz3g
---

Testing is essential for ensuring that your code works as expected, is maintainable, and doesn't introduce bugs with future changes. React testing involves **unit tests, integration tests, and end-to-end (e2e) tests**, each targeting different aspects of your application's functionality.

Key testing strategies for React applications:

- **Unit testing** with Jest and React testing library
- **Integration testing** for component interactions
- **End-to-end (e2e) testing** with Cypress
- **Snapshot testing** for UI consistency

### Unit testing with Jest and React testing library

**Unit testing** focuses on testing individual components or functions in isolation, ensuring they work as expected independently of other parts of the application. **Jest** is a popular testing framework for JavaScript that's fast and powerful, while **React testing library** provides utilities to interact with and assert on component output based on how a user would interact with it.

#### Setting up Jest and React testing library

Install Jest and React testing library:

```sh
npm install --save-dev jest @testing-library/react
```

Add a basic test configuration in your `package.json`:

```js
{ "scripts": { "test": "jest" } }
```

#### Example unit test for a button component

Suppose we have a `Button` component that accepts a label and an onClick handler.

```js
// Button.js
export default function Button({ label, onClick }) {
  return <button onClick={onClick}>{label}</button>;
}
```

**Unit test for button component:**

```jsx
// Button.test.js
import { render, screen, fireEvent } from "@testing-library/react";
import Button from "./Button";

test("renders the button with a label", () => {
  render(<Button label="Click me" />);
  expect(screen.getByText("Click me")).toBeInTheDocument();
});

test("calls the onClick handler when clicked", () => {
  const handleClick = jest.fn();
  render(<Button label="Click me" onClick={handleClick} />);
  fireEvent.click(screen.getByText("Click me"));
  expect(handleClick).toHaveBeenCalledTimes(1);
});
```

Explanation:

- `screen.getByText("Click me")` selects the button by its text, simulating how a user would identify it.
- `fireEvent.click` simulates a click event, testing that `onClick` is called when expected.

**Benefits**:

- **Isolation**: Tests each component individually, ensuring independent functionality.
- **User-centric testing**: React testing library encourages testing from a user's perspective, improving test relevancy.

### Integration testing for component interactions

Integration tests verify that multiple components work together as expected. For instance, testing a form component with multiple fields and a submit button ensures that they interact correctly and trigger the proper behaviors.

#### Example: testing a form submission

Suppose we have a form component with name and email fields and a submit button.

```jsx
// Form.js
import { useState } from "react";

export default function Form({ onSubmit }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, email });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
}
```

**Integration test for form component:**

```jsx
// Form.test.js
import { render, screen, fireEvent } from "@testing-library/react";
import Form from "./Form";

test("submits form with name and email", () => {
  const handleSubmit = jest.fn();
  render(<Form onSubmit={handleSubmit} />);

  fireEvent.change(screen.getByPlaceholderText("Name"), {
    target: { value: "John" },
  });
  fireEvent.change(screen.getByPlaceholderText("Email"), {
    target: { value: "john@example.com" },
  });
  fireEvent.click(screen.getByText("Submit"));

  expect(handleSubmit).toHaveBeenCalledWith({
    name: "John",
    email: "john@example.com",
  });
});
```

Explanation:

- We simulate typing into both input fields, then trigger the form submission to ensure `onSubmit` is called with the correct data.

**Benefits**:

- **Interaction testing**: Validates that components interact correctly, ensuring data flows as expected.
- **Form and input testing**: Particularly useful for forms and multistep processes, verifying that all parts work in sequence.

### End-to-end (e2e) testing with Cypress

E2E tests simulate real user scenarios, covering the entire flow from start to finish, including interactions with the backend if needed. **Cypress** is a powerful tool for e2e testing in JavaScript applications, allowing for testing of full workflows across pages.

#### Setting up Cypress

Install Cypress:

```sh
npm install --save-dev cypress
```

Open Cypress for the first time:

```sh
npx cypress open
```

#### Example e2e test for a login flow

Suppose we have a login form where users enter an email and password to authenticate.

```jsx
// cypress/integration/login.spec.js
describe("Login Flow", () => {
  it("logs in a user with valid credentials", () => {
    cy.visit("/login");
    cy.get("input[name=email]").type("john@example.com");
    cy.get("input[name=password]").type("password123");
    cy.get("button[type=submit]").click();

    cy.url().should("include", "/dashboard");
    cy.contains("Welcome, John").should("be.visible");
  });
});
```

Explanation:

- **`cy.visit("/login")`** navigates to the login page.
- **Assertions** check that the login was successful by verifying the URL and checking for a welcome message.

**Benefits**:

- **Real user simulation**: Tests full workflows, covering real user interactions with the application.
- **Cross-page coverage**: Ensures that transitions between pages work as expected and user data is preserved.

### Snapshot testing for UI consistency

Snapshot tests capture the current state of a component's output (i.e., its rendered HTML) and compare it to a saved version. Snapshot testing is helpful for detecting unintended changes in the component's visual structure.

#### Snapshot testing with Jest

```jsx
// Header.test.js
import { render } from "@testing-library/react";
import Header from "./Header";

test("renders the header correctly", () => {
  const { asFragment } = render(<Header title="Hello, World!" />);
  expect(asFragment()).toMatchSnapshot();
});
```

Explanation:

- `asFragment()` captures the component's current rendered state.
- `toMatchSnapshot()` checks the current output against a previously saved snapshot.

**Benefits**:

- **UI consistency**: Ensures that the UI remains visually consistent across updates.
- **Quick regression detection**: Quickly identifies changes to the component's structure, ideal for components with complex styles or markup.

**Limitations**:

- Snapshots can be too sensitive to minor changes, so they are best used for components with stable layouts or infrequent updates.

### Best practices for effective testing

- **Follow the testing pyramid**: Focus primarily on unit tests, followed by integration tests, and finally e2e tests. This balances test coverage with performance and maintainability.
- **Test from the user's perspective**: Use React testing library's queries like `getByText`, `getByRole`, and `getByLabelText` to mimic how users interact with your UI. Avoid testing internal implementation details, focusing on behavior instead.
- **Avoid overuse of snapshot tests**: Snapshot tests are helpful but can become brittle if overused. Use them selectively for components with complex or static UI.
- **Mock external dependencies**: For unit and integration tests, mock API calls, third-party libraries, and other dependencies to isolate the code under test. Libraries like **msw** (Mock Service Worker) can be used to mock API responses.
- **Run tests in CI/CD**: Automate tests in your CI/CD pipeline to catch bugs early in the development process. Run unit and integration tests for each commit and e2e tests periodically or before release.
- **Structure tests closely to source files**: Place each test file alongside its component or module. This structure makes it easy to locate and update tests when refactoring.

### Summary

Incorporating a comprehensive testing strategy helps ensure code quality, user experience, and long-term maintainability. Here's a quick summary:

- **Unit testing**: Focus on individual components and functions with Jest and React testing library.
- **Integration testing**: Test multiple components together, ensuring they work in harmony.
- **End-to-end testing**: Use Cypress to cover full workflows and user journeys, verifying app behavior across pages.
- **Snapshot testing**: Capture and compare UI structures, helpful for components with complex, static layouts.
- **Best practices**: Adopt the testing pyramid, test from the user's perspective, mock dependencies, and automate tests in CI/CD
