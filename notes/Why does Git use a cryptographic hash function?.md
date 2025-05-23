---
title: null
description: null
date: null
tags:
  - git
  - practice
redirect:
  - /s/ENaFaw
---

Why does Git use [SHA-1](http://en.wikipedia.org/wiki/SHA-1), a cryptographic hash function, instead of a faster non-cryptographic hash function?

## Related question

Stack Overflow question _[Why does Git use SHA-1 as version numbers?](https://stackoverflow.com/questions/11233591)_ asks why Git uses SHA-1 as opposed to sequential numbers for commits.

TLDR;

- From 2005 up to 2018/Git 2.18: [SHA-1](https://en.wikipedia.org/wiki/SHA-1) (see below)
- [2019, will switch at some point](https://stackoverflow.com/a/47838703/6309) to [SHA-256](https://en.wikipedia.org/wiki/SHA-2)

---

You can check that from [Linus Torvalds himself, when he presented Git to Google back in 2007](http://www.youtube.com/watch?v=4XpnKHJAok8&t=56m16s): (emphasis mine)

> We check checksums that is considered cryptographically secure. Nobody has been able to break SHA-1, but the point is, **SHA-1 as far as git is concerned, isn't even a security feature. It's purely a consistency check**. The security parts are elsewhere. A lot of people assume since git uses SHA-1 and SHA-1 is used for cryptographically secure stuff, they think that it's a huge security feature. It has nothing at all to do with security, it's just the best hash you can get.
>
> **Having a good hash is good for being able to trust your data**, it happens to have some other good features, too, it means when we hash objects, we know the hash is well distributed and we do not have to worry about certain distribution issues.
>
> Internally it means from the implementation standpoint, we can trust that the hash is so good that we can use hashing algorithms and know there are no bad cases.
>
> So there are some reasons to like the cryptographic side too, but it's really about the ability to trust your data. I guarantee you, if you put your data in git, you can trust the fact that five years later, after it is converted from your harddisc to DVD to whatever new technology and you copied it along, **five years later you can verify the data you get back out is the exact same data you put in. And that is something you really should look for in a source code management system**.

---

Update Dec. 2017 with Git 2.16 (Q1 2018): this effort to support an alternative SHA is underway: see "[Why doesn't Git use more modern SHA?](https://stackoverflow.com/a/47838703/6309)".

---

I mentioned in "[How would git handle a SHA-1 collision on a blob?](https://stackoverflow.com/a/9392525/6309)" that you _could_ engineer a commit with a particular SHA1 _prefix_ (still an extremely costly endeavor). But the point remains, as [Eric Sink](http://ericsink.com/) mentions in "[Git: Cryptographic Hashes](http://ericsink.com/vcbe/html/cryptographic_hashes.html)" ([Version Control by Example (2011) book](http://ericsink.com/vcbe/html/index.html):

> It is rather important that the DVCS never encounter two different pieces of data which have the same digest. Fortunately, good cryptographic hash functions are designed to make such collisions extremely unlikely.

It is harder to find [good non-cryptographic hash](http://en.wikipedia.org/wiki/List_of_hash_functions) with low collision rate, unless you consider research like "[Finding State-of-the-Art Non-cryptographic Hashes with Genetic Programming](http://e-archivo.uc3m.es/bitstream/handle/10016/3987/finding_LNCS_2006_ps.pdf?sequence=1)".

You can also read "[Consider use of non-cryptographic hash algorithm for hashing speed-up](https://github.com/markfasheh/duperemove/issues/24)", which mentions for instance "[**xxhash**](https://code.google.com/p/xxhash/)", an extremely fast non-cryptographic Hash algorithm, working at speeds close to RAM limits.

---

Discussions around changing the hash in Git are not new:

- Either [to optimize it (August 2009)](http://www.mail-archive.com/bug-coreutils@gnu.org/msg17297.html), but you have to take license issue:

(Linus Torvalds)

> There's not really anything _remaining_ of the mozilla code, but hey, I started from it. In retrospect I probably should have started from the PPC asm code that already did the blocking sanely - but that's a "20/20 hindsight" kind of thing.
>
> Plus hey, the mozilla code being a horrid pile of crud was why I was so convinced that I could improve on things. So that's a kind of source for it, even if it's more about the motivational side than any actual remaining code ;)

And you need to be careful about [how to measure the actual optimization gain](http://www.mail-archive.com/bug-coreutils@gnu.org/msg17305.html)

(Linus Torvalds)

> I pretty much can guarantee you that it improves things only because it makes gcc generate crap code, which then hides some of the P4 issues.

- Or to [change it altogether (January 2010)](http://lwn.net/Articles/370907/) (for instance to SHA-3, but that would apply to any other hash):

(John Tapsell - [`johnflux`](https://github.com/johnflux))

> **The engineering cost for upgrading git from SHA-1 to a new algorithm is much higher**. I'm not sure how it can be done well.
>
> First of all we probably need to deploy a version of git (let's call it version 2 for this conversation) which allows there to be a slot for a new hash value even though it doesn't read or use that space -- it just uses the SHA-1 hash value which is in the other slot.
>
> That way once we _eventually_ deploy yet a newer version of git, let's call it version 3, which produces SHA-3 hashes in addition to SHA-1 hashes, people using git version 2 will be able to continue to inter-operate. (Although, per this discussion, they may be vulnerable and people who rely on their SHA-1-only patches may be vulnerable.)

In short, switching to _any_ hash is not easy.

---

Update February 2017: yes, it is in theory possible to compute a colliding SHA1: [**shattered.io**](https://shattered.io/)

> How is GIT affected?
>
> GIT strongly relies on SHA-1 for the identification and integrity checking of all file objects and commits. It is essentially possible to create two GIT repositories with the same head commit hash and different contents, say a benign source code and a backdoored one. An attacker could potentially selectively serve either repository to targeted users. This will require attackers to compute their own collision.

But:

> This attack required over 9,223,372,036,854,775,808 SHA1 computations. This took the equivalent processing power as 6,500 years of single-CPU computations and 110 years of single-GPU computations.

So let's not panic just yet. See more at "[**How would Git handle a SHA-1 collision on a blob?**](https://stackoverflow.com/a/42450327/6309)".
