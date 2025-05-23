---
title: Federated Byzantine
description: "Learn how Stellar's consensus protocol uses trusted validators and quorum slices to prevent Sybil attacks and ensure secure, reliable transactions through federated voting and network trust."
date: 2019-05-18
tags:
  - blockchain
  - distributed
redirect:
  - /s/805Dmw
---

Stellar is all about trust (validators). After all, when you have to trust somebody, you'd trust the reputated nodes, rather than a random stranger node on the internet.

You can imagine Quorum as a list of validators. Every Stellar node has its chosen validators in its own Quorum. For new nodes (e.g. by domestic users like me), we tend to choose the official/reputated nodes (e.g. nodes at SDF/IBM) to trust / to be the validators in our Quorum. You may imagine that these reputated nodes are like the media, newspaper or a TV channel. We ingest information from these generally trusted sources.

But it is not working the same the other way around. SDF and IBM nodes have their established Quorum. Logically, these reputated nodes only have other reputated nodes as validators, and it is rational to say they do not include "our domestic nodes" in their Quorum. Big brothers trust only other big brothers, rather than random guys on the internet like me.

Suppose we have this transaction: A sends B $100.

Sybil attacks are done by setting up many many nodes in view of taking over the majority vote. Yes, you may set up 1,000,000 nodes, and these many many fake nodes broadcast the false info "A sends B $44". But the reputated nodes do not have any of these 1,000,000 malicious nodes as validators, so the false info does not affect the big brothers. Also, for small domestic nodes, we depend mostly on the big brothers. Therefore, Sybil attacks do nothing to the non-malicious nodes.

Only 2 scenarios the network could go wrong: (1) hack enough big brothers and make them broadcast the desired false information; (2) many of the big brothers are colluding.

Yes, the big brothers are forming a small circle. But Stellar is all about trust. After all, when you have to trust somebody, you'd trust the big brothers, rather than a random stranger node on the internet.

<https://stellar.stackexchange.com/questions/160/how-does-the-stellar-consensus-protocol-prevent-sybil-attacks?rq=1>

## Theoretical explanation (with illustration)

**[Understanding the Stellar Consensus Protocol](https://medium.com/interstellar/understanding-the-stellar-consensus-protocol-423409aad32e)**

Nodes conduct rounds of federated voting on “nominees.” A round of federated voting means:
• A node casts a vote for some statement, such as “I nominate value V”;
• The node listens to votes from its peers until it finds one it can “accept”;
• The node seeks a “quorum” that also accepts the statement. This “confirms” the statement.

As soon as a node can confirm one or more nominees, it starts trying to “prepare” a “ballot” via more rounds of federated voting.

As soon as a node can verify that a ballot is prepared, it starts trying to “commit” the ballot via still more rounds of federated voting.

Once a node can confirm that a ballot is committed, it can “externalize” the value in that ballot, using it as the outcome of consensus.

## The Byzantine generals problem

- [Understanding the Byzantines general problems](https://medium.com/coinmonks/a-note-from-anthony-if-you-havent-already-please-read-the-article-gaining-clarity-on-key-787989107969)
- [Origin paper](https://people.eecs.berkeley.edu/~luca/cs174/byzantine.pdf)

→ How do you make sure that multiple entities, which are separated by distance, are in absolute full agreement before an action is taken?

In other words, how can individual parties find a way to guarantee full consensus?

Two open problems in Stellar are the mechanism by which quorums are chosen (peer selection) and how new arguments may be proposed such that contention is low (i.e. avoid dueling proposers).

and

Stellar consensus can be extremely inefficient in terms of number of messages sent, especially with dueling proposers.

## References

- [https://www.stellar.org/developers/guides/](https://www.stellar.org/developers/guides/)
- [https://www.stellar.org/papers/stellar-consensus-protocol.pdf](https://www.stellar.org/papers/stellar-consensus-protocol.pdf)
- [https://www.reddit.com/r/Stellar/comments/7omagn/does_anyone_have_realworld_examples_of_how/](https://www.reddit.com/r/Stellar/comments/7omagn/does_anyone_have_realworld_examples_of_how/)
- [https://www.stellar.org/stories/adventures-in-galactic-consensus-chapter-1/](https://www.stellar.org/stories/adventures-in-galactic-consensus-chapter-1/)
- Okay, one more resource for you! I think it's somewhere between the comic and the white paper, but closer to the white paper. [https://medium.com/a-stellar-journey/on-worldwide-consensus-359e9eb3e949](https://medium.com/a-stellar-journey/on-worldwide-consensus-359e9eb3e949)
