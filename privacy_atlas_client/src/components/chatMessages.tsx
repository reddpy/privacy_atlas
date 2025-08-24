// src/components/chatMessages.tsx
import { MessageCircleQuestionMark } from "lucide-solid";
import { For, Show, onMount } from "solid-js";
import { useChatContext } from "~/contexts/chatContext";
import AtlasABR from "./atlasAbr";

const ChatMessages = () => {
  const { messages, currentResponse, isStreaming } = useChatContext();
  let messagesEndRef: HTMLDivElement | undefined;

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
            {/* User Messages */}
            <Show when={message.role === "user"}>
              <div class="w-full flex justify-end px-6">
                <div class="indicator">
                  <div class="indicator-item indicator-bottom indicator-end">
                    <div class="bg-sky-500 rounded-full w-8 h-8 flex items-center justify-center">
                      <MessageCircleQuestionMark class="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <div class="border-base-300 border shadow-sm rounded-2xl p-2 px-4">
                    <div class="whitespace-pre-wrap">{message.content}</div>
                  </div>
                </div>
              </div>
            </Show>

            {/* Assistant Messages */}
            <Show when={message.role === "assistant"}>
              <div class="w-full flex items-center gap-3 px-4 py-2">
                <div class="flex-1 px-4 md:px-0">
                  <Show
                    when={
                      isStreaming() && message.isStreaming && !message.content
                    }
                  >
                    <div class="flex items-center gap-2">
                      <span>
                        <AtlasABR /> is Thinking
                      </span>
                      <div class="flex space-x-1">
                        <div class="w-1 h-1 bg-sky-500 rounded-full animate-bounce"></div>
                        <div
                          class="w-1 h-1 bg-sky-500 rounded-full animate-bounce"
                          style="animation-delay: 0.1s"
                        ></div>
                        <div
                          class="w-1 h-1 bg-sky-500 rounded-full animate-bounce"
                          style="animation-delay: 0.2s"
                        ></div>
                      </div>
                    </div>
                  </Show>
                  <Show when={message.content}>
                    <span class="whitespace-pre-wrap">{message.content}</span>
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
