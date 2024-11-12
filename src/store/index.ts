import { User } from '@supabase/supabase-js'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface UserState {
  userData: User | null
  setUser: (param: any) => void
}

export const useUserStore = create<UserState>()(
  persist(
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
