---
title: null
description: null
date: null
tags:
  - elixir
redirect:
  - /s/Inx0BA
---

## Brief

About the db connection issue in umbrella app

- Solution 1: Normally you’d do that by inversion of control. Create a behaviour in each app, which handles the concern of “accessing a db” and use configuration to let it use `MyApp.Repo` in prod and some other implementation in development/testing.
- Solution 2: Your apps can depend on each other, so you could have a shared Repo app that is used by all the different components, and yet each of those can have their own schemas, which may overlap or not depending on your architecture.

One potential problem I’ve noticed came when we deployed the app: because many of the individual apps have their own repository, that means that the app requires more connections. We’re using Gigalixir and the basic first tier database supports 25 connections, but between 6 or 10 apps, that gets gobbled up pretty quickly, so for each app I had to whittle down the connections to 2 or 4 connections per app before the error messages went away.

> The idea of a poncho app is really simple. It’s just like an umbrella app but instead of a single OTP app ruling everything, you have mulitple mix.lock files instead of a single mix.lock that can cause issues.

Just to make this clear, there’s not a “single OTP app” in an umbrella. The top abstractions on the beam is an otp app and umbrella and poncho are both ways to compose multiple otp applications together.

- The difference is that an umbrella is a single mix project, which combines multiple nested “mix projects” into one – starting any of them by default,
- while poncho’s approach is developing each application in it’s own mix project and using simple `{:dep, path: "…"}` dependencies between each other, where there’s one “root” application, which depends on all the sub applications.

This seems like a bad idea for umbrellas. Umbrellas are one app. They are. They are not one repo with multiple different apps. **They are one app with multiple concerns**. They are one app.

Do you want to feel deploy them as one or make seperate deployments? If that’s so, I think what you are looking at is poncho apps. Since they are their own report, I think you should move away from umbrellas and move into poncho.

As per the DB, this means memory usage will increase for each new app. If that’s ok, go for it. The amount of connections will be dependent on what each app requires. Normally I just worry about that later when load increases, but only if this current config can sustain the current load.

I agree that what you describe sounds more like poncho projects, which was pioneered by the Nerves team and also something Dave Thomas has used with his component-focused approach. The original writeup I’m familiar with is here https://embedded-elixir.com/post/2017-05-19-poncho-projects/

In my understanding I make a distinction between apps and projects.

- Projects are how code at rest (on the filesystem) are organized.
- Apps (in the OTP sense) are a runtime concern – basically a branch of a supervision tree.
- You can have a 1-to-1 mapping of project to app, or a 1-to-many. Umbrellas are projects with a 1-to-many mapping to apps.
- Things get more flexible when you also start **thinking about releases**. Releases are deployable units of apps. You can have multiple releases out of one umbrella, each using some subset of the contained apps. Distillery supports multiple release targets specifically for this purpose.

I like umbrellas. They fit well with the type of app I’m familiar with. I make one mitigating change from default umbrella setup to run each app’s tests in a separate BEAM to suss out any improper coupling early. Umbrellas may not fit everyone, but I’ve also heard a lot of misinformation.

They must have a consistent set of dependencies, and they have a mix.exs file, but that is not sufficient to make them an OTP application. Their mix file is lacking an `application` configuration. They have no `Application` behaviour module and no supervision tree. Umbrellas are best thought of as a “project” of shared configuration and dependencies.

This sounds like you’re missing some abstraction here. For me `MyApp.Repo` is mostly a runtime construct handling db connections to a certain database (pooling and all that stuff). And it sounds like you want to reduce coupling to the app holding that module. Normally you’d do that by inversion of control. Create a behaviour in each app, which handles the concern of “accessing a db” and use configuration to let it use `MyApp.Repo` in prod and some other implementation in development/testing. If you want you could even reuse `Ecto.Repo` as the needed behaviour, as ecto already has a behaviour in front of the actual implementation within the library.

---

#### Reference

- https://elixirforum.com/t/best-practices-umbrella-app-with-multiple-repos/21113
