import { create } from "zustand";

type Store = {
  earnings: number[];
  setEarnings: (info: number) => void;
  allSpending: number;
  setAllSpending: (info: number) => void;
};

export const useAmountStore = create<Store>()((set) => ({
  earnings: [],
  allSpending: 0,
  setEarnings: (info) =>
    set((data) => ({
      earnings: [...data.earnings, info],
    })),
  setAllSpending: (info) => set({ allSpending: info }),
}));
