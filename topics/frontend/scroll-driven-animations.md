---
title: Scroll-driven animations
description: Scroll-driven animations are popular effects used in web design. They are animations that are connected to the scroll position of a scroll container.
date: 2023-06-01
authors:
  - trankhacvy
github_id: trankhacvy
tags:
  - animation
  - frontend
  - intersection-observer
  - scroll-driven-animations
redirect:
  - /s/AqcOTA
---

Scroll-driven animations are popular effects used in web design. They are animations that are connected to the scroll position of a scroll container. So, as you scroll up or down, the animation moves accordingly. For example, think of background images that move with your scroll or indicators that show your progress as you read through a page. Another type of scroll-driven animation is linked to an element's position within its scroll container. With this, elements can smoothly fade in as they become visible.

In the past, achieving these effects involved responding to scroll events on the main thread. However, this made it difficult to create smooth and synchronized animations. But now, thanks to the Scroll-driven Animations specification, you have access to new APIs and concepts that enable you to easily create declarative scroll-driven animations. These APIs work seamlessly with the Web Animations API and CSS Animations API.

## Animation timelines

By default, an animation attached to an element runs on the document timeline. Its origin time starts at 0 when the page loads, and starts ticking forwards as clock time progresses. This is the default animation timeline and, until now, was the only animation timeline you had access to.

The Scroll-driven Animations Specification defines two new types of timelines that you can use:

### Scroll progress timeline

A **Scroll progress timeline** is an animation timeline that is linked to progress in the scroll position of a scroll container–also called scrollport or scroller–along a particular axis. It converts a position in a scroll range into a percentage of progress.

The starting scroll position represents 0% progress and the ending scroll position represents 100% progress. In the following visualization, you can see that the progress counts up from 0% to 100% as you scroll the scroller from top to bottom.

<video src="https://storage.googleapis.com/web-dev-uploads/video/AeNB0cHNDkYPUYzDuv8gInYA9rY2/xdU4YJ6cxjNYpec1XcE6.mp4" controls></video>

Visualization of a Scroll progress timeline. As you scroll down to the bottom of the scroller, the progress value counts up from 0% to 100%. Source: https://developer.chrome.com/articles/scroll-driven-animations/

### View progress timeline

A **View progress timeline** is an animation timeline that is linked to the relative progress of a particular element within a scroll container.

Just like **IntersectionObserver**, this feature tracks how much of an element is visible in the scroller. If the element is completely hidden, it's not considered intersecting. But even if a small part of the element is visible, it's considered intersecting.

A View progress timeline starts when the subject enters the scroll container and ends when it leaves. In the visualization, the progress begins at 0% when the subject enters and reaches 100% when it exits the container.

<video src="https://storage.googleapis.com/web-dev-uploads/video/AeNB0cHNDkYPUYzDuv8gInYA9rY2/rvPTFW2277KBTuWiZFj1.mp4" controls></video>

Visualization of a View progress timeline. The progress counts up from 0% to 100% as the subject (green box) crosses the scroller. Source: https://developer.chrome.com/articles/scroll-driven-animations/

## Basic usage

To demonstrate the Scroll-driven Animations, we will re-create the animation from [this demo](https://codepen.io/chriscoyier/pen/mdVWgdN) without using any JavaScript. Let's grab some code from the original example:

```
<body>
  <svg width="100" height="100" viewBox="0 0 24 24">
  <path d="M21,9H15V22H13V16H11V22H9V9H3V7H21M12,2A2,2 0 0,1 14,4A2,2 0 0,1 12,6C10.89,6 10,5.1 10,4C10,2.89 10.89,2 12,2Z" />
</svg>
</body>
```

```
svg {
  position: fixed;
  top: 50%;
  left: 50%;
  margin-top: -50px;
  margin-left: -50px;
}

@keyframes rotate {
  to {
    transform: rotate(360deg);
  }
}

body {
  min-height: 500vh;
}
```

Our goal is to make the icon rotate based on the user's scrolling. To achieve this, we need to create a Scroll progress timeline using CSS. The simplest way to do this is by using the `scroll()` function. It allows us to create an anonymous Scroll Timeline, which we can then set as the value for the new `animation-timeline` property.

```
svg {
  ...
  animation: rotate auto linear;
  animation-timeline: scroll(root, block);
}
```

The `scroll()` function requires two arguments: `<scroller>` and `<axis>`. Here are the accepted values for each argument:

For the `<scroller>` argument:

**nearest**: Uses the nearest ancestor scroll container (default). **root**: Uses the document viewport as the scroll container. **self**: Uses the element itself as the scroll container.

For the `<axis>` argument:

**block**: Measures the progress along the block axis of the scroll container (default). **inline**: Measures the progress along the inline axis of the scroll container. **y**: Measures the progress along the y-axis of the scroll container. **x**: Measures the progress along the x-axis of the scroll container.

In our case, to bind an animation to the root scroller on the block axis, you can use the simplified syntax `scroll(root block)`. Also, note that when using a Scroll progress timeline, it does not make sense to set the `animation-duration` in seconds. Instead, you should set it to `auto`.

You can find the full code of this example at this [link](https://codepen.io/Levi-ackerman/pen/BaqeENy)

Note: Make sure you run this example in Chrome 115 or above with the 'Experimental Web Platform Features' enabled.

That's it! With just a few lines of CSS code, we've created an awesome scroll animation. You can create many amazing animations with Scroll-driven Animation. To discover more examples, please check the reference link.

## References

- https://scroll-driven-animations.style
- https://developer.chrome.com/articles/scroll-driven-animations
- https://www.youtube.com/watch?v=oDcb3fvtETs&t=335s
