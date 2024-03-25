import TripReviewWritingLayout from "@/layout/tripreviewwriting/layout";
import { debounce } from "@/utils/debounce";
import React, { useEffect, useRef, useState } from "react";
import { BsX } from "react-icons/bs";
import { Swiper, SwiperSlide } from "swiper/react";
import supabase from "@/lib/supabase/supabase";
import SwiperCore from "swiper";
import { Pagination } from "swiper/modules";
import { useUploadImage } from "@/utils/uploadReviewImage";
import ModalTripDate from "@/components/tripreviewwriting/ModalTripDate";
import calendarIcon from "/public/svg/calendar-selected.svg";
import regionIcon from "/public/svg/regionIcon-selected.svg";
import Image from "next/image";
import { DatesStore } from "@/store/DatesStore";
import {
  useSessionStore,
  useUserSessionIdStore,
} from "@/store/useSessionStore";

import "swiper/css";
import "swiper/css/pagination";
import ModalTripRegion from "@/components/tripreviewwriting/ModalTripRegion";
import {
  useDateModalStateStore,
  useRegionModalStateStore,
} from "@/store/useModalStateStore";
import { RegionStore } from "@/store/RegionStore";
import { useWriterStore } from "@/store/useWriterStore";

interface UserDataItems {
  avatar_url: string;
  email: string;
  full_name: string;
  id: string;
  nickname: string;
  username: string;
}

