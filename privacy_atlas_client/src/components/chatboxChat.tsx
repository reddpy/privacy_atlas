import {
  createForm,
  getValue,
  setValue,
  submit,
  SubmitHandler,
} from "@modular-forms/solid";
import { createMemo, onMount, Show } from "solid-js";
import { ArrowUp, Square } from "lucide-solid";
import { useChatContext } from "~/contexts/chatContext";

type ChatBoxForm = {
  charQuery: string;
};

const ChatBoxChat = () => {
  const { sendMessage, isStreaming, stopStreaming } = useChatContext();
  const [chatBoxForm, { Form, Field }] = createForm<ChatBoxForm>();

  const playSound = () => {
    new Audio("/sounds/subtle_notif.mp3").play();
  };

  const isQueryEmpty = createMemo(() => {
    const queryValue = getValue(chatBoxForm, "charQuery");
    return !queryValue || queryValue.trim() === "";
  });

  const handleSubmit: SubmitHandler<ChatBoxForm> = async (values, event) => {
    if (isStreaming()) return;

    await sendMessage(values.charQuery);
    setValue(chatBoxForm, "charQuery", "");
    playSound();
  };

  const handleStop = () => {
    stopStreaming();
    playSound(); // Optional: play sound when stopping
  };

  const handleSubmitKey = (event: KeyboardEvent) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      let chatQuery = getValue(chatBoxForm, "charQuery")!.trim();
      if (chatBoxForm.touched && chatQuery !== "" && !isStreaming()) {
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
        <div class="w-full mx-auto flex flex-col justify-end">
          <div class="flex items-end gap-2 p-3 border border-[#B62E00] rounded-2xl bg-base-100 shadow-lg">
            <Field name="charQuery">
              {(field, props) => (
                <textarea
                  {...props}
                  id={field.name}
                  ref={textareaRef}
                  placeholder="Ask Atlas Anything..."
                  class="h-[40px] min-h-[40px] textarea border-none w-full resize-none focus:outline-none focus:ring-2 focus:ring-sky-500 rounded-xl overflow-hidden"
                  rows="1"
                  value={field.value}
                  autocomplete="off"
                  autocorrect="off"
                  autocapitalize="off"
                  spellcheck="false"
                  disabled={isStreaming()}
                />
              )}
            </Field>

            <Show when={!isStreaming()}>
              <button
                disabled={isQueryEmpty()}
                class="btn btn-neutral btn-circle"
                type="submit"
              >
                <ArrowUp />
              </button>
            </Show>

            <Show when={isStreaming()}>
              <button
                type="button"
                onClick={handleStop}
                class="btn btn-error btn-circle"
                title="Stop generating"
              >
                <Square class="w-4 h-4" />
              </button>
            </Show>
          </div>
        </div>
      </Form>
    </>
  );
};

export default ChatBoxChat;
