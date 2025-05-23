---
title: Partitions on Apache Hive
description: Learn how Hive partitions and dynamic partitions optimize query performance by targeting specific data subsets, reducing scan times, and efficiently managing large datasets for faster Hive queries.
date: 2022-12-02
github_id: dudaka
icy: 10
redirect:
  - /s/s1NLfg
---

Have you ever been in a situation where you are trying to optimize a slow running query to make it run faster? In our case, we have been looking at that query for hours and realized that the query is scanning the entire table and we are thinking that this query will be super fast if it only targets specific set of records instead of the entire table. Thus, what we really want, hopefully you too, in such cases is partitions.

Let's find out about partitions in Hive with the following two parts:

- Partitions:

  - What are partitions?
  - Benefits of partitions
  - Creating and loading partitions in Hive.

- Dynamic partitions
  - What are dynamic partitions?
  - Benefits of dynamic partitions

## Partitions

For example, we want to query the `stocks` table to look at the stock's details for symbol `XYZ` on 2000/07/03. Even though, as a user, we're only interested in one stock symbol for a specific date, this query, however, will run a MapReduce job which will scan the entire data set to get the result set. This means that the execution time will be longer. Wouldn't be so nice if we can Target the query to scan only the records that belong to the symbol `XYZ` to get the result set? There is a way to do exactly that in Hive and it is by using partitions. Now, the `stocks` table has no way of differentiating the records for symbol `XYZ` with records for symbol `ABC`. Using partitions in Hive, we can basically compartmentalize our data set. The syntax for creating a partition table is very similar to a regular table, the only difference is the partition table will have the `PARTITION BY` clause and we have to mention a new name to the partition column.

```sql
CREATE TABLE IF NOT EXISTS stocks_partition (
    exch STRING,
    symbol STRING,
    ymd STRING,
    price_open FLOAT,
    price_high FLOAT,
    price_low FLOAT,
    price_close FLOAT,
    volume INT,
    price_adj_close FLOAT
) PARTITIONED BY (sym STRING)
ROW FORMAT DELIMITED FIELDS TERMINATED BY ',';
```

In the `stocks_partition` table, we are naming the partition column as `sym` as we want to partition the data set by symbol. Note that this column is not the same column as the `symbol` column in the table. When the table is created, let's execute the describe command on the table:

```sql
DESCRIBE FORMATTED stocks_partition;
```

![](assets/partitions-on-apache-hive_describe_stocks_partition.webp)

As the above screenshot, the describe information for this table shows partition information the column name for our partition is `sym` and the data type of that is string. To load data into the partition table, it is slightly different from loading a regular table, we're selecting all the records from the `stocks` table with simple `B7J` and inserting those records into the `stocks_partition` table. The important thing to note here is that we're assigning `B7J` to be the value of the partition column `sym`.

```sql
INSERT OVERWRITE TABLE stocks_partition
PARTITION (sym = 'B7J')
SELECT * FROM stocks s
WHERE s.symbol = 'B7J';
```

![](assets/partitions-on-apache-hive_inserting-b7j.webp)

When the execution of the above command is completed, as shown in the screenshot, Hive created a partition in `stocks_partition` table with the name `sym` equals `B7J`. Assume that another partition for symbol `BB3` is created with the following command:

```sql
INSERT OVERWRITE TABLE stocks_partition
PARTITION (sym = 'BB3')
SELECT * FROM stocks s
WHERE s.symbol = 'BB3';
```

We can list the partitions for a given table with `SHOW PARTITIONS stocks_partition;`, tthere are two partitions.

![](assets/partitions-on-apache-hive_show-partitions.webp)

How the data is physically structured for this table `stocks_partition` in HDFS? We can get the value from the location attribute with the command `DESCRIBE FORMATTED stocks_partition;`.

![](assets/partitions-on-apache-hive_location.webp)

Usually, we will see files under the tables directory, but the partition tables are structured and stored slightly differently. As shown in the above screenshot, under the directory `stocks_partitions`, we see two more directories one for symbol `B7J` and the other one for symbol `BB3`. These are partition directorie. In the directory `B7J`, there is a file which will have just the records for symbol `B7J` nicely stored in the partition directory. When we query the data for symbol `B7J` using the partition column `sym`, the MapReduce job will only scan this specific directory and that is quite powerful. Since we are not scanning the entire data set anymore, the execution time of this query will be much faster.

We can also load a partition from a HDFS location. For example, the records for symbol `ZUU` is in the directory `output/hive/stocks-zuu`, which we can load by using this insert command:

```sql
INSERT OVERWRITE DIRECTORY 'output/hive/stocks-zuu'
SELECT *
FROM stocks WHERE symbol='ZUU';
```

