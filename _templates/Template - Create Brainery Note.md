---
title: null
description: null
date: null
github_id: null
icy: 10
redirect:
  - /s/_W_CZw
---

<%\*
const dv = this.app.plugins.plugins["dataview"].api;
const pages = dv.pages(`"_templates/components/cta"`);

const element = pages[0]
const ctaFile = app.vault.getAbstractFileByPath(element.file.path);

const ctaContent = await app.vault.read(ctaFile);
tR += ctaContent;
%>
