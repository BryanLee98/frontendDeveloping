import { create } from "zustand"

export const useNavigationStore = create((set) => ({
  current: "",
  setCurrent: (newCurrent: string) => {
    set(() => ({
      current: newCurrent,
    }))
  },
}))
