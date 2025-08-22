import { MessageCircleQuestionMark } from "lucide-solid";

const ChatMsg = () => {
  return (
    <>
      <div class="indicator w-full flex justify-end">
        <div class="indicator-item indicator-bottom">
          <span class="ml-1 flex items-end">
            <div class="bg-sky-500 rounded-full w-10 h-10 flex items-center justify-center">
              <MessageCircleQuestionMark class="w-7 h-7 text-white" />
            </div>
          </span>
        </div>
        <div class="border-base-300 border shadow-sm rounded-2xl p-2 px-5">
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
    </>
  );
};

export default ChatMsg;
