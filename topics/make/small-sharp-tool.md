---
draft: false
title: Do one thing well
description: Explore the Unix philosophy of small, sharp tools and how it applies to modern product development and agentic AI. Learn why focused, composable solutions beat bloated all-in-one products.
date: 2025-06-05
authors:
  - tieubao
pinned: true
tags:
  - make
  - product
  - unix
  - philosophy
  - ai
  - design
  - focus
---

**The best products do one thing exceptionally well.** This isn't just a nice-to-have philosophy, it's the foundation of sustainable product development. Rooted in the Unix tradition of small, sharp tools, this mindset offers a powerful alternative to the bloated, everything-and-the-kitchen-sink approach that plagues modern software.

As we move into an era of agentic AI and rapidly evolving technology, the principles behind `grep`, `curl`, and `jq` become more relevant than ever. These tools succeed because they focus, compose, and integrate seamlessly. Your products and AI systems should too.

## The Unix way

Small, sharp tools are lightweight programs that excel at a single task. They embody Doug McIlroy's 1978 philosophy: "Write programs that do one thing and do it well." These tools share key characteristics:

- **Focused scope:** They solve one problem completely rather than many problems partially
- **Composable design:** They work together through pipes, APIs, or standard interfaces
- **Clear boundaries:** They avoid feature creep and unnecessary complications

## Why this matters now

**Products stay maintainable:** When your note-taking app tries to be a calendar and task manager, everything suffers. When it focuses on fast, distraction-free writing, it excels.

**Teams move faster:** Small, scoped features ship quickly. You can validate assumptions and iterate without managing monolithic complexity.

**Users understand value:** Stripe focuses on payments, not accounting. Calendly handles scheduling, not project management. Clear value propositions win.

**Systems integrate better:** Products designed as focused tools integrate seamlessly through APIs and standard formats, enabling users to create custom solutions.

## Agentic AI applications

This philosophy becomes crucial for AI systems:

- **Specialized agents:** Create focused agents that excel at specific tasks rather than generalist AIs that do everything poorly
- **Composable workflows:** Design agents to work together through clear interfaces, like Unix pipes for AI
- **Clear failure boundaries:** Narrow scope makes AI limitations predictable and manageable

## How to build this way

- **Define clear boundaries:** Use jobs-to-be-done frameworks to identify core purpose
- **Design for composition:** Build with APIs and standard formats for integration
- **Resist scope creep:** Ask whether new features serve the core purpose
- **Start minimal:** Launch with the smallest viable feature that delivers value

The future belongs to products and AI systems that do one thing exceptionally well and compose beautifully with others. In a world of infinite possibilities, focus becomes your competitive advantage.

*Sources: Adapted from "Small, Sharp Tools" by Brandur Leach, [brandur.org](https://brandur.org/small-sharp-tools), December 12, 2014. Additional insights from "The Art of Unix Programming" by Eric S. Raymond and modern Unix tool communities.*
