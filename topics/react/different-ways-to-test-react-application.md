---
title: Different ways to test React application
description: Learn effective React testing methods including unit tests with react-testing-library, hook testing with react-hooks-testing-library, and end-to-end tests with Cypress for reliable carousel component validation.
date: 2019-06-06
tags:
  - react
redirect:
  - /s/dfvIaw
---

![](assets/different-ways-to-test-react-application_b057b9816631efa15334f5edbd90c8ea_md5.webp)

## Introduction

There are 2 practical types of testing a front end application: test its implementation details (unit test, integration test combine with assert states of the component being tested) or testing its behavior base on perspective (e2e, integration test).

The content below assumes you already know about React hook (which is a new feature of React 16.08)

This is a repository link: <https://github.com/phmngocnghia/TestReactComponent>
This repository contains source code for the carousel component which we gonna test.

## Carousel is specifications

![](assets/different-ways-to-test-react-application_873b9dc0badda67e3d5ef65f63c7d160_md5.webp)

- When press right arrow, the next image will be displayed by the slide in animation
- When press left arrow, the previous image will be displayed by the slide out animation
- When the last image displayed and the right arrow pressed then the slider will display the first image.
- The same thing happened to the first image and the left button.

## Unit testing using component react-testing-library

The react-testing-library is a very light-weight solution for testing React components. It provides light utility functions on top of react-dom and react-dom/test-utils, in a way that encourages better testing practices.

The react-hooks-testing-library allows you to create a simple test harness for React hooks that handles running them within the body of a function component, as well as providing various useful utility functions for updating the inputs and retrieving the outputs of your amazing custom hook.

To run integration tests for the application in the repository above, you can run the command:

`yarn test` — This command will execute all unit test for the carousel component.

To test React component using react-testing-utility, we mount it with the render function exposed by the library @testing-library/react. Then we use object spread notation to extract utility functions such as getById, getByText… etc.

Their purpose is used for select element purpose. The return value would be a dom element. You can view all selector function from render function at <https://testing-library.com/docs/dom-testing-library/api-queries>

When you’re writing tests, you often need to check that values meet certain conditions. `assert function` gives you access to an API that let you validate different things. the API of an assertion function depends on what kind of assert library your test run on. The example below used Jest as both test runner and assertion library, more details at <https://jestjs.io/docs/en/getting-started>

```javascript
import { render, cleanup } from "@testing-library/react";

it("arrow left handler event set currentIndex (initialised) from 1 to 2 when invoked", () => {
  const { getByTestId } = render(<App />);

  const rightArrowButton = getByTestId("rightCarouselArrowButton");
  rightArrowButton.click();

  expect(global.exposedCarouselComponentData.currentImageIndex).toBe(1);
});
```

Different when compare to enzyme, we can’t assert and access states of the function component when testing. We exposed it variable outside to global object and assert when testing:

```javascript
// Expose data out for testing process
if (process.env.REACT_APP_IS_TEST_MODE === "true") {
  global.exposedCarouselComponentData = {
    arrowLeftOnClick,
    arrowRightClick,
    currentImageIndex,
  };
}
```

**Pros:** Blazing fast

**Cons:**

- Some DOM limitations such as Observer, no layout engine…
- Not support feature to assert component hook detail

**Best use for:** Test implement detail while developing. Assert state by exposing the state to the global object

## Testing React using react-testing-hook-library

Hook function not only allows us to use features of the class component inside the functional component, extract and reuse many repetitive logic patterns but also allow us to extract the logic belong specific domain of that component to an isolated part.

