import React from "react";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { AiOutlineHome } from "react-icons/ai";
import { PiUser } from "react-icons/pi";
import MyBookmarkIcon from "@/components/mypage/MyBookmarkIcon";
import Image from "next/image";
import detailPlaceDefault from "/public/detailpage/detailPlaceDefault.jpg";
import Router from "next/router";

function HeaderTripReview() {
  return (
    <header className="bg-white p-5">
      <nav className="flex justify-between gap-3">
        <button type="button" onClick={() => Router.back()}>
          <IoArrowBackCircleOutline size="30px" color="#363636" />
        </button>
        {/* <div className="flex gap-3">
          <button>
            <MyBookmarkIcon size="30px" fill="#363636" />
          </button>
        </div> */}
        <div className="flex gap-3">
          <button type="button" onClick={() => Router.push(`/main`)}>
            <AiOutlineHome size="30px" color="#363636" />
          </button>
          <button type="button" onClick={() => Router.push(`/mypage`)}>
            <PiUser size="30px" color="#363636" />
          </button>
        </div>
      </nav>
      <hr className="my-5" />
    </header>
  );
}

export default HeaderTripReview;
