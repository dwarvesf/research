---
title: Anchor framework
description: A comprehensive guide to getting started with smart contract development on Solana using the Anchor framework. This tutorial covers the basics of Anchor, its components, installation process, and provides step-by-step instructions for creating and deploying a simple program.
date: 2022-07-01
authors:
  - thanhpn
github_id: thanhpn
tags:
  - anchor
  - blockchain
  - solana
  - tutorial
redirect:
  - /s/7clOuQ
---

This article features a short tutorial to start smart contract development on Solana using Anchor framework. Before you get started, we assume you already had the experience with:

- Basic knowledge of Solana network
- Concepts of: Account, program, instruction
- Knowledge of Rust or C++ language
- Install and launch local network Solana

### What is Anchor?

Anchor is a framework as well as a set of libraries that make developing applications on the Solana network faster and easier, However, you need to pay attention, the source code of the framework This has not been audited, please be careful when using. In addition, Anchor also provides a number of tools for developers.

- Rust crates and eDSL for writing Solana programs
- IDL specification
- TypeScript package for generating clients from IDL
- CLI command and workspace management for developing complete programs

### Why do we use Anchor?

- Easy to use library
- The ingredients are clear
- Many utilities for faster build, test and deploy
- Having IDL generate client on javascript or Golang easy

### Core components

An Anchor program consists of 3 main parts:

1. **Program**: where the logic of the program is stored
2. **Account struct**: where the account struct is defined, marked with `#[derive(Accounts)]`
3. **declare_id**: Declare the address of the program, it uses this id for security checks as well as allowing other programs to access your key field

Like other networks Solana also develops RPC, creating IDLs and client apps from IDL similar to ABI on Ethereum.

In the anchor you need to setup workspace for your project, example workspace for devnet

```
[provider]
cluster = "devnet"
wallet = "~/.config/solana/id.json"

[programs.devnet]
basic_0 = "2Fcoq3dKjpZiKko9Ho4NZguunJsd9AiGHheF8VHPnk7D"

[scripts]
test = "yarn run mocha -t 1000000 tests/"
```

If you want to deploy testnet, you need to move cluster to testnet, view cluster list:

```
anchor cluster list
```

#### Install Anchor and create a program:

Step 1. Install the library

- Rust

```curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
source $HOME/.cargo/env
rustup component add rustfmt
```

- Solana:

```
sh -c "$(curl -sSfL https://releases.solana.com/v1.9.1/install)"
```

- Yarn:

```
npm install -g yarn
```

- Anchor:

```
npm i -g @project-serum/anchor-cli
```

Check anchor install: anchor --version

Step 2: Create a program

```
anchor init <new-project-name>
```

Note, you need to choose the appropriate Anchor version for the sample project or you may get an error when building because the old versions are no longer compatible. Let's take the example of creating a program that accepts a key-value pair start with declaring the program you declare in the `lib.rs` directory

```
use anchor_lang::prelude::*;

declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

#[program]
mod basic_0 {
    use super::*;
    pub fn initialize(_ctx: Context<Initialize>) -> Result<()> {
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
```

A smart contract program on Solana will have the following structure:

```
processor.rs
instruction.rs
errors.rs
state.rs
lib.rs
```

Next we will run the program build command:

```
anchor build
```

If you don't use the anchor, it will be equivalent to the command

```
cargo build-bpf
```

##### Note if you build error, you need to update anchor-lang to version 0.24.2

In addition, it will run additional commands to generate the IDL file

```
anchor idl parse -f program/src/lib.rs -o target/idl/basic_0.json.
```

Similar to Ethereum, you will build a target directory, in addition it will generate a target/idl/basic_0.json file, this file is similar to the ABI.json file. Note that the idl file will also be used to generate the client source code on JS and Golang

Next, we will deploy the program, notice that you need to select the environment to deploy via the command:

```
solana config set --url localhost
- devnet
solana config set --url devnet
- testnet
solana config set --url testnet
- Mainnet-beta
solana config set --url mainnet-beta
```

Command to deploy to the network:

```
anchor deploy
```

After running this command, your program has been deployed to the blockchain. You can continue to create transactions with it by creating a client.

build successfully, you will get a log that looks like this: To deploy this program run:

```
  $ solana program deploy /Volumes/WORKS/Dropbox/Blockchain/solana/SolTwit/target/deploy/sol_twit.so
```

#### Anchor CLI

```
USAGE:
    anchor <SUBCOMMAND>

FLAGS:
    -h, --help       Prints help information
    -V, --version    Prints version information

SUBCOMMANDS:
    build      Builds the workspace
    cluster    Cluster commands
    deploy     Deploys each program in the workspace
    expand     Expands the macros of a program or the workspace
    help       Prints this message or the help of the given subcommand(s)
    idl        Commands for interacting with interface definitions
    init       Initializes a workspace
    migrate    Runs the deploy migration script
    new        Creates a new program
    shell      Starts a node shell with an Anchor client setup according to the local config
    test       Runs integration tests against a localnetwork
    upgrade    Upgrades a single program. The configured wallet must be the upgrade authority
    verify     Verifies the on-chain bytecode matches the locally compiled artifact. Run this
               command inside a program subdirectory, i.e., in the dir containing the program's
               Cargo.toml
```

#### Anchor version manager

Anchor version manager (avm) is provided to manage multiple installations of the anchor-cli binary. This may be required to produce verifiable builds, or if you'd prefer to work with an alternate version. Like NVM, some command we should remember:

```
USAGE:
    avm <SUBCOMMAND>

OPTIONS:
    -h, --help       Print help information
    -V, --version    Print version information

SUBCOMMANDS:
    help         Print this message or the help of the given subcommand(s)
    install      Install a version of Anchor
    list         List available versions of Anchor
    uninstall    Uninstall a version of Anchor
    use          Use a specific version of Anchor
```

#### Basic concepts to know before starting development

- **Account**: A record in Solana Ledger to store information or a executable program, Save funds called lamports. expressed through an address by a key aka public key
- **Account owner**: The address of the program that owns the account. Only the owner program can edit the account
- **Block**: A block of data, continuously generated and covered by votes. Contains transaction information.
- **BPF loader**: The Solana program that owns and loads BPF smart contract programs, allowing the program to interface with the runtime.
- **keypair**: A public key and corresponding private key for accessing an account.
- **lamport**: A fractional native token with the value of 0.000000001 sol.
- **leader**: The role of a validator when it is appending entries to the ledger.
- **leader schedule**: A sequence of validator public keys mapped to slots. The cluster uses the leader schedule to determine which validator is the leader at any moment in time.

#### Example and template code

- https://github.com/thanhpn/solana-anchor-template

### Reference

- https://docs.rs/anchor-lang/latest/anchor_lang/accounts/account/struct.Account.html
- https://book.anchor-lang.com/introduction/what_is_anchor.html
- https://www.rust-lang.org
- https://docs.rs/solana/latest/solana/
