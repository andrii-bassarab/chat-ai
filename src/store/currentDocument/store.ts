import { IDocument } from '@/types/Document';
import { IPage } from '@/types/Pages';
import { create } from 'zustand';

type State = {
  document: IDocument | null;
  pages: IPage[];
  currentPageFocusNumber: number;
  showScrollAnimation: boolean;
};

type Actions = {
  setPages: (newPages: IPage[]) => void;
  setCurrentPageFocusNumber: (currentPageFocusNumber: number) => void;
  goFocusOnNextPage: () => void;
  setShowScrollAnimation: (showScrollAnimation: boolean) => void;
  goFocusOnPrevPage: () => void;
  setDocument: (document: IDocument | null) => void;
};

export const useCurrentDocument = create<State & Actions>((set) => ({
  document: null,
  pages: [],
  currentPageFocusNumber: 1,
  showScrollAnimation: false,
  setPages: (pages: IPage[]) => set(() => ({ pages })),
  setCurrentPageFocusNumber: (currentPageFocusNumber: number) =>
    set(() => ({ currentPageFocusNumber })),
  goFocusOnNextPage: () =>
    set((state) => {
      if (state.currentPageFocusNumber + 1 > state.pages.length) {
        return state;
      }

      return {
        currentPageFocusNumber: state.currentPageFocusNumber + 1,
        showScrollAnimation: true,
      };
    }),
  goFocusOnPrevPage: () =>
    set((state) => {
      if (state.currentPageFocusNumber === 1) {
        return state;
      }

      return {
        currentPageFocusNumber: state.currentPageFocusNumber - 1,
        showScrollAnimation: true,
      };
    }),
  setShowScrollAnimation: (showScrollAnimation) => set(() => ({ showScrollAnimation })),
  setDocument: (document) => set(() => ({document}))
}));
