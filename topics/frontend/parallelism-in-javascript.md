---
title: Parallelism in JavaScript
description: Parallelism in JavaScript is a technique to improve the performance of web applications by executing multiple tasks simultaneously.
date: 2022-04-04
authors:
  - zlatanpham
github_id: zlatanpham
tags:
  - parallelism
  - concurrency
  - frontend
  - javascript
redirect:
  - /s/Bzn3Cg
---

Most of applications nowadays are created with the aim to be on the web. JavaScript has become a mainstream programming language to support the direction. However, being designed as a single-threaded language doesn't give JavaScript the power to support heavyweight applications as when we talk about image/video processing, online games or even data mining. This naturally creates a demand to support Parallelism in the language.

### Web worker

Web worker is one of the initial attempts that successfully brings the concept of parallelism to browsers. A web worker creates a JavaScript thread performing tasks, without interfering with the user interface.

Web workers run in a different context from the main thread. Because of that, `document` and `window` objects of the main thread are not accessible in web workers. However, it is possible to use XMLHttpRequest, WebSocket or data storage mechanism.

There are two kinds of workers: shared and dedicated. A dedicated worker can be only accessed from the script that initiated it while the state of shared workers can be accessed from multiple scripts.

Communication between the worker thread and the main thread is via a system of messages where both sides send data using the `postMessage()` method, and respond to messages via the `onmessage` even handle. The data is serializable. It means data is copied rather than shared. So, there is a performance bottleneck if the amount of transferred data is huge.

```javascript
# main.js
const myWorker = new Worker('./worker.js');

myWorker.postMessage(1);

myWorker.onmessage = function(event){
	console.log(`Receieved ${event.data} from web worker`)
}
```

```javascript
# worker.js
onmessage = function(event){
	console.log(`${event.data} received from main script`);

	if(event.data === 1){
		postMessage(2);
	}
}
```

### WebCL and other OpenCL based frameworks

Another approach to apply the concurrency model for web applications is [WebCL](https://www.khronos.org/webcl). It is a JavaScript binding to the OpenCL standard that enables web applications to harness GPU and multi-core CPU parallel processing from within a web browser, thus, enabling the possibility to deploy computationally intensive applications. Currently, no browsers natively support WebCL but non-native add-on can be used to embed WebCL in web browsers.

[RiverTrail](https://github.com/IntelLabs/RiverTrail/) is another framework that relies on OpenCL to provide support for data parallel programming in JavaScript. It works by extending JavaScript with new data-parallel constructs that are translated at runtime into a low-level hardware abstract layer.

However, most of OpenCL based frameworks developed during the period are no longer being in active development as no browser vendors have a concrete plan to implement it in their environment at the moment. It seems the attention to boost the performance of the web is bet on different approaches such as [WebAssembly](https://developer.mozilla.org/en-US/docs/WebAssembly) or [WebGPU](https://www.w3.org/TR/webgpu/). So, at the time of writing, Web worker is the only approach to bring parallelism in web applications in production.

#### References

- https://www.khronos.org/registry/webcl/specs/latest/1.0/#3.1
- https://en.wikipedia.org/wiki/WebCL
- https://intellabs.github.io/RiverTrail/
