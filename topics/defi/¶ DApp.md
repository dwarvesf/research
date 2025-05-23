---
title: DApps
description: null
date: null
tags:
  - blockchain
  - dapp
redirect:
  - /s/E8WmIg
---

### DApps

![](https://github.com/ethereumbook/ethereumbook/raw/develop/images/web3suite.png)

#### What is DApp?

A Dapp is an application that is **mostly** or **entirely** decentralized. The possible aspects of an application that may be decentralized:

- Backend
- Frontend
- Data storage
- Message communications
- Name resolution

#### DApp advantages

- **Resilency**: DApp will have no downtime and will continue to be available as long as the platform is still operating.
- **Transparency**: Everyone can inspect the code. Any interaction with the DApp will be stored forever in the blockchain.
- **Censorship resistance**: No service provider, or even the owner of the smart contract, can alter the code once it is deployed on the network.

#### The DApp components

##### Backend (smart contract)

- You can think of a smart contract replacing a server-side (aka “backend”) component in a regular application.
- Any computation executed in a smart contract is very expensive and so should be kept as minimal as possible.
- Smart contracts in the network can call and pass data between each other, reading and writing their own state variables as they go, with their complexity restricted only by the block gas limit.
- Smart contract architecture design is the inability to change the code of a smart contract once it is deployed.
- _Check gas cost here: [gas cost](https://github.com/djrtwo/evm-opcode-gas-costs/blob/master/opcode-gas-costs_EIP-150_revision-1e18248_2017-04-12.csv)_

##### Frontend

- The client-side interface of a DApp can use standard web technologies (HTML, CSS, JavaScript, etc.) and mobile as well.
- Lnked to Ethereum via the _web3.js_ JavaScript library, which is bundled with the frontend resources and served to a browser by a web server.

##### Data storage

- Due to high gas costs and the currently low block gas limit, smart contracts are not well suited to storing or processing large amounts of data.
- Most DApps utilize **off-chain** data storage services, meaning they store the bulky data off the Ethereum chain, on a data storage platform.
- Data storage platform can be centralized (cloud database), or decentralized, stored on a P2P platforms (IPFS, Swarm).

##### IPFS

- The _Inter-Planetary File System_ (IPFS) is a decentralized content-addressable storage system that distributes stored objects among peers in a P2P network.
- Content addressable” means that each piece of content (file) is hashed and the hash is used to identify that file. You can then retrieve any file from any IPFS node by requesting it by its hash.

---

#### Reference

[ethereumbook chap12](https://github.com/ethereumbook/ethereumbook/blob/develop/12dapps.asciidoc)
