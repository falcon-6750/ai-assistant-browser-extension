import { useCallback, useRef } from "react";

import styles from "./App.module.css";

import { Extension, EXTENSION_NAME } from "@repo/extension";
import { MockBrowser } from "@repo/mock-browser";

import { prompts } from "@repo/data/prompts";

import { FakeAIAgent } from "./fake-ai-agent";

function App() {
  const mockBrowserRef = useRef<HTMLDivElement | null>(null);

  const getSelection = useCallback(async () => {
    return "";
  }, []);

  return (
    <div className={styles.app} ref={mockBrowserRef}>
      <div className={styles.container}>
        <MockBrowser
          extensionName={EXTENSION_NAME}
          websiteName="Cognitive Load | Wikipedia"
          websiteUrl="https://en.wikipedia.org/wiki/Cognitive_load"
        >
          <Extension
            aiAgent={new FakeAIAgent("You are a helpful assistant.")}
            browser={{ getSelection }}
            savedPrompts={prompts}
          />
        </MockBrowser>
      </div>
    </div>
  );
}

export default App;
