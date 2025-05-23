---
title: BIP39
description: null
date: null
redirect:
  - /s/A09p4A
---

- BIP39 is the protocol to generate mnemonic sentence (e.g seed phrase in metamask)
- Under the hood, from that seed phrase will generate a key wallet, if you want to generate the following keys, you will be input from seed phrases + (key1+key2) (for example with metamask I can generate many key wallets, later on When you re-import the seed phrases on another device, those keys will also be re-generate from the seed phrases without having to remember them)
- Bip39's dictionary bank has 2048 words
- Entropy of 1 metamask with 12 phrases is 128 -> There are 2^128 possible phrases. If we brute force 1 seed / 1 microsecond it will also take 1.07 \* 10^23 years

---

#### Reference

- https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki
- https://www.reddit.com/r/ledgerwallet/comments/6cjvam/probability_of_seed_phrase_collisionbrute_forcing/
