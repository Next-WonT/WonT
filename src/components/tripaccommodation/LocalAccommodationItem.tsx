import { BsFillPlusCircleFill } from "react-icons/bs";
import { FaCheckCircle } from "react-icons/fa";
import DefaultImage from "@/components/common/DefaultImage";
import { SelectAccommodationsStore } from "@/store/AccommodationsStore";

type LocalAccommodationItemProps = {
  id: number;
  title: string;
  addr: string;
  imgSrc: string;
};

const LocalAccommodationItem = ({
  id,
  title,
  addr,
  imgSrc,
}: LocalAccommodationItemProps) => {
  const { selectedAccommodations, setSelectedAccommodations } =
    SelectAccommodationsStore();
  const isSelected = Boolean(
    selectedAccommodations?.filter(
      (accommodation) => accommodation.contentid == id,
    ).length,
  );

  return (
    <li className="group flex gap-3 p-3 items-center w-full bg-white rounded-xl">
      <DefaultImage src={imgSrc} />
      <div className="w-full">
        <p className="text-sm group-hover:sm:text-base group-hover:sm:font-semibold text-contentSecondary">
          {title || "장소 이름이 정확하지 않습니다."}
        </p>
        <p className="text-xs group-hover:sm:text-sm text-point">
          {addr || "주소가 정확하지 않습니다."}
        </p>
      </div>
      <button
        type="button"
        onClick={() => {
          setSelectedAccommodations(id);
        }}
      >
        {isSelected ? (
          <FaCheckCircle
            size="1.5625rem"
            color="#63D4F2"
            title="장소 선택 취소하기"
          />
        ) : (
          <BsFillPlusCircleFill
            size="1.5625rem"
            color="#777777"
            title="장소 선택하기"
          />
        )}
      </button>
    </li>
  );
};

export default LocalAccommodationItem;
