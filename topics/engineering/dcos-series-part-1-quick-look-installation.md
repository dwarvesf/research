---
title: Dcos series part 1 quick look installation
description: Learn how to install and set up DC/OS, a data center OS based on Apache Mesos, for managing modern containerized applications across master, public, and private agent nodes.
date: 2017-05-04
tags:
  - dcos
redirect:
  - /s/i-zaKQ
---

## What is DC/OS ?

DC/OS - Data center OS is based on the production proven Apache Mesos distributed systems kernel, combining years of real-life experience with best practices for building and running modern applications in production.

A DC/OS cluster is composed of three types of nodes: masters, private agents, and public agents.

There are some nodes that we will talk about:

- Bootstrap: we use this node to setup some configurations, to initialize a file which is called `dcos_generate_config.sh`, we will use this file to install DCOS into other nodes.
- Master: This node monitors all metrics from all other child nodes (public agent, private agent)
- Public agent: A public agent node is an agent node that is on a network that allows ingress from outside of the cluster via the cluster’s infrastructure networking.
- Private agent: A private agent node is an agent node that is on a network that does not have ingress access from outside of the cluster via the cluster’s infrastructure networking.

## Why DC/OS ?

Build modern apps using state of the art technologies such as containers and big data services, and confidently move from development to production.

## How can we install it ?

### System requirement -> here

### Installing

OK. Let’s go to the most excited section - Installing DC/OS!

Currently, DC/OS supported to run with specific installation guideline for each Provider:

- Amazon Web Service (AWS)
- Azure
- Digital Ocean
- GCE
- Packet

In this article, I will show you the way to install DC/OS generally. So that you can apply it for every clouds that you’re using.

### Step 1 - prepare on bootstrap node

- Create a directory named `genconf`

```javascript
mkdir -p gencof
```

- Create a configuration file and save as `genconf/config.yaml`

```javascript
---
bootstrap_url: http://<bootstrap_ip>:<your_port>
cluster_name: '<cluster-name>'
exhibitor_storage_backend: static
ip_detect_filename: /genconf/ip-detect
master_discovery: static
master_list:
- <master-private-ip-1>
- <master-private-ip-2>
- <master-private-ip-3>
resolvers:
- 8.8.4.4
- 8.8.8.8
cluster_docker_credentials:
 auths:
  'https://hub.registry1.com':
   auth: ZHdhpLtMG7wi7DsydLkd2FVz
   email: quang@dwarvesf.com
  'https://index.docker.io/v1/':
   auth: HdhpLtMG7wi7DsydLkd2FVzZHdhpLtMG7wi7DsydFVz==
   email: hi@dwarvesf.com
cluster_docker_credentials_dcos_owned: true
cluster_docker_credentials_enabled: 'true'
enable_docker_gc: 'true'
```

- Create a `ip-detect` script

```javascript
#!/usr/bin/env bash
set -o nounset -o errexit
export PATH=/usr/sbin:/usr/bin:$PATH
echo $(ip addr show eth0 | grep -Eo '[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}' | head -1)
```

- Download the DC/OS installer

```javascript
curl -O https://downloads.dcos.io/dcos/stable/dcos_generate_config.sh
```

- From the bootstrap node, run the DC/OS installer shell script to generate a customized DC/OS build file. The setup script extracts a Docker container that uses the generic DC/OS install files to create customized DC/OS build files for your cluster. The build files are output to ./genconf/serve/.

```javascript
sudo bash dcos_generate_config.sh
```

### Step 2 - install DC/OS to master nodes

- SSH to your master nodes:

```javascript
ssh <master-ip>
```

- Make a new directory and navigate to it:

```javascript
mkdir / tmp / dcos && cd / tmp / dcos;
```

- Download the DC/OS installer from the NGINX Docker container, where `<bootstrap-ip>` and `<your_port>` are specified in `bootstrap_url`:

```javascript
curl -O http://<bootstrap-ip>:<your_port>/dcos_install.sh
```

- Run this command to install DC/OS on your master nodes:

```javascript
sudo bash dcos_install.sh master
```

### Step 3 - install DC/OS to master nodes

- SSH to your nodes:

```javascript
ssh <node-ip>
```

- Make a new directory and navigate to it:

```javascript
mkdir / tmp / dcos && cd / tmp / dcos;
```

- Download the DC/OS installer from the NGINX Docker container, where `<bootstrap-ip>` and `<your_port>` are specified in `bootstrap_url`:

```javascript
curl -O http://<bootstrap-ip>:<your_port>/dcos_install.sh
```

- Run this command to install DC/OS on your agent nodes. You must designate your agent nodes as public or private.
- Private agent nodes: `sudo bash dcos_install.sh slave`
- Public agent nodes: `sudo bash dcos_install.sh public`

### Step 4 - launch the DC/OS

You can access to web interface at `http://<master-node-public-ip>/`and bingo !

![](assets/dcos-series-part-1---quick-look-installation_7e7988a963f67f1005ed0e19e2b93e01_md5.webp)
