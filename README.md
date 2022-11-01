# OutSideClick React

A React component and a hook to detect outside click.

## Installation

```bash
npm i outsideclick-react
```

## How to use

### Use Hook

```javascript
import React from "react";
import { useOutsideClick } from "outsideclick-react";

function Example() {
    const ref = useOutsideClick(handleOutsideClick)
    const handleOutsideClick = (e){
        console.log(e)
    }
    return(
        <div ref={ref}>
            <h1>Detect Outside Click</h1>
        </div>
    )
}
export default Example
```

### Use React Component

```javascript
import React from "react";
import { OutsideClick } from "outsideclick-react";

function Example() {
    const handleOutsideClick = (e){
        console.log(e)
    }
    return(
        <OutsideClick onOutsideClcik={handleOutsideClick}>
            <h1>Detect Outside Click</h1>
        </OutsideClick>
    )
}
export default Example
```

NB: OutsideClick react component return a div, It supports all div element property
