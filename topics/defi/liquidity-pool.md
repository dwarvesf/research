---
title: Liquidity pool
description: null
date: null
author: Hien Le
redirect:
  - /s/aYszNQ
---

## 1. What is a Liquidity Pool?

Basically, a liquidity pool is a pool of tokens that are locked in a smart contract. Liquidity refers to the ease with which a token can be swapped with another. Anybody can provide liquidity into this single giant pool and earn a share of the trading fees based on their stake in it.

The process could be illustrated by the picture below:

![[Pasted image 20220322220453.png]]

## 2. How do Liquidity Pools work?

Liquidity pools form the backbone of DEX by applying the automated market maker (AMM) system. Here’s the main formula that mathematically determines what the market price of the token in the pool should be:

$$ x\*y=k $$

x and y represent the respective token balance of a pairing and **k is a constant that will never change**.

Let’s use the ETH-DAI pair as an example, with 10 ETH and 1,000 DAI in the liquidity pool. What happens when someone wants to buy 1 ETH from this pool? How much does he need to pay?

The k constant is 10,000 since there are 10 ETH and 1,000 DAI.

$$ 10 ETH \* 1,000 DAI = 10,000 $$

If the buyer withdraws 1 ETH, he has to deposit some DAI into the pool so that k remains constant.

$$ (10 - 1) ETH \* (1,000 - y) = 10,000$$$$1,000 - y = 10,000/(10-1)$$$$y = 111.11 $$

And because we have no limit orders in AMM, the smart contract would automatically compute y to determine the price to pay and that is approximately 111.11 DAI.

Now the liquidity pool would have 9 ETH and 1,111.11 DAI after someone buys 1 ETH.

### 2.1. Roles of arbitragers in AMM

Arbitragers play an important role in AMM. They are used in order to take advantage of the price differences and drive the price back towards market equilibrium.

If the price of ETH in the pool is higher than it is on Coinbase, arbitragers would sell ETH into this pool and make a profit on the price discrepancies. Thus, the price of ETH in the pool would always be incentivized towards the market price as closely as possible.

### 2.2. Depth of pool and slippage

The price difference between the pool and market is known as slippage. How big your slippage is depends on the size of your trade relative to the size or depth of the pool.

The depth of the pool is measured by that k constant. The bigger your k, the deeper the pool and the less likely a slippage is going to occur.

In the earlier example, buying 1 ETH from a pool that only has 10 ETH makes up 10% of the pool size. Hence there is such a big difference in price. ETH price costs $100 but you are buying it from the pool at $111.11. That’s about an 11% price slippage.

In reality, the pool will be much deeper and bigger as there will be hundreds and thousands of liquidity providers from all around the world.

Suppose we use a pool that has 100 ETH and 10,000 DAI and someone wants to buy 1 ETH from this pool, how much would it cost? Plugging in the same equation would give you $101, a 1% price slippage.

## 3. How to provide Liquidity into a Pool?

Anyone can provide liquidity and become a Liquidity Provider (LP). When supplying a pair of tokens into the pool, the ratio price of both tokens must be 50-50. So if you want to provide $5,000 of ETH-DAI pair, you will need $2,500 DAI and $2,500 worth of ETH.

Every liquidity provider has to follow this standard so that the liquidity pool would always maintain a 50-50 mix of token A and token B.

When you provide liquidity into a pool, you typically receive an LP token in exchange. This LP token represents your share in the liquidity pool. Every time when a trade is made on the liquidity pool, users have to pay a fee. These fees are then aggregated and re-distributed back to all liquidity providers on a pro-rata basis based on the amount of LP tokens you hold.

However, you may not get back the exact amount of tokens you deposited initially. That is to say, if you started out with some ETH-DAI tokens, you would get back more ETH and less DAI, or more DAI and less ETH depending on the markets.

In a bull market, more people would want ETH as prices are rising. Hence the supply of ETH in the pool would drop while DAI would increase since more people are exchanging their dollars for ETH. When you withdraw out your LP, you would end up with less ETH than you started out with and more DAI. The reverse holds true in a bear market.

## 4. What is Impermanent Loss?

Impermanent loss refers to the situation where you could have made more if you have done nothing and hold on for dear life rather than providing LP.

Suppose the price of ETH in our LP is $100. What if the price of ETH on Coinbase rises to $120 in the market? Arbitragers will come in and buy ETH from the pool and sell it on Coinbase to profit from that difference.

Let’s use a pool that has 100 ETH and 10,000 DAI. The relation between x, y, k, and ETH price could be shown by:

$$ x _ y = k$$$$x = ETH\ price _ y $$

We could easily calculate x and y by k and ETH price:

$$ x = \sqrt{k \over ETH\ price}$$
$$y = \sqrt{k \* ETH\ price} $$

Assume someone supplies 1 ETH and 100 DAI into the pool. How much ETH and DAI he could get back if the ETH price pumps to $120?

$$ k = 100 _ 10,000 = 1,000,000 $$$$x = \sqrt{1,000,000 \over 120} = 91.29$$$$y = \sqrt{1,000,000 _ 120} = 10,954.45 $$

Since his share in the pool is 1%, the LP gets back 0.9129 ETH and 109.5445 DAI if he wants to withdraw his stake in the pool. The total value of his stake would be 0.9129 ETH \* $120 + $109.54, which totals up to be $219.09.

If he did not provide his liquidity into the pool and held on for dear life instead, his initial asset would be worth 1 ETH \* $120 + $100 = $220, which also means he would have made an extra $0.91.

That is what we call impermanent loss. It is impermanent because it only becomes permanent when you withdraw out your LP.

---

#### Reference

- https://www.jumpstartmag.com/how-do-crypto-liquidity-pools-work/
- https://www.theancientbabylonians.com/what-is-liquidity-pool-lp-in-defi/#:~:text=To%20sum%20up%20what%20liquidity,%3A%20x%20*%20y%20%3D%20k
