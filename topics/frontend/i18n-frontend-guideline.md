---
title: I18n frontend guideline
description: Learn how to implement multi-language support with locale detection, internationalized routing, RTL/LTR text handling, and i18next formatting in React.js and Next.js front-end applications.
date: 2023-04-03
tags:
  - performance
  - engineering
  - frontend
  - web
redirect:
  - /s/GBCHYg
---

![](assets/i18n-frontend-guideline_0d5e0a2c5a795b96f65caa5b7a360578_md5.webp)

In a front-end web application, locales are used to determine the language and geographic location of the user and to display the appropriate content to them.

When a user visits a web page, the application will first detect their locale, then use this information to determine which version of the content to display.

To support multiple languages and locales, the application needs to have the necessary content available for each locale. This can be achieved by creating separate files or resources for each locale or by using a localization library like `**i18next**` that allows for dynamic localization based on the user's detected locale.

In this frontend guideline, we will discuss general principles and provide examples using `i18next` with `React.js`

## Locale detection

There are several ways to detect the user's locale (i.e., their language and geographic location) in a front-end application:

- **Browser settings**: The user's browser settings may indicate their preferred language. This information can be accessed through the `navigator.language` or `navigator.userLanguage` property in JavaScript.
- **IP geolocation**: The user's IP address can be used to determine their geographic location. This can be done by making a request to a geolocation service, such as MaxMind or IP-API, which returns the user's location based on their IP address.
- **Server-side detection**: An HTTP header that relays these language preferences to the server with each request. This is the `Accept-Language` header, and it often looks something like this: `Accept-Language: en-CA,ar-EG;q=0.5`.
- **Use of cookies or web storage**: The user's locale preference can be stored in a cookie or HTML5 web storage when the user first interacts with the application. The locale would then be read from this location for all subsequent requests.

There are a few libraries where that offer locale detection based on the settings listed above. For instance, In React.js, there is the `i18next-browser-languageDetector` library that detects language based on:

- Cookie
- LocalStorage
- Navigator
- Query(`?lng=LANGUAGE`)
- HtmlTag
- Path
- Subdomain.

Another example would be Next.js, where the locale will be automatically detected based on the `Accept-Language` header and the current domain. Locale detection is enabled by default.

## Internationalized routing

Internationalized routing is a way to handle different URLs for the same page based on the user's detected locale. There are two types of URL routing:

- **Sub-path routing** (e.g. example.com/en/home, example.com/fr/home)
- **Domain routing** (e.g. example.en, example.fr)

For example in React.js, the routing process can be implemented like this

![](assets/i18n-frontend-guideline_9354a1ef08eeec42a93ec4329cf358c4_md5.webp)

With Next.js, there is built-in support for internationalized routing since `v10.0.0`

```javascript
// next.config.js
module.exports = {
  i18n: {
    locales: ["en-US", "fr", "nl-NL", "nl-BE"],
    defaultLocale: "en-US",
    domains: [
      {
        // Note: subdomains must be included in the domain value to be matched
        // e.g. www.example.com should be used if that is the expected hostname
        domain: "example.com",
        defaultLocale: "en-US",
      },
      {
        domain: "example.fr",
        defaultLocale: "fr",
      },
      {
        domain: "example.nl",
        defaultLocale: "nl-NL",
        // specify other locales that should be redirected to this domain
        locales: ["nl-BE"],
      },
    ],
  },
};
```

## Supports LTR and RTL text

For some languages, such as Arabic, the letters are arranged from right to left. To ensure that your application supports Right-To-Left (**RTL**) layout rendering for such languages, you need to add **LTR** or **RTL** support.

To add **LTR** or **RTL** support to the application, we will set the `dir` attribute on the `body` element dynamically in the `index.html` file.

You can also set the `dir` attribute on global components such as `Header` and `Footer`.

Here's an example of setting the `dir` attribute dynamically in the `App` component:

```javascript
import React from "react";
import { useTranslation } from "react-i18next";
import "./App.css";

function App() {
  const { t, i18n } = useTranslation();
  document.body.dir = i18n.dir(); // return ltr or rtl of current language
  return <div className="App">{t("welcome")}</div>;
}

export default App;
```

Here's an example of setting the `**dir**` attribute on a global `**Header**` component:

```javascript
import { useEffect } from 'react';
import { useTranslation } from 'next-i18next';

const Header = () => {
  const { t, i18n } = useTranslation('common');
  const localeDir = i18n.dir(); // return ltr or rtl of current language

  useEffect(() => {
    document.querySelector('html')?.setAttribute('dir', localeDir);
  }, [localeDir]);

  return (
    <header>
    {...}
    </header>
  );
};

export default Header;
```

## Formatting

Starting from **i18next version 21.3.0**, you can take advantage of the built-in formatting functions based on the **[Intl API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl)** for the following formats:

- **Number**
- **Currency**
- **DateTime**
- **RelativeTime**
- **List**

With these built-in formatting functions, you can easily format and localize various types of data in your application to match the user's preferred language and regional settings, improving the overall user experience of your application.

Here's an example of how you can use them:

```javascript
// Translation JSON
{
  "number": "Number: {{val, number}}",
  "currency": "Currency: {{val, currency(USD)}}",
  "dateTime": "Date/Time: {{val, datetime}}",
  "relativeTime": "Relative Time: {{val, relativetime}}",
  "list": "List: {{val, list}}",
  "weekdays": [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday"
  ]
}

// Number
i18next.t('number', { val: 1000 }); // --> Number: 1,000
i18next.t('number', { val: 1000.1, formatParams: { val: { minimumFractionDigits: 3 } } }); // --> Number: 1,000.100

// Currency
i18next.t('currency', { val: 2000 }); // --> Currency: $2,000.00
i18next.t('currency', {
  val: 2000.12,
  currency: 'CAD',
  locale: 'fr-CA'
}); // --> Currency: 2 000,12 $ CA

// DateTime
i18next.t('dateTime', { val: new Date(Date.UTC(2012, 11, 20, 3, 0, 0)) }); // --> Date/Time: 12/20/2012
i18next.t('dateTime', {
  val: new Date(Date.UTC(2012, 11, 20, 3, 0, 0)),
  formatParams: {
    val: { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' },
  },
}); // --> Date/Time: Thursday, December 20, 2012

// RelativeTime
i18next.t('relativeTime', { val: 3 }); // --> Relative Time: in 3 days

// List
i18next.t('list', {
  val: i18next.t('weekdays', { returnObjects: true }),
}); // --> List: Monday, Tuesday, Wednesday, Thursday, and Friday
```

## Conclusion

Multilingual is a very important function for web or mobile applications nowadays, Users will come from all over the world and always ask for support for their language. Above is a guide to help you install multi-language for your application or website, You can implement it according to the instructions to automatically find the user's language, setup multi-language by domain or subpath, support LTR and RTL text, and finally format of number, currency, time, list…

If you have a difficult problem that you would like us to help you on, please feel free to submit a challenge request here.

**Come be with us**
We’d love to have you in our next chapter, by all means.

- Discover what we do: [dwarves.foundation](http://dwarves.foundation/)
- Meet our team: [discord.gg/dfoundation](http://discord.gg/dfoundation)
- Join the squad: [careers.d.foundation](http://careers.d.foundation/)

Follow our journey

- Fanpage: [facebook.com/dwarvesf](http://facebook.com/dwarvesf)
- LinkedIn: [linkedin.com/company/dwarvesf](http://linkedin.com/company/dwarvesf)
- Substack: [https://memo.d.foundation/](https://memo.d.foundation/)
