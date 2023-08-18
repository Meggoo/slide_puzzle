import { create } from "zustand";

const useGameState = create((set) => ({
  id: null,
  size: 3,
  isTracking: true,
  time: null,
  moves: null,
  tiles: [],
  hole: { x: 0, y: 0 },
  update_state: (update) => set({ [update.key]: update.value }),
  reset: (size) =>
    set({
      size,
      isTracking: true,
      time: null,
      moves: null,
      tiles: [],
      hole: { x: 0, y: 0 },
    }),
}));

export default useGameState;
