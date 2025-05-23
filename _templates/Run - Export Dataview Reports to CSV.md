---
title: null
description: null
date: null
redirect:
  - /s/myycYA
---

<%\*
const recursiveJoin = (item) => {
if (Array.isArray(item)) {
return item.map(e => {
return recursiveJoin(e)
})
}
return '\"' + item + '\"'
}

const dv = this.app.plugins.plugins["dataview"].api;
const page = dv.page("\_queries")

const pageFields = Object.keys(page).filter(e => e !== "file");
const field = await tp.system.suggester(items = pageFields, text_items = pageFields, throw_on_cancel=true, placeholder = "")

const query = page[field];
const pagesQuery = await dv.query(query);
const { headers, values } = pagesQuery.value;
const joinedValues = values.map(e => {
const cleanedElements = e.map(item => recursiveJoin(item));
return cleanedElements;
}).join("\r\n")

const csvString = `${headers}\r\n${joinedValues}`;

const link = document.createElement("a");
link.setAttribute("href", 'data:text/csv; charset=utf-8,' + encodeURIComponent(csvString));
link.setAttribute("download", `${field}.csv`);
document.body.appendChild(link);
link.click();
%>
