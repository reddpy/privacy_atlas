// src/routes/api/ollama.ts
import { APIEvent } from "@solidjs/start/server";

export async function POST(event: APIEvent) {
  // Get message from request body, with fallback
  let message = "Hello, how are you?";
  let model = "gemma3n:latest";

  try {
    const body = await event.request.json();
    if (body.message) message = body.message;
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
            messages: [
              {
                role: "user",
                content: message,
              },
            ],
            stream: true,
          }),
          // Pass through the abort signal from the original request
          signal: event.request.signal,
        });

        if (!response.body) {
          throw new Error("No response body");
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();

        // Listen for client disconnect
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
      } catch (error) {
        if (error.name === "AbortError") {
          // Request was aborted - clean up and close
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
