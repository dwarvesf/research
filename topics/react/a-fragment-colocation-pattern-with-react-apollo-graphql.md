---
title: A fragment colocation pattern with React & Apollo GraphQL
description: "When working with complex GraphQL schemas, it's common to have shared fields across different types. A fragment colocation pattern allows us to define fragments alongside their corresponding components, resulting in a more cohesive and maintainable codebase."
date: 2023-06-04
authors:
  - ngolapnguyen
github_id: ngolapnguyen
tags:
  - frontend
  - graphql
  - react
redirect:
  - /s/0GRHiQ
---

When working with complex GraphQL schemas, it's common to have shared fields across different types. A fragment colocation pattern allows us to define fragments alongside their corresponding components, resulting in a more cohesive and maintainable codebase.

By colocating fragments, we can easily reuse them across components that share common fields, reducing redundant code and promoting consistency. This can be further enhanced by using other layers of tooling, i.e. converting fragments into Typescript interfaces or auto generating React hooks for queries & mutations.

This note aims to discuss such a pattern, made possible with:

- [React](https://react.dev/)
- [Apollo GraphQL](https://www.apollographql.com/docs/): Comprehensive state management library for JavaScript that enables you to manage both local and remote data with GraphQL. We can use it to fetch, cache, and modify application data, all while automatically updating the UI.
- [@graphql-codegen/cli](https://www.npmjs.com/package/@graphql-codegen/cli): Auto generation of typed queries, mutations, subscriptions and typed GraphQL resolvers.

First, let's step back & take a quick look at what is a fragment.

## Fragments

A [GraphQL fragment](http://graphql.org/learn/queries/#fragments) is a piece of logic that can be shared between multiple queries and mutations.

Here's the declaration of a `NameParts` fragment that can be used with any `Person` object:

```graphql
fragment NameParts on Person {
  firstName
  lastName
}
```

Every fragment includes a subset of the fields that belong to its associated type. In the above example, the `Person` type must declare `firstName` and `lastName` fields for the `NameParts` fragment to be valid.

We can now include the `NameParts` fragment in any number of queries and mutations that refer to `Person` objects, like so:

```graphql
query GetPerson {
  people(id: "7") {
    ...NameParts
    avatar(size: LARGE)
  }
}
```

You precede an included fragment with three periods (`...`), much like JavaScript [spread syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax).

Based on our `NameParts` definition, the above query is equivalent to:

```graphql
query GetPerson {
  people(id: "7") {
    firstName
    lastName
    avatar(size: LARGE)
  }
}
```

If we later *change* which fields are included in the `NameParts` fragment, we automatically change which fields are included in operations that *use* the fragment. This reduces the effort required to keep fields consistent across a set of operations.

That's it for fragment. Let's move on to how we actually implement a colocation pattern with fragments and React.

## Example: Animal cards and lists

Let's consider an example where we're building an application that showcases cats and dogs. We want to implement reusable components to display individual animal cards (`CatCard` and `DogCard`) as well as lists of animals (`CatList` and `DogList`).

For backend, let's say we are using [NestJS](https://nestjs.com/). The schema consists of the following types:

```ts
interface AnimalModel {
  id: string;
  name: string;
  bread: string;
}

interface CatModel extends AnimalModel {
  age: number;
}

interface DogModel extends AnimalModel {
  weight: number;
}
```

We'll define fragments for the shared fields (`id`, `name`, and `breed`) within the `AnimalModel` type, and define two other fragments for cat & dog that extend from the animal fragment:

```jsx
import { gql } from "@apollo/client";

const ANIMAL_FRAGMENT = gql`
  fragment AnimalFragment on AnimalModel {
    id
    name
    breed
  }
`;

const CAT_FRAGMENT = gql`
  fragment CatFragment on CatModel {
    ...AnimalFragment
    age
  }
  ${ANIMAL_FRAGMENT}
`;

const DOG_FRAGMENT = gql`
  fragment DogFragment on DogModel {
    ...AnimalFragment
    weight
  }
  ${ANIMAL_FRAGMENT}
`;
```

By this point, we are still missing something until we can build the `CatCard` and `DogCard` components - the Typescript types.

With `@graphql-codegen/cli`, we can convert these fragments into Typescript interfaces by running a CLI script. I will not go into details into how the tool work so you should also give [Home – GraphQL Code Generator (the-guild.dev)](https://the-guild.dev/graphql/codegen) a look - they provide an interactive example.

Basically `@graphql-codegen/cli` will:

- Call our GraphQL backend to fetch the schema
- Scan our codebase for query, mutation and fragment definitions to convert
- Put the output into a file that we have specified

After running the CLI, the typing output will look like below:

```ts
// Output file: graphql/generated.ts

export type AnimalFragment {
	__typename?: 'AnimalModel';
	id: Scalars['String'];
	name: Scalars['String'];
	bread: Scalars['String'];
}

export type CatFragment {
	__typename?: 'CatModel';
	id: Scalars['String'];
	name: Scalars['String'];
	bread: Scalars['String'];
	age: Scalars['Int'];
}

export type DogFragment {
	__typename?: 'DogModel';
	id: Scalars['String'];
	name: Scalars['String'];
	bread: Scalars['String'];
	weight: Scalars['Int'];
}
```

Now that we have everything we need, let's build the `CatCard` and `DogCard` components:

```ts
import { CatFragment } from "graphql/generated";

// const ANIMAL_FRAGMENT = gql`...`

// const CAT_FRAGMENT = gql`...`

// const DOG_FRAGMENT = gql`...`

const CatCard = (props: { cat: CatFragment }) => {
  const { cat } = props;

  // Component rendering logic
};

const DogCard = (props: { cat: DogFragment }) => {
  const { cat } = props;

  // Component rendering logic
};
```

The properties `cat` and `dog` will have the types we have defined for the fragments they are actually using - an exact map from GraphQL models to Typescript types that we can be sure will always be accurate as long as the fragments we define match the schema from GraphQL backend.

Next, let's build the `CatList` and `DogList` component and see how we handle queries. Let's defined 2 queries to get cats and dogs:

```ts
// ... import needed stuff
import { gql } from "@apollo/client";

gql`
  query GetCatList {
    cats {
      ...CatFragment
    }
  }
  ${CAT_FRAGMENT}
`;

gql`
  query GetDogList {
    dogs {
      ...DogFragment
    }
  }
  ${DOG_FRAGMENT}
`;
```

Then we run `@graphql-codegen/cli` again. Depending on how we set-up the CLI, output will vary so the below are what I normally work with:

- `useGetCatListQuery`: A hook that fires a request to fetch cat list & return the data.
- `useGetCatListQueryLazy`: A hook that returns a function to fetch cat list in case we want to manually get the list.
- A variety of Typescript types for query document, variables or return result.

Core features of Apollo such as request state management, caching & revalidating are all functional through these custom hooks.

Now that we have the queries, let's build the `CatList` and `DogList` components:

```ts
// ... import needed stuff
import { useGetCatListQuery, useGetDogListQueryLazy } from 'graphql/generated';

const CatList = () = {
	const data = useGetCatListQuery();
	const cats = data.data?.cats || [];

	if (data.loading) {
		return null;
	}

	return cats.map(cat => <CatCard cat={cat} />);
}

const DogList = () = {
	const [getDogList] = useGetDogListQueryLazy();
	const [dogs, setDogs] = useState<DogFragment[]>([]);

	useEffect(() => {
		getDogList().then(res => setDogs(res.data?.dogs || []));
	}, [])

	return dogs.map(dog => <DogCard dog={dog} />);
}

```

In the above code, the `CatList` and `DogList` are using the query hooks generated in the previous step. `CatList` and `DogList` are using `CatCard` and `DogCard` components, while the queries are using `CatFragment` and `DogFragment` defined together with the card components.

All the types match perfectly.

## The benefits

This pattern offers several benefits:

- **Code reusability:** By defining fragments alongside their respective components, we can reuse the fragments in multiple queries and components. This avoids duplicating field definitions and promotes modular and reusable code.
- **Consistency:** Colocating fragments ensures that components sharing common fields always use the same fragment definition. This eliminates inconsistencies and makes it easier to maintain and update the codebase.
- **Readability:** By having fragments colocated with their components, developers can easily understand which fields are being used by a component without having to navigate to a separate file or location.
- **Overfetching prevention**: This pattern enforces one of GraphQL core values which is to not overfetch. Children components define what they need through fragments, and "bubble" that up to parent components where the queries take place. This make sure that we'll always fetch only what we need.
- **Automatic, strict typing**: Instead of manually defining types for the components, we are using types generated based on the fragments they are consuming. This ensure the types we are using will always map to a valid GraphQL model. Whenever we update a fragment, the corresponding type will also be updated.

## The disadvantages

While the Fragment Colocation Pattern provides several advantages, it's important to consider its limitations:

- **Fragment duplication:** If fragments are not organized and managed effectively, there is a risk of duplicating fragments across different components. This can lead to maintenance challenges and inconsistencies if modifications are required.
- **Increased complexity:** As the number of fragments and components grow, managing and organizing the fragments may become more complex. It's crucial to establish clear conventions and guidelines to keep the codebase manageable.
- **Inconventional approach**: Even though this pattern might look clear on paper, it might be challenge when engineers are new to it, especially if they are used to the REST mindset. Most often this pattern (or maybe GraphQL in general) demands engineers to adopt a completely different mindset when looking at building components.
  - _Personal take:_ _When we bubble types from children to parent, as the component trees grow bigger, it could become harder and harder to trace the fragments back to where they actually begin, especially when we couldn't organize or reuse the components effectively. It's a top-down vs bottom-up way of looking at components. We can quickly find the top, but we might need to dig around for a bit to find the bottom._

## Conclusion

The pattern we have discussed provides an effective way to colocate fragments with their corresponding components, while also provides strict typing and other quality-of-life features with extra toolings.

This pattern enhances code reusability, consistency, and readability. By reusing fragments across components that share common fields, we can avoid duplication and ensure a more maintainable codebase.

On the other hand, we also need to keep in mind its limitations, such as potential fragment duplication and increased complexity with larger codebases, and a steep learning curve.

All in all, personally I think this a pattern that's _easy to adopt, hard to master_ (thus also easy to mess up). It's true to the sprit of GraphQL, and worth a try to see for ourselves how it can give us a different approach to building optimized, well-organized code-bases.
