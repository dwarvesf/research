---
title: Intent classification by LLM
description: User intent classification is a crucial aspect of conversational AI, start with machine learning models, but now advanced language models (LLMs) are being explored for this task. Unlike the old methods which is need to labeled datasets exhaustively, LLMs can understand what users mean without all that preparation. This memo explores the application of LLMs in intent classification, highlighting their potential to streamline the process and overcome traditional NLU limitations.
date: 2024-10-09
authors:
  - nnhuyhoang
tags:
  - intent-classification
  - llm
  - prompt
redirect:
  - /s/oPKlDg
---

User intent classification is a crucial aspect of conversational AI, start with machine learning models, but now advanced language models (LLMs) are being explored for this task. Unlike the old methods which is need to labeled datasets exhaustively, LLMs can understand what users mean without all that preparation. This memo explores the application of LLMs in intent classification, highlighting their potential to streamline the process and overcome traditional NLU limitations.

## Introduction

Intent classification is the process of determining the purpose or goal behind a user's input in a conversational AI system. There are many methods to capture it, it can be human involving, machine learning. With LLM, we take advantage of its ability to understand context and nuance, allowing it to accurately classify user intents without the need for extensive labeled data.

## Example

We have a chatbot agent for an e-commerce platform. We will use LLM to classify user intent and based on that, the agent flow will be different.

```python
prompt= """
You are an AI assistant for an e-commerce platform. Your task is to understand the user's intent and respond accordingly. The possible intents are:

1. Product Search: User is looking for a product. Return a JSON object with "intent": "product_search" and "keywords": [list of search terms].
2. Add to Cart: User wants to add a product to their cart. Return a JSON object with "intent": "add_to_cart" and "product_name": "name of the product".
3. View Cart: User wants to see what's in their cart. Return a JSON object with "intent": "view_cart".
4. Checkout: User wants to proceed to checkout. Return a JSON object with "intent": "checkout".
5. Customer Support: User has a question or issue. Return a JSON object with "intent": "customer_support" and "issue": "brief description of the issue".
6. Other: The intent doesn't fit into any of the above categories. Return a JSON object with "intent": "other" and "message": "user's message".

Respond with only the JSON object, nothing else.
"""
```

As you can see, with user input, the LLM can process a different flow which may content multiple step behind. This is a simple example, but it illustrates the potential of LLMs to understand and respond to user intents accurately and efficiently.

## Usage tips

**Don’t forget to add a fallback option**: You can see for above example, I added an "Other" intent. This is important because it allows the system to handle unexpected or unclear inputs gracefully. Fallback prompts act as a safety net to keep users engaged, even when their query isn't a clear match. They can involve clarifying questions, rephrasing the query, or offering human assistance.

**Use chain-of-thought prompting**: In some scenarios, can apply CoT for LLM to reason through the classification process. This can help improve accuracy and transparency.

Example:

- Without CoT:

```python
prompt="Classify the following user query into one of these intents: CheckBalance, Transfer, CustomerSupport, Loan, Invest"

"""
Result:
Input: I want to put $5000 into stocks. What are my options?
Intent: Invest

Input: How do I move money from my savings to my checking account?
Intent: Transfer

Input: I'm interested in growing my money. What are the current interest rates for savings accounts?
Intent: CheckBalance
"""
```

- With CoT:

```python
prompt="Classify the following user query into one of these intents: CheckBalance, Transfer, CustomerSupport, Loan, Invest. Explain your reasoning before giving the final classification."

'''
Input: I want to put $5000 into stocks. What are my options?
Reasoning:
1. The user wants to put money into stocks, which is a form of investment.
2. They're asking about options, seeking advice on investment choices.
3. This is not about checking balance, transferring money, or customer support.
4. While it involves moving money, the primary intent is to invest.
Intent: Invest

Input: How do I move money from my savings to my checking account?
Reasoning:
1. The user wants to move money between accounts.
2. This action is explicitly about transferring funds.
3. It doesn't involve checking balance, investment, or customer support.
4. The key action here is the movement of money between accounts.
Intent: Transfer

Input: I'm interested in growing my money. What are the current interest rates for savings accounts?
Reasoning:
1. The user expresses interest in growing their money, which might initially suggest Invest.
2. However, they're specifically asking about interest rates for savings accounts.
3. This isn't about checking a current balance, but rather about potential future growth.
4. It's not a transfer or a loan request.
5. While it's related to investing, savings accounts are typically considered separately from investment products.
6. The user is seeking information to make a decision, not requesting a specific action.
7. This type of inquiry often falls under general financial advice or information.
Intent: CustomerSupport
'''
```

**Use temperature settings**: Temperature is a parameter that controls the randomness of the output. A higher temperature value (e.g., 1.0) makes the output more random, while a lower temperature value (e.g., 0.2) makes the output more deterministic. This can be useful for controlling the diversity of the output.

**Leverage few-shot learning**: Instead of fine-tuning, try few-shot prompting by including labeled examples in your prompt. This can often improve accuracy without needing to retrain the model.

## Limitations

Besides the above tips, there are some limitations to consider when using LLMs for intent classification:

**Handling multiple intents**: It is easy to understand right? Too many label will make the variation of output increase. It can make model confuse when making decision.

**Hallucination**: The common problem of any LLM model, hallucination can lead to incorrect intent classifications.

**Lack of explainability**: Sometime, without CoT applied, the underlying decision-making process of LLMs is still largely a black box.

## Conclusion

Intent classification is a crucial step in building a conversational AI system. Taking advantage of LLM power, we can easy extract user intent, It support a lot in workflow of a LLM applications.

## References

- https://www.vellum.ai/blog/how-to-build-intent-detection-for-your-chatbot
- https://www.linkedin.com/pulse/leveraging-large-language-models-intent-bassel-mokabel-wj1vc/
- https://docs.voiceflow.com/docs/llm-intent-classification-method
