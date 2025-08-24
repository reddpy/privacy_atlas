import { createStore } from "solid-js/store";

const [globalState, setGlobalState] = createStore({
  textQuery: "",
});

export { globalState, setGlobalState };
