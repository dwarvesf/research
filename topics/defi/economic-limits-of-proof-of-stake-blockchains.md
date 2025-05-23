---
title: Economic limits of proof of stake blockchains
description: null
date: null
redirect:
  - /s/7Zlyrg
---

In 2018's [_Cryptocurrencies Have Limits_](https://blog.dshr.org/2018/06/cryptocurrencies-have-limits.html) I discussed Eric Budish's [_The Economic Limits Of Bitcoin And The Blockchain_](http://www.nber.org/papers/w24717), an important analysis of the economics of two kinds of "51% attack" on Bitcoin and other cryptocurrencies based on "Proof-of-Work" (PoW) blockchains. Among other things, [Budish shows that](https://blog.dshr.org/2018/06/cryptocurrencies-have-limits.html), for safety, the value of transactions in a block must be low relative to the fees in the block plus the reward for mining the block. In last year's [_The Economics Of Bitcoin Transactions_](https://blog.dshr.org/2019/02/the-economics-of-bitcoin-transactions.html) I discussed Raphael Auer's [_Beyond the doomsday economics of “proof-of-work” in cryptocurrencies_](https://www.bis.org/publ/work765.pdf), in which Auer shows that:

> proof-of-work can only achieve payment security if mining income is high, but the transaction market cannot generate an adequate level of income. ... the economic design of the transaction market fails to generate high enough fees.

Follow me below the fold for a discussion of a fascinating recent paper that extends Budish's analysis.

Both Budish and Auer assumed PoW blockchains underlay the cryptocurrencies they analyzed. PoW has long been criticized for its severe environmental impacts (The [top 5 cryptocurrencies have at times been estimated to use as much energy as The Netherlands](https://www.ofnumbers.com/2018/08/26/how-much-electricity-is-consumed-by-bitcoin-bitcoin-cash-ethereum-litecoin-and-monero/)).

[![](https://1.bp.blogspot.com/-VWEbak0sYBA/WqBFYPy0yeI/AAAAAAAAES0/56dL6YIGr78f_vf5L7qE0TUCPKOhQklyACPcBGAYYCw/s200/Cohen-6.png)](https://1.bp.blogspot.com/-VWEbak0sYBA/WqBFYPy0yeI/AAAAAAAAES0/56dL6YIGr78f_vf5L7qE0TUCPKOhQklyACPcBGAYYCw/s1600/Cohen-6.png)

[Cohen's Critque](https://blog.dshr.org/2018/03/proofs-of-space.html)

In response, nearly five years ago, Ethereum (the [#2 cryptocurrency by "market cap"](https://coinmarketcap.com/)) started work on a [Proof-of-Stake (PoS) mining algorithm](https://blog.ethereum.org/2014/01/15/slasher-a-punitive-proof-of-stake-algorithm/). Technically, as Vitalik Buterin wrote, it turned out to be [non-trivial](https://blog.ethereum.org/2014/10/03/slasher-ghost-developments-proof-stake/); Ethereum still uses PoW. [Bram Cohen](https://en.wikipedia.org/wiki/Bram_Cohen), the creator of BitTorrent, included a detailed critique of PoS in an EE380 talk entitled [_Stopping grinding attacks in proofs of space_](https://www.youtube.com/watch?v=2Zlcgt8FVz4). The major problem is that, given the very high [Gini coefficients of cryptocurrencies](https://blog.dshr.org/2018/10/gini-coefficients-of-cryptocurrencies.html), PoS networks would inevitably be even more centralized than [PoW networks in practice](https://blog.dshr.org/2014/10/economies-of-scale-in-peer-to-peer.htmlhttps://blog.dshr.org/2014/10/economies-of-scale-in-peer-to-peer.html) are.

Now, via [Yves Smith](https://www.nakedcapitalism.com/2020/02/more-or-less-economic-limits-of-the-blockchain.html), we find a post entitled [_More (or less) economic limits of the blockchain_](https://voxeu.org/article/more-or-less-economic-limits-blockchain) by Prof. Joshua Gans (U. Toronto) and Prof. Neil Gandal (Tel Aviv U.) in which they summarize their paper with the same title (the most recent version of the [paper is paywalled](https://cepr.org/active/publications/discussion_papers/dp.php?dpno=14154), I am working from the earlier [open access version](https://dx.doi.org/10.2139/ssrn.3494434) at SSRN). The importance of this paper is that it extends the economic analysis of [Budish](http://www.nber.org/papers/w24717) to PoS blockchains. Their abstract reads:

> Cryptocurrencies such as Bitcoin rely on a ‘proof of work’ scheme to allow nodes in the network to ‘agree’ to append a block of transactions to the blockchain, but this scheme requires real resources (a cost) from the node. This column examines an alternative consensus mechanism in the form of proof-of-stake protocols. It finds that an economically sustainable network will involve the same cost, regardless of whether it is proof of work or proof of stake. It also suggests that permissioned networks will not be able to economise on costs relative to permissionless networks.

### Permissionless networks

Gans & Gandal's analysis of permissionless PoS blockchains asks:

> The economic question is whether PoS type systems can perform more efficiently than PoW systems.

They show,

> using the methodology for examining blockchain sustainability developed by Budish (2018), that the (perhaps) surprising answer is _no_! In the case of Permissionless blockchains (i.e. free entry,) the cost of PoW schemes are _identical_ to the cost of PoS schemes.

If PoS delivered the same functionality as PoW at the same cost, it should be preferred as lacking PoW's environmental impact. Alas, implementing a practical, attack-resistant PoS system has proven so non-trivial that it has consumed five years of work by the Ethereum team without success.

Gans & Gandal assume that PoS nodes are rational economic actors, accounting for the interest foregone by the staked cryptocurrency. As we see with [Bitcoin's Lightning Network](https://blog.dshr.org/2020/01/bitcoins-lightning-network.html), true members of the cryptocurrency cult are not concerned that the foregone interest on capital they devote to making the system work is vastly greater than the fees they receive for doing so. The reason is that, as David Gerard writes, they believe that "[number go up](https://davidgerard.co.uk/blockchain/2019/05/27/the-origin-of-number-go-up-in-bitcoin-culture/)". In other words, they are convinced that the finite supply of their favorite coin guarantees that its value will in the future "go to the moon", providing capital gains that vastly outweigh the foregone interest.

### Permissioned networks

Permissioned networks are those in which some central authority controls the set of nodes forming the network, granting or withholding permission to participate. In a footnote, Gans & Gandal correctly point out that:

> Formally, PoW and PoS  are “Sybil” control mechanisms, rather than consensus protocols. These mechanisms need to be combined with consensus protocols to make the system work. For example, in the case of Bitcoin, the longest chain in the blockchain is the consensus rule.

[Sybil attacks](https://en.wikipedia.org/wiki/Sybil_attack) involve the attacker creating enough spurious nodes to overwhelm the honest network nodes. In another footnote, they note that:

> Another class of methods is based on Byzantine Fault Tolerance. In these methods, a node is chosen at random to be a validator but a block is only considered final if a supermajority (A) other staked nodes agree that it is valid. The advantage is that the block can be relied upon without having to wait _t_ periods of time. In order to compare PoS and PoW, we do not examine this alternative in the paper.

There have been permissionless [PoS implementations using BFT](https://cdn.relayto.com/media/files/LPgoWO18TCeMIggJVakt_tendermint.pdf), but they should have examined it in the context of permissioned networks. Expending resources, whether through PoW or PoS or some other scheme to make participating in the network expensive enough to deter Sybil attacks that _could only be mounted by the central authority_ controlling the network, is pointless. Permissioned networks have no need for PoW or PoS, they can use the canonical means of establishing consensus in a fixed-size network of unreliable and potentially malign nodes, Byzantine Fault Tolerance.

### Citations

The authors cite a couple of papers I should have found earlier:

- Budish showed that Bitcoin was unsafe unless the value of transactions in a block was less than the sum of the mining reward and the fees for the transactions it contains. The mining reward is due to decrease to zero, at which point safety requires fees larger than the value of the transactions, not economically viable. In 2016 Arvind Narayanan's group at Princeton published a related instability in Carlsten _et al_'s [_On the instability of bitcoin without the block reward_](http://randomwalker.info/publications/mining_CCS.pdf). Narayanan summarized the paper in a [blog post](https://freedom-to-tinker.com/2016/10/21/bitcoin-is-unstable-without-the-block-reward/):

  > Our key insight is that with only transaction fees, the variance of the miner reward is very high due to the randomness of the block arrival time, and it becomes attractive to fork a “wealthy” block to “steal” the rewards therein.

  Note that:

  > We model transaction fees as arriving at a uniform rate. The rate is non-uniform in practice, which is an additional complication.

  The rate is _necessarily_ non-uniform, because transactions are in a blind auction for inclusion in the next block, which leads to over-payment. As [Izabella Kaminska wrote](https://ftalphaville.ft.com/2019/01/23/1548238967000/BIS-trolls-bitcoin/):

  > In the world of bitcoin, urgent transactions subsidise non-urgent transactions.
  >
  > This might be justifiable if payment urgency was somehow a reflection of status, wealth or hierarchy, but it's not. Poor people need to make urgent payments just as often as the wealthy. A payment network which depends on gouging the desperate to run efficiently, while giving free gifts to the non-desperate is no basis for a system of money.

- Evangelos Deirmentzoglou _et al_'s [_A Survey on Long-Range Attacks for Proof of Stake Protocols_](https://doi.org/10.1109/ACCESS.2019.2901858) provides a comprehensive overview of PoS. Their abstract reads:

  > Despite common arguments about the prevalence of blockchain technology, in terms of security, privacy, and immutability, in reality, several attacks can be launched against them. This paper provides a systematic literature review on long-range attacks for proof of stake protocols. If successful, these attacks may take over the main chain and partially, or even completely, rewrite the history of transactions that are stored in the blockchain. To this end, we describe how proof of stake protocols work, their fundamental properties, their drawbacks, and their attack surface. After presenting long-range attacks, we discuss possible countermeasures and their applicability.

  This paper will repay further study.

---

#### Reference

https://blog.dshr.org/2020/02/economic-limits-of-proof-of-stake.html
