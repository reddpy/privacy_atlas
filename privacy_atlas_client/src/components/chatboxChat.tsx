import {
  createForm,
  getValue,
  setValue,
  submit,
  SubmitHandler,
} from "@modular-forms/solid";
import { ArrowUp, Square } from "lucide-solid";
import { createEffect, createMemo, onMount, Show } from "solid-js";
import { useChatContext } from "~/contexts/chatContext";
import { globalState, setGlobalState } from "~/stores/global";

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
    setValue(chatBoxForm, "charQuery", ""); // Clear input
    playSound();
  };

  const handleStop = () => {
    stopStreaming();
    playSound();
  };

  const handleSubmitKey = (event: KeyboardEvent) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      let chatQuery = getValue(chatBoxForm, "charQuery")!.trim();
      if (chatBoxForm.touched && chatQuery !== "" && !isStreaming()) {
        submit(chatBoxForm);
        // Force height reset after a brief delay to ensure state update
        setTimeout(() => {
          if (textareaRef) {
            textareaRef.style.height = "auto";
            textareaRef.value = ""; // Explicitly clear the DOM value
            resize();
          }
        }, 0);
      }
    }
  };

  let textareaRef: HTMLTextAreaElement | undefined;

  const resize = () => {
    if (!textareaRef) return;
    const maxHeight = 240;
    const scrollTop = textareaRef.scrollTop;
    const selectionStart = textareaRef.selectionStart;
    const selectionEnd = textareaRef.selectionEnd;
    const wasAtMaxHeight = textareaRef.style.height === maxHeight + "px";

    textareaRef.style.height = "auto";
    const naturalHeight = textareaRef.scrollHeight;

    if (naturalHeight <= maxHeight) {
      textareaRef.style.height = naturalHeight + "px";
      textareaRef.style.overflowY = "hidden";
    } else {
      textareaRef.style.height = maxHeight + "px";
      textareaRef.style.overflowY = "auto";
      if (wasAtMaxHeight) {
        requestAnimationFrame(() => {
          textareaRef.scrollTop = scrollTop;
          textareaRef.setSelectionRange(selectionStart, selectionEnd);
        });
      }
    }
  };

  // Effect to handle textarea state when streaming stops
  createEffect(() => {
    if (!isStreaming() && textareaRef) {
      textareaRef.disabled = false;
      textareaRef.style.height = "auto";
      resize();
    }
  });

  onMount(() => {
    setTimeout(async () => {
      if (globalState.textQuery) {
        await sendMessage(globalState.textQuery);
        setValue(chatBoxForm, "charQuery", "");
        setGlobalState("textQuery", "");
      }
    }, 100);

    if (!textareaRef) return;
    textareaRef.addEventListener("input", resize);
    resize(); // Initial resize
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
                  placeholder={
                    isStreaming()
                      ? "Consulting with the oracles"
                      : "Ask Atlas Anything..."
                  }
                  class="h-[40px] min-h-[40px] textarea border-none w-full resize-none focus:outline-none focus:ring-2 focus:ring-sky-500 rounded-xl overflow-hidden"
                  rows="1"
                  value={field.value || ""} // Ensure value is set
                  autocomplete="off"
                  autocorrect="off"
                  autocapitalize="off"
                  spellcheck="false"
                  disabled={isStreaming()} // Disable only during streaming
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
