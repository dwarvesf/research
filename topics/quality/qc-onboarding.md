---
title: Qc onboarding
description: Learn how to access QA resources and use gitlab-issues-tools for managing tasks, cloning issues, and exporting defect reports with step-by-step commands and templates.
date: 2017-07-13
tags:
  - people
  - process
redirect:
  - /s/VuHd1w
---

## General workflow

Click on attached URL below to get more details about our general workflow:

[https://www.draw.io/?lightbox=1&highlight=0000ff&edit=\_blank&layers=1&nav=1#G1jtKnGw5mpmGt31dFIoDOcGxVQrqxexF7](https://www.draw.io/?lightbox=1&highlight=0000ff&edit=_blank&layers=1&nav=1#G1jtKnGw5mpmGt31dFIoDOcGxVQrqxexF7)

## Access to testing resources

After you have a permission on Team's Google Drive.

Open `~/Dwarves Foundation/Document/QA` Documents to get resource files including:

- Test Planning Template
- Test Cases Template
- Defect Summary Report Template

## Task assigning flows

## Tools

Open `~/Dwarves Foundation/Document/QA Documents/Tools` to get gitlab-issues-tools file

After that, Run this command in your terminal to get help:

```plain_text
./gitlab-issues-tools --help
```

You will get the navigation like that:

```plain_text
usage: gitlab-issues-tools --thing=THING --token=TOKEN --action=ACTION --project-id=PROJECT-ID [<flags>]

Flags:
      --help                     Show context-sensitive help (also try --help-long and --help-man).
  -d, --debug                    enable debug mode.
      --thing=THING              which's thich that you want to know? ex: issue, users, working-hours
  -t, --token=TOKEN              gitlab token to impersonate as an user.
  -a, --action=ACTION            action to interact w object. ex: list, clone, close, export, burndown (for milestone), etc.
  -p, --project-id=PROJECT-ID    project id
      --milestone=MILESTONE      milestone id
  -l, --labels=LABELS ...        issue labels
      --list-issue-ids=LIST-ISSUE-IDS
                                 list issues will be moved
      --to-board-list=TO-BOARD-LIST
                                 to board list
      --clone-issue-id=CLONE-ISSUE-ID
                                 issue id if want to clone
      --start-sprint=START-SPRINT
                                 format: dd-mm-yyyy
      --sprint-length=SPRINT-LENGTH
                                 sprint length (weeks)
      --total-hours=TOTAL-HOURS  total hours
  -m, --milestone-id=MILESTONE-ID
                                 milestone id
```

For example:

To clone an issue, we can use this command

```plain_text
./gitlab-issues-tools -t [YOUR_GITLAB_TOKEN] -p 228 --thing issue -a clone --clone-issue-id 362
```

To clone export defect list for a milestone, we can use this command

```plain_text
./gitlab-issues-tools -t [YOUR_GITLAB_TOKEN] -p 228 --thing issue -a export --milestone 0.5.0
```
