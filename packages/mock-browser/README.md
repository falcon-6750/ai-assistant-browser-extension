# Mock Browser

This package exports a simulated web browser that can be used to demonstrated a sidepanel browser extension.

## Example Usage

Within this repo, add this package as a dependency to another package or app by updating its `package.json` file.

```json
{
  "name": "some-other-package", // another package in this repo.
  "version": "0.0.0",
  "dependencies": {
    "@repo/mock-browser": "*" // impport this mock browser package.
  }
}
```

Then import a sidepanel extension and the mock browser into a React component to use it.

```tsx
import { extension, EXTENSION_NAME } from "@repo/extension" // sidepanel extension

import { MockBrowser } from "@repo/mock-browser"

export function Component() {
  return (
    <MockBrowser
      {/* shown on hover over sidepanel extension icon in browser toolbar */}
      extensionName={EXTENSION_NAME}

      {/* shown in browser tab */}
      websiteName="Cognitive Load | Wikipedia"

      {/* page to load in browser window */}
      websiteUrl="https://en.wikipedia.org/wiki/Cognitive_load"
    >
      {/* sidepanel extension to render in sidepanel */}
      <Extension aiAgent={() => {}} getSelection={() => {}} />
    </MockBrowser>
  )
}
```