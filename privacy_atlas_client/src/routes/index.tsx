import { useNavigate } from "@solidjs/router";
import { createEffect, createSignal } from "solid-js";
import AtlasWord from "~/components/atlasWord";
import ChatBox from "~/components/chatbox";

export default function Home() {
  const [input, setInput] = createSignal("");
  const navigate = useNavigate();

  // Watch for changes to input
  createEffect(() => {
    const currentInput = input();

    // This runs when the chat is submitted
    if (currentInput && currentInput.trim() !== "") {
      console.log("Input changed to:", currentInput);

      return navigate("/chat");
      //navigates to chat page upon submit
      //need to send chat message contents
      // to the new page.
    }
  });

  return (
    <main class="min-h-screen text-gray-700 relative overflow-hidden">
      <div class="pt-[17vh] flex flex-col items-center px-4 relative z-20">
        <h1 class="max-6-xs my-6 text-7xl text-center animate-logo">
          <AtlasWord />
        </h1>

        <p class="pb-5 font-normal text-3xl font-apple-garamond text-center animate-subtitle">
          The Knowledge of the World, <br class="sm:hidden" /> at your
          fingertips
          <span class="font-bold text-[#B62E00]">.</span>
        </p>

        <div class="w-full max-w-4xl mb-8 animate-chatbox">
          <ChatBox inputSetter={setInput} />
        </div>
      </div>

      <img
        class="absolute top-[15vh] left-1/2 transform -translate-x-1/2 w-[600px] min-w-[600px] max-w-[600px] opacity-10 z-0 pointer-events-none animate-atlas"
        src="/atlas.png"
        alt="Atlas bearing the weight of knowledge"
      />
    </main>
  );
}
