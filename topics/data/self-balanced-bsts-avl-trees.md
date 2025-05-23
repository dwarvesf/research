---
title: Self balanced bsts avl trees
description: Learn how trees, especially binary search trees (BST) and AVL trees, organize hierarchical data for fast search, insertion, and deletion with guaranteed balanced height and efficient operations.
date: 2023-02-13
github_id: mirageruler
icy: 10
redirect:
  - /s/s0exEw
---

## What are trees?

- A **tree** is a non-linear data structure used to represent the hierarchical relationship between a paretn node and a child node. Each node in the tree is connected to another node by directed edges.
- ![](assets/self-balanced-bsts---avl-trees_a-tree-representation-of-a-team.webp)
- ![](assets/self-balanced-bsts---avl-trees_a-tree-representation-of-a-file-system.webp)
- Why do we use trees? The main advantage of using a tree over linear data structures like arrays or linked lists is that we do not have to search an element in linear team.

## Important terms related to trees

- ![](assets/self-balanced-bsts---avl-trees_key-terminologies-in-a-tree-1.webp)
  - **Node**: The fundamental element of a tree. Each node has arbitrary data and two pointers that may point to null or its children.
  - **Edge**: Another fundamental part of a tree used to connect two nodes.
  - **Root**: The only node without incoming edges. It is the top node of a tree.
  - **Leaf**: A node that has no children.
  - **Path**: An ordered list of nodes that are connected by edges.
  - **Height of a node** : The number of edges(in this case levels, everytime we go down by an edge we are going down one level of a tree) on the longest downward path between the node itselft to a leaf or the total number of nodes in that path exclude the node we're calculating the height for. Height of a binary tree is height of the root node. One more view to look at height of a node is to focus only the sub-tree where the focused node is the root, so it's height is the maximum depths of nodes within that sub-tree
- ![](assets/self-balanced-bsts---avl-trees_key-terminologies-in-a-tree-2.webp)
  - **Parent**: A node is said to be a parent node if it has outgoing edges to other nodes.
  - **Child**: A node that has incoming edges from another node is said to be the child of that node.
  - **Sibling**: Nodes that are children of the same parent are called sibling nodes.
  - **Ancestor**: A node is said to be an ancestor node if it is reachable while moving from child to parent.
  - **Level/Depth**: The depth/level of a node is the number of edges on the path from the root node to that node. The level of the leaf on the longest path from root is also the height of the tree. Take this in general we can say height of node X is maximum depth in subtree of node X.

## Type of trees

- Generally, trees can be divided into two categories based on the number of children a node can have. They are as follows:
  - **Non-binary trees**
    - A non-binary tree is a type of tree in which a node can have **more than two children**.
    - Examples: **2-3 trees**, **2-3-4 trees**,B-trees, B+ trees**, and **B\*\*\* trees are all examples of non-binary trees. But today, we will not care about these guys.
    - ![](assets/self-balanced-bsts---avl-trees_non-binary-tree-example.webp)
  - **Binary trees**
    - A binary tree is a type of tree in which each node has at **most two** children.
    - Examples: BSTs, AVL trees, and red-black trees are all examples of binary trees.
    - ![](assets/self-balanced-bsts---avl-trees_binary-tree-example.webp)

## Introduction to binary tree

- As we discussed earlier, _a binary tree is a type of tree in which each node has at most two children_, which means a node in the binary tree can have one, two, or no children. These children are referred to as the **left child** and the **right child**. To give it a more general view, I would say every node in the tree all has a parent node, except the root or we could argue that parent of the root is nil or a nil node.
- ![](assets/self-balanced-bsts---avl-trees_a-tree-node-example.webp) - We can code the above node as follows:

```go
type Node[T any] struct {
	// the contents of this node.
	value T
	// left and right nodes.
	left, right *Node[T]
	// parent *Node[T]   we're not going to use this field today, I just place it here since it's helpful for other type of trees and/or different problems.
	// height of this node
	height int
}

type Tree[T any] struct {
	// root of the tree
	root *Node[T]

	// compare function
	compare compareFunc[T]
}

// compareFunc provide clients the ability to help us indicate how to compare the given data structure since we're allowing it to be anything.
type compareFunc[T any] func(T, T) int
```

## Properties of binary tree

