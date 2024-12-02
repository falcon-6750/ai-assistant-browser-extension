import { useCallback, useEffect, useRef, useState } from "react";

import styles from "./App.module.css";

import { PaperAirplane } from "@repo/icons/paper-airplane";
import { Button } from "@repo/ui/button";
import { ComboBox } from "@repo/ui/combo-box";
import { Message } from "@repo/ui/message";
import { AIAgent } from ".";
import { BlankSlate } from "./BlankSlate";

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

export function App({
  aiAgent,
  getSelection,
}: {
  aiAgent: AIAgent;
  getSelection: () => Promise<string>;
}) {
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
    if (!mainRef.current) {
      return;
    }

    const nodes = mainRef.current.querySelectorAll("#messages-list > li");
    if (!nodes.length) {
      return;
    }

    const lastNode = nodes[nodes.length - 1];
    lastNode?.scrollIntoView({
      block: "nearest",
      inline: "nearest",
      behavior: "smooth",
    });
  }, [messages]);

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const formData = new FormData(event.currentTarget);
      let message = ((formData.get("message") as string) ?? "").trim();
      if (!message) return;

      event.currentTarget.reset();

      const selection = await getSelection();
      if (selection) {
        message = `${message}\n\nUsing this selection:\n\n ${selection}`;
      }

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
      }, 2000);
    },
    [aiAgent, getSelection, messages, setMessages]
  );

  return (
    <article className={styles.app}>
      <main className={styles.main} ref={mainRef}>
        {messages.length > 0 && (
          <ul id="messages-list" className={styles.messages}>
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
        {messages.length === 0 && (
          <div className={styles.blankSlate}>
            <div>
              <BlankSlate />
              <h2 className={styles.blankSlateTitle}>Welcome human!</h2>
              <p className={styles.blankSlateDescription}>
                Ask anything, I'm bored.
              </p>
            </div>
          </div>
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
