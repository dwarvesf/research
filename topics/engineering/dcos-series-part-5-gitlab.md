---
title: Dcos series part 5 Gitlab
description: Learn how to install and secure Gitlab on DC/OS with HTTPS, configure domain and email settings, and manage private Git repositories for small teams using step-by-step instructions.
date: 2017-06-11
tags:
  - dcos
redirect:
  - /s/OoWb4w
---

Gitlab an open source developer tool (like Github) that allows you to host git repositories, review code, track issues, host Docker images and perform continuous integration, and it is very compatible for a small team wit CE version.

DC/OS supports us to run our own private Gitlab to manage source code in house. This article will let you know how to setup Gitlab with HTTPS.

## Installing

You just need to go `Universe` > `Packages` and choose `Gitlab` to install it with `Advanced Installation`. We also may change these settings to have a smoothly Gitlab.

1. Setting up your gitlab domain

![](assets/dcos-series-part-5---gitlab_4a171771af9dd3725d809a02f3cbd80a_md5.webp)

2. Setting up email client

![](assets/dcos-series-part-5---gitlab_0a331d4343f65dc0f3d0a1d28fcd08a6_md5.webp)

3. Set a specific private node IP, so when we need to restart or upgrade new gitlab version, we wont lost data

![](assets/dcos-series-part-5---gitlab_07cb48f22769c4bdb7555e122aa2c24c_md5.webp)

After all, we can do `Review and Install`. If everything is OK, Gitlab service will be like this:

![](assets/dcos-series-part-5---gitlab_1293c7d7f3ddd11d274b6a78461f93a5_md5.webp)

## Setting HTTPS

By default, Gitlab on DC/OS doesn’t supprt `HTTPS`, but we can customize a bit to make it more secure. To do that, we need to do a few things below to enable `HTTPS`, ok let’s do it now:

1. `Edit` service Gitlab and add below setting to env `GITLAB_OMNIBUS_CONFIG` then `Review & Run` it:

```plain_text
nginx['proxy_set_headers'] = {   \"X-Forwarded-Proto\" => \"https\",   \"X-Forwarded-Ssl\" => \"on\"  }
```

2. Copy your `.pem` files to public node which is running `marathon-lb`. For me, I will copy and paste it to`/srv/marathon-lb/domains/example-git-domain.com`

```plain_text
scp cert.pem core@public-ip:~
ssh core@public-ip
sudo mkdir -p /srv/marathon-lb/domains/ssl/example-git-domain.com
sudo mv cert.pem /srv/marathon-lb/domains/ssl/example-git-domain.com
```

3. Config `marathon-lb` service:

- Add new sharing volumes

```plain_text
  {
    "containerPath": "/etc/ssl/domains",
    "hostPath": "/srv/marathon-lb/ssl/domains",
    "mode": "RO"
  }
```

- Add `"/etc/ssl/domains/example-git-domain.com/cert.pem"\`to `args`in `JSON Editor`

![](assets/dcos-series-part-5---gitlab_6d0a8c8c9d3f0ea69d31fd97da4de9b1_md5.webp)

- `Review & Run` marathon-lb again to update new changes

- After updating those settings, you now can go to `your-gitlab-domain.com` to enjoy your result.

If you face anything weird while setting up your Gitlab, you can contact me via `quang@dwarvesf.com.`
