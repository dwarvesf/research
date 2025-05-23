---
title: History of structured outputs for LLMs
description: When Large Language Models (LLMs) becomes popular and an essential tool for growing businesses, it signals a transition toward more complex and efficient data processing. Instead of outputting raw text, the models may now generate structured data in formats such as JSON or XML. This allowed the information to be directly integrated into company databases, removing the need for human processing. Businesses can use structured outputs to streamline their data workflows, decrease processing time, and improve the accuracy and reliability of their analytics.
date: 2024-06-11
authors:
  - datnguyennnx
tags:
  - llm
  - history
redirect:
  - /s/IqootA
---

## Overview

When Large Language Models (LLMs) becomes popular and an essential tool for growing businesses, it signals a transition toward more complex and efficient data processing. Instead of outputting raw text, the models may now generate structured data in formats such as JSON or XML. This allowed the information to be directly integrated into company databases, removing the need for human processing. Businesses can use structured outputs to streamline their data workflows, decrease processing time, and improve the accuracy and reliability of their analytics.

## Why structured output is needed

[A survey of 51 industry professionals](https://arxiv.org/pdf/2404.07362v1) investigated the contexts and motivations behind limitations placed on Large Language Models. The findings identified two key constraint categories: low-level and high-level. Low-level constraints focus on technical aspects, guaranteeing the generated content adheres to a specific format and length. High-level constraints, on the other hand, address semantic and stylistic aspects, ensuring the outputs are meaningful, avoid factual errors (hallucination), and maintain a desired style. By implementing these constraints, developers can streamline the development process, improve the user experience by ensuring consistent and clear outputs, and ultimately guarantee the quality and usability of what LLMs produce.

- This consistency fosters user trust and satisfaction. Users know what to expect from the LLM, leading to a more positive experience. For example, when an LLM summarizes news articles, structured outputs guarantee all summaries follow the same format (e.g., headline, key points, source), making it easy for users to understand the information without encountering unexpected variations in layout.
- This allows for seamless integration with existing development tools. For instance, when an LLM generates product descriptions for an online store, structured outputs ensure the descriptions fit perfectly into the product database, saving developers time on reformatting.
- Structured outputs provide pre-defined formats (e.g., JSON, XML). This allows developers to leverage LLMs for automated tasks. For instance, an LLM can generate financial reports in a structured format like JSON. Developers can then directly integrate this data into existing financial dashboards.

## The first signals in the emergence of structured output

**Pre-2022:**

- **Focus on text generation:** LLMs primarily focused on generating creative text formats like poems, code, scripts etc. Structured output wasn't a major area of research at this point.

**During 2022:**

- **User workarounds:** Developers started resorting to manual parsing techniques (regular expressions, custom parsers) to extract structured information from LLM outputs. This was inefficient and limited scalability.
- **Prompt crafting:** Users experimented with crafting prompts that subtly nudged LLMs towards generating outputs with a desired structure, although success was limited.

**Late 2022/Early 2023:**

- **LangChain:** emerged as a Python library specifically designed to streamline information extraction from various sources, including LLM outputs. It provided key functionalities that laid the groundwork for structured output:
  - **Document loaders:** These loaders allowed LangChain to handle data from different sources, including LLM outputs. This was crucial for treating LLM text as a data source for structured information extraction.
  - **Parsers:** Parsers within LangChain enabled users to define how to extract the desired structured information from the unstructured LLM text. This offered a more systematic approach compared to manual parsing techniques prevalent before LangChain.

**During 2023:**

- **JSONFormer (research phase):** This approach explores a novel "structured decoding" technique for a subset of JSON schemas. While under development, it holds promise for even finer control over LLM output structure.
- **OpenAI's JSON mode:** This feature allowed users to provide a JSON schema within the prompt, essentially creating a template for LLM generation, leading to increased accuracy and consistency.
- **Kor:** This library streamlined structured output extraction by allowing users to provide both a schema and example data for the LLM. This improved the understanding of desired format and content for better-structured outputs.

**During 2024:**

- **LlamaIndex**: introduced core "structured output" features. This signified a move towards integrating structured output capabilities directly within LLMs:
  - **Function calling APIs:** Users could specify desired output formats (e.g., JSON) directly within the LLM prompt, making guidance more intuitive.
  - **Output parsers:** Parsers could be used before and after LLM calls to ensure the output adhered to the specified structure, adding control.
- **LLM-structured-output:**
  - Ensuring structured outputs adhere to specific formats. This repository provides tools and examples specifically focused on JSON schema validation.
  - By implementing an "acceptor" system, the repository verifies if the LLM's generated text conforms to a predefined JSON schema. This functionality promotes data accuracy and reliability in structured output generation, a key aspect for integrating LLMs into various applications

![Timeline of structured output library](assets/history-of-structured-output-for-llms_timelinecycle.webp)

There's been a clear progression from user workarounds and external frameworks to functionalities embedded directly within LLMs. We've seen increased control over output format, with advancements like JSON schemas and schema-example combinations. Research continues to address accuracy, flexibility, and seamless integration of structured output functionalities across LLM platforms.

## Challenge and future of structured output

Structured output strives for a balance between two seemingly opposed forces:

- **Structured data requirements:** Businesses and applications often require data in specific formats for analysis, reporting, and integration. Imagine needing financial data from an LLM report, but it comes back as a free-flowing narrative. Structured output aims to bridge this gap.
- **The creativity of LLMs:** LLMs excel at generating creative text formats. Confining them to rigid structures can stifle their potential. The ideal solution allows LLMs to adhere to a format while still retaining some flexibility in their output.

**Challenges to Overcome**

- **Accuracy:** One of the main challenges facing LLMs is ensuring consistency and without errors creation inside complex formats. These models may exhibit difficulties when dealing with complex structures or subtle data, which could result in incorrect output. For instance, early structured outputs might have produced financial reports with factual errors due to the LLM's difficulty handling specific formats.
- **Flexibility:** Balancing structure and creativity in LLM outputs is crucial. While structured data is necessary, it’s important that LLMs also creatively express information within a specified framework. Otherwise, they risk becoming rigid and robotic in their responses.
- **Integration:** Structured output functionalities currently may require external libraries or custom coding, depending on the LLM platform. Seamless integration into various platforms and applications is essential for wider adoption. Historically, structured outputs were often limited to specific LLM platforms, necessitating additional coding for use in other environments.

**The Future of Structured Output**

By addressing these challenges and continuing research, structured output has the potential to unlock exciting possibilities:

- **More accurate and flexible outputs:** LLMs will be able to generate data that adheres to complex structures while retaining some creative freedom, offering the best of both worlds.
- **Wider range of applications:** Structured output will become more accessible and integrated into various platforms, enabling applications in data analysis, report generation, form completion, and more.
- **Enhanced human-AI collaboration:** Humans and LLMs will work together more effectively to produce high-quality structured outputs. Human feedback can guide the LLM, leading to a more efficient and productive interaction.

## Reference

- https://arxiv.org/pdf/2404.07362v1
- https://github.com/langchain-ai/langchain
- https://github.com/outlines-dev/outlines
- https://github.com/1rgs/jsonformer
- https://github.com/otriscon/llm-structured-output
- https://github.com/jxnl/instructor
- https://www.youtube.com/watch?v=yj-wSRJwrrc
- https://www.timlrx.com/blog/generating-structured-output-from-llms
- https://medium.com/@kyeg/unlocking-structured-outputs-with-agents-8b5a564b5d44
