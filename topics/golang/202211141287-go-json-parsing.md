---
title: "Go JSON parser: number <-> interface"
description: TLDR; be careful when using  map[string]interface{} to hold json number value, use custom decoder with newDecoder.UseNumber() to decode the json string.
date: 2022-11-14
authors:
  - vdhieu
discord_channel: engineering
discord_id: "hieuvd#4261"
tags:
  - decoder
  - backend
  - golang
  - json
redirect:
  - /s/vcGV8Q
---

### Go JSON parser: number <-> interface

**TLDR**; be careful when using map[string]interface{} to hold json number value, use custom decoder with newDecoder.UseNumber() to decode the json string.

The problem

```go
type payload struct { ID int64 `json:"id"` }
p := payload{ ID: 98470950831393239 }

raw, _ := json.Marshal(p)
fmt.Printf("version1 is %s\n", raw) // {"id":98470950831393239}

var obj map[string]interface{}
json.Unmarshal(raw, &obj) // id will be parsed as float64
interfaceRaw, _ := json.Marshal(obj)
fmt.Printf("version2 is %s\n", interfaceRaw) // {"id":98470950831393230 }
```

Why
The issue caused by default Go uses float64 for interface{} parsing
Ref: https://cs.opensource.google/go/go/+/refs/tags/go1.19.3:src/encoding/json/decode.go;l=844;drc=a11cd6f69aec5c783656601fbc7b493e0d63f605

Solution
To resolve we need custom decoder with UseNumber

```go
var obj map[string]interface{}
decoder := json.NewDecoder(strings.NewReader(string(raw)))
decoder.UseNumber()
decoder.Decode(&obj)
interfaceRaw, _ := json.Marshal(obj)
fmt.Printf("version2 is %s\n", interfaceRaw) // {"id":98470950831393239 }
```
