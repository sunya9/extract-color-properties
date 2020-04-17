# extract-color-properties

Extracts the properties related to the color in the selector that are wrapped in media query.

Before:

```css
.foo {
  width: 100px;
  color: white;
  background-color: black;
}

@media (prefers-color-scheme: dark) {
  .foo {
    width: 100px;
    color: black;
    background-color: white;
  }
}
```

After:

```css
.foo {
  width: 100px;
  color: white;
  background-color: black;
}

@media (prefers-color-scheme: dark) {
  .foo {
    color: black;
    background-color: white;
  }
}
```

## How to use

### postcss.config.js

```js
module.exports = {
  plugins: {
    require('extract-color-properties')({ excludeProperties: [''] })
  }
}
```

### programmatically

```js
const {
  extractColorProperties,
} = require('extract-color-properties/lib/extract-color-properties')
const result = extractColorProperties('.foo { color: black }')
```

## Configuration

- `excludeProperties: string[]`: Set the properties to be excluded from the deletion target.
