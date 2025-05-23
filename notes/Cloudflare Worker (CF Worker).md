---
title: null
description: null
date: null
tags:
  - cloudflare
  - engineering
  - worker
redirect:
  - /s/18WMBw
---

### What

- serverless computation .eg "lambda function"
- create & deploy directly on Cloudflare
- arguably the most accessible serverless platform

### Why

- No cold start 🚀
- Cheap & fast 💸
  - 100k free reqs, reset daily
- Aim to get you started & deploy quickly ([workers.new](https://workers.new/))
  - [10-lines-of-code examples](https://developers.cloudflare.com/workers/examples)
- Perfect deploy platform for SSR apps

#### Simple yet smartly made api 🎯

- CF worker api is implemented after the standard Service worker api, hence the name "Worker"
- Request routing made easy, just inspect incoming `request` url/method/.etc like you normally did on browser
  - for AWS you'll have to mess with Route53 to get the right behavior (and eventually got slapped with CORS issues)
- **Service worker** is a web standard created specifically for intercepting request/response, and has been around for some times
- By implementing CF Worker after Service worker api, Cloudflare made it familiar for JS web devs to easily get used to the api, while avoid re-inventing yet another serverless api like AWS Lambda or Google Cloud functions .etc

#### Batteries included

- built-in fast KV store with async api
  - in contrast AWS/Google/Azure require you to use their platform services .eg RDS, SQS bla bla with their own setup ceremonies to further complex your setup
- ScheduledEvent, WebSocket, Stream, HTML rewriter, rate limit
- [Durable objects](https://developers.cloudflare.com/workers/runtime-apis/durable-objects): a transactional, key-value storage API

### Loved by community

- [worktop](https://github.com/lukeed/worktop): fully typed framework for CF worker
- [miniflare](https://github.com/mrbbot/miniflare): fast local env for CF worker
- [flareact](https://flareact.com/): Next.js but built for CF worker deployment
- [vitedge](https://github.com/frandiox/vitedge) (which I contributed): Vite app on CF worker
- [solid-start](https://github.com/solidjs/solid-start)/[svelte-kit](https://kit.svelte.dev/): have target option to deploy on CF worker
