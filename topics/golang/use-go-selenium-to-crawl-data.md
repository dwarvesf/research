---
title: Use Go selenium to crawl data
description: "Learn how to use Go with Selenium to crawl dynamic web pages, overcoming challenges like AJAX-loaded content and login requirements. This guide demonstrates setting up Selenium, writing Go code to interact with web elements, and extracting data from Amazon's deal page."
date: 2016-06-02
authors:
  - huynguyenh
tags:
  - golang
  - software
redirect:
  - /s/n0Bfmw
---

![](assets/use-go-selenium-to-crawl-data_f963144e3cfac24481dbfeb02cf6a0e6_md5.webp)

## Crawl data

Crawl is a widespread issue occurring in making software. News, discount news, film ticket, etc are some examples of crawl. To be simple, it is analytics HTML, read cards, and extract data. The Go library I usually use is [goquery](https://github.com/PuerkitoBio/goquery).

However, crawling an original HTML will not work in some cases: data loaded by ajax (when reading HTML, we will only see wrapper, not data), or must login when entering a page need crawl.

In this article, take crawling [Amazon deal](https://www.amazon.com/gp/goldbox/all-deals/ref=gbps_ftr_s-3_3022_wht_541966?ie=UTF8&*Version*=1&*entries*=0&gb_f_GB-SUPPLE=sortOrder%3ABY_SCORE%2CenforcedCategories%3A3760911%2C2335752011%2C541966&pf_rd_p=2292853022&pf_rd_s=slot-3&pf_rd_t=701&pf_rd_i=gb_all&pf_rd_m=ATVPDKIKX0DER&pf_rd_r=14CQSB5TF4GTC2RNHDAG) into consideration. In this page, javascript will call ajax taking data and then pour it into DOM. When using goquery read HTML, we will not see div cards like inspecting elements.

To these types, I use selenium to run the web in a real browser, take action to have fully loaded HTML before extracting data.

Selenium running in JVM is quite famous in automation test. It allows me to run script test in a real browser. My method will be: Use selenium to run the Amazon page, wait for javascript to load, and then crawl the data normally.

## How to setup

Firstly, you go to [seleniumhq](https://selenium.dev/downloads/) link to download and set up seleniumhq. Selenium plays a role like a server, receiving requests sent from my code Go.

To run it, we go to the folder containing file jar and run the command:

```plain_text
java -jar selenium-server-standalone-2.50.1.jar -port 8081
```

![](assets/use-go-selenium-to-crawl-data_79536b2784ffffd405fdcbd54b56927f_md5.webp)

\=> We have server selenium running at port 8081. Next, you pull Go-selenium in by Go get:

```javascript
go get sourcegraph.com/github.com/sourcegraph/go-selenium
```

After that, we need to set up a browser. I choose Firefox. Remember, when running locally, we only need to set up Firefox on the web. In contrast, running on the host we need to set up Firefox by Shell script. You can refer to [how to set up Selenium on Ubuntu 14.04](https://gist.github.com/curtismcmullan/7be1a8c1c841a9d8db2c) Done! Now let’s code.

We need:

- Remote to server selenium
- Access to Amazon deal link
- Conduct analytics HTLM to get information. I will print page title and the image of the first product

```javascript
func main() {
    var webDriver selenium.WebDriver
    var err error
    // set browser as firefox
    caps := selenium.Capabilities(map[string]interface{}{"browserName": "firefox"})
    // remote to selenium server
    if webDriver, err = selenium.NewRemote(caps, "http://localhost:8081/wd/hub"); err != nil {
        fmt.Printf("Failed to open session: %s\n", err)
        return
    }
    defer webDriver.Quit()

    err = webDriver.Get(URL_AMAZON_DEAL)
    if err != nil {
        fmt.Printf("Failed to load page: %s\n", err)
        return
    }
    // sleep for a while for fully loaded javascript
    time.Sleep(4 * time.Second)
    // get title
    if title, err := webDriver.Title(); err == nil {
        fmt.Printf("Page title: %s\n", title)
    } else {
        fmt.Printf("Failed to get page title: %s", err)
        return
    }

    var elem selenium.WebElement
    elem, err = webDriver.FindElement(selenium.ByCSSSelector, "#widgetContent")
    if err != nil {
        fmt.Printf("Failed to find element: %s\n", err)
        return
    }

    var firstElem selenium.WebElement
    firstElem, err = elem.FindElement(selenium.ByCSSSelector, ".a-section .dealContainer")
    if err != nil {
        fmt.Printf("Failed to find element: %s\n", err)
        return
    }
    // get image
    image, err := firstElem.FindElement(selenium.ByCSSSelector, "img")
    if err == nil {
        img, _ := image.GetAttribute("src")
        fmt.Println(img)
    }
}
```

Run the code, we have

```javascript
Page title: Gold Box Deals | Today's Deals - Amazon.com
https://images-na.ssl-images-amazon.com/images/I/51eU5JrGAXL.\_AA210\_.jpg
```

Well, we got all the needed information.

## Conclusion

Above is my knowledge when having problems with crawl in developing software. Here is Go software programming language. Selenium also helps us in other cases, like pages need login, web pages request captcha, etc. If anyone has other experiences, I hope to hear from you.
