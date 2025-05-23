---
title: null
description: null
date: null
tags:
  - machine-learning
  - 101
  - engineering
  - syllabus
redirect:
  - /s/7ZDEeQ
---

## Deep learning

- ![](https://s3-ap-southeast-1.amazonaws.com/dwarvesf-outline/uploads/34adb8ba-29bc-4ab8-b128-fea45fade09c/35801af4-7c14-4971-8cbf-6ea4dc9518c7/1_tHpSPgqwqnXFe8gzi_7jrQ.gif)
- ![](https://s3-ap-southeast-1.amazonaws.com/dwarvesf-outline/uploads/34adb8ba-29bc-4ab8-b128-fea45fade09c/91f3ec00-d7fa-4e80-b574-9dc2009afa66/1_e24G5LIj0aTOLe8sHTIrUQ.png)
- ![](https://s3-ap-southeast-1.amazonaws.com/dwarvesf-outline/uploads/34adb8ba-29bc-4ab8-b128-fea45fade09c/196f0707-a857-4c72-bbe5-d40c9dbeb101/1_CE2SbDrbSFKZtcuTX-XUlA.png)
- ![What’s the relationship between X and Y?](https://s3-ap-southeast-1.amazonaws.com/dwarvesf-outline/uploads/34adb8ba-29bc-4ab8-b128-fea45fade09c/eeb72b87-2d14-471f-a151-9135f49e47ce/1_LbFwyQGAlokiSLauMBFYWA.png)
- ![Well, that’s easy isn’t it. Y = 2X](https://s3-ap-southeast-1.amazonaws.com/dwarvesf-outline/uploads/34adb8ba-29bc-4ab8-b128-fea45fade09c/06f99742-d55c-452f-a5f0-224dfdcb250b/1_65A-O7KcKg6bLV8KnoiB5w.png)

The relationship between X and Y is more complex! Machine learning or Deep learning is used when you want to automate this process of finding a functional mapping between inputs and outputs on a large number of examples, thus finding the relationship/pattern which can later be used to make a future prediction to take valuable business decisions. As the complexity of relationship between X and Y increases Deep learning starts to shine!

X and Y can be different! If X is text in English and Y is its corresponding text in French, once you find the pattern between them using Deep learning, what you essentially have is an AI for language translation! The same applies for a variety of X’s and Y’s.

Now imagine X to images of Apples and Oranges, and Y is either 0 (for Apple) or 1 (Orange). Now let’s write a program with explicit logic to distinguish between them. Let’s say explicit programming works for classifying between Apple’s and Oranges.

But how about writing explicit rules to distinguish between Dog breeds!?

- It's a hard problem, in this case, you would let Deep learning do its Magic. You feed the Deep learning code with a large number of example images of different dog breeds and let it find a pattern in them. Later it could use this understanding to be able to predict the breed of new dog images. Hey, there are so many breeds of dogs and these images could look very different? How could it understand this pattern in pixels just with few images and identify the pattern?

We’ll as rightly guessed, it's not possible to generalize the pattern just with few images. You need a lot and lots of data to be able to do this.

#### How does Deep learning do what it does?

Deep learning uses the concepts of **neurons and weights**.

- Weights are the edges in the Neural Network, consider them as the tunable knobs. The nodes are the data using which we try to find the pattern between X and Y.

The Learning / Training in Deep learning involves finding values for these tunable knobs called weights so that the functional mapping between X and Y is as accurate as possible. The algorithm used is called as a Model. The entire process of finding values for these knobs are computationally intensive, so you would save these values of weights/knobs, which would be later used to make predictions. This is called the Saved model / Trained model. These values can be later loaded into another program without having to train the model again.

We’ve already seen 5 major aspects in the Deep learning process,

- Data
- The Algorithm / Model.
- Learning / Training
- Prediction
- The trained model.

---

#### Reference

Here are some exerts from the Tensorflow official site which gives an amazing explanation about Machine learning ![](https://s3-ap-southeast-1.amazonaws.com/dwarvesf-outline/uploads/34adb8ba-29bc-4ab8-b128-fea45fade09c/b4580941-649f-47f4-b390-30fdd8247f78/1_RhpMl4F795rhWlk-LcFQ8g.png) ![](https://s3-ap-southeast-1.amazonaws.com/dwarvesf-outline/uploads/34adb8ba-29bc-4ab8-b128-fea45fade09c/4632ebc6-e055-4d95-a8d3-c54f83aa0dbf/1_8pxrjeHWuMVCC6J4AmnG5Q.png)

![](https://s3-ap-southeast-1.amazonaws.com/dwarvesf-outline/uploads/34adb8ba-29bc-4ab8-b128-fea45fade09c/d2d29fb1-c13f-446d-abe5-5396cb8c1210/1_McdwulQJET5gNryy5-Ne2A.png) ![](https://s3-ap-southeast-1.amazonaws.com/dwarvesf-outline/uploads/34adb8ba-29bc-4ab8-b128-fea45fade09c/63d0ce1d-54d8-4591-bd4b-5aa4c78e1025/1_Rzug5Ggbb4A8oiBXYk9_KA.png)

#### How machines learn

[https://www.youtube.com/watch?v=R9OHn5ZF4Uo](https://www.youtube.com/watch?v=R9OHn5ZF4Uo)
