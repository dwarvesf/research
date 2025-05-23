---
title: Pure CSS parallax
description: This article demonstrates how to use CSS transforms, perspective and some scaling trickery to create a pure CSS parallax scrolling website.
date: 2022-09-10
authors:
  - ngolapnguyen
github_id: ngolapnguyen
tags:
  - animation
  - css
  - frontend
  - html
redirect:
  - /s/UvqX-w
---

This article demonstrates how to use CSS transforms, perspective and some scaling trickery to create a pure CSS parallax scrolling website.

## Advantages of using pure CSS over JS

Although using Javascript will give us more flexibility on how we want to construct our parallax effect, it also comes with the cost of performance & implementation complexity. We listen to the `scroll` event & modify the DOM with the handler, triggering needless reflows and paints.

For more simple use cases, with pure CSS, we can:

- Avoid messing with the browser's rendering pipeline
- Allow browsers to leverage hardware acceleration while rendering, ensuring consistent frame rates & a smooth scrolling experience
- Combine with other CSS features (e.g. responsive)

## How it works

First, let's establish some barebones markup:

```html
<div class="parallax">
  <div class="layer layer-1">...</div>
  <div class="layer layer-2">...</div>
  ...
</div>
```

And the basic styles:

```css
.parallax {
  perspective: 1px;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
}

.layer {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.layer-1 {
  transform: translateZ(0);
}

.layer-2 {
  transform: translateZ(-1px);
}
```

The `parallax` class is where the parallax magic happens:

- Defining the `height` and `perspective` style properties of an element will lock the perspective to its centre, creating a fixed origin 3D viewport.
- Setting `overflow-y: auto` will allow the content inside the element to scroll in the usual way, but now descendant elements will be rendered relative to the fixed perspective. This is the key to creating the parallax effect.

The `layer` class defines a layer of content to which the parallax effect will be applied. The `absolute` position is optional, for the sake of display. You'll see what I meant in a moment.

Finally, the `layer-{{n}}` class is used to set Z offset of the layers. If we consider the `parallax` container is a camera viewport, the Z offset will determine whether a layer is farther away, or closer to the viewport. **The farther away a layer is, the slower it'll appear to be scrolling.**

Check it out in the CodePen below:

<iframe height="400" style="width:100%" scrolling="no" title="Pure CSS parallax (1) - Barebones" src="https://codepen.io/ngolapnguyen/embed/wvjGRRp?default-tab=result" frameborder="no"></iframe>

## Common practices

### Parallax with multiple sections

Most parallax sites break the page into distinct sections where different effects can be applied. Here's how to do that.

First, we need a `group` element to group our layers together:

```html
<div class="parallax">
  <div class="group">
    <div class="layer layer-1">Layer 1.1</div>
    <div class="layer layer-2">Layer 1.2</div>
    <div class="layer layer-3">Layer 1.3</div>
  </div>
  ...
</div>
```

And now the styles:

```css
.group {
  ...
  transform-style: preserve-3d;
}
```

The property `transform-style: preserve-3d` prevents the browser from flattening the `layer` elements, indicating that children of the element should be positioned in the 3D-space. More on the property [here](https://developer.mozilla.org/en-US/docs/Web/CSS/transform-style).

One important rule to keep in mind when grouping elements is, **we cannot clip the content of a group**. Setting `overflow: hidden` on a `group` will break the parallax effect. Unclipped content will result in descendant elements overflowing, so we need to be creative with the `z-index` values of the groups to ensure content is correctly revealed/hidden as the visitor scrolls through the document.

### Depth correction

True to 3D transforms, elements that are farther away from the viewport will appear smaller than those that are closer. If we want them to appear to be rendered as their original size (e.g. same font-size and all), we can use the `scale` transform to do that:

```css
.layer-2 {
  transform: translateZ(-1px) scale(2);
}
```

The scale factor can be calculated with the following formula:

```
scale = 1 + (translateZ * -1) / perspective
```

### Debugging

When you are working with parallax, it can be easier to get lost among the different layers. Taking a different perspective will allow you to know where everything is in the 3D space - which you can do by applying simple transform to the group elements:

```css
.group {
  transform: translate3d(700px, 0, -800px) rotateY(30deg);
}
```

You can try out all the common practices I have mentioned in the CodePen below:

<iframe height="400" style="width: 100%;" scrolling="no" title="Pure CSS parallax (2) - Common Practices" src="https://codepen.io/ngolapnguyen/embed/XWqdOJr?default-tab=result" frameborder="no" allowfullscreen="true"></iframe>

## References

- https://keithclark.co.uk/articles/pure-css-parallax-websites/
- https://developer.mozilla.org/en-US/docs/Web/CSS/transform-style
- https://www.youtube.com/watch?v=1wfeqDyMUx4
