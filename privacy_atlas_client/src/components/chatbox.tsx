import {
  createForm,
  getValue,
  setValue,
  submit,
  SubmitHandler,
} from "@modular-forms/solid";
import { createMemo, onMount, Setter } from "solid-js";

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
    textareaRef.addEventListener("input", () => {
      textareaRef!.style.height = "auto"; // reset
      textareaRef!.style.height = textareaRef!.scrollHeight + "px"; // grow
    });
  });

  return (
    <>
      <Form onSubmit={handleSubmit} onKeyDown={handleSubmitKey}>
        <div class="w-full max-w-2xl mx-auto">
          <div class="flex items-end gap-2 p-3 border border-red-400 rounded-2xl bg-base-100 shadow-md">
            <Field name="charQuery">
              {(field, props) => (
                <textarea
                  {...props}
                  id={field.name}
                  ref={textareaRef}
                  placeholder="Chat with Atlas..."
                  class="textarea border-none w-full resize-none focus:outline-none focus:ring-2 focus:ring-sky-500 rounded-xl overflow-hidden"
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
      </Form>
    </>
  );
};

export default ChatBox;
