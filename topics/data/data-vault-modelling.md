---
title: Data vault modelling
description: Learn how Data Vault architecture builds flexible, scalable data lakes using hubs, links, and satellites to manage business keys and historical data with pros and cons explained.
date: 2022-12-15
github_id: Bachpx2911
icy: 10
redirect:
  - /s/6S6FMg
---

## Introduction

When looking to build out a new data lake, one of the most important factors is to establish the warehousing architecture that will be used as the foundation for the
data platform. While there are several traditional methodologies to consider when establishing a new data lake (from Inmon and Kimball, for example), one alternative
presents a unique opportunity: Data Vault. In this article, I will show basic knowledge of data vault and some pros and cons of it.

## Overview of data vault

Data Vault is created by Dan Linstedt and his team at Lockheed Martin in the early 90s. It includes 3 main cores: Hub, Link and Satellite. Hub represents a core business concept, such as they represent Customer Id/Product Number/Vehicle identification number (VIN). Users will use a business key to get information about a Hub. Hubs don’t contain any context data or details about the entity. They only contain the defined business key and a few mandated Data Vault fields. A critical attribute of a Hub is that they contain only one row per key.

Meanwhile, A Link defines the relationship between business keys from two or more Hubs. Just like the Hub, a Link structure contains no contextual information about the entities. There should also be only one row representing the relationship between two entities.

In order to represent a relationship that no longer exists, we would need to create a satellite table off this Link table which would contain an is_deleted flag; this is known as an Effectivity Satellite.

## Example of data vault

We can have an example of data vault model here. For example, we have relationship database as example:

Employee table:

```
employee_id(PK),
job_id(FK),
department_id(FK),
hire_Date,
salary,
first_name,
last_name,
manager_id
```

Job table:

```
job_id(PK),
job_name,
min_salary,
max_salary
```

Department table:

```
department_id(PK),
department_name,
location_id
```

Location table:

```
location_id(PK),
street,
city,
district
```

From these tables, we will create hub,link and sattelite:

Hub_employee:

```
HK_employee(hash key of employee_id),
employee_id,
load_dts,
source
```

Hub_job:

```
HK_job(hash key of job_id),
job_id,
load_dts,
source
```

Hub_department:

```
HK_department(hash key of department_id),
department_id,
load_dts,
source
```

Hub_location:

```
HK_location(hash key of location_id),
location_id,
load_dts,
source
```

Link_employee:

```
Emp_Job_Dep_HK(hash key of employee_id, job_id, department_id),
employee_id,
job_id,
department_id,
load_dts,
source
```

Link_department:

```
Dep_Loc_HK(hash key of department_id, location_id),
department_id,
location_id,
load_dts,
source
```

HAL_link:

```
HAL_HK(hash key of manager_id,employee_id),
manager_id,
employee_id,
load_Dts,
source
```

Sat_employee:

```
HK_employee(hash key of employee_id),
first_name,
last_name,
email,
phone_number
```

Sat_location:

```
HK_location(hash key of location_id),
street,city,
district
```

Each hub will represent for entity in database. The primary key of each table is hask key of business key. Then we will create dimension and fact table through join
between link, hub and sat table.

## Pros and cons of data vault

Pros: flexibility, maintainability and scalability both in terms of semantic complexity and sheer volume.

It aims to facilitate the above by introducing three major design principles that set it apart from an EDW based on 3NF or on dimensional modelling:

- It decouples management of business keys from any attributes of business entities (Hubs/Links and their Satellites).
- It expects any relationship between business entities within the system to be modelled as many-to-many (a link table is introduced for any such relationship).
- It assumes that all attributes are maintained in a way, similar to type 2 slowly changing dimension of Kimball-style dimensional modelling.

These design principles allow the system to use MPP for any ETL processes (all entities can be loaded at the same time), facilitate Master Data Management (it offers great flexibility in adding/removing data sources) and provides a robust framework for recording historical data.

Cons:

- Two to three-fold explosion of the number of tables compared to 3NF modelling
- Data Vault EDW does not focus on read performance: large number of relationships between tables and complexity of joins often require separate layer of bridging tables to be maintained as materialised views of the data vault

## References

- https://www.phdata.io/blog/building-modern-data-platform-with-data-vault/
- https://www.databricks.com/glossary/data-vault
