import Image from "next/image";
import { useEffect, useState } from "react";
import TourCategoryItem from "@/components/tripregion/TourCategoryItem";
import { RegionStore } from "@/store/RegionStore";
import { RegionToggleStore } from "@/store/RegionToggleStore";

type RegionItemProps = {
  regionName: string;
  regionCode: number;
};

const TripRegionItem = ({
  regionName = "지역이름",
  regionCode,
}: RegionItemProps) => {
  const { selectedRegionName, setRegionCode, setRegionName, resetRegionName } =
    RegionStore();
  const { toggleRegionName, setToggleRegionName } = RegionToggleStore();
  const [isToggle, setIsToggle] = useState(false);
  const [isImgError, setIsImgError] = useState<boolean>(false);

  const selectRegion = () => {
    setRegionCode(regionCode);
    setRegionName(regionName);
  };
  // const selectRegion = () => {
  //   if (!selectedRegionName) {
  //     setRegionCode(regionCode);
  //     setRegionName(regionName);
  //   } else {
  //     setToggleRegionName("");
  //   }
  //   if (!toggleRegionName) {
  //     setToggleRegionName(regionName);
  //   } else {
  //     setRegionCode(null);
  //     resetRegionName();
  //   }
  // };

  // useEffect(() => {
  //   if (toggleRegionName.length) setIsToggle(toggleRegionName == regionName);
  //   else setIsToggle(false);
  // }, [toggleRegionName, regionName]);

  return (
    <li
      className={`list-none ${isToggle && "grid col-span-2 sm:col-span-3 lg:col-span-4 2xl:col-span-6 my-3 pt-5 pb-6 border-y-4 border-button mx-3"}`}
    >
      <button
        type="button"
        onClick={selectRegion}
        className="flex flex-col items-center gap-3 px-3 py-2"
      >
        <Image
          src={
            isImgError
              ? "/svg/default-image.svg"
              : `/images/local/local${regionCode}.jpg`
          }
          width={200}
          height={200}
          alt="선택한 여행 지역"
          onError={() => setIsImgError(true)}
          className={`w-[8.4375rem] h-[8.4375rem] rounded-xl object-cover ${isToggle && "shadow-md shadow-gray-400"}`}
        />
        <p
          className={`mx-3 my-1 text-lg text-contentSecondary font-medium ${isToggle && "px-3 py-1 rounded-xl bg-point text-white shadow-md shadow-gray-400"}`}
        >
          {regionName}
        </p>
      </button>
    </li>
  );
};

export default TripRegionItem;
