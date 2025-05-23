---
title: Continuous translation
description: Continuous translation (CT) is a modern approach to translation management that involves synchronizing software development and translation workflows. This means that developers, translators, and product owners work together in a continuous cycle to ensure that all translations are up-to-date and aligned with the latest software developments.
date: 2023-04-11
authors:
  - tienan92it
tags:
  - translation
  - engineering
  - web
redirect:
  - /s/BAJ-yA
---

![](assets/continuous-translation_eaf982ca480d0677ec9d8fd34553b51a_md5.webp)

Continuous translation (CT) is a modern approach to translation management that involves synchronizing software development and translation workflows. This means that developers, translators, and product owners work together in a continuous cycle to ensure that all translations are up-to-date and aligned with the latest software developments.

Unlike traditional translation workflows, Continuous translation eliminates the need for file and space synchronization between different stakeholders, streamlining the translation process and promoting better collaboration. By implementing Continuous translation, companies can achieve faster development cycles, higher-quality translations, and a better user experience for their customers.

## Working with localization

### How localization generally works

![](assets/continuous-translation_0ca3440b9dbd840d349d587dd7fd6a1d_md5.webp)

The classical or typical approach in any software project will have translated data be coupled with the repository (plus its software release) and its access to the data. This data could exist in a database or directly as a file. Changes to the data would be dependent on the coupling of the git repository and the translation management system, which becomes a blocker for translation teams.

### Alternative solutions to localization

In order to reduce the friction between the developing team and the translation team, we can remove data and process coupling between systems of both teams by centralizing the data to allow for continuous translation. In this article we’ll discuss 2 possible solutions to integrate continuous translation into our current system:

- **Solution 1**: implement an ad-hoc solution ourselves with help from Google Sheets (using Google Translator under the hood).
- **Solution 2**: translation as a service - we use a third party service for manage our translations.

### Solution 1: Google Sheets

Google Sheets is a free and easy-to-use tool that allows us to manage translations with all stakeholders. Before deploying the app, developers can use Git actions to fetch the latest version of the Google Sheets and generate the locale translation files.

Here are what the steps to use Google Sheets would look like for managing translations:

**Step 1:** Create a Google Sheet that contains all supported translation items. Here is an example **[template](https://docs.google.com/spreadsheets/d/1jjVDCMAmS6WySmB7L25yNCZX-X3jEwrrqLhqOBzVEs0/edit?usp=sharing)** you can use. **Step 2:** Fetch data from Google Sheets using the following code:

_Make sure to replace the _`***sheetId***`_ and _`***sheetName***`_ with your own values_

```javascript
// Save on './public/spreadsheet.ts' file
const sheetId = "<Sheet-ID>";
const sheetName = "<sheet-name>";
const baseUrl = `https://opensheet.elk.sh/${sheetId}/${sheetName}`;

// Path to store all translation data
const translateDataPath = "./public/locales/translate-data.json";

export const getJsonData = async () => {
  const res = await fetch(baseUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      accept: "*/*",
      authority: "opensheet.elk.sh",
    },
    mode: "cors",
    credentials: "omit",
  });

  if (res.ok) {
    return await res.json();
  }
};

getJsonData().then((data) => {
  const fs = require("fs");
  let myObject = data;

  // Writing to our JSON file
  var newData = JSON.stringify(myObject, null, 2);
  fs.writeFile(translateDataPath, newData, (err) => {
    // Error checking
    if (err) throw err;
    console.log("New data added");
  });
});
```

**Step 3: **After having obtaining the translation data, generate locale files for supported languages using the following code:

```javascript
// Save on './public/manage-translations.ts' file
import path from "path";
import fs from "node:fs/promises";
import fsExtra from "fs-extra";
import _ from "lodash";

import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
dotenv.config();

const validLang = ["en-US", "de-DE", "fr-FR"];
const defaultLanguage =
	process.env.LOCALE == null ? "en-US" : validLang.includes(process.env.LOCALE) ? process.env.LOCALE : "en-US";

const configs = {
	defaultLanguage,
	otherLanguages: validLang.filter((lang) => lang !== defaultLanguage),
	rootExportPath: "./public/locales",
};

const allLocales = [];

