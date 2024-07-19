import { create } from 'zustand';

export const useStoreFilter = create((set) => ({
  storeFilter: {
    isOffLeash: false,
    isLargeDogAvailable: false,
    isNeedCage: false,
  },
  setStoreFilter: (newFilter) =>
    set((state) => ({
      storeFilter: { ...state.storeFilter, ...newFilter },
    })),
}));
