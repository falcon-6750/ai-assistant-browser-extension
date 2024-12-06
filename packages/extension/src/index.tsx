import { App } from "./App";

const EXTENSION_NAME = "Falcon AI";

interface AIAgent {
  readonly instructions: string;
  prompt(input: string): Promise<string>;
}

interface Browser {
  getSelection: () => Promise<string>;
}

interface ChatMessage {
  author: "me" | "Falcon AI";
  id: string;
  initials: "ME" | "AI";
  body: string;
}

interface SavedChat {
  id: string;
  title: string;
  website: string;
  url: string;
  date: string;
  messages: ChatMessage[];
}

interface SavedEdge {
  source: string;
  target: string;
  id: string;
  label: string;
}

interface SavedNode {
  id: string;
  label: string;
  fill: string;
  data: {
    type: string;
    segment?: string;
  };
}

interface SavedPrompt {
  id: string;
  label: string;
  value: string;
}

export {
  type AIAgent,
  type Browser,
  type ChatMessage,
  type SavedChat,
  type SavedEdge,
  type SavedNode,
  type SavedPrompt,
  App as Extension,
  EXTENSION_NAME,
};
