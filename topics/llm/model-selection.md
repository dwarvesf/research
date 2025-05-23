---
title: Model selection
description: Learn how to choose the right AI model for your needs. Explore key factors like accuracy, privacy, and cost. Compare commercial vs open-source options and API vs self-hosting approaches.
date: 2024-10-15
authors:
  - zlatanpham
tags:
  - ai
  - llm
redirect:
  - /s/EhpxOg
---

Choosing the right model isn’t about finding a one-size-fits-all solution; it’s about understanding what works best for your specific needs. Each model comes with its own set of strengths and trade-offs, so the key is identifying what truly matters for your application. Start by setting clear priorities, and let those guide your selection process.

## A practical approach to model selection

When evaluating different models, it helps to break them down into two types of attributes—**hard** and **soft**. Hard attributes are the non-negotiables, the aspects of a model that you can’t easily change. Soft attributes, on the other hand, are areas you can work on to improve over time.

- **Hard attributes**: These are fixed, like licensing, the data used during training, or strict privacy requirements.
- **Soft attributes**: These are elements you can tweak, such as accuracy, speed, or reliability.

Whether something is hard or soft depends on how you're using the model. For example, if you’re relying on a third-party API, things like latency might be non-negotiable, but if you're hosting it yourself, you might have more room to optimize performance.

To streamline your model selection, here are two simple rules to follow:

1. **Start by filtering models based on hard attributes**: Get rid of any models that don’t meet your must-haves, like specific licensing requirements or privacy controls. Once you’ve narrowed things down, focus on the cost of improving any soft attributes that matter for your use case.
2. **Accuracy comes first**: After narrowing your options, choose the models with the best accuracy. Accuracy should be your top priority because it’s easier to work on other factors like speed or reliability once you’ve nailed down a model that delivers the right results.

## Assessing model attributes

### The role of benchmarks

Benchmarks can be a good starting point for comparing models, but they’re not the whole story. They can sometimes feel like a bit of a contest, with companies trying to outdo each other in specific areas like coding or reasoning. While helpful, they only give you a snapshot of a model's abilities.

**One size doesn’t fit all**

If you’re relying on just one set of benchmarks, you might end up with a skewed view of a model’s strengths. For instance, if your users need support for multiple languages or you work in specific domains, you’ll want to look for benchmarks that test those capabilities. A high score in one area doesn’t guarantee success across the board, so it’s better to compare models using multiple benchmarks that reflect your unique needs.

**Watch out for data contamination**

Another thing to keep in mind with benchmarks is data contamination—this happens when a model is tested on data it’s already seen during training. It’s like someone memorizing the answers to a test: they might ace the exam, but it doesn’t mean they really understand the material. A model that scores high on a popular benchmark might not perform as well when you put it to work in real-world situations that fall outside of its training data.

### Commercial vs. open-source models

If you’re not building your own model from scratch (and let’s be honest, most companies aren’t), you’ll need to decide between using a commercial model or hosting an open-source one. Here’s how the options break down:

1. **Closed-source models**: Proprietary models like OpenAI’s or Anthropic’s, which you can access through their APIs.
2. **Open-weight models**: These allow you to host the model yourself and potentially fine-tune it to suit your needs. Examples include Llama and Mistral.
3. **Open-source models**: Fully open models, meaning both the code and training data are available. However, true open-source models are hard to come by, mainly because of the legal risks involved with using public data.

**Licensing** is a big deal here. Even models that are labeled as "open" might come with licensing restrictions. For example, OpenAI places limits on how GPT’s outputs can be used to train competing models, and [Meta’s Llama 2](https://github.com/meta-llama/llama/blob/main/LICENSE#L65-L71) has specific rules if you’re working with a large user base.

### Model APIs vs. self-hosting

Once you’ve chosen a model, the next decision is whether to host it yourself or use an API. Your choice depends on several factors, including **data privacy, performance, features, cost, and control**.

**1. Data privacy**

If privacy is at the top of your priority list, using a third-party API might not be the best fit. Some providers collect data to improve their models, and even if they claim otherwise, there’s no way to be completely certain.

**2. Performance**

Open-source models have made huge strides, but if you’re after top-notch performance, proprietary models like GPT-4 and Claude-3 are still ahead in most areas. That said, not every task requires cutting-edge performance. For more straightforward needs, a lighter open-source model could be more practical and cost-effective.

**3. Features**

Certain use cases may require specialized features only available through specific providers, like:

- Generating structured outputs (such as valid JSON)
- Moderation tools to filter out inappropriate content
- Performance-enhancing features like batching and caching

**4. Cost**

APIs are easy to use, but they can get pricey as you scale. On the other hand, self-hosting brings its own expenses—like the engineering work required to manage and optimize the system.

**5. Control**

Using an API means you’re at the mercy of the provider’s limitations. They might restrict certain types of requests, like those related to sensitive topics. If your use case requires more flexibility, self-hosting gives you the control you need.

## Conclusion

Picking the right model is about balancing your priorities—whether it's privacy, performance, cost, or control. By defining your must-haves and running tests in real-world scenarios, you can find a model that fits not only today’s needs but also grows with you over time. Whether you go with a commercial API or decide to self-host an open model, staying adaptable and keeping an eye on performance will help you make the best choice for your project’s future.

## References

- https://huggingface.co/docs/leaderboards/open_llm_leaderboard/about
- [AI engineering by Huyen Chip](https://www.oreilly.com/library/view/ai-engineering/9781098166298/)
- https://www.quickchat.ai/post/llm-benchmarks-what-are-they-and-can-you-trust-them
