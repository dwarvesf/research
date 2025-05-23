---
title: Proximal policy optimization
description: Proximal policy optimization (PPO) is an algorithm that aims to improve the stability of training by avoiding overly large policy updates. It is a popular and effective method used for training [[Reinforcement Learning | reinforcement learning]] models in complex environments. To achieve this, PPO uses a ratio that indicates the difference between the current policy and the old policy and clips this ratio within a specific range, ensuring that the policy updates are not too large and the training process is more stable...
date: 2024-07-03
authors:
  - thanhpn
tags:
  - ai
  - reinforcement-learning
  - llm
redirect:
  - /s/9vyVyg
---

## Introduction

Proximal policy optimization (PPO) is an algorithm that aims to improve the stability of training by avoiding overly large policy updates. It is a popular and effective method used for training [[Reinforcement Learning | reinforcement learning]] models in complex environments. To achieve this, PPO uses a ratio that indicates the difference between the current policy and the old policy and clips this ratio within a specific range, ensuring that the policy updates are not too large and the training process is more stable.

## How does PPO work?

PPO uses the gradient ascent method to search for the optimal policy, but it applies constraints on policy changes by limiting the distance (clipping) between the old policy and the new policy. This helps control the policy update process to avoid excessive changes while ensuring stability and effectiveness in learning.

There are two approaches to accomplish this:

- _TRPO (Trust Region Policy Optimization)_ is complex to implement and computationally expensive. It uses outer KL-divergence constraints on the objective function to limit policy updates.
- _PPO's Clipped Surrogate Objective_ substitutes the KL-divergence constraints with its own clipped objective function.

## How to apply PPO for training large language models?

Large language models are trained with billions of parameters and produce impressive results. However, during actual operation, these models may introduce errors and inaccurate outputs. To address this, experts have applied reinforcement learning to improve the quality. PPO is used to fine-tune the models based on curated prompts and enhance the performance to provide more user-friendly responses. It was use in step 3 when we trained the RL model.

In this context, the policy refers to the pre-trained Language Model (LLM) that is being fine-tuned. We construct both the policy function and the value function.

- The policy function is responsible for generating sentences in a specific prompt. It can be a large language model
- The value function is The scalar value obtained from the reward function. It measures the expected value of an input (prompt) or a state-action pair and is used to estimate the advantage of action during policy updates.

To apply the PPO algorithm for language model training, the training process typically involves the following steps:

- Data Sampling: Use the current model to generate responses and collect training data.
- Model Update: Apply the PPO algorithm to update the model parameters based on the collected training data.
- Model Evaluation: Evaluate the model's performance by calculating metrics such as accuracy, perplexity, or similar evaluation measures.

## Comparing PPO with other algorithms

- _RAFT Alignment_: It is a method in transfer learning that leverages knowledge learned from a source task to a related target task. It allows reusing learned knowledge from the source model to quickly achieve high performance on the target task without retraining from scratch.
- _TRPO_: It utilizes an optimization mechanism that ensures gradual policy changes and restricts policy updates within a trust region. It guarantees that policy updates do not cause significant changes and instability. TRPO is a powerful algorithm but has complex computations and longer training times. In contrast, PPO is a simpler, more efficient, and stable algorithm.
- _PPO2_: It is simply an updated version of the algorithm released by OpenAI. PPO2 is an implementation optimized for GPU-accelerated vectorized environments and provides better support for parallel training. While it has some differences (e.g., automatically normalized advantages and clipped value functions), it uses the same mathematical framework as described in this article. If you plan to use the OpenAI implementation directly, keep in mind that PPO is outdated, and you should use PPO2 instead.

To summarize, PPO has quickly gained popularity in continuous control problems. It seems to strike a suitable balance between speed, caution, and usability. While lacking theoretical guarantees and mathematical intricacies like natural gradients and TRPO, PPO tends to converge faster and perform better compared to its competing counterparts.

## References

- https://towardsdatascience.com/proximal-policy-optimization-ppo-explained-abed1952457b
- https://medium.com/@mlblogging.k/reinforcement-learning-for-tuning-language-models-how-chatgpt-is-trained-9ecf23518302
- https://openai.com/research/learning-to-summarize-with-human-feedback
