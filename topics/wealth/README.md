---
title: § Wealth study
description: null
date: 2025-05-18
authors:
  - tieubao
tags:
  - wealth
redirect:
  - /s/_ri84Q
---

```dsql-list
SELECT markdown_link(COALESCE(short_title, title), file_path)
FROM vault
WHERE file_path ILIKE '%wealth%'
  OR ['money', 'wealth'] && tags
ORDER BY date DESC
LIMIT 5;
```
