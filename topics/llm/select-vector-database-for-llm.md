---
title: Select vector database for LLM
description: An overview of vector databases and their application in LLM systems. This article covers the history and core concepts of vector databases, their use cases, implementation considerations with LLMs, and a comparison of popular vector database options.
date: 2023-05-18
authors:
  - thanhpn
github_id: thanhpn
tags:
  - ai
  - vector-database
  - llm
redirect:
  - /s/-yBSAQ
---

During our research on applying LLM to real-world applications, we have observed the widespread usage and increasing popularity of Vector databases in various fields. Therefore, we have delved into understanding and summarizing what we have learned in this article.

## History of vector database

Vector databases have emerged as a crucial component in natural language processing and machine learning. They are built upon the idea of representing data as vectors in high-dimensional spaces. Vector databases efficiently store and retrieve vector representations, allowing for fast similarity-based searches. They have evolved from word embeddings to support various linguistic units and complex data structures. By leveraging vector databases, models like GPT can access and utilize pre-computed vector representations, enhancing their semantic understanding and information retrieval capabilities. The development of vector database technologies is expected to continue advancing, providing more sophisticated solutions for managing and utilizing vector representations in diverse applications.

## What is vector database

A vector database is a specialized database designed to store, manage, and query vector data. Unlike traditional databases that focus on structured data, vector databases are optimized for the storage and manipulation of high-dimensional vector representations. They enable efficient handling of vector data, allowing for complex operations such as vector similarity search, clustering, and recommendation.

## Use case of vector database

- Long term memory for LLM
- Semantic search: search base on the meaning of the context
- Similarity search for text, image, audio, video data
- Personalization and Recommendation engine: storing and querying user preferences or behavior vectors.
- Biometrics and Identity Verification: fingerprint matching, voice recognition, and facial recognition.
- Fraud Detection and Anomaly Detection: historical data or user behavior patterns to identify fraudulent activities, detect anomalies in data streams, and flag suspicious patterns

## Core concept of vector database

- Data is transformed into vectors using a specific algorithm, and similar data points on the same coordinate system have close distances.
- Data is stored in a data structure optimized for vector queries.
- Indexing in vector databases differs from traditional databases. Vector databases use algorithms like KD-tree and LSH for clustering and sorting.
- Searching in vector databases:
  - Nearest neighbor search: Find the nearest vector to a given input vector.
  - Similarity computation: Calculate the similarity between vectors using metrics like Euclidean distance and cosine similarity.
- Implementation considerations:
  - Choosing the appropriate number of dimensions for vectors is important for performance and storage resource utilization, ensuring coverage of the entire dataset.
  - Selecting the suitable search algorithm (Cosine similarity, DotProduct, Euclidean distance).

## Using vector database with LLM

### Choosing the right vector encoding

LLMs typically use models like Word2Vec, BERT, and transformer-based variants.

### Configuring proper vector search parameter

To achieve optimal efficiency, configure the search parameters appropriately. Pay attention to parameters such as:

- Match threshold: 0.78
- Match count: 10
- Minimum content length: 50

### Selecting the suitable metric for content

- Cosine Similarity:
  - Cosine Similarity calculates the cosine of the angle between two vectors. It measures the directional similarity of vectors.
  - The Cosine Similarity value ranges from [-1, 1], where 1 represents identical vectors and -1 represents completely opposite vectors.
  - This algorithm is commonly used in tasks like text classification, recommendation systems, and natural language processing.
- Dot Product:
  - Dot Product calculates the dot product of two vectors, which is the sum of the products of their corresponding components.
  - The result is a scalar value that indicates the level of linear correlation between two vectors.
  - The Dot Product algorithm is often used in applications such as machine learning, data clustering, and image recognition.
- Euclidean Distance:
  - Euclidean Distance calculates the Euclidean distance between two vectors. It measures the length-based distance between two points in space.
  - The Euclidean Distance value is a positive number that represents the direct distance between two vectors.
  - This algorithm is commonly used in tasks such as clustering, classification, and image processing.
- Indexing Choices on Some Databases:
  - Pinecone: Choose based on Pods and quantity.

## Compare popular vector database

|                                                  | Pinecone                  | Qdrant                                       | Supabase     | Weaviate                               | Milvus                                                                       | Chroma |
| ------------------------------------------------ | ------------------------- | -------------------------------------------- | ------------ | -------------------------------------- | ---------------------------------------------------------------------------- | ------ |
| Build for vector database                        | y                         | y                                            | n            | y                                      | y                                                                            | y      |
| Open source                                      | n                         | y                                            |              |                                        | y                                                                            | y      |
| Roll-based Access Control (RBAC)                 | y                         | No. Authentication only                      | y            | Coming soon                            | y                                                                            |        |
| Disk Index support                               | y                         | y                                            | y            | y                                      | y                                                                            |        |
| Hybrid Search (ie Scalar filtering)              | Yes with Scalar filtering | Yes (combine vector and traditional indices) | y            | Yes (combine Sparse and Dense Vectors) | Yes with Scalar filtering                                                    |        |
| Partitions/namespaces/logical groups             | y                         | n                                            | y            | n                                      | y                                                                            |        |
| Index type supported                             | y                         | 1 (HNSW)                                     | B-Tree, Hash | 1 (HNSW)                               | 9 (FLAT, IVS_FLAT, IVF_SQ8, IVF_PQ, HNSW, ANNOY, BIN_FLAT, and BIN_IVF_FLAT) |        |
| Database rollback                                | y                         | y                                            | y            | y                                      | y                                                                            |        |
| Tunable consistency                              | y                         | y                                            | y            | y                                      | y                                                                            |        |
| Support for both stream and batch of vector data | y                         | n                                            | y            | y                                      | y                                                                            |        |
| Binary Vector support                            | y                         | n                                            | y            | y                                      | y                                                                            |        |
| Multi-language SDK                               | Python, Node.js           | Python, Go, Rust                             | y            | Python, Java, Go                       | Python, Java, Go, C++, Node.js                                               |        |

These vector databases offer various features and optimizations to handle large-scale vector data efficiently. The choice of the most suitable vector database depends on factors such as the specific requirements of your language model, the size of the dataset, the expected query throughput, and the available hardware resources. It is recommended to evaluate and benchmark different vector databases to determine which one best fits your specific use case.

## References

- [https://qdrant.tech/benchmarks/?gad=1&gclid=Cj0KCQjwsIejBhDOARIsANYqkD0ZtNrEujSDsjGPsOmSGRtJaIYvQct3kvojBEQPJxrcdL7lC9IaLVQaAnMjEALw_wcB](https://qdrant.tech/benchmarks/?gad=1&gclid=Cj0KCQjwsIejBhDOARIsANYqkD0ZtNrEujSDsjGPsOmSGRtJaIYvQct3kvojBEQPJxrcdL7lC9IaLVQaAnMjEALw_wcB)
- [https://slashdot.org/software/comparison/Embeddinghub-vs-Milvus-Database-vs-chroma/](https://slashdot.org/software/comparison/Embeddinghub-vs-Milvus-Database-vs-chroma/)
