---
title: "Devbox in production: our success story"
description: How we transformed our development and deployment process with Devbox.
date: 2024-08-09
authors:
  - baenv
tags:
  - case-study
  - devbox
  - nix
redirect:
  - /s/9cvEqQ
---

Remember when setting up a new project felt like assembling IKEA furniture blindfolded? Yeah, those days are over. Here's how Devbox revolutionized our workflow, from dev to production.

## The big picture: Devbox across our projects

We didn't just dip our toes into Devbox - we dove in headfirst. **Two main projects** and a handful of side projects later, we're swimming in efficiency.

## The spotlight

### Dev environment: from hours to minutes

Before Devbox:

1. Clone repo
2. Install dependencies (pray for version compatibility)
3. Set up databases
4. Configure environment variables
5. Sacrifice a goat to the dev gods
6. Maybe start coding

With Devbox:

1. Clone repo
2. `devbox shell`
3. Start coding

Yeah, it's that simple. Our `devbox.json` looks something like this:

```json
{
  "packages": ["nodejs@14", "postgresql@13", "redis@6"],
  "shell": {
    "init_hook": ["npm install", "npm run db:setup"]
  }
}
```

New team member? "Here's the repo, run `devbox shell`." Boom, they're productive on day one.

### Deployment: Dockerfile? More like DockerSMILE

Remember the days of handcrafting Dockerfiles? Neither do we. Now we just:

```bash
devbox generate dockerfile
```

And we get a Dockerfile that's perfectly synced with our dev environment. No more "works on my machine" syndrome. If it works in dev, it works in prod.

## Leveling up: custom flakes for the win

We didn't stop at basic Devbox usage. We dove into the world of Nix Flakes to create custom, reusable configurations. Here's one of what we cooked up:

```nix
{
  description = "A flake that adds the timescaledb extension to Postgresql";

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

This flake is our secret weapon for projects needing PostgreSQL with TimescaleDB. It's like ordering a custom pizza - PostgreSQL is the base, and TimescaleDB is the topping we always want.

Why is this cool? Let me count the ways:

- **Consistency**: Every developer gets the exact same PostgreSQL setup, TimescaleDB included.
- **Flexibility**: Need to add another extension? Just add it to psqlExtensions. It's that easy.
- **Portability**: This flake works on any system Nix supports. Linux, Mac, doesn't matter.
- **Versioning**: We're using PostgreSQL 15 here. Want to test with 14? Just change one number.

But the real magic happens when we use this in a Devbox project. We just add this to our devbox.json:

```json
{
  "packages": ["path:/path/to/our/postgresql-flake"]
}
```

## The secret sauce: our internal service repo

We created a central repository of Devbox configurations for popular services. This isn't your grandma's config file - it's a Swiss Army knife for dev environments. Take a look at this beauty:

```json
// devbox.json
{
  "$schema": "https://raw.githubusercontent.com/jetpack-io/devbox/0.10.1/.schema/devbox.schema.json",
  "packages": {
    "github:NixOS/nixpkgs#darwin.apple_sdk.frameworks.CoreText": "",
    "nodejs": "18",
    "pnpm_8": "8.15.9",
    "pkg-config": "0.29.2",
    "pango": {
      "version": "1.52.2",
      "outputs": ["dev"]
    },
    "libpng": "1.6.43",
    "giflib": "5.2.2",
    "librsvg": {
      "version": "2.58.2",
      "outputs": ["dev"]
    },
    "python3": "3.11.9",
    "pixman": "0.43.4",
    "cairo": {
      "version": "1.18.0",
      "outputs": ["dev"]
    },
    "libjpeg": {
      "version": "3.0.3",
      "outputs": ["dev"]
    },
    "elixir": "1.15.7",
    "github:baenv/timescalepg-fake#postgresql": "",
    "redis": "7.2.5",
    "redis-plus-plus": "1.3.12",
    "apacheKafka": {
      "version": "2.13-3.8.0",
      "outputs": ["out"]
    },
    "kafkactl": "5.0.6",
    "zookeeper": "3.9.2"
  },
  "env": {
    "PKG_CONFIG_PATH": "$DEVBOX_PACKAGES_DIR/lib/pkgconfig",
    "KAFKA_CONFIG": "$DEVBOX_PACKAGES_DIR/config"
  },
  "shell": {
    "init_hook": [
      "echo 'Welcome to devbox!' > /dev/null",
      ". $VENV_DIR/bin/activate",
      "sudo cp $KAFKA_CONFIG/zookeeper.properties $KAFKA_CONFIG/zoo.cfg"
    ],
    "scripts": {
      "zookeeper": "sudo $DEVBOX_PACKAGES_DIR/bin/zkServer.sh --config $KAFKA_CONFIG start-foreground",
      "zookeeper-daemon": "sudo $DEVBOX_PACKAGES_DIR/bin/zkServer.sh --config $KAFKA_CONFIG start",
      "zookeeper-stop": "sudo $DEVBOX_PACKAGES_DIR/bin/zkServer.sh --config $KAFKA_CONFIG stop",
      "zookeeper-status": "sudo $DEVBOX_PACKAGES_DIR/bin/zkServer.sh --config $KAFKA_CONFIG status",
      "zookeeper-kill": "sudo kill $(ps aux | grep zookeeper | awk '{print $2}')",
      "kafka": "sudo $DEVBOX_PACKAGES_DIR/bin/kafka-server-start.sh $KAFKA_CONFIG/server.properties",
      "kafka-daemon": "sudo $DEVBOX_PACKAGES_DIR/bin/kafka-server-start.sh -daemon $KAFKA_CONFIG/server.properties",
      "kafka-stop": "sudo $DEVBOX_PACKAGES_DIR/bin/kafka-server-stop.sh $KAFKA_CONFIG/server.properties"
    }
  },
  "include": [
    "plugin:postgresql"
  ]
}

