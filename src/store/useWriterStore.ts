import { create } from "zustand";

interface useWriterStoreType {
  writer: string;
  setWriter: (nickname: string) => void;
}

export const useWriterStore = create<useWriterStoreType>((set) => ({
  writer: "",
  setWriter: (nickname: string) => set({ writer: nickname }),
}));
