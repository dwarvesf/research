---
title: What is PNPM compare to NPM/Yarn
description: "PNPM is a package manager for Node.js which stands for “Performant NPM”. It was introduced in 2016, the same year Yarn was released. PNPM is a fast, disk space efficient package manager that supports monorepos. It creates a non-flat `node_modules` by default, so code has no access to arbitrary packages."
date: 2023-04-11
authors:
  - toanbku
tags:
  - engineering
  - frontend
  - web
redirect:
  - /s/AJtUfQ
---

## What is PNPM?

![](assets/what-is-pnpm-compare-to-npmyarn_0f651d536ab6e1811cdf37eb2b15550d_md5.webp)

_Researching PNPM was originally from research on what package manager **[Next.js](https://github.com/vercel/next.js/)** uses. We then tried to experiment with it for **[dwarves/react-toolkit](https://github.com/dwarvesf/react-toolkit/pull/46)**, which has given us some insights into some of the cost-benefits of using the package manager._

## Introduction

PNPM is a package manager for Node.js which stands for “Performant NPM”. It was introduced in 2016, the same year Yarn was released. PNPM is a fast, disk space efficient package manager that supports monorepos. It creates a non-flat `node_modules` by default, so code has no access to arbitrary packages. PNPM performs installation in three stages:

1. **Dependency resolution **- The package manager identifies and fetches all required dependencies to the store.
2. **Directory structure calculation** - Based on these dependencies, it calculates the layout of the `node_modules` directory.
3. **Linking dependencies** - it retrieves and establishes hard links from the store to `node_modules` for all remaining dependencies.

## Advantages of PNPM

PNPM is a very performant alternative to most package managers. Here are a few advantages of using PNPM:

- Saves disk space by using a content-addressable store for packages
- Boosts installation speed with a three-stage process
- Creates a non-flat node_modules directory for larger projects

### Saving disk space

Supposing you have 10 Node.js projects on your personal computer if you use NPM/Yarn, you will have 10 `node_modules` folders with a heavy size.

If you use PNPM, things will be different. It introduces a new concept to us, called a _content-addressable store_. See the image below:

![](assets/what-is-pnpm-compare-to-npmyarn_949760adee1b7a897e0b53044b7b0a89_md5.webp)

As you can see, PNPM does not store packages in the `node_modules` folder, but rather in the content-addressable store. Therefore, in the `node_modules` folders of projects using PNPM, the packages are _linked_ from the global store.

Thanks to this, package versions are only stored once on the disk

### **Boosting installation speed\*\***[](https://pnpm.io/motivation#boosting-installation-speed)\*\*

PNPM performs installation in three stages:

1. Dependency resolution: identifying and obtaining all necessary dependencies for the store.
2. Directory structure calculation: determining the layout of the `node_modules` directory based on these dependencies.
3. Linking dependencies: retrieving and establishing hard links from the store to `node_modules` for all remaining dependencies.

![](assets/what-is-pnpm-compare-to-npmyarn_4cde4958507a5ac4d8e7d614175b57de_md5.webp)

This approach is significantly faster than the conventional method of identifying, obtaining, and saving all dependencies directly to the `node_modules` directory.

![](assets/what-is-pnpm-compare-to-npmyarn_acaaed15e34c391a1ff6b81bbbf6163f_md5.webp)

### Creating a non-flat node_modules [directory](https://pnpm.io/motivation#creating-a-non-flat-node_modules-directory)

First of all, we must ask why NPM chooses the flat `node_modules` structure approach.

Going back in time, before the release of NPM version 3, at this point, `node_modules` in NPM were still in a non-flat structure. As shown in the example below:

```javascript
node_modules
└─ foo
   ├─ index.js
   ├─ package.json
   └─ node_modules
      └─ bar
         ├─ index.js
         └─ package.json
```

This approach has some issues such as:

- The issue of long directory paths on the Windows operating system occurred because the package created a dependency tree that was too deep
- Packages were copy-pasted in many places because they were required in different dependencies

Therefore, to solve this problem, NPM decided to flatten `node_modules`. After NPM version 3, the structure of the `node_modules` directory will become like this:

```javascript
node_modules
├─ foo
|  ├─ index.js
|  └─ package.json
└─ bar
   ├─ index.js
   └─ package.json
```

Consequently, the source code can access dependencies that are not explicitly declared in the project. Following the example above, even though the project only uses the **foo** package, we can completely use the **bar** package without declaring it in package.json.

Unlike NPM version 3, PNPM tries to solve the issues without flattening the dependency tree. Follow the example below:

```javascript
node_modules
├─ foo -> .registry.npmjs.org/foo/1.0.0/node_modules/foo
└─ .registry.npmjs.org
   ├─ foo/1.0.0/node_modules
   |  ├─ bar -> ../../bar/2.0.0/node_modules/bar
   |  └─ foo
   |     ├─ index.js
   |     └─ package.json
   └─ bar/2.0.0/node_modules
      └─ bar
         ├─ index.js
         └─ package.json
---------------------------------------
->: a symlink (or junction on Windows)
```

The **foo** package still contains its dependency **bar** in the form of a symlink. And what’s special is that **foo** doesn’t have `node_modules` inside, this way the dependency tree of **foo** won’t be as deep as in NPM before the release of v3.

At first glance, the structure may seem complicated, but when working on larger projects you will see that this structure is clearer than NPM/Yarn

## Disadvantages of PNPM

However, there are a few disadvantages of using PNPM. One of them is that it can be slower than other package managers like Yarn or NPM when installing packages for the [first time](https://medium.com/@buffet_time/why-you-should-move-to-pnpm-82962f332418). It can also be difficult to use with some build tools like [Webpack](https://dev.to/stackblitz/what-is-pnpm-and-is-it-really-so-fast-and-space-efficient-29la).

PNPM's node_modules layout uses [symbolic links to create a nested structure of dependencies](https://pnpm.io/symlinked-node-modules-structure). This has some implications for certain setups, where Windows machines or certain permissioned Linux environments may have trouble accessing these links.

Another potential issue with PNPM is that its nested dependency structure may not be compatible with certain older packages. [This can cause issues when trying to install packages that have dependencies that are not compatible with PNPM’s nested structure](https://pnpm.io/limitations).

## **Showcase**

Thankfully, PNPM is employed by numerous large companies, demonstrating its effectiveness. For an updated list, you can visit [https://pnpm.io/users](https://pnpm.io/users).

![](assets/what-is-pnpm-compare-to-npmyarn_55e4a8514dc89f283ed5e6b77d839d42_md5.webp)

## Conclusion

PNPM is a package manager for Node.js that offers several advantages over other popular package managers, including saving disk space and boosting installation speed. It also creates a non-flat `node_modules` directory, which can be helpful for larger projects. However, there are some potential disadvantages to using PNPM, such as compatibility issues with certain older packages and slower initial package installation times. Despite these drawbacks, PNPM is used by numerous large companies and may be worth considering for your own projects.

Overall, PNPM offers some unique benefits and is a viable alternative to other package managers for Node.js. It's worth exploring whether it's the right choice for your specific use case.

## References:

- [https://pnpm.io/motivation](https://pnpm.io/motivation)
- [https://blog.bitsrc.io/pnpm-javascript-package-manager-4b5abd59dc9](https://blog.bitsrc.io/pnpm-javascript-package-manager-4b5abd59dc9)
- [https://pnpm.io/faq#what-does-pnpm-stand-for](https://pnpm.io/faq#what-does-pnpm-stand-for)
- [https://medium.com/pnpm/why-should-we-use-pnpm-75ca4bfe7d93](https://medium.com/pnpm/why-should-we-use-pnpm-75ca4bfe7d93)
- [https://medium.com/@buffet_time/why-you-should-move-to-pnpm-82962f332418](https://medium.com/@buffet_time/why-you-should-move-to-pnpm-82962f332418)
- [https://dev.to/stackblitz/what-is-pnpm-and-is-it-really-so-fast-and-space-efficient-29la](https://dev.to/stackblitz/what-is-pnpm-and-is-it-really-so-fast-and-space-efficient-29la)
- [https://refine.dev/blog/pnpm-vs-npm-and-yarn/](https://refine.dev/blog/pnpm-vs-npm-and-yarn/)
