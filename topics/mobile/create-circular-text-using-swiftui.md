---
title: Create circular text using SwiftUI
description: Learn how to create circular text in SwiftUI by splitting strings, measuring character sizes with GeometryReader, and rotating each character to form a smooth circle with adjustable spacing.
date: 2020-03-23
tags:
  - swift
redirect:
  - /s/3X7NRg
---

![](assets/create-circular-text-using-swiftui_6872696f92cc278214818c3e90f67383_md5.webp)

This is what we have when finished.

Fire up your Xcode and create new SwiftUI Project.

Create new SwiftUI file and named it CircularText.

The first two attributes for our control of course is String and Radius for our circular.

Add 2 Attribute named

![](assets/create-circular-text-using-swiftui_9b6a81fbaea69fbc04804680517f7628_md5.webp)

To make a circle text we split out string to array of character, each character will have it own Text control then we going to rotate the text to match circle.

Define computer property to split string to array of character:

![](assets/create-circular-text-using-swiftui_46724b5601eab5c6899e4444f5729480_md5.webp)

Using enumerated to get offset using later.
To calculate angle using to make rotation later we need 2 things: perimeter of circle and width of each character.

![](assets/create-circular-text-using-swiftui_d850c4e1905c1fe203887a585b99beb0_md5.webp)

Later we will use it as radius.perimeter

For Width of each character is a bit complicate. We need place it in some control and get size of that control somehow. Text is the best candidate for this case.

Embed Text and Spacer in Vstack we have a custom control as tall as parent view and the text at top of control, this make us easy to make rotation later because we just need rotation at center of control.

![](assets/create-circular-text-using-swiftui_c8ece1efb4286be7223bcb132a0e1257_md5.webp)

Now we have List of Text, the next thing is get it width value. SwiftUI let us get size from control using GeometryReader, and we send it to outside using PreferenceKey

![](assets/create-circular-text-using-swiftui_1f272824a0e403cad5a4d5a45fe5c91f_md5.webp)

We going to place custom Sizeable View as background of Text, because Sizable View actually a Color, it going to fill the parent (which is background of Text)so we got exactly size of Text
To store that sizes let add a Dictionary to save it, the key will be the position of Character. Add a dictionary named textSizes

![](assets/create-circular-text-using-swiftui_9f748f21526907df2f65cfa50b2b3526_md5.webp)

Update our VStacks to save sizes when preference changed

![](assets/create-circular-text-using-swiftui_068016d599ac0fe7ebeb1c320496fea9_md5.webp)

We have perimeter and with of each character, now calculate angle of each character by it position

![](assets/create-circular-text-using-swiftui_62ae3eea7d36359b7e26f8840a74dd3d_md5.webp)

This function simple calculate how many percentages of size.with compare to perimeter of circular, then figure out angle by that percent.

We have angle, now make rotation and see results:

![](assets/create-circular-text-using-swiftui_f9fb1ddc68ddef8e0c9f6f321e34aaeb_md5.webp)

Look like the space between characters have problem. This because of it just fit enough for horizontal Text, when we make circle, the rotation angle make it close together. Luckily the building kerning Modifier make us easily to adjust it.

![](assets/create-circular-text-using-swiftui_fdd18ae3a8fd903729c18eda97d7ae1f_md5.webp)

If you want to make it center, simple ask the angle of last character divide by 2 then rotation it anticlockwise.

![](assets/create-circular-text-using-swiftui_1f24f4e09d557c69ef6b57fcc4e0ab66_md5.webp)

We are done, hope you enjoy and have fun with SwiftUI.

View more at: [https://github.com/viettrungphan/SwiftUIGeometryPractice](https://github.com/viettrungphan/SwiftUIGeometryPractice)
