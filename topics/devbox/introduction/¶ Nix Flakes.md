---
title: "Nix flakes: next-level package management"
description: Discover how Nix Flakes revolutionize package management with reproducibility and discoverability
date: 2024-08-01
authors:
  - baenv
tags:
  - devbox
  - nix
redirect:
  - /s/NE7Tmg
---

Ever tried to share your perfect dev setup, only to hear "It doesn't work on my machine"? Nix Flakes is about to make that headache a thing of the past.

## What's a Flake?

Think of a Flake as a supercharged `package.json`. It's a self-contained unit that defines everything your project needs, from dependencies to build instructions. And just like `package-lock.json`, there's a `flake.lock` to keep everything pinned and reproducible.

## Why Should You Care?

1. **Reproducibility**: Same setup, every machine, every time. No more "but it works on my machine" excuses.
2. **Discoverability**: Share your setup as easily as sharing a Git repo. Others can use your work without headaches.
3. **Flexibility**: Customize existing packages without breaking a sweat.

## Flakes in action: the PostgreSQL Timescale saga

Let's say you need PostgreSQL with TimescaleDB. But oh no, there's no pre-built package! No problem. Here's how you'd whip one up with Flakes:

```nix
{
  description = "PostgreSQL on Steroids: Now with TimescaleDB!";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = import nixpkgs {
          inherit system;
          config.allowUnfree = true;
        };
        psqlExtensions = [
          "timescaledb"
        ];
      in {
        packages = {
          postgresql = pkgs.postgresql_15.withPackages (ps:
              (map (ext: ps."${ext}") psqlExtensions));
        };

        defaultPackage = self.packages.${system}.postgresql;
      });
}
```

## Breaking it down

1. **Inputs**: We're grabbing the latest Nixpkgs and some handy utilities.
2. **Outputs**: This is where the magic happens. We're creating a custom PostgreSQL package for every system Nix supports.
3. **The secret sauce**: `postgresql = pkgs.postgresql_15.withPackages (...)` - This line is adding TimescaleDB to PostgreSQL.

## Why this rocks

1. **Customization made easy**: Need more extensions? Just add them to `psqlExtensions`.
2. **Universal**: Works on any system Nix supports. Linux, Mac, doesn't matter.
3. **Shareable**: Anyone can use this Flake to get the exact same PostgreSQL setup.

## The bottom line

Nix Flakes aren't just a feature; they're a revolution in package management. They make "works on my machine" a universal truth, not an excuse.

Ready to make your dev setup bulletproof? Give Nix Flakes a shot. It's time to take control of your dependencies.

## References

- [Nix flakes documentation](https://nix.dev/concepts/flakes.html)
- [Nix flake command reference](https://nix.dev/manual/nix/2.22/command-ref/new-cli/nix3-flake)
- [Reddit: explaining flakes](https://www.reddit.com/r/NixOS/comments/131fvqs/can_someone_explain_to_me_what_a_flake_is_like_im/)
