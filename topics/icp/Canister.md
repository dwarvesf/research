---
title: null
description: null
date: null
tags:
  - blockchain
  - icp
redirect:
  - /s/cHzKaA
---

Canister contains program and state. It's like a container.

Canister middleware sử dụng resources (CPU, network, etc.) của các nodes và pay back bằng '[[Cycle]]'.

There are 2 type of calls:

- non-committing query calls: read/get --> không thay đổi dữ liệu
- committing update call: update --> thay đổi dữ liệu

1. The "Login with DFINITY" service is something we call [Internet Identity](https://sdk.dfinity.org/docs/ic-identity-guide/what-is-ic-identity.html) and it securely authenticates users on the Internet Computer. It doesn't do anything for your app other than allow you to know that the user is authenticated on our network, and that we trust they are who they say they are. You still manage your own users and access control, you just have the (highly recommended) option to integrate our auth solution to save you that part of the work.
2. [Motoko](https://stackoverflow.blog/2020/08/24/motoko-the-language-that-turns-the-web-into-a-computer/) is an incredibly exciting language (authored by one of the creators of [WebAssembly](https://developer.mozilla.org/en-US/docs/WebAssembly)) that has a very _very_ bright future as the programmatic backbone of the Internet Computer. It has many built-in abstractions to deal with the new ways of interacting with data on our network and is straightforward to pick up and [well documented](https://sdk.dfinity.org/docs/language-guide/motoko.html). That said, it's also a brand new language that hasn't had much time to garner the community support and ecosystem that Rust already has. I'm not an expert in either language, but Motoko is built to be familiar and easy to get up-to-speed with, while Rust is the battle-tested stalwart with community and library superiority for now.
3. Your dapp is hosted _on_ the Internet Computer. No need for hosting anything locally or on (what we refer to as) legacy infrastructure like AWS. All of its state, logic, and UI are held in canisters on "nodes" in data centers around the globe, and can be accessed by a web browser just like any other website/app. You connect your ICP wallet to your `dfx identity` on the command line and can then convert ICP to cycles to power your canisters.

---

#### Reference

- SDK quickstart: [https://sdk.dfinity.org/docs/quickstart/quickstart-intro.html](https://sdk.dfinity.org/docs/quickstart/quickstart-intro.html)
- DFINITY examples: [https://github.com/dfinity/awesome-dfinity](https://github.com/dfinity/awesome-dfinity)
- CanCan (demo app): [https://github.com/dfinity/cancan](https://github.com/dfinity/cancan)
- Dev forum if you get stuck (you will see many IC devs there): [https://forum.dfinity.org/](https://forum.dfinity.org/)
