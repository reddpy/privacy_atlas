import ChatBoxChat from "~/components/chatboxChat";
import AtlasWord from "~/components/atlasWord";
import ChatMsg from "~/components/chatMsg";
import ChatRsp from "~/components/chatRsp";

const ChatPage = () => {
  return (
    <div class="fade-in-page grid grid-rows-[auto_1fr_auto] h-screen">
      <div
        id="chat_header"
        class="glass fixed top-0 pointer-events-none border-none h-9 flex-shrink-0 w-full mx-auto flex items-center justify-center z-10"
      >
        <p class="text-3xl">
          <AtlasWord />
        </p>
      </div>

      <div
        id="chat_message_container"
        class="w-full mx-auto overflow-y-auto scrollbar-thin scrollbar-thumb-sky-500 scrollbar-track-[#FFF7ED] "
      >
        <div class="max-w-3xl mx-auto space-y-4 pt-16 pb-10">
          <ChatMsg />
          <ChatRsp />
          <ChatMsg />
          <ChatRsp />
        </div>
      </div>

      <div
        id="chat_box_container"
        class="pointer-events-none bg-[#FFF7ED] px-2 sm:px-0 pb-2"
      >
        <div class="w-full max-w-3xl mx-auto pointer-events-auto">
          <ChatBoxChat />
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
