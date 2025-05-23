---
title: Stateless and stateful widgets in Flutter
description: Learn the key differences between stateless and stateful widgets in Flutter, including how each manages UI state and when to use them for dynamic or static app interfaces.
date: 2022-09-12
github_id: knguyenuit
redirect:
  - /s/D9CrFQ
---

## State

> State: The State is the information that can be read synchronously when the widget is built and might change during the lifetime of the widget.

State is something that can change within a widget. For example, let’s say we have a like button. The button can either be filled in, or not filled in depending on whether it has been clicked. That’s a state right there. The state of that button can either be filled in or not filled in. If a widget is constant and does not change no matter what is done, then it does not have a State.

## Stateless widget

**Stateless widget**: The widgets whose state can not be altered once they are built are called stateless widgets. These widgets are immutable once they are built i.e any amount of change in the variables, icons, buttons, or retrieving data can not change the state of the app. Below is the basic structure of a stateless widget. Stateless widget overrides the build() method and returns a widget. For example, we use Text or the Icon is our flutter application where the state of the widget does not change in the runtime. It is used when the UI depends on the information within the object itself. Other examples can be Text, RaisedButton, IconButtons.

This widget needs a function `Widget build(BuildContext context)` to render data to the screen. The build function is only called once while the application is running, so the data is only rendered once and does not change throughout the application's life. The display data you can hard code or pass through the constructor function of the class and this data will not change during the display on the screen. Although the StatelessWidget cannot change itself, when the parent Widget changes, the StatelessWidget will be re-initialized.

```Dart
import 'package:flutter/material.dart';

//This function triggers the build process
void main() => runApp(const MyApp());

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      home: Scaffold(
        backgroundColor: Colors.blue,
        appBar: AppBar(
          leading: const Icon(Icons.menu),
          backgroundColor: Colors.green,
          title: const Text(
            "Dwarves Foundation",
            textAlign: TextAlign.start,
          ),
        ), // AppBar
        body: const Center(
          child: Text(
            "Stateless widget Demo",
            style: TextStyle(color: Colors.black, fontSize: 30),
          ),
        ), // Container
      ), // Scaffold
    ); // MaterialApp
  }
```

## Stateful widget

**Stateful Widgets**: The widgets whose state can be altered once they are built are called stateful Widgets. These states are mutable and can be changed multiple times in their lifetime. This simply means the state of an app can change multiple times with different sets of variables, inputs, data. Below is the basic structure of a stateful widget. Stateful widget overrides the createState() and returns a State. It is used when the UI can change dynamically. Some examples can be CheckBox, RadioButton, Form, TextField.

Classes that inherit “Stateful Widget” are immutable. But the State is mutable which changes in the runtime when the user interacts with it.

```Dart
class MyApp extends StatefulWidget {
  @override
  State<StatefulWidget> createState() {
    return _MyAppState();
  }
}

class _MyAppState extends State<MyApp> {
  List<String> _fruits = ['Apple'];

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(title: Text('Demo Stateful')),
        body: Column(children: [
          Container(
              margin: EdgeInsets.all(10.0),
              child: RaisedButton(
                  onPressed: () {
                    setState(() {
                      _products.add('Orange');
                    });
                  },
                  child: Text('Dwarves Foundation'))),
          Column(
              children: _products
                  .map((element) => Card(
                        child: Column(
                          children: <Widget>[Text(element)],
                        ),
                      ))
                  .toList()),
        ]),
      ),
    );
  }
}
```

This Widget needs the `State<StatefulWidget> createState()` function to provide the State for the StatefulWidget.
The `_MyAppState` class will override the `Widget build(BuildContext context)` method, which returns the Widget. This is where you define the UI that the class displays. `StatefulWidget` manages UI state through State, when State changes, `StatefulWidget` will re-render the UI it is displaying.

`StatefulWidget` provides the `setState()` method so you can change the State of the class. Simply put, when you want to Update UI of StatefulWidget, you need to call setState() method to notify StatefulWidget that I want you to update UI. Of course you can call `setState()` as many times as you need to change the UI during the life of your app.

## Differences Between Stateless and Stateful Widget:

**Stateless widget:**

- Stateless Widgets are static widgets.
- They do not depend on any data change or any behavior change.
- Stateless Widgets do not have a state, they will be rendered once and will not update themselves, but will only be updated when external data changes.
- For Example: Text, Icon, RaisedButton are Stateless Widgets.

**Stateful Widget:**

- Stateful Widgets are dynamic widgets.
- They can be updated during runtime based on user action or data change.
- Stateful Widgets have an internal state and can re-render if the input data changes or if Widget’s state changes.
- For Example: Checkbox, Radio Button, Slider are Stateful Widgets
