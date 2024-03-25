import MapPin from "./MapPin";
import { AiFillPlusCircle } from "react-icons/ai";
import { BsX } from "react-icons/bs";
import { SelectAccommodationsStore } from "@/store/AccommodationsStore";
import { SelectPlacesStore } from "@/store/PlacesStore";
import Router from "next/router";

interface AddPlanButtonProps {
  text?: string;
  place?: string;
  index: number;
  placeIndex?: number | undefined;
  accommondationIndex?: number | undefined;
  onDragStart?: (e: React.DragEvent) => void;
  onDragOver?: (e: React.DragEvent) => void;
  onDrop?: (e: React.DragEvent<Element>) => void;
  handleRoute?: (e: React.MouseEvent) => void;
  handleRemove?: (e: React.MouseEvent) => void;
}

function AddPlanButton({
  text,
  place,
  index,
  placeIndex,
  accommondationIndex,
}: AddPlanButtonProps) {
  const { selectedAccommodations, setSelectedAccommodationsArray } =
    SelectAccommodationsStore();
  const { selectedPlaces, setSelectedPlacesArray } = SelectPlacesStore();

  const handleRoute = (e: React.MouseEvent, index: number) => {
    const target = e.currentTarget.textContent;

    if (target === "장소를 추가해주세요.") {
      Router.push(`/tripplace/${index + 1}`);
      // Router.push("/tripplace");
    } else if (target === "숙소를 추가해주세요.") {
      Router.push(`/tripaccommodation/${index + 1}`);
    }
  };

  const handleRemove = (
    e: React.MouseEvent,
    placeIndex: number | undefined,
    accommondationIndex: number | undefined,
  ) => {
    e.stopPropagation();

    if (text === "장소" && placeIndex) {
      const newSelectedPlaces = Array.from(selectedPlaces || []);
      if (
        newSelectedPlaces.length > placeIndex &&
        newSelectedPlaces[index].length > placeIndex
      ) {
        const item = newSelectedPlaces[index][placeIndex];
        newSelectedPlaces[index].splice(placeIndex, 1);
        setSelectedPlacesArray(newSelectedPlaces);
      }
    }

    if (text === "숙소" && accommondationIndex) {
      const newSelectedPlaces = Array.from(selectedAccommodations || []);
      if (
        newSelectedPlaces.length > accommondationIndex &&
        newSelectedPlaces[index].length > accommondationIndex
      ) {
        const item = newSelectedPlaces[index][accommondationIndex];
        newSelectedPlaces[index].splice(accommondationIndex, 1);
        setSelectedAccommodationsArray(newSelectedPlaces);
      }
    }
  };

  return (
    <div
      className="flex h-14 border-[1px] border-[#EDF2F2]  bg-[#F3F5F5] items-center justify-between px-5 w-full cursor-pointer"
      onClick={(e) => handleRoute(e, index)}
    >
      <div className="flex justify-between w-full items-center">
        {text === "장소" && place ? (
          <span className="flex items-center gap-2">
            <MapPin color="#63D4F2" />
            {place}
          </span>
        ) : text === "장소" ? (
          <span className="flex items-center gap-2">
            <MapPin color="#63D4F2" />
            장소를 추가해주세요.
          </span>
        ) : text === "숙소" && place ? (
          <span className="flex items-center gap-2">
            <MapPin color="#F38733" />
            {place}
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <MapPin color="#F38733" />
            숙소를 추가해주세요.
          </span>
        )}
      </div>
      {(text === "장소" && selectedPlaces?.length !== 0) ||
      (text === "숙소" && selectedAccommodations?.length !== 0) ? (
        <button
          onClick={(e) => handleRemove(e, placeIndex, accommondationIndex)}
        >
          <BsX color="#828282" />
        </button>
      ) : (
        <AiFillPlusCircle size="28px" color="#828282" />
      )}
    </div>
  );
}

export default AddPlanButton;
