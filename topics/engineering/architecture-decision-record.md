---
title: Architecture decision record
description: Learn how Architecture Decision Records (ADR) help teams document software choices, improve project clarity, and guide newcomers with clear context, solutions, and consequences for better long-term development.
date: 2020-03-27
tags:
  - architecture
  - engineering
redirect:
  - /s/tKXNuw
---

There is an issue that every team will inevitably bump into. Newbies might get confused when a project is being developed. They wonder how that code was written, how we ended up choosing that architecture. It somehow leads to finger-point, and even the decision-maker himself can't remember how that decision was taken.

That happens in a long-term project, and that's fine. We believe we're not the only one who gets that, so we'd like to gather you all and tackle this today by a practice called Architecture decision record (ADR)

## So the main list item would be

- Why ADR?
- What it contains
- Demo of ADR and example
- Support tools for ADR

![](assets/architecture-decision-record_4d815bb79330db7c753064e343bbf411_md5.webp)

So first, the picture demonstrated a crew of soldiers in a room, seeking for bugs to destroy. Once the bugs were found and the boss asked his soldiers to put an end on it, they told him not to touch anything, because the whole room would collapse. And they all ran out. So no bugs were ended.

It matches our story. When we start to write up a system, no matter how small, if we don't log the decision at the time we make it, we won't even be understanding later then, much less, to decide whether or not to adjust it. It stops us from improving the system.

When a newbie joins, they can't just immediately catch up with the current status. They don't understand any of that. Likely, newbies tend to accept the current decision without digging into the root cause. Another question would be: What happens if we break the current system and start all over again? To avoid that, they build up a practice called _ADR, to log the info and context that comes along with the decision of architecture or a technical decision_. It's like a doc of history.

Take the currency as an example. Most people don't get why the government switched from coin to paper money. Because we didn't live at the time that decision was made, and if there was nothing as 'history log,' we won't understand the reason behind and accept it as an improved move back then.

ADR helps provide a context of architecture, explaining why the previous PIC decided to make a move on it, with two main focuses: Context and Consequences

## A kit of ADR

- Architecture decision (AD): A software design choice to adjust the architecture.
- Architecture decision log (ADL): A series of files that logs our decision through different versions. ADL helps to remind what the previous decision was to make the next one better
- Requirement: the necessary condition for that architecture

## How to write an ADR

1. First, the decision must be brought up. This part is called AD, and that comes with two questions

- with the current system, does this decision crucial and matter enough?
- does this need to be done immediately? → should we make the decision

2. Decision making -> Finalized the decision
3. Implement that decision with the system and have all the related-parties aware The decision must be agreed by many parties (stakeholder, business, design, dev)

## Note down the ADR

ADR can be in different ways. After full observation, we have selected the most simple yet combined mutual from all of them. In general, an ADR is made out of three components:

1. Context: the environment and situation that leads to the decision, the current business requirement, the problem, and the constraint.
2. Solution: the selected option that outweighs the others, explain its pros and cons
3. Consequences: the impact of that decision, describe how that decision change the system or any change log to note down

## Good ADR

- Point in Time: must be stated clearly
- Rationality: explain the reason behind that decision
- Immutable Record: the decision is finalized and cannot be altered
- Specificity: and ADR should only be about _one_ decision only

## Good context

Provide the ADR with the current system and business context.
This helps drive the broader view and the business situation at that time.

## Good consequences

The right approach explains the result from making that decision and how it adjusts the current business status.

## Template of an ADR

### Alexandrian pattern

- Prologue (a summary)
- Discussion (Context)
- Solution
- Consequences

### How to manage with Git

[https://github.com/npryce/adr-tools/](https://github.com/npryce/adr-tools/)

We also had some discussion afterward, demos, and Q&A sessions. But that was a brief intro of how an ADR practice should be adopted.
