---
title: Xpc services on macOS app using Swift
description: Learn how to implement XPC Services for secure interprocess communication on macOS, enabling modular app design, crash isolation, and efficient resource management with NSXPCConnection and launchd.
date: 2020-11-05
tags:
  - macos
  - swift
redirect:
  - /s/dD0cyQ
---

Before XPC we used to pick up Sockets and Mach Messages (Mach Ports).

## XPC for communicating processes

The XPC mechanism offers an alternative to sockets (or Mach Services using MIG) for IPC. We could have, for example, a process that acts as a “server” waiting for clients to access its API and provide some service.

## XPC services on applications

When we talk about XPC Services (capital ‘S’), we are referring to the bundle called XPC Service. Bundles in Apple ecosystem refers to entities represented by a specific directory structure. The most common Bundle you encounter are Application Bundles. If you right-click on any application (For example Chess.app) and select Show content, what you’ll find is a directory structure. Back to XPC, applications can have may XPC Service bundles. You’ll find them inside the Contents/XPCServices/ directory inside the application bundle. Yo can search in your /Applications directory and see how many of the applications rely on XPC Services.

You can also have XPC Services inside Frameworks (Which are another type of Bundle).

## Additional benefits of XPC services

Using XPC Services in our apps allow us to break some functionality in separate modules (The XPC Service). We could create an XPC Service that can be in charge of running some costly but infrequent tasks. For example, some crypto task to generate random numbers.

Another additional benefit is that the XPC Service runs on its own process. If that process crashes or it’s killed, it doesn’t affect our main application. Imagine that your application support user-defined plugins. And the plugins are built using XPC Services. If they are poorly coded and crash, they won’t affect the integrity of your main application.

An additional benefit to the XPC Service is that they can have their own entitlements. The application will only require the entitlement when it makes use of a service provided by XPC Service that requires the entitlement. Imagine you have an app that uses location but only for specific features. You could move those features to an XPC Service and add the location entitlement only to that XPC Service. If your user never needs the feature that uses the location, it won’t be prompted for permissions, making the use of your app more trustworthy.

### XPC and our friend `launchd`

launchd is the first process to run on our system. It is in charge of launching and managing other processes, services and daemons. launchd is also in charge of scheduling tasks. So it makes sense that launchd will also be responsible for the management of XPC Services.

XPC Service can be stopped if it has been idle for a long time, or be spawned on demand. All the management is done by launchd, and we don’t need to do anything for it to work.

launchd has information about system-wide resource availability and memory pressure, who best to make decisions on how to most effectively use our system’s resources than launchd

## Implement XPC services

### Creating the service

An XPC service is a bundle in the Contents/XPCServices directory of the main application bundle; the XPC service bundle contains an Info.plist file, an executable, and any resources needed by the service. The XPC service indicates which function to call when the service receives messages by calling xpc_main(3) Mac OS X Developer Tools Manual Page from its main function.

To create an XPC service in Xcode, do the following:

1. Add a new target to your project, using the XPC Service template.
2. Add a Copy Files phase to your application’s build settings, which copies the XPC service into the Contents/XPCServices directory of the main application bundle.
3. Add a dependency to your application’s build settings, to indicate it depends on the XPC service bundle.
4. If you are writing a low-level (C-based) XPC service, implement a minimal main function to register your event handler, as shown in the following code listing. Replace my_event_handler with the name of your event handler function

```javascript
int main(int argc, const char *argv[]) {
    xpc_main(my_event_handler);

    // The xpc_main() function never returns.
    exit(EXIT_FAILURE);
}
```

If you are writing a high-level (Objective-C-based) service using NSXPCConnection, first create a connection delegate class that conforms to the NSXPCListenerDelegate protocol. Then, implement a minimal main function that creates and configures a listener object, as shown in the following code listing.

