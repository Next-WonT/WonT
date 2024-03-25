import { ReviewDataTypes } from "@/types/ReviewDataTypes";
import EnterButton from "./EnterButton";
import { useRouter } from "next/router";

interface TripReviewFeedProps {
  reviewData: ReviewDataTypes;
}

function TripReviewFeed({ reviewData }: TripReviewFeedProps) {
  const router = useRouter();
  const handleReviewDetail = (e: React.MouseEvent, id: Number) => {
    router.push(`/tripreviewdetail/${id}`);
  };

  return (
    <button
      onClick={(e) => handleReviewDetail(e, reviewData.id)}
      className="flex flex-col  w-100%  border-[#EDF2F2] border-[1px]"
    >
      <img
        src={reviewData?.review_image[0]}
        alt=""
        className=" aspect-square object-cover"
      />
      <div className="flex flex-col px-3 w-full ">
        <span className="text-primary text-sm underline w-fit my-[26px] ">
          {reviewData.region === null ? "지역" : reviewData.region}
        </span>
        <h3 className="text-3xl font-bold text-contentSecondary mb-2 line-clamp-2 text-ellipsis overflow-clip self-start">
          {reviewData.title}
        </h3>
        <span className="text-xs text-contentMuted font-light self-start">
          {`${reviewData?.trip_date[0]} - ${reviewData?.trip_date[reviewData.trip_date.length - 1]}`}
        </span>
      </div>
      <div className="self-end px-3 my-auto mb-7">
        <EnterButton />
      </div>
    </button>
  );
}

export default TripReviewFeed;
