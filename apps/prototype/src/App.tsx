import { useRef, useState } from "react";

import styles from "./App.module.css";

import { Extension, EXTENSION_NAME } from "@repo/extension";
import { MockBrowser } from "@repo/mock-browser";

import { prompts } from "@repo/data/prompts";

import { FakeAIAgent } from "@repo/fakes/ai-agent";
import { fakeBrowser } from "@repo/fakes/browser";
import { chats } from "@repo/fakes/chats";
import { edges } from "@repo/fakes/edges";
import { nodes } from "@repo/fakes/nodes";

function App() {
  const mockBrowserRef = useRef<HTMLDivElement | null>(null);
  const [site, setSite] = useState<{
    name: string;
    url: string;
  }>({
    name: "Cognitive Load | Wikipedia",
    url: "https://en.wikipedia.org/wiki/Cognitive_load"
  })

  return (
    <div className={styles.app} ref={mockBrowserRef}>
      <div className={styles.container}>
        <MockBrowser
          extensionName={EXTENSION_NAME}
          websiteName={site.name}
          websiteUrl={site.url}
        >
          <Extension
            aiAgent={new FakeAIAgent("You are a helpful assistant.")}
            browser={fakeBrowser}
            changeSite={setSite}
            currentSite={site}
            savedChats={chats}
            savedEdges={edges}
            savedNodes={nodes}
            savedPrompts={prompts}
          />
        </MockBrowser>
      </div>
    </div>
  );
}

export default App;
