---
title: Swift 5 4 resultbuilder
description: Learn how to use Swift’s @resultBuilder and UIKit Builder pattern to create flexible container views like UIStackView with clean, DSL-style code for easier UI development in Swift.
date: 2022-08-31
github_id: viettrungphan
redirect:
  - /s/H3Iv5Q
---

The [[UIKit Builder pattern]] enables us to create and configure a UIView object. This article is part two of the series that explains how we can wrap a container element in Swift by using the builder pattern.

## How can we wrap the container elements using Swift builder?

### Function builder

Function Builders are used in SwiftUI to create VStacks. If you've heard about the VStack component, it was built using Function Builders.

```Swift
VStack {
    Text("Hello world")
    Text("Dwarves Foundation Better Engineering")
}
```

### `@resultBuilder`

Swift 5.4 introduces @resultBuilder, a new feature that makes it even easier to use SwiftUI. This new feature also extends Swift's DSL capabilities to standard Swift language, allowing you to take advantage of DSLs in more areas of your codebase (the detail can be found [here](https://github.com/apple/swift-evolution/blob/main/proposals/0289-result-builders.md)).

From now on you can easily write HTML forms in Swift as follows:

```Swift
HTML {
    Body {
        P { "Hello HTML" }
        DIV {
            P{}
            P{}
            DIV{}
         }
    }
}
```

Let's extend UIKit to write an app in a DSL style. In the [[UIKit Builder pattern|previous tutorial]], we used Builder Pattern to create `UILabel("ABC", red)`. Let's add a container View to make it even better. UIKit has Stack Views, which help us arrange subviews horizontally or vertically.

Let's make it from:

```Swift
let label = UILabel().text("ABC").backgroundColor(.red)

let stackView = UIStackView()
stackView.distribution = .center
stackView.axis = .horizontal
stackView.addArrangeSubview(label)
```

To:

```Swift
UIHStack {
    UILabel().text("ABC").backgroundColor(.red)
}
```

### Turn UIKit into DSL styling

Let's define a DSL UIViewBuilder. A DSL UIViewBuilder turns a list of UIViews into a UIView.

```Swift
@resultBuilder
public enum UIViewBuilder {
    public static func buildBlock(_ components: UIView...) -> [UIView] {
       components
    }
}
```

Use:

```Swift
let views = UIViewBuilder.buildBlock(UILabel(), UIImageView(), UIView())
@UIViewBuilder func createUI() -> [UIView] {
    UILabel()
    UIImageView()
}
```

**Note:** You may ask "_Why is `[UIView]` being the return type instead of UIView?_" We will discuss that later.

With above UIViewBuilder we get a array of views from DSL syntax. It helps us to write the code naturally without constant `addSubview` code writing.

It is possible to write in DSL style, but the above code is not pretty. Let's write some popular UI wrapper for convenience usage.

```Swift
public class UIVStack: UIStackView {
    public convenience init(@UIViewBuilder _ builder: () -> [UIView]) {
        self.init(arrangedSubviews: builder())
        self.distribution = .fill
        self.spacing = 16
        self.axis = .vertical
    }
}
```

Now we have convenience UIVStack:

```Swift
UIStackView {
    UILabel()
    UIImageView()
    UITextField()
}
```

As you can see, replacing UIView with the array of UIViews allows us to add them directly to the StackView instead of calling `addSubview` multiple times.

Let's add some more components.

```Swift
public class UIHStack: UIStackView {
    public convenience init(@UIViewBuilder _ builder: () -> [UIView]) {
        self.init(arrangedSubviews: builder())
        self.distribution = .fill
        self.spacing = 16
        self.axis = .horizontal
    }
}

public class UIZStack: UIView {
    convenience init(@UIViewBuilder _ builder: () -> [UIView]) {
        self.init()
        builder().forEach { view in
            self.addSubview(view)
            view.translatesAutoresizingMaskIntoConstraints()
            view.fitToSuperView()
        }
    }
}
```

By combining the technique from the last article with @resultBuilder, we can write UI using UIKit that closely matches Swift.

![[ios_uikit_builder_pattern_banner.png]]

```Swift
UIZStack(spacing: 16) {
    UIVStack(spacing: 16) {
        UIImageView(image: UIImage(named:"banner"))
        UIView()
            .backgroundColor(.clear)
            .heightAnchor(height: 20)
        UILabel()
            .text(title)
            .font(UIFont.systemFont(ofSize: UIFont.largeSize))
            .textAlignment(.center)
            .color(.black60)
        UILabel()
            .text(subtitle)
            .font(UIFont.systemFont(ofSize: UIFont.normalSize))
            .textAlignment(.center)
            .color(.black60)
            .numberOfLines(0)

        UIButton()
            .mintStyle()
            .title("Update Now")
            .tap(action: { [weak self] in
                navigateToAppStore()
            })
            .heightAnchor(height: 44)
    }
}

```

### Bonus parts

#### Support `if-else` and `loop`

The `@resultBuilder` module has a static function named `buildEither` that can be used to add if-else statements to your DSL as well as a function named `builderArray` that can be used to loop through data. These two functions work just like `buildBlock` does:

```Swift
public static func buildEither(first component: [UIView]) -> [UIView] {
}
public static func buildEither(second component: [UIView]) -> [UIView] {
}
public static func buildArray(_ components: [[UIView]]) -> [UIView] {
}
```

```Swift
UIHStack {
    if true {
        UIView().backgroundColor(.red)
    } else {
        UIView().backgroundColor(.green)
    }

    for image in images {
        UIImageView(image: image)
    }
}
```

#### Config container

Adding configuration to the init method to set the container view.

```Swift
public class UIVStack: UIStackView {
    public convenience init(alignment: UIViewAlignment = .center, spacing: CGFloat = 16,  @UIViewBuilder _ builder: () -> [UIView]) {
        self.init(arrangedSubviews: builder())
        self.distribution = .fill
        self.spacing = spacing
        self.alignment = alignment
        self.axis = .vertical
    }
}

UIHStack(alignment: .trailling, spacing: 8) {

}
```
