---
title: Database design circular
description: A comprehensive guide to understanding circular references in database design, including types, challenges, real-world applications, and solutions for managing them effectively. Covers self-references, circular dependencies, and strategies for maintaining data integrity while working with circular relationships.
date: 2024-10-30
authors:
  - hieuphq
tags:
  - database
  - sql
  - data-modeling
redirect:
  - /s/tuzZpA
---

In the database solution design, there is the bad practices is called circular references.

## What's circular in the database?

Imagining one type of circular reference in SQL is made when a first table references a second and that second table references the first table. Simple example of how this would look in a model: students and professors in which students has a reference to professor as advisor and professor has a reference to student as advising student.

![](assets/circular_student.png)

The principal problem on circular references is that when we start inserting data into the tables we won’t be able to since none of the references can accept nulls and we can’t insert one record without having another on the other table.
A more complex example of circular reference is simple task management system. There are 4 entities in the solution: users, tasks, projects, project_assignments, project_teams:

- A project has many tasks
- A project has many users via project_teams entity
- A project_assignments combine by 2 connection tasks and project_teams

![](assets/circular_project.png)

So, a project has 2 ways to get the project_assignments. The problem occurs when we query the data. If we start at projects, tasks and then project_assignments, there the link ends, since project_assignments does not serve as the primary key for any other table. Then we do the same process with the other link, start at projects, go to project_teams, end up in project_assignments.

An easy way to identify a circular reference is to start on a table which is serving as the primary table for two or more foreign keys. Some database designs look like a circular references, but not true. An example is the purchasing system. There are some entities: products, purchases, commissions, customers, retailers. The products has many customers by 2 connections: purchases or commissions.

![](assets/circular_purchasing.png)

The concept of a circular reference can sometimes be confused with a diagram model that forms a circle, but as we saw in the example before, the model forms a circle, but there is no circular reference.

## Types of circular

There are 3 types of circular references: self-reference, a circle, multi-table circular-references.

- Self-references: using to describe the parent-child relationship. If parent is null marks as a root.
- Circle: as a endless loop. Start from A, then B, or C, and end up in A
- Multi-table circular-references: Several chains of Primary Key - Foreign Key relations between those 2 tables

## Challenges of circular references

While circular references can be necessary, they come with significant challenges, including:

- Data Integrity Issues: circular references can lead to integrity problems, especially if updates, inserts, or deletes are not properly managed.
- Complex Querying: queries can become complex and inefficient, as the database needs to traverse multiple tables back and forth to resolve the relationships.
- Infinite Loops: recursive queries, tree traversal, or certain types of cascades (like deletions) can enter into infinite loops when circular references are present.
- Difficult Maintenance: as systems grow more complex, managing circular references can become harder to maintain, debug, and update.

## Circular in the real world

Circular references in database design are generally avoided due to complexity but can be useful in certain scenarios to model real-world relationships:

- Bidirectional Relationships: Entities may depend on each other and need mutual references. In a company, an employee may have a manager, and the manager is also an employee. Both must reference each other to capture the relationship.
- Self-Referencing Hierarchies: Useful for navigating both up and down a hierarchy. A family tree may need both parent-child and child-parent relationships for easy ancestor/descendant retrieval.
- Cross-Referencing Entities: Ensures contextual integrity and bidirectional flow of business logic. A customer and supplier both reference a contract, allowing updates to be reflected on both sides.
- Graph-Like Data Structures: In structures like social networks, circular references may be required to accurately reflect mutual connections. Friendships between users in a social network, where each user references the other.

## Solution and migrate from the existing database design

Solution for the database practice:

- Keep number of circular references as low as possible
- Circular reference be detected and prevented as early as the implementation phase
- Be sure that there is no more than one route for data to traffic from one entity to another
  When circular references are necessary, consider these strategies to reduce their impact.
- Deferred Constraint Checking: In databases that support it (e.g., PostgreSQL), you can use deferred constraint checking, where foreign key constraints are validated at the end of a transaction, not at the time of each insert or update. This allows for temporary invalid states that resolve by the end of the transaction.
- Soft Circular References: Use application logic or soft references (e.g., storing IDs without strict foreign keys) to model relationships that look circular but avoid strict database-level circular dependencies.
- Intermediate Tables: Where possible, break direct circular dependencies by introducing intermediate tables or junction tables to mediate relationships between entities.
- Application-Level Logic: Implement logic in your application layer to manage circular relationships and ensure data consistency without relying solely on database constraints.
- Normalization and Denormalization: Use normalization to ensure the schema is designed efficiently. In some cases, denormalization may be appropriate to simplify complex circular relationships and improve performance.

## Conclusion

Circular references can be useful or even necessary in certain scenarios where relationships are bidirectional or complex, such as social networks, graph-like data structures, or cross-referencing entities. However, they should be used with caution due to the potential performance, integrity, and maintenance challenges they introduce. Where possible, other approaches (like intermediate tables or soft references) should be considered to avoid the pitfalls associated with circular references.

## References

- https://medium.com/akurey/dont-be-circular-b59c5609d472
- https://www.codeproject.com/Articles/38655/Prevent-Circular-References-in-Database-Design
- https://github.com/Wuodan/SQL-Find-Circular-References
