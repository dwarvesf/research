---
title: Introduction to Apache Hive
description: Learn how Apache Hive simplifies big data analysis by enabling SQL queries on Hadoop datasets using tables, making MapReduce easier for developers and data analysts.
date: 2022-11-10
github_id: dudaka
icy: 10
redirect:
  - /s/bGM81A
---

Welcome to one of the widely used tools in the Hadoop ecosystem! To get the best understanding about this tool, please visit the related articles about MapReduce, Apache Pig. In this article, we're going to see a brief introduction to Hive and we're going to create a Hive table and query a dataset using the newly created Hive table.

As usual, let's start with the question, when we think of analyzing data, for most of us, a database and a table immediately come to our mind. It's not a surprise because we're so used to visualizing data in a table format that is in a row, columnar fashion. And also, almost all of us are familiar with SQL. Data in Hadoop cluster is represented as files and so far MapReduce programming or Pig doesn't allow us to view the data in a table format. Therefore, it makes sense to have a tool in Hadoop ecosystem to represent the data sets in table structure and run SQL queries against it. Hive does exactly that.

Hive was developed by Facebook and is now a top level Apache project. Just like Pig, it is also widely used in the industry. With Hive, we can create table structures for our dataset and then write SQL queries to analyze our data set. And because of its ease of use, it has a very short learning curve when compared to MapReduce programming and Apache Pig. Hive takes in a SQL query and converts the query into one or more MapReduce jobs and submits the MapReduce jobs to the cluster. If we recollect, Pig does something very similar too: Pig takes in a Pig script using Pig Latin and convert it into one or more MapReduce jobs and submit the job to the cluster.

Why do we need to have two tools, Pig and Hive, doing somewhat similar things? First of all, Pig and Hive were created by Yahoo and Facebook respectively, to solve the same problem around the same time.The capabilities of each tool was not fully transparent to both companies at the early stages of development which resulted in the overlap.

The next question is that do companies use both Pig and Hive at the same time? The answer is yes, we have seen successful Hadoop implementations using both Pig and Hive in the same environment.Here is one such use case, we can use Pig for standard nicely extract, transform and load, that is ETL kind of jobs doing predefined aggregation data, cleanup, filtering and structuring of the data, etc. And Hive can used by developers, data analysts and scientists on a day to day basis for ad hoc analysts of data. Just like Pig, Hive is also a client tool, meaning we don't need to have Hive installed on all the nodes in our cluster, it must be installed on nodes where the Hive queries will be initiated from and that node should have access to the Hadoop cluster to execute the MapReduce jobs. That is the comparison between Hive and Pig.

Now that we know Hive has the concept of tables and queries. Let's look how does Hive compare to the traditional RDBMS systems. Hive leverages Hadoop for processing and hence can process huge volume of data. That is the strength of Hive, but Hive is a batch processing tool because it executes MapReduce jobs in Hadoop cluster behind the scenes. So we will not find all the bells and whistles of a traditional RDBMS system in Hive. Here are some of the key distinctions when comparing Hive and a traditional RDBMS system:

- We will not find pointed updates or deletes in Hive.
- Hive has limited support for indexing
- very high level transaction support which was introduced very recently.
- There are no support for triggers in Hives

With these key distinctions, Hive is not a database system rather than a tool that helps developers write MapReduce jobs in Hadoop cluster using simple SQL queries.

In the Hadoop ecosystem, Hive was a powerful tool to start with:

- It makes MapReduce very easy. We don't need to know a programming language to write MapReduce programs anymore. All we need to know is SQL and we feel right at home when working with Hive.
- It is easy to implement joints using Hive, again, the query syntax for joints is just as same in a traditional database system.
- Hive helps in structuring the data efficiently with the help of partitions and buckets, which helps an optimized execution of queries.
- Hive supports not just stacks, but different file formats.
- This feature is very important when compared to database: Hive does not enforce the schema on the data that is stored behind the Hive table. For example, if we have a 10-column table in a traditional database system, when inserting a record to the table, we have to supply values for all 10 columns. This means that the traditional database system enforces the schema during the write operation to the table. In a big data environment, our data may not always confront to a structure and Hive understands that. So Hive does not care about the structure of the data and does not enforce the schema on write, whereas it only looks up the schema during the read operation which helps us to work with data which are not fully structured.
- Finally, for any developer who wants to work in Hadoop, Hive is not an optional tool, it is a must-know tool in the Hadoop ecosystem. We will learn all the concepts in detail in next several articles.

Before we look at all the details and all the important concepts, we start simple. Let's create a database and then create a Hive table and query our stocks dataset. Here is the syntax to create a database and a table.

```sql
hive> CREATE DATABASE stocks_db;

hive> USE stocks_db;

hive> CREATE EXTERNAL TABLE IF NOT EXISTS stocks_tb (
exch STRING,
symbol STRING,
ymd STRING,
price_open FLOAT,
price_high FLOAT,
price_low FLOAT,
price_close FLOAT,
volume INT,
price_adj_close FLOAT)
ROW FORMAT DELIMITED FIELDS TERMINATED BY ','
LOCATION '/user/dungho/input/stocks';

hive> SELECT * FROM stocks_tb
LIMIT 100;
```

If we've worked with any databases like MySQL, SQLServer or Oracle, etc., this syntax will be very familiar to us. To create a database, all we have to say is `CREATE DATABASE` and specify a database name. The database is named `stocks_db`. Then to create objects under the database, we need to switch to the database. So we will say `USE stocks_db`. Next is the syntax to create the table, we're creating a table with name, `stocks_tb` by specifying a list of columns along with its data types. As we can also observe that the data types does look like data types from Java. There are a couple of new elements in the syntax which we will not find in the regular table creation syntax when working with regular databases like MySQL or Oracle. Our stocks data set is a comma delimited data set. So `ROW FORMAT DELIMITED FIELDS TERMINATED BY ','` indicates that the columns in the data set is separated by comma. The `LOCATION` attribute points to the location of the data set in HDFS. And that is where the stocks dataset resides. Each row in the data set has information like opening, closing, high, low prices and volume for a stock for a given day. The other thing is that the table is marked external. We'll look at table types in more detail in next articles. We can query the table is just like we do in MySQL or Oracle, etc. For example,

```sql
SELECT * FROM stocks_db
LIMIT 100;
```

## References

- https://cwiki.apache.org/confluence/display/Hive//LanguageManual
- The Ultimate Guide To Programming Apache Hive: A Reference Guide Document – Straight from the trenches, with real world lessons, tips and tricks included to help you start analyzing BigData, Fru Nde
