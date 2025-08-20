import { createEffect, createSignal } from "solid-js";
import ChatBox from "~/components/chatbox";

export default function Home() {
  const [input, setInput] = createSignal("");

  // Watch for changes to input
  createEffect(() => {
    const currentInput = input();

    // This runs every time input() changes
    if (currentInput && currentInput.trim() !== "") {
      console.log("Input changed to:", currentInput);

      // logic here
      //will handle redirect to chat
    }
  });

  return (
    <main class="min-h-screen text-gray-700">
      <div class="mt-[20vh] flex flex-col items-center">
        <h1 class="max-6-xs text-2xl  font-thin uppercase my-8">
          <span class="text-6xl text-sky-500">Atlas</span> chat
        </h1>
        <div class="w-full max-w-4xl px-4">
          <ChatBox inputSetter={setInput} />
        </div>
      </div>
    </main>
  );
}
