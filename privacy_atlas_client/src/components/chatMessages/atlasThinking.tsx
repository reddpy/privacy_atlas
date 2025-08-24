import AtlasABR from "../atlasAbr";

const AtlasThinking = () => {
  return (
    <>
      <span>
        <AtlasABR /> is thinking
      </span>
      <div class="flex space-x-1">
        <div class="w-1 h-1 bg-sky-500 rounded-full animate-bounce"></div>
        <div
          class="w-1 h-1 bg-sky-500 rounded-full animate-bounce"
          style="animation-delay: 0.1s"
        ></div>
        <div
          class="w-1 h-1 bg-sky-500 rounded-full animate-bounce"
          style="animation-delay: 0.2s"
        ></div>
      </div>
    </>
  );
};

export default AtlasThinking;