function index() {
  SwiperCore.use([Pagination]);
  const { userSession, setUserSession } = useSessionStore();
  const { userSessionId, setUserSessionId } = useUserSessionIdStore();
  const [textContents, setTextContents] = useState("");
  const [title, setTitle] = useState("");
  const [uploadImage, setUploadImage]: any = useState([]);
  const [imageSrc, setImageSrc]: any = useState([]);
  const { tripDates } = DatesStore();
  const { selectedRegionName } = RegionStore();
  const swiperRef = useRef<SwiperCore>();
  const { showDateModal, setShowDateModal } = useDateModalStateStore();
  const { showRegionModal, setShowRegionModal } = useRegionModalStateStore();
  const [userData, setUserData] = useState<UserDataItems[] | null>();
  const { writer, setWriter } = useWriterStore();

  useEffect(() => {
    const getUserSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      setUserSession(data);
      setUserSessionId(data.session?.user.id);
    };

    const fetchUesrData = async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select()
        .eq("id", userSessionId)
        .single();
      setUserData(data);
      setWriter(data?.nickname);
    };

    getUserSession();
    fetchUesrData();
  }, [userData, userSessionId, setUserData, setUserSession, setUserSessionId]);

  const titleHandler = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  }, 200);

  const handleTextContents = debounce(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const updatedText = e.target.value;
      setTextContents(updatedText);
    },
    500,
  );

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null) {
      const files = Array.from(e.target.files);
      setUploadImage((prevUploadImages: any) => [
        ...prevUploadImages,
        ...files,
      ]);

      const promises = files.map((file) => {
        return new Promise<void>((resolve) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => {
            setImageSrc((prevState: any) => [
              ...prevState,
              reader.result || null,
            ]);
            resolve();
          };
        });
      });

      Promise.all(promises).then(() => {
        console.log(imageSrc);
      });
    }
  };

  const handleDeleteImage = (e: React.MouseEvent, index: number) => {
    const targetImage = e.currentTarget.parentNode?.querySelector("img");
    const targetImageSrc = targetImage?.getAttribute("src");

    setUploadImage((prevUploadImages: any[]) =>
      prevUploadImages.filter((i) => i !== index),
    );

    if (targetImageSrc) {
      setImageSrc((prevImageSrc: any) =>
        prevImageSrc.filter((item: string) => item !== targetImageSrc),
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const imagePaths = await useUploadImage(uploadImage);
      const uploadImagePaths = imagePaths?.map((item) => item?.data.publicUrl);
      const { error } = await supabase.from("reviews").insert([
        {
          user_email: userSession?.user.email,
          review_data: textContents,
          review_image: uploadImagePaths || null,
          user_id: userSession?.user.id,
          title: title,
          region: selectedRegionName,
          trip_date: tripDates,
          writer: writer,
        },
      ]);
      if (textContents === "") {
        alert("글을 작성해주세요");
      }
      if (Array.from(imageSrc).length === 0) {
        alert("이미지를 선택해주세요");
      }
      if (error) {
        alert("리뷰 등록에 실패했습니다.");
        console.log(error);
      } else {
        alert("리뷰 작성이 완료되었습니다.");
        setTextContents("");
        setImageSrc([]);
        setTitle("");
      }
    } catch (error) {
      console.error(error);
      alert("리뷰 등록에 실패했습니다");
    }
  };

  const clickDateModal = () => setShowDateModal(!showDateModal);
  const clickRegionModal = () => setShowRegionModal(!showRegionModal);

  return (
    <TripReviewWritingLayout>
      <div className="flex flex-col lg:grid sm:grid-cols-2 mx-9 h-[90%]">
        <div className="w-full block  mx-auto relative border-[1px] h-[800px] box-content ">
          <form
            action=""
            className={
              Array.from(imageSrc).length === 0
                ? `bg-pink-300 absolute top-1/2 left-1/2 z-10 ml-[-50px] mt-[-50px]`
                : `hidden`
            }
          >
            <label
              htmlFor="input-file"
              className="input-file-button px-6 py-2 bg-primary text-white cursor-pointer w-8 h-5 rounded-md"
            >
              이미지 선택
            </label>
            <input
              type="file"
              id="input-file"
              className="hidden"
              accept="image/*"
              multiple
              onChange={(e) => handleUpload(e)}
            />
          </form>
          <Swiper
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            pagination={true}
            modules={[Pagination]}
            centeredSlides={true}
            className="w-full  mx-auto h-full flex overflow-hidden bg-slate-100"
          >
            {imageSrc.map((image: string | undefined, index: number) => (
              <SwiperSlide
                key={index}
                className="relative h-full flex items-center"
              >
                <img
                  src={image}
                  alt=""
                  className="w-full  mx-auto object-scale-down h-full"
                />
                <button
                  type="button"
                  className="absolute top-0 right-0 p-1"
                  onClick={(e) => handleDeleteImage(e, index)}
                >
                  <BsX color="#828282" />
                </button>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className=" grid row-auto  border border-gray-300 ">
          <form
            action=""
            className="border-b border-gray-300 outline-none w-full flex items-center"
          >
            <input
              type="text"
              placeholder="제목을 입력하세요"
              className="outline-none w-full p-3"
              onChange={titleHandler}
            />
          </form>
          <div className="flex px-4 items-center gap-2  border-gray-300 relative">
            <Image
              width={100}
              height={100}
              src={calendarIcon}
              alt="캘린더 아이콘"
              className="w-6 h-6 "
              onClick={clickDateModal}
            />

            <span
              className={
                tripDates?.length === 0
                  ? "text-contentSecondary"
                  : `text-primary`
              }
            >
              {tripDates !== null && tripDates?.length > 0
                ? `${tripDates[0]} - ${tripDates[tripDates.length - 1]} `
                : "날짜를 선택하세요."}
            </span>
          </div>
          {showDateModal && <ModalTripDate clickModal={clickDateModal} />}

          <div className="flex  px-4 items-center gap-2  border-t border-gray-300 relative">
            <Image
              width={100}
              height={100}
              src={regionIcon}
              alt="지역 아이콘"
              className="w-6 h-6 "
              onClick={clickRegionModal}
            />

            <span
              className={
                selectedRegionName === null
                  ? `text-contentSecondary`
                  : `text-primary`
              }
            >
              {selectedRegionName !== null
                ? selectedRegionName
                : "지역을 선택해주세요."}
            </span>
          </div>
          {showRegionModal && <ModalTripRegion clickModal={clickRegionModal} />}
          <textarea
            name=""
            id=""
            placeholder="리뷰를 작성해주세요."
            cols={30}
            rows={10}
            className="border-t border-gray-300 outline-none resize-none p-3 h-full w-full grow row-span-2"
            onChange={handleTextContents}
          ></textarea>
        </div>
        <button
          onClick={handleSubmit}
          className="w-full bg-point text-white py-3 px-4 col-span-2 my-4 mb-10 rounded-sm"
        >
          리뷰 작성
        </button>
      </div>
    </TripReviewWritingLayout>
  );
}

export default index;
