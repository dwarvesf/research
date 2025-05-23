---
title: Plonky2
description: "Plonky2 is a non-Interactive Proof of Proof of Knowledge (NIPoPoK) chain that reduces blockchain size and speeds up transaction confirmations. This article explores Plonky2's technology, its applications in various blockchain projects, and compares it with other scaling solutions."
date: 2023-02-28
authors:
  - thanhpn
github_id: thanhpn
tags:
  - blockchain
  - proof-of-knowledge
redirect:
  - /s/7UyHqQ
---

## Introduction

![](assets/plonky2_plonky-2-website.webp) Plonky2 is a non-Interactive Proof of Proof of Knowledge (NIPoPoK) chain developed to reduce the size of the blockchain and speed up transaction confirmations. It is built on the foundation of ZK-SNARKs (Zero-Knowledge Succinct Non-Interactive Argument of Knowledge), an advanced cryptographic technology that enables affirmative proofs without revealing inside information. Plonky2 allows transactions to be confirmed on the fly using certificates similar to Merkle trees, where only a small portion of data is needed to confirm the entire Merkle tree. Plonky2 certificates are very small, only about 1/20th of similar attestations used in traditional blockchain systems, thus helping to reduce blockchain size and speed up transaction processing. Plonky2 is being used in several blockchain projects such as Ethereum and Polkadot to improve the performance and scalability of the system.

## The target of Plonky2

Blockchain is a decentralized information storage and conversion technology that allows parties to exchange information and transact directly with each other without the involvement of an intermediary. Transactions are confirmed and written to a new block in the blockchain, forming a reliable and unmodifiable history of transactions. An important issue of blockchain is its size. Since each new block added to the blockchain must be stored and backed up across the entire network, the size of the blockchain increases over time. This leads to problems with transaction processing speed, scalability, and storage costs.

Some blockchains like Bitcoin use Proof of Work (PoW) to verify new transactions and generate new blocks. However, the use of PoW requires huge computation and high energy usage, negatively affects the environment and is costly. So many new technologies have been developed to solve the blockchain size problem, speed up transaction processing and reduce storage costs. Plonky2 is one of those new technologies, with the ability to reduce blockchain size significantly using non-interactive attestation (NIPoPoK) and Merkle tree structure.

Plonky2 is a new technology in the blockchain field, developed to reduce blockchain size and speed up transaction confirmation by using non-interactive attestation (NIPoPoK) and Merkle tree structure. NIPoPoK is a method of building attestations for blocks in the blockchain without downloading the entire blockchain, requiring only a small number of blocks (usually only about 1% of the total block) called "superblocks". With NIPoPoK, confirmation of new transactions becomes faster and requires less resources than confirmations on the entire blockchain.

The Merkle tree is a layered data structure that allows for fast and efficient data integrity checking. Using the Merkle tree structure in Plonky2, the blocks of the blockchain can be grouped into smaller "superblocks", which reduces the blockchain size significantly. The use of Plonky2 in the blockchain will help speed up transaction confirmations and reduce blockchain size, while reducing storage costs and increasing the scalability of the system. Plonky2 has been used in many blockchain projects, such as Ethereum and Bitcoin Cash.

## How Plonky2 work

Non-Interactive attestation (NIPoPoK) is a method of attesting in the blockchain without interacting with other entities in the system. Instead of downloading the entire blockchain to confirm a block, NIPoPoK requires only a small number of blocks (usually only about 1% of the total block) called "superblocks" to verify the validity of a new block. The main difference between NIPoPoK and interactive attestation (PoK) is that PoK requires interaction between entities in the system for authentication. This means that entities must exchange information with each other to perform authentication. Meanwhile, NIPoPoK does not require interaction between entities, which minimizes communication and synchronization in the system. The other difference between NIPoPoK and PoK is that PoK typically uses more complex protocols for authentication, while NIPoPoK uses simpler maths to compute authentication. However, this does not mean that NIPoPoK is less secure, because NIPoPoK uses the latest techniques to ensure the safety and security of data. With the development of technology, NIPoPoK is being widely used in blockchain to minimize the interaction and synchronization in the system, while helping to speed up transaction confirmation and reduce blockchain size.

Merkle tree is a binary tree data structure used to store data and perform data integrity validation efficiently. Merkle trees are widely used in blockchain systems to minimize data size and speed up transaction integrity validation. Merkle tree is created by breaking data into smaller elements, called leaf nodes, then creating pairs of these leaves and hashing them together to form new nodes, until there are only leaves left. a single node at the top of the tree, called the root node. When there is a change in the data, simply recalculate the hash of the affected nodes and the root node will change, helping to verify the integrity of the data quickly and efficiently.

Plonky2 uses a Merkle tree to verify transaction integrity. Instead of validating the entire blockchain like other methods, Plonky2 simply uses a small number of blocks (superblocks) created by the Merkle tree to verify the validity of a new transaction. Since then, Plonky2 reduces the size of data to be processed and speeds up transaction validation significantly. Merkle tree is used to generate superblocks, where each superblock is created by taking root nodes of Merkle trees for a certain period of time. Superblocks are stored in a linked list, and Plonky2 uses this list to verify the integrity of the new transaction. If a transaction is invalid, Plonky2 will re-query the superblock to find the invalid transaction and thereby confirm the integrity of the system.

## Application of Plonky2

### Blockchain projects using Plonky2 and how Plonky2 improves system performance and scalability:

