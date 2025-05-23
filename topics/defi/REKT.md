---
title: REKT
description: null
date: null
redirect:
  - /s/oJoUBQ
---

Different types of hacks How can you minimize your chances of being negatively affected by a hack?

### The rug pull

- Sudden removal of most of the liquidity from the LP, a sudden loss can create a death spiral for the token as token holders try to sell as quickly as possible to save their profits => common scam exit form, protocols remove all traces of social media and run money (Ex: meerkat Finance)
- How to avoid it?
- Check how locked liquidity: time lock? many signs
- Who is supporting it
- What is the purpose of the project?

### Economic exploitation

Flash Loan: allows to borrow large amounts in a very short time frame. This loan can then be used to take advantage of vulnerabilities in the code or to manipulate prices and profit from arbitrage.

Flash loans are non-decentralized and secure loans that must be paid back before the blockchain transaction ends. If not repaid, the smart contract reverses the transaction => the loan never happened in the first place. Because a loan's smart contract must be executed in the same transaction for which it is lent, the borrower must use other smart contracts to execute instant transactions with the loan prior to delivery. translation ends.

Most flash loan attacks involve manipulating token prices using large amounts of capital (Example: Harvest finance)

1. Flash Loan **50M USDT**
2. Swap **11.4 million USDC** to USDT => USDT price increases
3. Deposit **60.6 million USDT** into volts, exchange **11.4 USDT** to USDC => USDT price decreases
4. Withdraw **61.1 million USDT** from volt => half profit **1M USDT**, repeat 32 times without any pre-test
5. Convert to BTC and exit with BTC through Tornado Cash, a service that allows anonymous transactions on Ethereum => Hides traces of attackers. Attacker can withdraw more USDT in step 4 due to USDT price change

Flashloan is used for price manipulation, allowing arbitrage where it is not possible.

- How to avoid it? Protocols should use trusted oracles
- Flashloan is used for other attack methods: reentrancy, front running, arbitrage

### Arbitrage

- Arbitrage: Taking advantage of price differences between different markets to make a profit.
- Arbitrage opportunities tend to decrease as liquidity increases and the market becomes more efficient. If the pool is manipulated by flashloan, allow room for arbitrage then this may also be considered as an exploit.
