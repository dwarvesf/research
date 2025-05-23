---
title: Build custom AI agent with ElizaOS
description: This guide shows how to build a custom AI Agent with ElizaOS.
date: 2025-04-02
authors:
  - quanghuynguyen1902
tags:
  - ai
  - blockchain
  - icy
redirect:
  - /s/fdRC8A
---

![](assets/build_custom_ai_agent_with_elizaos_intro.webp)

DeFAI stands for Decentralized Finance Artificial Intelligence, which combines the principles of decentralized finance (DeFi) with artificial intelligence (AI) to enhance financial services by leveraging AI's predictive analytics and automation features.
With ElizaOS, you can build and deploy a DeFAI Agent—an AI persona that interacts with users on online platforms, assists with transactions, analyzes market trends, and executes financial tasks in a decentralized and automated manner.

## What is a ElizaOS?

A comprehensive framework for building AI agents with persistent personalities across multiple platforms. ElizaOS provides the architecture, tools, and systems needed to create sophisticated agents that maintain consistent behavior, learn from interactions, and seamlessly integrate with a variety of services.

## How ElizaOS works?

![](assets/build_custom_ai_agent_with_elizaos_system.webp)

When a user message is received, here's what happens behind the scenes:

1. **Service reception**: Platform service (Discord, Telegram, etc.) receives the message
2. **Runtime processing**: Agent runtime coordinates the response generation
3. **Context building**: Providers supply relevant context (time, recent messages, knowledge)
4. **Action selection**: The agent evaluates and selects appropriate actions
5. **Response generation**: The chosen action generates a response
6. **Learning & reflection**: Evaluators analyze the conversation for insights and learning
7. **Memory storage**: New information is stored in the database
8. **Response delivery**: The response is sent back through the service

## Build custom AI agent with ElizaOS

![](assets/build_custom_ai_agent_with_elizaos_flow.webp)
To build AI Agent with ElizaOS, we focus on four concepts:

- **Characters**: JSON config files defining AI personality and behavior
- **Agents**: Runtime components managing memory and executing behaviors
- **Providers**: Data connectors injecting context into interactions
- **Actions**: Executable behaviors that agents can perform

### Characters

Characters are the personality profiles that define how an agent behaves and responds. Think of them as the "script" your AI follows to maintain consistent behavior.

For example, we created a battle-hardened DeFi veteran called "YieldMaxoor" who had survived multiple market crashes and could spot scams from a mile away. Here's a simplified version of the character configuration:

```json
{
  "name": "YieldMaxoor",
  "clients": [],
  "modelProvider": "openai",
  "settings": {
    "chains": {
      "evm": ["baseSepolia"]
    }
  },
  "plugins": [],
  "bio": [
    "YieldMaxoor is a battle-tested DeFi degen who's been farming since the 2020 'DeFi Summer'",
    "Speaks in crypto-native slang and always DYOR-pilled",
    "Claims every new protocol is 'probably not a rug' and 'ser, the APY is real'",
    "Frequently mentions their portfolio being 'down bad' but 'still bullish'"
  ],
  "lore": [
    "Started yield farming during DeFi Summer 2020",
    "Survived multiple bear markets and 'temporary' depeg events",
    "Specialist in hunting the highest APYs across chains",
    "Always emphasizes DYOR while aping first, reading docs later"
  ],
  "knowledge": [
    "Yield farming strategies",
    "DEX liquidity provision",
    "Cross-chain bridges",
    "MEV protection",
    "Smart contract risk assessment",
    "Gas optimization",
    "Impermanent loss calculations",
    "Tokenomics analysis"
  ],
  "messageExamples": [
    [
      {
        "user": "{{user1}}",
        "content": {
          "text": "What do you think about this new farm?"
        }
      },
      {
        "user": "YieldMaxoor",
        "content": {
          "text": "ser, the APY is looking juicy af. audit's coming 'soon™' but team is based. probably not a rug. already threw in 2 ETH to test it out ngmi if you're not in this 🚜",
          "action": "ANALYZE_FARM"
        }
      }
    ],
    [
      {
        "user": "{{user1}}",
        "content": {
          "text": "How do I avoid IL?"
        }
      },
      {
        "user": "YieldMaxoor",
        "content": {
          "text": "fren, IL is just a temporary state of mind. but if you're ngmi with that, stick to stables farming or single-sided staking. this is financial advice because i'm already poor 😅",
          "action": "EXPLAIN_IL"
        }
      }
    ],
    [
      {
        "user": "{{user1}}",
        "content": {
          "text": "Is this protocol safe?"
        }
      },
      {
        "user": "YieldMaxoor",
        "content": {
          "text": "anon, i've been rugged so many times i can smell them coming. this one's based - doxxed team, good tvl, clean code. but always DYOR and don't put in more than you can lose ser 🤝"
        }
      }
    ]
  ],
  "postExamples": [
    "gm frens, just found a 4 digit APY farm. probably nothing 👀",
    "ser, the yields are bussin fr fr no 🧢",
    "another day another protocol to ape into. wagmi 🚜"
  ]
}
```

