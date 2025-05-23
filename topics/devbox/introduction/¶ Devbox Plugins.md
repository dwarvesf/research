---
title: "Devbox plugins: Turbocharge your dev setup"
description: Discover how Devbox Plugins streamline your development workflow by automating package setup and configuration
date: 2024-08-01
authors:
  - baenv
tags:
  - devbox
redirect:
  - /s/7EHbZQ
---

Ever spent hours configuring a new package in your dev environment? Yeah, we've all been there. It sucks. That's why we created Devbox Plugins.

## The plugin revolution

Imagine this: You need to add Nginx to your project. Without plugins, you're in for a world of hurt - custom configs, environment variables, file management... ugh.

But with Devbox Plugins? It's a whole new ballgame:

1. Add Nginx to your project.
2. ...
3. That's it. You're done.

No, seriously. The plugin handles everything else:

- Slaps down a rock-solid default config
- Exposes the right env vars for easy tweaking
- Organizes config files so you're not playing hide-and-seek later
- Sets up a service so you can start/stop Nginx with a single command

And the best part? This all happens automagically when you add the package. No extra steps, no headaches.

## Plugin flavors: Built-in or build your own

We've got two types of plugins to suit your needs:

### 1. Built-in plugins: The easy button

These are our pre-baked plugins for popular packages. Nginx, PostgreSQL, Node.js - we've got you covered. Just add the package, and the plugin kicks in automatically.

Want to see what's available? [Check out our Built-in Plugins docs](https://www.jetify.com/devbox/docs/guides/plugins/#using-plugins).

### 2. Custom plugins: For the DIY crowd

Need something special? No problem. You can create your own plugins following our [dead-simple schema](https://www.jetify.com/devbox/docs/guides/creating_plugins/#plugin-design). Host them locally or on GitHub - whatever floats your boat.

## The plugin lifecycle: How the magic happens

Plugins aren't just static config files. They're active participants in your Devbox shell's lifecycle:

![Devbox Shell Lifecycle](assets/devboxshell_lifecycle.webp)

Every time you fire up a shell, run a script, or start a service, your plugins spring into action, making sure everything's set up just right.

## Anatomy of a plugin

Here's what a plugin looks like under the hood:

```
my-awesome-plugin/
├── README.md              # Because documentation matters
├── plugin.json            # The brains of the operation
├── config/
│   ├── my-plugin.conf     # Default configs
│   └── process-compose.yaml  # Service definitions
└── test/
    ├── devbox.json        # For testing your plugin
    └── devbox.lock
```

The star of the show is `plugin.json`. This is where you define what your plugin does, what packages it needs, what environment variables it sets - everything.

## The bottom line

Devbox Plugins aren't just a nice-to-have. They're a game-changer. They take the pain out of package setup, letting you focus on what really matters: building awesome stuff.

So the next time you're adding a package to your Devbox project, remember: there's probably a plugin for that. And if there isn't? Well, maybe it's time to build one.

## References

- [Devbox plugins guide](https://www.jetify.com/devbox/docs/guides/plugins/)
- [Creating custom Devbox plugins](https://www.jetify.com/devbox/docs/guides/creating_plugins/)
- [Nix package manager](https://nixos.org/)
- [Nginx documentation](https://nginx.org/en/docs/)
