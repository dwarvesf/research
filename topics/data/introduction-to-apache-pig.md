---
title: Introduction to Apache Pig
description: Apache Pig simplifies Hadoop data processing by converting easy-to-write Pig Latin scripts into MapReduce jobs, enabling non-programmers to handle big data without coding in Java or Python.
date: 2022-11-14
github_id: dudaka
icy: 10
redirect:
  - /s/BmaasQ
---

In short, Apache Pig takes a set of instructions from the user and converts those instructions into MapReduce jobs and execute the MapReduce jobs in Hadoop cluster.

Let's start by asking what's wrong with writing a MapReduce program and why do we need a tool like Apache Pig to translate our instructions into MapReduce jobs.
Here is the answer, there are some challenges with MapReduce programming:

- First challenge, the ability to conceptually visualize the problem in MapReduce.
  This is a problem with most of us, we are so used to our traditional programming approach and now we are introduced to a "Whole New World" of MapReduce, which requires us to think of the solution to a problem in MapReduce sense.
  This does not come natural to us.
  For example, given a file with row by row employee details like employee name, employee ID, department ID, salary, etc.
  Think of how we would calculate the average salary by department in MapReduce.
  It's sure we will eventually figure it out but it needs a little bit of effort.
  That's our first challenge: conceptually visualizing a problem in MapReduce.
- Second challenge, knowledge of a programming language like Java, C++, Python, etc.
  This could be a biggest challenge for many people.
  We could be an excellent database developer or a super data analyst, but with traditional MapReduce programming, if we don't know a programming language, we're out of luck.
  Question: Is it possible to involve in Hadoop without learning a programming language?
  The answer is, of course, yes.
  Tools like Pig or Hive to the rescue.
- Third challenge, programming MapReduce in Java, for instance, takes up a lot of time and effort to do simple stuff like Joins for example.
  If we are dealing with data, join operations are the most rudimentary operations we would expect to do on our data sets on a regular basis.
  But joins are very difficult and time consuming to implement in MapReduce.
  Again, Pig is the rescue, with a simple one-line instruction in Apache Pig, we can perform joins.
  Pig in the background will do the heavy lifting for us by writing the needed MapReduce jobs and execute them in the Hadoop cluster.
- Last challenge, time and effort with all the challenges discussed about, it's very clear that writing a MapReduce program from scratch with the programming language will require time and effort.
  Pig will solve this problem.
  As a user, we will provide a set of instructions that Pig understands and Pig will generate one or more MapReduce jobs for us and execute the same in the Hadoop cluster.
  Thereby avoiding the need to write even a single line of MapReduce code sounds very promising.

![](assets/introduction-to-apache-pig_problem-template.webp)

Question: how a tool can replace the need for programmer and programming? Most of our data problems will follow a problem template, as shown in the above diagram, we will load the data, then filter the data.
It would be for removing bad records or removing some records like employees with salary greater than hundred thousand.
Then, we would perform some grouping of data, that is grouping on one or more columns.
After grouping, we would most likely perform aggregation like average, finding minimum values, maximum values from the group result set.
Finally, we would display or store the result set.
Of course, this template does not show operations like joins, etc. and our problem can be more complicated than this but it shows the idea.
Most of the data problems can be broken down into list of operations and Pig provides instructions for each operation.
At runtime, Pig will take these set of instructions, analyze them and translate them into one or more MapReduce jobs and execute them in Hadoop cluster.

A little bit of background of Apache Pig:

- Apache pig is developed at Yahoo. As memtioned in an article about Apache Hadoop, Hadoop was initially funded by Yahoo.
  When Yahoo had a successful Hadoop implementation, the need for non-programmers like data scientists, database developers, testers to use the Hadoop platform became more obvious.
  So, the Yahoo research team was tasked to create a tool that would help non-programmers to use Hadoop platform.
- Pig's first release came out in September 2008. Pig is not an acronym.
  When people at Yahoo were trying to come up with the name, one of the developers suggested Pig and the name got stuck because it was short and sweet.
- Pig is a client. Meaning, we don't have to install Pig in all the nodes in Hadoop cluster.
  Pig installation comes with a data flow language called Pig Latin, which defines the instructions that user will use to work with the data.
- The instructions will then be analyzed by an engine and translated into MapReduce jobs.
  These MapReduce jobs are then submitted to our Hadoop cluster.
  As long as we have Pig installed in one of the nodes in our cluster or installed on a node which has access to the cluster, we're good to go because for Hadoop cluster, a MapReduce job is a MapReduce job whether it was created by a user or created by an external tool like Pig.
- Finally, Pig uses HDFS and MapReduce programming model behind the scenes.
  The MapReduce jobs created by Pig will follow the MapReduce phases, which are described in MapReduce's articles.
  The tool is merely an enabler for us to execute MapReduce jobs without having to create MapReduce jobs.

Let's take a look about Pig Latin:

- Pig Latin is a simple to use data flow language.
- As a user, we typically write a series of instructions using Pig Latin.
  For example, if we want to load the data, we would use the load operator.
  To filter the data, we would use filter operator.
  To group the data, we will use group operator.
  Pig Latin also comes with aggregate functions like average for calculating average, min and max functions to calculate minimum and maximum values from a range of values, etc.
- When we execute the Pig instructions, Pig will analyze and optimize the instructions before translating the instructions into MapReduce jobs.
  In other words, Pig can do some optimizations to our instructions.
  For instance, if we're filtering records, Pig will see whether the filter operator can be moved any higher in the execution chain without possibly affecting the end result.
  Because the more sooner we filter the data in our execution chain, the less data subsequent steps will have to process which will definitely result in performance improvement.
  So, Pig can help us with optimization as well to an extent along with writing MapReduce jobs for us.

When Yahoo engineers started to work in developing Apache Pig, they had four philosophies in mind which they thought pigs should adhere to. These philosophies sure sounds funny but it gives a good Insight on what the tool can do:

- Philosophy 1, pigs eat anything.
  Pig can work with data even when we don't specify the metadata or schema or structure of the data set.
  Even when we don't specify the column names and its data types, Pig will try to work with the data. We'll find out more about the instructions in next Apache Pig's articles.
  But the point here is with very limited instructions, we can understand and process the data and also the data doesn't have to follow a strict schema.
  In a big data world we will be getting our data from multiple data points and not always we can expect our data will be structured.
  Pig is well suited for unstructured or semi-structured data sets as well.
  Also Pig is very forgiving when all the data in our data set does not adhere to a strict schema.
- Philosophy 2, pigs fly.
  Pig is built ground up with big data performance requirements in mind.
  Pig has an optimizer that could rearrange operators to optimize performance.
  Also new requirements and enhancements are made to Pig with performance considerations in mind.
- Philosophy 3, pigs are domestic animals.
  Pig is highly configurable.
  Pig allows us to write user-defined functions in Java and easily allow us to integrate the code so we're not stuck with just the functions and operators supplied by Pig.
  We can write our own code as well.
- Philosophy 4, pigs live anywhere.
  Pig is intended to be a language for parallel data processing.
  It is not tied to one particular framework like Hadoop.
  So far it is very successful with Hadoop, we have to wait and see how this philosophy is going to shine in the future.

So those are the philosophies, we have to keep in mind when we think of Apache Pig and if we're hoping for a carrier in Hadoop.
Pig is a must know tool and it's very simple and easy to learn.

In summary, Apache Pig helps to create MapReduce job with ease in Hadoop.

## Reference

- https://cwiki.apache.org/confluence/display/pig/
- Programming Pig: Dataflow Scripting with Hadoop 2nd Edition
