import { VolumeX, Volume2 } from "lucide-solid";

const SoundToggle = () => {
  return (
    <>
      <div class="tooltip tooltip-right" data-tip="Sound">
        <button class="btn btn-square rounded-xl btn-md">
          <Volume2 />
        </button>
      </div>
    </>
  );
};

export default SoundToggle;
