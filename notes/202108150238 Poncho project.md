---
title: null
description: null
date: null
tags:
  - elixir
redirect:
  - /s/adY25w
---

What we have found is that, since you have to do the `mix firmware` step from the “firmware” application directory anyway, it’s less surprising to have a separate, non-umbrella project for building firmware. This application can use a `path: "../your_business_logic"` dependency to achieve the same result as the `in_umbrella: true` convenience if you keep them side-by-side. We call it a “poncho project” because it protects you from things leaking in from the sides rather than from above.

---

- The difference is that an umbrella is a single mix project, which combines multiple nested “mix projects” into one – starting any of them by default,
- while poncho’s approach is developing each application in it’s own mix project and using simple `{:dep, path: "…"}` dependencies between each other, where there’s one “root” application, which depends on all the sub applications.

---

In elixir you basically have two kinds of “structure”. Structure of code – which should be handled by modules and folders in your source code – and structure of runtime concerns, like dependencies or being able to run parts of your application independently from others – which is what drives how you set up supervision trees or multiple otp applications.

What’s often criticized with umbrellas is using the latter solution (otp applications) for the first reasoning. Don’t just put code in multiple otp applications if those parts of code are not meant to be run in isolation. A single otp application is just fine for that.

On the other hand if you intend to split up your application at runtime e.g. over multiple nodes then go for properly devided otp applications.

As for poncho vs. umbrella. Poncho style project setups are way more explicit especially when it comes to configuration. With umbrellas people often seem to have problems with the fact that config (just like dependencies) are set for the whole umbrella. With elixir 1.9 this is even enforced by the generators, which no longer generate application level config in umbrellas. For the nerves people where configuration is even more complex because of target machine differences the solution was to just not use umbrellas. Personally I feel like both are usable and you need to find what style of thinking about/working with your application suits you more. Either “one piece at a time” (poncho) or “the whole as the sum of all parts” (umbrella).

https://elixirforum.com/t/project-structure-umbrella-or-poncho-approaches/23984

---

The main reasons that we came up with the Poncho style is that in Nerves, some of the magic that the Umbrella organization gives you just doesn't really work, because if you build something from the wrong place, then it builds it in the wrong order and then you don't end up getting a firmware. The whole Poncho application organization structure was really designed to fix that problem specific to Nerves.

Then I think, other people realized that actually, Umbrella applications are just some fancy sugar that you could have designed yourself. That's where I think people outside the Nerves community are, like, “Actually, maybe Poncho projects make sense, because I can do exactly the same thing and be in control of it when I build it as a Poncho application, instead of Umbrella.”

I think that's basically the same thing that a Poncho project is. **What makes it an Umbrella is really just the config.exs structure auto includes everything, like using a file system glob**. That's basically what gives you an Umbrella application. Then there's some fancy aliasing and stuff that happens. Basically, I think the Umbrella structure was invented as a convenience, but it isn't actually necessary. I think that's where I usually steer people away from using it. Is, you can build exactly the same thing and when you're done, you'll understand it. Or you can just use the Umbrella thing that's already there if you want to and either one's fine.

---

### Add project as dependency

#### Using a poncho project structure

First, we generate the two new Mix projects in a containing directory:

```shell
mkdir my_app && cd my_app
mix nerves.new my_app_firmware
mix phx.new my_app_ui --no-ecto --no-webpack
```

Now, we add the Phoenix-based `my_app_ui` project to the `my_app_firmware` project as a dependency, because we want to use the `my_app_firmware` project as a deployment wrapper around the `my_app_ui` project.

```elixir
# my_app_firmware/mix.exs

# ...
  defp deps do
    [
      # Dependencies for all targets
      {:my_app_ui, path: "../my_app_ui"}, // !!!!
      {:nerves, "~> 1.4", runtime: false},
      # ...
    ]
  end
# ...
```

If we're using the poncho project structure, we can skip ahead to the section where we [configure networking](https://hexdocs.pm/nerves/user-interfaces.html#configure-networking).

---

#### Using an umbrella project structure

If we would rather use the umbrella project structure instead, we can do so as follows:

```shell
mix new my_app --umbrella
cd my_app/apps
mix nerves.new my_app_firmware
mix phx.new my_app_ui --no-ecto --no-webpack
```

Then, we add the Phoenix `my_app_ui` project to the `my_app_firmware` project as a dependency using the `in_umbrella` option instead of the `path` option:

```elixir
# apps/my_app_firmware/mix.exs

# ...
  defp deps do
    [
      # Dependencies for all targets
      {:my_app_ui, in_umbrella: true}, // !!!!
      {:nerves, "~> 1.4", runtime: false},
      # ...
    ]
  end
# ...
```

##### Specifying configuration order

By default when you use the umbrella project style, the top-level configuration loads the sub-project configurations in lexicographic order:

```elixir
# my_app/config/config.exs

use Mix.Config

import_config "../apps/*/config/config.exs"
```

This can cause problems, depending on the names of your sub-projects, because it is likely that we will want to override certain device-specific settings in the `my_app_firmware` config. We can solve this by specifying the order in which the config files get imported:

```elixir
# my_app/config/config.exs

use Mix.Config

import_config "../apps/my_app_ui/config/config.exs"
import_config "../apps/my_app_firmware/config/config.exs"
```

---

### Configure phoenix

In order to deploy the `my_app_ui` Phoenix-based project along with the Nerves-based `my_app_firmware` project, we need to configure our Phoenix `Endpoint` using appropriate settings for deployment on an embedded device.

If we're using a poncho project structure, we'll need to keep in mind that the `my_app_ui` configuration won't be applied automatically, so we should either `import` it from there or duplicate the required configuration.

Assuming that we're using the poncho project structure, our configuration might look like this:

```elixir
# my_app_firmware/config/config.exs

use Mix.Config

# When we deploy to a device, we use the "prod" configuration:
import_config "../../my_app_ui/config/config.exs"
import_config "../../my_app_ui/config/prod.exs"

config :my_app_ui, MyAppUiWeb.Endpoint,
  # Nerves root filesystem is read-only, so disable the code reloader
  code_reloader: false,
  http: [port: 80],
  # Use compile-time Mix config instead of runtime environment variables
  load_from_system_env: false,
  # Start the server since we're running in a release instead of through `mix`
  server: true,
  url: [host: "nerves.local", port: 80]
```

---

Source

- https://embedded-elixir.com/post/2017-05-19-poncho-projects/
- https://hexdocs.pm/nerves/user-interfaces.html
