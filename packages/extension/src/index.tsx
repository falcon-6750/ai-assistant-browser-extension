import { App } from "./App";

const EXTENSION_NAME = "Falcon AI";

interface AIAgent {
  readonly instructions: string;
  prompt(input: string): Promise<string>;
}

export { type AIAgent, App as Extension, EXTENSION_NAME };
