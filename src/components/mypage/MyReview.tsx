import MyPageTitle from "@/components/mypage/MyPageTitle";
import ReviewFeed from "@/components/mypage/ReviewFeed";
import supabase from "@/lib/supabase/supabase";
import { useReviewStore } from "@/store/useReviewStore";
import { useSessionStore } from "@/store/useSessionStore";
import { useEffect, useState } from "react";

function MyReview() {
  const [review, setReview] = useState<any[] | null>();
  const { userSession, setUserSession } = useSessionStore();
  const { reviewData, setReviewData } = useReviewStore();

  useEffect(() => {
    const fetchingReviewData = async () => {
      const { data, error } = await supabase
        .from("reviews")
        .select()
        .eq("user_id", userSession?.user.id)
        .order("created_at", { ascending: false });
      setReview(data);
      setReviewData(data);
      if (error) {
        console.error(error);
      }
    };

    fetchingReviewData();
    console.log(review);
  }, [setReview]);

  return (
    <div>
      <MyPageTitle text="여행 리뷰" />
      <ul className="grid grid-cols-2 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 my-5 gap-3 ">
        {review?.map((item) => <ReviewFeed reviewData={item} />)}
      </ul>
    </div>
  );
}

export default MyReview;
