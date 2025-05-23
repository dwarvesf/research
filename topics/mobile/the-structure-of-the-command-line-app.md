---
title: The structure of the command line app
description: Learn how to build powerful Xcode command line tools using Swift, covering CLI app structure, commands, options, flags, and creating custom build tools for automation and safer coding.
date: 2022-09-18
github_id: viettrungphan
redirect:
  - /s/XBnGdQ
---

## How to create an XCode build tools with Swift

As a developer, we are using command line tool apps frequently, like for simple tasks such as: navigation between directories with `cd /Desktop`, making a new folder with `mkdir newfolder` , deleting files with `rm -f filename` - as well as friendly GIT commands: `git checkout master`, `git pull`, etc. Command line tools are easy to use, very lightweight and run very fast, by avoiding to use a full user interface.

A lot of them are built directly in your machine. You can easly find them in the following paths: `/usr/bin` and `/usr/local/bin`

Command line tools are powerful and flexible. Not only can we use it directly in the `Terminal`, we can also embed it to support automation tasks, create build tools, release tools (like Jenkin, Fastlane...), or wrap it to use with any language and create friendly user interfaces (e.g: GitHub Desktop, Source tree...). The limitation of command line tools is just your imagination.

This is an introductory part in a series of notes regarding CommandLine tools. At the end of this series, we will have sample CommandLine tools that can automatically convert all assert catalogs in the Xcode project to a Swift file to eliminate typing errors, get free benefits of SDK auto completion, and take advantage of the Compiler to safety check all asserts at compile time.

Not only applicable to XCode, the SwiftCLI can be used anywhere by mixing in a `shell` script.

In this series of `Command line tools`, we cover through three main topics:

    1. The structure of the CommandLine tool app.
    2. Build a CommandLine app using Swift.
    3. Create an XCode build tools using Swift CLI.

## The structure of the CommandLine tool app

`command [arguments] [options] [flag]`

Ex: `git push origin master -f`

### Command

`command` is the beginning or start of a CLI command, we also call it the main command, because we have a subcommand and default command later. Think it like the way we open an app.

Ex: `git, cd, ls, mkdir` are very popular commands.

_Note: Somewhere may call the main command as `app` and subcommand as `command`_

### Arguments

`arguments` are used to pass data to commandline app.

`command arg1 arg2`

The position of arguments are not arbitrary and we cannot change it.

Ex: `adb push /User/Download/sample.ipk /installs`

The Android NDK `adb push` populates a sample package from the `/User/Download` folder to the device `/installs` folder. You can't swap position of args here.

They may or not be required. If not, a default value will be applied.

Ex: We are in master branch, default remote is origin and run:

`git fetch` => fetch default remote origin branch, it equal with:
`git fetch origin` fetch the remote origin (master) branch.

In this example, the above argument `origin` is not required and is automatically set based on the current checkout branch.

### Options

`Options` are named parameters that can be passed to a command and are represented by key-value pairs.

`Options` are generally preceded by a hyphen (-), and for most commands, more than one option can be strung together.

`Options` position is not important.

If the parameter is required, using `Arguments` instead.

`command -[option][option][option]`

Ex: `git commit --message "commit message"`

`--message` is the key and `"commit message"` is the value.

### Flag

Flag is the 'Options' that don't required value

Ex: `git push -f`. `-f` is the optional to tell we want force push, ignore and replace all contents of the current remote brand.

### Long and sort options

Unlike `Arguments` using its position to determine what the argument is intended for, the position of `Optional` does not matter. We use 'Key' to filter the type of Option, hence the name may be long to type.

To quick and easy to type we can add a shorter version of the 'Key' with Flags

Ex:

- `git push --force` or `git push -f`,
- `npm install --help`

Here we can see many forms of `--help` flag like: `-h, -?, -H`, that is the shorter version of `--help`.

### The subcommands

The CommandLine tool app usually have many features, is easy to use, and especially uses subcommands to separate intent.

A subcommand is passed following the main command. It has its own set of `Option(s)` and `Flag(s)`.

Ex:

- `git checkout`
- `git commit`

`checkout` and `commit` are two subcommands of the main command `git`.

The subcommand `commit` has an `optional` message flag `-m` (`git commit -m "Hello"`), whereas `checkout` does not have this. That is they their own respective `Options` and `Flags`.

Using subcommands are not only easy to use and read, but also helps us to easily learn how to use it with through relative `--help` flags instead of printing the entire manual and having us to lookup very long texts.

The `Help` command and related flags will be covered later.

### The default command

The default command is the command called when you pass nothing to the app.

Ex: `git`
will print out the help which is equivalent with `git help`. `help` is very popular default command for many CLI app.

```shell
git                                                                                                                            [20:13:35]
usage: git [--version] [--help] [-C <path>] [-c <name>=<value>]
           [--exec-path[=<path>]] [--html-path] [--man-path]
........
```

### The `help` command/flags for documentation

The lack of a user interface means we require some guide on how to use the command line app.
There are 2 types of help: the subcommand and the flag.

**[command `help`]**

This `help` subcommand usually used when you start out with a new CLI app. It will print out details on how to use the app, all the commands, subcommands, options, and flags.

Ex: `git help`

```shell
git help                                                                                                     [13:27:57]
usage: git [--version] [--help] [-C <path>] [-c <name>=<value>]
           [--exec-path[=<path>]] [--html-path] [--man-path] [--info-path]
           [-p | --paginate | -P | --no-pager] [--no-replace-objects] [--bare]
           [--git-dir=<path>] [--work-tree=<path>] [--namespace=<name>]
           [--super-prefix=<path>] [--config-env=<name>=<envvar>]
           <command> [<args>]

These are common Git commands used in various situations:

start a working area (see also: git help tutorial)
   clone     Clone a repository into a new directory
   init      Create an empty Git repository or reinitialize an existing one
...........
```

**[command [subcommand] [option] `-h`]**

The `--help` `-h` `-?` or `-H` flags depends on the app, like `git checkout -h`, to provide the help as a Subcommand/Options. These flags print out the guide for the related command/optional only. It's to save you from digging in the whole manual of the main app.

When you type in the wrong command, option, flag, the help may also automatically print out to show us how to use related function.

Ex: `git commit ---m`. We don't have any flag `---m` it should be `-m` for commit message.

```shell
git commit ---m                                                                                              [13:01:13]
error: unknown option `-m'
usage: git commit [<options>] [--] <pathspec>...

    -q, --quiet           suppress summary after successful commit
    -v, --verbose         show diff in commit message template

Commit message options
    -F, --file <file>     read message from file
    --author <author>     override author for commit
    --date <date>         override date for commit
    -m, --message <message>
                          commit message
............
```

_Note: The inclusion of `help` is not required, but is highly recommended to have it in your CLI app._

## Reference

- <https://dev.to/paulasantamaria/command-line-interfaces-structure-syntax-2533>
