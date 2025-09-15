import { Card, CardContent } from "@/components/ui/card";
import { useParsedContent } from "@/hooks/useParsedContent";
import { APITester } from "./APITester";
import "./index.css";

import logo from "./logo.svg";
import reactLogo from "./react.svg";

import React, { useMemo, useState } from "react";
import type { GroupMessage, Message } from "@/types/message";
import { groupMessagesByPromptContext } from "@/components/message/utils";
import { ReflectedMessageBlock } from "@/components/message/ReflectedMessageBlock";

// --- ARCHITECT/EDITOR GROUPING EXAMPLE --- //

// Generic rendering components
const MessageItem = ({ message }: { message: Message }) => {
  const content = useParsedContent("/", message.content, [], true);
  const mode = message.mode ? `(${message.mode})` : "";
  const id = message.promptContext?.id?.slice(0, 8);

  return (
    <div className="message p-3 my-2 bg-secondary border rounded-lg text-left text-sm">
      <div className="text-xs text-muted-foreground mb-2 font-mono flex justify-between">
        <span>
          {message.role} {mode}
        </span>
        <span>id: {id}...</span>
      </div>
      <div className="max-w-none">{content}</div>
    </div>
  );
};

const MessageGroup = ({ group }: { group: GroupMessage }) => {
  return (
    <details open className="my-2 bg-card/80 border rounded-lg">
      <summary className="p-3 cursor-pointer font-semibold text-left">
        Group: {group.group.id}
      </summary>
      <div className="p-2 border-t">
        {group.children?.map((child, i) => (
          <MessageItem key={child.id || i} message={child} />
        ))}
      </div>
    </details>
  );
};

const ArchitectExample = () => {
  const messagesData = [
    {
      id: "a9b5e3c1-8d2f-4a6b-9c1e-7a8b6f5c4d3e",
      role: "assistant",
      content:
        "---\n► **THINKING**\nThe user wants to see a reflected message.\nI need to create a message that contains both a thinking and an answer part.\nI will structure the content with the special separators.\n---\n► **ANSWER**\nThis is a reflected message. You can see my thinking process above.",
      usageReport:
        "Tokens: 100 sent, 50 received. Cost: $0.0010 message, $0.0060 session. Total cost: $0.0064680000 session",
      promptContext: {
        id: "a9b5e3c1-8d2f-4a6b-9c1e-7a8b6f5c4d3e",
        group: { id: "test-group-2" },
      },
      mode: "architect",
      type: "respone",
    },
    {
      role: "user",
      content: "update file with content `hello world, its me`",
      promptContext: {
        id: "12333322z333423aa123123",
        group: { id: "test-group" },
      },
      mode: "user",
      type: "respone",
    },
    {
      id: "ec31127e-e4eb-4083-a2b8-1fbe8a717340",
      role: "assistant",
      content:
        "To update a file with the content `hello world, its me`, follow these steps:\n\n1. Choose the target file you want to update.\n2. Open the file in your editor.\n3. Replace the entire contents of the file with:\n   ```\n   hello world, its me\n   ```\n4. Save the file.\n\nIf you want me to provide instructions for a specific file, please specify the filename. If you want to preserve any part of the file, let me know.",
      usageReport:
        "Tokens: 633 sent, 98 received. Cost: $0.0020 message, $0.0020 session. Total cost: $0.0054680000 session",
      promptContext: {
        id: "12333322z333423aa123123",
        group: { id: "test-group" },
      },
      mode: "architect",
      type: "respone",
    },
    {
      id: "599268a9-ac12-44aa-91fc-5a985a283980",
      role: "assistant",
      content:
        "I need the full file path and the current contents of the file you want to update before I can provide a *SEARCH/REPLACE block*. Please share the filename and its contents.",
      usageReport:
        "Tokens: 1.6k sent, 37 received. Cost: $0.0034 message, $0.0055 session. Total cost: $0.0054680000 session",
      promptContext: {
        id: "4cd8a275-a238-4d24-a0f1-b4fff2362c86",
        group: { id: "test-group" },
      },
      mode: "code",
      type: "reflected-message",
    },
    {
      role: "user",
      content: "update file with content `hello world, its me`",
      promptContext: {
        id: "12333322z333423aa123123",
        group: { id: "test-group" },
      },
      mode: "user",
      type: "respone",
    },
  ];

  const groupedMessages = useMemo(
    () => groupMessagesByPromptContext(messagesData),
    [messagesData],
  );
  console.log("groupedMessages");
  console.log(groupedMessages);

  return (
    <div className="mt-8 text-left">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Architect/Editor Grouping Example
      </h2>
      <div className="bg-blue-100/20 border-l-4 border-blue-500/50 text-blue-300 p-4 mb-4 rounded-md text-sm">
        <p>
          <strong className="font-bold">Note:</strong> This example shows how an
          Architect response and a subsequent Code (Editor) response are linked.
          Although they have different `promptContext.id`s, they share the same
          `group.id` (`test-group`) and are therefore rendered inside the same
          visual group.
        </p>
      </div>
      {groupedMessages.map((msg, i) => {
        if (msg.type === "group") {
          return <MessageGroup key={msg.id || i} group={msg as GroupMessage} />;
        }
        return <MessageItem key={msg.id || i} message={msg} />;
      })}
    </div>
  );
};