- The following are properties of a binary tree which are already prooved by the inventors... any way for a more intuitive view, I will provide a "sketch proof" for each of the properties and they are called proof by induction.If you interested in it, basically we take the base case that can not be false and we assume our proposition(which is $p_n$) is true then we proove that every $p_n$ implies $p_{n+1}$
  1.  The maximum number of nodes on a level i of a binary tree can be $2^i$, where $i \geq  0$. Sketch proof: Take the base case, at level 0 we have only one node that is the root itself so $2^0 = 1$ still hold true for our proposition, at level 1 we might have at most two children for the root so $2^1 = 2$ still hold true for our proposition, at level 2 we might have at most four children that are two from the root's left node and two from the root's right node so $2^2 = 4$ still hold true for our proposition... so on and so forth.
  2.  The maximum number of nodes in a binary tree of depth `k` is $2^{k+1}-1$, where $k \geq 0$. Sketch proof: Take the base case, at level 0 we have only one node that is the root itself so $2^{0+1}-1 = 1$ still hold true for our proposition, at level 1 we might have at most 3 nodes that are the two new children from our original root so $2^{1+1} -1 = 3$ still hold true for our proposition, at level 2 we might have at most 7 nodes that are the two new children from the root's left child and the root's right child so $2^{2+1} -1 = 7$ still hold true for our proposition... so on and so forth.
  3.  There is exactly one path from the root to any nodes in a tree. Because a each node is like a decision, imagine we stand before a decisive situation where there is only two options to go, we choose one then it will ask us to choose between the two new options, so on and so forth... so it's impossible for us to encounter a desired situation as long as we make at least one wrong decision in that path as that wrong decision will definitely leads us to a totally different branch.
  4.  A tree with $n$ nodes has exactly $n−1$ edges connecting these nodes. Sketch proof: Take the base case, with one node that is the root itself and zero edge so $1-1=0$ still hold true for our proposion, with two nodes that are the root and either the left or the right child so we have one edge check $2-1 = 1$ still hold true for our proposition, with three nodes that are the root and its children so we have two edges to connect them all together so $3-1 = 2$ still hold true for our proposition... so on and so forth.
  5.  The height of a complete/full (!= perfect) binary tree of $N$ nodes is $O(lgn)$. Sketch proof: Let's $n$ be the number of nodes in a complete binary tree and let $l_k$ denote the number of nodes on level $k$, where the levels are numbered 1,2,3, ..., h. The last level, $h$ represents the height of the tree. Note that: $l_k=2l_{k-1}$, i.e. each level has exactly twice as many nodes as the previous level (since each internal node has exactly two children). $l_1=1$ i.e. on the "first level" we have only node (the root node). Let's expand several case to find out the recurrence/pattern, $l_2=2, l_3=4,l_4=8,l_5=16,l_6=32...$ so the recurrence solves to $l_k=2^{k-1}$. Note also that the leaves are at the last level $l_h$, where h is the height of the tree, so from the previous bullets we know that the last level has $l_h=2^{h-1}$ nodes. The total number of nodes, $n$, in the tree is equal to the sum of the nodes on all the levels: $1+2^1+2^2+ ... + 2^{h-1}=n$, again let's expand several case to find out the recurrence on the left hand-side of the equation. We try with $$h=0, \quad \therefore 2^0 =1$$$$h=1, \quad \therefore 2^0+2^1=3$$$$h=2, \quad \therefore 2^0+2^1+2^2=7$$$$h=3, \quad \therefore 2^0+2^1+2^2+2^3=15$$so the recurrence is $2^h-1$. Therefore: $$2^h-1=n$$ $$\therefore 2^h=n+1$$ $$\therefore lg2^h=lg(n+1)$$ $$\therefore  hlg2= lg(n+1)$$ $$\therefore h=lg(n+1)$$ Ok, so now we know the height of the tree we can do one more thing that is to compute the number of leaves $l_h$ in the tree, we observed earlier that $l_h=l^{h-1}$ so we can substitute the value of h in this expressions $2^{h-1}=2^h/2^1=2^{lg(n+1)}/2=(n+1)/2$. In conclusion, for a complete binary tree $h$ is $O(lgn)$ and the number of leaves $l_h$ is roughly half of the nodes $(n+1)/2$. In effect, perfect binary trees have the same properties as they obviously just have more nodes to complete the last level compare to the complete binary trees which have their last level not completely be filled.
  - Notes: For convenient I will use the notation $lg$ as lograrithm of base 2 ($log2(n)$)since $lg$ also has two letters.