```javascript
const Carousel = ({
  currentFocusImageIndex,
  onChangeNext,
  onChangePrev,
  children = [],
}) => {
  const containerRef = useRef();

  const { widthOfInnerContainer, containerWidth } =
    useCarouselReactResizeObserver({
      containerRef,
      childrenLength: children.length,
    });

  const { setCurrentImageIndex, currentImageIndex } = useCarouseSetImageIndex({
    childrenLength: children.length,
    displayPaginator: 10,
  });

  // Handle dnd
  const arrowRightClick = () => {
    // From the item in last index move backward 1 item
    if (currentImageIndex === children.length - 1) {
      setCurrentImageIndex(0);
      return;
    }

    setCurrentImageIndex(currentImageIndex + 1);
  };

  const arrowLeftOnClick = () => {
    // From the item index 0 move backward 1 item
    if (currentImageIndex === 0) {
      setCurrentImageIndex(children.length - 1);
      return;
    }

    setCurrentImageIndex(currentImageIndex - 1);
  };

  // Expose data out for testing process
  if (process.env.REACT_APP_IS_TEST_MODE === "true") {
    global.exposedCarouselComponentData = {
      arrowLeftOnClick,
      arrowRightClick,
      currentImageIndex,
    };
  }

  return (
    // Copy div from outter container and watch for size change
    <div className={innerContainer} ref={containerRef}>
      {/* Arrow */}
      <button
        data-testid="leftCarouselArrowButton"
        className={arrowButton}
        onClick={arrowLeftOnClick}
      >
        <FaChevronLeft size="25" color="white" />
      </button>
      <button
        data-testid="rightCarouselArrowButton"
        className={[arrowButton, arrowButtonRight].join(" ")}
        onClick={arrowRightClick}
      >
        <FaChevronRight size="25" color="white" />
      </button>

      {/* Use for transit slide */}
      <div
        data-testid="carouselContainer"
        className={container}
        style={{
          width: widthOfInnerContainer,
          transform: `translateX(-${currentImageIndex * containerWidth}px)`,
        }}
      >
        {/* slide container */}
        {children.map((element) => (
          <div
            data-testid="CarouselChildContainer"
            className={childContainer}
            style={{
              width: containerWidth,
            }}
          >
            {element}
          </div>
        ))}
      </div>
    </div>
  );
};
```

In the code above, the logic of the hook may only use apply to carousel-component and may not apply to other components but it solves a specific problem of the carousel component so I extract it into a hook.

```javascript
import { useState, useEffect, useMemo } from "react";

export default ({
  childrenLength,
  initialImageIndex = 0,
  numDisplayPaginator,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    setCurrentImageIndex(initialImageIndex);
  }, [initialImageIndex]);

  const endOfTheLeftMiddle = useMemo(() => {
    return numDisplayPaginator / 2 + 1;
  }, [numDisplayPaginator]);

  const minDisplayPaginatorIndex = useMemo(() => {
    // * Case 1: index in 1 -> (numDisplayPaginator/ 2)
    if (1 >= currentImageIndex && currentImageIndex <= endOfTheLeftMiddle) {
      return 0;
    }

    // * Case 2: index + 1 > (numDisplayPaginator / 2)
    let offset = currentImageIndex - endOfTheLeftMiddle;
    let maxDisplayPaginatorIndex = offset + numDisplayPaginator;

    if (maxDisplayPaginatorIndex >= childrenLength) {
      offset -= maxDisplayPaginatorIndex - childrenLength;
    }

    return 1 + offset;
  }, [
    childrenLength,
    currentImageIndex,
    endOfTheLeftMiddle,
    numDisplayPaginator,
  ]);

  const maxDisplayPaginatorIndex = useMemo(() => {
    // * Case 1: index in 1 -> (numDisplayPaginator/ 2)
    if (1 >= currentImageIndex && currentImageIndex <= numDisplayPaginator) {
      return numDisplayPaginator;
    }

    // * Case 2: index + 1 > (numDisplayPaginator / 2)
    const offset = currentImageIndex - endOfTheLeftMiddle;
    let maxDisplayPaginatorIndex = offset + numDisplayPaginator;

    if (maxDisplayPaginatorIndex >= childrenLength) {
      maxDisplayPaginatorIndex = childrenLength;
    }

    return maxDisplayPaginatorIndex;
  }, [
    childrenLength,
    currentImageIndex,
    endOfTheLeftMiddle,
    numDisplayPaginator,
  ]);

  return {
    currentImageIndex,
    setCurrentImageIndex,
    maxDisplayPaginatorIndex,
    minDisplayPaginatorIndex,

    // Testing purpose
    endOfTheLeftMiddle,
  };
};
```

Test a hook is very identical when we test against react component. We using the render hook function to mount the hook. the result of the function would be the instance of the hook. Where you can access all property of the hooks such as Its states or its function as long as you return the data you want to access from the hook.

