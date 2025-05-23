---
title: Data pipeline design framework
description: To improve and strongly go-live the data pipeline, besides apply best practices and pillar for Data Pipeline Native Solution, a design framework and pattern are robustly help us in...
date: 2024-03-15
authors:
  - longbuivan
discord_id: 1157659003527106600
github_id: longbuivan
icy: 15
tags:
  - data
  - data-pipeline
redirect:
  - /s/QbYUJw
---

## Motivation of designing data pipeline framework

To improve and strongly go-live the data pipeline, besides apply best practices and pillar for Data Pipeline Native Solution, a design framework and pattern are robustly help us in:

- Follow typical data pipeline
- Organize pipeline and adopt market
- Refer the other people use besides yours

Its easy to follow if we will discuss the pattern and solution with SWAT and pros/cons analysis and aks ourself for initiative questions such as: when to use and when not to use.

## Choosing your data pipeline by

### 1. Ask question

- Need historical data in output ?
  - Yes ? Replayable source ?
  - No ? Non-Replayable source ?
  - Size of data to be pulled
    - Large: Time raged
    - Small: Full Snapshot
    - Only past n period: Lookback
    - Streaming data: Streaming
  - Transformational Complexity
    - Standard: In-Transform
    - Depends on time of run or input value/MDM: Conditional flow
    - Multi teams: Disconnected pipeline/Follow fatten data pattern and post-transform
  - Is sink append only?
    - Yes: Non-overwritable sink
    - No: Overwritable sink
  - If Idempotent pipeline possible: Source overwrite sink

### 2. Source and sink

Before designing data pipeline and perform magic in data movement, we have to understand where we are and where we will go to help us direct the proper direction.

- Source: data systems where provide input(s) to data pipeline
- Sink: data systems where retrieve output(s) from data pipeline

#### 2.1 Source replayability

Can we answer question **What did the data look like n period ago (n can be min/hour/day/months/years)** ?
To able to answer that question, the data source need to support a data journey from every state of data. For example, Event stream, web server logs, delta change in database likes create/update/delete (CDC), ect.

#### 2.2 Source ordering

Does source system is event streaming or log-out event and push data into data pipeline in order? Especially streaming data. List of techniques are using to handle such as "backoff", "watermaking", "handling late event" need to be address when dealing with order events.

#### 2.3 Sink overwritability

Overwrite is required to prevent duplication of data processing and makes data more controllable and avoid partial data when pipeline fails. The unique key is used for tracking and overwriting data in:

- Overwritable sinks:
  - Database table has primary key
  - Cloud Storage has unique run id/row_id
- Non-overwritable sinks: Kafka queue/Streaming queue, then we have to store immediately and post-process events

### 3. Data pipeline patterns

Before jumping into any specific or pattern of system design for data pipeline, remember **Every solution need to be under consideration (pros/cons)**, there are 3 questions referred from experts in data foundation:

1. Extraction: How the data in source systems will be ingested (pull/push) ?
2. Behavior: When an error occurs, how data pipeline will re-act to ? (self-healing/bypass/refill)
3. Structural: What is the structure and variety of processing layer of task/transformation in data pipeline (multi-hop routing)

Now, detailing what we are taking

#### 3.1 Extraction

##### 3.1.1 Time ranged/Delta

Data pipeline only pulls the data corresponding to a specific time frame like daily/hourly/...
**Notes**: we need to update sink/destination reasonably by Slowly Changing on table to capture current state of data.

- **Pros**
  - Fast data pulls, only necessary data
  - Parallelize running of pipeline from single source
- **Cons**
  - More complicated when building Slowly Changing and build UPSERTs/MERGE INTOs statement to update latest data
  - Rely on source system to support replayable where pipeline will capture the time frame and delta

##### 3.1.2 Snapshot

Data pipeline scan and pull entire data from the source, and we need a additional column named **run_id** (on Database or new folder in cloud storage system) that uniquely identifies each pipeline run. Later used for data versioning.

- **Pros**
  - Simple to build the data pipeline
  - Easy to track when issue happened
  - Data versioning for each run
  - Simplify table structure
- **Cons**
  - Need to pull data from replica database, not primary one
  - Latency, slow execution
  - Schema changes may break the pipeline, whereas can be resolved by Infer Schema/Tooling like Delta lake
  - Store too much data leads to cost escalation
  - Not suitable for event data and large data

##### 3.1.3 Lookback

As an advanced data processing, lookback helps to handle source system which are continuously update and has late arriving events for particular record. That help to answer aggregate metric for the past n period because the data in fact table being changed.

- **Pros**
  - Great fit for fact data with KPI Dashboard tracking
  - Easy to build and maintain in Apache Beam where we careless about deployment. Focus on programing model-watermark-fired events...
- **Cons**
  - Report and Dashboard makes confusion for end-user if data late events are come a lot

##### 3.1.4 Streaming

