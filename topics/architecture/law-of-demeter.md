---
title: Law of demeter
description: Learn how the Law of Demeter reduces object dependencies by promoting loose coupling and improving code flexibility, maintainability, and testability in object-oriented programming.
date: 2023-01-17
github_id: namtrhg
icy: 10
redirect:
  - /s/H_9vKA
---

**The Law of Demeter (LoD)**, also known as the Philosophy of Least Knowledge, is a program design principle that states that an object should only communicate with objects that are close to it in the object graph. This concept contributes to reducing object dependency and making code more manageable and testable.

## What is the Law of Demeter?

This indicates that an object should not directly access the attributes or methods of another object to which it is not directly related. It should instead only invoke methods on objects to which it has a direct connection.

For example, if object `A` wants to access a property of object `C`, it should not directly access the `C` property. Instead, it should request the property of `C` from object `B` to which it has a direct connection.

This principle helps to promote loose coupling between objects, which makes the code more flexible and easier to change. It also makes it easier to test individual objects in isolation, as they are less dependent on other objects in the system.

## Code example

```js
class Info {
  constructor(employee) {
    this.employee = employee;
  }

  // This violates the Law of Demeter
  getEmployeeCompanyName() {
    return this.employee.company.name;
  }

  // This follows the Law of Demeter
  getEmployeeComapnyName() {
    return this.employee.getCompanyName();
  }
}

class Employee {
  constructor(name, company) {
    this.name = name;
    this.company = company;
  }

  getCompanyName() {
    return this.company.name;
  }
}

class Company {
  constructor(name) {
    this.name = name;
  }
}

const employee = new Employee("Nigel", new Company("Dwarves Foundation"));
const info = new Info(employee);
console.log(info.getEmployeeCompanyname()); // "Dwarves Foundation"
```

In this example, the Info class has a method `getEmployeeCompanyName()` which originally violates the Law of Demeter, as it directly accesses the `name` property of the `company` object. This creates a tight coupling between the Info and Company classes, making it more difficult to change or test one class without affecting the other.

The Law of Demeter is followed by adding a new method `getCompanyName()` to the Employee class, which the Order class calls instead. The Info class no longer has to know anything about the Company class, it only needs to know that the employee has a `getCompanyName()` method. This makes the code more flexible and easier to change or test.

## Pros and cons

### Pros

- Helps to minimize coupling between objects, making the code more modular and easier to maintain.
- Reduces the risk of unexpected side effects when making changes to the code.
- Makes it easier to understand the flow of data and control in the system.

### Cons

- This can lead to a large number of very small objects, which can make the code more difficult to understand.
- Can make it more difficult to enforce business rules that span multiple objects.
- This may lead to code duplication if the same data needs to be passed through several layers of objects.

## What should you take into consideration?

It's important to note that the Law of Demeter should be applied with discretion, as it is not always possible or desirable to completely eliminate all direct interactions between objects. The idea is to reduce the number of direct interactions as much as possible while still keeping the code readable and maintainable.

## References

- <https://en.wikipedia.org/wiki/Law_of_Demeter>
- <https://gist.github.com/k1paris/14548413e57c190d3701b5fcb095e061>
- <https://www.infoworld.com/article/3136224/demystifying-the-law-of-demeter-principle.html#:~:text=The%20Law%20of%20Demeter%20(or,internal%20details%20of%20other%20objects>
