---
title: null
description: null
date: null
tags:
  - blockchain
  - ethereum
redirect:
  - /s/FUB_dw
---

### POV

London hardfork will go live on mainnet on block 1296500 (Aug 3-5)

- The main change that people are interested in is definitely EIP-1559 -> this implementation will change the transaction fee mechanism of ETH
- Previously, the price mechanism of ETH would be `transaction_fee = gas * gasPrice` 1 function execute will cost X gas, gasPrice is set by the user, miners will choose transactions with high gasPrice to execute first.
- When changing, then `transaction_fee = base_fee + priority_fee (tip)`. base_fee will be burned and miners will keep priority_fee. eth said that doing so will remove the incentive that miners deliberately manipulate fees to gain as much tx_fee as possible
- In general, the fee that miners receive will decrease, so this update has a few things left to balance, increasing the block size by double (x2 transactions in 1 block) this will also reduce congestion in the network -> increase the value of ETH
- anw in my opinion, this hard fork is a relatively large stepping stone for ETH2.0, because with this tx_fee mechanism it will be suitable for a network with more tx + less congestion of eth2.0

---

#### Reference

[London Mainnet Announcement](https://blog.ethereum.org/2021/07/15/london-mainnet-announcement/)
