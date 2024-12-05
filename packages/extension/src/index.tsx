import { App } from "./App";

const EXTENSION_NAME = "Falcon AI";

interface AIAgent {
  readonly instructions: string;
  prompt(input: string): Promise<string>;
}

interface Browser {
  getSelection: () => Promise<string>;
}

interface SavedPrompt {
  id: string;
  label: string;
  value: string;
}

export {
  type AIAgent,
  type Browser,
  type SavedPrompt,
  App as Extension,
  EXTENSION_NAME,
};
