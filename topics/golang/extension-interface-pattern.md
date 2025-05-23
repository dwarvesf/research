---
title: Go extension interface pattern
description: Note about using Go extension interface pattern
date: 2024-10-25
authors:
  - tieubao
tags:
  - golang
  - interface
redirect:
  - /s/ctdtVQ
---

The extension interface pattern is when an interface embeds another one. The extension pattern helps to add new features to an existing object without changing its original code.

- Extending third-party packages: When you are working with a third-party package, and you want to add new methods or modify the behavior of existing types without forking or modifying the original package.
- Adding functionality to interfaces: When a package provides a minimal interface and you want to add additional behaviors on top of that without changing the underlying implementation.
- Testing: You can use the extension interface pattern to mock or adapt behaviors of a type for testing purposes, adding features like logging, metrics, or other cross-cutting concerns.

Whether you are working with the standard library (`io`, `http`, `sql`), third-party packages, or your own codebase, this pattern provides a way to add functionality in a flexible, non-intrusive manner.

### 1. **Extending `io.Reader` and `io.Writer`**

The `io.Reader` and `io.Writer` interfaces are simple but versatile interfaces that are widely used in Go. You can extend them to add features like compression, encryption, logging, or even buffering.

**Example: adding logging to an `io.Writer`**

Let’s say you want to add logging functionality to an `io.Writer`. You can use the extension interface pattern to wrap an existing `io.Writer` and log any data written to it.

```go
type LoggingWriter struct {
    io.Writer  // Embed the original io.Writer
}

func (lw LoggingWriter) Write(p []byte) (n int, err error) {
    fmt.Printf("Writing %d bytes: %s\n", len(p), string(p))  // Log the write
    return lw.Writer.Write(p)  // Call the original Write method
}
```

Usage:

```go
func main() {
    var writer io.Writer = LoggingWriter{Writer: os.Stdout}

    writer.Write([]byte("Hello, World!"))
    // Output:
    // Writing 13 bytes: Hello, World!
    // Hello, World!
}
```

This allows you to add logging to any writer without modifying the original `io.Writer` type.

### 2. **Extending HTTP middleware in `http.Handler`**

In web development with Go, the `http.Handler` interface is central to building web servers. It’s common to use the extension interface pattern to create middleware that extends the behavior of `http.Handler`.

**Example: Adding a request logger middleware**

You can create middleware that wraps an `http.Handler` to log HTTP requests.

```go
type LoggingMiddleware struct {
    handler http.Handler
}

func (lm LoggingMiddleware) ServeHTTP(w http.ResponseWriter, r *http.Request) {
    fmt.Printf("Received request: %s %s\n", r.Method, r.URL.Path)  // Log request
    lm.handler.ServeHTTP(w, r)  // Call the original handler
}
```

Usage:

```go
func main() {
    originalHandler := http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        w.Write([]byte("Hello, World!"))
    })

    loggingHandler := LoggingMiddleware{handler: originalHandler}
    http.ListenAndServe(":8080", loggingHandler)
}
```

This example extends `http.Handler` to log incoming requests, wrapping the original handler without modifying it.

### 3. **Extending `sql.DB` for database connections**

You can extend the `sql.DB` type from Go’s `database/sql` package to add functionalities like logging, connection retries, or metrics tracking.

**Example: Adding query logging to `sql.DB`**

```go
type LoggingDB struct {
    *sql.DB  // Embed the original sql.DB
}

func (ldb LoggingDB) Query(query string, args ...interface{}) (*sql.Rows, error) {
    fmt.Printf("Executing query: %s\n", query)  // Log the query
    return ldb.DB.Query(query, args...)
}
```

Usage:

```go
func main() {
    db, _ := sql.Open("mysql", "user:password@tcp(127.0.0.1:3306)/dbname")

    loggingDB := LoggingDB{DB: db}
    loggingDB.Query("SELECT * FROM users")
}
```

This extension allows you to log SQL queries without altering the behavior of `sql.DB`.

### 4. **Adding caching to HTTP clients**

Go’s `http.Client` is a widely used type for making HTTP requests. You can extend `http.Client` to add caching, retries, or additional logging.

**Example: adding caching to an `http.Client`**

You can wrap an `http.Client` to cache responses based on URLs.

