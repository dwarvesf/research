---
title: PoS
description: This article provides an overview of Proof of Stake (PoS) in blockchain technology, including its definition, how it works, and its advantages.
date: 2022-06-16
authors:
  - thanhpn
github_id: thanhpn
tags:
  - blockchain
  - foundational-topics
  - po-s
redirect:
  - /s/NKsPvQ
---

## The proof of stake

The proof of stake consensus algorithm was introduced in 2011 on the Bitcointalk forum to solve the problems of the most popular algorithm in use – Proof of Work. . While both share the same goal of achieving consensus in the blockchain, the process to achieve the goal is quite different. where the nodes of a blockchain-based network must "stake" a sum of money or tokens (proving their identity) in order to participate in the verification of transactions in a block.

Just like proof of work, proof of stake is designed to achieve distributed consensus on the valid order of transactions - i.e. reach agreement on a single shared version of history .

PoS indicates that a person can mine or confirm block transactions according to the amount of coins he or she holds. This means that the more Bitcoins or tokens owned by a miner, the more mining power will be available.

The first cryptocurrency to adopt the PoS method was Peercoin. Nxt, Blackcoin and then ShadowCoin.

![](assets/pos_jouvtnm.png.webp)

## How proof of stake works

The proof of stake algorithm uses a pseudo-random election process to select a node as the validator of the next block, based on a combination of factors that may include staking age, random and the size of the button. Users who wish to participate in this process must lock a certain number of native tokens into the network as their stake. The size of the stake determines the chance for a node to be selected as a validator to generate the next block – the larger the stake, the greater the chance. In order for the process not only to prioritize the wealthiest nodes in the network, unique methods are added to the selection process. The two most commonly used methods are 'Random Block Selection' and 'Coin Age Selection'. In the Random Block Pick method, validators are selected by looking for nodes with the combination of the lowest hash value and the highest stake, and since the stake size is public, the validator node The next real thing can usually be predicted by other nodes. The Coin Age Selection method selects nodes based on how long their coins have been staked. Coin age is calculated by multiplying the number of days the coin is held by the number of coins staked. When a node forges a block, their coin age is reset to zero and they have to wait a certain amount of time before they can generate another block – this prevents large stake nodes from dominating the blockchain.

Each native token that uses the Proof of Stake algorithm has its own set of rules and methods to create the best combination for them and their users.

When a node is selected to generate the next block, it checks if the transactions in the block are valid, signs the block, and adds it to the blockchain. The node receives the transaction fees associated with the transactions in the block.

If a node wants to stop working as a blacksmith, its staked coins along with the rewards earned are released after a certain amount of time, giving the network time to verify that no fraudulent blocks were added by that node. into the blockchain.

Proof of stake was created as an alternative to proof of work (PoW), to solve the inherent problems of computation time and energy consumption when using PoW.

PoS seeks to solve the problem by reducing mining power to the percentage of coins a miner spends to join the nodes. This way, instead of using energy to solve the PoW problem, PoS miners are limited to mining by a transaction rate that reflects the number of shares the miner owns. For example, a miner who owns 3% of Bitcoins could theoretically only mine 3% of those blocks.

#### Compare PoW and PoS

![](assets/pos_xiuwh4m.png.webp)

## About security

The stake coin acts as a financial incentive for the forging node to not validate or generate fraudulent transactions. If the network detects a fraudulent transaction, the forging node will lose part of its stake and the right to participate in future block forging. So as long as the stake is higher than the reward, validators will lose more coins than they would have gained in case of a fraud attempt.

To effectively control the network and approve fraudulent transactions, a node would have to own a majority stake in the network, this is known as a 51% attack. Depending on the value of the native token, this would be very impractical as to gain control of the network you would need to have more than 51% of the circulating supply.

In 2017, Ethereum (ETH) started its full transition from PoW to PoS system and by 2022 it has successfully deployed on Ropsten testnet.

## Advantages of PoS:

- Fast transaction processing.
- PoS does not harm the environment.
- Not vulnerable to government attacks: don't need huge amounts of electricity.
- Can be performed on smaller and weaker devices because there is no need to download the entire blockchain, and because it does not require a lot of computing power, it can be
