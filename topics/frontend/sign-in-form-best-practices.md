---
title: Sign-in form best practices
description: "Use meaningful HTML elements: `<form>`, `<input>`, `<label>`, and `<button>`."
date: 2022-10-17
authors:
  - ngolapnguyen
tags:
  - form
  - frontend
redirect:
  - /s/rMKM-A
---

### Sign-in form best practices

- Use meaningful HTML elements: `<form>`, `<input>`, `<label>`, and `<button>`.
- Label each input with a `<label>`.
- Use element attributes to access built-in browser features: `type`, `name`, `autocomplete`, `required`.
- Give input name and id attributes stable values that don't change between page loads or website deployments.
- Put sign-in in its own `<form>` element.
- Ensure successful form submission (by navigating to a new page or simulating page navigation).
- Use `autocomplete="new-password”` and `id="new-password”` for the password input in a sign-up form, and for the new password in a reset-password form.
- Use autocomplete="current-password" and id="current-password" for a sign-in password input.
- Provide Show password functionality.
- Use `aria-label` and `aria-describedby` for password inputs.
- Don't double-up inputs (e.g forcing users to enter email or password twice)
- Design forms so the mobile keyboard doesn't obscure inputs or buttons.
- Ensure forms are usable on mobile: use legible text, and make sure inputs and buttons are large enough to work as touch targets.
- Maintain branding and style on your sign-up and sign-in pages.
- Test in the field as well as the lab: build page analytics, interaction analytics, and user-centric performance measurement into your sign-up and sign-in flow.
- Test across browsers and devices: form behaviour varies significantly across platforms.

### References

- https://web.dev/sign-in-form-best-practices
