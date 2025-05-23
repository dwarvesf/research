---
title: Unit testing best practices in Golang
description: An in-depth exploration of arrays and slices in Go, covering their differences, internal implementations, and key operations like append. Learn about fixed-length arrays, flexible slices, and how Go manages memory allocation for growing slices.
date: 2023-04-11
authors:
  - taynguyen
tags:
  - backend
  - engineering
  - golang
  - practice
redirect:
  - /s/lRv4MA
---

One common issue we often tackle in backend engineering is writing test cases. In this article, we will explore the techniques for crafting effective tests in Go, discussing best practices for writing unit tests and utilizing mocks to achieve better isolation. Although our primary focus lies in unit testing-related practices, it is important to note that Golang also supports integration testing. We will also tackle the subject of integration testing in a future article, where we will examine the details and best practices for integration testing in Golang.

## Introduction

### Importance of testing in software development

Testing is crucial in software development to catch bugs and errors, ensure maintainability and modularity, and improve security, and overall software quality. With the rise of cybersecurity threats, testing is becoming increasingly important to ensure software systems are secure and reliable.

What follows is a non-comprehensive list of the benefits you get from adopting unit testing:

- **Unit tests enable earlier bug detection and resolution**
- **Your suite of unit tests becomes a safety net for developers**

A comprehensive suite of unit tests can act as a safety net for developers. By frequently running the tests, they can assure their recent modifications to the code haven’t broken anything

- Unit tests can contribute to higher code quality

This item is a natural consequence of the previous one. Since unit tests act as a safety net, developers become more confident when changing the code. They can refactor the code without fear of breaking things, driving the general quality of the codebase up.

- **Detect code smells in your codebase**

If the ease of adding unit tests to a codebase is a good sign, the opposite is also true. Having a hard time creating unit tests for a given piece of code might be a sign of code smells in the code—e.g. functions that are too complex.

### Overview of Golang testing framework

The Golang testing package offers a user-friendly framework to create unit tests, benchmarks, and examples, streamlining the development process in Golang by enabling execution from the command line. Package testing allows for a variety of test types, including performance, parallel, and functional testing, as well as any combination these.

**Steps for writing test suite in Golang:**

- Create a file whose name ends with \_test.go
- Import package testing by import “testing” command
- Write the test function of form\ <u>func TestXxx(_testing.T)_</u> which uses any of Error, Fail, or related methods to signal failure.
- Put the file in any package.
- Run command go test

Example of a test file:

```go
package main

import (
	"testing"
)

// test function
func TestYourFunc(t *testing.T) {
	actualString := YourFunc()
	expectedString := "dwarvesv"
	if actualString != expectedString{
		t.Errorf("Expected String(%s) is not same as"+
		" actual string (%s)", expectedString,actualString)
	}
}
```

## Strategies for writing effective tests

### Make your code testable and easy to test

When working on code projects, developers often devote a large portion of their time to choosing the right frameworks, libraries, databases, and other third-party components, while the importance of testing is sometimes overlooked.

Proper testing actually makes your project better because it encourages you to:

- Apply clean code: write short functions, handle a single task per function, etc.
- Write extendable and agnostic code through the use of abstractions, interfaces and mocks.
- Understand the business logic better by testing regular/edge cases and high coverage of these.
- Avoid legacy, long-untouched and unmaintainable code — tests will ease the process of maintaining and verifying changes to code so it doesn’t rot.

### Writing clear and concise test cases

One of the most important of a good test is easy to read and maintain, it should be taken in mind as important as implementing:

**Naming test case** The name of your test should consist of three parts:

- The name of the method being tested.
- The scenario under which it's being tested.
- The expected behavior when the scenario is invoked.

Examples:

- Bad naming: `Error 1`, `invalid input 1`, `test 1`
- Good naming: `Should returns same number WHEN input single number`, `Should returns 0 WHEN emtpy string`

**Table driven testing** A test can quickly become unreadable, repetitive, and overall annoying when the function you want to test is handling too many tasks, especially when there are many different cases you want to test, for example:

```go
package main

import (
   "github.com/stretchr/testify/assert"
   "testing"
)

func TestHadAGoodGame(t *testing.T) {
   tests := []struct {
      name     string
      stats   Stats
      goodGame bool
      wantErr  string
   }{
      {"sad path: invalid stats", Stats{Name: "Sam Cassell",
         Minutes: 34.1,
         Points: -19,
         Assists: 8,
         Turnovers: -4,
         Rebounds: 11,
         }, false, "stat lines cannot be negative",
      },
      {"happy path: good game", Stats{Name: "Dejounte Murray",
         Minutes: 34.1,
         Points: 19,
         Assists: 8,
         Turnovers: 4,
         Rebounds: 11,
      }, true, ""},
   }
   for _, tt := range tests {
      isAGoodGame, err := hadAGoodGame(tt.stats)
      if tt.wantErr != "" {
         assert.Contains(t, err.Error(), tt.wantErr)
      } else {
         assert.Equal(t, tt.goodGame, isAGoodGame)
      }
   }
}
```

### Use interfaces and avoid file I/O, API call

When writing tests, it's important to use interfaces and avoid file I/O and API calls wherever possible. You want your tests to be fast, independent, isolated, consistent, and not flaky. Here are some best practices to keep in mind:

**Use interfaces** By using interfaces, you can decouple your code from its dependencies, making it easier to test in isolation. Instead of calling concrete implementations, you can call interfaces that define the behavior you need, for example:

```go
type repository interface {
  GetRecipe(recipeID string) (domain.Recipe, error)
  CreateRecipe(recipe domain.Recipe) error
  UpdateRecipe(recipe domain.Recipe) error
}
```

