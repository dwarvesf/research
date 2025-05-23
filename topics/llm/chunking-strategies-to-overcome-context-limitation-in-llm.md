---
title: Chunking strategies to overcome context limitation in LLM
description: This article explores chunking strategies to handle context limitations in Large Language Models (LLMs) like GPT. It covers preprocessing data, selecting chunk sizes, and how to maintain coherence in various content types such as unstructured, Markdown, and LaTeX.
date: 2023-07-08
authors:
  - zlatanpham
github_id: zlatanpham
tags:
  - ai
  - vector-database
  - llm
redirect:
  - /s/kPbQrg
---

When it comes to Large Language Models (LLMs) like GPT, managing context size - the number of tokens per prompt - is a unique challenge. As it stands, GPT-3.5 can process up to 4096 tokens, roughly equivalent to 3000 English words. This limitation creates difficulties for tasks requiring the consumption of large amounts of text, such as retrieving information from extensive documentation or keeping track of [[Dealing with Long-Term Memory in AI Chatbot | a long chat history]]. Despite the potential of future models such as GPT-4 to support larger context windows, there may be a significant trade-off in terms of increased computational power and latency costs. To address these challenges, a viable strategy is ‘chunking’ - a process that involves dissecting large volumes of text into smaller, more manageable segments. These segments are then fed to an embedding model before being stored in a vector database for tasks such as similarity search. This note will explore different chunking strategies to overcome the limitations of LLM and ensure that the output remains coherent and meaningful.

## The crucial step of preprocessing

Before getting into chunking, it is paramount that the data you use is of high quality. The first step in achieving this is through preprocessing. In essence, preprocessing involves cleaning the data, and this could mean removing any unnecessary elements that might add 'noise' or dilute the quality of your content. For instance, if your data is from the web, removing HTML tags and other non-textual elements will help to reduce the noise in your data.

## Selecting an appropriate chunking method

Following preprocessing, the next stage is to decide on a suitable range of chunk sizes to experiment with, based on the nature of your content and the capabilities of your embedding model. Here are two major considerations:

- **Content type**: This could range from short messages to lengthy documents, formatted or non-formatted content, or even specialized content types like Markdown or LaTeX.
- **Embedding model**: Factors such as token limits and relevance of output could affect your choice of chunking method.

### Chunking 'non-structured' content

Unstructured content, which lacks any specific pattern, typically requires fixed-size chunking. This involves deciding on the number of tokens in each chunk and considering overlaps between chunks to ensure that the semantic context remains intact. Strategies for this approach might include splitting chunks at sentence ends (marked by periods) or at line breaks. For instance, the LangChain library offers tools for splitting text based on chunk size or separator:

```python
text = "..." # your text
from langchain.text_splitter import CharacterTextSplitter

text_splitter = CharacterTextSplitter(
    separator = ".",
    chunk_size = 256,
    chunk_overlap  = 20
)
docs = text_splitter.create_documents([text])
```

However, simple symbol-based splitting can sometimes fall short. Libraries such as the Natural Language Toolkit (NLTK) and spaCy, designed for human language data, can create more meaningful chunks:

```python
from langchain.text_splitter import NLTKTextSplitter

text = "..." # your text
text_splitter = NLTKTextSplitter()
docs = text_splitter.split_text(text)
```

```python
text = "..." # your text
from langchain.text_splitter import SpacyTextSplitter

text_splitter = SpaCyTextSplitter()
docs = text_splitter.split_text(text)
```

### Chunking 'structured' content

In the case of content formatted such as Markdown or LaTeX, chunking can be more nuanced, with the aim of preserving the original structure of the content:

**Markdown**: This lightweight markup language is often used to format text. Recognizing the Markdown syntax (like headings, lists, and code blocks) allows for intelligent content division based on its structure and hierarchy, leading to more coherent chunks:

```python
from langchain.text_splitter import MarkdownTextSplitter
markdown_text = "..."

markdown_splitter = MarkdownTextSplitter(chunk_size=100, chunk_overlap=0)
docs = markdown_splitter.create_documents([markdown_text])
```

**LaTex**: Commonly used for academic papers and technical documents, LaTeX chunking can parse commands and environments to respect the logical organization of the content, providing accurate and contextually relevant results:

```python
from langchain.text_splitter import LatexTextSplitter
latex_text = "..."

latex_splitter = LatexTextSplitter(chunk_size=100, chunk_overlap=0)
docs = latex_splitter.create_documents([latex_text])
```

## Conclusion

In summary, the challenge of context size in LLMs like GPT is far from insurmountable. With careful data preprocessing and intelligent chunking strategies, it's entirely possible to extract meaningful and accurate information from even the largest volumes of text.

## Reference

- <https://www.pinecone.io/learn/chunking-strategies/>
