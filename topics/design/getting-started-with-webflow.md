---
title: Getting started with Webflow
description: Learn how to design responsive, high-quality websites quickly with Webflow’s no-code platform, featuring visual design tools, CMS, hosting, and easy animations for faster web development.
date: 2021-01-23
tags:
  - nocode
redirect:
  - /s/taiTSw
---

![](assets/getting-started-with-webflow_5386df53f5360ba922dbe2c4b467dfdb_md5.webp)

No-code platform has becoming a thing recently. With convenient and user-friendly workflow, no-code platform is a must to pick up for design and operation process, to shorten the development time and remove the misunderstanding between them with developers.

## What is Webflow

In short, Webflow is a web design tool, CMS, and hosting platform. Each aspect of the platform is represented by a particular product/feature set:

### The designer

A visual web design tool firmly grounded in web standards and best practices, the Designer translates design decisions into clean, production-ready code. Webflow was built to enable designers to develop websites familiarly — i.e., visually and effortlessly.

If you’re mostly a prototyper, you can use the Designer alone. This function either helps sharing the prototype with devs to reproduce or exporting the code.

But to fully utilizing Webflow, you’ll want to combine the Designer with the CMS and the Hosting features.

### The CMS

As the Designer, the CMS is a code-free web development tool. It has both in-Designer elements (where the site designer works) and on-site elements (where the client and/or content managers work).

For now, know that in the Designer, the CMS lets you structure content types you’ll publish over and over again — like blog posts, product pages, etc. — by combining modular “fields.” Once you’ve created your content types, which we call Collections, you can use the Designer to determine how Collection items look on the site.

### Hosting

The final piece of the Webflow puzzle is the Hosting platform. Backed by Amazon Web Services (AWS) and Fastly, it’s blazing fast, super-reliable, and you’ll need it to enjoy some of the best features, including:

- The CMS
- The Editor
- Form management
- Responsive images (using a device to automatically resizing images)
- Free SSL/HTTPS (for site security, which is a must for Google’s visitor permission)

Okay, now that we have the lay of the land, let’s talk about diving in.

## Setup before designing

Let’s check the below image:

![](assets/getting-started-with-webflow_aa6335d35ece7aa09c9484559131c433_md5.webp)

Firstly, we’re recommended to fill in the default font, font size, and project name. The hosting, domain setup, embedded incode, SEO, Google analytic, and more benefits can be adjusted within the plans:

![](assets/getting-started-with-webflow_15ed261870e05e4d45159ac062d63f5c_md5.webp)

## Getting started

### Toolbar

![](assets/getting-started-with-webflow_b7f3ef4d478ea5cb2f99e218854ea861_md5.webp)

Let’s start with the first image. From left to right:

1. **Selector:** It is a component (which can create a component for all elements). "Container - grid" is a component which I named it. Considering about create a component in case you reuse that element regularly.
2. **Spacing:** Includes Padding and Margin. Padding is the space in the block; the margin is the outer space. Each container, text block, link block... can be adjusted for margin and padding depending on the purpose of use.
3. **Layout:** There are 5 types of Layout. Depending on usage needs, each layout helps us build our website differently.
4. **Typography:** We can input fonts from our laptop or directly from google font. You should check it out yourself; it’s easier than you think.
5. **Background, borders, and effects:** like in Figma or sketch, we can edit the background image, radius, have fun with shadows.

### Navigator

![](assets/getting-started-with-webflow_f8d5b754890ffc243e735a6e4fb21394_md5.webp)

This point can be a red flag. In this case, we’re encouraged to create and name container components for regular-use ones.

**_Tips:_** Name a component right after you create one. The component arrangement is the foundation of your website, especially responsive. It is the same as in Figma or sketch, a carefully arranged component is easier to edit, modify, and check back when needed

## Design a website

A website is divided into 3 parts: Header, Body, and Footer.

### Header

![](assets/getting-started-with-webflow_ab1951972be3533d03fe024933236f17_md5.webp)

