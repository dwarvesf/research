---
title: Cold start problem
description: Learn how to reduce serverless function cold start delays by keeping containers warm with scheduled requests, improving performance for faster response times and better user experience.
date: 2022-03-28
github_id: zlatanpham
redirect:
  - /s/OhwAsw
---

One of the biggest concern against Serverless Function is the problem of cold start. The first cold start happens when the first request comes in after deployment. After that request is handled, the instance stays alive to be reused by the upcoming requests. If the function, then, has not been invoked in a certain amount of time, it will change back to the cold state. In particular, the invocation steps are:

1. Get the code from persistent storage
2. Spin up the container
3. Load the package in memory
4. Run the function

The cold start time is around 0.5s to 2s but increases based on the function size (step 1 to 3). When the container is already warm, it jumps right to step 4.

**How to resolve it**

While keeping the function size small or increasing the memory could partly speed up the load time, the latency is still in complain because > 1s request cannot ensure a good user experience. One way to fix it is to make sure the container is always in "hot" state. This can be achieved by running a scheduler to send a request to reset the cycle time of the function.

#### References

- <https://dashbird.io/blog/can-we-solve-serverless-cold-starts/>
- <https://www.serverless.com/blog/keep-your-lambdas-warm/>