Each record flows through data pipeline with enriched, registered, filtered, ect as needed. This is popular topic on market because users want to see the data as soon as possible

- **Pros**
  - Low latency
  - Real Quick look and action on data
- **Cons**
  - Have to handle scaling in downstream at high traffic and can break data pipeline
  - Source replayable is required for handling issue of failure/outage
  - Decoupling pattern for data pipeline to isolate source - pipeline - sink

#### 3.2 Behavioral

##### 3.2.1 Idempotent

Data pipeline does not cause duplication data/partial data/schema changes whenever it runs numerous time with the same inputs.

To implement the Idempotent data pipeline: the delete-write pattern is strongly recommended with highly carefulness. It require we understand sink systems mechanism.

Example: for database SQL

```sql
CREATE TEMP TABLE TEMP_YYYY_MM_DD
AS
SELECT c1,
    c2,
    SOME_TRANSFORMATION_FUNCTION(c3) as c3
FROM stage_table
WHERE day = 'yyyy-mm-dd';

-- note the delete-write pattern
DELETE FROM final_table
WHERE day = 'yyyy-mm-dd';

INSERT INTO final_table(c1, c2, c3)
SELECT c1,
    c2,
    c3
FROM TEMP_YYYY_MM_DD;

DROP TEMP TABLE TEMP_YYYY_MM_DD;
```

- **Pros**

  - Easy to build, maintain, further reruns and backfills
  - Easy to tracking data lineage

- **Cons**
  - Longer dev time
  - Hard to maintain with changing requirements
  - Good fit for OLAP and Relational Database

##### 3.2.2 Self-healing

The straightforward design for self-healing pipeline is all unprocessed data will be "catch-up" for the next cycle run when an error occurs during a run.
Whereas time ranged pipeline simply automatically run from the last checkpoint failed run before starting the run, or full snapshot doesn't need to care historical data, or lookback pipeline will skip failed run, Self-healing behavior need a meta running table to control the checkpoint and run_id that it can be challenging during implementation.

- **Pros**
  - Reduce alert fatigue and monitoring
  - Well handle an interruption and broken from upstream
  - Combine with idempotent runs, catch-up pipeline will handle as re-try flow
- **Cons**
  - Code bus may not be caught be debug as most assume pipeline would self-heal
  - System may be crashed by re-try as many time
  - Need to ensure overwritability on sink, no duplication, no partial
  - Need to handle metadata of pipeline

#### 3.3 Structural

##### 3.3.1 Multi-hop pipeline

An idea of multi-hop is keeping data separated at different levals/layer of cleanliness. Multiple layers of transformation help:

- Catch issues as soon as data quality checks after each layer with specific method for each layer
- Debug issue as fast as alerting and following a consistent pattern of applying transformation. (example: Type Error/Schema Error --> Check layer 1/Cleansing, Transform Erorr --> Check layer 2, Enrich Error --> Check layer 3 and so on...)
- The staging tables/temp table are key concept to figure out data structural layer, preferred approaches in here for vary standard and popular today:

1. [Stage/Intermediate/Marts from dbt](https://docs.getdbt.com/guides/best-practices/how-we-structure/1-guide-overview)
2. [Medallion architect from Databrick](https://docs.databricks.com/lakehouse/medallion.html)

- **Pros**
  - Rerun only failed transformations and their dependencies
  - Build new logic at any step of data processing
  - Pinpoint data if an issue occurred in the code. Debug step by step.
- **Cons**
  - Storage costs since we are storing copies of dataset from various layers
  - Processing costs with large data and rerun data

##### 3.3.2 Conditional/ dynamic pipeline

Additional consideration when keep an eye on th exploding complexity when pipeline grows and evolves. The requirement may need complex flows and pipeline do have different tasks based on different condition based on input. For example, we organize tasks in pipeline when input from user changes frequently.

- **Pros**
  - One pipeline(repo) to control data flow(data lineage)
  - Easy to deliver complex requirement of data flow
- **Cons**
  - Hard to debug, slow to develop
  - Critical thinking about design pattern(OOP)
  - Difficult for testing when need to simulate all the different input scenarios

##### 3.3.3 Disconnected pipeline - connected source storage

Disconnected data pipeline depend on data sinks of other data pipelines, but careless data sources. Define boundary of data pipeline based on Ontology/Semantic

- **Pros**
  - Quick to build
  - De-coupling development where teams can implement independently
- **Cons**
  - Hard to debug, tracking data lineage across system
  - Hard to define SLAs

### 4. Conclusion

The post provides idea how to get starting to consider and figure out the best fit for resolving problem, and how a typical question made when we are asked to create and organize data flows through data pipeline.

Last but not least, because of making development go well and maintenance more efficiency, the communication and get feedback are critical important during design and implement. Apply Scum method in software development is the best of choice.

I must lack of knowledge and experience and please email me if you have any questions, comments or advices.
Have a talk and make it better.
