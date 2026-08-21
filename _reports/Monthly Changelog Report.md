---
draft: true
title: null
description: null
date: null
redirect:
  - /oRTCbw
---

## Notes submitted within past month

```dataviewjs
const query = dv.page("_queries").fleeting_monthly;
const pagesQuery = await dv.query(query);
const { headers, values } = pagesQuery.value

dv.table(headers, values);
```

### Literature & permanent notes

#### Structured permanent notes

```dataviewjs
const query = dv.page("_queries").structured_permanent_notes_monthly;
const pagesQuery = await dv.query(query);
const { headers, values } = pagesQuery.value

dv.table(headers, values);
```

#### Literature notes

```dataviewjs
const query = dv.page("_queries").literature_notes_monthly;
const pagesQuery = await dv.query(query);
const { headers, values } = pagesQuery.value

dv.table(headers, values);
```

#### Permanent notes

```dataviewjs
const query = dv.page("_queries").permanent_notes_monthly;
const pagesQuery = await dv.query(query);
const { headers, values } = pagesQuery.value

dv.table(headers, values);
```
