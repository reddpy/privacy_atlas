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

const ChatBox = ({ inputSetter }: ChatBoxProps) => {
  const [chatBoxForm, { Form, Field }] = createForm<ChatBoxForm>();

  const isQueryEmpty = createMemo(() => {
    const queryValue = getValue(chatBoxForm, "charQuery");
    return !queryValue || queryValue.trim() === "";
  });

  const handleSubmit: SubmitHandler<ChatBoxForm> = (values, event) => {
    inputSetter(values.charQuery);
    setValue(chatBoxForm, "charQuery", "");
  };

  const handleSubmitKey = (event: KeyboardEvent) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      submit(chatBoxForm);
    }
  };

  let textareaRef: HTMLTextAreaElement | undefined;

  onMount(() => {
    if (!textareaRef) return;

    const resize = () => {
      const maxHeight = 240;

      textareaRef!.style.height = "auto";

      if (textareaRef!.scrollHeight <= maxHeight) {
        // Still within limit - grow normally
        textareaRef!.style.height = textareaRef!.scrollHeight + "px";
        textareaRef!.style.overflowY = "hidden";
      } else {
        // Hit the limit - make it scrollable
        textareaRef!.style.height = maxHeight + "px";
        textareaRef!.style.overflowY = "auto";
      }
    };

    textareaRef.addEventListener("input", resize);
    textareaRef.addEventListener("keydown", resize);
    textareaRef.addEventListener("keyup", resize);
  });

  return (
    <>
      <Form onSubmit={handleSubmit} onKeyDown={handleSubmitKey}>
        <div class="w-full max-w-2xl mx-auto">
          <div class="flex items-end gap-2 p-3 border border-[#B62E00] rounded-2xl bg-base-100 shadow-md">
            <Field name="charQuery">
              {(field, props) => (
                <textarea
                  {...props}
                  id={field.name}
                  ref={textareaRef}
                  placeholder="The Weight of Knowledge...Atlas bears"
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

export default ChatBox;
