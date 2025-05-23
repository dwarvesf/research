---
title: Note
description: null
date: null
tags:
  - blockchain
  - defi
redirect:
  - /s/bdWrPw
---

### Uniswap

- Uniswap is a leading decentralized crypto exchange that runs on the Ethereum blockchain.
- DEX, Decentralized exchange, in which, all transactions are made automatically and directly between users (peer-to-peer network) without depending on a third-party. In other way, users have full control of their assets and transactions without rely on any intermediary to avoid ricks, hackers or scams.

To start to use Uniswap, user have to connect a wallet, which supported Ethereum. ![[uniswap-swap.png]]

### Pool

Uniswap works with a model that involves liquidity providers creating liquidity pools. Every transaction requires both seller and buyer. If the user wants to buy but there is no seller, the transaction can not happen, and vice versa. If transactions are made without liquidity pools, the matching order will take a long time, which causes a high difference between the actual price and the estimated one.

**Liquidity Pool** is a collection of funds locked in a smart contract. Liquidity Provider will place the equal amount of a pair of assets into a Pool, this amount will be locked and unavailable to make other transactions like send or receive. With each pool created, the Provider will receive a new token representing their shares, called Token Pool. The transaction fee will be paid on each Swap transaction, divided by shares.

![[app.uniswap.org_ 1.png]]

For example, user want to put 2 ETH into ETH/USDT pool, he has to put both 2 ETH and the corresponding amount of USDT (market price: _2621.15 USDT per ETH_), which means, he has to put **2 ETH** AND **5242,3 USDT** into the pool. The amount that user put into the ETH/USDT pair accounted for about 0.01% of that pool. There is a 0.3% fee for all trades on this pair, the fee will be shared for all providers of this pool, thus, user will earn 0.01% of the 0.3% fee for every ETH/USDT swap transaction.

### Swap

**Swap** is the swap of 2 coins on a separate blockchain system, based on Smart Contract, allowing users to trade coins directly from the wallet.

**Smart Contract** is a self-executing contract with the terms of the agreement between buyer and seller being directly written into lines of code. The code and the agreements contained therein exist across a distributed, decentralized network. The code controls the execution, and transactions are trackable and irreversible.

![[uniswap-swap-connected.png]]

![[uniswap-swap-settings.png]]

**Slippage tolerance**: Acceptance difference between theory price and actual receiving price

**Transaction deadline**: Transactions are only done in a certain time frame

**Expect mode**: skip the confirm screen and allow high price impact trades

**Disable Multihops**: restrict swap to direct pair only

![[uniswap-swap-est.png]]

### Chart

Chart shows all transactions happens on Uniswap and market overview of every token and pair. ![[uniswap-chart-overview.png]]

**TVL**(Total value locked): amount of money providers put into the exchange. According to the graph, currently there are $1.81B locked in exchange.

**24H volume**: the 24-hour trading volume of a cryptocurrency is how much value of a coin has been bought and sold over the course of a day.

**Fees 24H**: Fee of all transaction within 24-hour

![[pair chart.png]]

**0.30%** is the fee of liquidity pool, applies for every swap transaction in this pair. There are 3 fee tiers:

- 0.05% – expected for stablecoin pools like DAI/USDC
- 0.30% – for standard non-correlated pools like ETH/DAI
- 1.00% – for exotic non-correlated pairs

![[Pasted image 20210623135239.png]]

**Liquidity chart**

- X-axis: Asset price
- Y-axis: Liquidity

For example: Currently (the pink bar), the price of _1 ETH = 2,018.2338 USDT_ and there are 0.64m USDT locked in pool. When the price of _1ETH = 2,790.5834 USDT_ (the selected bar), there were 0.50k ETH locked in pool.