**Mock dependencies** To test code that relies on external dependencies, use mocks to simulate the behavior of those dependencies. This approach allows you to test your code in isolation, without relying on external resources.

```go
import (
    "testing"

    "github.com/stretchr/testify/assert"
)

func Test_getFromDB(t *testing.T) {
    mockDB := NewMockDB(t)
		mockDB.On("GetFlavor").Return("Chocolate", nil)
    flavor := getFromDB(mockDB)
    assert.Equal(t, "chocolate", flavor)
}
```

**Avoid file I/O**

File I/O can be slow and unreliable, making it difficult to test code that relies on it. Instead, consider using interfaces to abstract away file I/O and using mocks to simulate file operations during testing.

```go
func Test_getFromDB(t *testing.T) {
		mockReader := reader.NewMock()
		mockReader.On("Read", mock.Anything).Return(100, nil)
    scanSvc := scan.NewInstance(mockReader)

		expectedSize := 100
    assert.Equal(t, scan.size(), expectedSize)
}
```

**Avoid API calls** Like file I/O, API calls can be slow and unreliable, making it difficult to test code that relies on them. Instead, consider using interfaces to abstract away API calls and using mocks to simulate API responses during testing.

```go
func Test_AcceptJobRequest(t *testing.T) {
		mockEmailGwy := new(email.MockGateway)
		mockEmailGwy.On("SendEmailWithTemplate", mock.Anything, mock.Anything).Return(nil)

		workerCtrl := worker.New(mockEmailGwy)
		err := workerCtrl.acceptAndNotify()
		// Some asserts here
}
```

### Covering edge cases and boundary conditions

As we all know, this is a basic test strategy, but this reveals most of the potential bugs. Because humans usually break the rule, and that would break the happy flow. It's important to cover edge cases and boundary conditions to ensure that your code can handle extreme or unexpected values. Here are some tips for covering edge cases and boundary conditions in your tests:

- **Test extreme values**: Be sure to test extreme values, such as the maximum and minimum values that your code can handle.
- **Test unexpected input**: Be sure to test any weird input values or characters that might look like it would affect the test.
- **Test corner cases**: Be sure to test corner cases, such as scenarios where multiple inputs or conditions intersect. This approach can help you catch issues with complex logic or interactions between different parts of your code.

## Test coverage

Test coverage is defined as a metric in Software Testing that measures the amount of testing performed by a set of tests. It will include gathering information about which parts of a program are executed when running the test suite to determine which branches of conditional statements have been taken.

In simple terms, it is a technique to ensure that your tests are testing your code or how much of your code you exercised by running the test.

- **Very poor: 0-20% coverage**. This means that very few or no unit tests have been written to test the code, which can result in bugs and errors going unnoticed.
- **Poor: 21-40% coverage**. This means that some unit tests have been written, but a significant amount of code remains untested.
- **Acceptable: 41-60% coverage**. This means that a reasonable number of unit tests have been written to test the code, but there is still room for improvement.
- **Good: 61-80% coverage**. This means that a large percentage of the code has been covered by unit tests, and most potential bugs and errors have been caught.
- **Very good: 81-100% coverage**. This means that almost all code has been covered by unit tests, and the likelihood of bugs and errors slipping through is very low. However, achieving 100% coverage may not always be practical or necessary, depending on the nature and complexity of the code.

Although it depends on the project's status, ideally, we recommend aiming for a test coverage between **61-80%**. However, don't become obsessed with the number; the primary goal is to write tests that help us catch bugs effectively.

## Tooling and library

Golang possesses a robust testing framework; however, employing supplementary tools can enhance the development experience and reduce code creation efforts.

- **Mocking**: Rather than creating mock code manually, consider utilizing a mocking library, such as gomock or mockery, which supports mocking and generates mocks from interfaces, thereby reducing time expenditure.
- **Assert**: The default Golang testing framework has limited assertion capabilities. Alternatively, tools like testify provide improved support and more user-friendly assertions.

## Conclusion

In this article, we've covered the basics of testing in Golang and explored some strategies for writing effective and maintainable tests. We've seen best practices for using interfaces, avoiding file I/O and API calls, automating unit tests, and covering edge cases and boundary conditions.

By following these strategies and best practices, you can write tests that are easier to run, understand, and maintain. By investing time in testing, you can catch bugs and errors earlier in the development process, which can save time and improve the overall quality of your code.

Remember, testing is not a one-time task but an ongoing process that should be integrated into your development workflow. With the right tools, frameworks, and mindset, testing can become a natural and valuable part of your development process, helping you build more reliable and maintainable software.

## References

[Overview of testing package in Golang](https://www.geeksforgeeks.org/overview-of-testing-package-in-golang/)

[5 tips for better unit testing in golang](https://blog.devgenius.io/5-tips-for-better-unit-testing-in-golang-b25f9e79885a)

[https://learn.microsoft.com/en-us/dotnet/core/testing/unit-testing-best-practices](https://learn.microsoft.com/en-us/dotnet/core/testing/unit-testing-best-practices)

[https://www.testim.io/blog/unit-testing-best-practices/](https://www.testim.io/blog/unit-testing-best-practices/)

[https://www.freecodecamp.org/news/a-beginners-guide-to-testing-implement-these-quick-checks-to-test-your-code-d50027ad5eed/](https://www.freecodecamp.org/news/a-beginners-guide-to-testing-implement-these-quick-checks-to-test-your-code-d50027ad5eed/)

[https://testing.googleblog.com/2020/08/code-coverage-best-practices.html](https://testing.googleblog.com/2020/08/code-coverage-best-practices.html)