## Types of binary tree

- There are many types of binary trees. Let’s discuss them one by one below.
  - **Complete binary tree**
    - This is a very important invariant of binary tree that we need to keep in mind. In a complete binary tree, in every level except possibly the last, is completely filled. All nodes on the left are filled first and the nodes on the right filled after, so all nodes in the last level are as far left as possible. So all internal nodes have exactly two children and all leaves are at the same level. A binary min/max heap is a great example of a complete binary tree.
    - ![](assets/self-balanced-bsts---avl-trees_a-complete-binary-tree-example.webp)
  - **Full/Strict binary tree**
    - The full binary tree is a binary tree in which each node has exactly zero or two children.
    - ![](assets/self-balanced-bsts---avl-trees_a-full-strict-binary-tree-example.webp)
  - **Perfect binary tree**
    - The perfect binary tree is a type of full binary tree in which each non-leaf node has exactly two child nodes. All leaf nodes have identical path lengths and all possible node slots are occupied.
    - ![](assets/self-balanced-bsts---avl-trees_a-perfect-binary-tree-example.webp)
  - **Right-skewed binary tree**
    - A binary tree in which either each node has a right child or no child (leaf) is called a **right-skewed binary tree**.
    - ![](assets/self-balanced-bsts---avl-trees_a-right-skewed-binary-tree-example.webp)
  - **Left-skewed binary tree**
    - A binary tree in which either each node has a left child or no child (leaf) is called a **left-skewed binary tree**.
    - ![](assets/self-balanced-bsts---avl-trees_a-left-skewed-binary-tree-example.webp)
  - **Height-balanced binary tree**
    - A **height-balanced binary tree** is a binary tree such that the left and right subtrees for any given node differ in height by a maximum one. AVL trees and red-black trees are examples of height-balanced trees.
    ```
    Note: Each complete binary tree is a height-blanaced binary tree
    ```
    - ![](assets/self-balanced-bsts---avl-trees_a-height-balanced-binary-tree-example.webp)
  -

## Binary search tree (BST)

- A BST or a binary search tree is a binary tree in which nodes are ordered in the following way: - ![](assets/self-balanced-bsts---avl-trees_a-binary-search-tree-example.webp) - Below are the invariants of a BST (an arbitrary tree need to satisfy these invariants/constraints in order to be considered as a BST): - For all nodes x, if y is in the left sub-tree of x, we have key(y) <= key(x) - For all nodes x, if y is in the right sub-tree of x, we have key(y) >= key(x) - No duplicate key is allowed in the tree.
  - Because a binary search tree is also a binary tree, all the algorithms of a binary tree are applicable to a binary search tree.
  - `Note: There can be two separate key and value fields in the tree node(We can order the nodes by their key, and for any given key there's an associated arbitrary value). However, for simplicity of this article, we’ll consider the value as the key.`
  - BST give us a several useful operations:
    - Insertion in $O(h)$
    - Deletion in $O(h)$
    - Queries for exact key or the predecessor or successor if that key is not exist in $O(h)$.
    - We can easily return a sorted linear data structure by performing an in-order traversal on the BST which is only $O(n)$.

## How a BST can be helpful?

