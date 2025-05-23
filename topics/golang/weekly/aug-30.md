---
title: "Go commentary #9: TinyGo, SQLite vector search, and authorization"
short_title: "#9 TinyGo, SQLite vector search, and Permify"
description: "Exploring TinyGo's latest release, a new vector search extension for SQLite, and an open-source authorization service inspired by Google Zanzibar."
date: 2024-08-30
authors:
  - fuatto
tags:
  - networking
  - go-weekly
  - golang
redirect:
  - /s/vXj6qw
---

## [TinyGo 0.33.0: The Go Compiler for 'Small Places'](https://github.com/tinygo-org/tinygo/releases/tag/v0.33.0)

- Context:

  - TinyGo is a Go compiler designed for small environments like microcontrollers, WebAssembly (wasm/wasi), and command-line tools.

  - It utilizes Go language libraries and LLVM to offer an alternative method for compiling Go programs

- Changelog highlights:

  - **Go 1.23 support** (including the new range-over-func language feature)
  - ...

## [sqlite-vec: A Vector Search Extension for SQLite](https://github.com/asg017/sqlite-vec)

- Context:

  - An extremely small, "fast enough" vector search SQLite extension that runs anywhere.
    - Store and query float, int8, and binary vectors in vec0 virtual tables
    - Written in pure C, no dependencies, runs anywhere SQLite runs (Linux/MacOS/Windows, in the browser with WASM, Raspberry Pis, etc.)
    - Pre-filter vectors with rowid IN (...) subquerie

- Usage:

```
go get -u github.com/asg017/sqlite-vec-go-bindings/ncruces
```

```go
package main

import (
	_ "embed"
	"log"

	_ "github.com/asg017/sqlite-vec-go-bindings/ncruces"
	"github.com/ncruces/go-sqlite3"
)

func main() {
	db, err := sqlite3.Open(":memory:")
	if err != nil {
		log.Fatal(err)
	}

	stmt, _, err := db.Prepare(`SELECT vec_version()`)
	if err != nil {
		log.Fatal(err)
	}

	stmt.Step()
	log.Printf("vec_version=%s\n", stmt.ColumnText(0))
	stmt.Close()
}
```

```sql
.load ./vec0

create virtual table vec_examples using vec0(
  sample_embedding float[8]
);

-- vectors can be provided as JSON or in a compact binary format
insert into vec_examples(rowid, sample_embedding)
  values
    (1, '[-0.200, 0.250, 0.341, -0.211, 0.645, 0.935, -0.316, -0.924]'),
    (2, '[0.443, -0.501, 0.355, -0.771, 0.707, -0.708, -0.185, 0.362]'),
    (3, '[0.716, -0.927, 0.134, 0.052, -0.669, 0.793, -0.634, -0.162]'),
    (4, '[-0.710, 0.330, 0.656, 0.041, -0.990, 0.726, 0.385, -0.958]');


-- KNN style query
select
  rowid,
  distance
from vec_examples
where sample_embedding match '[0.890, 0.544, 0.825, 0.961, 0.358, 0.0196, 0.521, 0.175]'
order by distance
limit 2;
/*
┌───────┬──────────────────┐
│ rowid │     distance     │
├───────┼──────────────────┤
│ 2     │ 2.38687372207642 │
│ 1     │ 2.38978505134583 │
└───────┴──────────────────┘
*/
```

## [Permify 1.0: Open Source Authorization as a Service](https://github.com/Permify/permify)

- Permify is an open-source authorization as a service inspired by [Google Zanzibar](https://storage.googleapis.com/pub-tools-public-publication-data/pdf/41f08f03da59f5518802898f68730e247e23c331.pdf).

- **Centralize & standardize your authorization**: Abstract your authorization logic from your codebase and application logic to easily reason, test, and debug your authorization. Behave your authorization as a sole entity and move faster with in your core development.

- **Build granular permissions for any case you have**: You can create granular (resource-specific, hierarchical, context aware, etc) permissions and policies using Permify's domain specific language that is compatible with RBAC, ReBAC and ABAC.

- **Set authorization for your tenants by default**: Set up isolated authorization logic and custom permissions for your vendors/organizations (tenants) and manage them in a single place.

- **Scale your authorization as you wish**: Achieve lightning-fast response times down to 10ms for access checks with a proven infrastructure inspired by Google Zanzibar.

---

- https://github.com/tinygo-org/tinygo/releases/tag/v0.33.0
- https://github.com/asg017/sqlite-vec
- https://github.com/Permify/permify/releases/tag/v1.0.0
- https://storage.googleapis.com/pub-tools-public-publication-data/pdf/41f08f03da59f5518802898f68730e247e23c331.pdf
