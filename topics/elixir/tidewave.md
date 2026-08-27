---
draft: false
title: Understanding Tidewave.ai
description: Discover how Tidewave connects AI assistants to your web framework's runtime through MCP, enabling real-time interaction with your application. Learn about its features, benefits, and how to get started.
date: 2025-06-12
authors:
  - tieubao
tags:
  - elixir
  - phoenix
  - rails
  - ai
  - mcp
  - development-tools
  - tidewave
  - dashbit
---

Tidewave.ai is a development tool designed to enhance web application development by integrating AI assistants with your application's runtime environment. Below is a detailed breakdown to help understand its purpose, features, and functionality.

## What is Tidewave?

Tidewave is a collection of open-source tools that connect AI assistants (e.g., Claude, GitHub Copilot, or Cursor) to your web framework's runtime through a **Model Context Protocol (MCP)** server. This allows AI to go beyond static code analysis and interact with your application in real-time, understanding its behavior, logs, database, and more. It's developed by **Dashbit**, the creators of Elixir and Livebook, and currently supports **Phoenix** (Elixir) and **Rails** frameworks, with plans for broader framework support.

## Key features

1. **Runtime intelligence**:

- Tidewave runs an MCP server within your web app, enabling AI assistants to access runtime data like logs, database queries, WebSocket connections, or background jobs. This makes AI more context-aware, helping it debug errors or suggest code aligned with your app's actual behavior.
- *Example*: You can ask the AI to check open WebSocket connections or execute a database query using your app's models.

2. **Integration with editors and AI tools**:

- Tidewave integrates with editors (e.g., VSCode, Zed) and AI assistants that support MCP. You connect it by pointing your editor to the MCP endpoint (e.g., `http://localhost:4000/tidewave/mcp` for Phoenix).
- It enhances AI tools like Claude Desktop, turning them into intelligent coding agents that can edit files, compile code, and fix errors automatically.

3. **Code execution and workflow automation**:

- Tidewave allows AI to execute code within your project using tools like `project_eval` (for running code in your language's runtime) or `shell_eval` (for terminal commands). This streamlines tasks like validating APIs or running SQL queries without external tools.
- You can define workflows in your preferred language (e.g., using a GitHub client library) and have the AI use them, keeping everything version-controlled.

4. **Security and configuration**:

- Tidewave is designed for development, not production, and includes security features like restricting access to localhost by default or using Docker for isolation.
- For Phoenix, you can configure options like `allowed_origins` to prevent cross-origin attacks or enable remote access if needed.

5. **Future plans**:

- Tidewave aims to add **Page Intelligence**, a paid service to enhance AI's understanding of user interfaces and business logic.
- It plans to support more frameworks and improve AI's ability to align code with business requirements, especially in testing and UI development.

## How it works

- **Setup**: Add Tidewave to your Phoenix or Rails app. For Phoenix, modify your endpoint configuration to include the Tidewave plug, which runs the MCP server at a specific endpoint (e.g., `/tidewave/mcp`).
- **AI interaction**: Your editor or AI assistant connects to this endpoint, allowing the AI to introspect your app's runtime. You can then issue commands like "add a pricing selector to my page" or "debug this error by checking logs."
- **Example**: In a demo, José Valim (Tidewave's creator) used Claude Desktop with Tidewave to add a pricing selector to a Phoenix app. The AI edited files, compiled the project, and fixed syntax errors automatically, leveraging runtime context.

## Benefits

- **Productivity boost**: Users report significant productivity gains, especially with tools like VSCode and GitHub Copilot, for tasks involving 30-100 lines of code across multiple files.
- **Context-aware AI**: Unlike traditional AI tools that rely on static code, Tidewave's runtime access reduces errors (e.g., hallucinated functions) and makes suggestions more relevant.
- **Open source**: The MCP server is open-source and available on GitHub, encouraging community contributions and transparency.

## Limitations and considerations

- **Not for production**: Tidewave is explicitly for development environments due to security risks if exposed in production.
- **Learning curve**: Configuring Tidewave and optimizing AI prompts (e.g., using "think" or specifying tools like `project_eval`) may require experimentation.
- **Tool compatibility**: If your editor or AI doesn't support MCP, you may need an MCP proxy. Some users reported issues with free-tier AI tools (e.g., Claude in Zed) due to token limits.
- **Early stage**: As of June 2025, Tidewave is still new (version 0.1.7), with some features like Page Intelligence not yet available.

## How to get started

1. Visit **tidewave.ai** for documentation and setup instructions.
2. Check the GitHub repositories for Phoenix (`tidewave-ai/tidewave_phoenix`) or Rails (`tidewave-ai/tidewave_rails`) to install Tidewave.
3. Follow the integration guide for your editor/AI tool, ensuring it supports MCP or uses a proxy.
4. Experiment with specific prompts to leverage Tidewave's tools (e.g., "use project_eval to test this API").
5. Join the waitlist survey on their site to influence future framework support.

## Why it matters

Tidewave bridges the gap between AI's textual understanding of code and the structured, runtime context of web applications. By giving AI access to your app's runtime, it enables smarter, faster development, aligning AI tools more closely with how developers think and work.

## References

- [Tidewave.ai Official Website](https://tidewave.ai)
- [Tidewave Phoenix GitHub Repository](https://github.com/tidewave-ai/tidewave_phoenix)
- [Tidewave Rails GitHub Repository](https://github.com/tidewave-ai/tidewave_rails)
- [Dashbit Announcement on Tidewave](https://dashbit.co/blog/tidewave-ai) (Assumed source for context, not directly accessed)
- [X Post by @josevalim on Tidewave Demo](https://x.com/josevalim/status/XXXX) (Placeholder; specific post not provided in search results but referenced for demo context)
