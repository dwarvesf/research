---
title: "LLM's accuracy - self refinement"
description: An overview of self-refinement, a technique where Large Language Models (LLMs) evaluate and improve their own output without the need for supervised data or reinforcement learning.
date: 2023-06-29
authors:
  - zlatanpham
tags:
  - ai
  - llm
  - prompt
redirect:
  - /s/edkf4Q
---

Self-refinement is a technique where the model evaluates and refines its own output. Normally, when using an LLM, you provide a prompt and the model generates a completion. With self-refinement, you can instruct the model to review the content it has generated, score it, and refine the output. This process can be repeated multiple times, allowing the model to iteratively improve its own output.

For instance, if the model is asked to write a tweet, it can then be prompted to make the tweet more engaging, rate its quality, and refine it accordingly.

![](assets/llms-accuracy---self-refinement_llm-self-refinement-step-1.webp)

![](assets/llms-accuracy---self-refinement_llm-self-refinement-step-2.webp)

![](assets/llms-accuracy---self-refinement_llm-self-refinement-step-3.webp)

Notably, this technique does not require supervised data or reinforcement learning. The model's ability to self-evaluate and refine its output is inherent, making this a powerful and efficient method for improving LLM's accuracy.

Key Points:

- Self-refinement involves the model reviewing, scoring, and refining its own output.
- The technique has been effective, especially for models like GPT-4.
- It outperforms baselines in many use cases without the need for supervised data or reinforcement learning.
