import { create } from "zustand";

const useTheme = create((set) => ({
  value: "dark",
  key: "slide_puzzle_theme",
  themes: { dark: "dark", light: "light" },
  set_theme: (value) => set({ value }),
}));

export default useTheme;
