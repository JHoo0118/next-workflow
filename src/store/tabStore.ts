import { create } from "zustand";

export type Tabs = "actions" | "details";

interface TabState {
  tab: Tabs;
  setTab: (tab: Tabs) => void;
}

const useTabStore = create<TabState>((set) => ({
  tab: "actions",
  setTab: (tab: Tabs) => set({ tab }),
}));

export default useTabStore;
