---
title: Draw watch face using SwiftUI
description: Learn how to create a custom watch face with circular bezel, ticks, numbers, and moving hands using SwiftUI Shapes, Paths, and real-time updates in this step-by-step guide.
date: 2020-03-23
tags:
  - swift
redirect:
  - /s/f-qhAQ
---

SwiftUI are nice and fun to working with. You can read my previous article to get a bit knowledge about create circular control, it will make you easy to working with this article. This article also use Shape and Path, if you have worked with CoreGraphic before you will find it similar With CALayer, CAShapeLayer and UIBezierPath.

> Create Circular Text using SwiftUI

First of all, let split watch to small components for easy coding. A watch has these following parts:

- _Circular Bezel_
- _Ticks-Markers_
- _Hour, Minus, Second hands._
- _Number markers. from 1 to 12_

As usual, open Xcode and create new project, don’t forget to choose SwiftUI, add new SwiftUI file and named it Watch.

### Draw circular bezel

Path is similar to BenzierPath, you can draw Oval, rectangle, line, arc using Path.
I choose Arc for now. Later on we can using Arc, Oval or Circle to make different watch face style.
Add a new struct and named it Arc conform to Shape protocol.
Xcode will guild you add missing path method to conform with Shape.

Path methods provided us rect which is the frame we are using to draw on it.
the Act function required center point, starting angle and ending angle, we need complete circle so let start with 0 and end with 2pi which 2 angle of circle in radiants

![](assets/draw-watch-face-using-swiftui_9054ef9952d75edd68df70ced08a4374_md5.webp)

![](assets/draw-watch-face-using-swiftui_76624a28445c749c81b50d7c39444ac1_md5.webp)

Try our new Arc struct, nice we have a black circle, you can try replace stroke(lineWidth) by fill() and see what happened, also try different starting and ending angle to see what happened.

### Draw ticks-markers

Create new Struct Named Tick, it also conform to Shape.
This tick shape simple draw a line front top center down to 5 points

![](assets/draw-watch-face-using-swiftui_6fd475833c3e5bf231d0a1b5c66f36a1_md5.webp)

Try out our new Tick, also embed all of them inside ZStack and give frame to make all view inside Stack have same size.

![](assets/draw-watch-face-using-swiftui_02b6127060bc0a8b7b2ed8f9e27932d9_md5.webp)

Our next job is simple, just repeat 60 times and rotated it.
The angle for each tick just a circle divided by 60 (2pi/60)
For readable and maintainability, I create new view named Ticks for it.

![](assets/draw-watch-face-using-swiftui_825170f610ff118e6ca60e6a20bf6673_md5.webp)

This is What we have after repeat 60 time.

![](assets/draw-watch-face-using-swiftui_9893a8992e67501a431b66be2f573212_md5.webp)

However at 5, 10, 15, 20… minutes we should make tick a bit longer.
Let change our Tick and Ticks View a bit to add this extra.

![](assets/draw-watch-face-using-swiftui_db13dc3f187742fbc3806a3faf95c321_md5.webp)

We have finished draw ticks, let move on hour Numbers.

### Draw numbers

This use the same technique with [my previous article](https://medium.com/@phanviettrung/create-circular-text-using-swiftui-32cd7e5b6414), feel free to read it.

Basically we create a VStack with Text and Spacer to make the text at alignment top and as tall as parent view. This trick helping us easy to rotate the texts and keep the same radius.

![](assets/draw-watch-face-using-swiftui_bf7e847b9d6f525d83c00b064178362b_md5.webp)

Just like Tick, we repeat it 12 times, because number in Watch show from 1 to 12, I use 1 -> 13 instead of 0 -> 12

![](assets/draw-watch-face-using-swiftui_ec7fa0f45d8d452407b23dd299ba4df1_md5.webp)

Try it and We got beautiful numbers indicator.

![](assets/draw-watch-face-using-swiftui_135752868b2e9b57c2e9b252a68d6a2d_md5.webp)

### Draw hour, minus, and second hands

Make a pad circle for our Watch Hands. This completed by helping of building circle

![](assets/draw-watch-face-using-swiftui_d61b193f367f89629d4d3f4637001158_md5.webp)

Now the Hand, we draw a round rectangle from center to some where between center and top, depending on it is an hour, a minus or a second hand.

Create new Shape, named Hand, to adjust height we adding offset property

![](assets/draw-watch-face-using-swiftui_8e0070c6558d165208af627d5d128e30_md5.webp)

![](assets/draw-watch-face-using-swiftui_17aa6318aafb9fff34aaa10f6d38cfd1_md5.webp)

Test minute hand, using frame width to adjust how wide it will.

![](assets/draw-watch-face-using-swiftui_677b0fdbf3eddf813c65c1a4b03facc8_md5.webp)

Now repeat with hour and second hand

![](assets/draw-watch-face-using-swiftui_cf25ca4271503a2598b2ee327ca1c5a1_md5.webp)

It hard to see because it overlapping each other. You can use debug view hierarchy view to verify it.

![](assets/draw-watch-face-using-swiftui_c518a8b09cd378ce2277c834453383fa_md5.webp)

We are not finished yet, our watch look better if we add a red dot for second hand.

![](assets/draw-watch-face-using-swiftui_086f194966e7d9ea5915a6c1fe7b0be0_md5.webp)

We are finished our Watch View but let it “run-able” by make hands tick real time.

Add a date State property wrapper. We will update this property each one second, Hour, Minus and Second hand will know this change and make adjustments.

![](assets/draw-watch-face-using-swiftui_befcff914e798c46c4244d1dffbb5282_md5.webp)

Add a method to automatically update “date” variable.

![](assets/draw-watch-face-using-swiftui_11774d63139169af2acacd716157c8dd_md5.webp)

Call this on view appear event of ZStack

![](assets/draw-watch-face-using-swiftui_0f17e4f9c09fda63825ec1414269213e_md5.webp)

The final thing is base on current date time, we calculate an angle for hour, minus and second hand

![](assets/draw-watch-face-using-swiftui_4f565c4cc944f29623fe1fb8a9255d11_md5.webp)

The code is it self explanatory, I don’t have anything else to tell you.

Now use angles above to make our hands rotation

![](assets/draw-watch-face-using-swiftui_cfad5beb3ea58b7d6432a569afb0caf9_md5.webp)

Congratulations, our watch now run as normal watch.

![](assets/draw-watch-face-using-swiftui_397bf52e863bd1e23b8d6ba2f5f11154_md5.webp)

### Bonus part

You can change Arc to Circle, mix with different color to get more watch face

![](assets/draw-watch-face-using-swiftui_8650c87b9f9651707bb5969d0d0fbe6d_md5.webp)

View more at: [https://github.com/viettrungphan/SwiftUIGeometryPractice](https://github.com/viettrungphan/SwiftUIGeometryPractice)
