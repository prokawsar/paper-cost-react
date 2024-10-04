import { User } from '@supabase/supabase-js'
import { create, StateCreator } from 'zustand'
import { persist, PersistOptions } from 'zustand/middleware'

export interface UserState {
  userData: User | null
  setUser: (param: any) => void
}

type UserPersist = (
  config: StateCreator<UserState>,
  options: PersistOptions<UserState>,
) => StateCreator<UserState>

export const useUserStore = create<UserState>(
  (persist as UserPersist)(
    (set) => ({
      userData: null,
      setUser: (value: any) => set(() => ({ userData: value })),
    }),
    {
      name: 'user-data',
    },
  ),
)

interface LoaderState {
  isLoading: boolean
  setIsLoading: (isLoading: boolean) => void
}

export const useLoadingStore = create<LoaderState>()((set) => ({
  isLoading: false,
  setIsLoading: (isLoading: boolean) => set({ isLoading }),
}))
