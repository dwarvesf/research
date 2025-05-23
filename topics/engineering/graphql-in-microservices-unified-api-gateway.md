---
title: Graphql in microservices unified api gateway
description: Discover how Bramble, an open-source GraphQL federation gateway, unifies multiple APIs into a single scalable schema with fine-grained access control and easy deployment for modern microservice architectures.
date: 2023-03-29
github_id: mirageruler
icy: 10
redirect:
  - /s/AtJ_kA
---

## Preamble

What if you could access all of your organization’s data by typing a single GraphQL query, even if that data lived in separate places? Up until now, this goal has been difficult to achieve without committing to a monolithic architecture or writing fragile schema stitching code.
Ideally, we want to expose [one graph](https://principledgraphql.com/integrity#1-one-graph) for all of our organization’s data without experiencing the pitfalls of a monolith. What if we could have the best of both worlds: a complete schema to connect all of our data with a [distributed architecture](https://principledgraphql.com/integrity#2-federated-implementation) so teams can own their portion of the graph?
Currently, GraphQL proposes two approachs with detailed specification to create a unified GraphQL API from multiple GraphQL APIs which are:

- **Schema stiching**: Schema stitching involves combining multiple GraphQL schemas into a single schema. It involves merging schema types, resolvers, and query definitions to form a single schema. In this approach, each sub-schema defines its own types and resolvers, and these are then combined into a single schema that can be queried. The advantage of schema stitching is that it is relatively easy to implement, and it allows you to combine multiple schemas without having to modify the underlying services. However, one of the disadvantages of schema stitching is that it can lead to tight coupling between the sub-schemas, which can make it difficult to maintain and evolve the schema over time. Stitching assumes our company’s schema should be a centralized responsibility
- **Schema federation**: On the other hand, schema federation involves creating a gateway that sits between the client and multiple GraphQL services. In this approach, each sub-schema defines its own types and resolvers, and the gateway is responsible for combining the schemas and routing the queries to the appropriate service. The advantage of schema federation is that it allows you to evolve the schema over time without affecting the underlying services, and it can provide better performance by allowing each service to handle its own queries. However, the disadvantage of schema federation is that it can be more complex to implement, and it may require additional infrastructure to support. Federation assumes a company’s schema should be a distributed responsibility

Schema stitching is a good choice when:

- You have a limited number of APIs that you need to integrate, and the APIs have overlapping data.
- You need to have a unified API that can be queried from a single endpoint.
- You have a small number of data sources with well-defined relationships.
  Schema federation is a good choice when:
- You have a large number of APIs that need to be integrated.
- The APIs have non-overlapping data, or the relationships between the data are not well-defined.
- You need to scale different parts of the API separately.
- You need to have a high degree of control over the deployment and scaling of individual services.
  In summary, schema stitching is a simpler approach for combining multiple GraphQL schemas, but it can lead to tight coupling between the sub-schemas. Schema federation is a more complex approach, but it provides better scalability and flexibility for evolving the schema over time.

In my humble opinion, currently I'd prefer the schema federation approach since it provides too many advantages when it comes to scalability and flexibility. There are developers all over the world trying to improve some implementations of the schema stiching approach which might help it to be comparable with federation, but for now let's just go with the federation approach.

I would like to introduce [Bramble](https://github.com/movio/bramble), an open-source project developed by engineers working at [Movio](https://www.movio.la/) and is released under the MIT license.

## Bramble

As a GraphQL API gateway, Bramble supports the following features:

- **GraphQL federation**
  Bramble allows you to federate the schemas of multiple services together, i.e. to create a single GraphQL API out of smaller ones. Note that this is different from schema stitching, in that federation allows multiple services to contribute fields to common types. The Apollo team [pioneered the concept of GraphQL federation](https://www.apollographql.com/blog/apollo-federation-f260cf525d21/) in mid-2019, and Bramble is largely inspired by their work.
- **Fine-grained authorization system**
  Bramble supports [fine-grained access control](https://movio.github.io/bramble/#/access-control) which allows you to restrict and hide parts of the schema depending on which client is making a request. 
- **Pluggable architecture**
  Bramble has been designed [to be easily extended via plugins](https://movio.github.io/bramble/#/plugins). By default, Bramble contains a number of built-in plugins that offer a wide range of functionality such as a web UI, CORS support, Jaeger tracing support, etc. Writing a Bramble plugin is quite simple, see [how to write a plugin](https://movio.github.io/bramble/#/write-plugin), and [Bramble's built-in plugins](https://github.com/movio/bramble/tree/main/plugins).
- **Single-binary deployment**
  Bramble is a single binary and is very easy to deploy in most environments.
- **Stateless and horizontally-scalable architecture**
  Bramble is stateless, doesn't require any third-party services, and scales out easily for added reliability and performance.

The Bramble documentation has an easy to follow [getting started guide](https://movio.github.io/bramble/#/getting-started). In the rest of this blog post, we'll go through the history of the project, the motivations for creating it, and some comparisons to existing tools.

## Motivations

The Movio team started this project because they wanted a better way of sharing data and functionality across multiple teams. Imagining that a lot of other teams have been or are faced with a similar situation: a large legacy database, or a set of legacy APIs that become a bottleneck for new developments, and a desire to build something better. 
Here is what their infrastructure looked like after more than a decade of development:

- A primary database used as the source of truth for most data and also used as a communication channel between some services.
- Services exposing APIs using different protocols and encodings (REST, gRPC, JSON, XML, Protobuf).
- Little documentation for internal APIs, and no standardisation between them.
  For the sake of brevity, let's don't dwell too much on the pain points of the above. In short, maintaining a single database across multiple teams is painful, and maintaining a vast array of internal APIs between all of their teams without a consistent framework for those APIs is also painful.

![](assets/graphql-in-microservices---unified-api-gateway_legacy-old-architecture-example.webp)
_Legacy infrastructure_

When they began ideating the outline of a new architecture, they started by enumerating a number of requirements that were important to they:

- **Consistent across teams**
  First, they recognised the need for a standard and uniform way of defining and documenting internal APIs. They were spending way too much time synchronising the development across team boundaries and a unified API platform was priority number one.
- **Language agnostic**
  They wanted their API platform to work seamlessly across multiple programming languages and environments. They have teams using Go, Javascript/Typescript, Python, Scala, all for different and valid reasons and they wanted to accommodate each equally well.
- **Universal**
  They did not want to have to maintain different kinds of APIs for different kinds of use cases. Ideally, the frontend APIs and backend APIs should use the same technology. They have found in the past that maintaining services that have a public API in say, REST, and a private API in say, gRPC creates a very large overhead. As a result, they choose to have an API technology that is a "least common denominator" in terms of performance but has the benefit of being universal for the whole company.
- **Human-readable**
  Finally, they wanted to have an API platform that was easy to evolve and introspect. They wanted to stay away from binary formats and favored technologies that allowed to add functionality easily.

![](assets/graphql-in-microservices---unified-api-gateway_backend-architecture-with-graphql-gateway-example.webp)
_Target infrastructure_

Note that the requirements above are tailored to our needs at Movio. Each of them represents a trade-off between ease of use, consistency, and performance. Other organizations may require a different set of trade-offs.

## Why Bramble

Once they decided to go with GraphQL federation as their new API framework, we considered the two existing implementations, [Apollo Federation](https://www.apollographql.com/docs/apollo-server/) and [Nautilus Gateway](https://gateway.nautilus.dev/).
Apollo Federation seemed like the obvious choice at first glance, but for they it had two drawbacks. First, they wanted to be comfortable with extending and or modifying the gateway to suit their needs and they have little to no experience with high performance NodeJS backends[1](https://movio.co/blog/building-a-new-api-platform-for-movio/#1). Second, the [Apollo Federation syntax](https://www.apollographql.com/docs/federation/federation-spec/) is quite complex and we hoped to get away with using something simpler.
Nautilus Gateway looked like a promising alternative to Apollo and is written in Go, which is their bread and butter. In the end, they decided against using it due to it being, at the time, a single developer project with a very short history.
In the end, they decided to build their own implementation, using Nautilus as inspiration.

## Why GraphQL federation

During their initial design phase, they quickly narrowed down their choices for an API platform to just two technologies: REST + OpenAPI / Swagger, and GraphQL. In either case, they decided that the best solution would be to have a central API gateway to automatically aggregate all of their services together. Services would expose their API and the gateway would aggregate these services and expose a single unified API. They argued back and forth between those two options for a while, and finally decided to go with GraphQL after reading [Apollo's excellent blog](https://www.apollographql.com/blog/apollo-federation-f260cf525d21/) post on their new Federation concept for Apollo Server. 
For they, GraphQL federation is a real game changer that greatly increases the benefit of using GraphQL, particularly in a microservice environment. The main reason for this is that federation allows for the creation of APIs that appear monolithic, even when implemented by a set of smaller services in the backend. In traditional REST, or when using GraphQL with schema stitching, it is not possible to divide APIs between different services without either making it visible to the API client, or having to write an additional adapter layer in between.

## How GraphQL federation help us in designing better APIs

To illustrate how GraphQL federation helps designing great APIs, here's a small example of a Movie API that returns information about movies such as title, director, etc. A traditional REST API for this, would look something like this:

```
GET /api/v1/movie/583 ⇒
{
  "id": "583",
  "title": "Iron Man"
}
```

The equivalent GraphQL API would be very similar:

```
{ movie(id: "583") { id, title} } ⇒
{
	"movie": {
		"id": "583",
		"title": "Iron Man"    
	}
}
```

So far, both REST and GraphQL are not showing any meaningful difference. But what if another team wishes to add the functionality of attaching a poster URL to each movie? One option is to add this functionality to the original Movie service, but what if it were preferable to develop this functionality in a separate service instead?
In REST, without an additional adapter layer, the natural solution is the following:

```
GET /api/v1/movie/583 ⇒
{
  "id": "583",
  "title": "Iron Man"
}
```

```
GET /api/v1/movie-poster/583 ⇒
{     
	"movieId": "583",
	"posterUrl": "https://..."
}
```

In GraphQL, using schema stitching will lead to a very similar outcome:

```
{ movie(id: "583") { id, title} } ⇒
{     
	"movie": {
		"id": "583",
		"title": "Iron Man"
	}
}
```

```
{ moviePosterUrl(movieId: "583") } ⇒
{
	"moviePosterUrl": "https://..."
}
```

Hopefully the example above illustrates the point clearly: in the context of a microservice architecture, APIs that use traditional REST or GraphQL with schema stitching will likely get worse over time due to the proliferation of top-level endpoints / fields. This means that, as you add data fields to your API, it is very hard to not make it also more and more complex over time, and harder for the client to use.
Contrast this to what GraphQL Federation makes possible:

```
{ movie(id: "583") { id, title, posterUrl } } ⇒
{    
	"movie": {
	      "id": "583",
	      "title": "Iron Man",
	      "posterUrl": "https://..."
	 }
}
```

In the query above, it is completely transparent for the user that  `title`  comes from one service and that  `posterUrl`  comes from another. The API has the same number of top-level endpoints / fields as before, and is just as easy to use, only richer.
![](assets/graphql-in-microservices---unified-api-gateway_graphql-schema-federation-example.webp)

## Demo

- Follows README.md from this [repo](https://github.com/mirageruler/bramble_graphql_schema_federation_demo)

### Refs

- https://movio.co/blog/building-a-new-api-platform-for-movio/
- https://github.com/movio/bramble
- https://medium.com/@aaivazis/a-guide-to-graphql-schema-federation-part-1-995b639ac035
