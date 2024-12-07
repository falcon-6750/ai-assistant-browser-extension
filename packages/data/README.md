# Data

This package exports data that can be used in other apps and packages in this repo.

## Example Usage

Within this repo, add this package as a dependency to another package or app by updating its `package.json` file.

```json
{
  "name": "some-other-package", // another package in this repo.
  "version": "0.0.0",
  "dependencies": {
    "@repo/data": "*", // import this data package.
  }
}
```

Then use it in a file.

```ts
import { prompts } from "@repo/data/prompts"

console.log(prompts)
```
