---
title: DuckDB demo and showcase
description: "DuckDB is a great starting point for modern stacks that don't need to worry about scalability, but want to derive hard analytics from the data that they have. This meeting will do a 3-part demo of DuckDB (15 minutes total): • Consolidate NYC taxi data in parallel (through map-reduce) over HTTPS • Aggregate IBM AML transactions (Anti-Money Laundering) • Some examples of how it is used to consolidate and do basic analytics on note.d and log.console.so"
date: 2023-11-23
authors:
  - monotykamary
event_date: "2023-11-23T00:00:00.000Z"
notice: This is an internal event demo workshop and showcase of DuckDB for evaluation and use for data science and analytical use-cases at our company.
tags:
  - demo
  - discussion
  - duckdb
  - dwarves
  - event
  - internal
  - labs
  - work
  - workshop
redirect:
  - /s/xhStug
---

| Event Date                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Discord Channel | Type     |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- | -------- |
| <a href="http://www.google.com/calendar/event?action=TEMPLATE&text=DuckDB%20demo%20and%20showcase&dates=20231130T090000Z/20231130T103000Z&details=DuckDB%20is%20a%20great%20starting%20point%20for%20modern%20stacks%20that%20don't%20need%20to%20worry%20about%20scalability,%20but%20want%20to%20derive%20hard%20analytics%20from%20the%20data%20that%20they%20have.%20This%20meeting%20will%20do%20a%203-part%20demo%20of%20DuckDB%20(15%20minutes%20total):%0A•%20Consolidate%20NYC%20taxi%20data%20in%20parallel%20(through%20map-reduce)%20over%20HTTPS%0A•%20Aggregate%20IBM%20AML%20transactions%20(Anti-Money%20Laundering)%0A•%20Some%20examples%20of%20how%20it%20is%20used%20to%20consolidate%20and%20do%20basic%20analytics%20on%20note.d%20and%20log.console.so&location=Online">23/11/2023</a> | 🎙・labs-stage  | Internal |

DuckDB has been an emerging OLAP database for analytical needs. Use cases for analytics usually use around 1GB-10GB of data, not enough to take advantage of the full potential of databases in data warehouses. The use case of analyzing data in small chunks is enough to pop up startups such as MotherDuck.

### Agenda

DuckDB is a great starting point for modern stacks that don't need to worry about scalability, but want to derive hard analytics from the data that they have. This meeting will do a 3-part demo of DuckDB (15 minutes total):
• Consolidate NYC taxi data in parallel (through map-reduce) over HTTPS
• Aggregate IBM AML transactions (Anti-Money Laundering)
• Some examples of how it is used to consolidate and do basic analytics on note.d and log.console.so
In between, this meeting hopes to show some use-cases, possibilities, as well as costs and benefits of using DuckDB for introductory and advanced analytics.

### Output

• Evaluate DuckDB and evaluating whether it is appropriate for the projects we do now or for future projects moving forward
• Have a format for demos for other new tech moving forward

---

## Workshop screenshots

_This demo is from our pilot project, `memo.d.foundation`, where we aggregate metadata from markdown notes imported from Notion into a parquet file to query data._

![](assets/2023-november-forward-engineering_forward-engineering-november-2023_november-forward-engineering-2023-20231130165019170.webp)

_This demo is taken from Modal's example of using [DuckDB to analyze taxi NYC data in parallel over HTTPFS](https://modal.com/docs/examples/duckdb_nyc_taxi). It shows the power of DuckDB as a database engine and the flexibilities of having a local tool as opposed to a server-instantiated database._

![](assets/2023-november-forward-engineering_forward-engineering-november-2023_november-forward-engineering-2023-20231130165019170.webp)
