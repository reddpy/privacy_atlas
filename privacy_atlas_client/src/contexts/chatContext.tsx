// src/contexts/chatContext.tsx
import { createSignal, createContext, useContext, JSX } from "solid-js";

type Message = {
  role: "user" | "assistant";
  content: string;
  timestamp: number;
  isStreaming?: boolean; // Optional to handle existing messages without this property
};

type ChatContextType = {
  messages: () => Message[];
  currentResponse: () => string;
  isStreaming: () => boolean;
  sendMessage: (content: string) => Promise<void>;
  stopStreaming: () => void;
  clearChat: () => void;
};

const ChatContext = createContext<ChatContextType>();

export const useChatContext = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error(
      "useChatContext must be used within a ChatContext.Provider",
    );
  }
  return context;
};

type ChatProviderProps = {
  children: JSX.Element;
};

export const ChatProvider = (props: ChatProviderProps) => {
  const [messages, setMessages] = createSignal<Message[]>([]);
  const [currentResponse, setCurrentResponse] = createSignal("");
  const [isStreaming, setIsStreaming] = createSignal(false);

  // AbortController to cancel fetch requests
  let abortController: AbortController | null = null;

  const stopStreaming = () => {
    if (abortController) {
      abortController.abort();
      abortController = null;
    }

    // Save the current partial response as a completed message
    const partialResponse = currentResponse();
    if (partialResponse.trim()) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: partialResponse + "\n\n[Response Stopped]",
          timestamp: Date.now(),
          isStreaming: true,
        },
      ]);
    } else {
      // If no content was generated yet (just thinking), add a stopped message
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "*[Response Stopped]*",
          timestamp: Date.now(),
        },
      ]);
    }

    setCurrentResponse("");
    setIsStreaming(false);
  };

  const sendMessage = async (content: string) => {
    if (!content.trim() || isStreaming()) return;

    const userMessage: Message = {
      role: "user",
      content: content.trim(),
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setCurrentResponse("");
    setIsStreaming(true);

    // Create new AbortController for this request
    abortController = new AbortController();

    try {
      const response = await fetch("/api/ollama", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: content.trim(),
          model: "gemma3n:latest",
        }),
        signal: abortController.signal, // Pass abort signal
      });

      if (!response.body) {
        throw new Error("No response body");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      try {
        while (true) {
          const { done, value } = await reader.read();

          if (done) break;

          const chunk = decoder.decode(value);
          const lines = chunk.split("\n").filter((line) => line.trim() !== "");

          for (const line of lines) {
            if (line.startsWith("data: ")) {
              try {
                const data = JSON.parse(line.slice(6));

                if (data.type === "token") {
                  setCurrentResponse((prev) => prev + data.content);
                } else if (data.type === "done") {
                  const finalContent = currentResponse();
                  if (finalContent) {
                    setMessages((prev) => [
                      ...prev,
                      {
                        role: "assistant",
                        content: finalContent,
                        timestamp: Date.now(),
                      },
                    ]);
                  }
                  setCurrentResponse("");
                  setIsStreaming(false);
                  abortController = null;
                  return;
                } else if (data.type === "error") {
                  console.error("Stream error:", data.error);
                  setIsStreaming(false);
                  abortController = null;
                  return;
                }
              } catch (e) {
                console.error("Failed to parse SSE data:", e);
              }
            }
          }
        }
      } catch (error: any) {
        if (error.name === "AbortError") {
          // Request was aborted - this is expected when stop button is clicked
          return;
        }
        throw error;
      }
    } catch (err: any) {
      if (err.name === "AbortError") {
        // Request was aborted - this is expected when stop button is clicked
        return;
      }
      console.error("Chat error:", err);
      setIsStreaming(false);
      setCurrentResponse("");
      abortController = null;
    }
  };

  const clearChat = () => {
    // Stop any ongoing streaming first
    if (isStreaming()) {
      stopStreaming();
    }
    setMessages([]);
    setCurrentResponse("");
  };

  const value: ChatContextType = {
    messages,
    currentResponse,
    isStreaming,
    sendMessage,
    stopStreaming,
    clearChat,
  };

  return (
    <ChatContext.Provider value={value}>{props.children}</ChatContext.Provider>
  );
};
