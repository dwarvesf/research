---
title: Zero-knowledge proofs
description: This article provides an overview of zero-knowledge proofs in blockchain technology, including their definition, how they work, and their advantages.
date: 2022-09-06
authors:
  - thanhpn
github_id: thanhpn
tags:
  - blockchain
  - evm
  - zk-proof
redirect:
  - /s/k0f0zw
---

Zero-knowledge proof is a way of proving the validity of a statement without disclosing the statement itself. A "validator" is the party attempting to prove a claim, while a "verifier" is responsible for validating the claim.

## Why do we need to demonstrate no knowledge?

Zero-knowledge proofs represent a breakthrough in applied cryptography, as they promise to improve the security of information for individuals. Consider how you can prove the claim (for example, “I am a citizen of country X”) to another party (for example, a service provider). You'll need to provide "proof" to back up your claim, such as a national passport or driver's license. But this approach is not safe, can be hacked, personal information can be revealed

Zero-knowledge proofs solve this problem by removing the need to disclose information to prove the validity of claims. The zero-knowledge protocol uses a statement (called a 'witness') as input to generate a succint proof of its validity. This proof provides firm assurance that a statement is true without revealing the information used to make it.

Going back to our earlier example, the only proof you need to prove your citizenship claim is zero-knowledge proof. The verifier only has to check if certain properties of the proof are true to believe that the underlying statement is also true.

## How to prove Zero Knowledge works?

To make this possible, zero-knowledge protocols rely on algorithms that take some data as input and return the 'true' or 'false' as output. A Zero-knowledge protocol must satisfy the following criteria:

1. **Completeness**: If the input is valid, the zero-knowledge protocol always returns 'true'. Hence, if the underlying statement is true, and the prover and verifier act honestly, the proof can be accepted.
2. **Soundness**: If the input is invalid, it is theoretically impossible to fool the zero-knowledge protocol to return 'true'. Hence, a lying prover cannot trick an honest verifier into believing an invalid statement is valid (except with a tiny margin of probability).
3. **Zero-knowledge**: The verifier learns nothing about a statement beyond its validity or falsity (they have “zero knowledge” of the statement). This requirement also prevents the verifier from deriving the original input (the statement’s contents) from the proof.

In basic form, a zero-knowledge proof is made up of three elements: witness, challenge, and response.

- **Witness**: with a zero-knowledge proof, the prover wants to prove knowledge of some hidden information. the secret information is the "witness" to the proof, and the prover's assumed knowledge of the witness establishes a set of questions that can only be answered by a party with knowledge of the information. Thus, the prover starts the proving process by randomly choosing a question, calculating the answer, and sending it to the verifier.
- **Challenge**: The verifier randomly picks another question from the set and ask the prover to answer it.
- **Response**: the prover accepts the question, calculates the answer and returns it to the verifier. The prover's response allows the verifier to check if the former really has access to the witness. to ensure the prover is not guessing blindly and getting the correct answers by chance, the verifier pick more question to ask. By repeating this interaction many times, the possibility of the prover faking knowledge of the witness drops significant until the verifier is satisfied.

Interactive proof and non-interactive proof:

- Interactive proof had limited usefulness since it required the two parties to be available and interact repeatedly
- Non-interactive proof required only one round of communication between participants. the provers passes the secret information to a special algorithm to compute a zero-knowledge proof. this proof is sent to the verifier, who verify that the prover knows the secret information using other algorithm.

## Types of zero-knowledge proofs

### ZK-SNARKs

ZK-SNARK is an acronym for Zero-Knowledge Succinct Non-Interactive Argument of Knowledge. The ZK-SNARK protocol has the following qualities:

- **Zero-knowledge**: A verifier can validate the integrity of a statement without knowing anything else about the statement. The only knowledge the verifier has of the statement is whether it is true or false.
- **Succinct**: The zero-knowledge proof is smaller than the witness and can be verified quickly.
- **Non-interactive**: The proof is 'non-interactive' because the prover and verifier only interact once, unlike interactive proofs that require multiple rounds of communication.
- **Witness**: The proof satisfies the 'soundness' requirement, so cheating is extremely unlikely.
- **(Of) Knowledge**: The zero-knowledge proof cannot be constructed without access to the secret information (witness). It is difficult, if not impossible, for a prover who doesn’t have the witness to compute a valid zero-knowledge proof.

For the ZK-SNARK protocol to work, the creation of a Common Reference String (CRS) is necessary: ​​The CRS provides public parameters to prove and verify valid proofs. The security of the proof system depends on the CRS setting; If the information used to create the public parameters falls into the possession of malicious actors, they can create false validators.

- Some ZK-rollups attempt to solve this problem by using multiparty computation (MPC), involving trusted individuals, to create public parameters for the ZK-SNARK circuit. Each party contributes a random number (called "hazardous waste") to the construction of the CRS, which they must destroy immediately.
- Trusted settings are used because they increase the security of the CRS setup. As long as an honest participant discards their input, the security of the ZK-SNARK system is guaranteed. However, this approach still requires the trust of the stakeholders to erase their sampled randomness and not undermine the security guarantees of the system.
- Reliability assumptions aside, ZK-SNARK is very popular because of its small proof size and continuous time verification. Since verifying proofs on L1 constitutes a greater operating cost of ZK-rollup, L2 uses ZK-SNARK to generate proofs that can be quickly and cheaply verified on the Mainnet.

### ZK-STARKs

Like ZK-SNARKs, ZK-STARKs demonstrate the validity of off-chain computation without revealing the input. However, ZK-STARK is considered an improvement on ZK-SNARK because of their scalability and transparency.

- **Scalable**: ZK-STARK is faster than ZK-SNARK in generating and verifying evidence when witness size is larger. With STARK proofs, verification and proverb times only increase slightly as the witness grows (the times of the proverb and SNARK verifier increase linearly with witness size).
- **Transparency**: ZK-STARK relies on public verifiable randomness to generate public parameters for proof and verification instead of establishing trust. Therefore, they are more transparent than ZK-SNARK.
- **Scalability**:ZK-STARKs also offer more scalability because the time required to prove and verify valid proofs increases with the complexity of the underlying computation. With ZK-SNARK, the proof and verification times expand linearly with respect to the size of the underlying computation. This means that ZK-STARK requires less time than ZK-SNARK to prove and verify as far as large data sets are concerned, making them useful for high volume applications.
- **Security**: ZK-STARK is also secure against quantum computers, while Elliptic Curve Cryptography (ECC) used in ZK-SNARK is considered by many to be vulnerable to quantum computing attacks. The downside of ZK-STARKs is that they produce a larger proof size, which is more expensive to verify on Ethereum. Also, they don't support recursion, which is key to extending off-chain computation with zero-knowledge proofs.

## Application for ZK proof

- Anonymous payments
- Identity protection
- Authentication
- Verifiable computation

## Drawbacks of using ZK proofs

- Hardware costs
- Proof verification costs
- Trust assumptions
- Quantum computing threats

## References

- [Zero-knowledge proofs](https://ethereum.org/en/zero-knowledge-proofs/)
- [ZL-Rollup](https://docs.ethhub.io/ethereum-roadmap/layer-2-scaling/zk-rollups/)
- [ZK-SNARKs](https://medium.com/coinmonks/zk-snarks-a-realistic-zero-knowledge-example-and-deep-dive-c5e6eaa7131c)
- [ZK-STARKs](https://medium.com/coinmonks/zk-starks-create-verifiable-trust-even-against-quantum-computers-dd9c6a2bb13d)
- [Snarks-vs-starks](https://www.alchemy.com/overviews/snarks-vs-starks)
