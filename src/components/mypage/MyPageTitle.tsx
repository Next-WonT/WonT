import { useFetchTripDataStore } from "@/store/useFetchTripDataStore";
import { useReviewStore } from "@/store/useReviewStore";

interface MyPageTitleProps {
  text: string;
}

function MyPageTitle({ text }: MyPageTitleProps) {
  const { planData, setPlanData } = useFetchTripDataStore();
  const { reviewData, setReviewData } = useReviewStore();
  // console.log(text);

  return (
    <div className="flex gap-2">
      <span className="font-semibold">{text}</span>
      <div className="rounded-full w-5 h-5 text-sm  bg-primary flex justify-center self-center">
        <span className="m-auto text-white">
          {text === "나의 일정" ? planData?.length : reviewData?.length}
        </span>
      </div>
    </div>
  );
}

export default MyPageTitle;
