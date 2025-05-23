---
title: "Devbox: your dev environment on steroids"
description: Forget setup headaches. Devbox delivers instant, rock-solid dev environments powered by Nix.
date: 2024-08-01
authors:
  - baenv
tags:
  - devbox
redirect:
  - /s/rOw-2A
---

Remember the last time you onboarded a new developer? Or tried a new tool without wrecking your setup? Yeah, it probably sucked. But it doesn't have to.

## The dev environment dream

Imagine this:

- Your whole team works in identical environments
- You test new tools without fear
- Your dev setup is lightning fast
- Version conflicts? Ancient history
- Your perfect environment follows you everywhere

Sounds too good to be true? Meet Devbox.

## Why Devbox rocks

Devbox is like a magic wand for your command line. It conjures perfect dev environments in seconds. Here's why it's a game-changer:

1. **One file rules all:** Everything lives in a single `devbox.json`. Dependencies, env vars, init scripts – it's all there.

2. **Set it and forget it:** Define once, use forever. Devbox handles the rest.

3. **Consistency is king:** "Works on my machine" becomes "Works on every machine."

Here's what a `devbox.json` looks like:

```json
{
  "packages": ["nodejs@14", "python@3.9", "postgresql@13"],
  "env": {
    "DATABASE_URL": "postgresql://localhost/myapp"
  },
  "shell": {
    "init_hook": ["npm install", "flask db upgrade"]
  }
}
```

This gives everyone the same Node.js, Python, and PostgreSQL setup, plus any custom config you need.

## Nix power, Devbox simplicity

Under the hood, Devbox uses Nix. Don't worry – you don't need to learn Nix (but if you do, it opens up even more possibilities).

Want a package? Devbox gives you 80,000+ options from Nixpkgs. Need bleeding-edge stuff? Use Nix flakes directly. It's all seamless.

## Get started in 60 seconds

```bash
# Install Devbox
curl -fsSL https://get.jetify.com/devbox | bash

# Create a project
mkdir my-awesome-project && cd my-awesome-project
devbox init

# Add packages
devbox add nodejs python

# Fire it up
devbox shell
```

Boom. You've got a pristine environment with Node.js and Python, ready to rock.

## Why Not Just Nix?

Devbox is Nix with training wheels. It's for developers who want the power without the learning curve. Think of it as a race car with an automatic transmission.

Want to dive deeper?

- [Nix shell: the foundation](https://nixos.org/manual/nix/stable/command-ref/nix-shell.html)
- [Why choose Devbox over plain Nix](https://www.jetify.com/devbox/docs/devbox_vs_other_tools)

## The bottom line

Devbox isn't just a tool. It's a revolution in managing dev environments. It makes "works on my machine" a universal truth, not an excuse.

Is there a learning curve? Sure. But once you go Devbox, you'll wonder how you ever lived without it.

Ready to supercharge your dev setup? Give Devbox a shot. Your future self (and your team) will thank you.

## References

- [Devbox documentation](https://www.jetify.com/devbox/docs/)
- [Nix package manager](https://nixos.org/)
- [Nixpkgs repository](https://github.com/NixOS/nixpkgs)
- [Nix flakes](https://nixos.wiki/wiki/Flakes)
