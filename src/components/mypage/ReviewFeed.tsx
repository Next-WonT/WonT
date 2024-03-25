import { ReviewDataTypes } from "@/types/ReviewDataTypes";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface TripReviewFeedProps {
  reviewData: ReviewDataTypes;
}

function ReviewFeed({ reviewData }: TripReviewFeedProps) {
  const [year, setYear] = useState<number>();
  const [month, setMonth] = useState<string>();

  useEffect(() => {
    let reviewDate = new Date(reviewData.trip_date[0]);
    let reviewYear = reviewDate.getFullYear();
    setYear(reviewYear);
    let reviewMonth = ("0" + (reviewDate.getMonth() + 1)).slice(-2);
    setMonth(reviewMonth);
  }, [setYear, setMonth]);

  const router = useRouter();
  const handleReviewDetail = (e: React.MouseEvent, id: Number) => {
    router.push(`/tripreviewdetail/${id}`);
  };

  return (
    <li className="w-full items-center flex flex-col h-fit bg-white justify-center">
      <button
        onClick={(e) => handleReviewDetail(e, reviewData.id)}
        className="bg-white flex flex-col items-center justify-center"
      >
        <img
          src={Array.from(reviewData.review_image)[0]}
          alt=""
          className="w-100% object-cover"
        />
        <span className="mt-10 text-contentMuted text-xs">
          {`${year}년 ${month}월`}
        </span>
        <span className="mb-10 font-semibold text-[16px] text-contentSecondary">
          {`${reviewData.region} 여행`}
        </span>
      </button>
    </li>
  );
}

export default ReviewFeed;
