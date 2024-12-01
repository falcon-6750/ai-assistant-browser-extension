import styles from "./App.module.css";

import { Extension, EXTENSION_NAME } from "@repo/extension";
import { MockBrowser } from "@repo/mock-browser";

import { FakeAIAgent } from "./fake-ai-agent";

function App() {
  return (
    <div className={styles.app}>
      <MockBrowser
        extensionName={EXTENSION_NAME}
        websiteName="Cognitive Load | Wikipedia"
        websiteUrl="https://en.wikipedia.org/wiki/Cognitive_load"
      >
        <Extension aiAgent={new FakeAIAgent("You are a helpful assistant.")} />
      </MockBrowser>
    </div>
  );
}

export default App;
