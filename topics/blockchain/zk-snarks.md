---
title: zk-SNARKs
description: ZK-SNARKs is a type of zero-knowledge proof that allows one party to prove to another that a given statement is true, without revealing any additional information. This article provides an overview of zk-SNARKs, how they work, and their applications in blockchain technology.
date: 2022-12-09
authors:
  - baenv
github_id: vhbien000
tags:
  - blockchain
  - ethereum
  - zero-knowledge
redirect:
  - /s/z7z4Gg
---

## What is this?

- **ZK-SNARKs** stands for **Zero-Knowledge Succinct Non-Interactive Argument of Knowledges**.

- Nowadays, we often hear this word when mentioning [[ZK-Rollups]]. But it is actually a **Privacy-enhancing technology**, and has a lot of applications that we will delve into in another post.

## Decomposition

- **ZK** aka **Zero-Knowledge** mean:
  - Prove possession of certain information.
  - Without revealing that information.
  - **For example:**
    - Given the hash of a random number.
    - The prover could convince the verifier that a number with this hash value exists without revealing what it is.
- **Succinct**:
  - Can be verified within a few milliseconds.
  - no matter how long the statement is.
- **Non-interactive**:
  - In the first version of ZK, the prover and verifier had to communicate repeatedly for multiple rounds.
  - Now, by implementing this characteristic, the proof consists of a single message sent from the prover to the verifier.

## Implementation by example

### Example 1: Function C

- You have a program denoted `C`.
- C have 2 input `C(x,w)`:
  - `x` is the public stuff, that can be shared with anyone.
  - `w` is the secret witness.
- The condition `C(x,w)===true`, means "Prover actually knows a secret witness `w` satisfied a statement related to `x`".
- As a prover, how can we prove that we know `w`, without sending `w` to the verifier to check with the statements?
- **Can map this example to the example of the hash function of the previous part. Let's do it, and go to the next example.**

### Example 2: Bob, Alice, and hash

- Bob is given a hash `H`.
- Alice is given the original string `S` satisfied the condition when hashing `S` by a hash function such as `SHA`, `H` is issued (aka `SHA(S) === H`).
- How can Alice prove to Bob know that she knows the `S`?
- Normally
  - Alice needs to send `S` to Bob.
  - Bob needs to hash again to check `SHA(S) === H`.
- But in this case, `S` is a secret witness, and must not send to any locations, how can Alice prove this statement to Bob?
  - Solution:
    - Alice need a **proof** to send to Bob.
    - This **proof** can prove `SHA(S)===H` is true. Mapping to program `C`, with public `x` as `H` and private `w` as `S`, in other words, when this **proof** proves `C(x,w)===true`, it means Bob can confirm that Alice knows this `w` aka `S` satisfied `SHA(S)===H` without knowledge about `S`.
    - Example of `C`:
      - `function C(x, w) { return ( sha256(w) == x );}`
    - **Note that `C(x,w)===true` is proved by the `proof`, not by itself. How can?**

### Example 3: Implementation of zk-SNARKs in simple words

- A **ZK-SNARK** consists of three functions `G, P, V` defined as follows:

  - **Key generator** aka `G`

    - `G(lambda, C) = pk,vk`
      - `lambda`: secret parameter. **Noted this**.
      - `C`: a program that proves that `prover` knows `w` by `C(x,w)=true`. Aka above `C` in **Example 1** and **Example 2**.
      - `pk`: proving key
      - `vk`: verification key
    - `pk` and `vk` are public parameters that only need to be generated once for a given program `C`.
    - Can assume that:
      - **From `pk`, we can create a `proof` that can be verified by using `vk` in a pre-defined way.**

  - **Prover function** aka `P`

    - `P(pk,x,w) = prf`
      - `pk`: proving key issued from `G`
      - `x`: public input
      - `w`: private witness
      - `prf`: proof proves that prover knows `w` satisfy program `C`.

  - **Verifier function** aka `V`
    - `V(vk,x,prf)=true/false`
      - `vk`: verification key generated from `G`
      - `x`: public input
      - `prf`: proof generated from `P`

- By above functions, `V(vk,x,prf)=true` means:

  - With the proof `prf` generated depends on a logic that includes `x`, `w` and `pk`.
  - And `pk` is a pair with `vk` so they are closely related to each other.
  - So when having `vk`, `x`, `prf`, by a pre-defined way, we can confirm that `C(x,w)===true`.

- **Note that `lambda` can cause security issues when used in real work**

  - Reason: anyone who knows `lambda` can generate fake proofs
  - Example:
    - From any `C`, and known `lambda`, can find a pair `f_pk` and `f_vk`
    - From `f_pk`, malicious actor can generate a `fake_prf` that represents `C(x,w)==true` when checking with `f_vk`.
  - **Solution**: [[Multi-Party Ceremonies]] for **Trusted Setup** -> To build `lambda`.

- Resolve the **Example 2**:

  - Bob uses `G` to generate key, send `pk` to Alice
  - Alice gen `prf` -> Sent to Bob
  - Bob verifies using `vk`

  - **Issue**: Bob can't be a prover because he holds the `Lambda`.
    - A trusted independent group separate from Alice and Bob could run the generator and create the proving key pk and verification key vk in such a way that no one learns about lambda.

### Example 4: In Ethereum [[ZK-Rollups]]

- Can add the building blocks of the verification algorithm to Ethereum in the form of precompiled contracts.
  - [[Layer 2]], run `G` to generate `pk` and `vk`
  - [[Layer 2]], the operator use `pk` to generate `proof`
  - [[Layer 1]], the verifier contract use `vk`, `proof` and public `input x` (can be state changes/Merkle root hash, bla bla ble ble)
  - [[Layer 1]], if valid -> trigger transaction / append ZK blocks / etc.

## References

- https://consensys.net/blog/developers/introduction-to-zk-snarks/
- https://ethereum.org/en/developers/docs/scaling/zk-rollups/
- https://vitalik.eth.limo/general/2022/06/15/using_snarks.html
