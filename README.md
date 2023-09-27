# OutSideClick React

`outsideclick-react` is a lightweight React package that provides a hook and component for detecting clicks outside of a specified element. This can be useful for creating dropdown menus, modals, and other UI components that need to close when the user clicks outside of them.

## Installation

You can install outsideclick-react using NPM or Yarn:

```bash
npm install outsideclick-react
```

or

```bash
yarn add outsideclick-react
```

## How to use

### Hook Usage

A hook that returns a `ref` object that can be attached to a target element to detect clicks outside of it.

```javascript
import { useOutsideClick } from "outsideclick-react";

function MyComponent() {
    const handleOutsideClick = (e)=> {
        // Handle outside click
    }
    const ref = useOutsideClick(handleOutsideClick)
    return(
        <div ref={ref}>
            {/* Your component */}
        </div>
    )
}
```

In this example, we're using the `useOutsideClick` hook returns a `ref` object that can be used to detect clicks outside of an element. Pass in a `handleOutsideClick` function as a parameter to the hook, and when a click outside of the target element is detected, the function is called with the event object as the argument. This allows you to perform any necessary actions in response to the click.

### Component Usage

Alternatively, you can use the `OutsideClick` component provided by the package to wrap your component:

```javascript
import { OutsideClick } from 'outsideclick-react'

function MyComponent() {
    return (
        <OutsideClick
            onOutsideClick={() => {
                // Handle outside click
            }}
        >
            <div>{/* Your component */}</div>
        </OutsideClick>
    )
}
```

In the example above, we use the OutsideClick component to wrap our component and pass a callback function to the onOutsideClick prop that will be called when a click occurs outside of the wrapped element.

> Note: The `OutsideClick` component returns a div element and supports all of the properties of a standard div element.

<br/>
If you'd like to contribute, please do submit a pull request.

In case you want support my work

[!["Buy Me A Coffee"](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://buymeacoffee.com/rashed.iqbal)
