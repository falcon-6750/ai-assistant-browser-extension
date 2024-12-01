import styles from "./App.module.css";

//import { Button } from "@repo/ui/button";
import { Extension, EXTENSION_NAME } from "@repo/extension";
import { MockBrowser } from "@repo/mock-browser";

function App() {
  return (
    <div className={styles.app}>
      <MockBrowser
        extensionName={EXTENSION_NAME}
        websiteName="Cognitive Load | Wikipedia"
        websiteUrl="https://en.wikipedia.org/wiki/Cognitive_load"
      >
        <Extension />
      </MockBrowser>
    </div>
  );
}

export default App;
