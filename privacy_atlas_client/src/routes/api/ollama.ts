// src/routes/api/ollama.ts
import { APIEvent } from "@solidjs/start/server";

type Message = {
  role: "user" | "assistant" | "system";
  content: string;
};

export async function POST(event: APIEvent) {
  // Get messages from request body, with fallback
  let messages = [{ role: "user", content: "Hello, how are you?" }];
  let model = "gemma3n:latest";

  try {
    const body = await event.request.json();

    // Handle both old single message format and new messages array format
    if (body.messages && Array.isArray(body.messages)) {
      // New format - array of messages
      messages = body.messages.map((msg: Message) => ({
        role: msg.role,
        content: msg.content,
      }));
    } else if (body.message) {
      // Old format - single message (for backwards compatibility)
      messages = [{ role: "user", content: body.message }];
    }

    if (body.model) model = body.model;
  } catch (e) {
    // Use defaults if no valid JSON body
  }

  const stream = new ReadableStream({
    async start(controller) {
      try {
        const response = await fetch("http://localhost:11434/api/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model,
            messages: messages, // Send the full conversation history
            stream: true,
          }),
          signal: event.request.signal,
        });

        if (!response.body) {
          throw new Error("No response body");
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();

        event.request.signal.addEventListener("abort", () => {
          reader.cancel();
          controller.close();
        });

        while (true) {
          const { done, value } = await reader.read();
          if (done) {
            controller.close();
            break;
          }

          const chunk = decoder.decode(value);
          const lines = chunk.split("\n").filter((line) => line.trim() !== "");

          for (const line of lines) {
            try {
              const data = JSON.parse(line);
              if (data.message?.content) {
                controller.enqueue(
                  `data: ${JSON.stringify({
                    type: "token",
                    content: data.message.content,
                  })}\n\n`,
                );
              }
              if (data.done) {
                controller.enqueue(
                  `data: ${JSON.stringify({ type: "done" })}\n\n`,
                );
                controller.close();
                return;
              }
            } catch (e) {
              console.error("Parse error:", e);
            }
          }
        }
      } catch (error: any) {
        if (error.name === "AbortError") {
          controller.close();
          return;
        }
        controller.enqueue(
          `data: ${JSON.stringify({
            type: "error",
            error: error.message,
          })}\n\n`,
        );
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
