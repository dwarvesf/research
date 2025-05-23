---
title: Implement a token swap from the Base chain to Bitcoin for cross-chain transactions
description: This guide shows how to implement a token swap from the Base Chain to Bitcoin.
date: 2025-03-07
authors:
  - lmquang
tags:
  - blockchain
  - btc
  - icy
  - swap
redirect:
  - /s/kMVrBQ
---

Swapping ICY tokens for Bitcoin means exchanging one type of digital currency for another across different blockchain systems. Since ICY tokens (on the Base chain) and Bitcoin (on its own blockchain) operate on incompatible networks, specific tools are needed to make this process work. Below, I’ll explain the tools, why a direct swap isn’t possible, how the swap happens, and how the price is determined.

## Tools used in the swap

Swap Contracts: Automated programs on the Base chain that securely manage the swap process.
Treasury Wallets: Digital wallets that hold ICY tokens and Bitcoin during the exchange.
Icy-Backend: A system that receives your swap request, tracks it, and triggers the Bitcoin transfer.

## Why it’s not a direct swap

A direct swap isn’t possible because ICY tokens and Bitcoin use different blockchains. The Base chain is a modern system with advanced features, while Bitcoin’s blockchain is older and more limited. These differences prevent direct transfers, so tools like swap contracts and oracles are used to bridge the gap.

## How the swap works

Swapping ICY tokens for Bitcoin is a straightforward process that combines user actions, system automation, and secure on-chain technology. Here’s how it works in a concise, step-by-step breakdown:

**Initiate the Swap**

You start by clicking "Swap" on the website. Enter the amount of ICY you want to trade and your Bitcoin address. The system saves your request by listen emitted events on the swap contract in a database to ensure it’s tracked.

**ICY Tokens Are Burned**

The Swap Contract processes your request, permanently removing (or "burning") your ICY tokens from circulation. It then signals that the swap is underway.

**Bitcoin Is Delivered**

The backend regularly checks events on the Swap Contract to detect your swap request, use request's information such as BTC amount, BTC address, and sends it to your address from the treasury wallet. If any issues arise, the system automatically retries using cronjobs to ensure delivery.

![alt text](assets/cross-chain-transfers-implementing-a-token-swap-from-base-chain-to-bitcoin-1.png)

## How the price is set

For more details on how the price is set, please refer to the [How much is your ICY worth](https://memo.d.foundation/playbook/community/how-to-swap-icy-to-btc-copy/) guide.

## Conclusion

This process uses specialized tools and steps to securely swap ICY tokens for Bitcoin, overcoming the challenges of their different blockchain systems while maintaining fairness in pricing.
