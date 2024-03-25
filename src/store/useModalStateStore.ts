import { create } from "zustand";

type ModalDateStateStoreType = {
  showDateModal: boolean;
  setShowDateModal: (state: boolean) => void;
};
type ModalRegionStateStoreType = {
  showRegionModal: boolean;
  setShowRegionModal: (state: boolean) => void;
};

export const useDateModalStateStore = create<ModalDateStateStoreType>(
  (set) => ({
    showDateModal: false,
    setShowDateModal: (state: boolean) => set({ showDateModal: state }),
  }),
);

export const useRegionModalStateStore = create<ModalRegionStateStoreType>(
  (set) => ({
    showRegionModal: false,
    setShowRegionModal: (state: boolean) => set({ showRegionModal: state }),
  }),
);
