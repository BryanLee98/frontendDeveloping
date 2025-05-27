import { create } from "zustand"

export const usePageStore = create((set) => ({
  page: 1,
  setPage: (newPage: number) => {
    set(() => ({
      page: newPage,
    }))
  },
}))

export const useKeywordStore = create((set) => ({
  keyword: "",
  setKeyword: (newKeyword: string) => {
    set(() => ({
      keyword: newKeyword,
    }))
  },
}))

export const useDateStore = create((set) => ({
  prevDate: null as Date | null,
  endDate: null as Date | null,
  setPrevDate: (date: Date | null) => set({ prevDate: date }),
  setEndDate: (date: Date | null) => set({ endDate: date }),
}))
