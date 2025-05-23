---
title: Reusability in software development
description: Learn how software reuse strategies, including component reuse, frameworks, and product lines, speed development, cut costs, and improve quality while facing challenges like maintenance and tool support.
date: 2020-05-05
tags:
  - engineering
redirect:
  - /s/2EfaRQ
---

## Introduction

In the previous century, when the software market was also **immature**, the economy was grown with a large scale lead to more and more new business problems appear that demands software to solve such as management, automatic. So a lot of new ideas about software were imagined and implement from the roots to resolve the corresponding matter. Because of this original, the reuse of software was uncommon.

Nowadays, after a long time for deeping in building something new to solve classic problems. The seniors in this software development field have concluded an engineering strategy that is called **Software reuse** where the development process is geared to reuse existing software. The move to reuse-based development has been in response to demand for lower software production and maintenance costs, faster delivery of systems, and increased software quality. There are also matters that are needed to solve when the answer to classic problems was completed increasingly.

So this strategy is now used extensively in the development of new business systems and the companies are promoting reuse of existing systems to increase their return on software investments.

There are many kinds of field Software reuse that is being available. The Open-source movement is a representation of reuse where a lot of code that is reuse like libraries or a part of other systems.

> Open-source: "Open source is a term that originally referred to open source software (OSS). Open-source software is code that is designed to be publicly accessible—anyone can see, modify, and distribute the code as they see fit."

> Open-source movement: "The open-source movement is based on a radical retake on copyright law to create high-quality software whose use and development are guaranteed to the public."

Another is the domain-specific application systems, such as ERP systems, are available that can be tailored and adapted to customer requirements. Some big companies have supplied the components that have the ability to be configured to demand each their specific customer.

Standards, such as web service standards, have made it easier to develop software services and reuse them across a range of applications.

Reuse-based software engineering is an approach to development that tries to maximize the reuse of existing software. The software units that are reused may be of radically different sizes. For example:

- Component reuse: Component is a scalable concept, it can be big like a subsystem or small as a class, function, or object and have the ability to reuse flexibly.
- Application reuse: An application can be reused by integrating without change into a system or re-configured for a specific customer.
- System reuse: A system that contains a number of application can be a part of another bigger system.

Each function or component that includes generic functionality is potentially reusable. However, sometimes, it is very expensive to modify them for a new situation. So, rather than reuse code, the idea is also a good thing to reuse. This way is called concept reuse.

In concept reuse, instead of component, you reuse ideas, working style, or algorithm. On the other hand, it means everything that is reused is represented in an abstract notation, which does not have an implementation detail. It can, therefore, be configured and adapted for a range of situations. A few methods that depend on concept reuse are design patterns, configurable system products, or program generator. The concept reuse process must contain an activity where the abstract concept is instantiated to create executable components.

## Few aspects of software reuse

### The benefits

The first thing that everyone thinks about the reuse, is the fast development speed when applying another existing component in our system. The reuse provides the ability to bring an application or system to the market as early as possible because both development and validation time may be reduced. It is very helpful when overall development cost is not more priority than delivery speed.

To the specialists, instead of doing the same work over and over again, they often develop reusable software that encapsulates their knowledge. It is very convenient for development and sharing source code.

Another advantage of the reuse in software development is available dependability. As you know, each reuse component, application, or system should be stable. It is the result of the long term tried and fixed the problems of the development team, and applied to the working system, or itself is well-working stuff. Almost all its design and implementation faults should have been found and fixed.

In the first paragraph, I mentioned the reuse as a good option when bringing a system to market as early as possible is often more important than overall development costs. But it is not mean this a waste strategy, vice versa, in another aspect, it makes development costs reduced. This advantage can be explained that development costs are proportional to the size of the software being developed and reuse help development team write fewer lines of code.

Apply the strategy software reuse also helps the development team reduced process risk because the cost of reuse component is already known, besides, the development cost is always intransparent. So, using software reuse is an effective method for project management by helping the development team reduces the margin of error in project cost estimation. This is especially true when large software components such as subsystems are reused.

