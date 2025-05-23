---
title: "Devbox shell: your dev environment, your rules"
description: Master the art of running your own shell with Devbox - locally or globally. No more environment headaches.
date: 2024-08-01
authors:
  - baenv
tags:
  - devbox
redirect:
  - /s/6Kh9cg
---

So you've installed Devbox with that nifty one-liner:

```bash
curl -fsSL https://get.jetify.com/devbox | bash
```

Now what? It's time to run your own shell, and Devbox gives you two flavors: local and global. Let's break 'em down.

## Devbox local: isolation is bliss

Want to create a bubble where you can install and run anything without messing up your system? Devbox Local is your new best friend.

Here's how it works:

1. Navigate to your project:

   ```bash
   cd path/to/your/awesome/project
   ```

2. Initialize Devbox:

   ```bash
   devbox init
   ```

   This creates two magical files: `devbox.json` and `devbox.lock`. Think of them as the blueprint and the snapshot of your environment.

3. Add packages:

   ```bash
   devbox search go
   devbox add go
   ```

   Your `devbox.json` now looks something like this:

   ```json
   {
     "$schema": "https://raw.githubusercontent.com/jetify-com/devbox/0.12.0/.schema/devbox.schema.json",
     "packages": ["go@latest"],
     "shell": {
       "init_hook": ["echo 'Welcome to devbox!' > /dev/null"],
       "scripts": {
         "test": ["echo \"Error: no test specified\" && exit 1"]
       }
     }
   }
   ```

4. Fire up your shell:

   ```bash
   devbox shell
   ```

   Want true isolation? Use `devbox shell --pure`. It's like your shell went into witness protection - new identity, no baggage.

## Devbox global: your system, supercharged

Want to use Devbox as your primary package manager? Devbox Global has got your back.

Here's the secret sauce:

1. Add this to your shell's RC file (like `~/.zshrc` or `~/.bashrc`):

   ```bash
   eval "$(devbox global shellenv)"
   ```

2. Restart your terminal or run `source ~/.zshrc` (or whatever your RC file is).

3. Start adding packages globally:

   ```bash
   devbox global add go
   ```

4. If you see a warning about your shell being out of date, just run:

   ```bash
   refresh-global
   ```

Wondering where all this magic happens? Try:

```bash
which go
# or
devbox global path
```

You'll likely see something like `~/.local/share/devbox/global/default/`. That's where Devbox keeps its global configuration.

## The bottom line

Whether you go local or global, Devbox gives you the power to create the perfect development environment. No more "it works on my machine" nightmares. Just pure, predictable, awesome shells.

So what are you waiting for? Fire up Devbox and start building something amazing.

## References

- [Installing devbox](https://www.jetify.com/devbox/docs/installing_devbox/)
- [Create a dev environment with devbox](https://www.jetify.com/devbox/docs/quickstart/)
- [Use devbox as your primary package manager](https://www.jetify.com/devbox/docs/devbox_global/)
- [Nix shell: the foundation](../introduction/¶%20Nix%20Shell.md)
