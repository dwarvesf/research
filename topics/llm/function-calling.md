---
title: Function calling in AI agents
description: Function calling is a critical component in the architecture of AI agents, facilitating the integration of external functionalities and resources. This note explores how function calling is implemented in AI architectures and its role in enhancing agent capabilities
date: 2024-07-18
authors:
  - minhluuquang
tags:
  - ai
  - llm
  - function-calling
redirect:
  - /s/ZgcROQ
---

## Introduction

Function calling is a critical component in the architecture of AI agents, facilitating the integration of external functionalities and resources. This note explores how function calling is implemented in AI architectures and its role in enhancing agent capabilities.

## Overview of function calling in AI agents

Function calling in the context of ChatGPT refers to the model’s ability to call specific functions or APIs during a conversation to provide more accurate and relevant responses. This can enhance the model’s capabilities by allowing it to interact with external systems, perform computations, or retrieve up-to-date information. Function calling allows developers to more reliably get structured data back from the model

## Why function calling is important

Before function calling, there were two primary methods for enhancing the capabilities of a GPT language model:

1. **Fine-tuning:** This involves further training the model with additional example responses. While fine-tuning is effective, it demands substantial effort and cost to prepare the training data. Moreover, this feature is only available for a few older models until OpenAI activates it for GPT-3.5 and GPT-4.

2. **Embeddings:** By enriching the prompt with contextual data, embeddings can expand the model’s knowledge and improve response accuracy. However, this approach consumes many tokens, increasing costs and leaving fewer tokens available for generating complex responses.

Function calling introduces a third method to extend GPT’s capabilities. It allows the model to request the execution of functions on its behalf. The model can then use the function’s results to create a coherent, human-readable response that integrates smoothly into the ongoing conversation.

## How to use function calling in AI agents

example of how to use function calling to format the response from the model. It's important to format the response so we can pass it to another api.

```python
const gptResponse = await openai.chat.completions.create({
    model: "gpt-3.5-turbo-0613",
    messages: [
        {
            role: "user",
            content: "Call the function 'getData' and tell me the result."
        }
    ],
     functions: [
            {
                name: "getData",
                parameters: {
                    type: "object",
                    properties: {
                        name: {
                            type: "string"
                        },
                        colour: {
                            type: "string",
                            enum: ["brown", "grey", "black"]
                        },
                        age: {
                            type: "integer"
                        }
                    },
                    required: ["name", "colour", "age"]
                }
            }
        ],
    function_call: { name: "getData" }
});
```

## Conclusion

Integrating function calling into the architecture of AI agents significantly enhances their functionality and adaptability. By effectively utilizing external services, AI agents can transcend their initial limitations, providing more value and better performance in their respective applications.
