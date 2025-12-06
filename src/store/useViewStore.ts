import { create } from "zustand";
import { ViewMode } from "../types";

interface ViewStore {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
}

export const useViewStore = create<ViewStore>((set) => ({
  viewMode: ViewMode.Board, // default
  setViewMode: (mode) => set({ viewMode: mode }),
  isModalOpen: false,
  setIsModalOpen: (value) => set({ isModalOpen: value }),
}));
