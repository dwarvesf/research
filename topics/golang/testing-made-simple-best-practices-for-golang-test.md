---
title: Testing made simple best practices for golang test
description: Learn the best practices for testing in Golang, including writing effective test cases with the AAA pattern, organizing tests with subtests and helpers, using table-driven tests, and applying test doubles and mocks.
date: 2023-08-08
github_id: datphamcode295
icy: 10
redirect:
  - /s/FhdPQA
---

This article focuses on the best practices for testing in Golang. By following these recommended approaches, you can ensure the effectiveness and efficiency of your testing efforts. We will explore various aspects such as writing effective test cases, organizing tests and using test doubles. Implementing these best practices will help you write reliable, maintainable, and high-quality tests for your Golang projects.

## 1. Writing effective test cases with AAA pattern

Writing effective test cases requires careful consideration of their characteristics and structure. Good test cases exhibit readability, maintainability, independence, focus, and completeness. By following the AAA pattern, organizing test cases into Arrange, Act, and Assert sections, you enhance the readability, maintainability, and effectiveness of your test cases. The AAA pattern helps in isolating specific behaviors, focusing on desired outcomes, and providing a clear structure for test case development.

The AAA pattern provides a structured approach for organizing test cases into three distinct sections: Arrange, Act, and Assert.

1. **Arrange:** In the Arrange section, you set up the necessary preconditions and initialize any objects or variables required for the test. This includes creating instances, providing test inputs, and preparing the system under test for the specific scenario you want to test.
2. **Act:** The Act section involves executing the specific action or invoking the method being tested. This step represents the core behavior or functionality that you want to verify. It often involves calling methods or functions with the prepared test inputs.
3. **Assert:** In the Assert section, you verify the outcome or the expected behavior of the system under test. Here, you check whether the actual results match the expected results or make assertions about the state of the system after the action has been performed. The assertions should be specific and focused, ensuring that the desired behavior is met.

By structuring test cases using the AAA pattern, you achieve several benefits. The pattern improves the readability and maintainability of your test cases, making them easier to comprehend and modify when needed. It also enhances test independence, allowing each test case to stand on its own and produce reliable results. The AAA pattern helps focus on specific aspects of the code being tested and ensures comprehensive coverage by explicitly stating the expected behavior or outcomes.

**Example:**

Let's consider a simple example to demonstrate the AAA pattern in action. Suppose we have a function **`Add`** that adds two integers:

```go
func Add(a, b int) int {
  return a + b
}
```

An effective test case for this function would follow the AAA pattern:

```go
func TestAdd(t *testing.T) {
  // Arrange
  a := 2
  b := 3
  expected := 5

  // Act
  result := Add(a, b)

  // Assert
  if result != expected {
    t.Errorf("Add(%d, %d) = %d, expected %d", a, b, result, expected)
  }
}

```

By separating the test case into the Arrange, Act, and Assert sections, it becomes clear what inputs are used, what action is performed, and what outcome is expected. This clarity makes it easier to understand the purpose of the test and identify any issues that may arise.

## 2. Test organization and structure

### Organizing Test Files and Packages:

A common and convenient practice is to keep the test files in the same directory as the package files they are testing. This approach simplifies the organization of your project and makes it easier to locate and manage the associated tests. For example, consider a project with a package called **`myapp`** that contains multiple files. You can place the test files in the same directory as the package files, like this:

```
myapp
├── main.go
├── go.mod
├── go.sum
├── controller
│   ├── controller.go
│		└──	controller_test.go
└── store
    ├── user.go
		└──	user_test.go
```

### Subtests and Test Helpers:

Subtests and test helpers are powerful tools for improving test readability and maintainability. Let's consider an example of testing a **`Calculator`** struct with multiple operations.

```go
type Calculator struct{}

func (c *Calculator) Add(a, b int) int {
    return a + b
}

func (c *Calculator) Subtract(a, b int) int {
    return a - b
}
```

Using subtests, we can group related tests together and provide more descriptive output:

```go
func TestCalculator(t *testing.T) {
    calc := &Calculator{}

    t.Run("Addition", func(t *testing.T) {
        result := calc.Add(2, 3)
        expected := 5
        if result != expected {
            t.Errorf("Addition test failed: got %d, expected %d", result, expected)
        }
    })

    t.Run("Subtraction", func(t *testing.T) {
        result := calc.Subtract(5, 3)
        expected := 2
        if result != expected {
            t.Errorf("Subtraction test failed: got %d, expected %d", result, expected)
        }
    })
}
```

By using subtests, we can clearly identify which specific test case has failed, making it easier to debug and pinpoint the issue.

Test helpers, on the other hand, promote code reuse and reduce duplication across tests. Let's create a test helper to simplify the assertion process:

```go
func assertEqual(t *testing.T, got, expected int, message string) {
    t.Helper()
    if got != expected {
        t.Errorf("%s: got %d, expected %d", message, got, expected)
    }
}

func TestCalculator(t *testing.T) {
    calc := &Calculator{}

    t.Run("Addition", func(t *testing.T) {
        result := calc.Add(2, 3)
        assertEqual(t, result, 5, "Addition test failed")
    })

    t.Run("Subtraction", func(t *testing.T) {
        result := calc.Subtract(5, 3)
        assertEqual(t, result, 2, "Subtraction test failed")
    })
}
```

