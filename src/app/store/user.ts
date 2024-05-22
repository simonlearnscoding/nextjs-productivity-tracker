'use client'
import { create } from 'zustand'
export const useUserStore = create<any>((set) => ({
  userId: null,
  setUserId: (userId: string) => set({ userId }),
}))
