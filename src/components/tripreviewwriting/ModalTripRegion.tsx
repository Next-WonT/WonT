import { useEffect, useState } from "react";
import SelectButton from "./SelectButton";
import { RegionStore } from "@/store/RegionStore";
import RegionItem from "../tripregion/RegionItem";
import { TOUR_BASE_AREA } from "@/lib/tour/tour";
import TripRegionItem from "./TripRegionItem";

type RegionDataType = {
  rnum: number;
  code: number;
  name: string;
};

const ModalTripRegion = (props: { clickModal: any }) => {
  const { clickModal } = props;
  const [regionData, setRegionData] = useState<RegionDataType[] | null>(null);
  const { selectedRegionName, setRegionName } = RegionStore();

  useEffect(() => {
    (async () => {
      const response = await fetch(TOUR_BASE_AREA);
      const json = await response.json();
      setRegionData(json.response.body.items.item);
    })();
  }, []);
  console.log(selectedRegionName);

  return (
    <div onClick={clickModal}>
      <div onClick={(e) => e.stopPropagation()}>
        <ul className="grid place-items-center grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6 overflow-y-auto max-h-96">
          {regionData?.map((region: RegionDataType) => {
            0;
            return (
              <TripRegionItem
                key={region.rnum}
                regionCode={region.rnum - 1}
                regionName={region.name}
              />
            );
          })}
        </ul>
        <SelectButton type="region" />
      </div>
    </div>
  );
};

export default ModalTripRegion;
