import { CircleEllipsis } from "lucide-solid";

const MenuToggle = () => {
  return (
    <>
      <div class="tooltip tooltip-right" data-tip="Menu">
        <button class="btn btn-square rounded-xl btn-xl">
          <CircleEllipsis />
        </button>
      </div>
    </>
  );
};

export default MenuToggle;
