---
title: "Go commentary #13: Compiler quests and vector vexations"
short_title: "#13 Compiler Quests and Vector Vexations"
description: "A scathing look at Go's compiler internals and the vector search gold rush, exposing the industry's obsession with speed over substance"
date: 2024-09-27
authors:
  - fuatto
tags:
  - llm
  - go-weekly
  - golang
redirect:
  - /s/6sicFg
---

## [Register Allocation in the Go Compiler](https://developers.redhat.com/articles/2024/09/24/go-compiler-register-allocation#go_s_register_allocator__a_high_level_view)

Red Hat has graced us with a deep dive into Go's register allocation in the compiler. It's a fascinating peek under the hood, if you're into that sort of thing. But let's be real: how many of us are actually going to benefit from understanding the intricacies of register allocation? It's like knowing the exact chemical composition of the asphalt you're driving on – interesting, but ultimately irrelevant to most people's daily commute.

The Go team's obsession with compiler speed is admirable, I suppose. They've managed to create a register allocator that's "very fast," taking up to 20% of the entire optimization pipeline's time. Bravo. But at what cost?

```go
// Imagine this is your codebase after Go's "fast" register allocation
func someFunction() {
    // Oops, your variable got spilled into a loop
    for i := 0; i < 1000000; i++ {
        // Load from memory, use, store back to memory
        // Repeat ad nauseam
    }
}
```

Sure, your compile times are blazing fast. But your runtime? Well, that's a different story. The lack of a global view in the register allocator means you might end up with code that's about as efficient as a government bureaucracy.

But hey, at least it compiles quickly, right? Because that's what really matters in production – how fast you can push out potentially suboptimal code.

## [BBQvec: An open-source, embedded vector index for Rust and Go](https://blog.daxe.ai/p/bbqvec-a-scalable-vector-search-library)

Speaking of optimizations, let's talk about the latest darling of the AI world: vector search. Daxe has thrown their hat into the ring with BBQvec, a "scalable vector search library." Because clearly, what the world needs is another way to find the nearest neighbor in high-dimensional space.

Don't get me wrong, vector search is useful. But the way the industry is salivating over it, you'd think it was the second coming of sliced bread. Every startup and their dog is now implementing some form of vector search, often without really understanding why or if they even need it.

```go
// The modern tech stack, apparently
type ModernAIStartup struct {
    VectorSearch    *FancyVectorLib
    LLM             *ChatGPT
    ActualProduct   *WhoNeedsThis
}
```

BBQvec claims to be all about scale, handling "many billions of vectors." That's great, but let's pause for a moment. How many companies actually need to search through billions of vectors? And of those that do, how many are doing it for anything more than vanity metrics or to impress VCs?

The algorithm itself is clever, I'll give them that. Using random orthonormal basis sets and bitmaps for indexing is an interesting approach. But it's telling that their big selling point is how fast they can build the index, not necessarily how accurate or fast the actual searches are.

---

https://developers.redhat.com/articles/2024/09/24/go-compiler-register-allocation#go_s_register_allocator__a_high_level_view

https://blog.daxe.ai/p/bbqvec-a-scalable-vector-search-library