- Mina Protocol: This is currently the smallest blockchain with a size of only about 22KB, using Plonky2 to reduce the size of the blockchain and increase transaction processing speed.
- Coda Protocol: Similar to Mina Protocol, Coda Protocol uses Plonky2 to reduce the size of the blockchain and increase transaction processing speed.
- Manta Network: Manta Network is a decentralized finance (DeFi) platform on the Polkadot network, using Plonky2 to reduce the size of the blockchain and increase transaction processing speed.
- Ergo: Ergo is a new decentralized blockchain, using Plonky2 to reduce the size of the blockchain and increase transaction processing speed.

### Example for using Plonky2

An example of the use of Plonky2 is in the blockchain system of rewards points for loyalty programs. This system uses Plonky2 to reduce the size of the blockchain and speed up transaction processing.

In this system, each time a customer makes a purchase or uses the company's service, they will be allocated a number of reward points corresponding to the amount spent. These reward points are recorded on the blockchain and can be used in exchange for other products or services of the company. However, because the number of customers and the number of transactions in the system can be very large, recording every transaction on the blockchain can lead to the blockchain being too large and the transaction processing slow.

To solve this problem, the system uses Plonky2 to reduce the size of the blockchain. Instead of recording every transaction on the blockchain, the system only stores the transaction summary (transaction summary) as a Merkle tree. Plonky2 is used to confirm these transaction summaries and prove that all the transactions that have been performed are valid. As a result, this reward points blockchain system can process thousands of transactions per second, and the blockchain size increases only slightly if the number of customers and transactions increases.

## Challenge of Plonky2

### Safety and security issues when using Plonky2

![](assets/plonky2_tradeoffs.webp)

During authentication, Plonky2 asks the nodes to specify a specific number of Merkle tree elements. However, if a node sends incorrect elements or changes the Merkle tree, it can cause validation errors and affect the integrity of the blockchain. Therefore, ensuring the correctness of the Merkle tree is very important.

In addition, Plonky2 also depends on the security of the hash system and the elliptic curve. If one of these factors is broken, then the authentication will not be secure and lead to security problems. Another problem for Plonky2 is a preimage attack, where an attacker uses previously known information to find secret hashes. If attacked, Plonky2 will no longer guarantee the integrity of the data. Therefore, when using Plonky2, developers need to pay attention to security and safety issues to ensure the integrity and security of the blockchain system.

### Challenges in implementing and using Plonky2 on different blockchain systems

- Plonky2 Complexity: Plonky2 is a new technology and its complexity can make it difficult to deploy on different blockchain systems.
- Compatibility: Some blockchain systems have separate processes and features, so integrating Plonky2 into these systems can be difficult.
- Reliability and security: Deploying Plonky2 requires the reliability and security of the software, and a security incident can lead to the loss of assets and currency.
- Processing speed: Plonky2 can help speed up transaction processing, but implementation on different blockchain systems may require time and effort to optimize performance.
- Scalability: Plonky2 is a highly scalable technology, but deployment on different blockchain systems may require different configurations and management to achieve maximum scalability. .

## Compare Plonky 2 with others

- Lightning Network: Lightning Network is a technology developed on the Bitcoin platform to reduce the cost and time of transaction processing. Lightning Network uses an offline payment channel to minimize communication between network nodes and speed up transaction processing. However, Lightning Network does not solve the blockchain size problem like Plonky2.
- Sharding: Sharding is a method of distributing data across many different nodes to reduce the load on each node and increase transaction processing speed. However, Sharding also faces many challenges in terms of security and compatibility with other systems.
- Sidechain: Sidechain is a technology that allows the creation of sub-blockchains to process different transactions. These sub-blockchains are linked to the main blockchain and can offload the main blockchain. However, linking between the secondary blockchains and the main blockchain can cause some security issues.

### Comparison between Plonky2 and other technologies in improving the performance and scalability of the blockchain system:

- Plonky2 vs. SegWit: SegWit (Segregated Witness) is a solution used on the Bitcoin network to reduce transaction size and increase processing speed. However, SegWit cannot solve the problems related to network scalability. Meanwhile, Plonky2 uses a number of different techniques such as Merkle tree and non-interactive attestation to reduce blockchain size and speed up transaction processing, while improving the scalability of the system.
- Plonky2 vs. Lightning Network: Lightning Network is a technology used to reduce costs and speed up transaction processing on the Bitcoin network. However, Lightning Network cannot solve the problem of network scalability. Meanwhile, Plonky2 reduces the blockchain size and increases transaction processing speed without compromising the safety and security of the system, while improving the scalability of the network.
- Plonky2 vs. Sharding: Sharding is a solution used to improve the scalability of the blockchain system by dividing the blockchain into parts and processing them independently. However, Sharding has limitations on the safety and security of the system. Meanwhile, Plonky2 helps to reduce blockchain size and speed up transaction processing without affecting the safety and security of the system.
- Plonky2 vs. Plasma: Plasma is a solution used to improve Ethereum's scalability by layering and processing transactions on sidechains.

## Reference

- https://polygon.technology/blog/plonky2-a-deep-dive
- https://github.com/mir-protocol/plonky2
- https://hackernoon.com/zero-knowledge-proof-algorithm-plonk-circuit-sin7y-tech-review-16
- https://vitalik.ca/general/2019/09/22/plonk.html
- https://zkresear.ch/t/composition-of-proof-systems/43
