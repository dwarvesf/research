---
title: null
description: null
date: null
tags:
  - blockchain
redirect:
  - /s/rb7j5w
---

- When contract is deployed, it will always be immutable (cannot be edited). But in real life, there will always be problems to edit that contract (fix bugs, upgrade).
- Normally when you want to change, the flow will be: deploy new contract -> move the old contract state to the new contract -> beg the end-user to change to the new contract.
- There is another approach, proxy patterns, which is mainly about architecture contracts to achieve the goal of being able to update the contract after it has been deployed to the chain.
- This will basically have 1 contract as Proxy (this contract immutable) config dc 1 target contract (real contract handle logic). The end user will always connect to the proxy contract, the proxy contract will use a technique called `delegatecall` to fwd it to the target contract.
- When I need to change the contract code, I just need to deploy the new contract to the chain, configure the proxy contract call to the new contract.

---

#### Reference

- https://blog.openzeppelin.com/proxy-patterns/
