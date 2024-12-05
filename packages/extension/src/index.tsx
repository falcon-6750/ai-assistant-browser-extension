import { App } from "./App";

const EXTENSION_NAME = "Falcon AI";

interface AIAgent {
  readonly instructions: string;
  prompt(input: string): Promise<string>;
}

interface Browser {
  getSelection: () => Promise<string>;
}

export { type AIAgent, type Browser, App as Extension, EXTENSION_NAME };
