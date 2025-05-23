---
title: Git
description: Learn how Git, the popular version control system, helps developers track changes, manage branches, and collaborate effectively using workflows like GitHub flow and Git-flow for software development.
date: 2021-08-11
github_id: hieuphq
redirect:
  - /s/tX9ikA
---

### What is git?

Git is a mature, actively maintained open source project originally developed in 2005 by Linus Torvalds. Git is software for tracking changes in any set of files, usually used for coordinating work among programmers collaboratively developing source code during software development. Git track all versions of your changes from the beginning of a project. The system manages the revision history for tracing, reviewing, continuous integration to collaborate efficiently.

### Why are we using git?

- Git is a revision control system for documents, we usually use this system for tracking the changes in a set of files. It helps groups of developers work collaboratively on software projects.
- Git is a working standard in software development. Almost all company or development teams are using git for daily work, interview sessions.
- All open sources are using git for development, collaboration. Collaborator or contributor must have experienced with git to contribute to the open-source project.

#### Concept

- `snapshot` is the content (files and folders) of a repository at some point in time
- `commit` in a git repository records a snapshot of all the (tracked) files in your directory. A commit has reference to the parent commit.
- `branch` is similar to the branch of a tree which contains the commits. When we make a branch from existing branches, we have a new branch and the existed branch is called a base branch.
- `repository` (or repo for short) contains all of the project files and the entire revision history. There are 2 types of repositories: local repository and remote repository. A local repository is storing data in a computer gives you a personal working environment. A remote repository is storing a copy of your Git repo with an online host (such as GitHub or Bitbucket) gives you a centrally located place where you can upload your changes and download changes from others, letting you collaborate more easily with other developers.

### How to use git effectively?

#### GitHub flow

GitHub flow is a lightweight, branch-based workflow that supports teams and projects where deployments are made regularly. Using only one `master` branch for tracking your project. There are 4 steps in the GitHub flow: implement, create merge request & review, deploy to production, merge to the codebase:

- When we get a new feature, we check out from `master` branch to another branch. Working on that branch and create a merge request to `master` branch.
- Discuss with your team and stakeholder about the feature for review and testing.
- Deploy the feature to production for final testing.
- Merge that branch to the codebase after the changes are verified in production.

#### Git-flow

- There're many members in your team, and they collaborate on the same project. Your team is building software that is explicitly versioned or needs to support multiple versions of your software in the wild, then git-flow is a good fit. Git-flow was first published and made popular by Vincent Driessen. The Git-flow Workflow defines a strict branching model designed around the project release. This provides a robust framework for managing larger projects. Git-flow focuses on stable and qualified products.
- The central repo holds two main branches with an infinite lifetime is `master` and `develop` The development model uses a variety of supporting branches to aid parallel development between team members, ease tracking of features, prepare for production releases, and to assist in quickly fixing live production problems. These are `feature branches`, `release branches`, `hotfix branches`.

##### Develop feature flow

- Base branch: develop
- Merge back to: develop
- Branch naming convention: `feat/*`
- Person in-charge: developers
- Objective: Implement a new feature of the software
- Developers check out from the `develop` branch a new feature branch. They make an early merge request with a full description of the working task. Developers work on this branch and merge to `develop` after being reviewed by teammates or leaders.

##### Release flow

- Base branch: develop
- Merge back to: develop and master branch
- Branch naming convention: `release/v*.*.*`
- Person in-charge: leader
- Objective: prepare and release a new version of the software
- The leaders check out from the `develop` branch a release branch. They should pump the version and update the release note. After preparing the release information, they merge the changes to `master` and `develop` branches. The leader creates a new tag from `master` branch.

##### Hot-fix flow

- Base branch: master
- Merge back to: develop and master branch
- Branch naming convention: `hotfix/*`, `bugfix/*`
- Person in-charge: developer or leader
- Objective: fix the urgent issue and release a new version of the software
- Developers check out from the `master` branch a hot-fix branch. After working on the source code, they should pump the version and update the changelog. Developers merge the change to `master` and `develop` branches.

