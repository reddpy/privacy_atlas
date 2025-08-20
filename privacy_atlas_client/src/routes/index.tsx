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
    <main class="text-center mx-auto text-gray-700 p-4">
      <h1 class=" max-6-xs text-6xl text-sky-500 font-thin uppercase my-16">
        Atlas
      </h1>
      <ChatBox inputSetter={setInput} />
    </main>
  );
}
