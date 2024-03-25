import { create } from "zustand";
import { ReviewDataTypes } from "@/types/ReviewDataTypes";

interface ReviewStoreState {
  reviewData: ReviewDataTypes[] | null;
  setReviewData: (data: any[] | null) => void;
}

export const useReviewStore = create<ReviewStoreState>((set) => ({
  reviewData: [],
  setReviewData: (data: any[] | null) => set({ reviewData: data }),
}));
