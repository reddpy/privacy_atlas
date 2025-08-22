import { Eclipse } from "lucide-solid";
import AtlasABR from "./atlasAbr";

const ChatRsp = () => {
  return (
    <>
      <div class="indicator w-full flex justify-start">
        <div class="indicator-item indicator-start">
          <span class="ml-1 flex items-end">
            <div class="rounded-full w-10 h-10 flex items-center justify-center text-5xl">
              <div class="w-7 h-7 flex items-center justify-center pt-13 pr-6">
                <AtlasABR />
              </div>
            </div>
          </span>
        </div>
        <div class="p-2 px-5">
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

export default ChatRsp;
