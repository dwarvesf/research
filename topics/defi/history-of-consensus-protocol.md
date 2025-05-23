---
title: History of consensus protocol
description: null
date: null
redirect:
  - /s/gCPNJg
---

A bit of rabbit hole leads me here, but great podcast sofar:

History of [[consensus protocol]]:

- In the 70s, when people tried to use microprocessors to build an airplanes. Leslie Lamport wrote a paper about timeclock / orderding system in a distributed system, which laid the foundation for consensus protocol and fault-tolerant distributed computing. But the system couldn't tolerate any faults at all -> fails
- In 82, Lamport coined the phrase Byzantine Generals Problems, which put the idea that the consesus protocol not only needs to deal with some agents may crash / delays. We also need to handle any arbitrary behavior. The terms comes from an idea that a set of Byzantine Generals trying to coordinate to attack Rome, they have to speads out on differents places and can only communicate by message. The idea of that time also fail, because it's only work in syncchronous network
- In 85, FLP impossibility result (name after the authors of the paper Fisher, Lynch and Patterson) shows that in the truly async network and have a deterministic system, where there is no upper bound on message latency, we can't achieve the consensus state. So since then people tried to find a way to meet it at a halfway (which I'm not sure I can understand that but nvm)
- Also sine that point, the consensus science split into 2 branchs.
  - Consensus under non-byzantine system: where the nodes can trust each other (Pavos, Raft)
  - Byzantine system (trustless): pBFT
- Move forward a bit until late 90s or early 00s. Barbara Liskov came out with [[pBFT]], the first practical and implemtable version to handle consensus protocol, but at that time, it is only a hot acedamic topic since there is no real application on it at all
- But in 2009, which a birth of [[Bitcoin]], people started to realize that pBFT is a thing

---

#### Reference

https://softwareengineeringdaily.com/wp-content/uploads/2018/03/SED547-Tendermint.pdf
