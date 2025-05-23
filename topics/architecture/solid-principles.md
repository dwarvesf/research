---
title: Solid principles
description: Learn the SOLID principles of object-oriented design to create clean, maintainable, and flexible code with key concepts like Single Responsibility, Open-Closed, Liskov Substitution, Interface Segregation, and Dependency Inversion.
date: 2023-04-20
github_id: nguyend-nam
icy: 10
redirect:
  - /s/t7NkcA
---

## What & Why?

The SOLID Principles are five principles of **object-oriented** class design. They are a set of rules and best practices to follow while designing a class structure. Even though the acronym "SOLID" was introduced by Michael Feathers, The concept of those 5 principles were first introduced by the famous Computer Scientist [Robert C. Martin](https://en.wikipedia.org/wiki/Robert_C._Martin) (a.k.a Uncle Bob) in 2000.

Uncle Bob is also known for his masterpieces of _Clean Code_ and _Clean Architecture_, etc. Therefore it is not a surprise that all these concepts of clean coding, object-oriented architecture, and design patterns are somehow connected and complementary to each other.

> See Uncle Bob's [publications](https://en.wikipedia.org/wiki/Robert_C._Martin#Publications).

Each principle of SOLID will be explained with example below:

- [[#S - single responsibility principle]]
- [[#O - open-closed principle]]
- [[#L - liskov substitution principle]]
- [[#I - interface segregation principle]]
- [[#D - dependency inversion principle]]

## S - single responsibility principle

Let's begin with the single responsibility principle. As we all figured out from the name, this principle states that **a class should only have one responsibility and therefore it should only have one reason to change.**

For example, let's look at a class to represent a simple book:

```cpp
class Book {
	private:
		string name;
		string author;
		unsigned int publicYear;
}
```

In this code, we store the name, author and public year associated with an instance of a `Book`. Let's now add a couple of methods to query the text:

```cpp
class Book {
	private:
		string name;
		string author;
		unsigned int publicYear;

	public:
		// direct initialization constructor
		Book(string n, string a, unsigned int p) : name(n), author(a), publicYear(p) {}

		string getName() const {
			return name;
		}

		string getAuthor() const {
			return author;
		}

		unsigned int getPublicYear() const {
			return publicYear;
		}
};

class Printer {
	public:
		void printCitation(const Book &book) {
			cout << book.getName() << " (" << book.getAuthor() << ", "
				 << book.getPublicYear() << ")" << endl;
		}
};
```

In the example above, we have 2 classes. The `Book` is responsible for representing a book object and having methods for users to access its attributes. The class `Printer` will also have a **single responsibility**, which is printing. One example can be taken into account is printing the citation:

```cpp
int main() {
	Book book("Where the Wild Things Are", "Sendak", 1963);
	Printer printer;

	printer.printCitation(book);
	// Where the Wild Things Are (Sendak, 1963)
	return 0;
}
```

Some developers might define the method `printCitation` inside the `Book` class, but this code violates the single responsibility principle. When following the practice as the code snippets above, not only the code is much cleaner, but we will also separate those classes by concerns ([SoC - Separation of Concerns](https://en.wikipedia.org/wiki/Separation_of_concerns#:~:text=In%20computer%20science%2C%20separation%20of,code%20of%20a%20computer%20program.)). Later on, if there are classes representing the arts or videos that we may need to print their information, we can leverage the `Printer` class implemented before by adding methods such as `artInfoPrinter`.

<iframe src="https://replit.com/@NguyenD-Nam/Single-Responsibility?lite=true" width="100%" height="680"></iframe>

## O - open-closed principle

The open-closed principle states that classes, modules, and functions should be **open for extension, but closed for modification**. It means you should be able to extend the functionality of them by adding more code without modifying the existing code.

The code below violates this principle:

```cpp
class Animal {
	private:
		string name;
		string type;
		unsigned int legs;

	public:
		Animal(string n, string t, unsigned int l) : name(n), type(t), legs(l) {}

		void getSpeed() {
		    if(type == "cheetah"){
			    cout << "130mph" << endl;
			} else if (type == "lion"){
			    cout << "80mph" << endl;
			} else if (type == "elephant"){
			    cout << "40mph" << endl;
			} else {
			    cout << "Unsupported animal type" << endl;
			}
		}
};
```

The problem in the above code is that if we want to add new animal types, we have to modify the existing code by adding cases into the `switch` statement of the method `getSpeed`. To fix this, we can refactor as below:

```cpp
// Base class
class Animal {
	private:
		string name;
		string type;
		unsigned int legs;

	public:
		Animal(string n, string t, unsigned int l) : name(n), type(t), legs(l) {}

		// unimplemented pure virtual method
		virtual void getSpeed() = 0;
};

// Derived classes
class Cheetah : public Animal {
	public:
		Cheetah(string n, string t, unsigned int l) : Animal(n, t, l) {}

	    void getSpeed() override {
	        cout << "130mph" << endl;
	    }
};

class Lion : public Animal {
	public:
		Lion(string n, string t, unsigned int l) : Animal(n, t, l) {}

	    void getSpeed() override {
	        cout << "80mph" << endl;
	    }
};

int main() {
	Lion lion("lion", "cat", 4);
	lion.getSpeed();
	// 80mph
}
```

By creating a brand new class for the new behavior, we would know that the stuff we already built isn't affected and we can totally focus on designing the class to suit the new requirement.

<iframe src="https://replit.com/@NguyenD-Nam/Open-Closed?lite=true" width="100%" height="680"></iframe>

## L - liskov substitution principle

The Liskov Substitution principle is one of the most important principles to adhere to in object-oriented programming (OOP). It states that child classes or subclasses must be substitutable for their parent classes or super classes. Narrowing it down, we have **if class A is a subclass of class B, we should be able to replace B with A without disrupting the behavior of our program.**

```cpp
// Base class
class MeansOfTransport {
	public:
		virtual void turnOnEngine() {
			cout << "Turn on the engine" << endl;
		}
};

// Derived classes
class Motorbike : public MeansOfTransport {};

// Printer class
class MeansOfTransportPrinter {
	public:
		void printEngineAction(MeansOfTransport &t){
			t.turnOnEngine();
		}
};
```

As usual we define the base class with several derived classes and an additional printer class.

```cpp
int main() {
	Motorbike motorbike;
	MeansOfTransportPrinter printer;

	printer.printEngineAction(motorbike);
	// Turn on the engine
	return 0;
}
```

The method `printEngineAction` of the `MeansOfTransportPrinter` accepts the param of `MeansOfTransport` type. As we defined the derived class `Motorbike` from `MeansOfTransport`, we can also pass that subclass as a param to the `printEngineAction` method. But the Liskov Substitution principle may be violated in the following situation:

```cpp
// Derived classes
class ElectricCar : public MeansOfTransport {
	public:
		void turnOnEngine() override {
			cout << "What engine??? You mean motor?" << endl;
		}
};

int main() {
	ElectricCar electricCar;
	MeansOfTransportPrinter printer;

	printer.printEngineAction(electricCar);
	// What engine??? You mean motor?
	return 0;
}
```

The idea behind the Liskov Substitution principle is that a derived class should be able to replace its base class in any code that uses the base class, without causing unexpected behavior or violating any assumptions made about the base class. In the example above, the `ElectricCar` is defined to be a derived class from `MeansOfTransport`, but unlike the engine in the base class, it uses an electrical motor. It could be either mistaken when defining attributes or methods in the base class or when we leverage it and make the derived class, but after all, the use above is an example that violates the Liskov Substitution principle.

<iframe src="https://replit.com/@NguyenD-Nam/Liskov-Substitution?lite=true" width="100%" height="680"></iframe>

## I - interface segregation principle

According to this principle, **a client should never be forced to implement an interface that it doesn’t use**, or a client shouldn’t be forced to depend on methods it does not use. More specifically, the principle suggests that software developers should break down large interfaces into smaller, more specific ones that are independent of other interfaces that are not relevant to them.

Think about this as the same thing we do while working with [Micro-Frontend](https://dwarvesf.hashnode.dev/micro-frontend-what-why) architecture, we usually break down the codebase into views and furthermore, into components that hold specific responsibilities.

```cpp
// Base classes
class PersonGeneralInfo {
	private:
		string name;
		string gender;
		unsigned int age;

	public:
		// Constructor and methods to get private attributes
};

class PersonWorkingInfo {
	private:
		string company;
		unsigned int salary;

	public:
		// Constructor and methods to get private attributes
};

// Derived classes
class Baby : public PersonGeneralInfo {};
// Baby just need to inherit from PersonGeneralInfo,
// stuff relating to salary or company makes no sense

class Adult : public PersonGeneralInfo, public PersonWorkingInfo {};
```

## D - dependency inversion principle

This principle is about **decoupling modules, making them as separate from one another as possible**. The principle states that high-level modules should not depend on low-level modules. Instead, they should both depend on abstractions.

Imagine we are having an application that uses the logger to log messages. Sometimes we just need to log to the console, but in some cases we want to export them to a text file, forming a short report.

```cpp
// Base class
class ILogger {
	public:
		virtual void log(string message) = 0;
};

// Derived classes
class ConsoleLogger : public ILogger {
	public:
		void log(string message) override {
			cout << message << endl;
		}
};

class FileLogger : public ILogger {
	public:
		void log(string message) override {
			ofstream file;
			file.open("log.txt");
			file << message << endl;
			file.close();
		}
};
```

Next let's define a class for our application:

```cpp
class App {
	private:
	    ILogger& logger;

	public:
	    App(ILogger& logger) : logger(logger) {}

	    void run() {
	        logger.log("App started");
	    }
};
```

Now let's add these lines of code to our main function:

```cpp
int main() {
    ConsoleLogger consoleLogger;
    FileLogger fileLogger;

    App appWithConsoleLogger(consoleLogger);
    appWithConsoleLogger.run();

    App appWithFileLogger(fileLogger);
    appWithFileLogger.run();
    return 0;
}
```

We can see the message has been logged into a "log.txt" file and another one in the console. Now let's dive into the code. The **abstract** class `ILogger` is responsible for the base of all the logger approaches, in this example we have `ConsoleLogger` and `FileLogger`. Our application will be able to takes in any logger and based on the one we provide, the message will then be export to the file or logged into the console.

<iframe src="https://replit.com/@NguyenD-Nam/Dependency-Inversion?lite=true" width="100%" height="680"></iframe>

## Benefits

We have taken a deep dive into the SOLID principles of object-oriented design. How do these principles help us to build better software? They encourage us to create more **maintainable**, **scalable**, and **flexible** software. As our applications grow in size, we can reduce their complexity and lower the effort we need to put to scaling and maintaining.

Applying the Single Responsibility or Liskov Substitution principle helps us to keep track of the functionality of each module, boosts the process of testing and threfore makes the applications less likely to have unexpected behaviors. As for the principles like Open-Closed, Interface Segregation or Dependency Inversion, they make sure we create reusable components, reduce the coupling between different modules and increase flexibility of our system.

## Reference

- https://www.freecodecamp.org/news/solid-design-principles-in-software-development/
- https://www.baeldung.com/solid-principles
- https://dev.to/galwaycoder/the-solid-principles-in-software-design-explained-53n
