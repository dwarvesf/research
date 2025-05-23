---
title: Build a passcode view with Swift
description: Learn how to build a custom passcode input view in Swift that shows the keyboard, handles user input, and displays PIN dots with easy-to-follow UIKeyInput and UIView techniques.
date: 2019-06-22
tags:
  - swift
redirect:
  - /s/SMhYbw
---

![](assets/build-a-passcode-view-with-swift_38059dcec9bd2edb9ac9b1433eb8870c_md5.webp)

The highlights before we are write our code.

Our Passcode view can “becomeFirstResponder” and “resignFirstResponder” to show and hide virtual keyboard if needed.

=> Our Passcode nearly same with TextField.

Define our passcode view:

![](assets/build-a-passcode-view-with-swift_d816501201514ad7e20b8a1eaa11336b_md5.webp)

By default, to show keyboard on the screen user should touch in TextField or TextView to edit. We can make our custom view as keyboard input view by override “canBecomeFirstReponder” method and conform to UIKeyInput Protocol

![](assets/build-a-passcode-view-with-swift_e3aac2ef700961b85e15edbeba660e97_md5.webp)

![](assets/build-a-passcode-view-with-swift_e1f29ff96dcff1eabdaa75703feccaa7_md5.webp)

Now our view can show keyboard, you can test it by call passcode.becomeFirstResponder()

![](assets/build-a-passcode-view-with-swift_3af95d69a2b12d37965a6390e9ffc9e3_md5.webp)

![](assets/build-a-passcode-view-with-swift_af46d74372514e5a70b084d86b836f5e_md5.webp)

To help user easy using our passcode view we can add a tap gesture and call becomFirstReponder() to show keyboard. Now you can easy tap to show keyboard.

![](assets/build-a-passcode-view-with-swift_f2662e927b3487cb814b59e5b4fb6ab7_md5.webp)

Now we are going to build our logic to handle user input. There are 3 methods we need focus:

![](assets/build-a-passcode-view-with-swift_e1f29ff96dcff1eabdaa75703feccaa7_md5.webp)

Now append or delete our code string if needed.

![](assets/build-a-passcode-view-with-swift_1ca05e855a002b1a9b9062933c0637c3_md5.webp)

Greet, our passcode logic finished, the next challenge is map our code to PIN UI when code changed

Add an UIStackView to our Passcode view. Stack will distribute “Dot View” as Pin.

![](assets/build-a-passcode-view-with-swift_dc6fae0f3fb25101d24553d424836965_md5.webp)

![](assets/build-a-passcode-view-with-swift_36906b8962ed020434fa08918abb4452_md5.webp)

Create our Pin View

![](assets/build-a-passcode-view-with-swift_9538b2b34f1286a8dc0ea3af0754f8e6_md5.webp)

Create two more helper methods to create emptyPin and normal pin

![](assets/build-a-passcode-view-with-swift_9f05b8d51b192d5084b13c8c58a5f154_md5.webp)

Map user input code to Array of Pin views and distribute to stack

![](assets/build-a-passcode-view-with-swift_bb4c7b4c744eb9753d14c80f90713861_md5.webp)

The helper method to remove all add Arranged sub view from stack

![](assets/build-a-passcode-view-with-swift_d44d2498c831ac60ddbf0a53d5f34234_md5.webp)

Call our update stack when code changed

![](assets/build-a-passcode-view-with-swift_f4f7c7feb4ec4c1c638d716f2d270e5a_md5.webp)

Create ViewController to test our stack:

![](assets/build-a-passcode-view-with-swift_0f668d3c9f621a372a90657247d08e3a_md5.webp)

Make our PasscodeView conform to UITextInputTraints to able to set keyboard to numPad

![](assets/build-a-passcode-view-with-swift_c7b65095335c11d1ffa2865322c3e686_md5.webp)

Result

![](assets/build-a-passcode-view-with-swift_e0a5e31e6ae8c460f9968793cf29003e_md5.webp)

Add a callback when user finished input.

![](assets/build-a-passcode-view-with-swift_804017aefbe5ae510c9ea2cc7445e8f8_md5.webp)

![](assets/build-a-passcode-view-with-swift_383a2f3f5d10e682fdb546b70166a178_md5.webp)

Full source code at:
[https://github.com/viettrungphan/Passcode.git?source=post_page-----a6ddae69f405----------------------](https://github.com/viettrungphan/Passcode.git?source=post_page-----a6ddae69f405----------------------)

Please notice the project written by Xcode 11 beta. Your can simple copy all Prefix Passxxx and Pin files to your xcode project to test.
