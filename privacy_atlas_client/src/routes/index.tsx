import { useNavigate } from "@solidjs/router";
import { createEffect, createSignal } from "solid-js";
import AtlasWord from "~/components/atlasWord";
import ChatBox from "~/components/chatbox";
import MenuToggle from "~/components/navigation/menuToggle";
import SidebarHistory from "~/components/navigation/sidebar";
import SoundToggle from "~/components/navigation/soundToggle";
import ThemeToggle from "~/components/navigation/themeToggle";
import { setGlobalState } from "~/stores/global";

export default function Home() {
  const [input, setInput] = createSignal("");
  const navigate = useNavigate();

  // Watch for changes to input
  createEffect(() => {
    const currentInput = input();
    // This runs when the chat is submitted
    if (currentInput && currentInput.trim() !== "") {
      setGlobalState("textQuery", currentInput);
      return navigate("/chat");
    }
  });

  return (
    <main class="relative min-h-screen text-gray-700 overflow-hidden">
      <div class="flex sm:flex-row flex-col">
        <div class="flex-col hidden sm:flex m-1 join join-vertical gap-2 p-1">
          <ThemeToggle />
          <SoundToggle />
          <SidebarHistory />
        </div>
        <div class="flex-col sm:hidden join join-vertical pl-2 pt-2">
          <MenuToggle />
        </div>
        <div id="chat_app" class="flex-1 flex justify-center">
          <img
            src="/atlas.png"
            alt="Atlas bearing the weight of knowledge"
            class="absolute animate-atlas top-[15vh] left-1/2 -translate-x-1/2 w-[600px] min-w-[600px] max-w-[600px] opacity-10 z-0"
          />
          {/* Main content */}
          <div
            id="chat_component_home"
            class="relative z-10 sm:pt-[17vh] pt-[10vh] flex flex-col items-center px-4 min-h-[80%] sm:min-h-screen w-full max-w-4xl"
          >
            {/* Text Logo */}
            <h1 class="my-6 text-7xl text-center max-6-xs pl-4 sm:pr-6 sm:pl-0 ">
              <AtlasWord />
            </h1>
            {/* Subtitle */}
            <p class="pb-5 text-3xl font-normal font-apple-garamond text-center pl-6 sm:pl-0">
              The Knowledge of the World, <br class="sm:hidden" /> at your
              fingertips
              <span class="font-bold text-5xl text-[#B62E00]">.</span>
            </p>
            {/* ChatBox */}
            <div class="w-full max-w-4xl mb-8">
              <ChatBox inputSetter={setInput} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
