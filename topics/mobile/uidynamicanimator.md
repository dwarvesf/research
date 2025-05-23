---
title: Uidynamicanimator
description: Learn how UIDynamicAnimator and UIDynamicItem enable realistic 2D physics animations in iOS using behaviors like gravity, collision, and attachment for natural, high-performance user interface effects.
date: 2019-07-26
tags:
  - macos
  - swift
redirect:
  - /s/354duw
---

## Definition

A **dynamic item** is any iOS or custom object that conforms to the [UIDynamicItem](https://developer.apple.com/documentation/uikit/uidynamicitem) protocol. The [UIView](https://developer.apple.com/documentation/uikit/uiview) and [UICollectionViewLayoutAttributes](https://developer.apple.com/documentation/uikit/uicollectionviewlayoutattributes) classes implement this protocol in iOS 7 and later. You can implement this protocol to use a dynamic animator with custom objects for such purposes as reacting to rotation or position changes computed by an animator.

To use dynamics, configure one or more dynamic behaviors—including providing each with a set of dynamic items—and then add those behaviors to a dynamic animator.

You specify dynamic behaviors using any of the iOS primitive dynamic behavior classes: [UIAttachmentBehavior](https://developer.apple.com/documentation/uikit/uiattachmentbehavior), [UICollisionBehavior](https://developer.apple.com/documentation/uikit/uicollisionbehavior), [UIDynamicItemBehavior](https://developer.apple.com/documentation/uikit/uidynamicitembehavior), [UIGravityBehavior](https://developer.apple.com/documentation/uikit/uigravitybehavior), [UIPushBehavior](https://developer.apple.com/documentation/uikit/uipushbehavior), and [UISnapBehavior](https://developer.apple.com/documentation/uikit/uisnapbehavior). Each of these provides configuration options and lets you associate one or more dynamic items to the behavior. To activate a behavior, add it to an animator.

A dynamic animator interacts with each of its dynamic items as follows:

1. Before adding an item to a behavior, you specify the item’s starting position, rotation, and bounds (to do so, use properties of the item’s class, such as the [center](https://developer.apple.com/documentation/uikit/uiview/1622627-center), [transform](https://developer.apple.com/documentation/uikit/uiview/1622459-transform), and [bounds](https://developer.apple.com/documentation/uikit/uiview/1622580-bounds) properties in the case of a UIView-based item)
2. After you add the behavior to an animator, the animator takes over: it updates the item’s position and rotation as animation proceeds (see the [UIDynamicItem](https://developer.apple.com/documentation/uikit/uidynamicitem) protocol)
3. You can programmatically update an item’s state in the midst of an animation, after which the animator takes back control of the item’s animation, relative to the state you specified (see the [updateItem(usingCurrentState:)](https://developer.apple.com/documentation/uikit/uidynamicanimator/1621190-updateitem) method)

You can define composite behaviors using the [addChildBehavior(\_:)](https://developer.apple.com/documentation/uikit/uidynamicbehavior/1618496-addchildbehavior) method of the [UIDynamicBehavior](https://developer.apple.com/documentation/uikit/uidynamicbehavior) parent behavior class. The set of behaviors you add to an animator constitute a behavior hierarchy. Each behavior instance you associate with an animator can be present only once in the hierarchy.

To employ a dynamic animator, first identify the type of dynamic items you want to animate. This choice determines which initializer to call, and this in turn determines how the coordinate system gets set up.

The three ways to initialize an animator, the dynamic items you can then use, and the resulting coordinate system, are as follows:

- To animate views, create an animator with the [init(referenceView:)](https://developer.apple.com/documentation/uikit/uidynamicanimator/1621203-init) method. The coordinate system of the reference view serves as the coordinate system for the animator’s behaviors and items. Each dynamic item you associate with this sort of animator must be a [UIView](https://developer.apple.com/documentation/uikit/uiview) object and must descend from the reference view.
- You can define a boundary, for items participating in a collision behavior, relative to the bounds of the reference view. See the [setTranslatesReferenceBoundsIntoBoundary(with:)](https://developer.apple.com/documentation/uikit/uicollisionbehavior/1624818-settranslatesreferenceboundsinto) method.
- To animate collection views, create an animator with the [init(collectionViewLayout:)](https://developer.apple.com/documentation/uikit/uidynamicanimator/1621196-init) method. The resulting animator employs a collection view layout (an object of the [UICollectionViewLayout](https://developer.apple.com/documentation/uikit/uicollectionviewlayout) class) for its coordinate system. The dynamic items in this sort of animator must be [UICollectionViewLayoutAttributes](https://developer.apple.com/documentation/uikit/uicollectionviewlayoutattributes) objects that are part of the layout.
- You can define a boundary, for items participating in a collision behavior, relative to the bounds of the collection view layout. See the [setTranslatesReferenceBoundsIntoBoundary(with:)](https://developer.apple.com/documentation/uikit/uicollisionbehavior/1624818-settranslatesreferenceboundsinto) method.
- A collection view animator automatically calls the [invalidateLayout()](https://developer.apple.com/documentation/uikit/uicollectionviewlayout/1617728-invalidatelayout) method as needed, and automatically pauses and resumes animation, as appropriate, when you change a collection view’s layout.
- To employ a dynamic animator with other objects that conform to the [UIDynamicItem](https://developer.apple.com/documentation/uikit/uidynamicitem)protocol, create an animator with the inherited [init()](https://developer.apple.com/documentation/objectivec/nsobject/1418641-init) method. The resulting animator employs an abstract coordinate system, not tied to the screen or to any view.
- There is no reference boundary to refer to when defining a collision boundary for use with this sort of animator. However, you can still, in a collision behavior, specify custom boundaries as described in [UICollisionBehavior](https://developer.apple.com/documentation/uikit/uicollisionbehavior).
-

All types of dynamic animators share the following characteristics:

- Each dynamic animator is independent of other dynamic animators you create
- You can associate a given dynamic item with multiple behaviors, provided those behaviors belong to the same animator
- An animator automatically pauses when all its items are at rest, and automatically resumes when a behavior parameter changes or a behavior or item is added or removed

You can implement a delegate to respond to changes in animator pause/resumption status, using the [dynamicAnimatorDidPause(\_:)](https://developer.apple.com/documentation/uikit/uidynamicanimatordelegate/1621193-dynamicanimatordidpause) and [dynamicAnimatorWillResume(\_:)](https://developer.apple.com/documentation/uikit/uidynamicanimatordelegate/1621188-dynamicanimatorwillresume)methods of the [UIDynamicAnimatorDelegate](https://developer.apple.com/documentation/uikit/uidynamicanimatordelegate) protocol.

## Key features

To create real-life animation experience, Apple simulates it using UIDynamicAnimator

**Features**

- Very good in term performance
- Easy to simulate realtime physic
- Make user feel animation very natural
- Only apply for 2D environment.

UIDynamicAnimator can be taken as an isolated physical environment, where objects receive physical impact (UIDynamicItem) when it’s added to animator.

There are 5 types of Behavior

- UIGravityBehavior
- UICollisionBehavior
- UISnapBehavior
- UIPushBehavior
- UIAttachmentBehavior

Besides, UIDynamicItem(object) features can also adjust the elasticity of the object

- Elasticity
- Density
- Friction
- Resistance

Combine all of these factors, we end up with real-life physical interaction simulation.

## UI dynamic behavior

A field behavior defines an area in which forces such as gravity, magnetism, drag, velocity, turbulence, and others can be applied. After creating a field behavior object of the appropriate type, configure the strength of the intended force along with any other field attributes.

After creating a field behavior object, call the [addItem(\_:)](https://developer.apple.com/documentation/uikit/uifieldbehavior/1624996-additem) method to associate the field with that item. For many types of fields, you must also configure a [UIDynamicItemBehavior](https://developer.apple.com/documentation/uikit/uidynamicitembehavior)object for the item to define relevant attributes of the item such as its density (mass) or charge. After configuring the field, add it to the [UIDynamicAnimator](https://developer.apple.com/documentation/uikit/uidynamicanimator) object associated with your interface to begin the animations.

The [position](https://developer.apple.com/documentation/uikit/uifieldbehavior/1625003-position) of a field defines its location in your interface and the field’s [region](https://developer.apple.com/documentation/uikit/uifieldbehavior/1625005-region) defines its area of influence. The region you specify is centered on the field’s position. Regions can be circular or rectangular, and you can combine regions in different ways to create more complex region shapes.

Most fields use only a subset of the field attributes in their computations. All fields have a [strength](https://developer.apple.com/documentation/uikit/uifieldbehavior/1624997-strength) value that helps define the intensity of the field. Most fields also use the [falloff](https://developer.apple.com/documentation/uikit/uifieldbehavior/1624988-falloff)property to vary the field strength over distance. You configure other attributes only as needed for the type of field.
