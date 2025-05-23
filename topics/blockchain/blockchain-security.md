---
title: Blockchain security checklist
description: Ensure blockchain security with this checklist covering centralization, event logging, code safety, gas optimization, unit testing, coding style, logical issues, and potential attacks for safer smart contract development.
date: null
redirect:
  - /s/BP6tEQ
---

- [ ] Understanding the project

##### Centralization / privilege

- [ ] Secure the function have access by owner
- [ ] Initial token distribution, should prefix receiver address
- [ ] Use multisign wallet for dev
- [ ] Unrestricted privilege function

##### Event log

- [ ] Event for any set function
- [ ] Event for significant transactions
- [ ] Event name must clear and avoid misunderstand
- [ ] Favor capitalization and a prefix in front of events (we suggest Log)

##### Volatile code

- [ ] Avoid Reentrancy
- [ ] Check the return value of external call such as transfer
- [ ] Avoid state change after call external function
- [ ] Math Operation
- [ ] Check insecure arithmetic, integer under/overflow
- [ ] Validity check
- [ ] Clear Code structure
- [ ] Don't use transfer() or send()
- [ ] Handle errors in external call ( can use try/catch)
- [ ] Favor pull over push for external calls
- [ ] Don't delegatecall to untrusted code
- [ ] Force-feeding Ether

##### Gas optimization

- [ ] Don't use recursive function
- [ ] Use appropriate type (uint8, map...)
- [ ] Initial variable in constructor
- [ ] Use external function instead of public

##### Unit test

- [ ] Unit test for get/set function
- [ ] Unit test for overflow data
- [ ] Unit test for external call
- [ ] Run unit test before deploy

##### Coding style

- [ ] Language specific
- [ ] Store config of upgrade contract and push to git
- [ ] Check Reusable Code, use modifier
- [ ] Check for minimal source code
- [ ] Have note/status for deployed code

##### Logical issue

- [ ] Check over minted token
- [ ] Don't trust tx.origin for authorization, use msg.sender for authorization.
- [ ] Check timestamp for logic will be manipulated by a miner
- [ ] Avoid using block.number as a timestamp

##### Potential attack

- [ ] Check for Potential Sandwich Attack