```go
type CachingClient struct {
    client   *http.Client
    cache    map[string]*http.Response
}

func (cc *CachingClient) Do(req *http.Request) (*http.Response, error) {
    if cachedResp, ok := cc.cache[req.URL.String()]; ok {
        fmt.Println("Returning cached response")
        return cachedResp, nil
    }

    resp, err := cc.client.Do(req)
    if err == nil {
        cc.cache[req.URL.String()] = resp
    }
    return resp, err
}
```

Usage:

```go
func main() {
    httpClient := &http.Client{}
    cachingClient := &CachingClient{
        client: httpClient,
        cache:  make(map[string]*http.Response),
    }

    req, _ := http.NewRequest("GET", "http://example.com", nil)
    cachingClient.Do(req)  // Fetches from the internet and caches the result
    cachingClient.Do(req)  // Uses the cached result
}
```

This allows you to extend the functionality of the `http.Client` without altering the original type, adding caching behavior.

### 5. **Adding context or timeouts to `http.Request`**

Go's `http.Request` does not have built-in timeout functionality, but you can extend the `http.Request` type to add it.

**Example: timeout extension for `http.Request`**

```go
type TimeoutRequest struct {
    req *http.Request
    timeout time.Duration
}

func (tr *TimeoutRequest) Do(client *http.Client) (*http.Response, error) {
    ctx, cancel := context.WithTimeout(tr.req.Context(), tr.timeout)
    defer cancel()

    reqWithTimeout := tr.req.WithContext(ctx)
    return client.Do(reqWithTimeout)
}
```

Usage:

```go
func main() {
    req, _ := http.NewRequest("GET", "http://example.com", nil)
    timeoutReq := &TimeoutRequest{
        req:     req,
        timeout: 2 * time.Second,
    }

    client := &http.Client{}
    timeoutReq.Do(client)  // The request will timeout after 2 seconds
}
```

This allows you to extend `http.Request` with timeout functionality without modifying the original type.

### 6. **Decorators for `fmt.Stringer`**

Go’s `fmt.Stringer` is a simple but powerful interface used for customizing string representations of types. You can use the extension interface pattern to add additional behaviors when printing.

**Example: Add a prefix to `fmt.Stringer`**

You can wrap a `fmt.Stringer` type to add a prefix to its string representation.

```go
type PrefixedStringer struct {
    prefix string
    fmt.Stringer
}

func (ps PrefixedStringer) String() string {
    return ps.prefix + ps.Stringer.String()
}
```

Usage:

```go
type User struct {
    Name string
}

func (u User) String() string {
    return u.Name
}

func main() {
    user := User{Name: "John"}
    prefixedUser := PrefixedStringer{prefix: "User: ", Stringer: user}

    fmt.Println(prefixedUser.String())  // Output: User: John
}
```

This wraps the original `fmt.Stringer` and adds a prefix to the output.

---

That's good as far as it goes, but I think the key part of extension interfaces is why they're useful and how they're used -- they can add optional functionality to an API which (according to the statically-checked type signature) only takes the "base" interface.

For example, [io.WriteString](https://golang.org/pkg/io/#WriteString) is one of the simplest examples of an extension interface: it takes a plain io.Writer, but if that writer has been extended to support the `io.StringWriter` interface (i.e., has the `WriteString` method), it will use that for efficiency, otherwise fall back to the regular Write method which all io.Writer implementations have.

Sticking with your `File` / `ReadDirFile` example, the `fs.Open` method returns a plain File, but if the "file" is actually a directory, you can convert it to a `ReadDirFile` and use the `ReadDir` extension method. Something like:

```go
f, _ := fs.Open("dir_or_file") // in real life, handle errors
st, _ := f.Stat()
if st.IsDir() {
    // f is a directory
    d := f.(ReadDirFile)
    d.ReadDir(10)
} else {
    // f is a normal file
}
```

As an alternative to calling st.IsDir() (and what would probably be more typical for extension interfaces), you could just check whether the file implements the interface directly, like so:

```go
f, _ := fs.Open("dir_or_file")
if d, ok := f.(ReadDirFile); ok {
    // f is a directory
    d.ReadDir(10)
} else {
    // f is a normal file
}
```

[Source](https://www.reddit.com/r/golang/comments/i6yehu/what_is_the_extension_interface_pattern_in_go/)
