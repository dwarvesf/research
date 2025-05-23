---
title: Distributed systems
description: This article provides an overview of distributed systems in blockchain technology, including their definition, advantages, and how they work.
date: 2022-06-16
authors:
  - thanhpn
github_id: thanhpn
tags:
  - distributed-system
  - blockchain
  - foundational-topics
redirect:
  - /s/AqtZMA
---

![](assets/blockchain-bridge_blockruption-blockchain-300h.webp)

## Distributed systems on blockchain

As defined on Wiki, distributed computing is a branch of computer science that studies distributed systems. A distributed system is a software system whose components are located on different computers, connected in a network. These computers work together as a single entity to accomplish a common task by exchanging messages. Distributed computing is decentralized parallel computing. The types of hardware, programming languages, operating systems, and other resources used can vary widely. It is similar to computer clustering with the main difference being the geographical distribution of resources.

Distributed systems appear to be very common in practice. Most applications today, especially Internet applications, are implemented as Distributed systems. Deploying software, especially large systems, on multiple computing units (instead of using a single computer) has many benefits, such as:

- Provide more resources when the system needs to handle a larger amount of work.
- Using only one computer unit means the risk of software crashing (crash) if that machine has a problem. Using multiple machine units will allow you to continue operating the software even if problems occur.
- When your system becomes complex and requires the combination of many different components, using DS allows you to break down a large system into many small units. Each unit can operate independently, can even be developed by different teams with different expertise.

System users may be geographically dispersed across the globe. To ensure quality of service and limit latency, the machine system also needs to be distributed so that it can be as close to the user as possible.

## Advantages of distributed systems:

- Scalability: There are two types of scaling: horizontal scaling and vertical scaling:
- Reliability: Reliability is the fault tolerance of the system which means that the system will continue to provide its service as soon as one or more components (software/hardware) of the system fail.
- Availability: is the total time a system remains in normal operation for a specific period of time. A measure of availability is the percentage of time the system is up and running continuously for a period of time (usually 1 year).
- Efficiency: The efficiency of a distributed system is high load and low latency. This means that a system that can handle many concurrent requests with low latency is a high-performance system.
- Manageability: it is the ability to easily expand and maintain the system. In other words, it is the time to perform repair (repair) or maintain (maintain) when needed, the higher the time, the lower the availability.

## Machine failure (node failure)

Each physical computer, due to various reasons, can experience problems while in operation. These incidents are divided into several main categories:

- Fail-stop: This is a type of problem that causes the process on the machine to stop working (stops computation as well as communication). The cause of this problem can be due to the machine crashing (software error, operating system error ...), hardware failure, or external causes (eg power failure). This is the most common type of problem, so when people talk about 'failure' without saying anything else, it's usually implied as this type of problem. Most of the algorithms developed in DS are intended to deal with this type of problem.
- Fail-recover: Process may be down for a certain time, but then recovery works again. The cause of this type of problem can be due to the machine rebooting automatically for some reason. Often when talking about this type of failure, people assume that the machine has the ability to store information on the hard drive and recover this information after the failure occurs.
- Byzantine failure: The problem that the computer does not work according to the requirements set forth. For example, the machine can send arbitrary messages, or change state arbitrarily, unlike what is programmed. This is the most annoying type of problem, which can happen when the system crashes for no apparent reason (e.g. RAM may be damaged causing bit-flip), or because the system is attacked by malicious actors. .

## Network problems

A computer network is also a physical product and so problems can also occur. A common type of problem is the “network partitioning” problem, which is simulated by the figure above. This problem occurs when the transmission of one or more servers is cut off from the rest of the system, causing the system to be split into many parts that cannot communicate with each other. In fact, in data centers, a cluster of servers is usually connected by one or more switches. Failure of the switch port or wire can lead to one or more servers being disconnected, leading to the aforementioned partitioning situation.

## Distributed systems in blockchain

![](assets/distributed-systems_c7xyhh1.webp) Blockchain is a distributed ledger, which simply means that a ledger is spread across the network among all peers (nodes) in the network. Every node has a copy of the Blockchain and once a block reaches a certain number of approved transactions then a new block is formed

Any computer can join the blockchain network and become a validator by connecting to the internet and launching applications. The difference is that to become a node on the network, a computer needs to meet certain requirements in terms of connection speed, storage speed, and storage space. For the current bitcoin network, due to too many miners participating in the operation, the network requires a huge amount of computing power, If you want to participate in the network you need to run the service through the mines to contribute strength.

## Distributed software on blockchain

"The Ethereum Virtual Machine (EVM) is the runtime environment for transaction execution in Ethereum. It includes a stack, memory, gas balance (see below), program counter, and the persistent storage for all accounts (including contract code). When a transaction calls a contract's function, the arguments in the call are added to the stack and the EVM translates the contract's bytecode into stack operations. Stack items may be stored in memory or storage, and data from memory/storage may be added to the stack. The EVM is isolated from the other files and processes on the node's computer to ensure that for a given pre-transaction state and transaction, every node produces the same post-transaction state, thus enabling network consensus such as PoS. The formal definition of the EVM is specified in the Ethereum Yellow Paper. EVMs have been implemented in C++, C#, Go, Haskell, Java, JavaScript, Python, Ruby, Rust, Elixir, Erlang, and soon WebAssembly."

The EVM's instruction set is Turing-complete. Popular uses of Ethereum have included the creation of fungible (ERC20) and non-fungible (ERC721) tokens with a variety of properties, crowdfunding (e.g. initial coin offerings), decentralized finance, decentralized exchanges, decentralized autonomous organizations (DAOs), games, prediction markets, and gambling.

## How about scale for blockchain ?

Concerning pure computing power, distributed computing offers easier scalability than centralized computing. It's relatively easy to add more machines to gain more computing power and reduce them when power needs are lower.

However, blockchain has different scalability issues. In a blockchain, the number of transactions processed in a fixed period limits transaction speed. Therefore, the scalability issue is one of transaction speed. This scalability limitation is due to the need for the nodes in a blockchain to reach consensus on the transactions taking place. Therefore, while distributed computing itself offers a high degree of scalability, the game theory element of blockchain is generally what hampers scalability on transaction speeds.

This gives rise to a concept of difficulty, Once there are too many computers involved in processing the transaction. The network will change the difficulty to reduce contention. The computer will have to calculate with higher difficulty.

The downside is that performance issues arise because every node calculates all the smart contracts in real-time. As of January 2016, the Ethereum protocol could process about 25 transactions per second. In comparison, the Visa payment platform processes 45,000 payments per second. The next Ethereum 2.0 can serve more than 100.000 transactions

Today we have a series of solutions to improve transaction speed on ethereum such as: Layer 2.

## Reference

https://en.wikipedia.org/wiki/Ethereum https://www.youtube.com/user/cbcolohan https://www.worldbank.org/en/topic/financialsector/brief/blockchain-dlt https://en.wikipedia.org/wiki/Distributed_ledger https://www.youtube.com/playlist?list=PLrw6a1wE39_tb2fErI4-WkMbsvGQk9_UB
