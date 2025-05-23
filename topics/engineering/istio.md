---
title: Istio
description: Learn how Istio service mesh improves microservices networking with features like traffic management, security, and monitoring, and why it complements API gateways for scalable applications.
date: 2019-06-09
tags:
  - tool
redirect:
  - /s/EkacqA
---

Istio is an implementation of the Service mesh architecture, which is a network of microservices that interactive with each other to form an application. Besides Istio, there are several concept applying service mesh architecture such as Linkerd, Consul.

## Service mesh vs API gateway

Service mesh has been really a hot term recently, comparing to another microservice architecture, **API gateway**, which is considered simpler and a more mature solution. Therefore before digging into Istio, it is necessary to have a comparison between Service mesh and API gateway, to find out the pros/cons and the use case of each architecture, thus have a better overview for Istio.

### API gateway

The key objective API Gateway is to expose microservices as managed API. API Gateways comes with a number of powerful features such as load balancing, health checks, API versioning and routing, authentication & authorization, data transformation, analytics, logging, SSL termination, etc. Kong, Ambassador is two of successful open source API gateways.

![](assets/istio_72c7525c7279dec224c4d4a2fe92915e_md5.webp)

**Pros**

- Microservices can focus on business logic
- Authentication, logging, and monitoring can be handled by the API Gateway
- Flexibility to use completely independent protocols in which clients and microservice can talk
- Can handle failures/retries

**Cons**

- API Gateways are fairly centralized, so it could be a single point of failure if it is not well managed and scaled.
- Although they can be scalable, they still require a single point to register new APIs or change configuration
- From an organizational perspective, they are likely to be maintained by a single team

### Service mesh

Unlike API Gateways, Service meshes are focus on decentralized and self-organizing networks between microservices. that handle load balancing, service discovery, health checks, monitoring, and tracing. The mesh work by attaching small agents container, also known as "sidecar" alongside with every instance that manipulate the inbound/outbound traffic and handles instance registration, metric collection, and tracing. Istio, Linkerd are the most known service meshes.

![](assets/istio_c3a18948994827d122dccffab6bb925e_md5.webp)

**Pros**

- Because of the decentralization, service mesh entities handle their own traffic without being gathered at a single point.
- Service meshes are more dynamic and can easily shift shape and accommodate new functionalities and endpoints.
- Their decentralized nature makes it easier to work on microservices for development teams
- Resilience, failure/retry handling is as power as API gateway

**Cons**

- Service meshes is complex and require quite lot of resource.
- It requires the deployment of a separate traffic manager, a telemetry gatherer, a certificate manager and a sidecar process for each instance.
- They are still young, and need a lot more of development to be fully ready for a production grade microservice network.

## A nutshell

It’s easy to see that both API Gateway and Service mesh have the strength that each other misses, so many developers agree that the best practice for microservices network are combining both of them. Istio is the very first pioneer in this approach, making it the worthiest architecture in the world, that’s why it is backed by many engineers from tech giants like Google, IBM and Redhat.

## What leads to Istio

Let's begin with Kubernetes - the famous container orchestration platforms To make a microservices network, k8s basically run these 3 entities:

- Pod - a group of one or more containers, with shared storage/network
- Deployment - manages pod definition and defines replicas of pods
- Service - an abstraction, an access point to a set of Pods

So we have the microservices the Kubernetes way:

![](assets/istio_fea0e8efe47df6b5ee4ec298ca2af085_md5.webp)

What if I found microservices grow up like this?

![](assets/istio_ff46797937114ab9f237e8a4e6c75717_md5.webp)

Definitely it will become a multiple points of failure. This is where the savior Service mesh come in, and Istio can solve the problem. Istio injects a sidecar in every pod in the network:

![](assets/istio_e9b3b350df578cb36174854b3cf061a7_md5.webp)

So instead of continuously writing code for the routing, the circuit breaker or every networking stuff, we can focus on the business logic of each application in the network.

![](assets/istio_8bc273d9f58042ffc8b0dc8bcba5c4d7_md5.webp)

Our system's network now becomes more under controlled:

![](assets/istio_5ad7aeee9b729f36ab6d6a0cb8c33acc_md5.webp)

## Istio architecture

### Envoy

Istio utilizes an expanded Envoy proxy version which is a high-performance proxy built in C++ for all facilities in the service mesh to mediate all inbound and outbound traffic of the entire mesh network. Istio leverages many integrated characteristics of Envoy, making it the core component in establishing service meshes, such as:

- Dynamic service discovery
- Load balancing
- TLS termination
- HTTP/2 and gRPC proxies
- Circuit breakers
- Health checks
- Staged rollouts with percentage based traffic split
- Fault injection
- Rich metrics

![](assets/istio_2d2ef1b3abadb1e298b1cde0c5614f6a_md5.webp)

Envoy is deployed along side with every Kubernetes pods as a sidecar to the appropriate proxy. This deployment allows Istio to extract information about traffic behavior as attributes. Istio can, in turn, use these attributes in Mixer to enforce policy decisions, and send them to monitoring systems to provide information about the behavior of the entire mesh.

### Pilot

Pilot provides service discovery for the Envoy sidecars, traffic management capabilities for intelligent routing (e.g., A/B tests, canary rollouts, etc.), and resiliency (timeouts, retries, circuit breakers, etc.).

![](assets/istio_59b3a1cd6fd186a9203774101e1f6ab6_md5.webp)

Pilot transforms high-level scheduling rules into Envoy-specific settings that regulate the traffic and propagates them in real time to the sidecars. Pilot summarizes and synthesizes platform-specific service discovery processes (Kubernetes, Consul, etc) into a normal file that can be consumed by any sidecar compliant with the APIs of the Envoy data plane. This loose coupling allows Istio to run on multiple environments while maintaining the same operator interface for traffic management.

### Mixer

Mixer enforces access control and utilization strategies across the system mesh and gathers information from the Envoy Proxy and other facilities for telemetry. In another word, Mixer is the monitoring agent of Istio network.

![](assets/istio_76c3d8d9b9ee843b5445a06359a73111_md5.webp)

![](assets/istio_b26506ec8999334276375c45f5510191_md5.webp)

Mixer involves a versatile plugin system. It allows Istio to interact with multiple backend infrastructures. Istio therefore extracts from these information of the Envoy Proxy and Istio-managed facilities.

### Citadel

Citadel enables strong service-to-service and end-user authentication with built-in identity and credential management. Citadel can be used to upgrade unencrypted traffic in the service mesh.

![](assets/istio_44d2292a4e7d6391c544bfb68ad30f41_md5.webp)

### Galley

Galley is Istio’s configuration validation, ingestion, processing and distribution component. It is responsible for insulating the rest of the Istio components from the details of obtaining user configuration from the underlying platform (e.g. Kubernetes).

## References

- Book: Istio In Action - Christian Posta
- Istio docs: [https://istio.io/docs/concepts/what-is-istio/](https://istio.io/docs/concepts/what-is-istio/)
- [https://medium.com/microservices-in-practice/service-mesh-vs-api-gateway-a6d814b9bf56](https://medium.com/microservices-in-practice/service-mesh-vs-api-gateway-a6d814b9bf56)
