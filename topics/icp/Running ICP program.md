---
title: null
description: null
date: null
tags:
  - blockchain
  - icp
redirect:
  - /s/E07Hrg
---

- Start local network: `$ dfx start`
- Create a canister: `$ dfx canister create --all`
- Build source code: `$ dfx build`
- Put build files to canister: `$ dfx canister install --all`

Or we can simply deploy with `$ dfx deploy`

On the first time deployment, it will create default 'identity'

Calling motoko func: `$ dfx canister call <canister name> <func name> <args>`
