---
title: Blocks
description: This article provides an overview of blocks in blockchain technology, including their structure, types, and how they work.
date: 2022-06-16
authors:
  - thanhpn
github_id: thanhpn
tags:
  - blockchain
redirect:
  - /s/9aEbjg
---

## Blocks

![](assets/blocks_lzrylgx.webp)

### 1. Define block in the blockchain

A block is thus a permanent store of records that, once written, cannot be altered or removed. A Block has a limited size and transaction to avoid All Block are verified on the blockchain by all nodes and stored on the blockchain Block data are batches of transactions with a hash of the previous block in the chain. This links blocks together (in a chain) because hashes are cryptographically derived from the block data. This prevents fraud, because one change in any block in history would invalidate all the following blocks as all subsequent hashes would change and everyone running the blockchain would notice.

![](assets/blocks_svihd1p.webp)

### 2. Block data

#### 2.1 Standard data

- Block height – The block number and length of the blockchain (in blocks) on creation of the current block.
- Timestamp – The time at which a miner mined the block.
- Transactions – The number of transactions included within the block.
- Miner – The address of the miner who mined the block.
- Reward – The amount of ETH awarded to the miner for adding the block (standard 2ETH reward + any transaction fees of transactions included in the block).
- Difficulty – The difficulty associated with mining the block.
- Size – The size of the data within the block (measured in bytes).
- Gas used – The total units of gas used by the transactions in the block.
- Gas limit – The total gas limits set by the transactions in the block.
- Extra data – Any extra data the miner has included in the block.

#### 2.2 Advanced data

- Hash - The cryptographic hash that represents the block header (the unique identifier of the block).
- Parent hash – The hash of the block that came before the current block.
- Sha3Uncles – The combined hash of all uncles for a given parent.
- StateRoot – The root hash of Merkle trie which stores the entire state of the system.
- Nonce – A value used to demonstrate proof-of-work for a block by the miner.

#### 2.3 Uncle blocks

Uncle blocks are created when two miners create blocks at near-enough the same time – only one block can be validated across the nodes. They are not included but still receive a reward for the work.

Block explorers provide information about uncle blocks like:

- An uncle block number.
- A time they occurred.
- The block height at which they were created.
- Who mined it.
- The ETH reward.

![](assets/blocks_eqhpghw.webp)

### 3. block time

Block time refers to the time it takes to mine a new block. In Ethereum, the average block time is between 12 to 14 seconds and is evaluated after each block. The expected block time is set as a constant at the protocol level and is used to protect the network's security when the miners add more computational power. The average block time gets compared with the expected block time, and if the average block time is higher, then the difficulty is decreased in the block header. If the average block time is smaller, then the difficulty in the block header will be increased.

A new block can be rejected, please be careful with the new block, You need to wait for maximum node to verify this block before use.

### 4. block size

A final important note is that blocks themselves are bounded in size. Each block has a target size of 15 million gas but the size of blocks will increase or decrease in accordance with network demands, up until the block limit of 30 million gas (2x target block size). The total amount of gas extended by all transactions in the block must be less than the block gas limit. This is important because it ensures that blocks can’t be arbitrarily large. If blocks could be arbitrarily large, then less performant full nodes would stop being able to keep up with the network due to space and speed requirements.

### 5. mining's relationship to blocks

Mining is the term used for solving the number that is the nonce, the only number that can be changed in a block header. It is also the process the cryptocurrency's network uses if proof-of-work is used in the protocol.

![](assets/blocks_qi5jtrd.png.webp)

Cryptocurrency mining is commonly thought to be a complex mathematical problem; it is actually a random number generated through hashing. Hashing is the process of encrypting information using the encryption method a cryptocurrency uses. For example, Bitcoin uses SHA256 for its encryption algorithm. For a miner to generate the "winning" number, the mining program must use SHA 256 to hash random numbers and place them into the nonce to see if it is a match.

### 6 Gas in block

Gas is used to estimate the difficulty of all transactions in the block. Every function in a smart contract or transaction on blockchain will pay gas to process. To submit a transaction and avoid miners delaying your transaction forever, you need to pay enough gas Gas = Gas used \* Gas ​​price

#### Reference

https://ethereum.org/en/developers/docs/blocks/
