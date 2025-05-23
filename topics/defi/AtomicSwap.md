---
title: AtomicSwap
description: null
date: null
redirect:
  - /s/HM9pLw
---

### What

Atomic swap is the swap of 2 coins on a separate blockchain system, based on [[Smart Contracts]], allowing users to trade coins directly from the wallet. => Peer-to-peer transactions between different blockchains.

### Why

Cross-chain trading can eventually solve many of the problems that are part of most centralized exchanges **Greater vulnerability** keeping many valuable resources in one location makes them more vulnerable to hacking, and centralized exchanges are prime targets for digital heists. => lưu lượng tiền lớn -> dễ bị hack (trứng cùng một rổ) **Funds mismanagement and human error** maintain by human => cause error sometimes **Higher operational costs** **Inefficiency in regards to volume demands:** khối lượng giao dịch nhiều => thường bị nghẽn do ko giải quyết được hết **Regulation** legal

Cross-chain trading can eventually solve many of the problems that are part of most centralized exchanges **Greater vulnerability** keeping many valuable resources in one location makes them more vulnerable to hacking, and centralized exchanges are prime targets for digital heists. => Big cash flow -> Big chance of getting hacked **Funds mismanagement and human error** maintain by human => cause error sometimes **Higher operational costs** **Inefficiency in regards to volume demands:** High transaction volume => Cause blocking in transaction **Regulation** legal

### Advantage

By removing the need for a centralized exchange or any other kind of mediator, cross-chain swaps can be executed by two (or more) parties without requiring them to trust each other

- increased level of security because users don’t need to give their funds to a centralized exchange or third party
- lower operational costs as trading fees are either very low or absent
- happen quickly (altcoins can be swapped directly without making use of Bitcoin or Ethereum as an intermediary coin.)

### Limit

For instance, to perform an atomic swap, the two cryptocurrencies need to be based on blockchains that share the same hashing algorithm (e.g., SHA-256 for Bitcoin). Also, they also need to be compatible with HTLC and other programmable functionalities. bring up concerns about users privacy (?) -> on-chain swaps and transactions can be quickly tracked on a blockchain explorer, making it easy to link the addresses.

### How it works

(https://www.youtube.com/watch?v=WkXUz3UFn6Y)

A swap his LTC to receive B's BTC A send a contract address, which requires a key to access. A send a hash of this key for B => B can't access the LTC because he only has the hash of key

B uses the provided hash to create another contract address, in which he deposits BTC. To claim the BTC, A requires the same key. As soon as A claim the BTC, B is able to claim the LTC.

If any party gives up or fails to do, the contract is canceled, the funds are automatically returned to their owners.

**On chain** Happen on either of the currency's network. (In this case, it's Bitcoin and Litecoin)

**Off-chain** Off-chain atomic swaps, on the other hand, take place on a [secondary layer]. This kind of atomic swaps is usually based on bidirectional payment channels, similar to the ones used in the [Lightning Network]

**Hash Time Lock Contracts** Hash Lock: prevents money from being spent except for predefined data Time Lock: ensures the contract is only executed within a certain time frame => Create a set of rules to prevent partial swap.
