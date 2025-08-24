import { marked } from "marked";
import { For, Show, onMount } from "solid-js";
import { useChatContext } from "~/contexts/chatContext";
import AtlasThinking from "./chatMessages/atlasThinking";
import UserResp from "./chatMessages/userResp";

const ChatMessages = () => {
  const { messages, currentResponse, isStreaming } = useChatContext();
  let messagesEndRef: HTMLDivElement | undefined;

  marked.setOptions({
    breaks: true, // Convert \n to <br>
    gfm: true, // GitHub Flavored Markdown
  });

  const renderMarkdown = (content: string) => {
    return marked(content) as string;
  };

  // Create a combined array of all messages plus current streaming response
  const allMessages = () => {
    const msgs = messages();
    if (currentResponse() || isStreaming()) {
      return [
        ...msgs,
        {
          role: "assistant" as const,
          content: currentResponse(),
          timestamp: Date.now(),
          isStreaming: true,
        },
      ];
    }
    return msgs.map((msg) => ({ ...msg, isStreaming: false }));
  };

  // Function to scroll to bottom smoothly
  const scrollToBottom = (behavior: ScrollBehavior = "smooth") => {
    messagesEndRef?.scrollIntoView({ behavior, block: "end" });
  };

  // Scroll to bottom on initial load
  onMount(() => {
    setTimeout(() => scrollToBottom("auto"), 100);
  });

  return (
    <>
      <For each={allMessages()}>
        {(message) => (
          <>
            <Show when={message.role === "user"}>
              <UserResp content={message.content} />
            </Show>

            <Show when={message.role === "assistant"}>
              <div class="w-full flex items-center gap-3 px-4 py-2">
                <div class="flex-1 px-4 md:px-0 min-w-0">
                  <Show
                    when={
                      isStreaming() && message.isStreaming && !message.content
                    }
                  >
                    <div class="flex items-center gap-2">
                      <AtlasThinking />
                    </div>
                  </Show>
                  <Show when={message.content}>
                    <div
                      class="prose prose-sm w-full min-w-0 [&_pre]:overflow-x-auto [&_pre]:whitespace-pre [&_pre]:w-full [&_pre]:min-w-0 [&_code]:text-sm"
                      innerHTML={renderMarkdown(message.content)}
                    />
                  </Show>
                </div>
              </div>
            </Show>
          </>
        )}
      </For>
      {/* Invisible element at the bottom for scrolling */}
      <div ref={messagesEndRef} class="h-1" />
    </>
  );
};

export default ChatMessages;