This insert command will create this output directory `stocks-zuu` and it will select all the records from the `stocks` table with symbol `ZUU` and will insert all the records into the newly created directory. Then, we can add a partition to the table using the alter command like this:

```sql
ALTER TABLE stocks_partition ADD IF NOT EXISTS
PARTITION (sym = 'ZUU') LOCATION 'output/hive/stocks-zuu';
```

The partition is now created for symbol `ZUU`, we can execute `SHOW PARTITIONS stocks_partition;` again to see the list of partitions for the table and there are three partitions created: one for symbol `B7J`, second for symbol `BB3` and finally for symbol `ZUU`.

We can also create multiple partitions with one insert and multiple selects like this:

```sql
FROM stocks s
INSERT OVERWRITE TABLE stocks_partition
PARTITION (sym = 'GEL')
SELECT * WHERE s.symbol = 'GEL'
INSERT OVERWRITE TABLE stocks_partition
PARTITION (sym = 'GEK')
SELECT * WHERE s.symbol = 'GEK';
```

This instruction is very simple to understand but it also looks a little weird. First, we're starting with the table name and then we have an `INSERT` followed by a `SELECT`. Nex, another `INSERT` is followed by a `SELECT`. Here, we will be creating two partitions: one for symbol `GEO` on the other one for symbol `GEK`. For both partitions, we will be selecting appropriate records from the `stocks` table.

```sql
ALTER TABLE stocks_partition DROP IF EXISTS PARTITION(sym = 'GEL');
```

As mentioned on the article [Managed Table vs External Table](managed-table-vs-external-table.md), we cannot delete records from a Hive table but with partition tables, we can drop partitions using the drop command, which will essentially result in deleting all the records for that partition. For instance, we want to delete all the records for symbol `GEL`. Usually, we will not be able to do that using Hive as we would do with the delete statement in SQL. But with the help of partition, we can drop the entire partition. Here, we're essentially dropping the partition `GEL` which has all the records for symbol `GEL`.

```sql
INSERT OVERWRITE TABLE stocks_partition
PARTITION (sym = 'APPL')
SELECT * FROM stocks s
WHERE s.symbol = 'MSFT';
```

Let's consider the above insert, we are loading records for Microsoft into Apple partition.
This is logically wrong since it will return Microsoft records when a user queries the Apple partition.
Hive will not validate the data that is loaded into partitions and also it will not raise any errors when we incorrectly load data into partitions
It is the developer's responsibility to make sure the partition is loaded with correct set of records.

## Dynamic partitions

Imagining that we are trying to create partitions for thousands of symbols. Manually creating partitions one by one is a tedious exercise and also will eventually lead to errors like the one we just saw with Apple and Microsoft. Dynamic partition inserts solve that problem. So far we have been giving the values for the partition columns and this means that the values for the partition columns are known at compile time. When we use Dynamic partition inserts, however, the partition column values are known at execution time. To enable the dynamic partition, we set `hive.exec.dynamic.partition` to `true` with command `SET hive.exec.dynamic.partition=true;`.

```sql
INSERT OVERWRITE TABLE stocks_partition
PARTITION (sym)
SELECT s.*, s.symbol
FROM stocks s;
```

Now, in the above query, we're not hard coding symbols anymore. At runtime, the symbols will be resolved. For each symbol in the `stocks` table, a partition will be created and all the records for that symbol will be loaded into the appropriate partition.

This is the interesting part! When executing the above insert query, it will give an exception. By default, `hive.exec.dynamic.partition.mode` parameter is set to `strict`, so in strict mode, we would need to have at least one partition column to be given a static value. This is to avoid careless errors by dynamically loading the partitions with, for instance, the `date` column since we'll end up with many number of partitions, one for each date in the dataset. Since we have only one partition column, we cannot load this table in strict mode. We can change the `hive.exec.dynamic.partition.mode` parameter to `non-strict` mode, but then we will leave the table vulnerable to errors. So, `strict` mode is recommeneded.

```sql
CREATE TABLE IF NOT EXISTS stocks_dynamic_partition (
exch STRING,
symbol STRING,
ymd STRING,
price_open FLOAT,
price_high FLOAT,
price_low FLOAT,
price_close FLOAT,
volume INT,
price_adj_close FLOAT)
PARTITIONED BY (exch_name STRING, yr STRING, sym STRING)
ROW FORMAT DELIMITED FIELDS TERMINATED BY ',';
```

Let's create another table named `stocks_dynamic_partition` with the above query. The table has three partition columns: exchange name `exch_name`, year `yr` and symbol `sym`.

