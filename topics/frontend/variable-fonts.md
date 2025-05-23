---
title: Variable fonts
description: Variable fonts are a font format that allows for a single font file to contain multiple variations of a typeface.
date: 2023-03-06
authors:
  - ngolapnguyen
github_id: ngolapnguyen
tags:
  - css
  - fonts
  - frontend
redirect:
  - /s/S9GZRw
---

## What's variable font?

Variable fonts - officially known as OpenType Font Variations - are a font format that allows for a single font file to contain multiple variations of a typeface, such as different weights, widths, and styles, that can be dynamically adjusted in real-time using font variations.

![](assets/variable-fonts_variable_fonts_01.webp)

Weights, widths and other properties are also called **"axes" of variations**.

### Axes of variations

In typography and font design, "axes of variation" refer to the different characteristics or parameters of a font that can be modified or adjusted to create different font styles or variations. These variations can include parameters such as font weight, width, slant, optical size, and more.

Each axis of variation defines a range of possible values, and any combination of values within that range can be used to create a unique font style or variation.

> For example, the weight axis of a variable font might range from "Thin" to "Bold," and any value within that range can be selected to create a font style with a corresponding weight.

![](assets/variable-fonts_variable_fonts_02.webp)

By adjusting these parameters within a defined range, designers can create custom font styles that fit their specific design needs.

<video src="https://storage.googleapis.com/web-dev-assets/variable-fonts/roboto-dance.mp4" controls autoplay></video>

These variations are also dependent on how the fonts were designed and built. Designers and developers should refer to the font's documentation or its creator to understand which variations are available and how they can be used.

## Why should we use variable fonts?

- **Size and efficiency**: Font variations are contained within a single font file, leading to smaller file sizes and faster load times.
- **Flexibility, customization, precision and control**: By allowing manipulating of various variation axes to match our needs
- **Creativity**: Variable fonts provide designers with new opportunities to experiment and create unique font designs, resulting in visually distinct and more memorable typography

## Examples on variable fonts

The best way to understand variable fonts is to start playing with them. Below are some examples from [an article](https://fonts.google.com/knowledge/introducing_type/introducing_variable_fonts) from Google Fonts to get you started.

Go to [etceteratype.co/epilogue](https://etceteratype.co/epilogue) and play with the **weight** axis of Epilogue to see how it affects the overall spacing of the ![](assets/variable-fonts_variable_fonts_03.webp)

Now go to [etceteratype.co/grandstander](https://etceteratype.co/grandstander) and compare that with Grandstander, which was designed to take up the same amount of horizontal space regardless of changes made to the weight axis. This shows how what happens within an axis of variation is determined by the typeface designer.

![](assets/variable-fonts_variable_fonts_04.webp)

Go to [etceteratype.co/anybody](https://etceteratype.co/anybody) and play with the weight **and** width axes on Anybody, to see how they can be combined, and how they affect each other in a subtle way:

![](assets/variable-fonts_variable_fonts_05.webp)

You can also visit these websites:

- [VariableFonts.io](https://variablefonts.io/)
- [VariableFonts.TypeNetwork.com](https://variablefonts.typenetwork.com/)
- [Axis-Praxis](https://www.axis-praxis.org/)
- [Variable fonts](https://v-fonts.com/)
- [Font playground](https://play.typedetail.com/)
- [Very able fonts](https://www.very-able-fonts.com/)

## How do we use variable fonts (as a developer)?

### Load the fonts

Variable fonts are loaded though the same `@font-face` mechanism as traditional static web fonts, with a new enhancement:

```css
@font-face {
  font-family: "Roboto Flex";
  src:
    url("RobotoFlex-VF.woff2") format("woff2") tech("variations"),
    url("RobotoFlex-VF.woff2") format("woff2-variations");
}
```

We don't want the browser to download the font if it doesn't support variable fonts, so we add format and tech descriptions: once in the future syntax `(format('woff2') tech('variations'))`, once in the deprecated but supported among browsers syntax `(format('woff2-variations'))`. They both point to the same font file.

### Using variation axes

To set value for the variations, we use `font-variation-settings`, specifying an array of `{{axis tag}} {{value}}` pairs:

```css

@font-face {
  ...
  font-variation-settings: 'wght' 500, 'GRADE' 0.5;
}
```

You will notice that in the example above, 1 tag is lowercase, and the other is uppercase. It is to differentiate between **registered axes** & **custom axes**. Registered axes will always be lowercase, whereas custom axes will always be uppercase.

By default, there are 5 [registered axes](https://docs.microsoft.com/en-us/typography/opentype/spec/dvaraxisreg#registered-axis-tags), which control known, predictable features of the font:

- Weight - `wght`
- Width - `wdth`
- Optical size - `opsz`
- Slant - `slnt`
- Italics - `ital`

Beyond that, we depends on how the fonts were built & what custom axes they are using. Check out [this site](https://v-fonts.com/fonts/roboto-flex) for another good example on all the axes a font can have.

![](assets/variable-fonts_variable_fonts_06.webp)

## References

- https://www.youtube.com/watch?v=0fVymQ7SZw0&list=WL&index=1&t=247s&ab_channel=KevinPowell
- https://fonts.google.com/knowledge/introducing_type/introducing_variable_fonts
- https://web.dev/variable-fonts/
