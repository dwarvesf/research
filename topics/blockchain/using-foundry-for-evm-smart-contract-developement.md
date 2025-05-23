---
title: Using Foundry for EVM smart contract development
description: "Introduce Foundry's core functionalities & practices to develop, test and deploy EVM smart contracts"
date: 2024-07-19
authors:
  - haongo138
tags:
  - blockchain
  - evm
  - foundry
redirect:
  - /s/ExVP0g
---

## Introduction

Foundry is a blazing-fast, all-in-one toolkit built by developers and for developers. Crafted with the speed of Rust, Foundry streamlines your entire workflow:

- Write, test, deploy and script all within a single, unified environment.
- Experience lighting-fast compilation and test execution that leaves traditional tools in the dust.
- Harness the power of native Solidity scripting for automation & streamlined interactions.

To help everyone to adopt Foundry in your next projects and start forging the future of decentralized applications. This article will walk through the core concepts of Foundry.

## Why choosing Foundry?

**Streamlined Development Workflow:**

- Provides a unified environment for the entire development lifecycle, from writing and testing contracts to deploying and interacting with them, all within a single toolchain
- Allows you to write scripts directly in Solidity, simplifying tasks like deployments, contract interactions, and automated testing. This eliminates the need for external scripting languages.
- Foundry's CLI (using the forge and cast commands) offers a powerful and efficient way to interact with the toolchain, making it easy to integrate into existing workflows and automation scripts.

**Blazing fast performance:** Foundry is built with Rust, a language renowned for its performance. This translates to significantly faster compilation and test execution times compared to tools like Truffle or Hardhat, which rely on JavaScript.

![](assets/using-foundry-for-evm-smart-contract-developement_22ed3c2228f0f9355fcb48a2c63788ee_md5.webp)

## Managing dependencies

Currently, there are two ways of managing dependencies in a Foundry projects

