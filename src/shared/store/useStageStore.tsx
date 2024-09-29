import { create } from 'zustand';

import { Activity, Letter } from '../types';

interface StoreState {
  abc: Letter[] | [];
  setABC: (abc: Letter[]) => void;
  isAbcLoading: boolean;
  setIsAbcLoading: (isAbcLoading: boolean) => void;
  activity: Activity[] | [];
  setActivity: (activity: Activity[]) => void;
  isActivityLoading: boolean;
  setIsActivityLoading: (isActivityLoading: boolean) => void;
}

export const useStageStore = create<StoreState>((set) => ({
  abc: [],
  setABC: (abc: Letter[]) => set((state) => ({ ...state, abc })),
  isAbcLoading: false,
  setIsAbcLoading: (isAbcLoading: boolean) =>
    set((state) => ({ ...state, isAbcLoading })),
  activity: [],
  setActivity: (activity: Activity[]) =>
    set((state) => ({ ...state, activity })),
  isActivityLoading: false,
  setIsActivityLoading: (isActivityLoading: boolean) =>
    set((state) => ({ ...state, isActivityLoading })),
}));
