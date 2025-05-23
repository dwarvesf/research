---
title: Behavior driven development
description: Behavior driven development (BDD) is a software development process that encourages collaboration among developers, QA, and non-technical stakeholders.
date: 2022-10-13
authors:
  - huytieu
discord_channel: engineering
tags:
  - behavior-driven-development
  - agile
  - testing
  - ubiquitous-language
redirect:
  - /s/jnG0FA
---

### Behavior driven development (BDD) Three Practices

- First, take a small upcoming change to the system – a User Story – and talk about concrete examples of the new functionality to explore, discover and agree on the details of what’s expected to be done.
- Next, document those examples in a way that can be automated, and check for agreement.
- Finally, implement the behaviour described by each documented example, starting with an automated test to guide the development of the code.
  The aim is to:
- make small changes rapidly
- back up 1 level when need more info
- automate and implement a new example to get feedback
  BDD Example:

```
- Feature: User Login
*As a user I want to login into the Company's website using my existing account so that I can use other features*
- Scenario Outline: Login with valid credential
Given I navigate to <Company Login Page>
When I input <Username>
and I input <Password>
and I click Login Button
Then I should be able to login successfully
- Examples:
| Email | Password
| abc@company.info | password 1
| abc2@company.info | Password@
```

> Personal note on implementing BDD and TDD:
>
> - Mistakes are that people only implement BDD/TDD practices at **Testing phase** when they implemented automation test. However it should be as early as possible. Using "BDD" to only cover automation test is not **BDD**.
> - BDD helps products and developers realize different scenarios of a same feature, then cover as much as they could at requirement and implementation phase.
> - BDD borrows _ubiquitous language_ concept from domain driven design so that everyone in the team can understand the term the same way.

Source: <https://cucumber.io/docs/bdd/>
