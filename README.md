# OutSideClick React

`outsideclick-react` is a lightweight React package that detects clicks outside a specified element, useful for dropdowns, modals, etc.

## Installation

```bash
npm install outsideclick-react
```

or

```bash
yarn add outsideclick-react
```

## Usage

### Hook

```javascript
import { useOutsideClick } from "outsideclick-react";

function MyComponent() {
  const handleOutsideClick = (e) => {
    // Handle outside click
  };
  const ref = useOutsideClick(handleOutsideClick);
  /* const ref = useOutsideClick(handleOutsideClick, ".ignore-element") */
  return <div ref={ref}>{/* Your component */}</div>;
}
```

### Component

```javascript
import { OutsideClick } from "outsideclick-react";

function MyComponent() {
  return (
    <OutsideClick
      onOutsideClick={() => {
        // Handle outside click
      }}
      ignoreElement=".ignore"
    >
      <div>{/* Your component */}</div>
    </OutsideClick>
  );
}
```

## API

### `useOutsideClick`

A hook that detects clicks outside of a specified element.

#### Parameters:

- **outsideClick**: `(v: HTMLElement) => void` - A function that gets called when an outside click is detected.
- **ignoreElement** (optional): `IgnoreElementType` - An element or selector that should be ignored when detecting outside clicks.

#### Returns:

- A `ref` object that should be attached to the target element.

### `OutsideClick`

A component that detects clicks outside of its children.

#### Props:

- `onOutsideClick`: Function that is called when an outside click is detected.
- `ignoreElement`: An element or selector to ignore when detecting outside clicks.

## Contribution

If you'd like to contribute, please submit a pull request.

## Support

If you want to support my work, you can buy me a coffee!

[![](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://buymeacoffee.com/rashed.iqbal)
