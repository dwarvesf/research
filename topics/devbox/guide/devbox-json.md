---
title: "Devbox.json: Your project's DNA"
description: Master your Devbox environment with this no-nonsense guide to devbox.json
date: 2024-08-01
authors:
  - baenv
tags:
  - devbox
redirect:
  - /s/E1g_eA
---

Ever wished you could clone your perfect dev environment? With `devbox.json`, you can. This little file is the beating heart of your Devbox setup. Let's crack it open and see what makes it tick.

![Devbox.json Configuration](assets/config-ref.webp)

## The anatomy of devbox.json

### Packages: Your toolbox

```json
"packages": [
  "rustup@latest",
  "libiconv@latest"
]
```

This is where you list all the packages you need. Think of it as your project's shopping list. Need Rust? Throw it in. Need a specific version? Just add `@<version>` after the package name.

**Pro tip:** Use `devbox search <package>` to find available versions.

### ENV: Set the stage

```json
"env": {
  "PROJECT_DIR": "$PWD"
}
```

Here's where you declare or override environment variables. It's like setting up the perfect lighting before a photoshoot - everything just works better.

### Shell: Your command center

```json
"shell": {
  "init_hook": [
    ". conf/set-env.sh",
    "rustup default stable",
    "cargo fetch"
  ],
  "scripts": {
    "build-docs": "cargo doc",
    "start": "cargo run",
    "run_test": [
      "cargo test -- --show-output"
    ]
  }
}
```

This is where the magic happens:

- `init_hook`: These commands run every time you fire up your Devbox shell. Perfect for setup tasks.
- `scripts`: Define your own commands here. It's like creating shortcuts for complex tasks.

### Include: Extend your powers

```json
"include": [
  "github:org/repo/ref?dir=<path-to-plugin>",
  "path:path/to/plugin.json",
  "plugin:php-config"
]
```

Need more firepower? Use `include` to add extra configurations:

- Pull plugins from GitHub
- Use local plugins
- Activate built-in plugins

## Put it all together

Here's what a fully-loaded `devbox.json` might look like:

```json
{
  "packages": ["rustup@latest", "libiconv@latest"],
  "env": {
    "PROJECT_DIR": "$PWD"
  },
  "shell": {
    "init_hook": [". conf/set-env.sh", "rustup default stable", "cargo fetch"],
    "scripts": {
      "build-docs": "cargo doc",
      "start": "cargo run",
      "run_test": ["cargo test -- --show-output"]
    }
  },
  "include": [
    "github:org/repo/ref?dir=<path-to-plugin>",
    "path:path/to/plugin.json",
    "plugin:php-config"
  ]
}
```

## The bottom line

Your `devbox.json` is more than just a config file - it's a blueprint for the perfect dev environment. Spend some time getting it right, and you'll save countless hours down the road.

Remember, a well-crafted `devbox.json` is like a good pair of shoes: it should fit perfectly and take you anywhere you want to go.

## References

- [Devbox.json configuration reference](https://www.jetify.com/devbox/docs/configuration/)
- [Devbox search command](https://www.jetify.com/devbox/docs/cli_reference/devbox_search/)
- [Devbox plugins guide](https://www.jetify.com/devbox/docs/guides/plugins/)
