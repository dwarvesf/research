---
title: Frontend report February 2025
short_title: February 2025
description: "Our February 2025 report covers what's new in frontend development - from React's move away from Create React App to Next.js improvements, browser compatibility updates, and cool new tools like React Scan. Get practical tips for better auth, faster websites, and making your sites work for everyone."
date: 2025-02-28
authors:
  - hthai2201
tags:
  - frontend
  - market-report
redirect:
  - /s/i6mHug
---

## React

### [CRA is officially dead - here's what to use now](https://syntackle.com/blog/create-react-app-deprecated)

React finally pulled the plug on Create React App. After years without updates, CRA's strict setup and old Webpack system became a pain for developers. Try Vite for super-fast builds or Next.js if you need server rendering.

### [React Context: The hidden performance problem](https://tigerabrodi.blog/was-react-context-a-mistake)

That simple Context Provider might be slowing down your app. Context causes too many re-renders across your app. Break large contexts into smaller ones or try state libraries like Jotai or Zustand for better control over what updates when.

### [Understanding React Server Components: Under the hood](https://tonyalicea.dev/blog/understanding-react-server-components/)

This guide breaks down how React Server Components actually work! Learn why they're different from regular components, how the `Flight` format streams data to your browser, and why the `double data problem` matters. Plus, see which React features work server-side and which don't.

### [React Query's downsides no one talks about](https://tkdodo.eu/blog/react-query-the-bad-parts)

Everyone loves React Query, but it has trade-offs worth knowing. The file size is big, its approach can make code harder to follow, and its cache system adds complexity.

### Quick links

- [17 tips from a senior React developer](https://www.frontendjoy.com/p/17-tips-from-a-senior-react-developer)
- [We replaced our React frontend with Go and WebAssembly](https://dagger.io/blog/replaced-react-with-go)
- [React UI component libraries in 2025](https://www.builder.io/blog/react-component-library)

## Next.js

### [Vercel's Fluid Compute: Making AI apps 85% cheaper](https://www.youtube.com/watch?v=itSu3T1zJew)

Vercel's new feature packs multiple requests into single functions - cutting AI costs by up to 85%. Fluid Compute replaces Edge functions with full Node.js support while staying fast. It's the perfect middle ground between serverless and traditional servers.

### [Build a Next.js login page with session-based authentication](https://clerk.com/blog/building-a-nextjs-login-page-template)

This guide shows you how to implement session-based authentication in a Next.js application, including essential aspects such as database schema design, backend security measures (password hashing and session ID verification), and frontend user interface considerations (sign-up/sign-in forms).

### [Next.js 15's better error handling stops your site from crashing](https://devanddeliver.com/blog/frontend/next-js-15-error-handling-best-practices-for-code-and-routes)

Next.js 15 gives you better control over errors with special files - `error.tsx` for component problems, `global-error.tsx` for big issues, and `not-found.tsx` for missing pages. ErrorBoundary components keep errors contained while the useActionState hook handles server actions smoothly.

### Quick links

- [Make your Next.js Docker images tiny](https://xeiaso.net/notes/2024/small-nextjs-images/)
- [Next.js composable caching makes sites faster](https://nextjs.org/blog/composable-caching)

## Others

### [Double-keyed caching: The privacy update slowing down your site](https://addyosmani.com/blog/double-keyed-caching)

Browsers now use both URL and website to split cache storage - good for privacy, bad for speed. This security change affects CDNs, third-party resources, and shared assets. See how it impacts your site and what changes you need to make.

### [Simple tricks to make your sites work for everyone](https://martijnhols.nl/blog/accessibility-essentials-every-front-end-developer-should-know)

Stop putting accessibility last. This guide gives practical tips on using proper HTML, building forms correctly (don't rely on placeholders!), and handling focus in popups. These easy changes make your site usable for everyone while helping SEO and user experience.

## [Speed up your website with these simple tricks](https://syntax.fm/show/874/fast-apps-easy-perf-wins)

Optimize images, shrink code, and use Gzip to make your files smaller. Smart caching and CDNs help global users see your site faster. Use Chrome's tools to find what's slowing you down, and don't forget CSS tricks like putting critical styles directly in the HTML and using system fonts.

### Quick links

- [A poor Lighthouse score doesn't always mean your site is slow](https://www.debugbear.com/blog/poor-performance-score-good-performance)
- [Mistakes in the design of CSS](https://wiki.csswg.org/ideas/mistakes)

## Trending

### [5 technical JavaScript trends you need to know about in 2025](https://risingstars.js.org/2024/en)

Serverless is going mainstream with edge functions leading the way. WebAssembly is finding its place for speed-critical features. Microfrontends with Webpack Module Federation help big teams work better, while state management keeps moving toward smaller, focused solutions.

### [What 7,800+ developers say about React in 2024](https://2024.stateofreact.com)

The biggest React survey ever shows the pain points React 19 needs to fix - especially forwardRef and memo. While React itself stabilizes, the tools around it keep changing fast. TanStack Start is becoming a strong Next.js alternative with growing adoption.

### [Interop 2025 makes the web better](https://web.dev/blog/interop-2025)

`Interop` is an annual meeting where browser makers (Chrome, Safari, Firefox, Edge) agree on which web features to make work the same across all browsers. After hitting 95% compatibility in 2024, they've picked 19 new areas to fix in 2025. Top priorities include CSS Zoom standards, WebRTC security, and mobile testing.

### Quick links

- [The success of Interop 2024](https://webkit.org/blog/16413/the-success-of-interop-2024/)
- [Which rich text editor should you choose in 2025?](https://liveblocks.io/blog/which-rich-text-editor-framework-should-you-choose-in-2025)

## Tools

### [React Scan: Find slow components without changing your code](https://react-scan.com/)

React Scan spots React performance problems without adding any code. Unlike other tools that need special setup, React Scan visually shows problem components and suggests clear fixes - all through a simple, easy-to-use interface.

### [Nue: The framework that cuts JavaScript bloat](https://nuejs.org/blog/standards-first-web-framework)

Tired of complex JavaScript frameworks? Nue goes back to web basics with HTML, Markdown and modern CSS. It helps designers and developers work better together while reducing technical debt.

### [Standard Schema: The Zod alternative everyone's switching to](https://www.youtube.com/watch?v=V1vMaNVwTaI)

Zod has problems: it's slow, causes TypeScript to lag, and doesn't fully follow standards. Standard Schema fixes these issues while letting you use any validator you want. No more multiple validation libraries - just one flexible system that actually performs well.

### Quick links

- [Learn Yjs: Interactive tutorials](https://learn.yjs.dev/)
- [State management libraries in the React compiler era](https://blog.axlight.com/posts/thoughts-on-state-management-libraries-in-the-react-compiler-era/)
- [bippy: Hack into react internals](https://www.bippy.dev/)
- [CSS variables editor](https://www.cssvariables.com/)

## Commentary

- [Server-side renaissance: A year without React](https://kellysutton.com/2025/01/18/moving-on-from-react-a-year-later.html)
- [Why developers hate linters?](https://www.coderabbit.ai/blog/why-developers-hate-linters)
- [Will AI eat the browser](https://crazystupidtech.com/archive/will-ai-eat-the-browser/)
- [HTML is actually a programming language. Fight me](https://www.wired.com/story/html-is-actually-a-programming-language-fight-me/)
