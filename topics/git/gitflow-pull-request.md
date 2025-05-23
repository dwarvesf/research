---
title: Gitflow pull request
description: Learn the best Git workflows, branching models, commit message tips, pull request strategies, code review practices, and merge vs rebase guidance to boost team productivity and code quality.
date: 2021-04-10
tags:
  - git
redirect:
  - /s/fjhe-w
---

![](assets/gitflow-pull-request_0150827f46aae013c7fa3a68c509e812_md5.webp)

Git is one of the most popular source control. Github is one platform built over the top of Git and well adapted by lots of companies. Knowing the right workflow will help to increase the team productivity. In this post, I will try to cover some of the best practices from the community and the way we applied them at Dwarves Foundation.

## Git branching mode

Source: <https://nvie.com/posts/a-successful-git-branching-model/>

In sort, you will organize your repository into 5 types of branches:

### The main branches

- master: the main branch where the source code of HEAD always reflects a production-ready state
- develop: the main branch where the source code of HEAD always reflects a state with the latest delivered development changes for the next release. Some would call this the “integration branch”.

### Feature

- May branch off from: develop
- Must merge back into: develop
- Branch naming convention: anything except master, develop, release-_, or hotfix-_

Feature branches (or sometimes called topic branches) are used to develop new features for the upcoming or a distant future release. When starting development of a feature, the target release in which this feature will be incorporated may well be unknown at that point.

### Release

- May branch off from: develop
- Must merge back into: develop and master
- Branch naming convention: release-\*

Release branches are created from the develop branch. For example, say version 1.1.5 is the current production release and we have a big release coming up. The state of develop is ready for the “next release” and we have decided that this will become version 1.2 (rather than 1.1.6 or 2.0). So we branch off and give the release branch a name reflecting the new version number

### Hotfix

- May branch off from: master
- Must merge back into: develop and master
- Branch naming convention: hotfix-\*

Hotfix branches are very much like release branches in that they are also meant to prepare for a new production release, albeit unplanned. They arise from the necessity to act immediately upon an undesired state of a live production version. When a critical bug in a production version must be resolved immediately, a hotfix branch may be branched off from the corresponding tag on the master branch that marks the production version.

### Gitflow

Inspired by Vincent Driessen’s branching model, git-flow are a set of git extensions to provide high-level repository operations for it. Git-flow is a merge based solution. It doesn’t rebase feature branches.

- Checkout gitflow cheatsheet: <http://danielkummer.github.io/git-flow-cheatsheet/>
- Apps that support gitflow:
- Source Tree: <https://www.sourcetreeapp.com>
- Git Tower: <https://www.git-tower.com>

