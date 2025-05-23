---
title: null
description: null
date: null
tags:
  - devops
redirect:
  - /s/i4bnKQ
---

### Why runbooks are useful

1.  Automated processes don't always protect against issues -- so software needs 10s to 100s of different activities actioned by skilled humans to keep the system rolling

2.  "30-40% of procedures require human judgement to resolve safely so that's still a bunch of run books won't go away - even if large parts of deployment are push-button processes."

3.  **Prevents an issue like this:** "I recently ran into a situation where I spent 6 hours understanding how something works that would have taken 20 minutes if the relevant information was stored somewhere."

### Ways that teams have set up their runbooks

- **Confluence** -- not particularly designed for runbooks but they are an open-ended tool that enables you if you have a solid idea of runbook design
- **Jupyter notebooks** - an open-source tool with a combo of text, image and live code snippets so decent option if you are happy to install and update
- **Markdown files hosted in git repo** -- maintenance might be an issue
- **Err… this ➝** "Sticky notes on someone's desk. We're thinking about getting a laminator to keep the coffee spills from being too serious of a problem."

### Factors to consider in runbook setup

- Make a standard runbook template -- makes it easier to process information when in a pinch like when resolving an urgent incident
- Have a collaborative approach to build the runbooks -- don't palm off to technical writers - the people who design and build the systems should be main authors or at least participate
- Give an explanation of why the component of the system was designed as it appears to runbook user
- Some runbooks have sub-processes - it's important to clarify what are these and how they relate to the process they are children of

---

#### Reference

https://five9sclub.substack.com/p/runbooks-for-better-incident-management