By extracting the assertion logic into a helper function, we improve code readability and ensure consistent and DRY (Don't Repeat Yourself) test code.

### Table-Driven Tests:

Table-driven tests are an effective technique for handling multiple inputs and expected outputs in a concise and structured manner. By defining a table of test cases, you can easily add new scenarios and maintain a clear overview of the different input-output combinations being tested.

Let's consider an example of testing a function called **`IsValidEmailAddress`**, which validates whether an email address is valid or not:

```go
func IsValidEmailAddress(email string) error {
	if email == "" {
		return ErrEmptyEmail
	}
	if !strings.Contains(email, "@") {
		return ErrInvalidEmail
	}
	return nil
}
```

To test this function with various input scenarios, we can use a table-driven approach:

```go
func TestIsValidEmailAddress(t *testing.T) {
	type args struct {
		email string
	}

	testCases := []struct {
		name    string
		args    args
		wantErr error
	}{
		{
			name:    "Valid email",
			args:    args{email: "test@example.com"},
			wantErr: nil,
		},
		{
			name:    "Empty email",
			args:    args{email: ""},
			wantErr: ErrEmptyEmail,
		},
		{
			name:    "Invalid email",
			args:    args{email: "notanemail"},
			wantErr: ErrInvalidEmail,
		},
		// Add more test cases as needed
	}

	for _, tc := range testCases {
		t.Run(tc.name, func(t *testing.T) {
			err := IsValidEmailAddress(tc.args.email)
			if err != tc.wantErr {
				t.Errorf("Name: %s, Expected: %v, Got: %v", tc.name, tc.wantErr, err)
			}
		})
	}
}
```

The **`testCases`** table contains structs representing each test case with the **`name`** (a descriptive name for the test case), **`args`** (input arguments), and **`wantErr`** (expected error).
By iterating over the **`testCases`** table, we run subtests using **`t.Run`** with distinct names derived from the **`name`** field. This approach enables identifying specific test case failures.
The test function invokes **`IsValidEmailAddress`** with the provided input arguments and compares the returned error with the expected error. Any mismatch is reported as a test failure.
By using this table-driven approach, you can easily add more test cases and maintain a clear overview of the scenarios being covered.

## 3. [[Test doubles]] and mocking

[[Test Doubles|Test doubles]] are objects that mimic the behavior of real dependencies in a controlled manner during testing. They are used to isolate the code under test from its actual dependencies, ensuring that the behavior of the code being tested can be observed and verified independently. Here are five common types of test doubles:

1. **Test stubs:** Predefined responses to method calls used for simulating specific behaviors during testing.
2. **Mocks:** Objects or functions that simulate real dependencies and allow you to define expectations and verify interactions during testing.
3. **Dummies:** Placeholder objects or functions with no real implementation, used when certain parameters or dependencies are required but behavior is irrelevant.
4. **Spies:** Wrappers around real objects or functions that record their interactions, useful for verifying method calls and arguments during testing.
5. **Fakes:** Simplified implementations of dependencies that reproduce essential behavior without external dependencies, providing a controlled alternative for testing.

**Note: More about Test doubles you can find here**

The primary purpose of using test doubles is to isolate the code under test from its dependencies. By replacing real dependencies with test doubles, you can control their behavior and ensure that the code being tested is not affected by the actual implementations or external factors.

Test doubles help create reliable and repeatable tests by removing external dependencies, such as network calls or database interactions, that may introduce variability or make testing more challenging. They allow you to focus on specific scenarios, edge cases, or error conditions that may be difficult to reproduce with real dependencies.

There are several mocking libraries available for Golang. Here are some popular one:

- **testify:** testify is a widely-used testing toolkit that includes a mock package (**`github.com/stretchr/testify/mock`**). It offers a flexible and expressive syntax for creating and asserting mock behavior. Example usage can be found in the official documentation.
- **gomock:** gomock is a mocking framework developed by Google that integrates well with the Go testing ecosystem. It generates mocks based on defined interfaces, simplifying the creation of test doubles. You can find detailed examples and usage instructions in the official gomock repository.
- **mockery:** mockery is a simple and flexible mock generator that allows you to generate mocks based on interfaces. It is designed to be easy to use and integrates well with popular testing frameworks. You can find more information and examples in the mockery GitHub repository.

When using these mocking libraries, you can define the expected behavior of the test doubles, specify method calls, return values, or errors, and verify that the expected interactions occur during the test execution.

## Conclusion

This article outlines best practices for testing in Golang, including writing effective test cases using the Arrange-Act-Assert pattern and organizing tests with subtests and test helpers, and using table-driven tests. It also covers the use of test doubles, such as test stubs, mocks, dummies, spies, and fakes, to isolate code under test from dependencies and ensure reliable and repeatable tests. With popular mocking libraries for Golang, such as testify, gomock, and mockery, are also discussed.

## References

- [https://google.github.io/styleguide/go/best-practices.html#tests](https://google.github.io/styleguide/go/best-practices.html#tests)
- [https://climbtheladder.com/10-golang-testing-best-practices/](https://climbtheladder.com/10-golang-testing-best-practices/)