const InteractiveParsedContentExample = () => {
  const [content, setContent] = useState(
    "## Live Markdown Parser\n\n" +
      "Type or paste content here to see it rendered live by the `useParsedContent` hook.\n\n" +
      "**Try some of these:**\n\n" +
      "*   Markdown lists, **bold**, *italics*\n" +
      "*   Code blocks with language identifiers:\n" +
      "    ```json\n" +
      '    { "key": "value" }\n' +
      "    ```\n" +
      '*   The Aider "Thinking/Answer" format:\n' +
      "    ---\n" +
      "    ► **THINKING**\n" +
      "    This is the thinking part.\n" +
      "    ---\n" +
      "    ► **ANSWER**\n" +
      "    This is the answer part.",
  );

  const allFiles = ["src/components/MyComponent.tsx"];
  const parsedContent = useParsedContent("/", content, allFiles, true);

  return (
    <div className="mt-8 text-left">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Interactive useParsedContent Example
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="content-input"
            className="block text-sm font-medium text-muted-foreground mb-2"
          >
            Input Content
          </label>
          <textarea
            id="content-input"
            className="w-full h-96 p-2 border rounded-md bg-background font-mono text-xs"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-2">
            Parsed Output
          </label>
          <div className="w-full h-96 p-4 border rounded-lg bg-background text-sm overflow-y-auto">
            {parsedContent}
          </div>
        </div>
      </div>
    </div>
  );
};

export function App() {
  return (
    <div className="container mx-auto p-8 text-center relative z-10">
      <div className="flex justify-center items-center gap-8 mb-8">
        <img
          src={logo}
          alt="Bun Logo"
          className="h-36 p-6 transition-all duration-300 hover:drop-shadow-[0_0_2em_#646cffaa] scale-120"
        />
        <img
          src={reactLogo}
          alt="React Logo"
          className="h-36 p-6 transition-all duration-300 hover:drop-shadow-[0_0_2em_#61dafbaa] [animation:spin_20s_linear_infinite]"
        />
      </div>

      <Card className="bg-card/50 backdrop-blur-sm border-muted">
        <CardContent className="pt-6">
          <h1 className="text-5xl font-bold my-4 leading-tight">Bun + React</h1>
          <p>
            Edit{" "}
            <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
              src/App.tsx
            </code>{" "}
            and save to test HMR
          </p>
          <APITester />
          <ArchitectExample />
          <InteractiveParsedContentExample />
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
