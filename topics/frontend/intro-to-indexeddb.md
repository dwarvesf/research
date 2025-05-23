---
title: Intro to IndexedDB
description: IndexedDB is a low-level API for client-side storage like localStorage and cookies. But this built-in non-relational database is much more powerful than those 2 counterparts.
date: 2022-10-13
authors:
  - nguyend-nam
github_id: nguyend-nam
tags:
  - storage
  - client-side
  - frontend
redirect:
  - /s/oO3e9w
---

## Overview & when to use IndexedDB

**IndexedDB** is a low-level API for client-side storage like [_localStorage_](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) and [_cookies_](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies). But this built-in **non-relational database** is much more powerful than those 2 counterparts.

If you want to build a traditional client-server app with a moderate amount of data needed to store in the client side (browser), simply use localStorage or cookies for their ease of implementation and usage. IndexedDB is intended for **offline** apps, when you want to store and retrieve some data even without connection to the Internet. An example might be a to-do list or saved games that are played locally. In this case, the user data is in local side, and the web site is just the vehicle for delivering it.

Beside that, IndexedDB has some important characteristics and much more powerful supplementations:

- Stores almost any kind of key-value pairs, including **complex objects**
- It is mostly **asynchronous**
- Can store **significant volumes** of structured data, much bigger than localStorage
- Supports **transactions** for reliability
- Does not use Structured Query Language (SQL)

Like most web storage solutions, IndexedDB follows a [same-origin policy](https://www.w3.org/Security/wiki/Same_Origin_Policy) i.e. while you can access stored data within a domain, you cannot access data across different domains.

## Important terminologies

### Database

Database in IndexedDB contains the object stores, which in turn contain the data you would like to persist. You can create multiple databases with the following must-have information:

- Name: identifies the database and must stay constant
- Current version: with default value of 1

```javascript
const openRequest = indexedDB.open('shelf' /* name */, 1 /* version */)
...
openRequest.onsuccess = () => {
	const db = openRequest.result
	...
}
```

> [Read more](https://developer.mozilla.org/en-US/docs/Web/API/IDBDatabase) about methods, attributes and how to use **IDBDatabase**.

### Object store

Object store is an individual bucket to store data. It is the **core concept** of IndexedDB. You can think of object stores as being similar to tables in traditional relational databases. A database may have multiple stores and each of them must have a name that is **unique** within its database.

```javascript
db.createObjectStore("books" /* name */, { keyPath: "id" });
```

> [Read more](https://developer.mozilla.org/en-US/docs/Web/API/IDBObjectStore) about **IDBObjectStore**, an interface of IndexDB API that represents object stores.

### Transaction

An atomic set of _data-access_ and _data-modification_ operations on a particular database, they should either **all succeed** or **all fail**. It is how you interact with the data in a database. **Any reading or changing of data in the database must happen in a transaction**.

A database connection can have several active transactions associated with it at a time, so long as the writing transactions do not have overlapping scopes. The scope of transactions gives us information of during the transaction, which object stores are involved (and are expected to be modified) and which of them remain.

```javascript
const trans = db.transaction("books" /* store */, "readwrite" /* type */)

// start operating on this store
const objStore = trans.objectStore("books")

const book = {
	id: 'Remote - Office not required',
	price: 10,
}

const request = objStore.add(book /* value */) // operations must happen in a transaction

request.onsuccess = () => {
	...
}
```

> [Read more](https://developer.mozilla.org/en-US/docs/Web/API/IDBTransaction) about **IDBTransaction**, an interface of the IndexedDB API that provides a static, asynchronous transaction on a database.

### Index

An **index** is a specialized object store for looking up records in another object store (often called the *referenced object store*). The **index** is a key-value storage where all its values are the keys of the referenced object store. Hence all its records are automatically populated when a new record is inserted, updated or deleted.

> [Read more](https://developer.mozilla.org/en-US/docs/Web/API/IDBIndex) about **IDBIndex** interface of the IndexedDB API.

**Searching by a field using an index**:

```javascript
...
openRequest.onupgradeneeded = () => {
	const books = db.createObjectStore('books', {keyPath: 'id'})
	const index = books.createIndex('price_idx', 'price')
}
```

Search the `books` object store by `price` key

### Cursor

With a huge object store, bigger than the available memory, `getAll` might fail to get all records as an array. Cursors provide the means to work around that.

**A cursor is a special object that traverses the object storage using a given query, and returns one key/value at a time, thus saving memory**.

```javascript
const request = store.openCursor("id" /* query */, [
  "next" /* or 'prev', 'nextunique'... */,
]);

// to get keys only, you can use 'openKeyCursor' instead of 'openCursor'
```

> [Read more](https://developer.mozilla.org/en-US/docs/Web/API/IDBCursor) about **IDBCursor**, an interface of IndexedDB API that represents a cursor.

## Limitation

IndexedDB is designed to cover most cases that need client-side storage. However, it is not designed for a few cases like the following:

- Not all languages sort strings in the same way, so internationalized sorting is not supported
- The API is not designed for synchronizing with a server-side database
- It does not have an equivalent of the `LIKE` operator in SQL for full text searching

Moreover, errors that are **out of developers' control** can happen for a variety of reasons. For example, some browsers like **Firefox** or **Edge** currently don't allow writing to IndexedDB when in private browsing mode. There's also the possibility that a user is on a device that's almost out of disk space, and the browser might not allow storing anything else at all.

Using IndexedDB is also likely to require **a lot more coding** than localStorage or cookies. But if the values you’re storing are complex JavaScript objects that would be difficult to serialize, or if you need a transactional model, then it may be worthwhile.

> Detailed information about Limitations of IndexedDB from MDN site [[here](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Basic_Terminology#limitations)]

## Reference

- https://javascript.info/indexeddb
- https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Using_IndexedDB
- https://www.javascripttutorial.net/web-apis/javascript-indexeddb/
- https://web.dev/indexeddb/
