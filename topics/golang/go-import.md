---
title: "Go import design: using git repo path"
description: Go’s use of git repository paths as package identifiers is a unique and powerful feature. Unlike most languages that rely on centralized package repositories, Go links directly to git paths.
date: 2024-10-25
authors:
  - tieubao
tags:
  - golang
  - import
redirect:
  - /s/XyFtOA
---

Go’s import system, linked directly to git repository paths, was crucial to its early adoption. Unlike most languages, Go’s approach tightly integrates version control with package management, enhancing developer experience and reusability.

Using the git repository URL as the import path gives each package a unique identity, eliminating namespace conflicts and simplifying dependency management.

Example:

```go
import "github.com/username/projectname/package"
```

This approach avoids complex dependency tools, ensuring packages are isolated and traceable—a simple yet effective structure that keeps Go codebases clean and organized.

### Key benefits

**Global uniqueness**
Git paths give each package a unique identifier (e.g., `github.com/user/repo/package`), avoiding namespace issues, especially in large projects with numerous dependencies.

**Direct version control**
Go modules let developers pin dependencies to specific git tags or commits, achieving reproducible builds without a central registry. Any git repository, public or private, can serve as a Go package source, reducing reliance on third-party registries.

**Modularity and reusability**
Git paths encourage modular, self-contained packages, making code easier to reuse and maintain. Direct links to git repositories also simplify code inspection and troubleshooting.

### Comparison to other languages

Most other languages, like Python, Java, and Ruby, rely on centralized registries (e.g., PyPI, Maven) where packages are fetched by name, often leading to naming conflicts. Go’s git-based identifier, by contrast, provides a direct source link, eliminating centralized naming conventions. Go developers can pull packages directly from repositories, pin versions with `go.mod`, and enjoy simplified, traceable dependency management.

Example `go.mod`:

```go
module myproject

go 1.20

require (
    github.com/user/mathlib v1.3.0
    github.com/otheruser/utils v0.9.2
)
```

Go’s git path-based imports connect package management directly to version control, prioritizing simplicity, clarity, and reusability—key reasons behind Go’s adoption as a preferred language for modular software development.

---

### Go's old $GOPATH story for development and dependencies

[Source](https://utcc.utoronto.ca/~cks/space/blog/programming/GoTheGopathDevelopmentStory)

As people generally tell the story today, [Go](https://golang.org/) was originally developed without support for dependency management. Various community efforts evolved over time and then [were swept away](https://utcc.utoronto.ca/~cks/space/blog/programming/GoIsGooglesLanguage) in 2019 by [Go Modules](https://go.dev/blog/using-go-modules), which finally added core support for dependency management. I happen to feel that this story is a little bit incomplete and sells the original Go developers short, because I think they did originally have a story for how Go development and dependency management was supposed to work. To me, one of the fascinating bits in Go's evolution to modules is how that original story didn't work out. Today I'm going to outline how I see that original story.

In Go 1.0, the idea was that you would have one or more of what are today called [multi-module workspaces](https://go.dev/doc/tutorial/workspaces). Each workspace contained one (or several) of your projects and all of its dependencies, in the form of cloned and checked-out repositories. With separate repositories, each workspace could have different (and independent) versions of the same packages if you needed that, and updating the version of one dependency in one workspace wouldn't update any other workspace. Your current workspace would be chosen by setting and changing `$GOPATH`, and the workspace would contain not just the source code but also precompiled build artifacts, built binaries, and so on, all hermetically confined under its `$GOPATH`.

This story of multiple `$GOPATH` workspaces allows each separate package or package set of yours to be wrapped up in a directory hierarchy that effectively has all of its dependencies 'vendored' into it. If you want to preserve this for posterity or give someone else a copy of it, you can archive or send the whole directory tree, or at least the src/ portion of it. The whole thing is fairly similar to a materialized Python [virtual environment](https://docs.python.org/3/library/venv.html).

(The original version of Go did not default `$GOPATH` to `$HOME/go`, per for example [the Go 1.1 release notes](https://go.dev/doc/go1.1#gocmd). It would take until [Go 1.8 for this default to be added](https://go.dev/doc/go1.8#gopath).)

This story broadly assumes that updates to dependencies will normally be compatible, because otherwise you really want to track the working dependency versions even in a workspace. While you can try to update a dependency and then roll it back (since you normally have its checked out repository with full history), Go won't help you by remembering the identity of the old, working version. It's up to you to dig this out with tools like [the git reflog](https://git-scm.com/docs/git-reflog) or your own memory that you were at version 'x.y.z' of the package before you updated it. And 'go get -u' to update all your dependencies at once only makes sense if their new versions will normally all work.

This story also leaves copying workspaces to give them to someone else (or to preserve them in their current state) as a problem for you, not Go. However, Go did add ['experimental' support for vendoring dependencies](https://go.dev/doc/go1.5) in Go 1.5, which allowed people to create self-contained objects that could be used with 'go get' or other simple repository copying and cloning. A package that had its dependencies fully vendored was effectively a miniature workspace, but this approach had some drawbacks of its own.

I feel this original story, while limited, is broadly not unreasonable. It could have worked, at least in theory, in a world where preserving API compatibility (in a broad sense) is much more common than it clearly is (or isn't) in this one.
