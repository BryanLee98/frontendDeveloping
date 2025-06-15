import { create } from "zustand"

export const useAccessToken = create((set) => ({
  accessToken: "",
  setAccessToken: (newToken: string) =>
    set(() => ({
      accessToken: newToken,
    })),
}))
