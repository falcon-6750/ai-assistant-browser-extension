import { useCallback, useEffect, useRef, useState } from "react";
import { GraphCanvas } from "reagraph";

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

// TODO: Once chat history is saved, reset the chat and load a new url into the iframe.
//       This will let the user start and save a new conversation.
//       When that conversation is finished, the user can save it and add it to the chat history.
//       The new topic will be added to the graph.
//       Reload the oringal URL and run in a loop.

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
  "This feature is not implemented in the prototype but imagine that clicking this link opens the conversation so you can review it or carry on with the conversation.";

const chats = [
  /**
   * TODO: Save the current chat history and then add this entry to chats.
   {
    id: crypto.randomUUID(),
    title: "Cognitive Load",
    website: "Wikipedia",
    url: "https://en.wikipedia.org/wiki/Cognitive_load",
    date: "Today, 10:00 AM",
  },
  */
  {
    id: crypto.randomUUID(),
    title:
      "Generative AI as a Tool for Enhancing Reflective Learning in Students",
    website: "Arxiv",
    url: "https://arxiv.org/abs/2412.02603",
    date: "Yesterday, 2:00 PM",
  },
  {
    id: crypto.randomUUID(),
    title:
      "Federated Motor Imagery Classification for Privacy-Preserving Brain-Computer Interfaces",
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
  },
  {
    id: crypto.randomUUID(),
    title:
      "Gaming I, II, and III: Arcades, Video Game Systems, and Modern Game Streaing Services",
    website: "Sage Journals",
    url: "https://journals.sagepub.com/doi/abs/10.1177/15554120231186634",
    date: "More than a week ago",
  },
  {
    id: crypto.randomUUID(),
    title: "Preliminary forensic analysis of the XBox One",
    website: "Elsevier",
    url: "https://www.sciencedirect.com/science/article/pii/S1742287614000577",
    date: "One month ago",
  },
  {
    id: crypto.randomUUID(),
    title: "PS5 vs XBox Series X: A Sentiment Analysis",
    website: "LUISS",
    url: "https://tesi.luiss.it/33008/1/722111_D%27AMORE_ROBERTO.pdf",
    date: "One month ago",
  },
  {
    id: crypto.randomUUID(),
    title: "Cogitive Load Theory",
    website: "Medical College of Wisconsin",
    url: "https://www.mcw.edu/-/media/MCW/Education/Academic-Affairs/OEI/Faculty-Quick-Guides/Cognitive-Load-Theory.pdf",
    date: "Two months ago",
  },
  {
    id: crypto.randomUUID(),
    title:
      "On the role of generative artificial intelligence in the development of brain-computer interfaces",
    website: "BMC Biomedical Engineering",
    date: "1 year ago",
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

  const [nodes] = useState([
    {
      id: "hci-0",
      label: "Cognitive Load (1)", // TODO: Bump the number by one after initial chat history is saved.
      fill: "#075985",
      data: {
        type: "HCI",
      },
    },
    {
      id: "hci-1",
      label: "Brain-CPU (3)",
      fill: "#075985",
      data: {
        type: "HCI",
      },
    },
    {
      id: "hci-2",
      label: "XBox Controllers (1)",
      fill: "#075985",
      data: {
        type: "HCI",
      },
    },
    {
      id: "ai-0",
      label: "Generative AI (2)",
      fill: "#166534",
      data: {
        type: "AI",
      },
    },
    {
      id: "game-0",
      label: "History (1)",
      fill: "#c2410c",
      data: {
        type: "GAME",
      },
    },
    {
      id: "game-1",
      label: "XBox (2)",
      fill: "#c2410c",
      data: {
        type: "GAME",
      },
    },
    {
      id: "game-2",
      label: "PS5 (1)",
      fill: "#c2410c",
      data: {
        type: "GAME",
      },
    },
  ] as {
    id: string;
    label: string;
    fill: string;
    data: {
      type: string;
      segment?: string;
    };
  }[]);

  const [edges] = useState([
    {
      source: "game-1",
      target: "hci-2",
      id: "game-1-hci-2",
      label: "XBox",
    },
    {
      source: "hci-1",
      target: "ai-0",
      id: "hci-1-ai-0",
      label: "Brain-CPU-Gen-AI",
    },
  ]);

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
    [hasPrompt, prompts, setPrompts]
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
    alert(chatHistoryNotImpleted);
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
                <a
                  href="#"
                  onClick={handleHistoryItemClick}
                  title={`View chat about ${chat.title}`}
                >
                  <h3>{chat.title}</h3>
                  <p>
                    {chat.website} | Accessed {chat.date}
                  </p>
                  <p>{chat.url}</p>
                </a>
              </li>
            ))}
          </ul>
        </article>
      </TabPanel>
      <TabPanel id="graph" className={styles.graph}>
        <GraphCanvas
          nodes={nodes}
          draggable
          edges={edges}
          clusterAttribute="type"
          constrainDragging={false}
        />
        <div
          style={{
            zIndex: 9,
            position: "absolute",
            top: 15,
            right: 15,
          }}
        />
      </TabPanel>
    </Tabs>
  );
}
