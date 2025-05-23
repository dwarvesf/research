---
title: null
description: null
date: null
redirect:
  - /s/3NOpEA
---

## Tag cloud

```chartsview
#-----------------#
#- chart type    -#
#-----------------#
type: WordCloud

#-----------------#
#- chart data    -#
#-----------------#
data: |
  dataviewjs:
    return dv.pages(`#engineering OR #writing OR #design OR #communication OR #blockchain OR #mobile OR "Ω Fleeting notes"`)
           .where(p => !!p.file.frontmatter.date)
           .where(p => dv.date(p.file.frontmatter.date) !== null)
           .where(p => dv.date(p.file.frontmatter.date).month === dv.date('today').month)
           .where(p => dv.date(p.file.frontmatter.date).year === dv.date('today').year)
           .flatMap(p => p.file.etags)
           .filter(p => !(p.search(/#engineering|#writing|#design|#communication|#blockchain/g) > -1))
           .groupBy(p => p)
           .map(p => ({tag: p.key, count: p.rows.length}))
           .array();

#-----------------#
#- chart options -#
#-----------------#
options:
  wordField: "tag"
  weightField: "count"
  colorField: "count"
  enableSearchInteraction:
    operator: tag
```

## Tag treemap

```chartsview
#-----------------#
#- chart type    -#
#-----------------#
type: Treemap

#-----------------#
#- chart data    -#
#-----------------#
data: |
  dataviewjs:
    const children = []
    const query = dv.pages(`#engineering OR #writing OR #design OR #communication OR #blockchain OR #mobile OR #ai OR "Ω Fleeting notes"`)
        .where(p => !!p.file.frontmatter.date)
        .where(p => dv.date(p.file.frontmatter.date) !== null)
        .where(p => dv.date(p.file.frontmatter.date).month === dv.date('today').month)
        .where(p => dv.date(p.file.frontmatter.date).year === dv.date('today').year)
        .flatMap(p => p.file.etags)
        .filter(p => !(p.search(/#engineering|#writing|#design|#communication|#blockchain/g) > -1)).array()
        .reduce((a, p) => {
            if (!(p in a)) {
                a[p] = 0;
            } else {
                a[p] += 10;
            }
            return a;
        }, {})
    Object.entries(query).forEach(([key, value]) => {
        children.push({
            name: key,
            value,
        })
    })
    return {
        name: 'root',
        children,
    }

#-----------------#
#- chart options -#
#-----------------#
options:
  colorField: "name"
```

## Weighted topic radar

```chartsview
#-----------------#
#- chart type    -#
#-----------------#
type: Radar

#-----------------#
#- chart data    -#
#-----------------#
data: |
  dataviewjs:
    return dv.pages(`#engineering OR #writing OR #design OR #communication OR #blockchain OR #mobile OR #ai OR "Ω Fleeting notes"`)
           .where(p => !!p.file.frontmatter.date)
           .where(p => dv.date(p.file.frontmatter.date) !== null)
           .where(p => dv.date(p.file.frontmatter.date).month === dv.date('today').month)
           .where(p => dv.date(p.file.frontmatter.date).year === dv.date('today').year)
           .flatMap(p => p.file.etags)
           .filter(p => p.search(/#engineering|#writing|#design|#communication|#blockchain|#mobile|#ai/g) > -1)
           .map(p => p.replace(/#(\w*)(.*)/, "$1")).array()
           .reduce((a, p) => {
               switch (p) {
                   case "engineering": a[0].score += 1; break;
                   case "writing": a[1].score += 10; break;
                   case "design": a[2].score += 10; break;
                   case "communication": a[3].score += 10; break;
                   case "blockchain": a[4].score += 1; break;
                   case "mobile": a[5].score += 1; break;
                   case "ai": a[6].score += 1; break;
               }
               return a;
           }, [
               {
                   item: "Engineering",
                   user: "notes",
                   score: 0
               },
               {
                   item: "Writing",
                   user: "notes",
                   score: 0
               },
               {
                   item: "Design",
                   user: "notes",
                   score: 0
               },
               {
                   item: "Communication",
                   user: "notes",
                   score: 0
               },
               {
                   item: "Blockchain",
                   user: "notes",
                   score: 0
               },
               {
                   item: "Mobile",
                   user: "notes",
                   score: 0
               },
               {
                   item: "AI",
                   user: "notes",
                   score: 0
               },
           ])

#-----------------#
#- chart options -#
#-----------------#
options:
  xField: "item"
  yField: "score"
  seriesField: "user"
  meta:
    score:
      alias: "Score"
      min: 0
      nice: true
  xAxis:
    line: null
    tickLine: null
  yAxis:
    label: false
    grid:
      alternateColor: "rgba(0, 0, 0, 0.04)"
  point: {}
  area: {}
```

## Fleeting notes

```chartsview
#-----------------#
#- chart type    -#
#-----------------#
type: DualAxes

#-----------------#
#- chart data    -#
#-----------------#
data: |
  dataviewjs:
    const fleetingNotesQuery = dv.pages('"Ω Fleeting notes"')
        .where(p => !!p.file.frontmatter.date && !!p.file.frontmatter.discord_id)
        .where(p => dv.date(p.file.frontmatter.date) !== null)
        .where(p => dv.date(p.file.frontmatter.date).month === dv.date('today').month)
        .where(p => dv.date(p.file.frontmatter.date).year === dv.date('today').year)
        .groupBy(p => {
            const noteDate = dv.date(p.file.frontmatter.date);
            return `${noteDate.c.year}-${noteDate.c.month}-${noteDate.c.day}`
        })
        .map(p => {
            const time = p.key
            const notes = p.rows.length
            const icy = p.rows.length * 5

            return { time, notes, icy }
        })
    return [fleetingNotesQuery, fleetingNotesQuery]

#-----------------#
#- chart options -#
#-----------------#
options:
  xField: 'time'
  yField: ['notes', 'icy']
  yAxis:
    value:
      min: 0
      label:
        formatter:
          function formatter(val) {
            return ''.concat(val, '个');
          }
  geometryOptions:
    - geometry: 'column'
    - geometry: 'line'
      lineStyle:
        lineWidth: 2
```

## Top contributors

```chartsview
#-----------------#
#- chart type    -#
#-----------------#
type: Bar

#-----------------#
#- chart data    -#
#-----------------#
data: |
  dataviewjs:
    return dv.pages(`#engineering OR #writing OR #design OR #communication OR #blockchain OR #mobile OR #ai`)
        .where(p => !!p.file.frontmatter.date && !!p.file.frontmatter.author)
        .where(p => dv.date(p.file.frontmatter.date) !== null)
        .where(p => dv.date(p.file.frontmatter.date).month === dv.date('today').month)
        .where(p => dv.date(p.file.frontmatter.date).year === dv.date('today').year)
        .groupBy(p => p.file.frontmatter.author)
        .sort(p => p.rows.length, "desc")
        .map(p => {
            const author = p.key
            const notes = p.rows.length
            return { author, notes }
        })

#-----------------#
#- chart options -#
#-----------------#
options:
  xField: "notes"
  yField: "author"
  conversionTag: {}
```
