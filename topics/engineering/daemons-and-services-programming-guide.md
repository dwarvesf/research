---
title: Daemons and services programming guide
description: Learn how to design and manage macOS daemons and services, including login items, XPC services, launch agents, and daemons, with best practices for background processes and interprocess communication.
date: 2020-05-11
tags:
  - macos
redirect:
  - /s/qDUpiw
---

## About daemons and services

Many kinds of tasks that do not require user interaction are most effectively handled by a process that runs in the background. You can use a daemon or service to:

**Provide server functionality**, such serving web pages. Coordinate access to of a shared resource, such as a database. Perform work for a foreground application, such as file system access.

![](assets/daemons-and-services-programming-guide_8f72ec64cac909319e7fc79210c69563_md5.webp)

**Terminology Note**: The terms `service` and `daemon` have several meanings in different contexts, with further variation over time and from one development community to another.

In this document, service refers to a background process that supports a full GUI application in some way, for example by registering a global hotkey or by performing network communication. Daemon refers to all other types of background processes, especially those that don’t present any kind of user interface.

## Designing daemons and services

Two of the most important design decisions to consider when creating a background process are how it will be run and how other processes will communicate with it. These two considerations interact with each other: different types of background processes have different forms of communication available to them.

## Types of background processes

There are four types of background processes in OS X. The differences are summarized in Table 1-1 and described in detail in the following subsections. To select the appropriate type of background process, consider the following:

Whether it does something for the currently logged in user or for all users. Whether it will be used by single application or by multiple applications. Whether it ever needs to display a user interface or launch a GUI application.

![](assets/daemons-and-services-programming-guide_93dcafb893273d168521685e97d42ad8_md5.webp)

/Login items are started by the per-user instance of launchd, but it doesn't take any actions to manage them.

### Login items

Login items are launched when the user logs in, and continue running until the user logs out or manually quits them. Their primary purpose is to allow users to open frequently-used applications automatically, but they can also be used by application developers. For example, a login item can be used to display a menu extra or to register a global hotkey.

For example, many to-do applications use a login item that listens for a global hotkey and presents a minimal UI allowing the user to enter a new task. Login items are also commonly used to display user interface items, such as a floating clock or a timer, or to display an icon in the menu bar. .

Another example is a calendaring application with a helper application launched as a login item. The helper application runs in the background and launches the main GUI application when appropriate to remind the user of upcoming appointments

### XPC services

XPC services are managed by launchd and provide services to a single application. They are typically used to divide an application into smaller parts. This can be used to improve reliability by limiting the impact if a process crashes, and to improve security by limiting the impact if a process is compromised.

With traditional single-executable applications, if any part of the application crashes, the entire application terminates. By restructuring the application into a main process and services, the impact of a crash in a service is significantly less. The user can continue to work; the service that crashed gets relaunched. For example, an email application can use an XPC service to handle communication with the mail server. Even if the service crashes, temporarily interrupting communication with the server, the rest of the application remains usable.

Sandboxing allows you to specify a list of things your program is expected to do during normal operation. The operating system enforces that list, limiting the damage that can by done by an attacker. For example, a text editor might need to edit files on disk that have been opened by the user, but it probably does not need to open arbitrary files in other locations or communicate over the network.

You can combine sandboxing with XPC services to provide privilege separation by splitting a complex application, tool, or daemon into smaller pieces with well-defined functionality. Because of the reduced privileges of of each individual piece, any flaws are less exploitable by an attacker: none of the pieces run with the full capabilities of the user. For example, an application that organizes and edits photographs does not usually need network access. However, if it also allows users to upload photos to a photo sharing website, that functionality can be implemented as an XPC service with network access and mediated access (or no access) to the file-system.

### Launch daemons

Daemons are managed by launchd on behalf of the OS in the system context, which means they are unaware of the users logged on to the system. A daemon cannot initiate contact with a user process directly; it can only respond to requests made by user processes. Because they have no knowledge of users, daemons also have no access to the window server, and thus no ability to post a visual interface or launch a GUI application. Daemons are strictly background processes that respond to low-level requests.

Most daemons run in the system context of the system—that is, they run at the lowest level of the system and make their services available to all user sessions. Daemons at this level continue running even when no users are logged into the system, so the daemon program should have no direct knowledge of users. Instead, the daemon must wait for a user program to contact it and make a request. As part of that request, the user program usually tells the daemon how to return any results

### Launch agent

Agents are managed by launchd, but are run on behalf of the currently logged-in user (that is, in the user context). Agents can communicate with other processes in the same user session and with system-wide daemons in the system context. They can display a visual interface, but this is not recommended.

If your code provides both user-specific and user-independent services, you might want to create both a daemon and an agent. Your daemon would run in the system context and provide the user-independent services while an instance of your agent would run in each user session. The agents would coordinate with the daemon to provide the services to each user.

## Protocols for communicating with daemons

There are four major communication mechanisms commonly used between daemons and their clients: XPC, traditional client-server communications (including Apple events, TCP/IP, UDP, other socket and pipe mechanisms), remote procedure calls (including Mach RPC, Sun RPC, and Distributed Objects), and memory mapping (used underneath the Core Graphics APIs, among others).

XPC is the easiest way to launch and communicate with your daemon. For details on implementing this mechanism, see Creating XPC services and XPC services API Reference.

Other RPC (remote procedure call) mechanisms such as Distributed Objects should be avoided for communication across security domain boundaries, for example a user process communicating with a system-level daemon, because this creates a security risk. They are appropriate only when you can be certain that both processes involved have the same level of privileges.

In most other cases, you should use a traditional client-server communication API. Code based on these APIs tends to be easier to understand, debug, and maintain than RPC or memory mapping designs. It also tends to be more portable to other platforms than RPC-based code.

Memory mapping requires complex management and represents a security risk if you are not careful about what memory pages you share or if you do not sufficiently validate the shared data. You should use memory mapping only if your client and daemon require a large amount of shared state with low latency, such as passing audio or video in real time.

## Viewing the currently running daemons

If you want to see the daemons currently running on your system, use the Activity Monitor application (located in /Applications/Utilities). This application lets you view information about all processes including their resource usage. Figure 1-1 shows the Activity Monitor window and the process information.

Note: If you want to know more about the services provided by a particular daemon, consult the man page for that daemon. You can also view the manual pages online by reading OS X Man Pages.

![](assets/daemons-and-services-programming-guide_6b7ebc46edfa8c99dbdbfb540f15bb11_md5.webp)
