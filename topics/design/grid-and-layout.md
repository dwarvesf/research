---
title: Grid and layout
description: Learn how to create strong digital design layouts using grids, columns, gutters, and responsive techniques to make your graphic and web designs look clean and professional.
date: 2020-08-17
tags:
  - design
  - technique
redirect:
  - /s/RgGBow
---

To almost fresher who started in Graphic design and Digital design, who wants to make our model look beautiful and right. When we - fresher receive brief directly from the client or leader, we start to search online for ideas. Honestly, those projects look pretty good, super clean, and all you want is your project look the same way as them, but you just CAN’T. That’s because you don’t do the same way they did. You might forget or skip the step called: “Build Layout.”

## What is a layout and why it’s so important?

Here are some definitions I read online:

- **The layout** is the universal design tool. To layout, a page means to use photos, typography, space, icon, and ingredients to make a design own its story.
- **Layout** refers to the arrangement of elements on a page usually referring to the specific placement of image, text, and style. Understanding the **layout** of **designs** is very important. ... Proper **layout** enhances the look of the particular object and the objects as a whole piece of **design** in order to create a strong composition

Let’s make it simple. Either you want your design looks like this:

![](assets/grid-and-layout_3bdce6d13717bd0834f92c4a79970069_md5.webp)

Or this

![](assets/grid-and-layout_36c8e99a111f6eed2d177b9b0eb8228f_md5.webp)

There are several things that make your work turn into “not good looking design” and one of that is you didn’t choose and prepare your layout good enough. (It happened to me once when I first started working as a visual designer).

There are 2 types of layout:

- Grid layout
- Free - formed layout

## Grid

A grid is a network of lines. The grid lines typically run horizontally and vertically in evenly spaced increments, but grids can be angled irregular or even circular. A secret to strong layouts helps designers organize the information with hierarchy and others. It’s a guide, not a strict ruleset.

### Grid in web and app design

As a fresher in digital design, this is what I’m understanding about Grid. There are 3 types of a grid:

- Row
- Column (I use this mostly)
- Grid

With **Row** and **Column,** we mostly have 12 counts, margin, width, gutter.

### Field elements

It's a block of design, whether that be text, image, or both. Background colors don't count as field elements unless they are a container for your text/image. I've seen the name field element be interchangeable with units, elements, parent containers — they're all the same.

![](assets/grid-and-layout_1d7ff36ad43140f04c22a1344327120a_md5.webp)

### Columns

Columns are the thick colored blocks that make up the content width of your design. Field elements are to sit on a certain number of columns. Traditionally in a design system, the column width doesn’t change. But the number of columns varies from 12 on a desktop or 8 on a tablet and 4 on mobile. You can use anything you want, but most grids have 60–80px column widths. Choosing a column width that works for you is the most important since it’s the main determinant of your content width.

![](assets/grid-and-layout_910a469e5bc586180f41f88680bba4bd_md5.webp)

### Gutters

Gutters are the space between the columns. 20px is a standard gutter size, and this spacing will be critical when you have a masonry design or a grid of card elements, a simple example being a photo gallery.

![](assets/grid-and-layout_024c62923ce47df299bd7ee36aa26a77_md5.webp)

### Side margins

Side margins on mobile are usually 20–30px, and vary a lot between tablet and desktop. Whatever you choose as the side margin, will be the minimum white space you allow when you shrink your browser. When you expand your browser from this point, there will be white space until the next breakpoint.

![](assets/grid-and-layout_a043920fee14ac284854524a4e074fd1_md5.webp)

## How to use grid in the right way

I’ve learned a lot from my leader how to apply the grid in design. We can’t just put elements inside the grid in a messy way. There are rules for it.

### Field elements must sit on some number of columns

![](assets/grid-and-layout_99ba657b5b121158b61df8f51c3935df_md5.webp)

I mean, not all elements. As you see, just only the container must be between columns; the number of columns depended on the container’s size. It’s easier for the development team to code if we follow this rule, in case of force majeure (only if it make our UI better), we can create an exception.

### Do not leave field elements in the gutters

![](assets/grid-and-layout_c7cd9400e4b6a7c96f2df3c7f24791f9_md5.webp)

![](assets/grid-and-layout_7417c8675f9f592d8b8fee0d635848e8_md5.webp)

Your elements should sit within the columns and not be bleeding into the gutters. You CANNOT leave things in the gutters, that defeats the purpose of the grid.

### It’s okay to nest elements inside fields that don’t align to the grid, as long as the parent field itself sits on columns

![](assets/grid-and-layout_7df1c65ee21b0bfe2452413491f8f9bf_md5.webp)

Sound weird right, everything I wrote about seems nonsense here. But It’s a trick to me, whenever you want to put an element that not fit to your grid (you should put them into the grid. But in case don’t do it make your design look better), all you need is creating a container fitted into a grid and put your elements into them.

The Dev team always want our design put into a grid to save their time coding, with this little trick, we're no longer in a war-zone with them

### Do not use a column as outside padding unless intentional

![](assets/grid-and-layout_4052e7ff934548603afc4e9abb43548d_md5.webp)

![](assets/grid-and-layout_a106abd338fb3f0957d15d343faef1c5_md5.webp)

We actually don’t need to indented 1 column each side, it will make our main images smaller, that’s the margin jobs already.

## How these work in responsive

In a traditional design grid, the column widths and gutters stay the same, just the number of columns change. Why? And how does that work? This was to make things easier when you designed. If a set of three cards sat on 4 columns each on desktop, you would show two cards on a tablet and wrap the third one so that it’d show on a second row. Yay! You didn’t need to do any resizing, because you already knew that it sat on four columns. On mobile, the answer is easy too, you would show one card, and the rest stacked beneath it. If you wanted, you could also get creative and choose only to show one card on mobile or do a horizontal scroll. These breakpoints are the point of reference in code.

![](assets/grid-and-layout_f0045709ef2c31affbb508461c5229cd_md5.webp)

## Fixed & fluid grid

[A simple video](https://youtu.be/T6MCkGWSXa0) to further understand Fixed & Fluid grid

### Fixed grid

If your developer codes a fixed grid when you shrink from desktop to tablet, you’ll get to the next breakpoint, and there will be lots of side margins shrinking until the next breakpoint. The text doesn’t wrap, and images don’t dynamically change. If your developer is not careful in making sure all sizes are accounted for, there could be a missed breakpoint, and your designs might look cut off (hopefully this doesn’t happen). But wait as soon as you hit that 768px breakpoint, the design will snap into place, and things will look right for the tablet. If you go smaller than that, the same thing will happen, your design will look the same until you reach another breakpoint

### Fluid grid

Now comes the beauty of fluid grids! As you shrink the window, things will change dynamically, your text is wrapping, and elements are getting narrower. However, these elements of yours still won’t change layout until you hit the next breakpoint that you designed.

And that’s it. I hope after reading this, you will have some sense to make your design look great started with good layout and grid
