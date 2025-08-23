import { MessageCircleQuestionMark } from "lucide-solid";

const ChatMsg = () => {
  return (
    <div class="w-full flex justify-end px-6">
      <div class="indicator">
        <div class="indicator-item indicator-bottom indicator-end">
          <div class="bg-sky-500 rounded-full w-8 h-8 flex items-center justify-center">
            <MessageCircleQuestionMark class="w-5 h-5 text-white" />
          </div>
        </div>
        <div class="border-base-300 border shadow-sm rounded-2xl p-2 px-4">
          <div>
            simply dummy text of the printing and typesetting industry. Lorem
            Ipsum has been the industry's standard dummy text ever since the
            1500s, when an unknown printer took a galley of type and scrambled
            it to make a type specimen book. It has survived not only five
            centuries, but also the leap into electronic typesetting, remaining
            essentially unchanged. It was popularised in the 1960s with the
            release of Letraset sheets containing Lorem Ipsum passages, and more
            recently with desktop publishing software like Aldus PageMaker
            including versions of Lorem Ipsum. simply dummy text of the printing
            and typesetting industry. Lorem Ipsum has been the industry's
            standard dummy text ever since the 1500s, when an unknown printer
            took a galley of type and scrambled it to make a type specimen book.
            It has survived not only five centuries, but also the leap into
            electronic typesetting, remaining essentially unchanged. It was
            popularised in the 1960s with the release of Letraset sheets
            containing Lorem Ipsum passages, and more recently with desktop
            publishing software like Aldus PageMaker including versions of Lorem
            Ipsum.
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMsg;
