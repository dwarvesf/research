---
title: Blue green deployment
description: Learn how to implement blue-green deployment in Kubernetes using Argo Rollouts to reduce downtime, improve reliability, and smoothly switch between production environments.
date: 2022-02-16
github_id: nguyennh4522
icy: 10
redirect:
  - /s/kMYEKw
---

**Blue-green** deployment is a software deployment strategy that involves creating two identical environments: one **blue** environment serving production traffic, and another **green** environment that doesn't serve any traffic. Once the **green** environment is fully tested and verified, traffic is switched from the **blue** environment to the **green** environment, making it the new production environment. This approach reduces downtime, improves reliability and resilience, and provides a backup in case of issues.

![](assets/blue-green-deployment-model.gif)

## How does blue-green deployment work?

**Blue-green** deployment is a deployment strategy for software applications that involves maintaining two identical environments: one currently serving production traffic (the **blue** environment), and one that is newly deployed (the **green** environment"). The new version of the application is deployed to the **green** environment, which is tested and monitored. Once it is determined that the **green** environment is working correctly, traffic is routed to it and the **blue** environment is retired. This strategy allows for quick and easy switching between environments, minimizing downtime and reducing the risk of errors or bugs.

## Characteristic

The following table summarizes the salient features of the **blue-green** strategy compared to other strategies:

![](assets/blue-green-deployment_bluegreen-compare.webp)

## Implementing blue-green deployment strategy in Kubernetes

1. Preparing

Before implementing blue-green deployment in Kubernetes, there are a few things you should do to prepare:

- Set up a Kubernetes cluster with nginx-ingress controller, cert-manager, argo-rollouts
- Domain for active application and preview application
- Define application resources:
  ```
  .
  └── app/
      ├── bluegreen-rollout.yaml
      ├── ingress.yaml
      └── service.yaml
  ```

2. Implementation

To implement blue-green deployment in Kubernetes, you need create `bluegreen-rollout.yaml` file to defines the application resources and the rollout strategy:

```yaml
# bluegreen-rollout.yaml
apiVersion: argoproj.io/v1alpha1
kind: Rollout
metadata:
  name: myapp
  labels:
    app: myapp
spec:
  replicas: 1
  revisionHistoryLimit: 1
  selector:
    matchLabels:
      app: myapp
  template:
    metadata:
      labels:
        app: myapp
    spec:
      containers:
        - name: myapp
          image: argoproj/rollouts-demo:green
          imagePullPolicy: Always
          ports:
            - name: http
              containerPort: 8080
  strategy:
    blueGreen:
      autoPromotionEnabled: false
      activeService: myapp
      previewService: myapp-preview
```

`bluegreen-rollout.yaml` defined like a normal deployment file. The only difference is the `strategy` section:

- `autoPromotionEnabled`: will make the rollout automatically promote the new ReplicaSet to the active service once the new ReplicaSet is healthy. This field is defaulted to true if it is not specified (default: `true`).
- `activeService`: specifies the service to update with the new template hash at time of promotion. This field is required.
- `previewService`: specifies the service to update with the new template hash before promotion. This field is optional.

Next, you need to create `ingress.yaml` file and `service.yaml` file to define the ingress and service resources for the application:

```yaml
# ingress.yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: myapp
  annotations:
    cert-manager.io/cluster-issuer: letsencrypt-prod
spec:
  ingressClassName: nginx
  tls:
    - hosts:
        - myapp.bluegreen.xyz
      secretName: myapp.bluegreen.xyz-tls
  rules:
    - host: myapp.bluegreen.xyz
      http:
        paths:
          - pathType: Prefix
            path: "/"
            backend:
              service:
                name: myapp
                port:
                  name: http

---
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: myapp-preview
  annotations:
    cert-manager.io/cluster-issuer: letsencrypt-prod
spec:
  ingressClassName: nginx
  tls:
    - hosts:
        - myapp-preview.bluegreen.xyz
      secretName: myapp-preview.bluegreen.xyz-tls
  rules:
    - host: myapp-preview.bluegreen.xyz
      http:
        paths:
          - pathType: Prefix
            path: "/"
            backend:
              service:
                name: myapp-preview
                port:
                  name: http
```

```yaml
# service.yaml
apiVersion: v1
kind: Service
metadata:
  name: myapp
  labels:
    app: myapp
spec:
  selector:
    app: myapp
  ports:
    - name: http
      port: 80
      targetPort: http
  type: ClusterIP

---
apiVersion: v1
kind: Service
metadata:
  name: myapp-preview
  labels:
    app: myapp
spec:
  selector:
    app: myapp
  ports:
    - name: http
      port: 80
      targetPort: http
  type: ClusterIP
```

Apply these resources to the cluster:

```bash
kubectl apply -f app/bluegreen-rollout.yaml
kubectl apply -f app/service.yaml
kubectl apply -f app/ingress.yaml
```

Now, application is deployed on active environment and you can view it on `myapp.bluegreen.xyz` domain.

![](assets/blue-green-deployment_bluegreen-green-application.webp)

We change the image of the application to `argoproj/rollouts-demo:blue` and apply the changes to the cluster:

```yaml
# bluegreen-rollout.yaml
---
containers:
  - name: myapp
    image: argoproj/rollouts-demo:blue
```

```bash
kubectl apply -f app/bluegreen-rollout.yaml
```

Argo rollouts will create a new ReplicaSet with the new image and start to rollout the new version of the application to the preview environment. You can view the preview application on `myapp-preview.bluegreen.xyz` domain.

![](assets/blue-green-deployment_bluegreen-blue-application.webp)

When the new version of the application is ready, you can promote it to the active environment by running the following command:

```bash
kubectl argo rollouts promote myapp
```

Now, the application is deployed on active environment and you can view it on `myapp.bluegreen.xyz` domain.

## Conclusion

Implementing blue-green deployment in Kubernetes requires preparation, including setting up a Kubernetes cluster, containerizing the application, defining application resources in manifests, setting up a CI/CD pipeline, and implementing monitoring and logging. However, once set up, blue-green deployment can help increase the reliability, availability, and quality of the deployed application. By minimizing downtime, reducing risks, and ensuring the smooth transition to new versions of the application, blue-green deployment can ultimately help organizations deliver more value to their customers.

## References

- https://www.redhat.com/en/topics/devops/what-is-blue-green-deployment
- https://cloud.google.com/architecture/application-deployment-and-testing-strategies
- https://argoproj.github.io/argo-rollouts/
- https://viblo.asia/p/kubernetes-practice-english-automating-bluegreen-deployment-with-argo-rollouts-GAWVpoGaL05
