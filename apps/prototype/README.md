# Prototype

This project is exploring a user interface for a browser extension. It is the goal to get user feedback on the prototype. However, browser extensions are difficult to share with users as they require downloading and installing software on the end-user's machine. This prototype was built to demonstrate the extension for early user testing. It shows the extenion in a simulated browser window so users are put into the proper context for interacting with it. At this stage, the extension is heavily mocked, using a fake AI Agent. This was done because the plan for the extension was to use Gemini Nano which is an embedded LLM in Chrome, however we could not rely on users having this installed because (1) they may be on a different browser and (2) Gemini Nano is not broadly available at the time of this writing (Dec 5, 2024) and so it needs to enabled via Chrome feature flags. Building the extenion out with a fake AI agent in a simulated browser allows for maximizing the base of potential users to test the prototype with although it is limited and contrived compared to a real browser extension experiencing using an actual AI agent. Nonetheless, for early staging prototyping and feedback, this should be an acceptable compromise.

This app was scaffoled with Vite using its CLI: `npm create vite@latest` with React and TypeScript options. The scaffolding was then adapted for this app and the app was built upon it.

## Getting Started

```
npm install
npm run dev
open localhost:5173
```