- Using [Git Submodules](https://git-scm.com/book/en/v2/Git-Tools-Submodules)
- Using [Soldeer](https://soldeer.xyz/) - A Solidity native dependency manager

By default, Foundry uses _Git Submodules_ for managing dependencies. However, I prefer _Solder_ for my EVM repository template because it integrates well with _forge_ - A command-line tool included with Foundry.

## Toolbox overview

Foundry offers a powerful suite of tools to resolve our development development needs:

- [Forge](https://book.getfoundry.sh/forge/) - Builds, tests and deploys EVM smart contracts
- [Cast](https://book.getfoundry.sh/cast/) - Allows interaction with smart contracts, including making calls, sending transactions, and retrieving data.
- [Anvil](https://book.getfoundry.sh/anvil/) - Create local testnet node for deploying and testing smart contracts
- [Chisel](https://book.getfoundry.sh/chisel) - Provides an advanced Solidity REPL for rapid testing of code snippets.

In the scope of this memo, we'll focus on _Forge_ for constructing a template EVM contract repository.

## Showcase preparation

Let's create a fresh repository with the following files and folders:

```
- src
  - contracts
    - IcySwap.sol
  - scripts
    - IcySwap.s.sol
  - test
    - IcySwap.t.sol
- foundry.toml
```

Folder structure explaination:

- src/contracts: Contains all the smart contracts
- src/scripts: Contains all the scripts to interact with the contracts
- src/test: Contains all the test cases
- foundry.toml: Contains the Foundry configurations

### Configure Foundry

To make this guide more practical, a step closer to Mainnet deployments, we'll work on [Base Sepolia testnet](https://sepolia.basescan.org).

If you want to verify your contracts on `Basescan`, you must create a [Block Explorer API Key](https://docs.base.org/quick-start/block-explorer-api-key) and set it in `.env` file.

```
BLOCK_EXPLORER_API_KEY=<YOUR_KEY>
```

Then, insert below code into `foundry.toml` file

```toml
[profile.default]
src = 'contracts'
out = 'out'
script = 'scripts'
libs = ['node_modules', 'dependencies']
test = 'test'
cache_path  = 'cache_forge'

[rpc_endpoints]
base = "https://mainnet.base.org"
base_sepolia = "https://sepolia.base.org"
base_goerli = "https://goerli.base.org"

[etherscan]
base = { key = "${BLOCK_EXPLORER_API_KEY}" }
base_sepolia = { key = "${BLOCK_EXPLORER_API_KEY}" }
base_goerli = { key = "${BLOCK_EXPLORER_API_KEY}" }
```

### Install dependencies

_Make sure you have `Foundry toolchain` installed, if not, please follow [this guide](https://book.getfoundry.sh/getting-started/installation#using-foundryup) to install it._

**Soldeer** is a Solidity native package manager that helps us to manage dependencies in a more efficient way, just like using `npm` in Node.js.

Libraries that we'll use in this tutorial:

- [forge-std](https://v2.soldeer.xyz/project/forge-std) - a collection of helpful contracts and libraries used for writing tests or deployment scripts in native Solidity
- [@openzeppelin-contracts](https://v2.soldeer.xyz/project/@openzeppelin-contracts) - a library for secure smart contract development
  [@openzeppelin-contracts-upgradeable](https://v2.soldeer.xyz/project/@openzeppelin-contracts-upgradeable) - contains upgradeable variant of OpenZeppelin Contracts

**Steps to install above dependencies:**

1/ Append the following code into existing `foundry.toml` file:

```toml
[dependencies]
"@openzeppelin-contracts" = { version = "5.0.2", url = "https://soldeer-revisions.s3.amazonaws.com/@openzeppelin-contracts/5_0_2_14-03-2024_06:11:59_contracts.zip" }
"@openzeppelin-contracts-upgradeable" = { version = "5.0.2", url = "https://soldeer-revisions.s3.amazonaws.com/@openzeppelin-contracts-upgradeable/5_0_2_14-03-2024_06:12:07_contracts-upgradeable.zip" }
forge-std = { version = "1.9.1", url = "https://soldeer-revisions.s3.amazonaws.com/forge-std/v1_9_1_03-07-2024_14:44:59_forge-std-v1.9.1.zip" }
```

2/ Run `forge soldeer install` command to install libraries from `[dependencies]` section.

3/ Replace all content in `remappings.txt` file with the following code:

```bash
@openzeppelin/contracts=dependencies/@openzeppelin-contracts-5.0.2
@openzeppelin-contracts-upgradeable=dependencies/@openzeppelin-contracts-upgradeable-5.0.2
@forge-std=dependencies/forge-std-1.9.1
```

### Prepare some contracts

In this showcase, we'll utilize [IcySwap](https://github.com/dwarvesf/contract-icy-swap/blob/main/contracts/IcySwap.sol) contract, let's create a file called `IcySwap.sol` in `src/contracts` folder.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract IcySwap is Ownable, Pausable, ReentrancyGuard {
    using SafeERC20 for IERC20;

    IERC20 public immutable usdc;
    IERC20 public immutable icy;

    // This conversion is follow usdc decimals: 10**6
    // Let say we want 1 icy equal 2 usdc -> conversion rate should be 2 * 10**6
    uint256 public icyToUsdcConversionRate;

    event Swap(IERC20 indexed fromToken, uint256 indexed fromAmount);
    event ConversionRateChanged(uint256 conversionRate);
    event WithdrawToOwner(IERC20 indexed token, uint256 amount);

    constructor(address initialOwner, IERC20 _usdc, IERC20 _icy, uint256 _conversionRate)
        Ownable(initialOwner)
    {
        usdc = _usdc;
        icy = _icy;
        icyToUsdcConversionRate = _conversionRate;
    }

    // Swap methods
    function swap(uint256 _amountIn) external nonReentrant whenNotPaused {
        uint256 amountOut = (_amountIn * icyToUsdcConversionRate) / (10 ** 18);
        _swap(icy, _amountIn, usdc, amountOut);
        emit Swap(icy, _amountIn);
    }

    // Moderate methods
    function setConversionRate(uint256 _conversionRate) external onlyOwner {
        icyToUsdcConversionRate = _conversionRate;
        emit ConversionRateChanged(_conversionRate);
    }

    function pause() external onlyOwner {
        _pause();
    }

    function unpause() external onlyOwner {
        _unpause();
    }

    function withdrawToOwner(IERC20 _token) external onlyOwner {
        uint256 balance = _token.balanceOf(address(this));
        require(balance > 0, "contract has no balance");
        _token.safeTransfer(msg.sender, balance);
        emit WithdrawToOwner(_token, balance);
    }

    // Internal methods
    function _swap(IERC20 _fromToken, uint256 _fromAmount, IERC20 _toToken, uint256 _toAmount)
        internal
    {
        require(_toToken.balanceOf(address(this)) >= _toAmount, "out of money");
        _fromToken.safeTransferFrom(msg.sender, address(this), _fromAmount);
        _toToken.safeTransfer(msg.sender, _toAmount);
    }
}
```

Next, we'll create 2 sample ERC20 tokens to test our swapping logic.

- Create a file called `ICY.sol` in `src/contracts` folder.

```solidity
//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract IcyToken is ERC20 {
    uint256 constant _initial_supply = 1000000000 * (10 ** 18);

    constructor() ERC20("IcyToken", "ICY") {
        _mint(msg.sender, _initial_supply);
    }

    function mint(address to, uint256 amount) public {
        _mint(to, amount);
    }
}
```

- Create a file called `USDC.sol` in `src/contracts` folder.

```solidity
//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract UsdcToken is ERC20 {
    uint256 constant _initial_supply = 1000000000 * (10 ** 18);

    constructor() ERC20("UsdcToken", "USDC") {
        _mint(msg.sender, _initial_supply);
    }

    function mint(address to, uint256 amount) public {
        _mint(to, amount);
    }
}
```

## The fun part begins

In this part, we'll use `forge-std` library which provides a set of helpful [Cheatcodes](https://book.getfoundry.sh/forge/cheatcodes) to:

- Create test scripts to test `IcySwap` contract.
- Create deployment script to deploy `IcySwap` contract to `Base Sepolia` testnet.

### Testing `IcySwap` contract

Create a file called `IcySwap.t.sol` in `src/test` folder.

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import "@forge-std/src/Test.sol";
import "@forge-std/src/Vm.sol";
import "@forge-std/src/console2.sol";
import "@openzeppelin/contracts/proxy/transparent/ProxyAdmin.sol";
import "@openzeppelin/contracts/proxy/transparent/TransparentUpgradeableProxy.sol";
import "@openzeppelin/contracts/utils/cryptography/EIP712.sol";

import "../contracts/IcySwap.sol";
import "../contracts/ICY.sol";
import "../contracts/USDC.sol";

contract StreamPointsTest is Test {
    IcySwap internal icySwap;
    IcyToken internal icy;
    UsdcToken internal usdc;

    address internal user;
    address internal icySwapOwner;
    address internal ICY_ADDRESS;
    address internal USDC_ADDRESS;

    function setUp() public virtual {
        user = address(1);
        icySwapOwner = address(2);

        icy = new IcyToken();
        usdc = new UsdcToken();

        vm.startPrank(icySwapOwner);
        icySwap = new IcySwap(
            IERC20(address(usdc)),
            IERC20(address(icy)),
            2 * 10 ** 6
        );
        vm.stopPrank();
    }

    function test_swap() public virtual {
        vm.startPrank(user);

        // prepare balance
        icy.mint(user, 150 * 10 ** 18);
        usdc.mint(address(icySwap), 150000 * 10 ** 18);
        icy.approve(address(icySwap), type(uint256).max);

        // start swap
        icySwap.swap(100 * 10 ** 18);

        vm.stopPrank();
        assertEq(
            icy.balanceOf(address(icySwap)),
            100 * 10 ** 18,
            "failed to swap"
        );
    }

    function test_setConversionRate() public virtual {
        vm.prank(icySwapOwner);
        icySwap.setConversionRate(3 * 10 ** 6);
        assertEq(
            icySwap.icyToUsdcConversionRate(),
            3 * 10 ** 6,
            "failed to set conversion rate"
        );
    }

    function test_withdrawToOwner() public virtual {
        vm.startPrank(icySwapOwner);

        icy.mint(address(icySwap), 150 * 10 ** 18);
        icySwap.withdrawToOwner(icy);

        vm.stopPrank();
        assertEq(
            icySwap.icy().balanceOf(address(icySwap)),
            0,
            "failed to withdraw to owner"
        );
    }

    function test_RevertWhen_CallerIsNotOwner() public {
        vm.expectRevert();
        vm.prank(user);
        icySwap.setConversionRate(3 * 10 ** 6);
    }
}
```

**Explaination**

1/ In `setUp()` function, we deploy:

- Use cheatcode `vm.startPrank(icySwapOwner)` to start a transaction from `icySwapOwner` account to deploy `IcySwap` contract.
- Deploy 2 sample ERC20 tokens `ICY` and `USDC` used for `ICY/USDC` pair swapping.

2/ In each test function, we also use cheatcode `vm.startPrank(user)` to start a transaction from `user` account to interact with `IcySwap` contract. Then make assertions to check the expected results using provided methods from `forge-std` library.

**Run the test**

You can run the test with traces by using the following command:

```bash
forge test -vvvv
```

`Traces` is a feature that allows you to see the internal calls of a transaction. It's useful for debugging and understanding how a contract works.
![](assets/using-foundry-for-evm-smart-contract-developement_a5553a471de0e3b37e81f94efdf3f1c6_md5.webp)

### Deploying `IcySwap` contract to `Base Sepolia` testnet

Before deploying `IcySwap` contract to `Base Sepolia` testnet, we need to have following environment variables in `.env` file:

```
WALLET_PRIVATE_KEY=<your_wallet_private_key>
BLOCK_EXPLORER_API_KEY=<your_block_explorer_api_key_from_basescan>
```

Create a file called `IcySwap.s.sol` in `src/scripts` folder with the following content:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import { Script, console2 } from "@forge-std/src/Script.sol";
import "../contracts/IcySwap.sol";

contract IcySwapScript is Script {
    function setUp() public { }

    function run() public {
        uint256 privateKey = vm.envUint("WALLET_PRIVATE_KEY");
        address ICY_ADDRESS= 0x78a3f816a8e26af8c09F6Da3995Ee19bd69bf7fF;
        address USDC_ADDRESS = 0x036CbD53842c5426634e7929541eC2318f3dCF7e;
        vm.startBroadcast(privateKey);

        IcySwap icySwap = new IcySwap(IERC20(USDC_ADDRESS), IERC20(ICY_ADDRESS), 2 * 10**6);

        vm.stopBroadcast();
        console2.log("IcySwap address: ", address(icySwap));
    }
}
```

In above script:

- We can use `vm.envUint()` to get the value of `WALLET_PRIVATE_KEY` environment variable.
- Then, use `vm.startBroadcast()` to start a transaction from the account with the private key to deploy `IcySwap` contract.

Now, we can run the deployment script to deploy & verify our contract, by running:

```bash
forge script scripts/IcySwap.s.sol:IcySwapScript --broadcast --verify --rpc-url base_sepolia
```

And our `IcySwap` contract will be deployed to `Base Sepolia` testnet & will automatically be verified.

![](assets/using-foundry-for-evm-smart-contract-developement_edacb4045a35d14a161b41e829079199_md5.webp)

## Other usages

Foundry is not just be here to resolve our common tasks like compiling, testing and deploying smart contracts. It also provides a lot of other features that can be used to enhance our development workflow. One of them is `Fork testing`.

[Fork testing](https://book.getfoundry.sh/forge/fork-testing) is like a time machine that allows us to test our contracts on a forked mainnet and move to a specific block for testing.

I found an interesting repository that use Foundry to reproduce a lot of DeFi hacked incidents in the past - It's [DeFiHackLabs](https://github.com/SunWeb3Sec/DeFiHackLabs).

## References

- <https://book.getfoundry.sh/getting-started/first-steps>
- <https://milotruck.github.io/blog/Foundry-Cheatsheet/>
- <https://github.com/SunWeb3Sec/DeFiHackLabs>
