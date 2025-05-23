---
title: null
description: null
date: null
redirect:
  - /s/Dzpnpg
---

<%\*
const dv = this.app.plugins.plugins["dataview"].api;
const page = dv.page("\_env");

const pageFields = Object.keys(page).filter(e => e.contains("discord_webhook"));
const field = await tp.system.suggester(items = pageFields, text_items = pageFields, throw_on_cancel=true, placeholder = "")
const webhookURL = page[field];

const contentNoFrontmatter = tp.file.content
.replace(/---(\n(\w*:\s.*|(\w*:(\n\s+.*)_)))_\n---/g, "")
console.log(contentNoFrontmatter);
const bareContent = contentNoFrontmatter
.replace(/^(#+(._))$/gm, "\n ")
.replace(/\|(._)\|/gm, " ")
.replace(/!\[\[._\]\]/gm, "")
.replace(/\[\[(._)\]\]/gm, "$1")
.replace(/(\r\n|\n|\r)/gm, "")
.replace(/^(\s|\t)_- (\s)_(._)/gm, "$3,")
.replace(/(<([^>]+)>)/gi, "")
.replace(/\> (\w_)/gm, " $1");
const description = bareContent.split(" ").slice(0, 35).join(' ') + "..."

const currentPage = tp.file.folder();
const title = tp.file.title;
const root = app.vault.adapter.getBasePath().replace(/(\s)/g, '\\$1');
const commit = await tp.user.sh(`cd ${root} && git rev-parse --short HEAD`);

const braineryURL = "https://brain.d.foundation/" + encodeURIComponent(`${currentPage}/${title}`)
const mention = await tp.system.prompt("Mention")
const discordId = mention ? `<@${mention}>\n` : ""
const author = `${tp.frontmatter.author}\n${discordId}\n\*\*GitHub\*\*\n[${tp.frontmatter.github_id}](https://github.com/${tp.frontmatter.github_id})`;
const tags = tp.file.tags.slice(0, 5).join("\n") + " ...";
const icy = `${tp.frontmatter.icy || 0}`;
const blog = `${tp.frontmatter.blog || ""}`;
const footerText = `?help to see all commands • ${tp.date.now("MM/DD/YYYY h:mm A")}`
const fields = [
{ name: "Author", value: author, inline: true },
{ name: "Tags", value: tags, inline: true },
{ name: "ICY 🧊", value: icy, inline: true },
]

if (blog) {
fields.push({ name: "Blog", value: blog, inline: true })
}

const webhookBody = {
username: "Fortress",
avatar_url: "https://i.imgur.com/DwLfRwn.png",
embeds: [
{
title,
url: braineryURL,
description,
color: 12669794,
thumbnail: {
url: `https://github.com/${tp.frontmatter.github_id}.png`
},
fields,
footer: {
icon_url: "https://i.imgur.com/DwLfRwn.png",
text: footerText
}
}
]
}

const headers = {
"Content-Type": "application/json",
}

await requestUrl({
url: webhookURL,
method: "POST",
body: JSON.stringify(webhookBody),
headers,
});
%>