```javascript
int main(int argc, const char *argv[]) {
    MyDelegateClass *myDelegate = ...
    NSXPCListener *listener =
        [NSXPCListener serviceListener];

    listener.delegate = myDelegate;
    [listener resume];

    // The resume method never returns.
    exit(EXIT_FAILURE);
}
```

Add the appropriate key/value pairs to the helper’s Info.plist to tell launchd the name of the service. These are described in XPC Service Property List Keys.

### Using the service

The way you use an XPC service depends on whether you are working with the C API (XPC Services) or the Objective-C API (NSXPCConnection).

Using the Objective-C NSXPCConnection API The Objective-C NSXPCConnection API provides a high-level remote procedure call interface that allows you to call methods on objects in one process from another process (usually an application calling a method in an XPC service). The NSXPCConnection API automatically serializes data structures and objects for transmission and deserializes them on the other end. As a result, calling a method on a remote object behaves much like calling a method on a local object.

To use the NSXPCConnection API, you must create the following:

- An interface. This mainly consists of a protocol that describes what methods should be callable from the remote process. This is described in Designing an interface
- A connection object on both sides. On the service side, this was described previously in Creating the service. On the client side, this is described in Connecting to and using an interface.
- A listener. This code in the XPC service accepts connections. This is described in Accepting a connection in the helper. Messages.

![](assets/xpc-services-on-macos-app-using-swift_4f420a9f1bcea4a66160e3c83f2c0870_md5.webp)

### Overall architecture

When working with NSXPCConnection-based helper apps, both the main application and the helper have an instance of NSXPCConnection. The main application creates its connection object itself, which causes the helper to launch. A delegate method in the helper gets passed its connection object when the connection is established. This is illustrated in Figure 4-1.

Each NSXPCConnection object provides three key features:

- An exportedInterface property that describes the methods that should be made available to the opposite side of the connection.
- An exportedObject property that contains a local object to handle method calls coming in from the other side of the connection.
- The ability to obtain a proxy object for calling methods on the other side of the connection.

When the main application calls a method on a proxy object, the XPC service’s NSXPCConnection object calls that method on the object stored in its exportedObject property.

Similarly, if the XPC service obtains a proxy object and calls a method on that object, the main app’s NSXPCConnection object calls that method on the object stored in its exportedObject property

### Designing an interface

The NSXPCConnection API takes advantage of Objective-C protocols to define the programmatic interface between the calling application and the service. Any instance method that you want to call from the opposite side of a connection must be explicitly defined in a formal protocol. For example

```javascript
@protocol FeedMeACookie
    - (void)feedMeACookie: (Cookie *)cookie;
@end
```

Because communication over XPC is asynchronous, all methods in the protocol must have a return type of void. If you need to return data, you can define a reply block like this:

```javascript
@protocol FeedMeAWatermelon
    - (void)feedMeAWatermelon: (Watermelon *)watermelon
        reply:(void (^)(Rind *))reply;
@end
```

A method can have only one reply block. However, because connections are bidirectional, the XPC service helper can also reply by calling methods in the interface provided by the main application, if desired.

Each method must have a return type of void, and all parameters to methods or reply blocks must be either:

- Arithmetic types (int, char, float, double, uint64_t, NSUInteger, and so on)
- BOOL
- C strings
- C structures and arrays containing only the types listed above
- Objective-C objects that implement the NSSecureCoding protocol.

_Important: If a method (or its reply block) has parameters that are Objective-C collection classes (NSDictionary, NSArray, and so on), and if you need to pass your own custom objects within a collection, you must explicitly tell XPC to allow that class as a member of that collection parameter._

### Connecting to and using an interface

Once you have defined the protocol, you must create an interface object that describes it. To do this, call the interfaceWithProtocol: method on the NSXPCInterface class. For example

```javascript
NSXPCInterface *myCookieInterface =
    [NSXPCInterface interfaceWithProtocol:
        @protocol(FeedMeACookie)];
```

