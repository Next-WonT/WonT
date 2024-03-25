import { ReviewDataTypes } from "@/types/ReviewDataTypes";
import myPlanDefaultImage from "/public/mypage/myPlanDefaultImage.jpg";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import { useRef } from "react";

interface DetailReviewFeedProps {
  reviewData: ReviewDataTypes | undefined;
}

function DetailReviewFeed({ reviewData }: DetailReviewFeedProps) {
  SwiperCore.use([Pagination]);
  const swiperRef = useRef<SwiperCore>();

  if (reviewData) {
    return (
      <div className="flex flex-col gap-4">
        <Swiper
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          pagination={true}
          modules={[Pagination]}
          centeredSlides={true}
          className="aspect-square object-fill w-[560px]  mt-5"
        >
          {reviewData.review_image.map((image: string | undefined) => (
            <SwiperSlide>
              <img
                src={image}
                alt=""
                // className="aspect-square object-fill w-[560px]  mt-5 "
                className="w-full  mx-auto object-cover h-full"
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="my-4 p-3">
          <h3 className="font-bold text-2xl text-contentSecondary">
            {reviewData.title}
          </h3>
          <span className="font-light text-xs text-contentMuted">
            {`${reviewData?.trip_date[0]} - ${reviewData?.trip_date[reviewData.trip_date.length - 1]}`}
          </span>
          <p className="text-contentMuted my-4">{reviewData.review_data}</p>
          <button className="text-primary underline my-2">더보기</button>
        </div>
      </div>
    );
  }
}

export default DetailReviewFeed;
