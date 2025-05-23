---
title: null
description: null
date: null
tags:
  - regex
redirect:
  - /s/N6qDGA
---

_Buzz Andersen (BA) is an interesting builder on the internet (and has been for some time, with stints at Apple, Square, Tumblr, and more) but has also emerged as an important and moral voice in technology’s evolution. He’s an incredible [twitter follow](https://mobile.twitter.com/buzz) and I always feel smarter for having interacted with him. - Colin (CJN)_

_**Buzz here.**_ On March 10, 2021, many Russian Internet users suddenly found they were having trouble accessing parts of the web. Kentik, a US-based network analysis company, [reported](https://twitter.com/DougMadory/status/1369648537634545673) that network traffic to Rostelecom, the Russian state telecom, was down as much as 24%, and cybersecurity Twitter was abuzz with speculation about the causes.

Eventually, a Russian artist and Twitter user named Gregory Khodyrev [realized](https://twitter.com/GregoryKhodyrev/status/1369658173334884360) what was going on: someone at Russia’s state Internet censor, Roscomnadzor, had attempted to block the Internet domain “t.co” (used by Twitter’s URL shortener), but had instead managed to cut off access to _any_ domain containing the text pattern “t.co.” This meant that sites such as “microsoft.com,” “reddit.com,” and even Russia’s own state media outlet “rt.com” were rendered suddenly inaccessible.

Readers with a modicum of technical knowledge may already have an inkling of what likely happened here: some hapless censor, attempting to [curb Twitter’s political influence](https://www.nytimes.com/2021/03/10/world/europe/russia-twitter.html), installed a URL pattern matching rule on Russia’s [national firewall](https://www.theguardian.com/technology/2019/apr/28/russia-great-firewall-sovereign-internet-bill-keeping-information-in-or-out) that turned out to have been just a tad overzealous. The rule in question was almost certainly expressed using a notoriously abstruse notation called a “regular expression.”

There is an old programmer joke (generally [attributed](http://regex.info/blog/2006-09-15/247) to Jamie Zawinski) that goes: “Some people, when confronted with a problem, think ‘I know, I'll use regular expressions.’ Now they have two problems.” In accidentally cutting off access to a large part of the Internet for an entire country (and in the process drawing embarrassing attention to Russia’s censorship efforts), our anonymous bureaucrat seems to have proven that old chestnut quite handily.

**Why is this interesting?**

A regular expression, or “regex,” is a kind of algebraic shorthand for specifying text patterns. Here, for example, is a regular expression that will match will match the words “sink,” “sank,” or “sunk.”

> _s[aiu]nk_

The brackets indicate that either “a,” “i,” or “u” are acceptable matches for the second character in the series.

Now, to make things slightly more interesting, we can add an optional element:

> _st?[aiu]nk_

The question mark makes “t” optional in the pattern, and means our expression can now match not only “sink,” “sank,” and “sunk,” but also “stink,” “stank,” and “stunk.”

Finally, to dramatically expand the number of text “strings” our expression can match, we can add a period (meaning “any character”) followed by an asterisk (meaning “as many as possible”).

> _s.\*nk_

Now our regex can match “stonk,” “slink,” or indeed any other word starting with “s” and ending with “nk.”

Most regular expression implementations also support a feature called “anchors,” which specify that the match must appear at the start or end of a text string. For example:

> _^t.co$_

The above expression matches the pattern “t.co”—but only if the “t” is the first character in the string and the “o” is the last. Without the “^” and “$,” by contrast, the expression would, as our anonymous Russian censor learned, match the pattern no matter where it appears in the string.

The concept of a regular expression has a surprisingly interesting history that dates back to the optimistic, mid-20th Century heyday of artificial intelligence research.

The term itself originated with mathematician [Stephen Kleene](https://en.wikipedia.org/wiki/Stephen_Cole_Kleene). In 1943, neuroscientist Warren McCulloch and logician Walter Pitts had just [described](https://web.csulb.edu/~cwallis/382/readings/482/mccolloch.logical.calculus.ideas.1943.pdf) the first mathematical model of an artificial neuron, and Kleene, who specialized in theories of computation, wanted to investigate what networks of these artificial neurons could, well, theoretically compute.

In a 1951 [paper](https://www.rand.org/content/dam/rand/pubs/research_memoranda/2008/RM704.pdf) for the RAND Corporation, Kleene reasoned about the types of patterns neural networks were able to detect by applying them to very simple toy languages—so-called “regular languages.” For example: given a language whose “grammar” allows only the letters “A” and “B”, is there a neural network that can detect whether an arbitrary string of letters is valid within the “A/B” grammar or not? Kleene developed an algebraic notation for encapsulating these “regular grammars” (for example, a*b* in the case of our “A/B” language), and the regular expression was born.

Kleene’s work was later expanded upon by such luminaries as linguist Noam Chomsky and AI researcher Marvin Minsky, who formally established the relationship between regular expressions, neural networks, and a class of theoretical computing abstraction called “finite state machines.”

[![](https://cdn.substack.com/image/fetch/w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2Ffb365073-fe9b-4c1b-a935-5d62ca57bd61_551x720.png)](https://cdn.substack.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2Ffb365073-fe9b-4c1b-a935-5d62ca57bd61_551x720.png)

These discoveries made early AI pioneers feel as if they were unlocking the fundamental mysteries of the mind, and for a while it seemed as if true machine intelligence might be just around the corner. Unfortunately, this heady early enthusiasm for this work was soon to hit a brick wall. In 1969, Minksy published his [controversial](https://www.jstor.org/stable/285702) book [Perceptrons](https://www.amazon.com/Perceptrons-MIT-Press-Introduction-Computational/dp/0262534770?crid=23RVCCWWS4T6Z&dchild=1&keywords=perceptrons&qid=1622757363&s=books&sprefix=perceptrons%2Cstripbooks%2C157&sr=1-1&linkCode=ll1&tag=noahbrierdotc-20&linkId=e3c3406b9d166fde261f9f0bc0356f00&language=en_US&ref_=as_li_ss_tl), which explored some important limitations of early neural networks—with devastating consequences for the emerging science and its pioneers. As Brian Christian writes in his book [The Alignment Problem](https://www.amazon.com/Alignment-Problem-Machine-Learning-Values/dp/0393868338?_encoding=UTF8&qid=1622757405&sr=1-1&linkCode=ll1&tag=noahbrierdotc-20&linkId=6d2115b8f431857031f2d7895f8d766f&language=en_US&ref_=as_li_ss_tl):

> _It is as if a dark cloud has settled over the field, and everything falls apart: the research, the money, the people. Pitts, McCulloch, and Lettvin, who have all three moved to MIT, are sharply exiled after a misunderstanding with MIT’s Norbert Wiener, who had been like a second father figure to Pitts and now won’t speak to him. Pitts, alcoholic and depressed, throws all of his notes and papers into a fire, including an unpublished dissertation about three-dimensional neural networks that MIT tries desperately to salvage. Pitts dies from cirrhosis in May 1969, at the age of 46.”_

The study of neural networks soon settled into a [long fallow period](https://en.m.wikipedia.org/wiki/AI_winter) as many researchers shifted their efforts away from “connectionist” theories (in which intelligence emerges from massively parallel networks) and toward a more paradigmatically familiar “symbolist” approach (which sought to develop intelligence by loading machines up with databases of facts and trying to teach them the rules of logic). The repudiation of neural nets was so thorough that it seems unlikely regular expressions would be so widely known outside of esoteric computer science today if it wasn’t for the efforts of [Ken Thompson](https://en.wikipedia.org/wiki/Ken_Thompson), one of the creators of the UNIX operating system at Bell Labs.

Thompson started [applying regexes](http://www.oilshell.org/archive/Thompson-1968.pdf) to more mundane tasks by integrating them into the advanced search feature of his QED text editor in 1968. From there, regular expressions became a mainstay of UNIX, used to provide “wildcard” matching pretty much anywhere in the operating system that text search is required. In the 1980s, [Larry Wall](https://en.wikipedia.org/wiki/Larry_Wall) gave regexes another boost by making them a core feature of his text-oriented programming language, [Perl](https://en.wikipedia.org/wiki/Perl), which went on to become the indispensable “duct tape” of 1990s web development. This secured regular expressions a permanent place in the workaday webmonkey toolbox—and a key role in the kind of back-office sysadmin work Russia’s firewall administrators are tasked with.

As for McCulloch, Pitts, Kleene, et. al, they eventually got their vindication. The early 2010s saw a resurgence of interest in neural networks, which in turn led to the advent of “deep learning” and massive advances in problems like facial recognition, machine translation, and autonomous vehicle navigation. So next time you’re puzzling through the inscrutable syntax for advanced search in your text editor, Internet search engine, or nationwide firewall, spare a thought for the once discredited AI pioneers who ended up making everything from wildcard matching to self-driving cars a reality. (_BA_)

**Comic of the Day:**

After yesterday’s Fastly outage, [this XKCD seems appropriate](https://xkcd.com/2347/). (_NRB_)

![](https://cdn.substack.com/image/fetch/w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2F794f1269-8ef9-4ef0-b324-e5743212053b_770x978.png)

**Quick Links:**

- [What is the 'magic' brake setting cost Hamilton in Baku – and why do Mercedes struggle at low-grip tracks?](https://www.formula1.com/en/latest/article.tech-tuesday-what-is-the-magic-brake-setting-that-cost-hamilton-in-baku-and.79Mw4XSrxksy7jen3CE8FX.html) (_NRB_)

- [The design history of Athens iconic apartments](https://www.bloomberg.com/news/features/2020-07-15/the-design-history-of-athens-iconic-apartments) (_NRB_)

- [Sponsored Link] If you’re at a SaaS company, check out [Variance](https://www.variance.com/). It’s a tool to help grow customers (some people are calling it a [PLG CRM](https://www.variance.com/land/plg-crm)). If you have questions or want to try it, [get in touch](https://www.variance.com/contact). (_NRB_)

---

#### Reference

https://whyisthisinteresting.substack.com/p/the-regular-expression-edition
