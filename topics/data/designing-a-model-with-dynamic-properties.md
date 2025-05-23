---
title: Designing a model with dynamic properties
description: "When we started working on this project aimed at the creative community, we faced an interesting challenge. We needed to build a model that was similar to a task but with a key difference: it had to support custom, dynamic, and extensible properties. If you’ve ever used Notion and appreciated how flexible its objects are, you’ll know exactly what we were trying to achieve."
date: 2024-08-21
authors:
  - ngolapnguyen
tags:
  - database-modeling
  - system-design
redirect:
  - /s/le13YA
---

When we started working on this project aimed at the creative community, we faced an interesting challenge. We needed to build a model that was similar to a task but with a key difference: it had to support custom, dynamic, and extensible properties. If you’ve ever used Notion and appreciated how flexible its objects are, you’ll know exactly what we were trying to achieve.

## The expectation

First thing would be extensibility. This wasn’t just about adding simple text fields—we needed the model to handle various types of data, like select options, date-time values, booleans, and even custom relations to other existing models, such as users. Each and every select options should be extensible as well, allowing them to be shared across each team as a common configuration.

Another key consideration was making sure the model was easily query-able. We wanted to be able to sort and paginate through the entire dataset without hitting any roadblocks. This would ensure that as the model grows and evolves, it remains manageable and efficient to work with.

## The solution

Here’s a brief overview of what we ended up with (for presentation purposes only):

![](assets/designing-a-model-with-dynamic-properties-20240820225604474.webp)

### `tasks` table

```dbml
Table tasks {
	id string [pk]
	values string [ref: <> values.id]
}
```

We started with a very bare-bones model for tasks, which holds a many-to-many relation to the `values` table. This model doesn’t contain any data of the fields themselves; instead, it relies on the `values` table to retrieve the relevant field data.

### `fields` table

```dbml
Table fields {
	id string [pk]
	type string
	name string
	options string[] [ref: <> options.id]
}
```

The `fields` table is where the magic begins. The `type` column can be `text`, `checkbox`, `select`, `users`, etc., determining how a field's value should be extracted from `values` and how it should be handled on the front-end.

For select-type fields, options are saved through a many-to-many relation with the `options` table.

### `values` table

```dbml
Table values {
	id string [pk]
	field string [ref: > fields.id]
	text varchar
	checkbox boolean
	select string[] [ref: <> options.id]
	users string[] [ref: <> users.id]
	...
}
```

This table maps back to `fields` with a 1-to-1 relationship, using multiple columns to save a field’s value depending on its type.

### `options` table

```dbml
Table options {
	id string [pk]
	label string
	value string
}
```

Lastly, the `options` table stores the available options for select-type fields, linking each option to a field via its ID.

## The decisions

### Decision 1: Break things down into smaller models

When building an extensible object, separating the object from its fields was essential. By doing this, adding or removing fields became as simple as adding or removing a relation, allowing one task to have a completely different set of fields from another. Select options are also meant to be extensible, so we decided to move them into their own table as well.

### Decision 2: `tasks` should hold relations to `values` instead of `fields`

Another crucial decision we made was to have the `tasks` table hold relations to the `values` table rather than directly to the `fields` table. At first glance, it might seem simpler to link tasks directly to fields, but this approach would have limited the flexibility we were aiming for.

By connecting tasks to values instead, we created a system where each task can have its own unique set of values, all while using the same underlying fields. This means that different tasks can share the same field definitions but still hold different data.

Doing things this way might feel a bit counter-intuitive, in the sense that the data flows from tasks → values → fields. However, it allowed us to simplify the relationships in our model. By cutting out the many-to-many relation between tasks and fields, we made the system more efficient. When removing a field, we're actually just removing one relation from the `values` table, and the corresponding field goes away along with the value.

## The challenges

### Filtering & pagination

One of the main challenges we encountered was filtering and pagination. With our model involving multiple tables—tasks, fields, values, and options—queries often required complex joins. This setup had the potential to cause performance issues, especially as the dataset grew.

We rely heavily on Common Table Expressions (CTEs) to streamline our queries and improve performance. However, this solution still required careful management to ensure that the system remained efficient under heavy loads.

### Cross-team collaboration

Another challenge we faced was enabling cross-team collaboration. Since fields are scoped to each team, it became tricky when users needed to collaborate across different teams.

For instance, a field that exists in one team might not be present in another team where they are invited as guests. This limitation made collaboration difficult for our specific use case, as we don’t currently support a unified team workspace.

While we’ve implemented some solutions to mitigate this issue, it remains an ongoing challenge, and we’re still exploring better approaches to handle this scenario.

## Conclusion

In the end, the model we designed has been working well for our use cases, providing the flexibility and extensibility we set out to achieve. While there are still areas for improvement, particularly with cross-team collaboration, the foundation we've built offers plenty of room to grow. All in all, it’s been a fun journey, tackling challenges and finding creative solutions along the way.
