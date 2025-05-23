---
title: null
description: null
date: null
tags:
  - deployment
redirect:
  - /s/bxaLXg
---

### Recreate

We use Kubernetes as a mainly orchestrator for most of infrastructures. In Kubernetes there are a few different ways to release an application such as Recreate, RollingUpdate, Blue/Green, Canary, A/B testing, etc. It is necessary to choose the right strategy to make your infrastructure reliable during an application update.

In development environment, we prefer to use Recreate strategy for deployment which will terminate all the running instances then recreate them with the newer version.

**Pro**

- application state entirely renewed

**Cons**

- downtime that depends on both shutdown and boot duration of the application

### RollingUpdate

In production environment, we use RollingUpdate strategy, a secondary ReplicaSet is created with the new version of the application, then the number of replicas of the old version is decreased and the new version is increased until the correct number of replicas is reached.

When setup together with horizontal pod autoscaling it can be handy to use a percentage based value instead of a number for maxSurge and maxUnavailable. If you trigger a deployment while an existing rollout is in progress, the deployment will pause the rollout and proceed to a new release by overriding the rollout.

**Pro**

- Version is slowly released across instances
- Convenient for stateful applications that can handle rebalancing of the data
- Zero-downtime

**Cons**

- Rollout/rollback can take time
- Supporting multiple APIs is hard
- No control over traffic

### Security

Web apps mostly are hosted on netlify, vercel, google cloud run. They are very convenient to develop web apps which have changes frequently, easy for management, rolling back if needed and low cost

servers & 3rd party services are managed by k8s which solved many issues like nearly zero downtime, even when servers get crash, they will be automated recover instantly. we apply blue-green deployment to make sure we don't have downtime when deploying new version, this will reduce traffic lost as much as possible

**Security**

- https cert is renew periodically by cert-manager, so servers are always protected
- Database is only available for internal network, which only be reach by valid services, so we won't be attacked and leaked sensitive data from the outside

Servers also be monitored by health check periodically and system (prometheus & alert manager) will send alert emails to notify people if system is getting unhealthy, so we can be aware and handle hidden issues properly, timely.

We use Loki for monitoring system by logging in real-time and have some metrics to measure potential issues, bugs.
