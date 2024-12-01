import styles from "./App.module.css";

//import { Button } from "@repo/ui/button";
import { MockBrowser } from "@repo/mock-browser";

function App() {
  return (
    <div className={styles.app}>
      <MockBrowser />
    </div>
  );
}

export default App;
