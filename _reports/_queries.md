---
draft: true
title: null
description: null
date: null
fleeting_monthly: "TABLE
  \"https://brain.d.foundation/%CE%A9+Fleeting+notes/\" + rows.file.name as entries,
  sum(rows.icy) + \" ICY\" as reward,
  \"\" + rows.file.tags as tags
FROM \"Ω Fleeting notes\"
WHERE discord_id != NULL
  AND date.month = (date(today)).month
  AND date.year = (date(today)).year
GROUP BY discord_id
"
fleeting_notes_all: TABLE
   discord_id,
   discord_channel,
   date,
   icy,
   "" + tags as tags
FROM "Ω Fleeting notes"
SORT date DESC
WHERE discord_id != NULL

literature_notes_monthly: "TABLE
  \"https://brain.d.foundation/%CE%A9+Literature+notes/\" + rows.file.name as entries,
  rows.file.tags as tags,
  sum(rows.icy) + \" ICY\" as reward
FROM \"Ω Literature notes\"
WHERE discord_id != NULL
  AND date.month = (date(today)).month
  AND date.year = (date(today)).year
GROUP BY discord_id
"
permanent_notes_monthly: "TABLE
  \"https://brain.d.foundation/%CE%A9+Permanent+notes/\" + rows.file.name as entries,
  sum(rows.icy) + \" ICY\" as reward
FROM \"Ω Permanent notes\"
WHERE discord_id != NULL
  AND date.month = (date(today)).month
  
GROUP BY discord_id
"
structured_permanent_notes_all: "TABLE
  author,
  github_id,
  date,
  \"\" + tags as tags
FROM #engineering OR #blockchain OR #design OR #communication OR #writing OR #mobile
SORT date DESC
WHERE author != NULL
"
structured_permanent_notes_monthly: "TABLE
  rows.file.link as entries,
  sum(rows.icy) + \" ICY\" as reward,
  \"\" + rows.file.tags as tags
FROM #engineering OR #writing OR #design OR #communication OR #blockchain OR #mobile 
WHERE author != NULL
  AND date.month = (date(today)).month
  AND date.year = (date(today)).year
GROUP BY author
"
redirect:
  - /XWPb9g
---


