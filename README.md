# Falcon: Browser Extension with AI Assistant

This was produced in support of a project for the Fall 2024 "CS6750 Human Computer Interaction" course at the Georgia Institute of Technology. The goal of the project was to go through a few iterations of the design cycle, producing a medium-fidelity and funtional prototype for user testing. This is the source code for that prototype. It is browser extension meant to provide AI assistance to help users consume and understand complex webpage content, such as research articles or white papers. In its current implementation, the extension is heavily mocked, being loaded into a simulated browser and using a mock AI agent. However, the way the prototype was built, it could be expanded upon and built into multiple browser extensions, such as ones for Chrome, Firefox, and Safari. It could use local LLMs embedded into browsers, such as Gemini Nano from Google.

The prototype was built with React ARIA, React, TypeScript and Vite in a monorepo structure, managed with npm workspaces and Turborepo.

```
├── apps/
│   ├── prototype/  # Functional prototype (simulated browser w/ mock AI)
├── packages/
|   ├── eslint-config     # Shared config for eslint
|   ├── typescript-config # Shared config for typescript
│   ├── ui/               # Shared UI components
│   ├── icons/            # SVG icons as React components
│   ├── mock-browser/     # Browser simulation for prototype
│   └── extension/        # Core extension UI and logic
```

The icons in the icons package are from [Heroicons](https://heroicons.com/).
The ui components in the ui package are based on [React Aria Components](https://react-spectrum.adobe.com/react-aria/components.html).

## Documentation

### Apps 

- [Prototype](./apps/prototype/README.md)

### Packages

- [Data](./packages/data/README.md)
- [ESLint Config](./packages/eslint-config/README.md)
- [Extension](./packages/extension/README.md)
- [Fakes](./packages/fakes/REAMDE.md)
- [Icons](./packages/icons/README.md)
- [Mock Browser](./packages/mock-browser/README.md)
- [TypeScript Config](./packages/typescript-config/README.md)
- [UI](./packages/ui/README.md)

## Development: Getting Started

Make sure you have Node.js >= 18 installed.

```bash
npm install
npm run dev
open http://localhost:5173
```

## Next Steps

- [ ] Package prototype as a Chrome extension with real AI
- [ ] Publish as downloadable package on GitHub to be sideloaded in Chrome

## Deployment

The functional prototype (with simulated browser and mock AI) is automatically deployed to [https://falcon-4sk.pages.dev/](https://falcon-4sk.pages.dev/) via Cloudflare Pages. This allows users to try it out without any installation. But they will have to use their imagination because the AI is mocked (and it's not very smart at all).
