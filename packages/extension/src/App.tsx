import { useCallback, useEffect, useRef, useState } from "react";

import styles from "./App.module.css";

import { PaperAirplane } from "@repo/icons/paper-airplane";
import { Button } from "@repo/ui/button";
import { ComboBox } from "@repo/ui/combo-box";
import { Message } from "@repo/ui/message";
import { AIAgent } from ".";

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

export function App({ aiAgent }: { aiAgent: AIAgent }) {
  const [messages, setMessages] = useState<
    {
      author: "me" | "Falcon AI";
      id: string;
      initials: "ME" | "AI";
      body: string;
    }[]
  >([]);

  const mainRef = useRef<HTMLDivElement | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    mainRef.current?.scrollTo({ top: mainRef.current.scrollHeight });
  }, [messages]);

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const formData = new FormData(event.currentTarget);
      const message = ((formData.get("message") as string) ?? "").trim();
      if (!message) return;

      const nextMessages = [
        ...messages,
        {
          author: "me" as const,
          body: message,
          id: crypto.randomUUID(),
          initials: "ME" as const,
        },
      ];
      setIsLoading(true);
      setMessages(nextMessages);

      setTimeout(async () => {
        setIsLoading(false);
        const response = await aiAgent.prompt(message);
        setMessages([
          ...nextMessages,
          {
            author: "Falcon AI",
            body: response,
            id: crypto.randomUUID(),
            initials: "AI",
          },
        ]);
      }, 3000);

      event.currentTarget.reset();
    },
    [aiAgent, messages, setMessages]
  );

  return (
    <article className={styles.app}>
      <header className={styles.header}>settings</header>
      <main className={styles.main} ref={mainRef}>
        {messages.length > 0 && (
          <ul className={styles.messages}>
            {messages.map((message) => (
              <li key={message.id}>
                <Message
                  author={message.author}
                  body={message.body}
                  initials={message.initials}
                  isBordered={message.author === "me"}
                />
              </li>
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
          <Button
            aria-label="Send"
            type="submit"
            isIcon
            isInlineSubmit
            isDisabled={isLoading}
          >
            <PaperAirplane className={styles.buttonIcon} />
          </Button>
        </form>
      </footer>
    </article>
  );
}
