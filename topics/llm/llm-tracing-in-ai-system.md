---
title: LLM tracing in AI system
description: Understanding LLM Tracing - Principles, Techniques, and Applications in building LLM-powered AI systems.
date: 2024-09-11
authors:
  - tienan92it
tags:
  - ai
  - llm
  - tool
redirect:
  - /s/iyK9mg
---

## When

Building software with Large Language Models (LLMs) involves several steps, from planning to deployment. LLM tracing emerges as a final step in this process, providing ongoing insights and enabling continuous improvement of LLM-powered applications.

![](assets/llm-tracing-build-steps.webp)

## Why

Before diving into tracing, it's important to understand the fundamental difference between traditional software and LLM-powered applications:

- **Traditional software**: Deterministic, based on explicit instructions written by programmers.
- **With LLMs**: Probabilistic, based on neural networks with weights determined through training.

![](assets/llm-tracing-architecture.webp)

Why LLM Tracing is Necessary:

1. **Unpredictable outputs**: LLMs can produce different outputs for the same input due to their probabilistic nature.
2. **Black box nature**: The decision-making process of an LLM is opaque.
3. **Complex interactions**: LLMs often interact with multiple components (e.g., retrieval systems, filters, classifiers, external APIs) in ways that aren't immediately obvious.
4. **Performance variability**: Performance can vary significantly based on input complexity, model size, and hardware.
5. **Evolving behavior**: LLMs can exhibit evolving behavior through fine-tuning or in response to different prompts.
6. **Error diagnosis**: "Errors" in LLMs might be subtle, like hallucinations or biased responses.
7. **Continuous improvement**: LLMs can be improved through better prompts, fine-tuning, or model updates.

## Key metrics

| **Basic**                                                                            | **Evaluating**                                                                                         |
| ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------ |
| Latency<br>Throughput<br>Error Rate<br>Resource Utilization<br>Execution Time<br>... | Factual Accuracy<br>Relevance<br>Bias Detection and Fairness<br>Hallucination Rate<br>Coherence<br>... |

While basic metrics like latency and throughput measure operational performance, evaluative metrics dig deeper into the actual output and behavior of the LLM.

## Tools

Some popular tools that support various aspects of LLM tracing:

- [LangSmith](https://docs.smith.langchain.com/)
- [Phoenix (by Arize)](https://arize.com/)
- [TraceLoop](https://arize.com/)
- [OpenTelemetry](https://opentelemetry.io/blog/2024/llm-observability/)
- [Portkey](https://portkey.ai/)

## References

- https://colab.research.google.com/github/Arize-ai/phoenix/blob/main/tutorials/llm_ops_overview.ipynb
- https://arize.com/blog-course/llm-evaluation-the-definitive-guide/
- https://docs.smith.langchain.com/how_to_guides/tracing
- https://karpathy.medium.com/software-2-0-a64152b37c35
- Demo: https://colab.research.google.com/gist/tienan92it/490dd65748518a9abc73cdf4bd84583d/welcome-to-colab.ipynb
