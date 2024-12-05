# Fakes

This package implements fakes that can be used in mocks, simulations, tests, etc.

## Example Usage

Within this repo, add this package as a dependency to another package or app by updating its `package.json` file.

```json
{
  "name": "some-other-package", // another package in this repo.
  "version": "0.0.0",
  "dependencies": {
    "@repo/fakes": "*", // import this fakes package.
  }
}
```

Then use it in a file. 

```ts
import { fakeBrowser } from "@repo/fakes/fake-browser"

void fakeBrowser.getSelection()
```
