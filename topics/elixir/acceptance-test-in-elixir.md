---
title: Acceptance test in elixir
description: Learn how to automate End2End acceptance tests in Elixir using Hound and WebDriver to run browser tests efficiently and reduce manual testing time.
date: 2022-07-13
github_id: hieuphq
redirect:
  - /s/ZNCbtw
---

Acceptance tests help ensure that applications we develop are deployed with minimal bugs. Manual acceptance testing is extremely valuable, but it can also be tedious and time-consuming. At DF, we've applied the automation End2End testing for our development process. In End2End test, we can open the web page, navigate on the web like a real user. In elixir project, we can do the same thing with [Hound](https://github.com/HashNuke/hound) and a WebDriver.

The WebDriver is an interface to automate browsers. We can use WebDriver implementation to build an automated test suite against a real browser.

Hound is an Elixir library to write WebDriver. Writing End2End test with Hound is very similar to writing a normal ExUnit test. An advantage to writing automation tests is the same code base.

### Common web drivers

https://github.com/HashNuke/hound/wiki/Starting-a-webdriver-server

[**Selenium**](https://selenium-release.storage.googleapis.com/index.html)

```shell
$ brew install selenium-server-standalone
```

[**ChromeDriver server**](https://chromedriver.chromium.org)

```shell
$ brew install --cask chromedriver
```

Run command:

```shell
$ chromedriver
```

**PhantomJS web driver**

```shell
$ brew cask install phantomjs
```

Run command:

```shell
$ phantomjs --wd
```

### Configure Hound

Add dependency to `mix.exs`:

```elixir
{:hound, "~> 1.0"}
```

Follow the setup step in https://hexdocs.pm/phoenix_ecto/Phoenix.Ecto.SQL.Sandbox.html:

- add the plug to `Endpoint`
- update the config/test.exs to run real server when execute test cases
- add the hound config in config/test.exs. We can update the config for other driver and browser config.

```elixir
config :hound, driver: "chrome_driver", browser: "chrome_headless"
```

- Update `test/test_helper.ex`. We must start :hound application before run the unit test.

```elixir
Application.ensure_all_started(:hound)
```

### Make an unit test

As any unit test we need a module to store the test cases. We implement the `setup` func for Web driver initial `Hound.Helpers` provides the functions to control the browser easier. We can navigate, inspect html element, make the click action via this package. Use `assert` to validate the result

```elixir
defmodule Acceptance.HomePageTest do
    use ExUnit.Case, async: false
    use Hound.Helpers

    setup do
        Hound.start_session()
        :ok
    end

    test "the page loads" do
        navigate_to("http://localhost:4002")
        assert page_title() == "Homepage"
    end
end
```

### Note

Before run test we MUST start the web driver first https://hexdocs.pm/hound/Hound.Helpers.Navigation.html
