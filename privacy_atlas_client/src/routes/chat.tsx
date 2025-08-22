import ChatBoxChat from "~/components/chatboxChat";

const ChatPage = () => {
  let contentRef: HTMLDivElement | undefined;

  return (
    <div class="fade-in-page flex flex-col p-1 h-screen gap-4 relative">
      <div
        id="chat_header"
        class="glass fixed top-0 pointer-events-none border-none h-12 flex-shrink-0 w-full mx-auto flex items-center justify-center"
      >
        <p>
          <span class="font-apple-garamond-italic text-4xl text-sky-500">
            Atlas
          </span>
          <span class="font-bold text-[#B62E00]">.</span>
        </p>
      </div>

      <div
        id="chat_message_container"
        class="w-full max-w-2xl mx-auto space-y-4 pb-32 pt-20 pl-4"
      >
        <div>Message 1</div>
        <div>Message 2</div>
        <div>Message 2</div>
      </div>

      <div
        id="chat_box_container"
        class="fixed bottom-0 left-0 right-0 pointer-events-none pb-2 bg-[#FFF7ED]"
      >
        <div class="w-full max-w-2xl mx-auto pointer-events-auto">
          <ChatBoxChat />
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