#### Git-flow in dwarves foundation

Dwarves Foundation team is using the git-flow and some customization. We base on the idea about git-flow when working with the features branches. However, our team applies a different release flow. There are 4 environments for the development of live-cycle in the Dwarves Foundation team: `develop`, `testing`, `staging`, and `production`. Instead of release on `develop` and `master` branches, we release the product on tags. `v*.*.*` tag for production, `v*.*.*-rc` for staging, and `v*.*.*-alpha` for testing.

##### Develop feature flow

- Base branch: develop
- Merge back to: develop
- Branch naming convention: `feat/*`
- Person in-charge: developers
- Objective: Implement a new feature of the software
- Developers check out from the `develop` branch a new feature branch. They make an early merge request with a full description of the working task. Developers work on this branch and merge to `develop` after being reviewed by teammates or leaders.

##### Release testing version

- Base branch: develop
- Merge back to: develop
- Branch naming convention: `release/v*.*.*-alpha`
- Tag: `v*.*.*-alpha`
- Objective: prepare and release a new version for the testing. The QA team uses the testing environment to verify the features are a match with requirements.

##### Release staging version

- Base branch: `release/v*.*.*-alpha`
- Merge back to: develop, `release/v*.*.*-alpha`
- Branch naming convention: `release/v*.*.*-rc`
- Tag: `v*.*.*-rc`
- Objective: prepare and release a new version for the staging. The customers and our team make an acceptance test on the staging environment. The beta-testing is also deployed and released on it.

##### Release production version

- Base branch: `release/v*.*.*-rc`
- Merge back to: develop, `release/v*.*.*-rc`, master
- Branch naming convention: `release/v*.*.*`
- Tag: `v*.*.*`
- Objective: prepare and release a new version for the production. The end-users will be received the update after the features are verified through many protection checkpoints.

##### Hot-fix flow

- Base branch: `release/*`
- Merge back to: `release/*`, `develop` and `master`
- Branch naming convention: `hotfix/*`, `bugfix/*`
- Person in-charge: developer or leader
- Objective: fix the urgent issue and release a new version of the software
- Developers check out from the `release/*` branch a hot-fix branch. After working on the source code, they should pump the version and update the changelog. Developers merge the change to `release/*` branches after being reviewed. Additionally, We must merge to `master` branch when the current branch is the production release branch

#### Practices

- Using Github flow for a small project or medium project.
- Using Git-flow or DF modified git-flow for collaborative projects, multiple-version projects, large projects.

#### Conclusion

Git can sometimes be complex to get your head around. Most of us learn Git up to a point where we're happy to use it day-to-day and then stick to the few commands that we are comfortable with without trying anything too fancy. Most of the time it works out, but then everyone on us certainly meets the point when we mess up the repo with rebase or squash. We get panic and go to stackoverflow to seek out help.

There are a number of factors that have held developers back from becoming super productive with Git. But the most common one, I believe, is that they don't have a solid mental model of how Git works. Consider software as an accumulation of changes over a period of time, speaking in terms of Git, a single change is called a commit. Each commit may connect with one or other commits to form a non-binary tree called Git history. Git provides a set of commands to interact with the tree by adding nodes, editing nodes, traveling between nodes, etc. Simple to complex, you need to distinguish:

- Structure: commit vs branch
- Where: remote vs local
- File states: untracked vs tracked
- File status: unmodified vs modified vs staged
- Travel between nodes: checkout vs reset
- Move nodes: merge vs rebase vs cherry-pick
- Alter node(s): amend vs squash vs rebase
- View history: log vs reflog
- Reference: HEAD, FETCH_HEAD, HEAD~, HEAD^, tag
- Other: stash, clean, revert

Overall, Git acts like a time machine. When you travel from A to B in time, you should always expect there is a button to come back to A.

---

#### Reference

- https://learngitbranching.js.org
- https://nvie.com/posts/a-successful-git-branching-model/
- https://danielkummer.github.io/git-flow-cheatsheet/
- https://github.com/k88hudson/git-flight-rules