```sql
INSERT OVERWRITE TABLE stocks_dynamic_partition
PARTITION (exch_name='ABCSE', yr, sym)
SELECT *, year(ymd), symbol
FROM stocks;
```

For the table `stocks_dynamic_partition`, with the above insert command, we are giving a static value of `ABCSE` for the first partition column exchange name. In the select statement, the dynamic partition column must be specified last and in the same order in which they appear in the partition clause. We have given a static value for the first partition column, the value for the next two column will be derived from the select statement. Technically, this query should execute but Hive is known to have stability issues when we try to create Dynamic partitions with huge data set. The link that talks about this issue is in References section. The later versions of Hive will fix this issue. So, to avoid this issue let's create partitions for records from 2001 to 2003 with the following insert command.

```sql
INSERT OVERWRITE TABLE stocks_dynamic_partition
PARTITION (exch_name='ABCSE', yr, sym)
SELECT *, year(ymd), symbol
FROM stocks WHERE year(ymd) IN ('2001', '2002', '2003')
```

If we execute this insert command, there is an error showing that the number of partitions that we're trying to create is more than the number of partitions that is allowed per node, which is by default set to 100, which is very low. But we can configure the number using two following properties:

```
SET hive.exec.max.dynamic.partitions=1000;
SET hive.exec.max.dynamic.partitions.pernode=500;
```

The first property `ive.exec.max.dynamic.partitions` is about how many partitions in total are allowed to be created. The second property `hive.exec.max.dynamic.partitions.pernode` is about how many partitions are allowed per node.

Even though the two properties are set, when executing this insert, Hive may give an error because our cluster is not a huge cluster and when Hive is trying to calculate the space required to create all the necessary partitions, it will not find enough space in the cluster. So let's restrict the number of partitions which we are going to create using another condition in the where clause:

```sql
INSERT OVERWRITE TABLE stocks_dynamic_partition
PARTITION (exch_name='ABCSE', yr, sym)
SELECT *, year(ymd), symbol
FROM stocks WHERE year(ymd) IN ('2001', '2002', '2003') and symbol like 'B%';
```

For symbol that starts with `B`, this insert command will create partitions for records from year 2001 to 2003 and also for any stock symbol that is beginning with `B`. When the execution is completed, dynamic partition insert created a lot of partitions. To be specific, it created about 362 partitions.

Let's check how the directories are structured for each partition. Since we have more than one partition columns in the table, so we do HDFS listing on the table first.

![](assets/partitions-on-apache-hive_check-dynamic-partitions.webp)

Under this table, we see the high level partition which is exchange name equals `ABCSE`. We can go into that partition and see what is inside that partition. As expected as shown in the above screenshot, there are three partitions under the first partition `ABCSE`: one for year 2001, 2002 and 2003. If we go into 2003 directory, there are several directories or partitions, one for each symbol. The symbol directories will have the files for that corresponding symbol.

```sql
SELECT * FROM stocks_dynamic_partition
WHERE yr=2003 and volume > 10000;

SELECT * FROM stocks_dynamic_partition
WHERE yr=2003 and sym='GEL'  and volume > 10000;
```

The above queries are valid. In the first one, the MapReduce job targets the 2003 partition and it will process all the records under the directory. The second select is even better since the MapReduce job will only execute on files under the directory `GEL`, which is under the directory 2003, so the execution will be faster than the first query since we are scanning only fewer files.

```sql
SELECT * FROM stocks_dynamic_partition
WHERE volume > 10000;
```

However, if we try to execute the above query, we will get an error because when the property `hive.mapred.mode` is set to strict. Hive will not allow to execute a query on a partition table without specifying a partition column in the where clause because this query is considered risky. Since we did not include a partition column in the where class for filtering, Hive has to scan the entire table to fetch the result set. To make this query work again, we can set this property to `non-strict` but it is not recommended because that would lead to performance issues. So, instead, let's fix the query by adding the partition columns in the where condition like this:

```sql
SELECT * FROM stocks_dynamic_partition
WHERE exch_name = 'ABCSE' and volume > 10000;
```

And this query with the where condition exchange name and volume will execute with no issues. In summary, partitions minimizes the execution time by helping MapReduce job to execute on targeted files or directories. We also consider few different ways to load partitions. We also understand how to load hundreds of partitions with just a simple insert select statement using dynamic partitions. Partitions are very powerful and when we design the tables with right partition columns, it will save a lot of execution time and our queries will be faster. So when designing a Hive table next time, let's always think of partitions.

## References

- https://stackoverflow.com/questions/21876837/not-able-to-apply-dynamic-partitioning-for-a-huge-data-set-in-hive
