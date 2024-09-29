import { create } from 'zustand';

import { Letter } from '../types';

interface StoreState {
  abc: Letter[] | [];
  setABC: (abc: Letter[]) => void;
  isAbcLoading: boolean;
  setIsAbcLoading: (isLoading: boolean) => void;
}

export const useStageStore = create<StoreState>((set) => ({
  abc: [],
  setABC: (abc: Letter[]) => set((state) => ({ ...state, abc })),
  isAbcLoading: false,
  setIsAbcLoading: (isLoading: boolean) =>
    set((state) => ({ ...state, isAbcLoading: isLoading })),
}));
