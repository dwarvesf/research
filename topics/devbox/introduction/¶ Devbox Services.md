---
title: "Devbox services: tame your daemons with process-compose"
description: Discover how Devbox Services uses process-compose to wrangle your daemon applications without the container overhead
date: 2024-08-01
authors:
  - baenv
tags:
  - devbox
redirect:
  - /s/qy-8AA
---

Ever wished you could manage your development services as easily as with Docker Compose, but without all the Docker baggage? Say hello to Devbox Services, powered by process-compose.

## What's process-compose?

Think of process-compose as Docker Compose's leaner, meaner cousin. It's a dead-simple way to orchestrate your non-containerized apps. No more wrestling with Dockerfiles, volumes, or registries. Just define your services, and you're off to the races.

Here's what a `process-compose.yml` might look like:

```yaml
version: "0.5"

processes:
  postgresql:
    command: |
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

  telegram-bot:
    command: |
      cd telegram-bot
      make install
      make dev
    availability:
      restart: "always"
    depends_on:
      postgresql:
        condition: process_healthy
    readiness_probe:
      http_get:
        host: 127.0.0.1
        scheme: http
        path: "/healthz"
        port: 5001
      initial_delay_seconds: 5
      period_seconds: 10
      timeout_seconds: 5
      success_threshold: 1
      failure_threshold: 3
```

## Breaking it down

Let's dissect this beast:

### PostgreSQL process

```yaml
postgresql:
  command: |
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
```

This little chunk of YAML is doing some heavy lifting:

1. It checks if TimescaleDB is enabled. If not, it adds it to the config.
2. Fires up PostgreSQL with a custom socket directory.
3. Tells process-compose this is a long-running daemon.
4. Defines how to gracefully shut down PostgreSQL.
5. Sets it to always restart if it crashes.
6. Uses `pg_isready` to check if PostgreSQL is good to go.

### Telegram bot process

```yaml
telegram-bot:
  command: |
    cd telegram-bot
    make install
    make dev
  availability:
    restart: "always"
  depends_on:
    postgresql:
      condition: process_healthy
  readiness_probe:
    http_get:
      host: 127.0.0.1
      scheme: http
      path: "/healthz"
      port: 5001
    initial_delay_seconds: 5
    period_seconds: 10
    timeout_seconds: 5
    success_threshold: 1
    failure_threshold: 3
```

Here's where it gets interesting:

1. We're setting up a Telegram bot with a simple `make install && make dev`.
2. It'll restart if it crashes.
3. It won't start until PostgreSQL is healthy. No more race conditions!
4. We've got a fancy HTTP health check to make sure the bot is actually working.

## Devbox services: your new best friend

Now, here's the kicker: Devbox wraps all this process-compose goodness into a simple CLI. No need to fumble with process-compose directly. Just use these magic commands:

- `devbox services ls` - See what's cooking
- `devbox services restart` - Give your services a kick
- `devbox services start` - Fire everything up
- `devbox services stop` - Shut it all down

It's that easy. No containers, no fuss, just your services running smoothly in your Devbox environment.

## The bottom line

Devbox Services with process-compose gives you the power of containerized workflows without the overhead. It's perfect for development environments where you want simplicity and speed.

## References

- [process-compose Documentation](https://github.com/F1bonacc1/process-compose)
- [Devbox services guide](https://www.jetify.com/devbox/docs/guides/services)
- [PostgreSQL documentation](https://www.postgresql.org/docs/)
- [TimescaleDB documentation](https://docs.timescale.com/)
