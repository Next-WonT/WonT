import Image from "next/image";
import myPlanDefaultImage from "/public/mypage/myPlanDefaultImage.jpg";
import MyPageTitle from "./MyPageTitle";
import React, { useEffect, useState } from "react";
import supabase from "@/lib/supabase/supabase";
import { useSessionStore } from "@/store/useSessionStore";
import { TOUR_BASE_AREA } from "@/lib/tour/tour";
import Router from "next/router";
import { useFetchTripDataStore } from "@/store/useFetchTripDataStore";
import { getDDay } from "@/utils/getDDay";

type RegionDataType = {
  rnum: number;
  name: string;
  url: string;
};

function MyPlan() {
  const { userSession, setUserSession } = useSessionStore();
  const [userSessionId, setUserSessionId] = useState<string | undefined>();
  const { planData, setPlanData } = useFetchTripDataStore();
  const [regionData, setRegionData] = useState<RegionDataType[] | null>(null);
  const [tripPlan, setTripPlan] = useState<RegionDataType[]>();

  useEffect(() => {
    const fetchingPlanData = async () => {
      const { data, error } = await supabase
        .from("tripplan")
        .select()
        .eq("user_id", userSession?.user.id)
        .order("created_at", { ascending: false });

      setPlanData(data);

      if (error) {
        console.error(error);
      }
    };
    fetchingPlanData();
  }, []);

  useEffect(() => {
    (async () => {
      const response = await fetch(TOUR_BASE_AREA);
      const json = await response.json();

      const dataWithImages = json.response.body.items.item.map(
        (item: RegionDataType, rnum: number) => ({
          ...item,
          url: `/images/local/local${rnum}.jpg`,
        }),
      );
      setRegionData(dataWithImages);
    })();
  }, []);

  useEffect(() => {
    if (regionData && planData) {
      const findRegion = regionData.filter((item) => item.name);
      const planRegion = planData
        .map((palndata) => `${palndata.region_name}`)
        .toString();
      const foundRegions = findRegion.filter((item) =>
        planRegion.includes(item.name),
      );

      setTripPlan(foundRegions);
    }
  }, [regionData, planData]);

  const handleRoute = (e: React.MouseEvent, id: number) => {
    Router.push(`/tripedit/${id}`);
  };

  useEffect(() => {
    console.log(planData);
    console.log(planData?.map((planItem) => planItem.trip_date));
    const firstItemFirstDate = planData?.[0]?.trip_date?.at(0);
    const lastItem = planData?.at(-1);
    const lastItemLastDate = lastItem?.trip_date?.at(-1);
    console.log(firstItemFirstDate);
    console.log(lastItem);

    // console.log(planData?.map((planItem) => planItem.trip_date[0]));
  }, [planData]);

  return (
    <div>
      <MyPageTitle text="나의 일정" />
      <div className="grid my-5 sm:grid-cols-1 md:grid-cols-2  2xl:grid-cols-4 gap-3">
        {planData?.map((planItem) => (
          <React.Fragment key={planItem.id}>
            <div className=" rounded-lg bg-gradient-to-t from-slate-800/40 via-white/10 h-[98%] z-20 relative">
              {tripPlan?.map((item, index) => (
                <React.Fragment key={index}>
                  <button
                    className="w-100% h-[200px] sm:h-[280px] w-full object-cover rounded-lg"
                    onClick={(e) => handleRoute(e, planItem.id)}
                  >
                    <Image
                      width={100}
                      height={100}
                      src={item.url}
                      alt="Plan Image"
                      className="w-100% h-full sm:h-[280px] w-full object-cover rounded-lg "
                    />
                  </button>
                </React.Fragment>
              ))}
              <div className="absolute bottom-3 left-3 flex flex-col ">
                <span className="text-xl font-semibold text-white">
                  {planItem.region_name}
                </span>
                <span className="text-sm font-light text-background text-white">
                  {`${planItem?.trip_date[0]} - ${planItem?.trip_date[planItem?.trip_date.length - 1]}`}
                </span>
              </div>

              <span className="absolute bottom-3 right-3 text-secondary">
                {getDDay(new Date(planItem.trip_date[0]))}
              </span>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default MyPlan;
