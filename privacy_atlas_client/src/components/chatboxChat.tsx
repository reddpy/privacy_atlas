import {
  createForm,
  getValue,
  setValue,
  submit,
  SubmitHandler,
} from "@modular-forms/solid";
import { createMemo, onMount, Setter } from "solid-js";

import { ArrowUp } from "lucide-solid";

type ChatBoxProps = {
  inputSetter: Setter<string>;
};

type ChatBoxForm = {
  charQuery: string;
};

const ChatBoxChat = ({ inputSetter }: ChatBoxProps) => {
  const [chatBoxForm, { Form, Field }] = createForm<ChatBoxForm>();

  const playSound = () => {
    new Audio("/sounds/subtle_notif.mp3").play();
  };

  const isQueryEmpty = createMemo(() => {
    const queryValue = getValue(chatBoxForm, "charQuery");
    return !queryValue || queryValue.trim() === "";
  });

  const handleSubmit: SubmitHandler<ChatBoxForm> = (values, event) => {
    inputSetter(values.charQuery);
    setValue(chatBoxForm, "charQuery", "");
    playSound();
  };

  const handleSubmitKey = (event: KeyboardEvent) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();

      let chatQuery = getValue(chatBoxForm, "charQuery")!.trim();

      if (chatBoxForm.touched && chatQuery !== "") {
        submit(chatBoxForm);
      }
    }
  };

  let textareaRef: HTMLTextAreaElement | undefined;

  onMount(() => {
    if (!textareaRef) return;

    const resize = () => {
      const maxHeight = 240;

      // Save current state
      const scrollTop = textareaRef!.scrollTop;
      const selectionStart = textareaRef!.selectionStart;
      const selectionEnd = textareaRef!.selectionEnd;
      const wasAtMaxHeight = textareaRef!.style.height === maxHeight + "px";

      // Always reset height to get natural content height
      textareaRef!.style.height = "auto";
      const naturalHeight = textareaRef!.scrollHeight;

      if (naturalHeight <= maxHeight) {
        // Content fits within max height - grow to fit content
        textareaRef!.style.height = naturalHeight + "px";
        textareaRef!.style.overflowY = "hidden";
      } else {
        // Content exceeds max height - set to max and enable scrolling
        textareaRef!.style.height = maxHeight + "px";
        textareaRef!.style.overflowY = "auto";

        // Only restore scroll position if we were previously at max height
        // This prevents jumping when transitioning from auto-height to max-height
        if (wasAtMaxHeight) {
          requestAnimationFrame(() => {
            textareaRef!.scrollTop = scrollTop;
            textareaRef!.setSelectionRange(selectionStart, selectionEnd);
          });
        }
      }
    };

    textareaRef.addEventListener("input", resize);

    // Initial resize
    resize();
  });

  return (
    <>
      <Form onSubmit={handleSubmit} onKeyDown={handleSubmitKey}>
        <div class="w-full max-w-2xl mx-auto flex flex-col justify-end">
          <div class="flex items-end gap-2 p-3 border border-[#B62E00] rounded-2xl bg-base-100 shadow-lg">
            <Field name="charQuery">
              {(field, props) => (
                <textarea
                  {...props}
                  id={field.name}
                  ref={textareaRef}
                  placeholder="The Weight of Knowledge, Atlas bears"
                  class="h-[40px] min-h-[40px] textarea border-none w-full resize-none focus:outline-none focus:ring-2 focus:ring-sky-500 rounded-xl overflow-hidden"
                  rows="1"
                  value={field.value}
                />
              )}
            </Field>
            <button
              disabled={isQueryEmpty()}
              class="btn btn-neutral btn-circle"
              type="submit"
            >
              <ArrowUp />
            </button>
          </div>
        </div>
      </Form>
    </>
  );
};

export default ChatBoxChat;
