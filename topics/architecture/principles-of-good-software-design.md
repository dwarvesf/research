---
title: Principles of good software design
description: Learn how software design breaks complex systems into simple, manageable modules with deep interfaces, error prevention, and effective design reviews to create better APIs and reduce complexity.
date: null
redirect:
  - /s/-6o6pw
---

- Software design is a process of decomposition: breaking down large systems into manageable units for independent implementation.
- To manage complexity: eliminate it by
  - Avoiding special cases
  - Or hiding complexity through modular design!
- **“Design it twice:”** John advocates for this. For example when he designed the API for the [Tk Toolkit](https://substack.com/redirect/be933e4d-bfc9-4c23-abc0-8ec11693a0d0?j=eyJ1IjoiMzZjZzQifQ._O5LQ8gm17FUHREmkIpFc9EN343q2guSXSmB2Xjimcw): the second design proved superior.
- **Deep modules**: creating deep modules with simple interfaces masks significant internal functionality. This helps manage complexity.
- **Error handling:**
  - The tactical approach is trying to "define errors out of existence" by designing systems to prevent certain errors from occurring. Be careful of simply ignoring necessary error checks though!
- When designing interfaces: consider the caller's perspective
- **Design reviews and discussions**: these are important to get more viewpoints and when evaluating design tradeoffs.
  - John mentions a specific whiteboarding technique for achieving consensus in discussions – consider trying it out!
