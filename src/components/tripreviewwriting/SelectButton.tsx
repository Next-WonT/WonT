import {
  useDateModalStateStore,
  useRegionModalStateStore,
} from "@/store/useModalStateStore";
import React from "react";

type ButtonLargePropType = {
  isSelected?: boolean;
  href?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children?: React.ReactNode;
  type: string;
};

const SelectButton = ({
  onClick,
  children = "선택 완료",
  type,
}: ButtonLargePropType) => {
  const { showDateModal, setShowDateModal } = useDateModalStateStore();
  const { showRegionModal, setShowRegionModal } = useRegionModalStateStore();
  const buttonClasses = "w-80 h-16 rounded-xl font-bold text-white";

  const handleModalState = () => {
    type === "date" ? setShowDateModal(false) : setShowRegionModal(false);
  };

  return (
    <>
      <button
        type="button"
        onClick={handleModalState}
        className={`${buttonClasses} bg-primary text-center align-middle leading-[4rem]`}
      >
        {children}
      </button>
      {/* <ToastContainer /> */}
    </>
  );
};

export default SelectButton;
