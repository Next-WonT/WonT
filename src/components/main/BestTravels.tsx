import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import supabase from "@/lib/supabase/supabase";
import { useReviewStore } from "@/store/useReviewStore";

interface TravelsProps {
  id: number;
  title: string;
  date: string;
  writer: string;
}

const BestTravels = () => {
  const [travelsData, setTravelsData] = useState<TravelsProps[] | null>(null);
  const { reviewData, setReviewData } = useReviewStore();

  // useEffect(() => {
  //   (async () => {
  //     const { data, error } = await supabase.from("travels").select("*");
  //     if (data) {
  //       setTravelsData(data);
  //     }
  //   })();
  // }, []);

  useEffect(() => {
    const fetchingReviewData = async () => {
      const { data, error } = await supabase
        .from("reviews")
        .select()
        .order("created_at", { ascending: false });
      setReviewData(data);
      if (error) {
        console.error(error);
      }
    };

    fetchingReviewData();
  }, []);

  return (
    <div className=" w-[320px]">
      <div className="flex justify-between border-b-2 items-center my-[26px]">
        <p className="text-[24px] font-bold">Best 여행기</p>
      </div>
      {reviewData &&
        reviewData.map((travel) => (
          <div
            key={travel.id}
            className="border-8 hover:scale-110 transition mb-[20px]"
          >
            <Link href={`/tripreviewdetail/${travel.id}`}>
              {/* <Image
                src="/mypage/myReviewDefaultImage-1.jpg"
                alt={travel.title}
                width={360}
                height={200}
              /> */}
              <img src={travel.review_image[0]} alt="" />
              <div className="py-[20px] flex flex-col gap-3 justify-center mx-auto">
                <p className="self-center">{travel.title}</p>
                <div className="text-contentMuted flex justify-center">
                  <p>{travel.writer}</p>
                  <p>
                    {`${travel?.trip_date[0]} - ${travel?.trip_date[travel.trip_date.length - 1]}`}
                  </p>
                </div>
              </div>
            </Link>
          </div>
        ))}
    </div>
  );
};

export default BestTravels;
