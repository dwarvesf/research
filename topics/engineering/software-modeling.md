---
title: Software modeling
description: Learn how software modeling improves system maintainability and scalability by defining core objects, using diagrams like ERD, SMD, and USD to design clear, efficient applications.
date: 2020-05-08
tags:
  - modeling
redirect:
  - /s/lbuANg
---

This is how I approach a new topic or knowledge, starts with why, understand the concept and figure out how to make it happen.

## Why do we need Software modeling

This can be summed up into 2 definitions:

- Maintainability: Software modeling helps to maintain a system, or a project. It ensures the based document for newbies to approach and get to know the system thoroughly.
- Scalability: helps developers to add sub-system or new feature onto the current one, without creating conflicts.

## What is Software modeling

According to Wikipedia, Software modeling came out in a lengthy definition. So I took the privilege to paraphrase it like below:

→ **Software modeling is how to turn an activity of an object from reality to a form that computers can understand and execute.**

## How to do Software modeling

People create things to help them solve a problem, instead of doing that themselves. Tools are made to help us do the work easier. The purpose of Software modeling is to reconstruct the actions that an application needs to take, or the product owner wants to happen.

### Action

I'll take the marketplace as an example of Action in the business world. A marketplace, such as Joolux & Purchasing Care, is a platform where buyer and seller exchanges the goods. An action in marketplace can be defined as:

→ Buyer buys Product from Seller

### Model of a marketplace system

After defining an action, we need to break it down and find the core objects. In this case:

→ Core Object: **Buyer**-**Product**-**Seller**

### AARRR framework

In the business world, AARRR is a habitual method. AARRR is a funnel to analyze the business growth and business development orientation of a company.

Our Design team is using this to follow the final goal of an application or a system. By applying AARRR, designers won't get lost along the way, or happen to conduct redundant things. The action of an application/ system will go through the end of the AARRR funnel, which lets us know how that action derives revenue stream.

**Huy Nguyen** : So we need to define the core object before or after applying the framework? Is there any way to locate the core object without using AARRR?
**Khiem Vo**: Normally, an application comes with a landing page. That page displays a tagline, or a short description on the app's purpose. For instance, take a look at [sudo.fm](https://sudo.fm/). We get to see a song name, a menu bar for sound control and basic function of a music site. That's how we know the main action of [sudo.fm](https://sudo.fm/) is a music player.
**Huy Nguyen**: So before identifying the core object, we should spend some time understand the application. But what if it's a new project with no product or landing page?
**Khiem Vo**: For that case, we'll adapt the waterfall structure. It means to collect the requirement. What's the idea of that app? What problem is it trying to solve?
**Huy Nguyen**: And Design team will conduct that part?
**Khiem Vo**: Personally I don't think that work belongs to a specific team. I'd prefer both Designers and Developers to understand the requirement and come up with a direction. Software modeling is how we get there, by analyze the system requirement and what should we do to make it happen.

After that, we'll find out the relationship between them.

### Entity Relationship Diagram (ERD)

A relationship between core objects is demonstrated in a form of an entity relationship diagram (ERD).

ERD helps to show

- Main object: the core object in the scope system
- The relationship between the objects

Components of ERD

- Object
- Relation arrow

An ERD should have these things to keep in mind

- We don't need to re-draw the database in object field. The focus point of ERD is to show the core object and the connection between them.
- Coloring. Using color will categorize the objects and visualize the system construction.
- Arrange the objects based on the pipeline of the main action

ERD helps simplify the database, giving us the first impression on a system, what kind of object, how many table and the relationship between them.
To create an action, we need to add state - the status of how core object will change during the process of an action.

## State Machine Diagram (SMD)

Purpose

- Demonstrates the status that an object will walk through
- Demonstrates the response of objects during the process

Components

- State: The hardest part. The definition of the object's status.
- Action: What makes an object to change the status
- Actor: Who will execute that action

To create a completed main action, every object needs its own SMD. The core of a SMD is to define the correct state of an object, and whether or not if that state is related to the system. There are some state which the system doesn't cover. Based on the requirement and the business scope, we will decide which state is necessary.

Important Notes

- Display the actor and the action
- A state must be an adjective

**Giang Vu**: I notice you've mentioned the different state between the real world and in SMD system. Do you have any example for that?
**Khiem Vo**: Sure. Let's look at a marketplace for grocery. The object will be the products. Grocery is perishable goods, which means "rotten" or "fermented" is also a state. But we don't need to list that into the SMD, because it's unrelated. We only do it if the states are "shipped", "packed" or "returned".
**Giang Vu**: So that means the state will need to be business-oriented?
**Khiem Vo**: True. Another thing to remember is we only have to list out the states if it's a part of the system flow.

### Use Cases Diagram (USD)

Definition

- A form of system requirement
- To help design a system from end user's perspective, allowing developers/designers tp walk in the clients's shoes

Components

- Actor: End users, people who will use the system
- Use case: The system function
- Boundary system: Letting designers/ developers know their current stage of Software modeling. Boundary system groups the actions into sub-system, makes it more specific than in the ERD

→ In USD, we don't need to follow any order. The items should be listed out randomly and regroup it into sub-system to create UI or interface.

**Huy Nguyen**: If two actors are conducting one action, we have to 2 different results. Would it be possible to display it on the same USD?
**Hieu Phan**: Actually each actor will have a separate use case.
**Giang Vu**: Does that mean each boundary system is made for one actor only?
**Khiem Vo**: As I know, boundary system allows us to create different interfaces for different actors. It's about how many scenario can possibly happen. But I'm not sure one actor can involve in more than one interface at a time.

### Component diagram

Definition

- Visualizing: The main components of a system
- Constructing: How the system can be executed

Components

- Component: Describe a module of a system
- Provided interface: Represent an interface that the components provide
- Require interface: Represent an interface that the components require

Through a component diagram, a source code can contain

- Front-end: How many interface/ main module
- Backend: Module of each object to collect database
- A place to log the arising situation during the process of calling API

## Recap

Software modeling in Agile team

- Helps teammate to possess the same base knowledge about a system
- Helps document the information for team discussion, research and understanding
- Every change can create a big impact on the system. In Agile, a product can be modified continuously, Software modeling needs to be updated during the whole cycle to make sure the newbies can catch up

When we have the insight and the view of the Product Owner, it's easier to create an effective and outstanding outcome. This also reveals the spirit we've been pursuing - Craftsmanship, by providing client with values from their own perspective.
