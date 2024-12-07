# UI

This package exports React components, ready to use in another React app or package. You can extend them with custom styles if needed. The components are based off of [React Aria Components](https://react-spectrum.adobe.com/react-aria/components.html).

## Example Usage

Within this repo, add this package as a dependency to another package or app by updating its `package.json` file.

```json
{
  "name": "some-other-package",
  "version": "0.0.0",
  "dependencies": {
    "@repo/ui": "*", // Import this icon package.
  }
}
```

Then import a component into a React component to use it.

```tsx
import { Tab, TabList, TabPanel, Tabs } from "@repo/ui/tabs";

export function Component() {
  return (
    <Tabs>
      <TabList aria-label="Sections">
        <Tab id="section-1">Section 1</Tab>
        <Tab id="section-2">Section 2</Tab>
        <Tab id="section-3">Section 3</Tab>
      </TabList>
      <TabPanel id="section-1">
        Section 1 content shown when Section 1 selected
      </TabPanel>
      <TabPanel id="section-2">
        Section 2 content shown when Section 1 selected
      </TabPanel>
      <TabPanel id="section-3">
        Section 3 content shown when Section 1 selected
      </TabPanel>
    </Tabs>
  )
}
```
