---
draft: false
title: Breakdown
short_title: Breakdown 🧩
description: null
date: 2025-07-15
authors:
  - tieubao
pinned: true
tags:
  - make
  - breakdown
---

We believe that true understanding comes from building things ourselves. If we cannot recreate something, we probably do not understand it as well as we think. This principle shapes how we approach technology and learning across our woodland.

LLMs have changed the way we explore, document, and share technical knowledge. They have made it possible to dive deeper and faster into the inner workings of software, systems, and tools. Still, knowing how something works is more than just reading about it. It is about taking it apart, seeing what makes it tick, and sometimes putting it back together in new ways.

Our `/topics` folder is where we collect our learnings on specific concepts and technologies. But this series goes further. In "Breakdown", we focus on the nuts and bolts of real applications. We break down:

- What the app does
- How it works under the hood
- The data structures and algorithms it uses (or what objects it creates, reads, updates, and deletes)
- The technical challenges it faces and how those are solved
- Any clever tricks or tips we discover along the way

This is not the place for business case studies or market analysis. Here, we care about the craft, the code, and the solutions that power the tools we use every day.

## What you can expect

Each article in this series is a deep dive into the technical side of a real-world application. We will explain the big picture, but we will not shy away from the details. Expect diagrams, code snippets, and honest takes on what is hard, what is smart, and what we would do differently.

If you want to understand how things really work, you are in the right place.

## Get involved

If you have a specific app or technology you would like us to break down, let us know! Otherwise, following are some open source projects we are interested in exploring:

- [anus](https://github.com/nikmcfly/ANUS): agent framework
- [openmanus](https://github.com/mannaandpoem/OpenManus): agent framework
- [screenpipe](https://github.com/mediar-ai/screenpipe): record desktop history
- [onlook](https://github.com/onlook-dev/onlook): cursor for designer
- [autogen](https://microsoft.github.io/autogen/stable//index.html): multi-agent app framework
- [mathom](https://github.com/stephenlacy/mathom): monitor MCP locally
- [midday](https://github.com/midday-ai/midday): finance tracking
- [dyad](https://github.com/dyad-sh/dyad): AI app builder
- [nautilus trader](https://nautilustrader.io/): trading platform
- [sim](https://github.com/simstudioai/sim): AI agent workflow
- [wg-easy](https://github.com/wg-easy/wg-easy): wireguard vpn
- [frigate](https://github.com/blakeblackshear/frigate): object detection for IP camera
- [activepieces](https://github.com/activepieces/activepieces): AI agent + workflow automation
- [deepwiki-open](https://github.com/AsyncFuncAI/deepwiki-open): AI-powered Wiki generator
- [cap](https://github.com/CapSoftware/Cap): shareable screen recording
- [prefect](https://github.com/PrefectHQ/prefect): workflow orchestration for building data pipelines
- [tianji](https://github.com/msgbyte/tianji): all-in-one analytics
- [terminator](https://github.com/mediar-ai/terminator/tree/main): AI-powered desktop automation

> Next: Explore the latest deep dives from this series in the list below.

## Latest from this series

```dsql-list
SELECT markdown_link(COALESCE(short_title, title), file_path)
FROM vault
WHERE file_path ILIKE '%breakdown%'
  OR ['breakdown'] && tags
ORDER BY date DESC
LIMIT 10;
```
