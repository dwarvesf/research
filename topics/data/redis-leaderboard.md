---
title: Redis leaderboard
description: Learn how to build a fast user leaderboard system using Redis sorted sets and hashes to track scores and store user profiles like usernames and avatars.
date: 2023-08-08
github_id: Tuanpm31
icy: 10
redirect:
  - /s/IUTHBg
---

In this post, we're going to explore how to implement a user leaderboard system using Redis. The leaderboard will keep track of user scores and profile information such as username and avatar.

## Introduction

Redis is a powerful in-memory data structure store that is used as a database, cache, and message broker. We'll be leveraging two particular data types in Redis: **sorted sets** and **hashes**.

- **Sorted sets**: In Redis, a sorted set is a data type that has a set of unique elements where each element is associated with a score. It provides us with an efficient way to maintain a list of elements based on their scores, which is perfect for a leaderboard system.

- **Hashes**: Redis hashes are the perfect data structure to store object-like items. We'll use hashes to store user's information like username, avatar type, etc.

## Let's get started

First, ensure you have Redis installed and running on your system.

### Storing and retrieving user scores

We use the `ZADD` command to add users to the sorted set. The command takes the sorted set name, the score, and the user's ID. For example, to add a user with the ID 'user1' and a score of 150, we can use:

```bash
ZADD leaderboard 150 user1
```

To retrieve the scores in descending order (highest score first), we can use the `ZREVRANGE` command with the `WITHSCORES` option:

```
ZREVRANGE leaderboard 0 -1 WITHSCORES
```

### Conditionally updating scores

In many cases, we want to update a user's score only if the new score is higher than the existing one. Redis allows us to do this easily with the `ZADD` command by adding the `XX GT` option:

```
ZADD leaderboard XX GT 200 user1
```

This command will update 'user1's score to 200 only if 200 is greater than their current score.

### Storing and retrieving user information

We can use the `HSET` command to store user information. For example, to set the username and avatar type for 'user1':

```
HSET user:user1 username "John Doe" avatar "TypeA"
```

To retrieve this information, we can use the `HGETALL` command:

```
HGETALL user:user1
```

## Tying it all together

Before we look at the specific commands to update both the sorted set and hash when a user achieves a new score, let's visualize the whole flow with the diagram below:

![](assets/redis-leaderboard_flow_diagram.webp)

This diagram depicts the flow as follows:

- The user achieves a new score and sends it to the application.
- The application updates the user's info in the Redis hash.
- The application also updates the score in the Redis Sorted Set (the leaderboard).
- The Redis hash and sorted set return the updated user info and leaderboard to the application.
- The application displays the updated leaderboard to the user.

Now that we know how to store and retrieve user scores and profile information, we can tie it all together.

When a user achieves a new score, we can update both the sorted set and the hash:

```
ZADD leaderboard XX GT 200 user1
HSET user:user1 username "John Doe" avatar "TypeB"
```

To display the leaderboard, we first retrieve the user IDs and scores:

```
ZREVRANGE leaderboard 0 -1 WITHSCORES
```

For each user ID, we then retrieve the user information:

```
HGETALL user:user1
```

## Conclusion

That's it! We've created a simple but effective leaderboard system using Redis' sorted sets and hashes. Redis is a powerful tool for such use cases due to its speed and efficient data structures.

## Reference

- https://redis.io/docs/data-types/sorted-sets/
- https://redis.io/docs/data-types/hashes/
