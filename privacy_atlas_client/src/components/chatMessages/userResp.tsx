import { MessageCircleQuestionMark } from "lucide-solid";

const UserResp = ({ content }: { content: string }) => {
  return (
    <div class="w-full flex justify-end px-6">
      <div class="indicator">
        <div class="indicator-item indicator-bottom indicator-end">
          <div class="bg-sky-500 rounded-full w-8 h-8 flex items-center justify-center">
            <MessageCircleQuestionMark class="w-5 h-5 text-white" />
          </div>
        </div>
        <div class="border-base-300 border shadow-sm rounded-2xl p-2 px-4">
          <div class="whitespace-pre-wrap">{content}</div>
        </div>
      </div>
    </div>
  );
};

export default UserResp;
