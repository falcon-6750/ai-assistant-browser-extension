import { useCallback, useState } from "react";

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
  const [messages, setMessages] = useState<
    {
      author: "me" | "Falcon AI";
      id: string;
      message: string;
    }[]
  >([]);

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const formData = new FormData(event.currentTarget);
      console.log(formData);
      const message = formData.get("message") as string;

      setMessages([
        ...messages,
        {
          author: "me",
          id: crypto.randomUUID(),
          message,
        },
      ]);
    },
    [messages, setMessages]
  );

  return (
    <article className={styles.app}>
      <header className={styles.header}>settings</header>
      <main className={styles.main}>
        {messages.length > 0 && (
          <ul>
            {messages.map((message) => (
              <li key={message.id}>{message.message}</li>
            ))}
          </ul>
        )}
      </main>
      <footer className={styles.footer}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <ComboBox
            className={styles.comboBox}
            name="message"
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
