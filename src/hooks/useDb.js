import { create } from "zustand";

const useDb = create((set) => ({
  instance: null,
  totalItems: null,
  name: "puzzle_database",
  store: "puzzle_store",
  index: "puzzle_index",
  update_db: (update) => set({ [update.key]: update.value }),
}));

export default useDb;