// process-compose.yaml
version: "0.5"

processes:
  postgresql:
    command: |
      rm -rf ${PGDATA}
      initdb --username=postgres
      if ! grep -q "shared_preload_libraries = 'timescaledb'" $PGDATA/postgresql.conf; then
        echo "shared_preload_libraries = 'timescaledb'" >> $PGDATA/postgresql.conf
      fi
      pg_ctl start -o "-k $PGHOST"
    is_daemon: true
    shutdown:
      command: "pg_ctl stop -m fast"
    availability:
      restart: "always"
    readiness_probe:
      exec:
        command: "pg_isready"

  redis:
    command: "redis-server $REDIS_CONF --port $REDIS_PORT"
    availability:
      restart: on_failure
      max_restarts: 5

  zookeeper:
    command: "devbox run zookeeper-daemon"
    is_daemon: true
    shutdown:
      command: "devbox run zookeeper-stop"
    availability:
      restart: "always"
    readiness_probe:
      exec:
        command: "sudo devbox run zookeeper-status | grep -q 'Mode: standalone'"
        interval: 20s
        timeout: 20s
        retries: 5

  kafka:
    command: "devbox run kafka-daemon"
    is_daemon: true
    shutdown:
      command: "devbox run kafka-stop"
    availability:
      restart: "always"
    depends_on:
      zookeeper:
        condition: process_healthy
    readiness_probe:
      exec:
        command: "kafkactl get brokers | grep -v 'connection refused'"
        interval: 10s
        timeout: 10s
        retries: 5
```

These are not just config files; they look like love letters to productivity. Let's break it down:

1. **Kitchen sink included**: Node.js, Python, Elixir, Redis, Kafka - it's like an all-you-can-eat buffet for developers.

2. **Version control**: Every package is pinned to a specific version. No more "it worked yesterday" syndrome.

3. **Cross-platform magic**: See that `darwin.apple_sdk` package? That's making sure our Mac users don't feel left out.

4. **Custom sauce**: We've got our own TimescaleDB-enabled PostgreSQL package in there. Because why settle for off-the-shelf when you can have gourmet?

5. **Environment setup**: PKG_CONFIG_PATH and KAFKA_CONFIG are preset. It's like having your IDE set up before you even open it.

6. **Script city**: Look at those Zookeeper and Kafka scripts. Starting a distributed system is now as easy as `devbox run kafka`.

7. **Plugin power**: We're using the PostgreSQL plugin, because why reinvent the wheel when you can turbocharge it?

Here's the kicker: Need a Kafka cluster for local testing? Just copy this file, run `devbox shell`, and boom - you're running a mini data center on your laptop.

Want to spin up a multi-service setup with Node.js, Python, and a sprinkle of Elixir? It's all there, ready to rock.

This isn't just configuration; it's constellation. All these services, perfectly aligned, ready to shine in your development universe.

Is it overkill for a simple React app? Maybe. But for our complex, multi-service architectures, this is the difference between a day of setup and a minute of magic.

## The bottom line

Devbox didn't just change our tools; it changed our culture. "It's too complex to set up locally" is no longer an excuse. "It works on my machine" is no longer a problem.

Is it perfect? No. Sometimes we still need to dive into Nix for complex setups. But for 90% of our needs, Devbox is our go-to.

Life's too short for bad dev environments. Make yours awesome with Devbox.