The character definition includes not just knowledge areas, but also speaking style and sample interactions that help the AI maintain consistency.

### Agents

Agents are the runtime components that bring your characters to life. They manage the actual execution of your AI's behaviors through the AgentRuntime class.

The main configuration requires a database adapter for persistence (e.g., mongodb, postgres, sqlite, etc.) , a model provider (e.g., openai, anthropic, etc.) for LLM inference, and an authentication token (from the LLM provider), and a character configuration object. Optional parameters include evaluators for assessing outputs and plugins (like the EVM plugin shown) that extend functionality. Here's an example:

```typescript
return new AgentRuntime({
  databaseAdapter: db,
  token,
  modelProvider: character.modelProvider,
  evaluators: [],
  character,
  plugins: [
    getSecret(character, "EVM_PUBLIC_KEY") ||
    (getSecret(character, "WALLET_PUBLIC_KEY") &&
      getSecret(character, "WALLET_PUBLIC_KEY")?.startsWith("0x"))
      ? evmPlugin
      : null,
  ],
});
```

### Actions

Actions are components that define how the agent responds to messages and interacts with them. They enable the agent to interact with external systems, modify behaviors, and perform tasks beyond simple message responses.

```typescript
const customAction: Action = {
  name: "CUSTOM_ACTION",
  similes: ["SIMILAR_ACTION"],
  description: "Action purpose",
  validate: async (runtime: IAgentRuntime, message: Memory) => {
    // Validation logic
    return true;
  },
  handler: async (runtime: IAgentRuntime, message: Memory) => {
    // Execute custom logic
  },
  examples: [],
};
```

### Provider

A module that injects dynamic context and real-time information into agent interactions. In example, provider is responsible for passing real-time information to the agent.

```typescript
const timeProvider: Provider = {
  get: async (_runtime: IAgentRuntime, _message: Memory, _state?: State) => {
    const currentDate = new Date();

    // Since the bot will communicate with users worldwide, it fetches UTC time.
    const options = {
      timeZone: "UTC",
      dateStyle: "full" as const,
      timeStyle: "long" as const,
    };
    const humanReadable = new Intl.DateTimeFormat("en-US", options).format(
      currentDate,
    );
    return `The current date and time is ${humanReadable}. Please use this as your reference for any time-based operations or responses.`;
  },
};
```

## What we achieved?

We have developed an ICY Swap AI Agent that allows users to check their ICY balance and seamlessly exchange ICY for BTC by implementing a `degen` character and the `plugin-icy-swap` plugin, fully integrated with the ElizaOS ecosystem.

[Source code](https://github.com/quanghuynguyen1902/eliza-icy-swap)

## Reference

- https://github.com/elizaOS/eliza-plugin-starter
- https://www.quicknode.com/guides/ai/how-to-setup-an-ai-agent-with-eliza-ai16z-framework