A special point that is not noted, is a lot of standards being used in each engineer's routine is the software reuse, too. For example, when using user interface standards, component as the menu is implemented by using reusable components, all applications present the same menu formats to users. So users will make fewer mistakes when interacting with a familiar interface and application's dependability will raise.

There is a lot of benefits when using Software reuse in development, but I think the above reasons are convincing enough for us to think about applying the reuse strategy in our software development process.

Summary, basically, we have six benefits of Software reuse:

- Accelerated development
- Effective use of specialists
- Increased dependability
- Lower development costs
- Reduced process risk
- Standards compliance

### The problems

Besides a lot of benefits, every tool has its own matter, Software reuse is no exception.

To the development team, it is a hard challenge to build a reusable component library that is favored by other software developers and ensure that the library is used. After building, maintaining this library is also a complex process that contains a few factors such as compatibility, comfortable, and easy to use.

On the user side of that reusable component, it takes a lot of time to find out a suitable library for their project. The rest is more and more time to understand and adapt this library in a new environment. To the engineer, they have to apply a new one into their development process uncomfortably.

The above matters are obvious and popular in the real life of every engineer. So I want to mention others with my experience.

In my recent project, I was required for updating the language version and its own dependencies. Almost all it that is open source projects, I can read line by line of the source code, but I have still had difficulty in doing the update, ensure any changes do not make code break. Have you ever wonder that if source code is not available, how difficult is maintaining the reuse with code broken ability. Yes, it is a difficult process, the reason why maintenance costs will increase.

Another bad stuff of reuse in software development is the lack of tool support. Some software tools do not support development with reuse. If it only makes difficulty, you can consider between the tradeoff and corresponding benefits. So, if it is impossible to integrate these tools with a component library system, in some situations, you will be obstructive.

The last one is called **“Not-invented-here” syndrome**, when you focus on cloning, rewriting, optimizing component with the belief that you will make it greater instead of trying to do another solution. This is partly to do with trust and partly to do with the fact that writing original software is seen as more challenging than reusing other people’s software.

### The reuse landscape

After time passed, the reuse in software development has been increasingly supported by a lot of new techniques. The base of these techniques is the fact that the system in the same application domain are similar and have the potential for reuse. There are many different ways of Software reuse, from simple components such as class, object to complete system, and that standards for reusable components facilitate reuse. You can see an overall picture of the “reuse landscape”—different ways of implementing software reuse below.

![](assets/reusability-in-software-development_ea401e3ee43cf4ee90e7edc92fe83900_md5.webp)

if you feel unclear and want to walk into details of each approach of Software reuse, you can see the following figure.

![](assets/reusability-in-software-development_54089293152bc5fd40b4e0ddb7dd69e7_md5.webp)

After having an overview of the reuse landscape, for sure, you will wonder “which is the most appropriate technique to use in a particular situation?”.

The answer to the above question depends on a lot of things such as system requirements, technology and available reusable assert, and the expertise of the development team. But there are a few key factors that you should consider when planning reuse will be mention below.

