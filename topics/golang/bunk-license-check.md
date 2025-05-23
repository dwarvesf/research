---
title: Bunk license check
description: Glice is a Golang license and dependency checker that lists all dependencies, their usage count, licenses, and saves license files for easy compliance tracking.
date: 2020-02-05
tags:
  - golang
  - license
redirect:
  - /s/jeQW4w
---

## License detector tool: Glice

Golang license and dependency checker. Prints list of all dependencies (both from std and 3rd party), number of times used, their license and saves all the license files in /licenses.

### Build

- Clone Glice to your local workspace: `$go get github.com/ribice/glice`
- Go install to your $GOBIN: `$ go install github.com/ribice/glice`

### Run

`$ glice`
