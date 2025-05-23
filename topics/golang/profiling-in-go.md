---
title: Profiling in Go
description: "Profiling in Go is a powerful tool that can help you identify and fix the subtle issues in your code quickly and efficiently. In this article, we'll explore the world of profiling in Go and show you how you can use it to catch all the issues in your code."
date: 2023-03-28
authors:
  - thangnt294
tags:
  - profiling
  - engineering
  - golang
redirect:
  - /s/2ZaHww
---

## Profiling in Go: Gotta catch 'em all

### Introduction

Those of you who have watched the Pokemon series will undoubtedly recognize the famous catchphrase - "Gotta catch 'em all" - that refers to the main character's goal of catching all the Pokemon in the world. In the same way, profiling is a useful way to catch all the problems in your code and ensure that it's running smoothly. It's a powerful tool that can help you identify and fix the subtle issues in your code quickly and efficiently.

In this article, we'll explore the world of profiling in Go and show you how you can use it to catch all the issues in your code.

### Problem

First, let's take a look at the problem we're facing. Check out this command:

```bash
grep -wo love moby.txt | wc -l
```

The above command counts the number of occurrences of the word love in a file named `moby.txt` (you can get the file here: https://gist.github.com/ktnyt/734e32aab75a4f7df06538dac9f00a5a).

Run this command and we get a result of 24 (try it!). Next, create a file called `cmd.sh` to store the command above. The file should look like this:

```bash
#!/bin/bash
grep -wo love moby.txt | wc -l
```

Now we can time the entire command by running this:

```bash
time ./cmd.sh
```

You should get back something similar to this:

```bash
24
./cmd.sh 0.03s user 0.01s system 101% cpu 0.039 total
```

0.039s - that was pretty fast! Now let's build something similar in Go. Run this command to set up Go modules:

```bash
go mod init grep-clone
```

Next create a main.go file to write the code. Here's the Go implementation of the command we're trying to emulate:

```go
package main

import (
 "fmt"
 "io"
 "log"
 "os"
 "unicode"
)

func main() {
 // read the args
 if len(os.Args) < 2 {
  log.Fatal("Not enough args")
 }
 word := os.Args[1]
 file := os.Args[2]

 // open file
 f, err := os.Open(file)
 if err != nil {
  log.Fatal(err)
 }
 defer f.Close()

 // count the number of occurrences
 count := 0
 curr := ""
 b := make([]byte, 1)
 for {
  _, err := f.Read(b)
  if err == io.EOF {
   break
  }
  if err != nil {
   log.Fatal(err)
  }
  if unicode.IsLetter(rune(b[0])) {
   curr += string(b)
  } else {
   if curr == word {
    count++
   }
   curr = ""
  }
 }

 fmt.Println(count)
}
```

After reading the arguments, we open the file, and then start counting the number of occurrences of the word by reading each byte from the file at a time. Whenever we encounter a non-character byte, we compare the current string with the target word. If they're the same, we increment the count variable by one. If not, we do nothing. We then reset the current string so that we can start building the next word. The for loop is exited only when we reach the end of the file, after which the result will be printed to stdout.

Now let's time this program! But before that, we need to build the binary file. Run this command:

```
go build .
```

You should see a binary file named `grep-clone`. Why not just time it directly using go run? Why do we need to build the binary first? Because we only want to measure the run time of the application, excluding the build time.

Now run this command:

```bash
time ./grep-clone love moby.txt
```

You should see this output:

```bash
24
./grep-clone love moby.txt  0.26s user 0.51s system 100% cpu 0.764 total
```

0.764s - That's relatively slow compared to the original 0.039s.

Why is that? And what can be done to improve our program? You can try to come up with the answer yourself, or call up your senior programmer friends and discuss with them. Heck, you can even paste the entire program in ChatGPT and ask for help. But wait, there's a much simpler way: Profiling! That's what we're here for.

There are multiple type of profiling we can apply to our program. These include:

- CPU Profile
- Memory Profile (Heap)
- Goroutine Profile
- Allocation Profile
- Thread Profile
- Block Profile
- Mutex Profile

The most commonly used types of profiling in Go are CPU profiling and memory profiling, which are also considered the most useful. We will only apply these two.

### Solution

Go already has a package for profiling call `pprof`, but let's use Dave Cheney's package for simplicity. Run this command:

```bash
go get github.com/pkg/profile
```

Now let's modify the code. Add this line to the top of the main function:

```go
package main

import (
 "fmt"
 "io"
 "log"
 "os"
 "unicode"

 "github.com/pkg/profile"
)

func main() {
  defer profile.Start(profile.CPUProfile, profile.ProfilePath("."), profile.NoShutdownHook).Stop()
  //rest of the code
}
```

The line of code will generate a CPU profile file for us. Now let's rebuild the code:

```bash
go build .
```

And then rerun the program:

```bash
./grep-clone love moby.txt
```

When we run the code again, it will generate a file named `cpu.pprof`. This file contains the information of the CPU profile of our program. Now let's use the go tool to analyze this file:

```bash
go tool pprof cpu.pprof
```

Next enter top 10 to see the top 10 function calls that take up the most CPU time. You should see something like this:

```
(pprof) top 10
Showing nodes accounting for 640ms, 100% of 640ms total
      flat  flat%   sum%        cum   cum%
     640ms   100%   100%      640ms   100%  syscall.syscall
         0     0%   100%      640ms   100%  internal/poll.(*FD).Read
         0     0%   100%      640ms   100%  internal/poll.ignoringEINTRIO (inline)
         0     0%   100%      640ms   100%  main.main
         0     0%   100%      640ms   100%  os.(*File).Read
         0     0%   100%      640ms   100%  os.(*File).read (inline)
         0     0%   100%      640ms   100%  runtime.main
         0     0%   100%      640ms   100%  syscall.Read (inline)
         0     0%   100%      640ms   100%  syscall.read
```

As you can see, most of CPU time is spent running `syscall.syscall`. System calls take a lot of time to perform, so this is not ideal. Let's explore further:

```
(pprof) list main.main
Total: 640ms
ROUTINE ======================== main.main in /test/Projects/test/main.go
         0      640ms (flat, cum)   100% of Total
         .          .     13:func main() {
         .          .     14:   defer profile.Start(profile.CPUProfile, profile.ProfilePath("."), profile.NoShutdownHook).Stop()
         .          .     15:
         .          .     16:   // read the args
         .          .     17:   if len(os.Args) < 2 {
         .          .     18:           log.Fatal("Not enough args")
         .          .     19:   }
         .          .     20:   word := os.Args[1]
         .          .     21:   file := os.Args[2]
         .          .     22:
         .          .     23:   // open file
         .          .     24:   f, err := os.Open(file)
         .          .     25:   if err != nil {
         .          .     26:           log.Fatal(err)
         .          .     27:   }
         .          .     28:   defer f.Close()
         .          .     29:
         .          .     30:   // count the number of occurrences
         .          .     31:   count := 0
         .          .     32:   curr := ""
         .          .     33:
         .          .     34:   b := make([]byte, 1)
         .          .     35:   for {
         .      640ms     36:           _, err := f.Read(b)
         .          .     37:           if err == io.EOF {
         .          .     38:                   break
         .          .     39:           }
         .          .     40:           if err != nil {
         .          .     41:                   log.Fatal(err)
```

When we explore the main function further by using the list command, we can see that the problem lies in line 36. Here, we are reading the file byte-by-byte, and each time we read a byte the program has to perform a system call to the OS. This is obviously not desirable, hence the need to reduce the number of system calls. Let's update the code:

```go
 b := make([]byte, 1)
 r := bufio.NewReader(f)
 for {
  _, err := r.Read(b)
  if err == io.EOF {
   break
  }
  if err != nil {
   log.Fatal(err)
  }
  if unicode.IsLetter(rune(b[0])) {
   curr += string(b)
  } else {
   if curr == word {
    count++
   }
   curr = ""
  }
 }
```

We fix this by using a **buffered reader** in `bufio`. The buffer has a default size of 4096 bytes. This way, whenever we try to read a byte from the file, the program will actually read 4096 bytes at a time, store it in the memory, and then return the one byte to us. On subsequent read, the program will return the byte from the memory instead of fetching it all the way from disk. This will reduce the number of system calls needed.

Now let's redo all of the above steps. Rebuild the code, rerun the program, then use pprof to examine the file again. When running `list main.main`, you should see something like this:

```
(pprof) list main.main
Total: 50ms
ROUTINE ======================== main.main in /test/Projects/test/main.go
         0       40ms (flat, cum) 80.00% of Total
         .          .     14:func main() {
         .          .     15:   defer profile.Start(profile.CPUProfile, profile.ProfilePath("."), profile.NoShutdownHook).Stop()
         .          .     16:
         .          .     17:   // read the args
         .          .     18:   if len(os.Args) < 2 {
         .          .     19:           log.Fatal("Not enough args")
         .          .     20:   }
         .          .     21:   word := os.Args[1]
         .          .     22:   file := os.Args[2]
         .          .     23:
         .          .     24:   // open file
         .          .     25:   f, err := os.Open(file)
         .          .     26:   if err != nil {
         .          .     27:           log.Fatal(err)
         .          .     28:   }
         .          .     29:   defer f.Close()
         .          .     30:
         .          .     31:   // count the number of occurrences
         .          .     32:   count := 0
         .          .     33:   curr := ""
         .          .     34:
         .          .     35:   b := make([]byte, 1)
         .          .     36:   r := bufio.NewReader(f)
         .          .     37:   for {
         .       20ms     38:           _, err := r.Read(b)
         .          .     39:           if err == io.EOF {
         .          .     40:                   break
         .          .     41:           }
         .          .     42:           if err != nil {
         .          .     43:                   log.Fatal(err)
         .          .     44:           }
         .          .     45:           if unicode.IsLetter(rune(b[0])) {
         .       20ms     46:                   curr += string(b)
         .          .     47:           } else {
         .          .     48:                   if curr == word {
         .          .     49:                           count++
         .          .     50:                   }
         .          .     51:                   curr = ""
```

From 640ms to 20ms! Looks like we've managed to reduce the number of system calls significantly. That is it for the CPU profiling. Now let's try to profile the memory instead. Change the code to this:

```go
package main

import (
 "fmt"
 "io"
 "log"
 "os"
 "unicode"

 "github.com/pkg/profile"
)

func main() {
  defer profile.Start(profile.MemProfile, profile.ProfilePath("."), profile.NoShutdownHook).Stop()
  //rest of the code
}
```

Rebuild and then rerun the program. This time, you will see a file named `mem.pprof`. We examine this file in the same way:

```bash
go tool pprof mem.pprof
```

List the main.main function again, this time you will see:

```
(pprof) list main.main
Total: 420.82kB
ROUTINE ======================== main.main in /Users/thomas/Projects/test/main.go
  420.82kB   420.82kB (flat, cum)   100% of Total
         .          .     14:func main() {
         .          .     15:   defer profile.Start(profile.MemProfile, profile.ProfilePath("."), profile.NoShutdownHook).Stop()
         .          .     16:
         .          .     17:   // read the args
         .          .     18:   if len(os.Args) < 2 {
         .          .     19:           log.Fatal("Not enough args")
         .          .     20:   }
         .          .     21:   word := os.Args[1]
         .          .     22:   file := os.Args[2]
         .          .     23:
         .          .     24:   // open file
         .          .     25:   f, err := os.Open(file)
         .          .     26:   if err != nil {
         .          .     27:           log.Fatal(err)
         .          .     28:   }
         .          .     29:   defer f.Close()
         .          .     30:
         .          .     31:   // count the number of occurrences
         .          .     32:   count := 0
         .          .     33:   curr := ""
         .          .     34:
         .          .     35:   b := make([]byte, 1)
         .          .     36:   r := bufio.NewReader(f)
         .          .     37:   for {
         .          .     38:           _, err := r.Read(b)
         .          .     39:           if err == io.EOF {
         .          .     40:                   break
         .          .     41:           }
         .          .     42:           if err != nil {
         .          .     43:                   log.Fatal(err)
         .          .     44:           }
         .          .     45:           if unicode.IsLetter(rune(b[0])) {
  420.82kB   420.82kB     46:                   curr += string(b)
         .          .     47:           } else {
         .          .     48:                   if curr == word {
         .          .     49:                           count++
         .          .     50:                   }
         .          .     51:                   curr = ""
```

Looks like we're allocating quite a lot of memory on line 46. To understand why, we need to look at the implementation of the string concatenation operation in Go. You can find it here: https://github.com/golang/go/blob/master/src/runtime/string.go

```go
// The constant is known to the compiler.
// There is no fundamental theory behind this number.
const tmpStringBufSize = 32

type tmpBuf [tmpStringBufSize]byte

// concatstrings implements a Go string concatenation x+y+z+...
// The operands are passed in the slice a.
// If buf != nil, the compiler has determined that the result does not
// escape the calling function, so the string data can be stored in buf
// if small enough.
func concatstrings(buf *tmpBuf, a []string) string {
 idx := 0
 l := 0
 count := 0
 for i, x := range a {
  n := len(x)
  if n == 0 {
   continue
  }
  if l+n < l {
   throw("string concatenation too long")
  }
  l += n
  count++
  idx = i
 }
 if count == 0 {
  return ""
 }

 // If there is just one string and either it is not on the stack
 // or our result does not escape the calling frame (buf != nil),
 // then we can return that string directly.
 if count == 1 && (buf != nil || !stringDataOnStack(a[idx])) {
  return a[idx]
 }
 s, b := rawstringtmp(buf, l)
 for _, x := range a {
  copy(b, x)
  b = b[len(x):]
 }
 return s
}
```

You can read the code yourself to understand what it does. The problem lies in this function:

```go
func rawstringtmp(buf *tmpBuf, l int) (s string, b []byte) {
 if buf != nil && l <= len(buf) {
  b = buf[:l]
  s = slicebytetostringtmp(&b[0], len(b))
 } else {
  s, b = rawstring(l)
 }
 return
}
```

Here note that if the buf is nil, we will inevitably have to allocate new memory by calling the function rawstring. Here's the code of that function:

```go
// rawstring allocates storage for a new string. The returned
// string and byte slice both refer to the same storage.
// The storage is not zeroed. Callers should use
// b to set the string contents and then drop b.
func rawstring(size int) (s string, b []byte) {
 p := mallocgc(uintptr(size), nil, false)
 return unsafe.String((*byte)(p), size), unsafe.Slice((*byte)(p), size)
}
```

See the mallocgc call? It's allocating memory. Whether the buf is nil or not depends entirely on the compiler. This is something we don't have control of. Let's try to improve it by using a strings builder. Change the code to this:

```go
// count the number of occurrences
 count := 0
 var sb strings.Builder
 sb.Grow(32)

 b := make([]byte, 1)
 r := bufio.NewReader(f)
 for {
  _, err := r.Read(b)
  if err == io.EOF {
   break
  }
  if err != nil {
   log.Fatal(err)
  }
  if unicode.IsLetter(rune(b[0])) {
   sb.Write(b)
  } else {
   if sb.String() == word {
    count++
   }
   sb.Reset()
   sb.Grow(32)
  }
}
```

The logic is pretty much the same, only this time we're using a strings builder instead. The `sb.Grow(32)` is necessary because in order to avoid unnecessary resizing of the underneath slice, we need to pre-allocate some memory to contain the string. Removing this line will cause a lot of unnecessary allocation (you can try it out for yourself).

Now rebuild and rerun the code. Examine the pprof file again, and you should see a significant improvement:

```
(pprof) list main.main
Total: 22.39kB
ROUTINE ======================== main.main in /test/Projects/test/main.go
         0    22.39kB (flat, cum)   100% of Total
         .          .     15:func main() {
         .          .     16:   defer profile.Start(profile.MemProfile, profile.ProfilePath("."), profile.NoShutdownHook).Stop()
         .          .     17:
         .          .     18:   // read the args
         .          .     19:   if len(os.Args) < 2 {
         .          .     20:           log.Fatal("Not enough args")
         .          .     21:   }
         .          .     22:   word := os.Args[1]
         .          .     23:   file := os.Args[2]
         .          .     24:
         .          .     25:   // open file
         .          .     26:   f, err := os.Open(file)
         .          .     27:   if err != nil {
         .          .     28:           log.Fatal(err)
         .          .     29:   }
         .          .     30:   defer f.Close()
         .          .     31:
         .          .     32:   // count the number of occurrences
         .          .     33:   count := 0
         .          .     34:   var sb strings.Builder
         .          .     35:   sb.Grow(32)
         .          .     36:
         .          .     37:   b := make([]byte, 1)
         .     6.33kB     38:   r := bufio.NewReader(f)
         .          .     39:   for {
         .          .     40:           _, err := r.Read(b)
         .          .     41:           if err == io.EOF {
         .          .     42:                   break
         .          .     43:           }
         .          .     44:           if err != nil {
         .          .     45:                   log.Fatal(err)
         .          .     46:           }
         .          .     47:           if unicode.IsLetter(rune(b[0])) {
         .          .     48:                   sb.Write(b)
         .          .     49:           } else {
         .          .     50:                   if sb.String() == word {
         .          .     51:                           count++
         .          .     52:                   }
         .          .     53:                   sb.Reset()
         .    16.06kB     54:                   sb.Grow(32)
         .          .     55:           }
         .          .     56:   }
         .          .     57:
         .          .     58:   fmt.Println(count)
         .          .     59:}
```

If you can't see anything, just rerun the program. Sometimes the allocation is so small the program is not able to capture the profile.

This is the final, improved version of our program:

```go
package main

import (
 "bufio"
 "fmt"
 "io"
 "log"
 "os"
 "strings"
 "unicode"
)

func main() {
 // read the args
 if len(os.Args) < 2 {
  log.Fatal("Not enough args")
 }
 word := os.Args[1]
 file := os.Args[2]

 // open file
 f, err := os.Open(file)
 if err != nil {
  log.Fatal(err)
 }
 defer f.Close()

 // count the number of occurrences
 count := 0
 var sb strings.Builder
 sb.Grow(32)

 b := make([]byte, 1)
 r := bufio.NewReader(f)
 for {
  _, err := r.Read(b)
  if err == io.EOF {
   break
  }
  if err != nil {
   log.Fatal(err)
  }
  if unicode.IsLetter(rune(b[0])) {
   sb.Write(b)
  } else {
   if sb.String() == word {
    count++
   }
   sb.Reset()
   sb.Grow(32)
  }
 }

 fmt.Println(count)
}
```

Note that I've removed the line of code that starts the profiling process. Profiling takes up CPU time as well, so after you're done, remember to remove it from your program!

Rebuild the program, and then time it again:

```bash
time ./grep-clone love moby.txt
```

This is the result:

```bash
24
./grep-clone love moby.txt  0.03s user 0.01s system 98% cpu 0.043 total
```

Look at that! We've improved the runtime of our program significantly. This is the power of profiling: it shows you exactly where the problem is, so you know what to fix.

## Summary

In conclusion, profiling is an essential tool for any Go developer looking to build high-quality and efficient applications. By catching all the performance problems in your code, you can optimize it for better performance, improving the user experience and overall success of your application. Whether you're working on a small personal project or a large enterprise application, profiling should be a regular part of your development process.

As you continue to work on your Go projects, keep in mind the importance of profiling and the various tools and techniques available to help you optimize your code. By doing so, you'll be well on your way to becoming a more efficient and effective developer.

So go ahead, catch 'em all!
