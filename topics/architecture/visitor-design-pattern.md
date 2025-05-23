---
title: Visitor design pattern, the concept, problem solution and use cases
description: Visitor is a behavioral design pattern that lets you separate algorithms from the objects on which they operate.
date: 2024-07-12
authors:
  - taipham1803
tags:
  - design-pattern
  - gang-of-four
redirect:
  - /s/-UO_Ag
---

![](assets/visitor-design-pattern.pdf)

![illustration](assets/visitor-design-pattern-1.webp)

## What is the Visitor Design Pattern?

**Visitor** is a behavioral design pattern that lets you separate algorithms from the objects on which they operate.

Visitor design pattern is one of the [**behavioral design patterns**](https://www.geeksforgeeks.org/software-design-patterns/). It is used when we have to perform an operation on a group of similar kind of Objects. With the help of visitor pattern, we can move the operational logic from the objects to another class. The visitor pattern consists of two parts:

- a method called **Visit()** which is implemented by the visitor and is called for every element in the data structure
- visitable classes providing **Accept()** methods that accept a visitor

## Problem statement

Imagine you're developing a simple text editing application. In this application, you have different types of document elements such as paragraphs, tables, and images. Each of these elements can perform certain operations, such as rendering to the screen, exporting to different formats (like HTML or plain text), and spell-checking.

As the application grows, more operations need to be supported for these elements. Without a proper design, adding new operations could lead to a bloated and hard-to-maintain codebase, especially if it involves modifying each element class every time a new operation is introduced.

## Solution with visitor pattern

The Visitor Pattern allows us to define a new operation without changing the classes of the elements on which it operates. Instead of adding the new operation to each element, we create a visitor class that implements the operation. Each element class then has an `accept` method that takes a visitor and calls the visitor’s method corresponding to that element.

## Structure

- The Visitor interface declares a set of visiting methods that can take concrete elements of an object structure as arguments. These methods may have the same names if the program is written in a language that supports overloading, but the type of their parameters must be different.
- Each Concrete Visitor implements several versions of the same behaviors, tailored for different concrete element classes.

![structure](assets/visitor-design-pattern-2.webp)

## Code example for problem

### Illustration

```tsx
                +-----------------+
                | DocumentVisitor |
                +-----------------+
                | +visitParagraph |
                | +visitTable     |
                | +visitImage     |
                +-----------------+
                       /|\
                        |
       +----------------+----------------+
       |                |                |
+-----------------+ +-----------------+ +-------------------+
| RenderVisitor   | | ExportVisitor   | | SpellCheckVisitor |
+-----------------+ +-----------------+ +-------------------+
| +visitParagraph | | +visitParagraph | | +visitParagraph   |
| +visitTable     | | +visitTable     | | +visitTable       |
| +visitImage     | | +visitImage     | | +visitImage       |
+-----------------+ +-----------------+ +-------------------+

                            |
                            |
                            V
         +---------------------------+
         |   DocumentElement         |
         +---------------------------+
         | +accept(visitor: Visitor) |
         +---------------------------+
                   /|\
                    |
       +------------+------------+
       |                         |
+-----------------+         +-----------------+         +-----------------+
|   Paragraph     |         |     Table       |         |     Image       |
+-----------------+         +-----------------+         +-----------------+
| +accept(visitor)|         | +accept(visitor)|         | +accept(visitor)|
+-----------------+         +-----------------+         +-----------------+
```

### Element classes

```tsx
interface DocumentElement {
  accept(visitor: DocumentVisitor): void;
}

class Paragraph implements DocumentElement {
  accept(visitor: DocumentVisitor): void {
    visitor.visitParagraph(this);
  }
}

class Table implements DocumentElement {
  accept(visitor: DocumentVisitor): void {
    visitor.visitTable(this);
  }
}

class Image implements DocumentElement {
  accept(visitor: DocumentVisitor): void {
    visitor.visitImage(this);
  }
}
```

### Visitor interface and Concrete visitors:

```tsx
interface DocumentVisitor {
  visitParagraph(paragraph: Paragraph): void;
  visitTable(table: Table): void;
  visitImage(image: Image): void;
}

class RenderVisitor implements DocumentVisitor {
  visitParagraph(paragraph: Paragraph): void {
    console.log("Rendering a paragraph.");
  }

  visitTable(table: Table): void {
    console.log("Rendering a table.");
  }

  visitImage(image: Image): void {
    console.log("Rendering an image.");
  }
}

class ExportVisitor implements DocumentVisitor {
  visitParagraph(paragraph: Paragraph): void {
    console.log("Exporting a paragraph to HTML.");
  }

  visitTable(table: Table): void {
    console.log("Exporting a table to HTML.");
  }

  visitImage(image: Image): void {
    console.log("Exporting an image to HTML.");
  }
}

class SpellCheckVisitor implements DocumentVisitor {
  visitParagraph(paragraph: Paragraph): void {
    console.log("Spell checking a paragraph.");
  }

  visitTable(table: Table): void {
    console.log("Spell checking a table.");
  }

  visitImage(image: Image): void {
    console.log("Spell checking an image.");
  }
}
```

### Usage

```tsx
function App() {
  const documentElements: DocumentElement[] = [
    new Paragraph(),
    new Table(),
    new Image(),
  ];

  const renderVisitor = new RenderVisitor();
  const exportVisitor = new ExportVisitor();
  const spellCheckVisitor = new SpellCheckVisitor();

  for (const element of documentElements) {
    element.accept(renderVisitor);
    element.accept(exportVisitor);
    element.accept(spellCheckVisitor);
  }
}
```

### Explanation

1. **Element classes:** We have `Paragraph`, `Table`, and `Image` classes, each implementing the `accept` method which accepts a visitor.
2. **Visitor interface:** `DocumentVisitor` is an interface with methods to visit each type of element.
3. **Concrete visitors:** `RenderVisitor`, `ExportVisitor`, and `SpellCheckVisitor` are concrete implementations of the visitor interface. Each visitor class defines the operation for each type of element.
4. **Usage:** We create instances of elements and visitors. Each element accepts each visitor, which performs the appropriate operation.

By using the Visitor Pattern, we can easily add new operations without modifying the element classes, adhering to the Open/closed principle and making the code more maintainable and scalable.

## Applicability

- **Use the Visitor pattern to perform operations on all elements of a complex object structure (e.g., an object tree).**
  This pattern allows you to execute an operation across a set of objects of different classes by having a visitor object implement multiple variants of the same operation, tailored to each target class.
- **Use the Visitor to simplify the business logic by separating auxiliary behaviors.**
  It helps keep the primary classes of your app focused on their main responsibilities by moving other behaviors into separate visitor classes.
- **Use the Visitor when a behavior is relevant only to certain classes in a class hierarchy.**
  Extract this behavior into a separate visitor class, implementing only the visiting methods for the relevant classes, leaving the rest empty.

## Pros and cons

### Advantages

- **Open/closed principle**: Introduce new behavior for objects of different classes without modifying those classes.
- **Single responsibility principle**: Consolidate multiple versions of the same behavior into a single class.
- A visitor object can gather useful information while working with various objects, which is beneficial for traversing complex structures like an object tree and applying the visitor to each object.

### Disadvantages

- All visitors need updating whenever a class is added to or removed from the element hierarchy.
- Visitors may lack access to private fields and methods of the elements they work with.

## Use cases

Some use cases for the Visitor Pattern:

### Use case 1: compiler design

**Context:** In a compiler, the abstract syntax tree (AST) represents the structure of the source code. The compiler needs to perform various operations on the AST, such as type checking, code generation, and optimization.

**Solution:** The Visitor Pattern can be used to define these operations without changing the classes representing the AST nodes.

**Example:**

- **Elements:** `Expression`, `Statement`, `Variable`, `Function`
- **Visitors:** `TypeChecker`, `CodeGenerator`, `Optimizer`

### Use case 2: document processing

**Context:** In a text processing application, different document elements (e.g., paragraphs, images, tables) need to support various operations like rendering, exporting, and spell-checking.

**Solution:** The Visitor Pattern allows new operations to be added without modifying the element classes.

**Example:**

- **Elements:** `Paragraph`, `Table`, `Image`
- **Visitors:** `RenderVisitor`, `ExportVisitor`, `SpellCheckVisitor`

### Use case 3: graphics rendering

**Context:** In a graphics rendering system, different shapes (e.g., circles, squares, triangles) need to support operations like drawing, resizing, and calculating the area.

**Solution:** The Visitor Pattern can be used to add these operations without altering the shape classes.

**Example:**

- **Elements:** `Circle`, `Square`, `Triangle`
- **Visitors:** `DrawVisitor`, `ResizeVisitor`, `AreaCalculatorVisitor`

### Use case 4: file system operations

**Context:** In a file system management tool, different file system components (e.g., files, directories) need to support operations like searching, compression, and encryption.

**Solution:** The Visitor Pattern allows these operations to be added without changing the component classes.

**Example:**

- **Elements:** `File`, `Directory`
- **Visitors:** `SearchVisitor`, `CompressionVisitor`, `EncryptionVisitor`

### Use case 5: game development

**Context:** In a game, different game entities (e.g., players, enemies, obstacles) need to support various operations like rendering, updating state, and collision detection.

**Solution:** The Visitor Pattern can be used to define these operations without modifying the entity classes.

**Example:**

- **Elements:** `Player`, `Enemy`, `Obstacle`
- **Visitors:** `RenderVisitor`, `UpdateVisitor`, `CollisionDetectionVisitor`

### Use case 6: e-commerce system

**Context:** In an e-commerce application, different product types (e.g., electronics, clothing, groceries) need to support operations like applying discounts, calculating shipping costs, and generating invoices.

**Solution:** The Visitor Pattern allows new operations to be added without changing the product classes.

**Example:**

- **Elements:** `Electronics`, `Clothing`, `Groceries`
- **Visitors:** `DiscountVisitor`, `ShippingCostVisitor`, `InvoiceGeneratorVisitor`

### Use case 7: network protocols

**Context:** In a network protocol implementation, different types of packets (e.g., data packet, acknowledgment packet, control packet) need to support operations like serialization, deserialization, and logging.

**Solution:** The Visitor Pattern can be used to add these operations without modifying the packet classes.

**Example:**

- **Elements:** `DataPacket`, `AckPacket`, `ControlPacket`
- **Visitors:** `SerializeVisitor`, `DeserializeVisitor`, `LoggingVisitor`

### Use case 8: UI component management

**Context:** In a GUI application, different UI components (e.g., buttons, text fields, checkboxes) need to support operations like rendering, event handling, and validation.

**Solution:** The Visitor Pattern allows these operations to be added without changing the component classes.

**Example:**

- **Elements:** `Button`, `TextField`, `Checkbox`
- **Visitors:** `RenderVisitor`, `EventHandlingVisitor`, `ValidationVisitor`