For now, you can continue to read the article [GitFlow considered harmful](https://www.endoflineblog.com/gitflow-considered-harmful)to know more about the author issue.

## How to write commit message

Source: <http://chris.beams.io/posts/git-commit/>

Have you ever read some repos with commit messages like above?

While many repositories’ logs look like the former, there are exceptions. The Linux kernel and git itself are great examples. Look at Spring Boot, or any repository managed by Tim Pope. The contributors to these repositories know that a well-crafted git commit message is the best way to communicate context about a change to fellow developers (and indeed to their future selves). A diff will tell you what changed, but only the commit message can properly tell you why.

Being known that, a project’s long-term success rests (among other things) on its maintainability, reviewing others commits and pull requests is also the big reason that you should [write great commit messages](/6304b82ed7d34f23a0e7e4fe381e7996).

## Pull request

Pull request is a feature that makes it easier for developers to collaborate. Pull request is a mechanism for a developer to notify team members that they have completed a feature.

Some tricks to make Pull Requests more awesome for your project:

- Open a Pull request as early as possible

Pull Requests are a great way to start a conversation of a feature, so start one as soon as possible- even before you are finished with the code. Your team can comment on the feature as it evolves, instead of providing all their feedback at the very end.

- Pull Requests work branch to branch

No one has a fork of github/github. We make Pull Requests in the same repository by opening Pull Requests for branches.

- A Pull request doesn’t have to be merged

Pull Requests are easy to make and a great way to get feedback and track progress on a branch. But some ideas don’t make it. It’s okay to close a Pull request without merging; we do it all the time.

Hint: Based on an article [Type of Pull request](https://ben.balter.com/2015/12/08/types-of-pull-requests/), there are 6 types of PR. But `WIP pattern` is the one that is using by lots of teams and companies. It follows the mantra of **“Open a Pull request as early as possible”.**

## Code review

Source: <https://github.com/thoughtbot/guides/tree/master/code-review>

### Everyone

- Accept that many programming decisions are opinions. Discuss tradeoffs, which you prefer, and reach a resolution quickly.
- Ask questions; don’t make demands. (“What do you think about naming this :user_id?“)
- Ask for clarification. (“I didn’t understand. Can you clarify?”)
- Avoid selective ownership of code. (“mine”, “not mine”, “yours”)
- Avoid using terms that could be seen as referring to personal traits. (“dumb”, “stupid”). Assume everyone is attractive, - intelligent, and well-meaning.
- Be explicit. Remember people don’t always understand your intentions online.
- Be humble. (“I’m not sure - let’s look it up.”)
- Don’t use hyperbole. (“always”, “never”, “endlessly”, “nothing”)
- Don’t use sarcasm.
- Keep it real. If emoji, animated gifs, or humor aren’t you, don’t force them. If they are, use them with aplomb.
- Talk synchronously (e.g. chat, screensharing, in person) if there are too many “I didn’t understand” or “Alternative solution:” comments. Post a follow-up comment summarizing the discussion.

### Having your code reviewed

- Be grateful for the reviewer’s suggestions. (“Good call. I’ll make that change.”)
- Don’t take it personally. The review is of the code, not you.
- Explain why the code exists. (“It’s like that because of these reasons. Would it be more clear if I rename this class/file/- method/variable?”)
- Extract some changes and refactorings into future tickets/stories.
- Link to the code review from the ticket/story. (“Ready for review: <https://github.com/organization/project/pull/1>")
- Push commits based on earlier rounds of feedback as isolated commits to the branch. Do not squash until the branch is ready - to merge. Reviewers should be able to read individual updates based on their earlier feedback.
- Seek to understand the reviewer’s perspective.
- Try to respond to every comment.
- Wait to merge the branch until Continuous Integration tells you the test suite is green in the - branch.
- Merge once you feel confident in the code and its impact on the project.

### Reviewing code

Understand why the change is necessary (fixes a bug, improves the user experience, refactors the existing code). Then:

- Communicate which ideas you feel strongly about and those you don’t.
- Identify ways to simplify the code while still solving the problem.
- If discussions turn too philosophical or academic, move the discussion offline to a regular Friday afternoon technique - discussion. In the meantime, let the author make the final decision on alternative implementations.
- Offer alternative implementations, but assume the author already considered them. (“What do you think about using a custom - validator here?”)
- Seek to understand the author’s perspective.
- Sign off on the pull request with a 👍 or “Ready to merge” comment.

## Rebase vs merge

Source: <https://blog.sourcetreeapp.com/2012/08/21/merge-or-rebase/>

- Merging brings two lines of development together while preserving the ancestry of each commit history.
- In contrast, rebasing unifies the lines of development by re-writing changes from the source branch so that they appear as children of the destination branch – effectively pretending that those commits were written on top of the destination branch all along.

### Merging pros

- Simple to use and understand.
- Maintains the original context of the source branch.
- The commits on the source branch remain separate from other branch commits, provided you don’t perform a fast-forward merge. This separation can be useful in the case of feature branches, where you might want to take a feature and merge it into another branch later.
- Existing commits on the source branch are unchanged and remain valid; it doesn’t matter if they’ve been shared with others.

### Merging cons

- If the need to merge arises simply because multiple people are working on the same branch in parallel, the merges don’t serve any useful historic purpose and create clutter.

### Rebase pros

- Simplifies your history.
- Is the most intuitive and clutter-free way to combine commits from multiple developers in a shared branch

### Rebase cons

- Slightly more complex, especially under conflict conditions. Each commit is rebased in order, and a conflict will interrupt the process of rebasing multiple commits. With a conflict, you have to resolve the conflict in order to continue the rebase. SourceTree guides you through this process, but it can still become a bit more complicated.
- Rewriting of history has ramifications if you’ve previously pushed those commits elsewhere. In Mercurial, you simply cannot push commits that you later intend to rebase, because anyone pulling from the remote will get them. In Git, you may push commits you may want to rebase later (as a backup) but only if it’s to a remote branch that only you use. If anyone else checks out that branch and you later rebase it, it’s going to get very confusing.

Note: Other post from Atlassian: <https://www.atlassian.com/git/tutorials/merging-vs-rebasing>

## Git templates

To make things easier, we have adopted Issue template and Pull request template that we think they are great to help the team to improve the productivity.

[Issue Template]

```javascript
<!--
Please use the following template to submit your issue. Following this template will allow us to quickly investigate and help you with your issue. Please be aware that issues which do not conform to this template may be closed.
-->

### Status
BUG REPORT / TASK

### Checklist
Add checklist if this is a task

- [x] Add Facebook login
- [ ] Support X

### Steps to reproduce
1. First step

2. Second step
3. Third step

### Expected behaviour
How do you think the program should work? Add screenshots and code blocks if necessary.

### Actual behaviour
How does the program work in its current state?

### Environment
You may write here the specifications like the version of the project, operating system, or hardware if applicable.

### Logs / Stack trace
Insert your log/stack trace here
```
