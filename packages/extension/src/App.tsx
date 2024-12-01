import styles from "./App.module.css";

import { PaperAirplane } from "@repo/icons/paper-airplane";
import { Button } from "@repo/ui/button";
import { ComboBox } from "@repo/ui/combo-box";

const initialPrompts = [
  {
    id: crypto.randomUUID(),
    label: "Summarize this page",
    value: "Summarize this page",
  },
  {
    id: crypto.randomUUID(),
    label: "Recommend more content like this",
    value: "Recommend more content like this",
  },
];

export function App() {
  return (
    <article className={styles.app}>
      <header className={styles.header}>settings</header>
      <main className={styles.main}></main>
      <footer className={styles.footer}>
        <form className={styles.form}>
          <ComboBox
            className={styles.comboBox}
            items={initialPrompts}
            label="Message"
            placeholder="Ask anything about this page..."
          />
          <Button aria-label="Send" type="submit" isIcon isInlineSubmit>
            <PaperAirplane className={styles.buttonIcon} />
          </Button>
        </form>
      </footer>
    </article>
  );
}
