---
title: "Ditch the containers: go containerless with Devbox"
description: "Build a lean, mean Golang backend without the container bloat. Here's how."
date: 2024-08-01
authors:
  - baenv
tags:
  - devbox
redirect:
  - /s/qS1aUw
---

Containers are great, but sometimes they're overkill. With Devbox Services and Plugins, you can create a sleek, containerless environment for local development. Let's build a Golang backend to show you how it's done.

## Setting the stage

First things first, let's init a Devbox shell:

```bash
devbox init
```

This gives you a bare-bones `devbox.json`:

```json
{
  "$schema": "https://raw.githubusercontent.com/jetify-com/devbox/0.12.0/.schema/devbox.schema.json",
  "packages": [],
  "shell": {
    "init_hook": ["echo 'Welcome to devbox!' > /dev/null"],
    "scripts": {
      "test": ["echo \"Error: no test specified\" && exit 1"]
    }
  }
}
```

## Adding Golang to the mix

Fire up your Devbox shell and add Go:

```bash
devbox shell
devbox add go
```

Boom! Go is now installed in your project root. Let's check:

```bash
which go
# /Users/you/your-project/.devbox/nix/profile/default/bin/go
```

## The database dilemma

Let's say you've got a killer Go API for managing books. You try to run it:

```bash
go run main.go
# 2024/07/28 17:00:10 Error connecting to database: "dial tcp 125.235.4.59:5432: connect: operation timed out"
# exit status 1
```

Oops! No database. But don't worry, Devbox has your back.

## PostgreSQL to the rescue

Add PostgreSQL to your Devbox:

```bash
devbox add postgresql
```

Devbox doesn't just install PostgreSQL. It sets up a whole environment:

- Creates a `process-compose.yaml` for you
- Sets up `PGHOST` and `PGDATA` environment variables
- Gives you commands to manage your database

Initialize your database:

```bash
initdb --username=yourusername
```

## Fire it up

Now you've got options to start your services:

- For background mode: `devbox services start`
- For monitoring mode: `devbox services up`

Create your database:

```bash
createdb bookstore --username=yourusername --password
# Enter your password when prompted
```

## The moment of truth

Update your Go code with the new database details:

```go
const (
    host     = "localhost"
    port     = 5432
    user     = "yourusername"
    password = "yourpassword"
    dbname   = "bookstore"
)
```

Run it:

```bash
go run main.go
# Successfully connected to the database!
# 2024/07/28 20:43:46 Starting server on :8080
```

## More than just PostgreSQL

Remember that `devbox.json` we started with? Forget it. Let's look at a real-world example that'll knock your socks off:

```json
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
  }
  // ... (env and shell configurations omitted for brevity)
}
```

This isn't just a configuration file. It's a manifesto for containerless development.

## Breaking it down

Let's unpack this beast:

1. **Multiple languages**: Node.js, Python, and Elixir all living in harmony. No "it works on my machine" excuses here.

2. **Precise versioning**: Every package is pinned to a specific version. Reproducibility? Check.

3. **System libraries**: Pango, Cairo, libpng - we're not just installing runtimes, we're building a complete system.

4. **Databases and messaging**: PostgreSQL, Redis, and Kafka. A full backend stack without a single `docker-compose.yml` in sight.

5. **Custom packages**: See that `github:baenv/timescalepg-fake#postgresql`? That's a custom package pulled straight from GitHub. Try doing that easily with Docker.

## The magic of Devbox services

With Devbox Services, you're not just installing these packages - you're orchestrating them. Check out these scripts:

```json
"scripts": {
  "zookeeper": "sudo $DEVBOX_PACKAGES_DIR/bin/zkServer.sh --config $KAFKA_CONFIG start-foreground",
  "kafka": "sudo $DEVBOX_PACKAGES_DIR/bin/kafka-server-start.sh $KAFKA_CONFIG/server.properties",
  // ... more scripts omitted
}
```

Start Zookeeper and Kafka with a simple `devbox run zookeeper` and `devbox run kafka`. No Docker, no fuss.

## Why this matters

1. **Speed**: No container overhead means faster startup times and lower resource usage.
2. **Flexibility**: Need to add a system library? Just add it to your `devbox.json`. No need to rebuild a Docker image.
3. **Transparency**: Everything is defined in one file. No hidden layers, no mysterious base images.
4. **Reproducibility**: Every developer gets the exact same environment, down to the system libraries.

## The bottom line

Containers had their moment. But for local development, Devbox offers a level of control and simplicity that containers can't match. It's not just about running your code - it's about crafting the perfect environment for it to thrive.

Ready to leave containers behind? Give Devbox a shot. Your future self (and your team) will thank you.

## References

- [Devbox services guide](https://www.jetify.com/devbox/docs/guides/services/)
- [Devbox plugins guide](https://www.jetify.com/devbox/docs/guides/plugins/)
- [Creating custom Devbox plugins](https://www.jetify.com/devbox/docs/guides/creating_plugins/)
