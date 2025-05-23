---
title: null
description: null
date: null
redirect:
  - /s/CXBKtg
---

## Fleeting notes

```dataviewjs
const query = dv.page("_queries").fleeting_notes_all;
const pagesQuery = await dv.query(query);
const { headers, values } = pagesQuery.value

dv.table(headers, values);
```
