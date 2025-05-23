---
title: A grand unified theory of the AI hype cycle
description: An exploration of the cyclical nature of AI development, tracing the rise and fall of new technologies within the field, and how this pattern has repeated throughout history.
date: 2024-06-13
authors:
  - tieubao
tags:
  - ai
  - machine-learning
  - llm
redirect:
  - /s/_QMw9g
---

## The cycle

The history of AI goes in cycles, each of which looks at least a *little* bit like this:

1. Scientists do some basic research and develop a promising novel mechanism, `N`. One important detail is that `N` has a specific name; it may or may not be carried out under the general umbrella of “AI research” but it is not itself “AI”.  `N` always has a few properties, but the most common and salient one is that it *initially* tends to require about 3x the specifications of the average computer available to the market at the time; i.e., it requires three times as much RAM, CPU, and secondary storage as is shipped in the average computer.
2. Research and development efforts begin to get funded on the hypothetical potential of `N`. Because `N` is so resource intensive, this funding is used to purchase more computing capacity (RAM, CPU, storage) for the researchers, which leads to immediate results, as the technology was previously resource constrained.
3. Initial successes in the refinement of `N` hint at truly revolutionary possibilities for its deployment. These revolutionary possibilities include a dimension of cognition that has not previously been machine-automated.
4. *Leaders* in the field of this new development — specifically leaders, like lab administrators, corporate executives, and so on, as opposed to practitioners like engineers and scientists — recognize the sales potential of referring to this newly-“thinking” machine as “Artificial Intelligence”, often speculating about science-fictional levels of societal upheaval (specifically in a period of 5-20 years), now that the “hard problem” of machine cognition has been solved by `N`.
5. Other technology leaders, in related fields, also recognize the sales potential and begin adopting elements of the novel mechanism to combine with their own areas of interest, also referring to their projects as “AI” in order to access the pool of cash that has become available to that label. In the course of doing so, they incorporate `N` in increasingly unreasonable ways.
6. The scope of “AI” balloons to include pretty much all of computing technology. Some things that do not even include `N` start getting labeled this way.
7. There’s a massive economic boom within the field of “AI”, where “the field of AI” means any software development that is plausibly adjacent to `N` in any pitch deck or grant proposal.
8. Roughly 3 years pass, while those who control the flow of money gradually become skeptical of the overblown claims that recede into the indeterminate future, where `N` precipitates a robot apocalypse somewhere between 5 and 20 years away. Crucially, because of the aforementioned resource-intensiveness, the [gold owners](https://wiki.c2.com/?GoldOwner) skepticism grows *slowly* over this period, because their own personal computers or the ones they have access to do not have the requisite resources to actually run the technology in question and it is challenging for them to observe its performance directly. Public critics begin to appear.
9. Competent *practitioners* — not leaders — who have been successfully using `N` in research or industry quietly stop calling their tools “AI”, or at least stop emphasizing the “artificial intelligence” aspect of them, and start getting funding under other auspices. Whatever `N` does that *isn’t* “thinking” starts getting applied more seriously as its limitations are better understood. Users begin using more specific terms to describe the things they want, rather than calling everything “AI”.
10. Thanks to the relentless march of Moore’s law, the specs of the average computer improve. The CPU, RAM, and disk resources required to actually run the software locally come down in price, and everyone upgrades to a new computer that can actually run the new stuff.
11. The investors and grant funders update their personal computers, and they start personally running the software they’ve been investing in. Products with long development cycles are finally released to customers as well, but they are disappointing. The investors quietly get mad. They’re not going to publicly trash their own investments, but they stop loudly boosting them and they stop writing checks. They [pivot to biotech](https://en.wikipedia.org/wiki/Theranos) for a while.
12. The field of “AI” becomes increasingly desperate, as it becomes the label applied to uses of `N` which are *not* productive, since the productive uses are marketed under their application rather than their mechanism. Funders lose their patience, the polarity of the “AI” money magnet rapidly reverses. Here, the AI winter is finally upon us.
13. The remaining AI researchers who still have funding via mechanisms less vulnerable to hype, who are genuinely thinking about automating aspects of cognition rather than simply `N`, quietly move on to the next impediment to a truly thinking machine, and in the course of doing so, they discover a *new* novel mechanism, `M`. Go to step 1, with `M` as the new `N`, and our current `N` as a thing that is now “not AI”, called by its own, more precise name.

## The history

A non-exhaustive list of previous values of `N` have been:

- Neural networks and symbolic reasoning in the 1950s.
- Theorem provers in the 1960s.
- Expert systems in the 1980s.
- Fuzzy logic and hidden Markov models in the 1990s.
- Deep learning in the 2010s.

Each of these cycles has been larger and lasted longer than the last, and I want to be clear: each cycle has produced *genuinely useful technology*. It’s just that each follows the progress of a [sigmoid curve](https://en.wikipedia.org/wiki/Sigmoid_function) that everyone mistakes for an [exponential one](https://en.wikipedia.org/wiki/Exponential_growth). There is an initial burst of rapid improvement, followed by gradual improvement, followed by a plateau. Initial promises imply or even state outright “if we pour more {compute, RAM, training data, money} into this, we’ll get improvements forever!” The reality is always that these strategies inevitably have a limit, usually one that does not take too long to find.

## Where Are We Now?

So where are we in the current hype cycle?

- [Here’s a Computerphile video which explains some recent research into LLM performance](https://www.youtube.com/watch?v=dDUC-LqVrPU). I’d highly encourage you to have [a look at the paper itself](https://arxiv.org/pdf/2404.04125), particularly Figure 2, “Log-linear relationships between concept frequency and CLIP zero-shot performance”.
- [Here’s a series of posts by Simon Willison explaining the trajectory of the practicality of actually-useful LLMs on personal devices](https://simonwillison.net/series/llms-on-personal-devices/). He hasn’t written much about it recently because it is now fairly pedestrian for an AI-using software developer to have a bunch of local models, and although we haven’t quite broken through the price floor of [the gear-acquisition-syndrome prosumer market](https://www.youtube.com/watch?v=8bhsUO2D938) in terms of the requirements of doing so, we are getting close.
- The Rabbit R1 and Humane AI Pin were both released; were they disappointments to their customers and investors? I think [we all know how that went](https://techcrunch.com/2024/04/17/mkbhd-humane-ai-review-fisker/) at this point.
- I hear [Karius just raised a series C](https://www.crunchbase.com/organization/karius/company_financials), and they’re an “emerging unicorn”.
- It does appear that [we are all still resolutely calling these things “AI” for now, though](https://trends.google.com/trends/explore?date=today%205-y&geo=US&q=large%20language%20model,artificial%20intelligence&hl=en), much as I wish, as a semasiology enthusiast, that we would be more precise.

## Some qualifications

History does not repeat itself, but it does rhyme. This hype cycle is unlike any that have come before in various ways. There is more money involved now. It’s much more commercial; I had to phrase things above in very general ways because many previous hype waves have been based on research funding, some really being *exclusively* a phenomenon at one department in [DARPA](https://en.wikipedia.org/wiki/DARPA), and not, like, the [entire economy](https://www.statista.com/statistics/1446052/worldwide-spending-on-ai-by-industry/).

I cannot tell you when the current mania will end and this bubble will burst. If I could, you’d be reading this in my $100,000 per month subscribers-only trading strategy newsletter and not a public blog. What I *can* tell you is that computers cannot think, and that the problems of the current instantation of the nebulously defined field of “AI” will not all be solved within “5 to 20 years”.

---

https://blog.glyph.im/2024/05/grand-unified-ai-hype.html
