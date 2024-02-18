import { create } from 'zustand';

type State = {
  input: string;
};

type Actions = {
  setInput: (text: string) => void;
};

export const useSearchOnDocument = create<State & Actions>((set) => ({
  input: '',
  setInput: (input) => set(() => ({ input })),
}));
