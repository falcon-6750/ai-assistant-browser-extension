import { useCallback, useState } from "react";
import { GraphCanvas } from "reagraph";

import styles from "./App.module.css";

import { useAutoScroll } from "./hooks";

import { PaperAirplane } from "@repo/icons/paper-airplane";
import { Button } from "@repo/ui/button";
import { ComboBox } from "@repo/ui/combo-box";
import { Tab, TabList, TabPanel, Tabs, type TabKey } from "@repo/ui/tabs";
import { Chat } from "@repo/icons/chat";
import { Clock } from "@repo/icons/clock";
import { FolderArrowDown } from "@repo/icons/folder-arrow-down";
import { Graph } from "@repo/icons/graph";
import { Message } from "@repo/ui/message";
import type {
  AIAgent,
  Browser,
  ChatMessage,
  SavedChat,
  SavedEdge,
  SavedNode,
  SavedPrompt,
} from ".";
import { BlankSlate } from "./BlankSlate";

// TODO: Once chat history is saved, reset the chat and load a new url into the iframe.
//       This will let the user start and save a new conversation.
//       When that conversation is finished, the user can save it and add it to the chat history.
//       The new topic will be added to the graph.
//       Reload the oringal URL and run in a loop.

const chatHistoryNotImpleted =
  "This feature is not implemented in the prototype but imagine that clicking this link opens the conversation so you can review it or carry on with the conversation.";

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

export function App({
  aiAgent,
  browser,
  savedChats,
  savedEdges,
  savedNodes,
  savedPrompts,
}: {
  aiAgent: AIAgent;
  browser: Browser;
  savedChats: SavedChat[];
  savedEdges: SavedEdge[];
  savedNodes: SavedNode[];
  savedPrompts: SavedPrompt[];
}) {
  // Collections
  const [chats] = useState(savedChats);
  const [nodes] = useState(savedNodes);
  const [edges] = useState(savedEdges);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [prompts, setPrompts] = useState(savedPrompts);

  // Flags
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<TabKey>("chat");

  // DOM refs
  const mainRef = useAutoScroll({
    observe: messages,
    scrollTo: "#messages-list > li",
  });

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

      const selection = await browser.getSelection();
      if (selection) {
        message = `${message}\n\nUsing this selection:\n\n ${selection}`;
      }

      handlePrompt(message);
    },
    [browser, handlePrompt]
  );

  const handleHistoryItemClick = useCallback(() => {
    alert(chatHistoryNotImpleted);
  }, []);

  return (
    <Tabs selectedKey={activeTab} onSelectionChange={setActiveTab}>
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
        <div className={styles.graphCanvas} />
      </TabPanel>
    </Tabs>
  );
}
