---
title: Smart contract
description: This article provides an overview of smart contracts in blockchain technology, including their definition, how they work, and their advantages.
date: 2022-06-16
authors:
  - thanhpn
github_id: thanhpn
tags:
  - blockchain
  - foundational-topics
  - smart-contract
redirect:
  - /s/6ibBQg
---

## Smart contracts

Smart contracts, also known as smart contracts, are computer programs that operate on the blockchain. Entities interacting with the contract do not need to know each other or trust each other.

- The contract ensures that with the conditions of the contract satisfied, the contract will be executed
- The logic of the contract can be verified. In other words, a smart contract is an intermediary, greatly reducing operating costs if you do it in real life: for example, if you buy a house, you must notarize it, then pay. money at the notary office, then go to the real estate office to do the account transfer procedure... it will need many steps involving people and intermediaries. If you make this purchase on a smart contract, you will simply create a home sale transaction and one buyer will create a purchase transaction, the other contract will perform the transfer of money, change ownership, related information, and sales history.

## How smart contract work:

- Developer distributes contract on the blockchain
- The user signs the transaction and invokes the contract on the blockchain
- Contract processes data and executes commands
- The data after being executed will be saved on the blockchain

## Structure of a smart contract:

- Declare solidity version
- Declare libraries, interfaces
- Declare variables
- Declare constructor
- Processing instructions
- Save state
- Event/Log

Declare variable

Function/Instruction

Event/Log

## Invoke another smart contract:

Currently, Ethereum there are many contracts such as tokens, NFT-ERC721, games, swaps, lending... To work directly with these contracts you can make calls directly from your application from javascript or go lang via ABI, ABI is an interface type similar to API specification file or description file. describe swagger. It defines data objects and callable functions. Or you can also call the interface of another contract in your contract for example:

- Declare interface
- Call command

## The advantages of smart contracts:

- Efficiency: Smart contracts promise to automate business processes at a corporate level. This reduces operating costs and saves resources, including the staff needed to oversee complex operations involving multiple companies.
- Processing speed: Smart contracts help improve the processing speed of processes between many different companies and corporations.
- Autonomy: Smart contracts are executed automatically by a network and help reduce the need for a 3rd party to manage transactions between companies.
- Reliability: Smart contracts also leverage blockchain ledger and other distributed ledger technologies to store all the information and operations involved in complex processing after it has been executed presently. This technology also supports automated trading which eliminates human errors and ensures accuracy in contract execution.

## The limitations of smart contracts:

- Security issues: Smart contracts play certain important roles in a business involving many parties. However, this technology is still new and hackers are constantly exploiting new attack directions to penetrate. In the early days of Ethereum, hackers hacked and stole a large amount of virtual currency worth $50 million. The IEEE Consortium of Electrical and Electronic Engineers has also expressed concern about the weakness of the tools used to detect vulnerabilities in smart contracts.
- Integrity: An oracle (a data source that sends event updates) should be protected from hackers creating fake events to trigger the processing of contracts even though they are not allowed. The system needs to be programmed to generate the correct events, which can be quite difficult in complex cases.
- Relevancy: Smart contracts can speed up processing in a multi-party contract regardless of whether it matches the intent or understanding of all parties. But it can also add to the damage in the event things get out of hand, especially when there's no way to stop or reverse the unintended actions. Research firm Gartner has pointed out that this creates a challenge in the management of smart contracts, although this challenge has not been fully addressed.
- Complexity in management: Smart contracts are quite complicated in deployment and management. They are often designed in such a way that it is very difficult or impossible to change. Although this increases security, the parties will not be able to change the content or add new terms without creating a new contract.

Take for example a smart contract when deployed When a Decentralized Autonomous Organization (DAO) named "The DAO" was hacked in 2016, millions of ETH were stolen due to a mistake in their smart contract code. Since their Smart contract is immutable, developers cannot edit the code. This eventually led to a hard fork, creating Ethereum Classic and Ethereum.

#### Reference

https://ethereum.org/vi/developers/docs/smart-contracts/
