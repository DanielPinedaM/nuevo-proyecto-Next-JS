'use client';
import { create } from 'zustand';

interface IMenuState {
  showMenu: boolean;
  hiddenMenu: () => void;
  handleMenu: () => void;
}

export const useMenuStore = create<IMenuState>((set) => ({
  showMenu: true,
  hiddenMenu: () => set(() => ({ showMenu: false })),
  handleMenu: () =>
    set((state) => ({
      showMenu: !state.showMenu,
    })),
}));
