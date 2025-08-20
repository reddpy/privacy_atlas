import { createSignal, onMount, Setter } from "solid-js";
import { Accessor } from "solid-js/types/server/reactive.js";

type ChatBoxProps = {
  inputAccess: Accessor<string>;
  inputSetter: Setter<string>;
  submitBtnFunc: () => void;
  submitEnterFunc: (e: KeyboardEvent) => void;
};

const ChatBox = ({
  inputAccess,
  inputSetter,
  submitBtnFunc,
  submitEnterFunc,
}: ChatBoxProps) => {
  const [input_null, setInputNull] = createSignal(true);

  const inputCheck = (event: any) => {
    let input_value_local = event.currentTarget.value;
    inputSetter(event.currentTarget.value);

    let input_null = String(input_value_local).trim() === "";
    setInputNull(input_null);
  };

  let textareaRef: HTMLTextAreaElement | undefined;

  onMount(() => {
    if (!textareaRef) return;
    textareaRef.addEventListener("input", () => {
      textareaRef!.style.height = "auto"; // reset
      textareaRef!.style.height = textareaRef!.scrollHeight + "px"; // grow
    });
  });

  return (
    <>
      <div class="w-full max-w-2xl mx-auto">
        <div class="flex items-end gap-2 p-3 border border-red-400 rounded-2xl bg-base-100 shadow-md">
          <textarea
            ref={textareaRef}
            placeholder="Chat with Atlas..."
            class="textarea border-none w-full resize-none focus:outline-none focus:ring-2 focus:ring-sky-500 rounded-xl overflow-hidden"
            rows="1"
            value={inputAccess()}
            onInput={inputCheck}
            onKeyDown={submitEnterFunc}
          />

          <button
            disabled={input_null()}
            class="btn btn-neutral btn-circle"
            onClick={submitBtnFunc}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              class="w-5 h-5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 19V5m-7 7l7-7 7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
};

export default ChatBox;
