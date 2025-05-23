---
title: Using Devbox to setup local development environment
description: Expanded section that focuses on Devbox and its practices on setup a local development environment.
date: 2024-06-13
authors:
  - huynguyenh
  - baenv
tags:
  - containerization
  - devbox
  - docker
  - tool
  - virtualization
redirect:
  - /s/V4GrBQ
---

Welcome back to our Devbox series! Previously, we've explored the journey from the early days of virtualization to the widespread adoption of Docker. Finally, we try using Nix and Devbox to enhance software development process. If you need to catch up, you can check out the earlier posts here:

- [Devbox #1: the world before Docker](devbox-a-world-before-docker.md)
- [Devbox #2: our Docker adoption and its challenges](devbox-docker-adoption-and-challenges.md)
- [Devbox #3: the overview into Nix & how we use Devbox @ Dwarves](devbox-nix-and-our-devbox-adoption.md)

Beyond the theories, in this expanded part, we'll show how we use Devbox to create an isolated, reproducible, and portable local development environment.

![](assets/devbox-local-development-env_devbox.gif)

## Engineering = programming + time + people

Programming itself is challenging enough—solving problems by writing code that works. However, engineering extends this challenge: it involves ensuring that code continues to function over time and can be effectively managed and improved by a team of programmers that is changed continuously. This introduces complexities that go beyond initial development. As mentioned in the [What is Software Engineering?](https://research.swtch.com/vgo-eng)

Once the project scales and team grows, the complexity of managing dependencies, tools, and environments also increases. It is an inherent outcome of the collaborative essence of software engineering.

## We can’t control everything manually

Dwarves experienced this complexity firsthand as we welcomed a lot of new talents and projects with varying sizes and tech stacks. Team members are rotated to another project once the current project is done. Because each project has different scales and requirements, each time onboarding happens, team members need to install different tools to begin developing. This situation causes their machine to be filled with a lot of redundant applications and dependencies over time.

Besides, we have no way to track what dependencies are installed or not currently. So we must install them one by one until the project can be executed. You can have your checklist in the _README_. But it just only helps you manually checking it is installed or not, you can’t make sure the installed stuff is compatible with your available applications and you also don’t know the exact version of them. The challenge of managing different tools and dependencies became evident. It forces our members to spend a lot of time setting up new projects under anxiety.

## The road to Devbox

To address this challenge, we adopted several strategies that other successful teams have used. Using containerization tools like Docker can ensure a consistent environment across different projects by packaging applications and their dependencies into isolated containers. Virtual environments and package managers can help manage dependencies specific to each project, reducing conflicts and redundancies. However, Docker images become quite large and unwieldy, making them difficult to manage and distribute efficiently. On the other side, virtual environment and package manager often lack the robustness needed for truly reproducible builds and environments. Finally, we found Nix as a savior.

We took a look at Nix with the expectation of creating a configurable, reproducible, and portable development environment that helps us quickly onboard anybody to any new project with a few simple commands. It also brings an easy way to manage all installed applications in an isolated or semi-isolated environment.

But Nix needs a huge effort to be applied such as separated syntax and mechanisms. It is also too big to serve our purpose. So we need something more simple, and lightweight but can also take advantage of Nix. This is the reason why finally we chose Devbox for a few first experiments. You can read about Devbox [here](devbox-nix-and-our-devbox-adoption.md).

## Devbox simple setup

Our purpose is creating a configurable, isolated, reproducible and portable development environment. So we use Devbox to create an isolated shell in our project root.

```shell
cd way/to/the/project
devbox init
devbox shell --pure
```

In the above commands, when `--pure` is specified, Devbox creates an isolated shell inheriting almost no variables from the current environment. A few variables, in particular `$HOME`, `$USER`, and `$DISPLAY`, are retained.

Once Devbox shell is shown, we can install everything for running our the project including database, git, programming language, code editor, etc. Powered by Nix, Devbox has more than 80,000 packages containing everything you want. You can also specify what is the version that you want when installing it.

```shell
devbox add go@1.21.3
devbox add docker
devbox add docker-compose
devbox add vim
devbox add git
devbox add colima
...
```

After running above commands, the file `devbox.json` in your project root should look like following:

```JSON
{
  "$schema": "<https://raw.githubusercontent.com/jetify-com/devbox/0.10.7/.schema/devbox.schema.json>",
  "packages": [
    "docker@latest",
    "go@1.21.3",
    "docker-compose@latest",
    "git@latest",
    "qemu@latest",
    "vim@latest",
    "vscode@latest",
    "colima@latest"
  ],
  "shell": {
    "init_hook": [
      "echo 'Welcome to devbox!' > /dev/null"
    ],
    "scripts": {
      "test": [
        "echo \\"Error: no test specified\\" && exit 1"
      ]
    }
  }
}
```

You can bring this file to anywhere you want. Once you type `devbox shell`, the exact shell with the same state will be initiated with full installation for all dependencies.

## Bring Devbox to Makefile

To quickly onboarding newbie without any Devbox knowledge, we also trying to turn it to our Makefile as following.

```makefile
shell:
 @if ! command -v devbox >/dev/null 2>&1; then curl -fsSL <https://get.jetpack.io/devbox> | bash; fi
 @devbox install
 @devbox shell

```

With the above simple script, the system firstly checks if Devbox is installed or not. If it is not installed, we try to fetch and install it. Then `devbox install` helps us install all packages mentioned in `devbox.json`. Finally, `devbox shell` starts the shell with ability to inherit your host machine installed things.

Basically, it’s all things that we must do to reach our purpose. But sometimes, edges case still happens. We need some outstanding steps in the first to have a thorough preparation for other people coming later.

## Container runtime configuration

Without container-less purpose, we also need to install container runtime to use `docker-compose` and `docker` in the project. Colima is a nice thing to do it.

There are no problems in the n-time running the Devbox shell. But if it is the first time, we must run the shell with `--pure`. In this situation, we need some small cheats to run Colima.

First is mounting `/usr/bin` to shell `$PATH`, by this way the system can use `sw_vers` to get the environment version. Colima needs this to be started.

```shell
@export PATH=${PATH}:/usr/bin && colima start
```

One more issue comes from Docker config, which is used when running `docker-compose`. We need to cheat by removing `credsStore` in the `~/.docker/config.json`, or installing `osxkeychain` to run Colima normally. You can check [this thread](https://stackoverflow.com/questions/67642620/docker-credential-desktop-not-installed-or-not-available-in-path/72888813#72888813) for more information if you reach this issue.

## Real life usage

You can find a practical example of using Devbox in [our memo repository](https://github.com/dwarvesf/memo.d.foundation). This repository uses Devbox to create an isolated, reproducible, and portable development environment, showcasing how to manage dependencies and streamline development workflows.

## Conclusion

In this installment, we've moved from theory to practice, demonstrating how Devbox creates an isolated, reproducible, and portable development environment. We've shown how to set up Devbox, install dependencies, and integrate it with a Makefile for ease of use. By addressing container runtime challenges, we've ensured a smooth development experience. We hope these insights help streamline your own workflows and enhance your development practices. Thank you for following along, and happy coding!
