"use client"
import { create } from "zustand";

interface ILoaderNavigationState {
  isLoadingNavigation: boolean;
  showLoaderNavigation: () => void;
  hideLoaderNavigation: () => void;
}

export const useNavigationLoaderStore = create<ILoaderNavigationState>((set) => ({
  isLoadingNavigation: false,
  showLoaderNavigation: () => set({ isLoadingNavigation: true }),
  hideLoaderNavigation: () => set({ isLoadingNavigation: false }),
}));