- To talk about the reason behind existence of BST, I'd like to take a toy problem that you can imagine exists in all sorts of scheduling problems, it's a part of a runway reservation system: - We'll assume an airport with a single runway, and we can imagine this runway is pretty busy. There's obviously safety issues associated with landing planes, and planes taking off. And so there are constraints associated with the system, that have to be obeyed. And we have to build these constraints in, and the checks for these constraints into our data structure. - What we'd like to do is reserve requests for landings, and each of them are going to specify landing time called $t$. So, in particular we're going to add $t$ to the set $R$ of landing times if no other landings are scheduled within $k$ minutes (k can either be constant or variable that will be changed depends on other business logic, but for simplicity we'll assume k is constant). So we need to be able to perform an insert operation to the data structure. - We have the current notion of time, everytime we have a plane that's already landed, we'd like to remove that landing from the set $R$. So every once in a while, as time increments, we're going to be checking the data structure maybe 30 seconds or 1 minute, it doesn't matter, the fact that matters here is we must be able to perform a delete operation on the data structure. - So we have set $R$ described as above, we don't quite know how to implement it yet. Assume, we're dealing with large inputs, we'd like to do all of these operations in $O(lgn)$ time where $n$ is the size of set $R$. - ![](assets/self-balanced-bsts---avl-trees_runway-reservation-problem-example.webp)
  - Let's list out so called, basic data structures, that obviously exists before BST like: unsorted array, sorted array, linked list (singly/doubly/circular is not important in this particular problem), hash table, heap. We're going to shoot them down with respsect to not being able to make the efficiency requirement of $O(lgn)$ time for all attached operations. - Unsorted list/array: Almost everything we want to do on this data structure is linear. Although for adding it only take constant time but to do the $k$ minutes check it's $O(n)$ time since the data have no order so we have to check with every other elements. Also for deletion, we have to traversed the whole data structure in the worst case (at the end of array) in order to find the element that we're going to delete. So basically, it's terrible. - Sorted list/array: I bet binary search is the first thing comes into your mind with this data structure. For the array implementation, yes we can do that to find the desired position to insert in $O(lgn)$ time and do the $k$ minutes check in $O(1)$ time but still take $O(n)$ time to do the insertion because possibily we have to shift every index after that, symmetrically the same is true for deletion. So it's almost what we want, if we can somehow skip the "shift index" work if we can manage our data in a more strictful structure. Actually in the list implementation, we don't have to do the "shift index" work but we can not do the "go to the middle point" operation since there's no indexes and we're only maintaing references a.k.a pointers. Give yourself a view of combining the key properties of a sorted array and linked list, that's the good things about the BST when it enables binary search as well as remove the $O(n)$ time "shifting" index work after the data structure is modified. - Heaps: Because of the logic of heap insertion and deletion methods, and the invariant of max/min heap (all children node must be larger/less than their direct parent) is fairly simple therefore fairly weak, each time we go left or right on the traversal we're not effectively cut off the all the unnecessary nodes, so to do the $k$ minutes check it's still take $O(n)$ time - that is we have to traverse every elements one by one in the heap. So it fails our requirement. - Hash table: Or dictionaries, hash map, whatever you wanna call it, supports $O(1)$ insertion, deletion, search exact all by a given key. But keys are not placed in order, actually they're in a randomized order so again if we want to do the $k$ minutes check it still $O(n)$ time. The good old hash table fails our requirement too.
  - The beauty of a BST is that we can augment the tree to do more work as necessary without changing the efficiency of the attached methods. In short, we can easily do the $k$ minutes check while finding the place to insert.
  - This should give us a sense of the richness of the BST structure, we can have nodes to store more data in them than just these common pointers. Having this notion of augmentation on the data structure is very good, because of design admendments so specifications never stay the same, like we're working for someone, and they never really tell us what they want, they might but they will change their mind later on, so in that case we're going to change our mind too and do the augmentation. I'll take an extra example requirements added upon our "runway reservation system" problem above, we need to compute $rank(t)$ that is how many planes are scheduled to land at times less than or equal to $t$, perfectly reasonable additional requirement and it wasn't part of the original spec.
  - With the notion of the aumented BST, we can refer to the normal BST as the vanilla BST such that each node encapsulates common basic fields like left,right pointer, key... while the aumented BSTs are usually bring together other fields or callbacks needed to make the algorithms work.
  - If you're interested in the implementations of BST you can search your own in the internet, today we're going to focus only on a method to balance BST.

## BST needs to be balanced!

- Almost operations for a vanilla BST is O(h) where h is the height of the BST but what we want is $O(lgn)$, so if $h = lgn$ where n is the total number of nodes in the BST then we will have $O(lgn)$ for operations attached to the BST which will truly satisfied our requirement for the "runway reservation system" problem. We have a concept of the balanceness of a tree, to say that a tree is balanced that is it's height must be $O(lgn)$, because almost . Because of the invariant of the BST that is not related to the height of the tree so that BST can become totally skewed to the right/left which is essentially a linked list and we know what's the problem with a linked list. Now this becomes our new problem as obstacles that we have to solve before we can have a data structure that efficiently acchieve $O(lgn)$ time in all attached operations in most of the time.

## The height of a node

- The new question is, what do we need to do in order to guarantee the height of a BST to be $lgn$. And before getting to methods that help us to actually do that, I think it's useful to discuss about height of the BST or in general height of a node within a BST because height of node root is also height of the BST.
- I will give out a hint that AVL require each node to store an additional integer field call `height` to store the height of each node, because the algorithm need to know that information instaneously in order to effecienly balance the tree (Simply we can't afford to go down the tree or sub-trees if you will to compute the height every time we need it). For a more intuitive view, let's look at the following picture:
- ![](assets/self-balanced-bsts---avl-trees_height-of-a-node-in-a-bst.webp)
- We need to update the height of each node in the AVL tree every once in awhile whenever insertions or deletions happen on the tree a.k.a the tree structure is modified.

## How to balance BST?

- BSTs are augmented and added invariants in many different ways in order to achieve balanceness in their height and they have a common name "Self-balance binary search tree", the most famous are AVL trees which we're going to talk about today, Red-Black trees, Splay trees, treaps. Each type of self-balance BST either has their own idea (Red-Black trees have the idea of coloring nodes with red or black) or common idea (the node rotation is commonly used in variants of self balance BST) to achieve balanceness in height.

## AVL tree

- A little bit information about the origin of this data structure:
  - Named after two Soviet inventors **A**delson-**V**elsky a computer scientist and **L**andis a mathematician.
  - It was the first self-balance BST ever to be invented and was the original way people found to keep trees balanced back in the '60s so they're kind of the simplest among others.
  - AVL trees are often compared with Red-Black trees because both support the same set of operations and take $O(lgn)$ time for the basic operations. For lookup-intensive applications, AVL trees are faster than red–black trees because they are more strictly balanced.
- AVL tree has a little rule for the height of their nodes. That is if a node is missing its left or right child or both and the missing children is considered as an imaginary node and these nodes have height $h=-1$. In order for the formula to calculate the height of a binary node in a BST work with that base case.

## Rep invariant of an AVL

- I will go with the definition of the authors of the algorithm first.
- `First the tree itselft must be a BST, then the height of the left sub-tree for every nodes within the tree must not 1 apart from the height of the right sub-tree`
- Notice if we slightly change the above constraint to "must not 0 apart ..." which means the left sub-tree and the right sub-tree have the same height in effect essentially describe a perfect BST but this constraint is really hard to conform since there are only a certain number of nodes $n$ with a unique structure for each $n$ to be able to represent a perfect BST (level 1 require 1 node, level 2 require 3 nodes, level 3 requires 7 nodes, level 4 requires 15 nodes, level 5 requires 31 nodes... and with that number of nodes they have to presented in a perfect way so it's really hard to keep that, for example if we have 8 nodes then it's impossible to fix the invariant)
- The above definition by words can be expressed as mathematical as follows: $\forall n\in AVL, |h(n.left) - h(n.right)| \leq 1$
- This constraint will help ensures the height of the AVL tree in the worst case of its definition stays $O(lgn)$ or in other words the highest height of an AVL tree is bounded by $O(lgn)$. In my humble opinion, It's important to understand how this is achieved by the invariant of the AVL tree in order to fully understand the idea of AVL trees, so I'll try my best to proove this is true:
  - The first claim is that `AVL trees are balanced`, balanced means height is always $O(lgn)$, so we're just going to assume for now that we can somehow achieve this property and we want to prove that it implies that the height is at most some constant times $O(lgn)$ while we know it's at least $O(lgn)$
  - Let's think about the worst case for height of an AVL tree, say if we have $n$ nodes how could we make the AVL tree as high as possible? Or conversely, if we have a particular height, how could we make it have as few nodes as possible? That'd be like the sparsest or the least balanced situation for AVL trees.
  - To achieve the worst case, we can do this: For every node, let's the right side have a height of $1$ larger than the left side or symmetrically we can do the same on the conversely but I'll only take one example here.
  - We're going to define $n_{h}$ is the minimum number of nodes that's possible in an AVL tree of height $h$. This is sort of the inverse that we care about, but if we can solve the inverse, we can solve the thing. What we really care about is, for $n$ nodes, how large can the height be, we wanna prove that is bounded to $O(lgn)$. But it'll be a lot easier to think about the reverse, which is, if we fix the height to be $h$ then what's the fewest nodes that we can pack in? Because for a worst case of a BST a right/left degenerated BST, we have a height of $n$ so we only need to put $n$ nodes and we see that woulld be really bad. What we prefer is a situation where with heigh $h$, we have to put in $2^h$ nodes and that would be perfect balance, so when we take the inverse from that exponential equation we get a logarithm.
  - Imagine a case where we want to build an AVL tree with a fixed height, and we want to have as few nodes as possible. If we have a tree with a big height and very few nodes, $h$ is going to be bad when we write it as a function of $n$ so those trees are unbalanced - big height, small number of nodes. So we will try to build up the next presentation of the AVL tree with minimum number of nodes for each level, let's look at the following picture:
  - ![](assets/self-balanced-bsts---avl-trees_minimum-number-of-nodes-for-an-avl-tree-of-height-h.webp)
  - Expanding the example to level 4,5,6,7 then you will regconize the pattern/recurrence. If we want to build an AVL tree with as few nodes as possible and height $h$, we start with the root and then at the right we build an AVL tree of height $h-1$ and at the left, we build an AVL tree of height $h-2$, because of the fact that we were also try to build left AVL sub-tree and right AVL sub-tree with minimum number of nodes then it turns out that the whole tree must has minimum number of nodes. Look at the following picture:
  - ![](assets/self-balanced-bsts---avl-trees_the-best-way-to-build-a-tall-avl-tree-with-as-few-nodes-as-possible.webp)
  - Suppose we want to write the number of nodes as a function of height, we have $n_h=n_{h-2}+n_{h-1}+1$ as the recurrence with the base case $n_{O(1)}=O(1)$. Now we need to solve it, what we would like is for it to be exponential, because that means there's a lot of nodes in a height $h$ AVL tree. Look at the recurrence, doesn't it look like something very familiar to our developers when we first come to some of the first problem when we learn how to write code? Yes, the good old Fibonacci, it's almost Fibonacci except we have our additional $+1$ in the recurrence. Well, that's actually good, because in particular, $n_h$ is bigger than Fibonacci. So we have $n_h>f_h$, if we add $1$ at every single level then certianly we get something bigger than the base Fibonacci sequence. Now, hopefully you know Fibonacci is exponential. Let's bring something that is already prooved in order to help us reduce the work here, we know that $f_h=\frac{\varphi^h}{\sqrt{5}}$ (refs:https://en.wikipedia.org/wiki/Fibonacci_number) the above method require rounding the result into the nearsest integer in order to give the exact result of the Fibonacci sequence, crazzy stuffs and obviously we don't need to know why that's true, just take it as fact. And conveniently $\varphi>1$, also we don't need to remember what $\varphi$ is($\approx1.618$), except it is bigger than 1. So we have an exponential bound, this is good news. What we really wanna know is how $h$ relates to $n$, which is just inverting the formula. So we have, on the other hand, $\frac{\varphi^h}{\sqrt{5}}<n_h$ , put on $log_\varphi$ on both sides seems like a good thing to do. We get $h - log_{\varphi}\sqrt{5}<log_{\varphi}n$ with $log_{\varphi} \approx1.440\times lgn$, because after all, log base 2 is what computer scientists care about. So just to put it into perspective, now we claim that the height of an AVL tree is always less than $1.440\times lgn$ and $1.44$ is a reasonable constant I believe, maybe we'd like $1$, there are BSTs that achieve $1$ plus a very tiny thing.
- Okay so this is kinda of the hard way to argue that the height of an AVL tree is bounded by $O(lgn)$, there's a much easier way to analyze this recurrence though $n_h=n_{h-2}+n_{h-1}+1$.
  - This is the theorectical computer scientist way to solve this recurrence, we don't care about constants.
  - And so we say, aw, this is hard, I've got $n_{h-1}$ and $n_{h-2}$, aw, so asymetric, let's symmetrify. Could we make them both $n_{h-1}$ or $n_{h-2}$ ?
  - $n_{h-2}$ is the right way to go because we want to know $n_h$ is greater than something in order to get a less than down here. So we have $n_h>2n_{h-2}+1$ because if we have a larger height we're going to have more nodes. We can even get rid of the $1$ because that only makes things bigger, so we have $n_h>2n_{h-2}$ . Now from this version of the recurrence, let's use inductive reasoning to solve it.
- All right, so far so good, now the next big question is how the heck can we maintain this AVL properties for our good old BST?

## How to maintain the AVL invariant when the BST tree is modified

- **Insertion**:
  - Step 1: Do simple BST insertion, and this one will not preserve the AVL property.
  - Step 2: Calculate the balance factor of the sub-tree related to the newly inserted node to check if it violates the AVL properties on that sub tree then we're going to fix that recursively when we going up from the first bottom of the recursive function.
- **Deletion**:
  - Step 1: Do simple BST deletion, and this one will not preserve the AVL property.
  - Step 2: Calculate the balance factor of the related sub-tree after the node is deleted to check if it violates the AVL properties on that sub tree then we're going to fix that recursively when we going up from the first bottom of the recursive function.
- Ok, sound like we're gonna have ways or precisely tools to fix the AVL properties, and that tool is **rotations**, super cool tools.
- ![](assets/self-balanced-bsts---avl-trees_rotations-for-binary-tree-nodes.webp)
- For left-rotate, whatever the parent of $X$ was becomes the parent of $Y$ and vice versa, in fact. The parent of $Y$ was $X$, and now the parent of $X$ is $Y$. The parent of $A$ is still $X$, the parent of $B$ changes, it used to be $Y$ now it's $X$. The parent of $C$ was $Y$, it's still $Y$. We call it left-rotate because the root moves to the left.
- For right-rotate, it a reverse operation with the left-rotate that let us manipulate the tree assymetrically.
- So in a constant number of pointer changes, we can perform what so called node rotation and more importantly it satisfies the BST order property, if we do an in-order traversal of this we will get $A,X,B,Y,C$ at the first state, not just a coincident the same is true for the in-order traversal of the second state. $B$ was some number of nodes between $X$ and $Y$, and it still some number of nodes between $X$ and $Y$, and so on you can expand the example tree and check more on yourself.
- In my humble opinion, it's like the only thing you need to know in BST along with how to do the search.
- Ok that's rotations by pictures, to talk about them in detail, we have to look at their specific cases:
  - Case 1: I call this case "right child skewed to the right"
  - ![](assets/self-balanced-bsts---avl-trees_right-child-skewed-to-the-right.webp)
  - We rotate-left self (parent of the right child that is skewed) to balance the sub-tree
  - Case 2: I call this case "left child skewed to the left"
  - ![](assets/self-balanced-bsts---avl-trees_left-child-skewed-to-the-left.webp)
  - We rotate-right self (parent of the left child that is skewed) to balance the sub-tree
  - Case 3: I call this case "right child skewed to the left"
  - ![](assets/self-balanced-bsts---avl-trees_right-child-skewed-to-the-left.webp)
  - We rotate-right the right child that is skewed to achieve case 1, then we perform solution for case 1.
  - Case 4: I call this case "left child skewed to the right"
  - ![](assets/self-balanced-bsts---avl-trees_left-child-skewed-to-the-right.webp)
  - We rotate-left the left child that is skewed to achieve case 2, then we perform solution for case 2.
- The common pitfall here is to think that we only need to fix that one violated local sub-tree that related to the insertion/deletion, where we only fix the lowest violation of the AVL property there maybe violations higher up. We need to fix the violation all the way up to the root from the insertion/deletion point.
- Suppose $X$ is the lowest node violating the AVL properties, the way we find this node is we start at the node that we changed (insert/delete), we update the height based on the heights of its children and check if it's ok as we go up, and we keep walking up until we see, oh, the left is $+2$ larger than the right or vice versa, then we fix it.
- Phew, it's a long article though. Hope you get some sense of the idea of AVL trees. If you looking for an example implementation of it, I've coded a version of an AVL tree for storing integers in Go you can take it as reference: https://github.com/mirageruler/Data-Structures-and-Algorithms-Implementations/blob/main/data_structures/tree/avl.go. In the near future, I'm looking forward to augment it to support generic types and see if I can leverage concurrency to speed up the algorithms which mean to deal with all sorts of the concurrency related problems.

## References:

- https://en.wikipedia.org/wiki/AVL_tree
- https://www.youtube.com/watch?v=9Jry5-82I68&list=PLUl4u3cNGP61Oq3tWYp6V_F-5jb5L2iHb&index=5
- https://www.youtube.com/watch?v=FNeL18KsWPc&list=PLUl4u3cNGP61Oq3tWYp6V_F-5jb5L2iHb&index=6
- https://www.youtube.com/watch?v=r5pXu1PAUkI&list=PL-K_ib5mxHXnukhVpx_wMun21O2GQUEE0&index=5
- https://www.youtube.com/watch?v=IWzYoXKaRIc&list=PL-K_ib5mxHXnukhVpx_wMun21O2GQUEE0&index=6
