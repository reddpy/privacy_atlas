import { createSignal, createEffect } from "solid-js";
import { MessageCircleReply, VolumeX, Volume2, Sun } from "lucide-solid";

const SidebarHistory = () => {
  const [sidebarOpen, setSideBarOpen] = createSignal(false);

  const toggleOpen = () => {
    setSideBarOpen((prev_state) => !prev_state);
  };

  createEffect(() => {
    console.log("sidebar state: ", sidebarOpen());
  });

  return (
    <div class="drawer z-50 pt-2 pl-2">
      <input id="my-drawer" type="checkbox" class="drawer-toggle" />
      <div class="drawer-content">
        <div
          class={`${!sidebarOpen() ? "tooltip tooltip-right" : ""}`}
          data-tip="Message History"
        >
          <label
            for="my-drawer"
            class="btn btn-soft btn-square btn-xl drawer-button"
            onClick={toggleOpen}
          >
            <MessageCircleReply />
          </label>
        </div>
      </div>
      <div class="drawer-side ">
        <label
          for="my-drawer"
          aria-label="close sidebar"
          class="drawer-overlay"
          onClick={toggleOpen}
        ></label>
        <ul class=" rounded-xl m-2 menu bg-base-200 text-base-content min-h-[98%] w-60">
          {/* Sidebar content here */}
          <li>
            <a>Sidebar Item 1</a>
          </li>
          <li>
            <a>Sidebar Item 2</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SidebarHistory;
