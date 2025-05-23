---
title: null
description: null
date: null
tags:
  - elixir
redirect:
  - /s/3CpynQ
---

chrismccord [10:14 PM] @alanpeabody yes, it's straightforward

1. mix new my_umbrella --umbrella
2. cd my_umbrella/apps
3. mv ~/path/to/phoenix_app ./
4. Update the paths in your phoenix project's mix.exs to match:
   ```elixir
     def project do
   	[app: :my_app,
   	 version: "0.0.1",
   	 build_path: "../../_build",
   	 config_path: "../../config/config.exs",
   	 deps_path: "../../deps",
   	 lockfile: "../../mix.lock",
   	 elixir: "~> 1.2",
   	 elixirc_paths: elixirc_paths(Mix.env),
   	 compilers: [:phoenix, :gettext] ++ Mix.compilers,
   	 build_embedded: Mix.env == :prod,
   	 start_permanent: Mix.env == :prod,
   	 aliases: aliases,
   	 deps: deps]
     end
   ```
5. shipit
6. if using brunch/node, update package.json paths that reference phoenix

david.antaramian [10:16 PM] He described his problem more in `general` which is that he wants to keep his existing git history. Though, that should really just involve inverting what you suggested

[10:18] @david.antaramian @alanpeabody ah yes, you should be able to do it similarly but within the existing repo

---

#### Reference

- https://elixir-lang.slack.com/archives/phoenix/p1472921051000134
