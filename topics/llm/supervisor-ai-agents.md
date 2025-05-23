---
title: Building agent supervisors to generate insights
description: In the rapidly evolving field of artificial intelligence, the concept of agent supervisors has emerged as a powerful approach to orchestrating multiple AI agents for complex tasks. This article explores how building agent supervisors can lead to generating valuable insights, with a focus on a practical implementation in a Discord bot.
date: 2024-07-11
authors:
  - minhluuquang
tags:
  - ai
  - llm
  - supervisor-architecture
redirect:
  - /s/tG9ofA
---

## Introduction

In the rapidly evolving field of artificial intelligence, the concept of agent supervisors has emerged as a powerful approach to orchestrating multiple AI agents for complex tasks. This article explores how building agent supervisors can lead to generating valuable insights, with a focus on a practical implementation in a Discord bot.

![](assets/supervisor-ai-agents.webp)

## Case study: Discord bot with supervisor architecture

Our team has developed a Discord bot that leverages the agent supervisor approach using Langgraph. This system demonstrates the capabilities and nuances of coordinating multiple specialized agents to handle user queries efficiently and generate insights from various data sources.

### Key components

The system comprises four main components: the user interface, the supervisor, the agents, and the databases. The **user interface** is implemented through Discord chat, where users input their queries using slash commands. The **supervisor**, built with Langgraph, orchestrates the workflow and decision-making process. When a query is received, it evaluates its nature and determines which agents should be activated to handle the request.

Two primary agents are employed in this system:

1. **SQL insights agent**: This agent translates text directly to SQL and queries the database. It handles queries that can be answered through structured data, executing SQL commands against a Postgres and formatting the results.

2. **Semantic insights agent**: Dealing with unstructured data, this agent leverages a vector database to perform semantic searches. It's useful for finding relevant messages or extracting insights from historical chat data on our Discord server.

The system utilizes two types of databases: a **relational database** to store Discord server events data and a **vector database** for semantic search capabilities.

### Workflow

The workflow begins when a user inputs a query through Discord using slash commands. The Langgraph-based supervisor receives and checks the query, and ultimately learns the user's intent. Based on this, it then routes the query to the appropriate agent – either the SQL insights agent for structured data queries or the Semantic insights agent for unstructured data insights.

The **SQL insights agent** translates text queries into SQL, executes them against the relational database, and processes the results. The **Semantic insights agent** performs semantic similarity searches using the vector database, retrieving and organizing relevant messages or insights based on preprocessed embeddings of Discord messages.

Finally, the results from either agent are synthesized and presented back to the user in Discord, providing a seamless experience from query to insight.

## SQL insights agent deep dive

The SQL insights agent is a critical component of the system, designed to bridge the gap between natural language queries and database operations. It employs a few step processes to ensure accurate and efficient query handling:

1. **Text-to-SQL conversion**: The agent uses **sqlcoder**, a model trained for text-to-SQL. It processes the user's input, identifies key entities and actions, and constructs a corresponding SQL query.

2. **SQL verification**: After generating the SQL command, the agent runs **llama-2**, to check the correctness of the SQL statement. llama-2 reviews the query for syntax errors, logical inconsistencies, and potential performance issues, suggesting or applying corrections as needed.

3. **SQL execution and result processing**: The verified SQL query is then executed against the PostgreSQL database. The retrieved data is processed to make sure it is clear, relevant, and presented in a user-friendly format. The agent also handles error cases, generating informative messages or suggestions for query rephrasing when necessary.

The SQL insights agent aims for a **95% success rate** in query execution and result retrieval, ensuring that most user queries are handled effectively and efficiently.

## Benefits of this architecture

The supervisor-agent architecture offers several benefits over a typical function-calling approach:

**Flexibility**. The supervisor can dynamically route queries to the most suitable agent, optimizing response accuracy and efficiency. The modular design allows it to be very extensible, enabling us to add new agents worry-free. It also simplifies maintenance and troubleshooting.

The **natural language interface** makes it very accessible, making the system usable for non-technical users unfamiliar with SQL or other query languages. This is a given for text-to-SQL agents, but with the advent of generative AI - we use this pattern quite a lot across our company to convert intent into programmatic queries and actions.

**Semantic search integration** allows for context-aware insights by using a vector database of preprocessed Discord messages. This helps with retrieval of relevant information even when exact keywords are not used, improving the relevance of results and ensuring comprehensive data utilization. It's a common pattern for large search engines, now much more accessible with tools available for LLMs.

**Robust error handling** is achieved through a few layers of verification and correction. We want to ensure that the SQL query that comes in isn't malformed or cause any issues.

## Challenges and considerations

Despite its benefits, the system faces several challenges:

1. **Query disambiguation**: Ensuring the supervisor correctly interprets user intent to route to the appropriate agent.
2. **Data privacy**: Handling sensitive information in Discord messages when preprocessing for the vector database.
3. **Performance optimization**: Balancing the load between SQL queries and semantic searches for efficient response times.
4. **Scalability**: Designing the system to handle increasing numbers of users and growing databases.

## Things to improve

There are two main areas for potential improvement:

1. **Larger models for better SQL accuracy**: Selecting more advanced LLMs could provide better context and give semantic nuance to text-to-SQL queries, increasing their accuracy.

2. **Better prompting strategies to reduce errors**: Smaller models could benefit significantly from few-shot prompting or more chained prompting strategies, which would increase their accuracy considerably.

## Conclusion

Our Discord bot implementation demonstrates the practical application of agent supervisors in creating intelligent, multi-faceted systems. By combining SQL capabilities with semantic search and wrapping it in a user-friendly interface, we've created a powerful tool for generating insights from both structured and unstructured data sources. As we continue to refine and expand this system, we anticipate even greater capabilities in bridging the gap between user queries and valuable insights.
