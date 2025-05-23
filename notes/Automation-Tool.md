---
title: null
description: null
date: null
tags:
  - tool
redirect:
  - /s/F5Ca_A
---

The new Automation Tool comes from M$, wrote the first public version early last year

### In comparison with Puppeteer

- API methods are quite similar
- Puppeteer only supports chrome, Playwright supports both webkit and firefox
- Playwright's API is somewhat easier to use (eg: page.click will automatically wait for the element to be available and visible)
- Newer feature of Playwright is to allow simulate multiple devices on 1 browser:

```js
const { chromium, devices } = require("playwright");

(async () => {
  const browser = await chromium.launch();

  for (const deviceName of ["iPhone 11", "iPad Pro 11"]) {
    const context = await browser.newContext({
      ...devices[deviceName],
    });
    const page = await context.newPage();
    await page.goto("http://github.com");
    await page.screenshot({
      path: `github-${deviceName.replace(/ /g, "-")}.png`,
    });
  }

  await browser.close();
})();
```

An interesting point: The top contributor of Puppeteer has now become the top contributor of Playwright /graphs/contributors

---

#### Reference

- [GitHub - microsoft/playwright: Node.js library to automate Chromium](https://github.com/microsoft/playwright)
- [Contributors to puppeteer/puppeteer](https://github.com/puppeteer/puppeteer/graphs/contributors)
- [Contributors to microsoft/playwright](https://github.com/microsoft/playwright/graphs/contributors)