```javascript
import { renderHook, act } from "react-hooks-testing-library";
import useCarouseImageIndex from "../../components/Carousel/useCarouseSetImageIndex";

it("return correct end of the left middle of display paginator number", () => {
  const { result } = renderHook(() =>
    useCarouseImageIndex({
      childrenLength: 100,
      initialImageIndex: 0,
      numDisplayPaginator: 10,
    }),
  );

  expect(result.current.endOfTheLeftMiddle).toBe(6);
});
```

**Pros:**

- Same as react testing library
- Since we could extract hooks to test it in an isolated environment, we don’t have to manually expose it to the global variable.

**Cons:** Can only use for test hook of functional react component.

**Best use for:** Test implement detail while developing.

## E2e test using Cypress

End-to-end testing is awesome because it mirrors the user’s experience. Where you might need a ton of unit tests to get good coverage (the kind where you test that a function returns a value you expect).

E2e test using cypress is executed by cypress test runner. With cy instance, Its exposed some utility functions such as visit page, query selector on that page, assert if the selector existed and many more.

```javascript
it("Render container of child cotainer equal the width of wrapper container (that wrap carousel component)", async () => {
  cy.visit("http://localhost:3000");
  cy.viewport(1920, 1080);
  cy.wait(200);
  cy.getByTestId("testCarouselContainer").then((elem) => {
    const carouselContainerWidth = elem[0].clientWidth;
    cy.getAllByTestId("testCarouselContainer").then(
      (carouselChildContainers) => {
        for (let carouselChildContainer of carouselChildContainers) {
          expect(carouselChildContainer.clientWidth).to.be.equal(
            carouselContainerWidth,
          );
        }
      },
    );
  });
});
```

- visit command: visit a web page
- viewport: set it screen size with a specific size
- wait: wait for specific time
- getByTestId: get element on page by data-testId. Since this command run asynchronously, we need to chain it then to get It’s result. The way Its asynchronous API work is like Promise API but it, not a Promise so we can’t wait for it using ES6 await syntax. If you want await it, you can use cypress-promise library which allows wrapping cypress statemen in a function that return a promise so you can await it

```javascript
import promisify from "cypress-promise";

it("Render container of child cotainer equal the width of wrapper container (that wrap carousel component) - Resize version", async () => {
  cy.visit("http://localhost:3000");
  cy.viewport(1920, 1080);
  // Give obersve resizer some time for react
  cy.wait(100);
  cy.viewport(800, 1600);
  cy.wait(250);

  const elem = await promisify(cy.getByTestId("testCarouselContainer"));
  const carouselContainerWidth = elem[0].clientWidth;
  cy.getAllByTestId("testCarouselContainer").then((carouselChildContainers) => {
    for (let carouselChildContainer of carouselChildContainers) {
      expect(carouselChildContainer.clientWidth).to.be.equal(
        carouselContainerWidth,
      );
      expect(carouselChildContainer.clientWidth).to.be.equal(800);
    }
  });
});
```

You can view Its full API detail at <https://docs.cypress.io/api/api/table-of-contents.html>
To run e2e tests for the application in the repository above, you can run the command:

- yarn e2e — It’s run cypress test in headless mode
- yarn e2e:open — Open cypress dashboard which is a great feature of cypress when compare to other e2e testings tools.

**Pros:**

- Native browser environment
- Very fast, e2e test just feel like doing integration test or unit test

**Cons:**

- Very simple DOM event support, compared to other tools like TestCafe in some features like drag and drop and upload file won’t work properly or require custom plugins or tricks to work with.
- Although e2e test using cypress feel very fast and smooth, it’s the lowest way to test react application compare to other test methods (unit test, integration test)

**Best use for:**

- Testing as user perspective

## Conclusion

I’m writing this mainly as a reference for myself, but hopefully, other people will find this useful as well.

Reference links:

- [https://testing-library.com/docs/react-testing-library/api](https://testing-library.com/docs/react-testing-library/api)
- [https://github.com/testing-library/react-testing-library](https://github.com/testing-library/react-testing-library)
- [https://www.cypress.io/](https://www.cypress.io/)
- [https://www.cypress.io/](https://www.cypress.io/)[https://jestjs.io/docs/en/expect.html](https://jestjs.io/docs/en/expect.html)
