import { createSignal } from "solid-js";
import ChatBox from "~/components/chatbox";

export default function Home() {
  const [input, setInput] = createSignal("");

  const handleSubmitBtn = async () => {};

  return (
    <main class="text-center mx-auto text-gray-700 p-4">
      <h1 class=" max-6-xs text-6xl text-sky-500 font-thin uppercase my-16">
        Atlas
      </h1>
      <ChatBox
        inputAccess={input}
        inputSetter={setInput}
        submitBtnFunc={handleSubmitBtn}
        submitEnterFunc={handleSubmitBtn}
      />
    </main>
  );
}
