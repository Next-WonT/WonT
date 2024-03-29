import { TOUR_BASE_SEARCH } from "@/lib/tour/tour";
import React, { useEffect, useState } from "react";

const SearchInput = () => {
  return (
    <div className="flex justify-center relative items-center w-[320px] h-[60px]">
      <div className="flex gap-5 w-[320px] justify-center items-center pt-[15px]">
        <label className="flex items-center gap-3 w-full max-w-xs sm:max-w-md lg:max-w-lg 2xl:max-w-2xl px-3 border-b border-[#D0CFD7] overflow-hidden has-[:focus]:rounded-full has-[:focus]:border-4 has-[:focus]:border-primary fill-[#D0CFD7] focus-within:fill-primary has-[:focus]:shadow-lg">
          <svg className="w-5 h-5 fill-curent" viewBox="0 0 20 20">
            <path d="M17.8395 16.4605L14.1641 12.7852C15.0489 11.6072 15.5266 10.1733 15.525 8.7C15.525 4.93672 12.4633 1.875 8.7 1.875C4.93672 1.875 1.875 4.93672 1.875 8.7C1.875 12.4633 4.93672 15.525 8.7 15.525C10.1733 15.5266 11.6072 15.0489 12.7852 14.1641L16.4605 17.8395C16.6466 18.0058 16.8893 18.0945 17.1387 18.0876C17.3881 18.0806 17.6255 17.9784 17.8019 17.8019C17.9784 17.6255 18.0806 17.3881 18.0876 17.1387C18.0945 16.8893 18.0058 16.6466 17.8395 16.4605ZM3.825 8.7C3.825 7.73582 4.11091 6.79329 4.64659 5.9916C5.18226 5.18991 5.94363 4.56506 6.83442 4.19609C7.72521 3.82711 8.70541 3.73057 9.65107 3.91867C10.5967 4.10677 11.4654 4.57107 12.1471 5.25285C12.8289 5.93464 13.2932 6.80328 13.4813 7.74893C13.6694 8.69459 13.5729 9.67479 13.2039 10.5656C12.8349 11.4564 12.2101 12.2177 11.4084 12.7534C10.6067 13.2891 9.66418 13.575 8.7 13.575C7.40755 13.5734 6.16847 13.0593 5.25457 12.1454C4.34066 11.2315 3.82655 9.99245 3.825 8.7Z" />
          </svg>
          <input
            type="search"
            placeholder="여행지를 검색해 주세요."
            className="w-full p-3 text-sm font-light outline-none focus:text-content focus:font-medium"
          />
        </label>
        <button
          type="button"
          className="w-[60px] h-[32px] bg-primary text-white ml-[6px] rounded-md"
        >
          검색
        </button>
      </div>
    </div>
  );
};

export default SearchInput;
