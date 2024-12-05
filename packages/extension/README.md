# Extension

This package implements a browser extension meant to be shown in a sidepanel browser extension.

The extension is implemented as a package instead of a standalone app because it is meant to be used with an adapter pattern. Apps can be created for various browser extensions, such as Chrome, Firefox, and Safari, by importing and adapting this extension.

## Example Usage

Within this repo, add this package as a dependency to another app by updating its `package.json` file.

```json
{
  "name": "chrome-extension", // another app in this repo.
  "version": "0.0.0",
  "dependencies": {
    "@repo/extension": "*" // import this extension package.
  }
}
```

Then import the extension pattern into a React component to build an extension for a specific browser (or even a prototype of a browser extension that can be used by anyone on the web, as was originally done in this project).

```tsx
import { extension } from "@repo/extension"

// Import an aiAgent and browser implemention of your own creation.
// See Browser and AIAgent interfaces in @repo/extension/index.tsx for
// how to implement these.
import { aiAgent, browser } from "./services"

const extensionOptions = {
  aiAgent,
  browser,
}

export function ChromeBrowserExtension() {
  return (
    <Extension {...extensionOptions} />
  )
}
```

