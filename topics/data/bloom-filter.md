---
title: Bloom filter
description: "A Bloom filter is a probabilistic data structure used for testing whether an element is a member of a set or not. It's space-efficient compared to other data structures like hash tables, but it may give false positives (indicating that an element is in the set when it's not) and never gives false negatives (indicating that an element is not in the set when it actually is not)..."
date: 2024-06-28
authors:
  - nnhuyhoang
tags:
  - big-o
  - bloom-filter
  - data-structure
redirect:
  - /s/aodMXg
---

## What is Bloom filter?

A Bloom filter is a probabilistic data structure used for testing whether an element is a member of a set or not. It's space-efficient compared to other data structures like hash tables, but it may give false positives (indicating that an element is in the set when it's not) and never gives false negatives (indicating that an element is not in the set when it actually is not).

![](assets/bloom-filter_bloom_filter.webp)

## How Bloom filter work?

`Initialization`: You start with a bit array of size `m` (usually a large prime number) initially set to all zeros, and `k` different hash functions.

`Adding Elements`: When you want to add an element to the Bloom filter, you run it through each of the `k` hash functions, each of which maps the element to one of the `m` bits in the array. You then set those bits to `1`.

`Checking Membership`: To check if an element is in the Bloom filter, you again run it through each of the `k` hash functions. If all `k` bits are set to `1` in the bit array, the element is probably in the set. If any of the bits are `0`, then the element is definitely not in the set. However, due to potential hash collisions, `false positives are possible`.

## When to use?

Imagine that you have a system which millions user, and then you have a user table which had millions of records. So everytime a new user is registered, you have to query millions records table to check username is existed or not which cost `Time complexity = O(n)` (`n` will be vary upto millions) in case not aggregate further. Instead of that, you can `Checking membership` in Bloom filter which just have `Time complexity = O(k)` (k is constant number of hash function) and then response to user that username is alreay existed. The result has a small probability of false positive(username not existed but response existed) due to potential hash collion but it acceptable by notify user can register with other username.

Besides above scenario, Bloom filter can apply in other case like:

- `Caching Systems`: Bloom Filters are commonly used in caching systems to quickly check if a requested item is likely to be in the cache before performing a more expensive lookup. This helps in reducing cache misses and improving overall system performance.

- `Data Deduplication`: In systems where duplicate data needs to be identified and eliminated efficiently, Bloom Filters can help quickly determine whether a new data item is a duplicate of an existing item in the dataset.

- `Web Crawlers and Search Engines`: Bloom Filters can be used in web crawlers and search engines to quickly check whether a URL has been visited or indexed before, reducing redundant crawling or indexing efforts.

- `Spell Checkers`: Bloom Filters can be employed in spell checkers to quickly determine if a word is misspelled by checking against a large dictionary of correctly spelled words.

- `Network Routing`: In networking applications, Bloom Filters can be used to quickly filter out packets or messages that are not likely to match certain criteria, reducing the computational load on routers and improving network performance.

- `Blockchain and Distributed Systems`: In distributed systems like blockchain networks, Bloom Filters can be utilized for lightweight and efficient synchronization of data among nodes, reducing the amount of data that needs to be transmitted.

Overall, Bloom Filters are suitable for applications where memory usage needs to be minimized, and a small probability of false positives is acceptable. However, they are not suitable for scenarios where false positives are unacceptable or where exact membership information is required.

## Pros and Cons?

### Pros:

- `Space Efficiency`: Bloom Filters are very space-efficient compared to other data structures like hash tables or trees. They require only a fraction of the space that would be needed to store the actual set of elements.

- `Fast Membership Testing`: Bloom Filters provide constant-time (O(k)) complexity for membership testing, regardless of the size of the set. This makes them suitable for large datasets where quick membership checks are required.

- `No False Negatives`: Bloom Filters never produce false negatives. If the filter says an element is not in the set, it's guaranteed to be absent. This property is useful in applications where false negatives are unacceptable.

- `Versatility`: Bloom Filters are versatile and can be used in various applications such as caching, spell checking, network routing, and more. They are particularly useful in scenarios where approximate membership testing is acceptable.

### Cons:

- `False Positives`: Bloom Filters can produce false positives, indicating that an element is in the set when it's not. The probability of false positives increases with the number of elements in the set and the parameters chosen for the Bloom filter (e.g., size of the bit array and number of hash functions).

- `Cannot Remove Elements`: Bloom Filters do not support element removal. Once an element is added to the filter, it cannot be removed without resorting to complex techniques or resetting the filter entirely.

- `Parameter Sensitivity`: The performance and effectiveness of a Bloom filter are highly sensitive to the parameters chosen, such as the size of the bit array (m) and the number of hash functions (k). Selecting inappropriate parameters can lead to higher false positive rates or increased memory usage.

- `Limited Operations`: Bloom Filters support only two primary operations: adding elements and checking for membership. They do not support other common operations like element retrieval or iteration over the elements in the set.

- `Hash Function Dependency`: Bloom Filters rely heavily on hash functions for their operation. The quality of the hash functions used can significantly impact the performance and effectiveness of the Bloom filter.

## Simple Implementation:

Nowadays, many cache system integrated bloom filter as a feature. Can use it without implementation, but if you want try to hand-on. the simple implementation is a example:

```go
package main

import (
	"fmt"
	"hash/crc32"
	"hash/fnv"
)

type BloomFilter struct {
	bitArray []bool
	size     uint
	hashFunc []func(data string) uint
}

func NewBloomFilter(size uint) *BloomFilter {
	bf := &BloomFilter{
		bitArray: make([]bool, size),
		size:     size,
		hashFunc: []func(data string) uint{
			func(data string) uint { return uint(fnv.New32().Sum32()) },
			func(data string) uint { return uint(crc32.ChecksumIEEE([]byte(data))) },
			// Add more hash functions here if needed
		},
	}
	return bf
}

func (bf *BloomFilter) Add(data string, numHash int) error {
	if numHash > len(bf.hashFunc) {
		return fmt.Errorf("number of hash functions exceeds the limit")
	}
	for i := 0; i < numHash; i++ {
		index := bf.hashFunc[i](data) % bf.size
		bf.bitArray[index] = true
	}
	return nil
}

func (bf *BloomFilter) Contains(data string) bool {
	for _, hashFunc := range bf.hashFunc {
		index := hashFunc(data) % bf.size
		if !bf.bitArray[index] {
			return false
		}
	}
	return true
}

func main() {
	bloomFilter := NewBloomFilter(100)

	// Add user identities to the Bloom filter
	userIdentities := []string{"user123", "user456", "user789"}
	for _, identity := range userIdentities {
		bloomFilter.Add(identity, 2)
	}

	// Check for existence of user identities
	fmt.Println(bloomFilter.Contains("user123")) // true
	fmt.Println(bloomFilter.Contains("user789")) // true
	fmt.Println(bloomFilter.Contains("user999")) // false
}
```
