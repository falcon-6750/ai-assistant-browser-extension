# Falcon: Browser Extension with AI Assistant

This was a project by Falcon Team for the Fall 2024"CS6750 Human Computer Interaction" course at the Georgia Institute of Technology.

It is a functional prototype of a browser extension. The browser exstension is meant to provide an AI assistant to help users consume and understand webpage content. It is especially useful for digesting long and/or complex content, such as research papers.

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
