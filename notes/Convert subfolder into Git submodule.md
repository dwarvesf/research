---
title: null
description: null
date: null
tags:
  - git
redirect:
  - /s/MkiIOA
---

Clone new repository

```shell
$ git clone --no-hardlinks original-repo copied-repo
```

Filter out the files you want to keep and remove the others

```shell
$ cd copied-repo
$ git filter-branch --subdirectory-filter sub/module/path HEAD -- --all
$ git reset --hard
$ git gc --aggressive
$ git prune
$ git remote rm origin
```

Push the new repositories to the upstream server

```shell
$ git remote add origin git@github.com:korya/submodule-repo.git
```

Add the new repository as submodules to the original repository

```shell
$ cd original-repo
$ git rm -r sub/module/path
$ git commit -m "Removing the folders that are now repositories"
$ git submodule add git@github.com:korya/submodule-repo.git sub/module/path
$ git submodule init
$ git submodule update
$ git add .gitmodules sub/module/path
$ git commit -m "Added in submodules for removed folders"
```

---

#### Reference

- https://gist.github.com/korya/9047870
