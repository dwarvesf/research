---
title: "Go commentary #19: Writing secure Go code"
short_title: "#19 Writing secure Go code"
description: Pratices to write secure Go code
date: 2024-11-08
authors:
  - fuatto
tags:
  - go-weekly
  - golang
redirect:
  - /s/lwCnfw
---

## [Writing secure Go code](https://jarosz.dev/article/writing-secure-go-code/)

**Context**:

What does it mean to keep security in mind when writing Go code?

**Solution**:

Answer these questions:

    - How do we stay informed about the Go security announcements?
    - How do we keep our Go code patched and up to date?
    - How do we test our Go code focusing on security and robustness?
    - What are CVEs, and where do we learn about the most common software vulnerabilities?

How do we stay informed about the Go security announcements?

- Subscribe to `golang-announce@googlegroups.com` to get all critical security information right from the source.

How do we keep our Go code patched and up to date?

- Keeping Go version up to date: even though we don’t use the latest and greatest language features, bumping the Go version gives us all security patches for discovered vulnerabilities. Also, the new Go version ensures compatibility with newer dependencies. It protects our applications from potential integration issues.

- Check accordingly which security issues and CVEs addressed in what Go releases and update `go.mod`.

- Check for compatibility and dependency problems.

How do we test our Go code focusing on security and robustness?

- Use Go tooling for static code analysers:

  - Old school `go vet` to detect syntax errors, unused variables, unreachable areas of codebase, goroutine mistakes...

  - `staticcheck`

    ```
    go install honnef.co/go/tools/cmd/staticcheck@latest
    ```

    e.g: test on NGIX Agent cloned repo

    ```
    ➜  agent git:(main) ✗ staticcheck ./...
    ```

    to detect packages, methods or functions are deprecated:

    ```bash...
    src/core/metrics/sources/cpu.go:111:9: times.Total is deprecated: Total returns the total number of seconds in a CPUTimesStat Please do not use this internal function. (SA1019)
    ...
    test/component/nginx-app-protect/monitoring/monitoring_test.go:15:8: "github.com/golang/protobuf/jsonpb" is deprecated: Use the "google.golang.org/protobuf/encoding/protojson" package instead. (SA1019)
    ```

    to detect unused variables and fields:

    ```bash
    src/core/metrics/sources/nginx_plus.go:74:2: field endpoints is unused (U1000)
    src/core/metrics/sources/nginx_plus.go:75:2: field streamEndpoints is unused (U1000)
    src/core/metrics/sources/nginx_plus_test.go:94:2: var availableZones is unused (U1000)
    ```

    to detect code quality problems:

    ```bash
    src/core/nginx.go:791:4: ineffective break statement. Did you mean to break out of the outer loop? (SA4011)
    ```

  - `golangci-lint`

    ```
    go install github.com/golangci/golangci-lint/cmd/golangci-lint@latest
    ```

    e.g: test on NGIX Agent cloned repo

    ```
    ➜  agent git:(main) ✗ golangci-lint run ./...
    ```

    suggestions for improving the code:

    ```
    src/extensions/nginx-app-protect/monitoring/processor/nap_test.go:60:14: S1025: the argument is already a string, there's no need to use fmt. Sprintf (gosimple)
    logEntry: fmt.Sprintf(`%s`, func() string {
    ^
    ```

    ```
    src/plugins/common.go:85:5: S1009: should omit nil check; len() for []string is defined as zero (gosimple)
    if loadedConfig.Extensions != nil && len(loadedConfig.Extensions) > 0 {
        ^
    ```

  - Detect race conditions

    ```
    go test -race
    ```

- Scanning source code for vulnerabilities

  - `govulncheck`

    ```
    go install golang.org/x/vuln/cmd/govulncheck@latest
    ```

    ```
      ➜  habit git:(main) ✗ govulncheck
      No vulnerabilities found.
    ```

    ```
    ➜  habit git:(main) ✗ govulncheck -mode binary -show verbose habit
    ```

    ```
    Scanning your binary for known vulnerabilities...

    Fetching vulnerabilities from the database...

    Checking the binary against the vulnerabilities...

    === Symbol Results ===

    No vulnerabilities found.

    === Package Results ===

    Vulnerability #1: GO-2023-2186
        Incorrect detection of reserved device names on Windows in path/filepath
      More info: https://pkg.go.dev/vuln/GO-2023-2186
      Standard library
        Found in: path/filepath@go1.20.5
        Fixed in: path/filepath@go1.20.11

    === Module Results ===

    Vulnerability #1: GO-2024-3107
        Stack exhaustion in Parse in go/build/constraint
      More info: https://pkg.go.dev/vuln/GO-2024-3107
      Standard library
        Found in: stdlib@go1.20.5
        Fixed in: stdlib@go1.22.7
    ...

    Vulnerability #18: GO-2023-1878
        Insufficient sanitisation of Host header in net/http
      More info: https://pkg.go.dev/vuln/GO-2023-1878
      Standard library
        Found in: stdlib@go1.20.5
        Fixed in: stdlib@go1.20.6

    Your code is affected by 0 vulnerabilities.
    This scan also found 1 vulnerability in packages you import and 18
    vulnerabilities in modules you require, but your code doesn't appear to call
    these vulnerabilities.
    ```

  - `gosec`

    ```
    go install github.com/securego/gosec/v2/cmd/gosec@latest
    ```

    e.g: test on [brutus](https://github.com/CyberRoute/bruter) repo - an open-source experimental [OSINT](https://en.wikipedia.org/wiki/Open-source_intelligence) app for testing web server configuration.

    ```
    gosec ./...
    ```

    spotted [CWE-295](https://cwe.mitre.org/data/definitions/295.html)

    ```
    ...

    [/.../bruter/pkg/fuzzer/randomua.go:69] - G404 (CWE-338): Use of weak random number generator (math/rand or math/rand/v2 instead of crypto/rand) (Confidence: MEDIUM, Severity: HIGH)
        68:
      > 69:  randomIndex := rand.Intn(len(userAgents))
        70:  return userAgents[randomIndex]

    ...

    [/.../bruter/pkg/server/config.go:40] - G402 (CWE-295): TLS InsecureSkipVerify set true. (Confidence: HIGH, Severity: HIGH)
        39:  customTransport := &http.Transport{
      > 40:   TLSClientConfig: &tls.Config{InsecureSkipVerify: true},
        41:  }

    ...
    ```

- Fuzzing

  - Extremely helpful in finding potential security flaws like buffer overflows, SQL injections, DoS attacks and XSS attacks

  - Further read on [Fuzzing test HTTP services Golang](nov-01.md)

---

<https://jarosz.dev/article/writing-secure-go-code/>

<https://github.com/CyberRoute/bruter>

<https://en.wikipedia.org/wiki/Open-source_intelligence>

<https://cwe.mitre.org/data/definitions/295.html>
