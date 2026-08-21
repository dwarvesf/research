---
draft: true
title: Dwarves Research
short_title: § Dwarves Research 🧪
description: This is our Labs team homepage, where we list out the latest advances in our engineering team, our publications, events & workshops, as well as frequently asked questions on who and what team labs are.
date: 2023-11-30
authors:
  - monotykamary
tags:
  - dwarves
  - home
  - labs
redirect:
  - /XnEouw
---

<p>
    <a href="https://github.com/dwarvesf">
        <img src="https://img.shields.io/badge/-made%20by%20dwarves-%23e13f5e?style=for-the-badge&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsBAMAAADsqkcyAAAAD1BMVEUAAAD///////////////+PQt5oAAAABXRSTlMAQL//gOnhmfMAAAAJcEhZcwAAHsIAAB7CAW7QdT4AAACYSURBVHicndLRDYJAEIThMbGAI1qAYAO6bAGXYP81uSGBk+O/h3Mev4dhWJCkYZqreOi1xoh0eSIvoCaBRjc1B9+I31g9Z2aJ5jkOsYScBW8zDerO/fObnY/FiTl3caOEH2nMzpyZhezIlgqXr2OlOX617Up/nHnPUg0+LHl18YO50d3ghOy1ioeIq1ceTypsjpvYeJohfQEE5WtH+OEYkwAAAABJRU5ErkJggg==&&logoColor=white" alt="Dwarves Foundation" />
    </a>
    <a href="https://discord.gg/dfoundation">
        <img src="https://img.shields.io/badge/-join%20the%20community-%235865F2?style=for-the-badge&logo=discord&&logoColor=white" alt="Dwarves Network Discord" />
    </a>
</p>

## Latest from Research team

```dsql-list
SELECT markdown_link(COALESCE(short_title, title), file_path)
FROM vault
WHERE file_path ILIKE '%research%'
  OR ['forward-engineering', 'research'] && tags
ORDER BY date DESC
LIMIT 5;
```

## Key articles for researchers

### Overview

- [Tech transfer framework](transfer.md): Moving research insights from labs to consulting deliverables effectively.
- [Composing forward engineering newsletter](compose.md): Creating monthly tech research and trends summaries.
- [Building a research-first community](../culture/building-a-research-first-community.md): Cultivating innovation and knowledge sharing culture.

### Research methods

- [Good research starts with a good question](/topics/ux/good-research-starts-with-a-good-question): Foundation for conducting meaningful research.
- [Research repositories should generate new knowledge](/topics/ux/research-repositories-should-generate-new-knowledge): Best practices for knowledge management.
- [Landscape of UX research methods](/topics/ux/landscape-of-ux-research-methods): Comprehensive overview of research methodologies.
- [Qualitative research excels at explanation](/topics/ux/Mixed Methods/qualitative-research-excels-at-explanation): Understanding when to use qualitative approaches.

### Tech domains

- [AI & Machine Learning](/topics/ai): Artificial intelligence research and applications.
- [Blockchain & DeFi](/topics/blockchain): Distributed systems and decentralized finance.
- [Engineering & Architecture](/topics/engineering): Software construction and system design.
- [Frontend & Mobile](/topics/frontend): User interface and mobile development.
- [Security & ZKP](/topics/security): Cybersecurity and zero-knowledge proofs.

### Design & UX

- [Domain insight research framework](/topics/design/domain-insight-research-framework): Structured approach to understanding problem domains.
- [Personas start with qualitative research](/topics/design/personas-start-with-qualitative-research): Creating user personas through research.
- [UX research methods](/topics/ux): User experience research techniques and tools.

### Knowledge sharing

- [Forward engineering newsletter](/updates/forward): Monthly tech insights and trends publication.
- [Tech radar](/radar): Technology assessment framework (adopt, trial, assess, hold).
- [Build logs](/updates/build-log): Documenting experiments and learnings.

### Others

- [RFC process](rfc): Request for comments and technical proposals.
- [Research notes](notes): Quick insights and discoveries.
- [Innovation & startups](/topics/innovation): Market trends and business opportunities.

---

> Next: [Tech transfer framework](transfer.md)
