import { useCallback, useEffect, useRef, useState } from "react";

import styles from "./App.module.css";

import { PaperAirplane } from "@repo/icons/paper-airplane";
import { Button } from "@repo/ui/button";
import { ComboBox } from "@repo/ui/combo-box";
import { Tab, TabList, TabPanel, Tabs } from "@repo/ui/tabs";
import { Chat } from "@repo/icons/chat";
import { Clock } from "@repo/icons/clock";
import { FolderArrowDown } from "@repo/icons/folder-arrow-down";
import { Graph } from "@repo/icons/graph";
import { Message } from "@repo/ui/message";
import { AIAgent } from ".";
import { BlankSlate } from "./BlankSlate";

const initialPrompts = [
  {
    id: crypto.randomUUID(),
    label: "List the topics in this page",
    value: "List the topics in this page",
  },
  {
    id: crypto.randomUUID(),
    label: "Recommend more content like this",
    value: "Recommend more content like this",
  },
  {
    id: crypto.randomUUID(),
    label: "Summarize this page",
    value: "Summarize this page",
  },
];

const chatHistoryNotImpleted =
  "This feature is not implemented in the prototype but image that opens a previous conversation so you can view or continue it.";

const chats = [
  {
    id: crypto.randomUUID(),
    title: "Cognitive Load",
    website: "Wikipedia",
    url: "https://en.wikipedia.org/wiki/Cognitive_load",
    date: "Today, 10:00 AM",
  },
  {
    id: crypto.randomUUID(),
    title: "Generative AI as a Tool for Enhancing Reflective Learning in Students",
    website: "Arxiv",
    url: "https://arxiv.org/abs/2412.02603",
    date: "Yesterday, 2:00 PM",
  },
  {
    id: crypto.randomUUID(),
    title: "Federated Motor Imagery Classification for Privacy-Preserving Brain-Computer Interfaces",
    website: "Arxiv",
    url: "https://arxiv.org/abs/2412.01079",
    date: "Three days ago",
  },
  {
    id: crypto.randomUUID(),
    title: "That Flick is Sick: Gyroscope Integration in Xbox Controllers",
    website: "Arxiv",
    url: "https://arxiv.org/abs/2411.15538",
    date: "One week ago",
  },
  {
    id: crypto.randomUUID(),
    title: "A Survey of the State of the Art in Brain-Computer Interfaces",
    website: "Arxiv",
    url: "https://arxiv.org/abs/2411.12549",
    date: "More than a week ago",
  }
]

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
  const [prompts, setPrompts] = useState(initialPrompts);

  const mainRef = useRef<HTMLDivElement | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!mainRef.current) {
      return;
    }

    const nodes: NodeListOf<HTMLLIElement> = mainRef.current.querySelectorAll(
      "#messages-list > li"
    );
    if (!nodes.length) {
      return;
    }

    const lastNode = nodes[nodes.length - 1];
    const offset = lastNode?.offsetTop ?? 0;
    mainRef.current.scrollTo({
      top: offset - 60,
      behavior: "smooth",
    });
  }, [messages]);

  const hasPrompt = useCallback(
    (prompt: string) => {
      return prompts.some((p) => p.value === prompt);
    },
    [prompts]
  );

  const handleSavePrompt = useCallback(
    (prompt: string) => {
      if (hasPrompt(prompt)) {
        return;
      }

      setPrompts([
        ...prompts,
        { id: crypto.randomUUID(), label: prompt, value: prompt },
      ]);
    },
    [prompts, setPrompts]
  );

  const handlePrompt = useCallback(
    (prompt: string) => {
      const nextMessages = [
        ...messages,
        {
          author: "me" as const,
          body: prompt,
          id: crypto.randomUUID(),
          initials: "ME" as const,
        },
      ];
      setIsLoading(true);
      setMessages(nextMessages);

      setTimeout(async () => {
        setIsLoading(false);
        const response = await aiAgent.prompt(prompt);
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
    [aiAgent, messages, setMessages]
  );

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

      handlePrompt(message);
    },
    [getSelection, handlePrompt]
  );

  const handleHistoryItemClick = useCallback(() => {
    alert(
      "Not implemented in prototype but it would open this previous conversation for viewing or continuation"
    );
  }, []);

  return (
    <Tabs>
      <TabList aria-label="Features">
        <Tab id="chat">
          <Chat className={styles.tabIcon} />
          Chat
        </Tab>
        <Tab id="history">
          <Clock className={styles.tabIcon} />
          History
        </Tab>
        <Tab id="graph">
          <Graph className={styles.tabIcon} />
          Graph
        </Tab>
      </TabList>
      <TabPanel id="chat">
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
                    {message.author === "me" && !hasPrompt(message.body) && (
                      <div className={styles.promptActions}>
                        <a
                          className={styles.savePrompt}
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            handleSavePrompt(message.body);
                          }}
                        >
                          <FolderArrowDown className={styles.savePromptIcon} />{" "}
                          Save
                        </a>
                      </div>
                    )}
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
                  <div className={styles.blankSlateActions}>
                    {prompts.map((prompt) => (
                      <Button
                        key={prompt.id}
                        onPress={() => handlePrompt(prompt.value)}
                      >
                        {prompt.value}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </main>
          <footer className={styles.footer}>
            <form className={styles.form} onSubmit={handleSubmit}>
              <ComboBox
                className={styles.comboBox}
                name="message"
                items={prompts}
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
      </TabPanel>
      <TabPanel id="history">
        <article className={styles.history}>
          <ul>
            {chats.map((chat) => (
              <li className={styles.chatHistoryItem} key={chat.id}>
                <a href="#" onClick={handleHistoryItemClick} title={`View chat about ${chat.title}`}>
                  <h3>{chat.title}</h3>
                  <p>
                    {chat.website} | Accessed {chat.date}
                  </p>
                  <p>
                    {chat.url}
                  </p>
                </a>
              </li>
            ))}
          </ul>
        </article>
      </TabPanel>
      <TabPanel id="graph" className={styles.graph}>
        <p>Coming soon</p>
      </TabPanel>
    </Tabs>
  );
}
