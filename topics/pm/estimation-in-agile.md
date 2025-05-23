---
title: Estimation in agile
description: Learn how to estimate work using story points, time, and planning poker for accurate project planning, with tips on improving quality through adjusted estimates and workflow practices.
date: 2016-02-12
tags:
  - agile
redirect:
  - /s/1LNhmQ
---

**Estimation** (or **estimating**) is the process of finding an **estimate**, or approximation, which is a value that is usable for some purpose even if input data may be incomplete, uncertain, or unstable.

The value is nonetheless usable because it is derived from the best information available. [1](https://piemapping.atlassian.net/wiki/spaces/EN/pages/37486626/Estimations#Estimations-source-1)

## Estimation units

In our workflow we use two different units that are explained below.

### Story points

Story points are a unit of measure for expressing an estimate of the overall effort that will be required to fully implement a product backlog item or any other piece of work.

When estimating using story points the team must include everything that can affect the effort such as :

- The amount of work to do
- The complexity of the work
- Any risk or uncertainty in doing the work

For a more detailed description on the subject: [What are story points?](https://www.mountaingoatsoftware.com/blog/what-are-story-points)

The possible values that can be given as story points needs to be part of the Fibonacci sequence we will be using (0, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89).

_The reason for using the Fibonacci sequence is to reflect the inherent uncertainty in estimating larger items_

### Time

Estimation using time is also used for some specific [issue types](https://piemapping.atlassian.net/wiki/spaces/EN/pages/32997407/Issue+types). This estimation is the amount of time originally anticipated to resolve the issue.

When estimating using time the team must consider how long something will take if:

- it's all you work on
- no one interrupts you
- everything you need is available

The format for the time estimate is "eg. 4d 12h".

## Estimation with planning poker

There is different approaches regarding estimations. The one we are going with at pie is the planning poker.

The planning poker, is a consensus-based, gamified technique for estimating.

The reason to use planning poker is to **avoid the influence of the other participants**. If a number is spoken, it can sound like a suggestion and influence the other participants' sizing. Planning poker should force people to think independently and propose their numbers simultaneously. This is accomplished by requiring that all participants show their card at the same time.

### Procedure

1. A Moderator, who will not play, chairs the meeting.
2. Each estimator knows the list of valid estimations and has a way to show to the other participants the number he chose. (Cards, mobile app, or post-it)
3. A short overview of the story to be estimated will be given.
4. The team is given an opportunity to ask questions and discuss to clarify assumptions and risks. A summary of the discussion is then expressed
5. Each individual thinks about their estimate for the story.
6. Once everyone is ready, everyone calls their cards simultaneously by turning them over.
7. People with high estimates and low estimates are given the opportunity to offer their justification for the estimate and then discussion continues.
8. We then repeat steps 5 to 7 up to 3 times or less if a consensus is reached.
9. If a consensus if not reached within 3 rounds, the moderator will take a decision.

### Disclaimer

- The planning poker is not a vote.
- The highest value will not be taken by default by the moderator if a consensus is not reached. The decision will be based on the discussions the team had.
- If a team member is not sure about his estimate and wants a value in the middle (ie. 10 but he can choose only between 8 and 13) then he must round up (ie. 13 here).
- **During discussion, numbers must not be mentioned at all in relation to feature size**

## Experimentation: safety plan

The current engineering focus at DF is to improve the quality of our product, and its associated quality assurance processes.

The motivation is to ensure that every story developed is done so properly and ready to be released with confidence and on-time.

To help reduce the number of historical issues and their associated causes such as estimations being too low, shortcuts taken to keep the sprint on-schedule, features not properly tested due to lack of process and a general lack of boundaries between departments – we are enforcing new workflows and margin-of-error for our quality assurance process.

In order to achieve that, we want some time to be allocated with each issue regarding:

- the testing that the engineer does (a focus on a more holistic approach to testing)
- reviewing the new code he wrote for that issue (and associated dependencies)
- checking that the issue matches the specifications (strictly following the written requirements, and no divergence)

We do not want to complexify the way the estimation is done. The way we estimate new stories stays the same.

However, after the team has given its final estimation for a story, the moderator will increase that number by going to the next fibonacci number. (ie. team estimate 3, moderator assigns 5 to the ticket)

If after the moderator increases that number it is higher than 13, then the story will be broken down in smaller pieces and or sub tasks. This behaviour is standard, and now the expected norm.