1. The development schedule for the software: In the context that you want to bring your system to the market as early as possible, reuse complete systems should be your choice instead of individual components. Although the system will not be fit with the requirement perfectly, this approach minimizes the amount of development required.
2. The expected software lifetime: Maintainability and scalability are the highest prioritizations when you develop a long-lifetime system. So choosing a reuse component whose source code can't be accessed is not wise. A personal component or open-source system can be a good solution for this situation. With the ability to access source code, you don't worry when suppliers may not be able to continue support for the reuse software.
3. The background, skills, and experience of the development team: In before [section](https://github.com/dwarvesf/radar/blob/master/software-reuse/Documents/software-reuse.md#22-the-problems), it takes a lot of time to find out a suitable library for their project. The rest is more and more time to understand and adapt this library in a new environment. Therefore, you should focus your reuse effort in areas where your development team has expertise.
4. The criticality of the software and its non-functional requirements: For a critical system that has to be certified by an external regulator, you may have to create a safety or security case for the system. This is difficult if you don’t have access to the source code of the software. If your software has stringent performance requirements, it may be impossible to use strategies such as model-driven engineering (MDE).
5. The application domain: In the market, many domains that require the same features for almost all their application such as manufacturing and medical information systems. So we can reconfigure an existed application to use in our place at a cheap cost instead of developing a new system.
6. The platform on which the system will run: Some components models are developed to using in a specified system such as .NET in Microsoft platform. The rest is the generic application that can be used in the multi-platforms. Every engineer needs to choose a reuse system that fits with development process designed.

Above is a few stuff that building and groundwork for making a decision for the questions such as when we need Software reuse, or what is the best solution for our project. Where or not reuse is applied, is often decision by manager instead of engineer. Sometime, they evaluate the risks within their choice incorrectly. Others may prefer known risks of development to unknown risks of reuse. So i think if you want to perform a decision making, you must have all of your solution on the table, the more you understand your solutions the more accuracy your decisions are. In this context, this is reuse-related decision.

## Application framework

Before explore about Application framework, let's revise object-oriented development. Following is an difinition of OOD that i see on [Quora](https://www.quora.com/). I think this is really good sentence for mentioning to it

> Object-oriented Development (OOD) a group of methodologies that sees real world entities as objects and classes. For example, hospital is a real world entity, becomes hospital class and later multiple hospital objects are created, each with unique property values.

For a long time, some enthusiasts for object-oriented development suggested that one of the key advantages when using an object-oriented approach is reusing previous work. That means you can use the same object for different systems. However, to me, in my work, when coding and developing a system, I see a truth is that we need specified objects or classes for a particular component or application. Another bad thing is that we often spent more time to understand and adapt the object than reimplement it.

So, instead of using OOD directly, we have an object-oriented development process that is the best support for object-oriented reuse through larger-grain abstractions called frameworks.

> Framework is an integrated set of software artifacts (such as classes, objects and components) that collaborate to provide a reusable architecture for a family of related applications.

The first characteristic that is bounced off when I think about the framework is framework provides support for generic features of the domain that is focused on this framework. For example, in my primary programing language - [Golang](https://github.com/dwarvesf/radar/blob/master/software-reuse/Documents), it has a web framework being named [Echo](https://github.com/dwarvesf/radar/blob/master/software-reuse/Documents) - a high performance, extensible, minimalist web framework for Go. Besides a lot of salient features, it has generic features of a web framework such as routing, database integration, authentication, data rendering.

Another example is [Unity](https://github.com/dwarvesf/radar/blob/master/software-reuse/Documents) that is known as a game engine or game framework, it also has a lot of generic features that always exists on each game engine such as audio system, graphic, animation, UI widgets or hardware event handling... Depend on their features, tools, each engineer can comfortingly creative. For web engineers, this is extending APIs, integrating the third party, implementing new web services by using existing functions for method. For game developer, it also drags and drops UI object to defines game scene layouts or handle mouse event to make an NPC (non-player character) does few animations. More and more.

As you see, the framework helps us have a lot of things to reuse. It can ether skeleton architecture for building from bottom to top of a system or only a method that is used for integration of an external component. Although existing in different scales, but framework components always support each other or being reuse to construct another bigger. It is easy to see that the architecture is implemented by the object classes and their interactions. Classes are reused directly and maybe extended using features such as inheritance and polymorphism.

Another fact is a framework can contain others. It begins from common sense that a framework can big or small and can be used to implement a complete system or also a small part of an application. For example, in Unity, the above stuff that I called a framework, has a lot of nested frameworks such as Unity2D, Unity3D, and a lot of external stuff for doing specific things. It can be an action Framework for increased performance and ease of development, game object distance/time weighting framework, or a full 2D runner framework and game sample.

Finally, we can consider a few class of framework.

I saw a few types of framework in [Sommerville software engineering 10th edition](https://dinus.ac.id/repository/docs/ajar/Sommerville-Software-Engineering-10ed.pdf), see the following:

- System infrastructure frameworks: tools for doing everything in infrastructures layer such as communications, user interfaces, and compilers.
- Middleware integration frameworks: line of frameworks that support construct an ideal environment for an application works. For example, there are Microsoft’s .NET and Enterprise Java Beans (EJB). What is the ideal environment? This is a location that allows each component of your system to communicate with each other and with OS and exchange data easily.
- Enterprise application frameworks: specified frameworks for the specified domains, such as telecommunications or financial systems. It doesn't only support the development, but also contains this domain's deep knowledge. This kind of framework is the key of the product line that is considered in the next section.

To me, I prefer another way to classify frameworks that looks more specific and practical.

- Web Application framework
- Application framework
- Multimedia Framework
- Game Framework
- More and more, I don't think it's mandatory to naming as long as you feel comfortable and understand what is under the hood.

Summary, framework is used for the reuse purpose, so, an application is constructed base on frameworks that can be reused, too, and the product line is a representation of this application, will be considered later.

Be a very effective approach to reuse but the framework approach also has corresponding disadvantages. Introducing a framework for another engineer or development team is expensive. I saw a lot of good framework being spanked until someone digs it up randomly. On the development team, it is difficult to approach a new framework and hard to debug if this framework's source code is not available.

## Software product lines

In real life, when going to the hospital, we see the medical management application on the doctor's desktop similarly. In the cafeteria, store management applications with the same features all time. Have you ever wonder why are they always like that? In short, these are the representations of product lines.

What is product line?

As above, we can understand that is the application when a company wants to serve a few kinds of customers that have their own characteristics, or a software development team is required to create an application with similar features for different customers. Instead of developing software for each case, the development team can create one that has the ability to being configured to suit unidentical requirements. On the other hand, this is a system with a common architecture in core and shared components with a few features that is can be configured flexibly. That configuration can relate to the configuration of some components, implementing additional components, and modifying some of the components to reflect new requirements.

Generally, product line derives from an exist application that is called base application of product line. Base application is usually designed to simplify reuse and reconfiguration. Generally, a base application includes three kinds of component as following image:

[The organization of a base system for a product line](https://github.com/dwarvesf/radar/blob/master/software-reuse/Documents/software-reuse.md#3-4-7-8-%22software-engineering%22-httpsdinusacidrepositorydocsajarsommerville-software-engineering-10edpdf)

- Core components that provide infrastructure support. These are often immutable when developing other instances of the product line.
- Configurable components that may be modified and configured to specialize them in a new application. Sometimes it is possible to reconfigure these components without changing their code by using a built-in component configuration language.
- Specialized, domain-specific components some or all of which may be replaced when a new instance of a product line is created.

On the other hand, we can distinguish the components of the product line into 4 layers that are as following:

1. Interaction layer: User interface is located here. Users can visualize intuitive information being sent from the system and interact backward.
2. I/O management layer: handle event or signal with information from the user interface, validate and preprocess data such as authenticate, map output, route planning, provide a mechanism to communicate with the lower layer.
3. Resource management layer: core logic that handles data, process, the query to the database and normalizes data to render to user.
4. Database management layer: build database's components and this related logic such as database function, trigger...

Besides, depending on these component's type, we have various types of specialization of a software product line may be developed:

1. Platform specialization: Depend on the platforms where the system is built on such as MacOS, Linux, or Windows, we have corresponding versions of the application in the product line. In order to do that, the component that interfaces with the hardware and operating system is modified.
2. Environment specialization: This environment is the operating environment. It can be peripheral devices or communication environments of different hardware in the system. So we need different versions of the application to fit the environment.
3. Functional specialization: This a more popular specialization in the product line. You can see every banking application of different banks with a lot of generic features, but in a bank, you need at least 50$ to do a transaction, another can be 150$.
4. Process specialization: Make an application of product line fit with specific business processes.