Once you have created the interface object, within the main app, you must configure a connection with it by calling the initWithServiceName: method. For example:

```javascript
NSXPCConnection *myConnection =    [[NSXPCConnection alloc]
     initWithServiceName:@"com.example.monster"];
myConnection.remoteObjectInterface = myCookieInterface;
[myConnection resume];
```

Note: For communicating with XPC services outside your app bundle, you can also configure an XPC connection with the initWithMachServiceName: method.

![](assets/xpc-services-on-macos-app-using-swift_87c72866837ca130efa881629660714f_md5.webp)

At this point, the main application can call the remoteObjectProxy or remoteObjectProxyWithErrorHandler: methods on the myConnection object to obtain a proxy object.

This object acts as a proxy for the object that the XPC service has set as its exported object (by setting the exportedObject property). This object must conform to the protocol defined by the remoteObjectInterface property.

When your application calls a method on the proxy object, the corresponding method is called on the exported object inside the XPC service. When the service’s method calls the reply block, the parameter values are serialized and sent back to the application, where the parameter values are deserialized and passed to the reply block. (The reply block executes within the application’s address space.)

_Note: If you want to allow the helper process to call methods on an object in your application, you must set the exportedInterface and exportedObject properties before calling resume. These properties are described further in the next section._

### Accepting a connection in the helper

When an NSXPCConnection-based helper receives the first message from a connection, the listener delegate’s `listener:shouldAcceptNewConnection:` method is called with a listener object and a connection object. This method lets you decide whether to accept the connection or not; it should return YES to accept the connection or NO to refuse the connection.

_Note: The helper receives a connection request when the first actual message is sent. The connection object’s resume method does not cause a message to be sent._

In addition to making policy decisions, this method must configure the connection object. In particular, assuming the helper decides to accept the connection, it must set the following properties on the connection:

- exportedInterface—an interface object that describes the protocol for the object you want to export. (Creating this object was described previously in Connecting to and using an interface.)
- exportedObject—the local object (usually in the helper) to which the remote client’s method calls should be delivered. Whenever the opposite end of the connection (usually in the application) calls a method on the connection’s proxy object, the corresponding method is called on the object specified by the exportedObject property.

After setting those properties, it should call the connection object’s resume method before returning YES. Although the delegate may defer calling resume, the connection will not receive any messages until it does so.

### Sending messages

Sending messages with NSXPC is as simple as making a method call. For example, given the interface myCookieInterface (described in previous sections) on the XPC connection object myConnection, you can call the feedMeACookie method like this:

```javascript
Cookie *myCookie = ...

[[myConnection remoteObjectProxy] feedMeACookie: myCookie];
```

When you call that method, the corresponding method in the XPC helper is called automatically. That method, in turn, could use the XPC helper’s connection object similarly to call a method on the object exported by the main application.

### Handling errors

In addition to any error handling methods specific to a given helper’s task, both the XPC service and the main app should also provide the following XPC error handler blocks:

- Interruption handler—called when the process on the other end of the connection has crashed or has otherwise closed its connection. The local connection object is typically still valid—any future call will automatically spawn a new helper instance unless it is impossible to do so—but you may need to reset any state that the helper would otherwise have kept.

The handler is invoked on the same queue as reply messages and other handlers, and it is always executed after any other messages or reply block handlers (except for the invalidation handler). It is safe to make new requests on the connection from an interruption handler.

- Invalidation handler—called when the invalidate method is called or when an XPC helper could not be started. When this handler is called, the local connection object is no longer valid and must be recreated. This is always the last handler called on a connection object. When this block is called, the connection object has been torn down. It is not possible to send further messages on the connection at that point, whether inside the handler or elsewhere in your code.

In both cases, you should use block-scoped variables to provide enough contextual information—perhaps a pending operation queue and the connection object itself—so that your handler code can do something sensible, such as retrying pending operations, tearing down the connection, displaying an error dialog, or whatever other actions make sense in your particular app.
