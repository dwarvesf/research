---
title: "Go commentary #18: Fuzz testing Go HTTP services"
short_title: "#18 Fuzz Testing Go HTTP Services"
description: Understanding how to use Fuzz Testing in Go
date: 2024-11-01
authors:
  - fuatto
tags:
  - go-weekly
  - golang
redirect:
  - /s/yq0iSQ
---

## [Fuzz Testing Go HTTP Services](https://packagemain.tech/p/fuzzing-http-services-golang)

Context:

- You can't envision all of the possible inputs your code could receive => You can only find bugs that you expect to find

Solution:

- Since Go 1.18, fuzzing was added to Go's std testing package

```
The steps to create a fuzz test in Go are the following:

In a _test.go file create a function that starts with Fuzz which accepts *testing.F

Add corpus seeds using f.Add() to allow fuzzer to generate the data based on it.

Call fuzz target using f.Fuzz() by passing fuzzing arguments which our target function accepts.

Start the fuzzer using regular go test command, but with the –fuzz=Fuzz flag
```

- Example:

```go
func Equal(a []byte, b []byte) bool {
  for i := range a {
    // can panic with runtime error: index out of range.
    if a[i] != b[i] {
      return false
    }
  }

  return true
}
```

```go
// Fuzz test
func FuzzEqual(f *testing.F) {

  // Seed corpus addition
  f.Add([]byte{'f', 'u', 'z', 'z'}, []byte{'t', 'e', 's', 't'})

  // Fuzz target with fuzzing arguments
  f.Fuzz(func(t *testing.T, a []byte, b []byte) {
    // Call our target function and pass fuzzing arguments
    Equal(a, b)
  })
}
```

- Fuzzing HTTP Services

```go
type Request struct {
  Limit  int `json:"limit"`
  Offset int `json:"offset"`
}

type Response struct {
  Results    []int `json:"items"`
  PagesCount int   `json:"pagesCount"`
}
```

```go
func ProcessRequest(w http.ResponseWriter, r *http.Request) {
  var req Request

  // Decode JSON request
  if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
    http.Error(w, err.Error(), http.StatusBadRequest)
    return
  }

  // Apply offset and limit to some static data
  all := make([]int, 1000)
  start := req.Offset
  end := req.Offset + req.Limit
  res := Response{
    Results:    all[start:end],
    PagesCount: len(all) / req.Limit,
  }

  // Send JSON response
  if err := json.NewEncoder(w).Encode(res); err != nil {
    http.Error(w, err.Error(), http.StatusInternalServerError)
    return
  }

  w.WriteHeader(http.StatusOK)
}
```

```go
func FuzzProcessRequest(f *testing.F) {
  // Create sample inputs for the fuzzer
  testRequests := []Request{
    {Limit: -10, Offset: -10},
    {Limit: 0, Offset: 0},
    {Limit: 100, Offset: 100},
    {Limit: 200, Offset: 200},
  }

  // Add to the seed corpus
  for _, r := range testRequests {
    if data, err := json.Marshal(r); err == nil {
      f.Add(data)
    }
  }

  // Create a test server
  srv := httptest.NewServer(http.HandlerFunc(ProcessRequest))
  defer srv.Close()

  // Fuzz target with a single []byte argument
  f.Fuzz(func(t *testing.T, data []byte) {
    var req Request
    if err := json.Unmarshal(data, &req); err != nil {
      // Skip invalid JSON requests that may be generated during fuzz
      t.Skip("invalid json")
    }

    // Pass data to the server
    resp, err := http.DefaultClient.Post(srv.URL, "application/json", bytes.NewBuffer(data))
    if err != nil {
      t.Fatalf("unable to call server: %v, data: %s", err, string(data))
    }

    defer resp.Body.Close()

    // Skip BadRequest errors
    if resp.StatusCode == http.StatusBadRequest {
      t.Skip("invalid json")
    }

    // Check status code
    if resp.StatusCode != http.StatusOK {
      t.Fatalf("non-200 status code %d", resp.StatusCode)
    }
  })
}
```

```
go test --fuzz=Fuzz -fuzztime=30s
--- FAIL: FuzzProcessRequest (0.02s)
    --- FAIL: FuzzProcessRequest (0.00s)
        runtime error: integer divide by zero
        runtime error: slice bounds out of range
```

Conclusion:

- Can detect hard-to-spot bugs with weird unexpected inputs

---

https://packagemain.tech/p/fuzzing-http-services-golang
