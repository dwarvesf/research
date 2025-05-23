---
title: Dbt the good solution to accelerate data transformation
description: Discover how DBT (data build tool) simplifies data transformation in warehouses with modular SQL, automation, and software engineering practices for faster, reliable analytics and trusted data delivery.
date: 2022-11-21
github_id: Bachpx2911
icy: 10
redirect:
  - /s/5a1QKw
---

Transformation is one of the most important process in building data warehouse. It will allow you to clean, combine, remove duplicates, reorganize, and filter all your data. The transformation will enable your enterprise to develop useful and reliable insights via analytics and There are several tools on market for it such as Striim, Pentaho, Hevo Data..Yet, the one that clearly stands out, in particular, the data build tool. This article will introduce and review DBT in transforming data.
According to DBT documentation, the tool is a development framework that combines modular SQL with software engineering best practices to make data transformation reliable, fast, and fun. It makes data engineering activities accessible to people with data analyst skills to transform the data in the warehouse using simple select statements, effectively creating your entire transformation process with code. You can write custom business logic using SQL, automate data quality testing, deploy the code, and deliver trusted data with data documentation side-by-side with the code. In short, DBT (data build tool) turns your data analysts into engineers and allows them to own the entire analytics engineering workflow.

So what make DBT more powerful than other tools? There are some advantage when Data Engineer or Data Analyst using DBT:

1. DBT is an open-source application written in Python, giving the users the power to customize it as needed. By using Jinja macro and SQL, your code in DBT will be simple
   and short. We can see it in below example:
   Normal SQL

```sql
select
order_id,
sum(case when payment_method = 'bank_transfer' then amount end) as bank_transfer_amount,
sum(case when payment_method = 'credit_card' then amount end) as credit_card_amount,
sum(case when payment_method = 'gift_card' then amount end) as gift_card_amount,
sum(amount) as total_amount
from {{ ref('raw_payments') }}
group by 1

```

SQL with Jinja

```select
order_id,
{% for payment_method in ["bank_transfer", "credit_card", "gift_card"] %}
sum(case when payment_method = '{{payment_method}}' then amount end) as {{payment_method}}_amount,
{% endfor %}
sum(amount) as total_amount
from {{ ref('raw_payments') }}
group by 1
```

2.  It also offers a lot of flexibility to the users. Say, for example, the resultant project structure is not a match for your organizational needs. You can customize it by
    editing the dbt_project.yml file or the configuration file and rearranging the folders.

3.  It Apply software engineering practices—such as modular code, version control, testing, and continuous integration/continuous deployment (CI/CD)—to analytics code.
    Controlling code version may be useful to manage logic in building data warehouse

4.  Data documentation is accessible, easily updated, and allows you to deliver trusted data across the organization. DBT automatically generates documentation around descriptions, models dependencies, model SQL, sources, and tests. DBT creates lineage graphs of the data pipeline, providing transparency and visibility into what the data is describing, how it was produced, as well as how it maps to business logic.

Beside these features, DBT also provide other features as other transformation tool. However, it also have some cons. Firstly, you will still need an additional tool or
tools to do the extract and load steps to carry out the process since the Data Build Tool only handles the T aspect of ETL. Secondly, due to DBT it is SQL-based, it provides less readability than tools with an interactive UI. And lastly, if you want to transform with database statement such as merge loop model, DBT may not support this.

In conclusion, I think DBT is a good tool for transforming data. I think that this tool will continue developing more and becoming popular in the future

## References

- https://www.analytics8.com/blog/dbt-overview-what-is-dbt-and-what-can-it-do-for-my-data-pipeline/
- https://docs.getdbt.com/docs/get-started/learning-more/using-jinja
