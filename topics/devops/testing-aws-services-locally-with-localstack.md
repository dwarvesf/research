---
title: Testing aws services locally with localstack
description: LocalStack lets developers locally test and develop AWS services like S3, Lambda, and DynamoDB without AWS costs, speeding up cloud application development with a simple, cost-free environment.
date: 2023-03-17
github_id: nguyend-nam
icy: 10
redirect:
  - /s/nwellA
---

**Amazon Web Services** (AWS) provides a wide range of cloud computing services that can be used to build and deploy applications at scale. However, using AWS can be costly, especially for small-scale projects or for developers who are just starting out. That's where [LocalStack](https://localstack.cloud/) comes in. LocalStack is an open-source tool that enables **local development** and **testing** of cloud applications by emulating various AWS services on a developer's local side. It can be used to test and develop applications **without** incurring the cost and complexity of using live AWS environment.

## Terminologies

**AWS** is a flexible, scalable, and cost-effective cloud computing platform that offers a wide range of services to help individuals, startups, and enterprises build and manage their applications and infrastructure.

> Learn more about [AWS](https://aws.amazon.com/).

**LocalStack** supports many AWS services, including S3, Kinesis, and DynamoDB, etc., and provides a simple API for interacting with them. It is available for use in many programming languages or customize the environment. With LocalStack, you can test and develop your applications without incurring any costs, making it an ideal solution for developers who want to learn and experiment with AWS services without committing to a full-scale deployment.

> Download Python and follow [LocalStack's documentation](https://docs.localstack.cloud/getting-started/installation/) to complete installation, registration and add LocalStack's API key to the environment.

## Example

AWS **S3** (Simple Storage Service) is designed to store and retrieve large amounts of data, including structured and unstructured data, in buckets, which are logical containers for objects (files) that can be accessed using the S3 API, SDKs, or the AWS Management Console.

In this brainery post, let's take an example of LocalStack AWS S3 to demonstrate how we can test an AWS service locally without needing to connect to a live AWS environment.

```bash
pip3 install awscli-local
```

Firstly, run the command above to be able to use the **`awslocal`** command. Detailed information can be found at [LocalStack AWS CLI (awslocal)](https://docs.localstack.cloud/user-guide/integrations/aws-cli/#localstack-aws-cli-awslocal).

Then start docker and LocalStack, run the command below to **create a bucket** named `sample-bucket`:

```bash
awslocal s3api create-bucket --bucket sample-bucket
```

```bash
{
    "Location": "/sample-bucket"
}
```

To **view the buckets list**, run:

```bash
awslocal s3api list-buckets
```

```bash
{
    "Buckets": [
        {
            "Name": "sample-bucket",
            "CreationDate": "2023-03-15T04:32:52+00:00"
        }
    ],
    "Owner": {
        "DisplayName": "webfile",
        "ID": "bcaf1ffd86f41161ca5fb16fd081034f"
    }
}
```

Next, let's **store** an html file to the bucket we just created. Create an `index.html` with some random content at the current location and run:

```bash
awslocal s3api put-object --bucket sample-bucket --key index.html --body index.html
```

```bash
{
    "ETag": "\"d73997cf9bba06462b3ebe94c3743b2e\""
}
```

```bash
awslocal s3api get-object --bucket sample-bucket --key index.html output.txt
```

```bash
{
    "AcceptRanges": "bytes",
    "LastModified": "2023-03-15T07:00:36+00:00",
    "ContentLength": 266,
    "ETag": "\"d73997cf9bba06462b3ebe94c3743b2e\"",
    "VersionId": "null",
    "ContentLanguage": "en-US",
    "ContentType": "binary/octet-stream",
    "Metadata": {}
}
```

The command above is used for exporting the content of the file we just stored to an `output.txt` file.

You can also test other operations on an AWS S3 bucket locally with LocalStack. Let say you want to **set up replication** to objects from one S3 bucket to another for backup and recovery purposes, then you need to run the command:

```bash
awslocal s3api put-bucket-replication --bucket sample-bucket --replication-configuration '{"Role": "arn:aws:iam::123456789012:role/replication-role","Rules": [{"Status": "Enabled","Priority": 1,"DeleteMarkerReplication": {"Status": "Disabled"},"Destination": {"Bucket": "arn:aws:s3:::sample-replica-bucket","AccessControlTranslation": {"Owner": "Destination"}}}]}'
```

Note that you'll need to provide real values for `Role` and `Bucket` when working with AWS S3, right here we just need dummy values to test with LocalStack. To **view the replication**, run:

```bash
awslocal s3api get-bucket-replication --bucket sample-bucket
```

```bash
{
    "ReplicationConfiguration": {
        "Role": "arn:aws:iam::123456789012:role/replication-role",
        "Rules": [
            {
                "Priority": 1,
                "Status": "Enabled",
                "Destination": {
                    "Bucket": "arn:aws:s3:::sample-replica-bucket",
                    "AccessControlTranslation": {
                        "Owner": "Destination"
                    }
                },
                "DeleteMarkerReplication": {
                    "Status": "Disabled"
                }
            }
        ]
    }
}
```

## Other services

Some of the emulation services for other AWS APIs that LocalStack supports:

- [Elastic compute cloud (EC2)](https://docs.localstack.cloud/user-guide/aws/elastic-compute-cloud/)

- [CloudFront](https://docs.localstack.cloud/user-guide/aws/cloudfront/)

- [Lambda](https://docs.localstack.cloud/user-guide/aws/lambda/)

- [Kinesis](https://docs.localstack.cloud/user-guide/aws/kinesis/)

- [DynamoDB](https://docs.localstack.cloud/user-guide/aws/dynamodb/)

> See the [Service Feature Coverage](https://docs.localstack.cloud/user-guide/aws/feature-coverage/) on LocalStack's documentation for further information of the AWS APIs that LocalStack has covered.

## Benefits

There are several advantages of using LocalStack over the original AWS solutions:

1.  Cost-saving: LocalStack is free to use and doesn't incur any AWS usage costs.

2.  Faster development: Since LocalStack is a local development environment, we don't need to deploy code to a remote environment for testing, hence save time and increase development speed.

3.  Better control: LocalStack provides developers with greater control over their testing environment. Developers can create custom test scenarios and modify the environment as needed, without affecting any live AWS environments.

4.  Improved accuracy: LocalStack's local environment allows developers to test their code more accurately, as they can simulate real-world scenarios without the risk of impacting live data or users.

## Reference

- https://docs.localstack.cloud/user-guide/aws/s3/
- https://aws.amazon.com/s3/?nc2=h_ql_prod_st_s3
