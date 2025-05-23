---
title: null
description: null
date: null
tags:
  - elixir
  - garbage
redirect:
  - /s/Su6zgg
---

BEAM process has its own stack and heap for small data binaries(<64bytes) Larger binaries are stored in a shared memory space with a ref-counted pointer(called ProcBin) that lives in a Process's heap. There are many data stacks and heaps in our application, one per process.

- Generational - minor garbage collection. This method reclaims **heap memory** that is no longer referenced by the process. Idea: most memory is only used for a short period of time. It is **highly performant**, but looks at **recently allocated**

- Full-sweep - major garbage collection. This method looks at the entire heap of a process, and reclaims as **much memory as possible**. Idea: memory must be clean when the heap is close to being full. It is fast in practice, but it can be slow if executing on a process that is actively holding a lot of data

### How to collect data manually

1. From OTP 20 provide a function to reclaims the memory in a process: :erlang.garbage_collect/1. We can use :erlang.garbage_collect/0 to trigger garbage collection for the process that invoked the function
2. Passing the :hibernate_after option for GenServer.start/3 function. The data will be reclaims when the process is idled. Ex: Phoenix Channel use hibernate_after to enter hibernation 15 seconds after processing their last message.
3. Returning :hibernate at the end of the GenServer callbacks

```elixir
def handle_call(:clear, _from, _state) do
    {:reply, :ok, [], :hibernate}
end
```