To add a Header, click “Cmd+K” and search for the keyword “NavBar” or look at the left corner.

![](assets/getting-started-with-webflow_435ece2b3f4f240af0512011540e7010_md5.webp)

NavBar is created with Brand, Nav Menu and Menu Button, located in one container.

1. Brand: can be replaced with your company’s logo
2. Nav 3. Menu Button: I use a burger menu, but normally this could be a CTA.

**_Tips:_** Check out [“How to made a Navbar on Webflow”](https://www.youtube.com/watch?v=vj-B5MBAjIc&t=495s&ab_channel=DesignPilot) on Youtube for more information. It might hard sometimes for beginners.

![](assets/getting-started-with-webflow_ad25c3727e62ea25c77238725e166cf3_md5.webp)

### Body

![](assets/getting-started-with-webflow_523f7073ae646470be25042035c8e949_md5.webp)

Example: Before doing design on Webflow, let’s define how these elements are grouped. The body should be divided into 4 areas.

![](assets/getting-started-with-webflow_73ebf9dadeae2d52ba898a3fe0de296a_md5.webp)

1. Grid and Layout

![](assets/getting-started-with-webflow_683658131c557165d9023be3bbb4cf28_md5.webp)

1. Default Grid with padding/margins

![](assets/getting-started-with-webflow_2259389132637c4db847b8143770adf4_md5.webp)

**_Tips_**

- Divide your design’s layout, group them by div block
- Create a component for regular-use
- Create a large area (main container) to support div blocks in the website
- Responsiveness

![](assets/getting-started-with-webflow_f8fbcb003ce6c8b919bc0cc7235b3110_md5.webp)

### Footer

![](assets/getting-started-with-webflow_868bfa2a53c561cff2296e7b08665242_md5.webp)

![](assets/getting-started-with-webflow_fe50e0a67aa39fa34b8ba639a068d7cf_md5.webp)

In this case, the grid layout is used to create an equal space for Div Block from 2 to 5, when Div Block No.1 needs a larger space. A Vertical direction can be used to help adjust this.

![](assets/getting-started-with-webflow_483a7775cfee79b4bfb0d30f3cc2e5ea_md5.webp)

This section is divided into 2 parts:

1. Social link and one div block with height: 1px (_for line text_)
2. Email and phone number

**_Tips_**

- For clickable content, choose “Link Block” instead of “Text Block”.
- Layouts are critical to better create responsiveness.

## Responsive

![](assets/getting-started-with-webflow_d458119ad0184eee89c1d611a1543c50_md5.webp)

It always starts with a Base breakpoint screen. When you do the responsive for a bigger screen or mobile, it’s much effortless.

**_Tips_**

- Images can be unexpectedly resized based on screen sizes. To prevent this, put images into a div block. The automatically responsiveness of div block can help maintain the images size.
- Layout, padding and margin can be adjusted based on screen sizes. In case the components position are changed, the whole process will be reset.
- The color, text style, font size, font-weight can be modified.

## Animation

You can play with default animation or create your own one. For more Page animation, this [youtube link](https://www.youtube.com/watch?v=69RRSEHWfCQ&ab_channel=Webflow) might help.

![](assets/getting-started-with-webflow_05a4d54c84aaf4bbee7fca8473887937_md5.webp)

Check out my **[full case study](https://kiwipay.webflow.io/)**. I added some effects at the burger menu and CTA:

![](assets/getting-started-with-webflow_9ff9430476ddca3d674f41a53ec439ca_md5.webp)

![](assets/getting-started-with-webflow_c1035a354ff1b911ba88d98c7815ad41_md5.webp)

## Wrapping up

Within a month of designing with Webflow, I can learn and practice much more to produce a more high-end website. Besides, I found out that this tool's Preview is sometimes unstable, which annoyed me, but the output was outstanding.

Webflow is such a flexible tool, and now designers can work with design tools and a No-code platform for more fast and stunning achievement. I hope that these tips will spark some ideas and help you be a more efficient product designer.
