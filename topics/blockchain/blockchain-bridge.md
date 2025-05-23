---
title: Blockchain bridge
description: A comprehensive guide to understanding blockchain bridges, their types, and how they facilitate communication and asset transfers between different blockchain networks.
date: 2022-06-21
authors:
  - thanhpn
github_id: thanhpn
tags:
  - blockchain
  - blockchain-bridge
  - web3
redirect:
  - /s/Ehu9iQ
---

![](assets/blockchain-bridge_blockruption-blockchain-300h.webp)

Web3 or Dapp has evolved into an ecosystem of L1 blockchains and L2 scaling solutions, each designed with unique tradeoffs and processing capabilities. As the number of blockchain protocols or applications increases rapidly, so does the need to move assets across chains. To meet this need, we need communication channels between chains that are bridges.

## What is a bridge?

Blockchain bridges work just like a physical bridge connecting two physical locations, a blockchain bridge connecting two blockchain ecosystems. Bridges facilitate communication between blockchains through the transfer of message and assets.

![](assets/blockchain-bridge.webp)

## Why do we need bridges?

All blockchains have their limits. In order for Ethereum to scale and keep up with demand, it needs to have rollouts. In addition, L1s such as Solana and Avalanche are designed differently to allow higher throughput but at the expense of decentralization.

However, all blockchains operate in an isolated environment and have different rules and consensus mechanisms. This means that they cannot communicate natively and tokens cannot move freely between blockchains (Networks can only send messages in one direction so it will not be able to talk to the other network directly). Bridges born to connect blockchains, allowing for the trustless transfer of message and tokens between them. Bridges need an authentication mechanism, so there are different types of bridges.

![](assets/blockchain-bridge_offchain-actors.webp)

## Bridge use-case?

- Transfer of assets and message across the chains
- Lower transaction fees
- Dapps on other blockchains
- Explore the blockchain ecosystem, users access new platforms and take advantage of different chains.
- Developers from different blockchain ecosystems to collaborate and build new platforms for users.
- Own natural crypto assets

![](assets/blockchain-bridge_bridge-use-cases.webp)

## How does the bridge work?

Basically a bridge works between 2 networks by listening for events arising from one network and forwarding information to the other network. So the basic problem is in the mechanism to ensure safety when forwarding information as well as message authentication and message monitoring.

### What are bridge components?

- Monitor: There is usually an actor, either a “oracle”, a “validator” or a “relayer”, that monitors the state on the source chain.
- Message Passing/Forwarding: After an agent selects an event, it needs to pass information from the source chain to the destination chain.
- Consensus: In some models, consensus is required between the parties monitoring the source chain to forward that information to the destination chain.
- Signing: Agents need to cryptographically sign, individually or as part of a threshold signature scheme, the information sent to the destination chain.

## Classification of bridges

![](assets/blockchain-bridge_classify-bridge.webp)

### External links & validators

There is usually a group of validators that monitor the "mailbox" address on the source chain, by consensus perform an action on the destination chain. Content transfer is usually done by locking the message in the mailbox and generating an equivalent message on the destination thread. These are usually bonded validators with a separate token as the security model.

![](assets/blockchain-bridge-external-links.webp)

### Lightweight client & relays

Agents monitor events on the source chain and generate cryptographic proof of past events that have been recorded on that chain. These proofs are then relayed, along with block headers, to contracts (i.e. "clients") on the target chain, which then verify that a given event was logged and executed. perform an action after that verification. There is a requirement for some actors to "forward" block headers and proofs. Although users can “self-forward” transactions, there is a realistic assumption that forwarders will continuously forward data. This is a relatively secure bridge design because it ensures trustless validating distribution without trusting intermediate entities, but it is also resource intensive because developers have to build build a new smart contract on each new destination chain that parses the proofs of state from the source chain and the confirmation itself is a lot of gas.

![](assets/blockchain-bridge_lightweight-client-&-relays.webp)

### Liquidity network

This is similar to a peer-to-peer network where each node acts as a “router” containing a “store” of assets of both the source and destination chains. These networks typically leverage the security of the underlying blockchain; Through the use of locking and contention mechanisms, users are assured that routers cannot run away with user funds. As a result, liquidity networks like Connext may be a safer option for users who are transferring large amounts of value. Furthermore, this type of bridge may be most suitable for cross-chain asset transfers because the assets provided by the router are the origin of the destination chain and not a derivative, which are not fully interchangeable.

## Depending on the design, each bridge will have its own characteristics

Security: Assumptions about reliability and viability, tolerance to malicious actors, safety of user funds, and reflectiveness.

- Speed: Latency to complete the transaction, as well as ensuring finality. There is usually a trade-off between speed and security.
- Connectivity: Choice of target chain for both users and developers, as well as different difficulty levels to integrate one more target chain.
- Efficient use of capital: Economics revolves around the capital needed to secure the system and the transaction costs to transfer assets.
- Authenticity: Ability to transfer specific assets, more complex state, and/or make cross-chain contract calls.

## Interoperability dilemma

![](assets/blockchain-bridge_interoperability-dilemma.webp)

Similar to Trilemma in terms of scalability, there exists a Trilemma of interoperability in the Ethereum ecosystem. The Interop protocol can only have two of the following three properties:

- Untrusted: has the same security as basic domains.
- Scalability: can be supported on any domain.
- Generalizability: capable of handling arbitrary cross-domain data.

## Risks of using bridge

- There is a bug in the smart contract.
- The underlying blockchain is hacked or the block is rolledback: The data of a block is preserved in one chain but cannot be changed in the other chain.
- Bridge moderators have malicious intent in a trusted bridge.
- Hacked bridge: attack via internal consensus mechanism.
- The user makes a mistake when manipulating.
- Congested or hacked chains will affect bridging.

![](assets/blockchain-bridge_lock,-mint-and-burn.webp)

One recent hack was Solana's Wormhole Bridge, where 120k wETH ($325 million USD) was stolen in the hack. And Vitalik himself must have a reputation for the lack of safety of the bridges.

- [The multiple million exploit](https://decrypt.co/76117/thorchains-rune-token-slides-following-multi-million-exploit)
- [Thorchain hacks](https://www.coindesk.com/markets/2021/07/23/blockchain-protocol-thorchain-suffers-8m-hack/).
- [The PolyNetwork hack](https://edition.cnn.com/2021/08/11/tech/crypto-hack/index.html).

## Case study

- One of our product - [icrosschain.io](https://icrosschain.io/)
- Wormhole
- Thorchain

## Reference

- https://en.wikipedia.org/wiki/Ethereum
- [What are blockchain bridges and how can we classify them?](https://blog.li.finance/what-are-blockchain-bridges-and-how-can-we-classify-them-560dc6ec05fa) Feb 18, 2021 - Arjun Chand
- [Multichain users lose (https://cryptobriefing.com/multichain-users-lose-1-4m-due-bridge-bug/).4M due to bridge bug](https://cryptobriefing.com/multichain-users-lose-1-4m-due-bridge-bug/)
- [Vitalik Buterin skeptical of cross-chain bridges](https://cryptobriefing.com/vitalik-buterin-skeptical-of-cross-chain-bridges/)
- [Latest DeFi bridge exploit results in $4.4M losses for Meter](https://cointelegraph.com/news/latest-defi-bridge-exploit-results-in-4-4m-losses-for-meter)
