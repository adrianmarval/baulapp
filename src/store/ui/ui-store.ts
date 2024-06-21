import {create} from 'zustand';

interface UIState {
  isSidebarOpen: boolean;
  isLargeScreen: boolean;
  openSidebar: () => void;
  closeSidebar: () => void;
  toggleSidebar: () => void;
  setIsLargeScreen: (isLarge: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
  isSidebarOpen: false,
  isLargeScreen: false,
  openSidebar: () => set({isSidebarOpen: true}),
  closeSidebar: () => set({isSidebarOpen: false}),
  toggleSidebar: () => set((state) => ({isSidebarOpen: !state.isSidebarOpen})),
  setIsLargeScreen: (isLarge) =>
    set((state) => ({
      isLargeScreen: isLarge,
      isSidebarOpen: isLarge ? true : state.isSidebarOpen,
    })),
}));
