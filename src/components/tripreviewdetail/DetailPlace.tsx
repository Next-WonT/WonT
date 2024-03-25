import { useReviewStore } from "@/store/useReviewStore";
import React from "react";
import AddPlanButton from "../tripedit/AddPlanButton";
import { ReviewDataTypes } from "@/types/ReviewDataTypes";

interface DetailPlaceProps {
  reviewData: ReviewDataTypes | undefined;
}

function DetailPlace({ reviewData }: DetailPlaceProps) {
  // const { reviewData, setReviewData } = useReviewStore();
  console.log(reviewData);

  return (
    <div>
      {reviewData?.trip_date?.map((item, index) => (
        <React.Fragment key={index}>
          <div className="bg-secondary flex items-center h-14 px-5 gap-2 font-semibold justify-between">
            <span className="font-light text-contentMuted">
              {`Day${index + 1} | ${item}`}
            </span>
          </div>

          <AddPlanButton text="장소" index={index} />
          <AddPlanButton text="숙소" index={index} />
        </React.Fragment>
      ))}
    </div>
  );
}

export default DetailPlace;
