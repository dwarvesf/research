---
title: § Building LLM system
description: This map of content (MoC) outlines the critical components required to design and build a large language model (LLM) system, focusing on architecture, model customization, safeguarding, performance evaluation, and more.
date: 2024-09-11
authors:
  - zlatanpham
tags:
  - llm
  - moc
redirect:
  - /s/_mxILQ
---

In recent years, the emergence of large language models (LLMs) has revolutionized AI applications, providing new opportunities for solving complex problems with natural language understanding and generation. This map of content explores the foundational aspects of building robust LLM-based systems, ranging from model selection and context enhancement to safeguarding mechanisms and performance evaluation.

## Overview

The rise of AI applications, especially LLMs, has unlocked diverse use cases across industries like customer support, content generation, and programming assistance. Building a scalable LLM system requires not only choosing the right model but also following architecture best practices and integrating a robust tech stack.

- [The rise of AI applications with LLM](the-rise-of-ai-applications-with-llm.md)
- [Use cases](use-cases-for-llm-applications.md)
- Architecture and stack

## Model select and customization

Selecting and customizing the right LLM is critical for addressing specific business needs, balancing between performance and cost.

- [Choose the right model](model-selection.md)
- Fine-tuning
- Prompt engineering

## Context enhancement

Methods for augmenting query context to improve model performance and accuracy.

- Retrieval-augmented generation (RAG)
- [RAG for multimodal data](multimodal-in-rag.md)
- Agentic RAG
- Query rewriting

## Management output structure

Standardizing and managing the output of an LLM system ensures that responses are structured and actionable.

- Output formatting
- Schema enforcement
- Chaining model outputs

## Safeguarding

Systems to prevent model misuse, sensitive data leaks, and bad outputs.

- [Guardrails in LLM](guardrails-in-llm.md)

## Model routing and gateway

Managing multiple models and securing access to them through a unified system.

- [Intent classifiers](intent-classification-by-llm.md)
- Model gateways
- Next-action prediction

## Caching for latency optimization

Using caching techniques to reduce latency and costs in generative AI applications.

- Prompt cache
- Exact cache
- Semantic cache

## Complex logic and write actions

LLM systems need to handle complex reasoning, task delegation, and actions based on AI output.

- Conditional logic and task iteration
- Write actions
- [Prevent prompt injection](prevent-prompt-injection.md)
- [Supervior-worker architecture (divide and conquer)](multi-agent-collaboration-for-task-completion.md)
- [ReAct](react-in-llm.md)
- [ReWOO (reasoning without observations)](rewoo-in-llm.md)

## Evaluating performance

Using right metrics and method for specific use case in LLM.

- [Evaluation metrics](evaluation-guideline-for-llm-application.md)
- [AI-as-a-judge](llm-as-a-judge.md)

## Observability and orchestration

Monitoring the system's performance and orchestrating the complex AI workflows that tie the components together.

- [Observability in AI platforms](observability-in-ai-platforms.md)
- AI pipeline orchestration
