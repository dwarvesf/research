---
title: null
description: null
date: null
tags:
  - engineer
  - example
redirect:
  - /s/YYEuMg
---

To resolve this, I thought of using function : `export async function getServerSideProps(context)`

Use `context` variable (such as `*gin.Context` in Golang) to access property `req` (chính là http request) then extract the hostname. `const hostname = context.req.host; // vincenzo `

Hostname is a subdomain (username of user) => Use this subdomain to query the user's info and blog content => This renders the HTML format and sends back to the user.

This should work. But the problem is, if we use `getServerSideProps`, Nextjs will render our website as `server side rendering (SSR)` (render per request) => Which later affects the performance

However, switch to `Static Generation (SG)` can't resolve this since the `getStaticProps` function can on;y work during compile time, and this can't access the host name (during runtime)
