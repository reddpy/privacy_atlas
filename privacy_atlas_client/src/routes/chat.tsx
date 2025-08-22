import ChatBoxChat from "~/components/chatboxChat";
import AtlasWord from "~/components/atlasWord";

const ChatPage = () => {
  return (
    <div class="fade-in-page flex flex-col p-1 h-screen gap-4 relative">
      <div
        id="chat_header"
        class="glass fixed top-0 pointer-events-none border-none h-9 flex-shrink-0 w-full mx-auto flex items-center justify-center"
      >
        <p class="text-3xl">
          <AtlasWord />
        </p>
      </div>

      <div
        id="chat_message_container"
        class="w-full mx-auto pb-28 pt-14 overflow-y-auto h-screen"
      >
        <div class="max-w-2xl pl-6 mx-auto space-y-4">
          <div>Message 1</div>
          <div>Message 2</div>
          <div>Message 1</div>
          <div>Message 2</div>
          <div>Message 1</div>
          <div>Message 2</div>
          <div>Message 1</div>
          <div>Message 2</div>
          <div>Message 1</div>
          <div>Message 2</div>
          <div>Message 1</div>
          <div>Message 2</div>
          <div>Message 1</div>
          <div>Message 2</div>
          <div>Message 1</div>
          <div>Message 2</div>
          <div>Message 1</div>
          <div>Message 2</div>
          <div>Message 1</div>
          <div>Message 2</div>
          <div>Message 1</div>
          <div>Message 2</div>
          <div>Message 1</div>
          <div>Message 2</div>
          <div>Message 1</div>
          <div>Message 2</div>
          <div>Message 1</div>
          <div>Message 2</div>
          <div>Message 1</div>
          <div>Message 2</div>
          <div>Message 1</div>
          <div>Message 2</div>
          <div>Message 1</div>
          <div>Message 2</div>
        </div>
      </div>

      <div
        id="chat_box_container"
        class="fixed bottom-0 left-0 right-0 pointer-events-none pb-2 bg-[#FFF7ED] px-2 sm:px-0"
      >
        <div class="w-full max-w-2xl mx-auto pointer-events-auto">
          <ChatBoxChat />
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
