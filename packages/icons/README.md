# Icons

This package exports icons from [Heroicons](https://heroicons.com/). The icons are exported as React components, ready to use in another React app or package. Supply your own styles.

## Example Usage

Within this repo, add this package as a dependency to another package or app by updating its `package.json` file.

```json
{
  "name": "some-other-package", // another package in this repo.
  "version": "0.0.0",
  "dependencies": {
    "@repo/icons": "*", // import this icon package.
  }
}
```

Then create a style for the icon in a `css` module file.

```css
.icon {
  height: 1rem;
  width: 1rem;
}
```

Then import the css module and icon into a React component to use it.

```tsx
import styles from './icon.module.css' // path to css module file.

import { ArrowLeft } from "@repo/icons/ArrowLeft"

export function Component() {
  return <ArrowLeft className={styles.icon}>
}
```

