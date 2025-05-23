---
title: Libcluster in elixir
description: Learn how to set up Elixir node clustering with Libcluster on Kubernetes to build scalable, high-performance applications using Erlang features and reduce operational costs effectively.
date: 2022-11-02
github_id: hieuphq
icy: 10
redirect:
  - /s/QX-Vtg
---

In the Dwarves Foundation, we applied some practices to decrease the operation cost. We set up the runtime environments in the team.

- We are using docker and docker-compose in the development environment.
- Apply CI/CD in the development life cycle.
- Apply K8s in the production.
  We have followed and used the Elixir stack for several years. In the beginning, we used docker for production and vertical scaling. We didn't use the super-powerful of [Erlang and OTP](https://www.erlang.org/). When constructing Elixir applications, setting up an Erlang node cluster could be required for several factors, including high availability, redundancy, or the requirement to share a global state without relying on an external DBMS.

## The problem and motivation

We consistently applied the latest practice in the development life cycle. Dwarves Foundation changed languages, toolsets, architectures, and development processes to build high-performance products. We're using Golang and Elixir in the production environment.

- From Golang's side, the application(Server, CLI tool) is small and does a specific task. In the [microservices](https://microservices.io/patterns/microservices.html) architecture or [event sourcing](https://microservices.io/patterns/data/event-sourcing.html) architecture, Golang's applications as know as the workers. We can easy horizontal scale up the Golang workers; however, each worker is separated in the cluster. They don't communicate about their task to share the workload or collaboration. The Golang has no built-in technique for sending messages between servers.
- On the other side, Elixir, we may create modularized applications with an excellent performance by building on top of GenServers and Supervision trees. The mindset changed from an imperative to a declarative paradigm. Each module in Elixir looks like a service in the microservice architecture; they do the separating tasks. Your production infrastructure is generally not designed to support OTP apps if you're only beginning to integrate Elixir into your stack.
  **Libcluster** makes it simple to accomplish this. It supports a variety of techniques, as can be seen [in the documentation](https://hexdocs.pm/libcluster/readme.html). In this document, we go through the Libcluster's feature and set up a cluster in Kubernetes.

## Setup K8s in the Elixir project

- Prepare the environment.
- Make `Dockerfile` to build a docker image.
- Apply the configuration to K8s
  In the Elixir toolset, they supported the release feature as a standard. We can make a release preparation using some commands.

```bash
mix release.init
MIX_ENV=prod mix release
```

After running the [release task](https://hexdocs.pm/mix/1.14/Mix.Tasks.Release.html), we get the runnable package at `_build/prod/rel/ex_cluster/bin/ex_cluster`. In this example, the `ex_cluster` should be changed to our application name. Additionally, the script will create some [configuration files](https://elixir-lang.org/getting-started/mix-otp/config-and-releases.html#configuring-releases).

```
/rel/env.bat.eex
/rel/env.sh.eex
/rel/remote.vm.args.eex
/rel/vm.args.eex
```

We prepare a Dockerfile to describe the image.

```Dockerfile
FROM elixir:1.14
# Install Hex+Rebar
RUN mix local.hex --force && \
mix local.rebar --force

WORKDIR /opt/app
ENV MIX_ENV=prod

# Cache elixir deps
ADD . .
RUN mix deps.get
RUN mix release

# Use REPLACE_OS_VARS=true in order to swap runtime env values in rel/vm.args
ENV REPLACE_OS_VARS=true

# Do not use CMD, leads to issues receiving SIGTERM properly
ENTRYPOINT ["_build/prod/rel/ex_cluster/bin/ex_cluster", "start"]
```

Build the image using the docker and running.

```bash
docker build -t ex_cluster:local .
docker run --rm ex_cluster:local
```

## Libcluster and integration with Kubernetes

"Libcluster provides a mechanism for automatically forming clusters of Erlang nodes, with either static or dynamic node membership. It provides a pluggable "strategy" system, with various strategies provided out of the box."

### Connection [strategies](https://github.com/bitwalker/libcluster#clustering)

This document goes through some strategies in the DF team's practice. You can browse the detail in the original library document.

1. `Cluster.Strategy.Epmd`, which relies on Erlang's built-in distribution protocol. We can use this strategy for locally.
2. `Cluster.Strategy.Kubernetes`, which uses the Kubernetes Metadata API to query nodes based on a label selector and basename.
3. `Cluster.Kubernetes.DNS`, which uses DNS to join nodes under a shared headless service in a given namespace. This clustering strategy works by loading all your Erlang nodes (within Pods) in the current [Kubernetes namespace](https://kubernetes.io/docs/concepts/services-networking/dns-pod-service/). It will fetch the addresses of all pods under a shared headless service and attempt to connect. It will continually monitor and update its connections every 5s.
   We will set up the production and development follow below steps

- Integrate Libcluster: add the library, and configure the project in config.
- K8s deployment configuration

### Integrate library

Add the libray to project and make some configuration

```elixir
# mix.exs
defmodule ExCluster.MixProject do
  # ...
  defp deps do
  [
    {:libcluster, "~> 3.3"},
  ]
  end
end
```

Apply the dependency to the project

```bash
mix deps.get
```

### K8s configuration

Ideally, Libcluster read the information about the neighbor pod using Kubernestes Metadata API. Therefore we need to grant the permission to pod using [service account](https://kubernetes.io/docs/tasks/configure-pod-container/configure-service-account/) feature. Each node is setup a name follow the format `app@127.0.0.1`, the app name and pod's IP will setup in configuration file `rel/env.sh.eex`.

- Setup the env in `rel` folder.
- Grant permissions and setup the service configuration files.

```bash
#!/bin/sh
export POD_A_RECORD=$(echo $POD_IP | sed 's/\./-/g')
export RELEASE_DISTRIBUTION=name
export RELEASE_NODE=ex-cluster@$(echo $POD_IP)
```

We prepare the `POD_IP` env variable when setup the K8s deployment

```yaml
# k8s/rbac.yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  name: serviceaccount-ex
---
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: role-ex
rules:
  - apiGroups:
      - ""
    resources:
      - endpoints
    verbs:
      - list
      - get
---
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: rolebinding-ex
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: Role
  name: role-ex
subjects:
  - kind: ServiceAccount
    name: serviceaccount-ex
```

Remember the service account's name: **serviceaccount-ex** and use in deployment script.

```yaml
# /k8s/deploy.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: ex-cluster
spec:
  selector:
    matchLabels:
      app: ex-cluster
  replicas: 4
  template:
    metadata:
      labels:
        app: ex-cluster
    spec:
      serviceAccountName: serviceaccount-ex
      containers:
        - name: ex-cluster
          image: ex_cluster:local
          imagePullPolicy: Never
          resources:
            limits:
              memory: "128Mi"
              cpu: "200m"
          env:
            - name: POD_IP
              valueFrom:
                fieldRef:
                  fieldPath: status.podIP
            - name: NODE_COOKIE
              value: "cookie"
```

Group all of instances to the same headless service

```yaml
# /k8s/service.yaml
apiVersion: v1
kind: Service
metadata:
  name: ex-cluster-svc
spec:
  clusterIP: None
  selector:
    app: ex-cluster
  ports:
    - name: epmd
      port: 4369
```

We can see the `ports` attribute is different with normal way. This configuration help Libcluster can communicate via port 4369.

### Setup the development and production config

In Elixir, the configs are placed in the `config` folder. We can config the Libcluster's connection strategy for each environment. `Cluster.Strategy.Epmd` for development and `Cluster.Strategy.Kubernetes.DNS` for production.

```elixir
# config/dev.exs
config :libcluster,
  topologies: [
    example: [
      strategy: Cluster.Strategy.Epmd,
      config: [hosts: [:"a@127.0.0.1", :"b@127.0.0.1"]],
      connect: {:net_kernel, :connect_node, []},
      disconnect: {:erlang, :disconnect_node, []},
      list_nodes: {:erlang, :nodes, [:connected]}
    ]
  ]
```

We used the service names `ex-cluster-svc` and application names for the setup.

```elixir
# config/prod.exs
config :libcluster,
  topologies: [
    default: [
      strategy: Elixir.Cluster.Strategy.Kubernetes.DNS,
      config: [
        service: "ex-cluster-svc",
        application_name: "ex-cluster",
        polling_interval: 10_000
      ]
    ]
  ]
```

Load the strategy in the `application.ex`

```elixir
defmodule ExCluster.Application do
  use Application

  def start(_type, _args) do
    topologies = Application.get_env(:libcluster, :topologies) || []

    children = [
      {Cluster.Supervisor, [topologies, [name: ExCluster.ClusterSupervisor]]},
      # ..other children.
    ]

    Supervisor.start_link(children, strategy: :one_for_one, name: ExCluster.Supervisor)
  end
end
```

### Run locally

```bash
iex --name a@127.0.0.1 --cookie secret -S mix

# New terminal
iex --name b@127.0.0.1 --cookie secret -S mix

iex(b@127.0.0.1)> Node.list()
# [:"a@127.0.0.1"]
```

We can see the `b@127.0.0.1` connect with `a@127.0.0.1` automatically.

### Apply configuration for K8s

```bash
kubectl apply -f k8s/

kubectl logs ex-cluster-f8fcd4f46-22hkw
```

The services will start completely.

## Conclusion

In the meantime, we can take advantage of Elixir's power. We can easy to scale the service in a cluster using K8s, and they can communicate via the Erlang features. The cost-cutting may include reducing 3rd-party service and communication logic in the code base.

## References

- https://github.com/bitwalker/libcluster
- https://github.com/bitwalker/libcluster/issues/54
- https://medium.com/@groksrc/elixir-kubernetes-part-3-9bbd71c9c370
- https://mbuffa.github.io/tips/20201022-elixir-clustering-on-kubernetes/
- https://github.com/hieuphq/ex_cluster
