---
title: "Go commentary #24: Coming in Go 1.24: testing/synctest experiment for time and concurrency testing"
short_title: "#24 Go 1.24 testing/synctest experiment for time and concurrency testing"
description: Go 1.24 testing/synctest experiment for time and concurrency testing
date: 2024-12-13
authors:
  - fuatto
tags:
  - go-weekly
  - golang
redirect:
  - /s/0qtYpw
---

## [Coming in Go 1.24: testing/synctest experiment for time and concurrency testing](https://danp.net/posts/synctest-experiment/)

### Context

```go
func Test(t *testing.T) {
    before := time.Now()
    time.Sleep(time.Second)
    after := time.Now()
    if d := after.Sub(before); d != time.Second {
        t.Fatalf("took %v", d)
    }
}
```

- Traditional hack

```go
func Test(t *testing.T) {
    before := time.Now()
    time.Sleep(time.Second)
    after := time.Now()
    if d := after.Sub(before); d >= 2*time.Second {
        t.Fatalf("took %v", d)
    }
}
```

- It's still flaky because it depends on the system clock.

### Solution

- The `testing/synctest` package is an experiment to provide a more deterministic way to test time and concurrency in Go.

```go
import (
	"testing"
	"testing/synctest"
	"time"
)

func Test(t *testing.T) {
	synctest.Run(func() {
		before := time.Now()
		time.Sleep(time.Second)
		after := time.Now()
		if d := after.Sub(before); d != time.Second {
			t.Fatalf("took %v", d)
		}
	})
}
```

- And then use [gotip](https://pkg.go.dev/golang.org/dl/gotip) with `GOEXPERIMENT=synctest`

### Extending to concurrency

```go
func Test(t *testing.T) {
	ctx := context.Background()

	ctx, cancel := context.WithCancel(ctx)

	var hits atomic.Int32
	go func() {
		tick := time.NewTicker(time.Millisecond)
		defer tick.Stop()
		for {
			select {
			case <-ctx.Done():
				return
			case <-tick.C:
				hits.Add(1)
			}
		}
	}()

	time.Sleep(3 * time.Millisecond)
	cancel()

	got := int(hits.Load())
	if want := 3; got != want {
		t.Fatalf("got %v, want %v", got, want)
	}
}
```

- It's flaky because of the initial delay of the Ticker

- Wrap the test in `synctest.Run` to make it deterministic

```go
func Test(t *testing.T) {
	synctest.Run(func() {
		ctx := context.Background()

		ctx, cancel := context.WithCancel(ctx)

		var hits atomic.Int32
		go func() {
			tick := time.NewTicker(time.Millisecond)
			defer tick.Stop()
			for {
				select {
				case <-ctx.Done():
					return
				case <-tick.C:
					hits.Add(1)
				}
			}
		}()

		time.Sleep(4 * time.Millisecond)
		cancel()

		got := int(hits.Load())
		if want := 3; got != want {
			t.Fatalf("got %v, want %v", got, want)
		}
	})
}
```

### Conclusion

- It seems that `testing/synctest` will significantly improve testing code that involves time or concurrency. Example in go source: [https://go-review.googlesource.com/c/go/+/630382](https://go-review.googlesource.com/c/go/+/630382)

- You can try it yourself now by using `gotip` and setting `GOEXPERIMENT=synctest`. When Go 1.24 comes out GOEXPERIMENT=synctest will still be required.

- Review the [main proposal](https://github.com/golang/go/issues/67434) and share any experience you have.

---

https://danp.net/posts/synctest-experiment/

https://go-review.googlesource.com/c/go/+/630382

https://github.com/golang/go/issues/67434
