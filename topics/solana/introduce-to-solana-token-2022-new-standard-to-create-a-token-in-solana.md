---
title: Introduce to Solana token 2022 - new standard to create a token in Solana
description: Explore Solana Token 2022, the next-generation token standard on Solana blockchain. Learn about its key features like transfer fees, non-transferable tokens, and confidential transfers. Discover how Token Extensions enhance functionality, improve security, and enable regulatory compliance for developers and businesses in the Solana ecosystem.
date: 2024-06-19
authors:
  - quanghuynguyen1902
tags:
  - blockchain
  - defi
  - solana
redirect:
  - /s/sv88uQ
---

![](assets/introduce-to-solana-token-2022-new-standard-to-create-a-token-in-solana-1.webp)

## Introduction

Solana Token 2022 Program (Token extensions) is the next generation of the Solana Program Library standard. Token extensions introduce a new set of ways to extend the normal token functionality. The original Token program brought the basic capabilities of minting, transferring and freezing tokens. The Token Extensions program includes the same features, but come with additional features such as confidential transfers, custom transfer logic, extended metadata, and much more.

## Key features

![](assets/introduce-to-solana-token-2022-new-standard-to-create-a-token-in-solana-2.webp)

**Transfer Fees**: add a fee/tax on transfers of your token. specifically, you collect the fee in the token itself not another token like SOL (i.e. if TokenX has a transfer fee, then every time someone transfers or swaps TokenX, they would pay the fee in TokenX).

**Non-Transferable**: help you to create tokens that cannot be transferred. This enables the creation of "soul-bound" tokens, where digital assets are intrinsically linked to an individual. While these tokens cannot be transferred, the owner can still burn tokens and close the Token Account.

**Permanent Delegate**: specifies a permanent account delegate for any token account associated with the mint.

**Transfer Hook**: allows custom logic to be executed during token transfers, enabling advanced functionalities.

**Metadata**: allows you to have custom metadata directly on the token mint (similar idea to using the Token Metadata program from metaplex, except you will have 1 less account and need to pay less storage rent because of that)

**Confidential Transfer**: allow to mask token balances and the amounts of token transfers, with auditability from the issuer of the token

**Default Account State**: provides the option to have all new Token Accounts to be frozen by default.

## Benefits of using token extensions

Compared to Solana token standard, token extensions offer many benefits for both developers and businesses, making them a powerful tool for unlocking the full potential of the Solana blockchain. Here are some key benefits of Solana token extensions:

**Enhanced Functionality**: Token extenstions allow developers to equip tokens with new features and functionalities. This can range from things like privacy-protecting confidential transfers to setting up automatic fees or even adding interest-bearing capabilities.

**Security**: For developers, token extensions are a boon as they provide a standardized and pre-built set of tools. This eliminates the need to craft complex smart contracts from scratch, saving time and resources. With extensions, developers can focus on their core business logic instead of getting bogged down in the intricacies of smart contract development.

**Regulatory Compliance**: Solana Token Extensions can be instrumental in ensuring tokens comply with regulations. Features like adding required metadata or creating non-transferable tokens can be easily implemented using extensions. This makes Solana a more attractive platform for businesses and organizations that need to adhere to strict compliance standards.

## Use cases

### [Bern](https://www.bernboard.com/)

**Token extensions used**: Transfer Fees.

As the first token built with Token-22, BERN offers a fun way to engage with Solana’s famous community coin, BONK. Whenever a holder transfers BERN, the **Transfer Fee** extension ensures that 6.9% of the transferred amount is automatically taken as a fee.

Of this fee, 1% is used to burn BONK, 0.5% is used to burn BERN, and 5% is distributed back to holders of BERN. To date, nearly $1.5 million of BONK has been burned, and over $500,000 of BERN has been distributed to holders.

![](assets/introduce-to-solana-token-2022-new-standard-to-create-a-token-in-solana-3.webp)

### [Wen New Standard (WNS)](https://www.jupresear.ch/t/wen-new-standard-wns-0-0/133)

**Token extensions used**: Metadata & Metadata Pointer, Transfer Hook, Immutable Owner, Group & Group Pointer, Member & Member Pointer.

WNS is an extremely lightweight NFT standard built on top of Token2022 for maximum ecosystem composability, flexibility and backward compatibility. WNS 0.0 starts off extremely simple, with a single instruction for creating a new NFT by locking supply at 1 and giving it 0 decimals. The metadata is embedded in the Mint account and has only 3 fields (name, symbol, uri).

With the **Immutable Owner** and **Transfer Hook** extensions, WNS allows creators to configure royalties on their collections. Through the power of token extensions, these royalties are enforced at the protocol level, ensuring that they can’t be bypassed.

WNS also makes developers lives easier by simplifying how metadata is associated with each token. WNS uses **Metadata** and **Metadata Pointer** extensions to stores core info like each token’s Name, Symbol, and URI directly in the token mint itself.

### [Paxos USDP Stablecoin](https://paxos.com/usdp/)

**Token extensions used**: Mint Close Authority, Permanent Delegate, Confidential Transfer, Transfer Hook, Metadata & Metadata Pointer.

Paxos is regulated by the New York Department of Financial Services (NYDFS) as a trust company and is a fully-backed, US-dollar stablecoin issuer. For the launch of its Pax Dollar (USDP) stablecoin, Paxos chose to enable token extensions.

USDP also enabled the **Confidential Transfer** extension, a privacy-enabling feature that encrypts token balances and transfer amounts via zero-knowledge proofs. That allows merchants to provide confidentiality for transaction amounts to their consumers while maintaining visibility for regulatory purposes.

The NYDFS requires that Paxos prevents bad actors from accessing USDP. To do this, Paxos specifically enabled the **Permanent Delegate** extension. If funds are used for illegal purposes, this powerful extension allows Paxos to clawback funds, therefore meeting the strict regulatory requirements set by the NYDFS.

## What's next ?

Today, there are over a dozen token extensions at the program level unlocking new use-cases, such as:

- Building a better stablecoin.
- Leveling up game assets.
- Governance for real-world asset (RWA) issuance.

Token extensions are already seeing adoption across the ecosystem.

- [GMOTrust](https://x.com/GMOTrust) announced it will release GYEN & GUSD on Solana.
- [Paxos](https://x.com/Paxos) expanded stablecoin issuance to Solana.
- [phantom](https://x.com/phantom), [solflare_wallet](https://x.com/solflare_wallet), [FluxbeamDEX](https://x.com/FluxBeamDEX) & more support token extensions

## References

https://solana.com/developers/guides/token-extensions/getting-started
