---
title: Build an assistant on the terminal
description: Mimir is a fast CLI tool that uses AI and heuristic methods to provide precise programming answers and debugging help directly in your terminal without browsing the web.
date: 2020-03-27
tags:
  - tutorial
redirect:
  - /s/r8lL2w
---

## Introduction

When coding, developers look for references constantly. "What does this snippet of code do?", "How to implement something in this programming language?", etc. According to the StackOverflow blog[1], the page itself saw more than 9 billion page views in 2019. There is also an unrecorded amount of views on other developer blogs and tutorials online. That was an enormous amount of developers searching for supports.

Terminal assistant is a tool that brings the supports that developers searching for to your terminal. Instead of looking for answers on web browsers, you can ask this 'assistant' on your terminal and it will answer your confusion when you are coding.

The name of this tool, 'Mimir' is based on a character in the game _God of war_ ™ (2018). While Mimir hanging from the hip of Kratos and guiding him to the world of Norse Gods with his knowledge, this tool will hang from your terminal guide you to the world of programming.

## Description

This tool is a Command Line Interface (CLI) tool, which means it runs on your terminal. It takes your question as an input e.g. "What is a stack?", then it looks for the answer online, parses the answer, and prints the answer on your terminal.

Additionally, this tool can be served as a rubber duck debugger on your terminal. You can 'chat' with this assistant to explain your code and it will patiently 'listen' to your explanation. Sometimes, it will respond with some words of encouragement.

## Related works

There is a wonderful work on the idea of the CLI coding answer called _[howdoi](https://github.com/gleitz/howdoi)_, which received 8.4k stars on Github. This tool embraced the problem of searching for an answer with the help of using common online search engines (Google, Bing, and Duckduckgo). It searches the users' questions using these engines, then it gets the HTML content of the first web result and parses the answer from the HTML content based on HTML and returns the answer to the user.

This tool is awesome (it recently evolving into extensions on popular code editors), however, it still suffers from high false positive, as it depends on users' questions (maybe too rambling) and search engines. Our works aim to counter this with the use of Artificial Intelligence (AI) approaches, specifically, heuristic and language processing approaches.

## Challenge

The most critical criteria for this tool is time performance. Developers expected their answer must be answered in seconds, otherwise, they just need to use the web browsers to look for an answer. However, machine learning and word embedding approaches are not very time efficient and quite large (a few hundred MB) for a CLI tool, therefore we are limited with small and simple language processing approaches.

The second constraint is precision. We expect the tool to provide the most suitable and relevant answers available. Therefore pre-processing the users' input and summarize the response is essential. To sum up, the significant challenge of this tool is to balance time efficiency and precision.

## Implementation

### Programming language and frameworks

When involving AI, mostly the idea of using `Python` popped out immediately. `Python` is great at AI programming, especially in machine learning, as it has a variety of optimized libraries on calculations suitable for the task (e.g. _NumPy, TensorFlow,, sklearn, etc._). However, this tool is not AI-heavy, as it only uses small heuristic and language processing approaches. This tool is network heavy, as it rapidly collects answers from the Internet. Thus, We choose `Go` as the programming language, which is great at handle network requests. Furthermore, it is more fun to implement AI algorithms from scratch instead of using pre-defined libraries.

For the CLI framework, We are using _[Cobra](https://github.com/spf13/cobra)_. This framework is great for creating CLI applications.

### Application flow

![](assets/build-an-assistant-on-the-terminal_898d0616614b4483301cd1793967a1ef_md5.webp)

The tool takes the users' input and extracted its keywords using the TextRank algorithm. Then, the keywords are pushed through a layer of heuristic function to determine where it should get the answer and how to parse the answer. The answer was then summarized using the TF-IDF algorithm and formatted and returned to users.

### TextRank

_TextRank_ [2] is a keyword extractor algorithm based on _PageRank_ [3]. Theoretically, _TextRank_ maps the text corpus (mostly with stop words (preposition, conjunctions, etc..) removed) into a graph. Each node in the graph is given a score. Then, through multiple loops, the score of each node is recalculated as the sum of the weighted score of the neighbor nodes. The loops stop after a pre-defined number of loops or when the scores are saturated.

For example, the sentence `The quick brown fox jumps over the lazy dog`, after removing stop words (resulting in `quick brown fox jumps over lazy dog`), can be mapped into the graph below, using a window-based mapping approach, as presented in the original paper. Additionally, the word embedding approach can be used to map the text into a different graph, but this approach is resource-heavy, so we are going to stick with the original window-based approach.
