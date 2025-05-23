---
title: Set up recording workflow for OGIF
description: This memo is essentially a playbook and recipe on how to record the Discord events.
date: 2024-06-15
authors:
  - minhcloud
tags:
  - recording
  - workflow
redirect:
  - /s/8y3A-Q
---

There are many interesting topics shared in the Office Hours of Dwarves Foundation, and it would be a pity if anyone missed them. Moreover, we want to share our findings with the community and encourage learning within our team. Therefore, we have introduced a recording workflow to store all the OGIF content in two forms: video and audio.

Before diving into the workflow, we ensure that the following prerequisites are met:

- Installed [OBS Studio](https://obsproject.com/) on our laptop.
- Installed Craig Bot to record the audio.

This memo is essentially a playbook and recipe on how to record the Discord events.

### Record video and stream on YouTube

![](assets/recording-flow_untitled-3.webp)

- We set up the recording screen on OBS as shown in the image below:
  - We choose the window to record.
  - We set up [streaming mode](https://restream.io/learn/obs-studio/how-to-multistream-with-obs/).
  - We set up the audio input (Mute the Mic/Aux).

![](assets/recording-flow_untitled-4.webp)

- When the Ogif starts, we start recording on OBS and stream on YouTube.
- When the Ogif ends, we stop the recording and save it.
- Then, we split the recording by individual session.

### Record audio in the background and transcript

Craig Bot is used to record audio in the background and split segments by user for AI transcription.

![](assets/recording-flow_untitled-5.webp)

- We invite the Craig Bot into the Dwarves Foundation server. If the bot is already in the server, this step can be skipped.
- We invite the Craig Bot to the open voice channel to start recording by using the command `/join`.

![](assets/recording-flow_untitled-6.webp)

- After the Ogif ends, we stop the recording and save the audio file.
- Then, we use ChatGPT-4 to transcribe the recording and split it into parts, similar to the video segments.
