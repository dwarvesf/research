---
title: How we crafted the OGIF summarizer bot to streamline weekly knowledge-sharing
description: Introducing the OGIF Memo Summarizer, a chatbot we developed using Dify in collaboration with @innno_. This tool transcribes YouTube videos and extracts key points from our Oh God It’s Friday (OGIF) sessions. By providing both short and detailed summaries in English and Vietnamese, it significantly enhances our ability to review and reference the diverse knowledge shared every Friday.
date: 2024-07-10
authors:
  - monotykamary
  - innnotruong
tags:
  - ai
  - guide
  - ogif
redirect:
  - /s/yFnLDQ
---

### What’s OGIF?

OGIF stands for "Oh God It’s Friday." It’s our weekly Friday tradition where members share 10-minute talks. The team hops on Discord to share and discuss diverse topics like software development, engineering patterns, industry trends, finance, entrepreneurship, blockchain, AI, and a mix of other cool stuff. It’s a quick, engaging way to learn something new.

We value the importance of sharing our work with other people at Dwarves. And it's a chance for people who don't work directly on development to feel included in the process.

### Meet the OGIF memo summarizer

Working in collaboration with my colleague @innno\_, we crafted a chatbot using Dify. This bot transcribes YouTube videos and extracts key points from our OGIF sessions. The result? A major boost in our ability to review and reference the knowledge shared during these meetings.

![](assets/how-we-crafted-the-ogif-summarizer-bot-to-streamline-weekly-knowledge-sharing_crafting-ogif-summarize-bot-7.webp)

### How it works?

**YouTube Transcription**: We integrated a YouTube transcription workflow as a function-calling tool for our chatbot.

**Intelligent Summarization**: The chatbot generates structured summaries from the transcribed content using a well-designed prompt.

**Three-Tier Summary Structure**:

1. **Short summary**: 3-5 key timestamps with brief descriptions of the most important topics.

![](assets/how-we-crafted-the-ogif-summarizer-bot-to-streamline-weekly-knowledge-sharing_crafting-ogif-summarize-bot-1.webp)

2. **Detailed summary**: Comprehensive timestamps, each with 2-3 bullet points providing in-depth information.

![](assets/how-we-crafted-the-ogif-summarizer-bot-to-streamline-weekly-knowledge-sharing_crafting-ogif-summarize-bot-2.webp)

3. **Languages:** The summary is available in both English and Vietnamese.

![](assets/how-we-crafted-the-ogif-summarizer-bot-to-streamline-weekly-knowledge-sharing_crafting-ogif-summarize-bot-3.webp)

### The prompt

The core of our summarizer is the prompt we’ve meticulously designed. Here’s what it does:

- Generates structured summaries with accurate timestamps.
  ![](assets/how-we-crafted-the-ogif-summarizer-bot-to-streamline-weekly-knowledge-sharing_crafting-ogif-summarize-bot-4.webp)
- Creates clickable links to specific points in the video.
- Offers both a quick overview and detailed insights.

![](assets/how-we-crafted-the-ogif-summarizer-bot-to-streamline-weekly-knowledge-sharing_crafting-ogif-summarize-bot-5.webp)

- Maintains consistent formatting for easy reading.
- Provides a comprehensive overview of the video content.

![](assets/how-we-crafted-the-ogif-summarizer-bot-to-streamline-weekly-knowledge-sharing_crafting-ogif-summarize-bot-6.webp)

### Benefits

- **Time-Saving**: Team members can quickly grasp the main points of a session without watching the entire video.
- **Easy navigation**: Clickable timestamps for swift access to specific topics of interest.
- **Knowledge retention**: The structured summary serves as a reliable reference for future use.
- **Improved accessibility**: Makes the session content more accessible to team members who couldn’t attend live.

### What’s next?

We’re always looking to enhance our OGIF Memo Summarizer. Some future ideas include:

- Integrating automatic tagging for easy topic categorization.
- Implementing a search function across multiple summaries.
- Creating a visual timeline of topics discussed over multiple sessions.

### Wrapping up

The OGIF Memo Summarizer has improved our weekly knowledge-sharing sessions. Using AI, we've made a system that saves time and enhances the value of our Friday office hours.

We recommend other teams try similar tools to streamline their knowledge-sharing. In software engineering, efficient learning and sharing information can give you a big advantage.

Happy coding and happy sharing.