async function generateJSONFiles() {
	const data = await fs.readFile("./public/locales/translate-data.json", "utf8");
	const jsonData = JSON.parse(data);
	const locales = Object.keys(jsonData[0]).filter((key) => key !== "elementId");
	const result = locales.map((locale) => {
		const data = {};
		jsonData.forEach((item) => {
			data[item.elementId] =
```

### Solution 2: Use a translation management platform

For this approach, we can use [Locize](https://locize.com/) as our continuous localization management platform. This approach isn’t limited to Locize, but the idea is to have a platform to decouple software release from the translation work and minimize work friction for translation.

![](assets/continuous-translation_5d971ebb8af780ed2ad9e7626daf0d8c_md5.webp)

Locize has integration support for a variety of frontend systems. You can integrate Locize by following steps:

- Follow [https://docs.locize.com/integration/getting-started](https://docs.locize.com/integration/getting-started) to create a Locize account and project.
- After the project is created, we will have `project id` and `api key`.
- Use [https://github.com/locize/locize-cli](https://github.com/locize/locize-cli) to synchronize the existing translations with Locize

There are three ways to use `Locize` in your app:

- **Approach 1**: Use Locize live download on the client-side only. This option involves bundling translations in your app to prevent an elevated amount of downloads on the server-side. Before deploying your app, synchronize your translations with Locize so that they are bundled in your app. This way, your server-side will not generate any downloads to the Locize CDN during runtime, but only on the client-side.
- **Approach 2:** Configure Locize to download translations live on both client (browser) and server (node.js).

> Do not use this option if you have a `serverless environment` as it can generate too many download requests and run up your bill.

- **Approach 3:** Bundle translations with your app. This option involves bundling translations in your app at build time. It's recommended to use this option if you have a small number of translations or if your translations don't change frequently.

### Comparisons between solutions

**Solution 1** recommends using a custom translation file and providing translations for each language in a separate JSON file. The translation file is then loaded on the server side and used to render the content in the appropriate language. This solution is relatively simple and straightforward to implement, but it can become cumbersome to manage as the number of languages and translations grows.

**Solution 2** proposes using a translation management platform, with one example using Locize, which allows for continuous localization management. This solution involves integrating Locize into the application, synchronizing the existing translations with Locize, and then bundling the translations in the application using one of three different possibilities, depending on the specific use case. This solution requires more setup and configuration but can provide a more scalable and streamlined approach to managing translations.

In summary, `Solution 1` is a simpler and cheaper approach to manage translations, while `Solution 2` is a more advanced solution that provides more flexibility and scalability in managing translations.

### Pros and cons when integrating Continuous translation into your app

**Pros**

- **Faster development cycles**: With Continuous translation, developers and translators work together in a continuous cycle, ensuring that translations are updated in real-time as new features are developed. This leads to faster development cycles and quicker time-to-market.
- **Improved translation quality**: Continuous translation promotes better collaboration between developers and translators, which can lead to higher-quality translations that accurately reflect the intended meaning of the original content.
- **Better alignment between teams**: By eliminating file and space synchronization issues, Continuous translation helps to align developers, translators, and product owners more closely, reducing communication errors and promoting better collaboration.
- **Reduced costs**: Traditional translation workflows can be time-consuming and costly. By streamlining the translation process, Continuous translation can help to reduce translation costs and improve return on investment.

**Cons**

- **Requires significant coordination**: Continuous translation requires a high level of coordination between different teams, including developers, translators, and product owners. This can be challenging to manage, particularly for larger projects.
- **Potential for errors**: Continuous translation requires real-time updates to translations, which can increase the risk of errors and miscommunication. This requires careful management and quality control.
- **Requires specialized tools**: Implementing Continuous translation requires specialized tools and technologies, which can add to the overall cost of the project.
- **Not suitable for all projects**: Continuous translation may not be suitable for all projects, particularly those with limited budgets or resources. Traditional translation workflows may be more appropriate for smaller projects or those with less frequent updates.

## Conclusion

Multilingual support is a very important function for web or mobile applications nowadays. Users will come from all over the world and always ask for support for their language. The two options above have different advantages and disadvantages, so you need to consider the exact scope of the product to have the best choice for your team. Both methods can meet the needs of constantly translating products to support new features or new products, but it will cost production as well as quality assurance.
