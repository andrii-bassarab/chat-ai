import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type UserId = string | null;

type State = {
  userId: UserId;
  isAuthorized: boolean;
};

type Actions = {
  setUserId: (userId: UserId) => void;
  setIsAuthorized: (isAuthorized: boolean) => void;
};

export const useUserStore = create<State & Actions>()(
  persist(
    (set) => ({
      userId: null,
      isAuthorized: false,
      setUserId: (userId) => set({ userId }),
      setIsAuthorized: (isAuthorized) => set({ isAuthorized }),
    }),
    {
      name: 'user',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
