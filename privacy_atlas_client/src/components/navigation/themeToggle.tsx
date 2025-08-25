import { Sun } from "lucide-solid";

const ThemeToggle = () => {
  return (
    <>
      <div class="tooltip tooltip-right" data-tip="Theme">
        <button class="btn btn-square rounded-xl btn-md">
          <Sun />
        </button>
      </div>
    </>
  );
};

export default ThemeToggle;
