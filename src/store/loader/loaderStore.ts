import { create } from "zustand";

export interface ILoaderState {
  isLoading: boolean;
  showLoader: () => void;
  hideLoader: () => void;
}

export const useLoaderStore = create<ILoaderState>((set) => ({
  isLoading: false,
  showLoader: () => set({ isLoading: true }),
  hideLoader: () => set({ isLoading: false }),
}));
