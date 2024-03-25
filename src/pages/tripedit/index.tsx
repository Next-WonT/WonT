import SaveButton from "@/components/tripedit/SaveButton";
import TripDays from "@/components/tripedit/TripDays";
import TripEditMap from "@/components/tripedit/TripEditMap";
import TripEditLayout from "@/layout/tripedit/layout";
import { RegionStore } from "@/store/RegionStore";
import React, { useEffect, useState } from "react";
import { DatesStore } from "@/store/DatesStore";
import { useRouter } from "next/router";
import { SelectPlacesStore } from "@/store/PlacesStore";
import { SelectAccommodationsStore } from "@/store/AccommodationsStore";
import { useSessionStore } from "@/store/useSessionStore";
import supabase from "@/lib/supabase/supabase";
import { SelectedPlanStore } from "@/store/SelectedPlanStore";

function TripEdit() {
  const { selectedRegionName, resetRegionName } = RegionStore();
  const { tripDates, resetTripDates } = DatesStore();
  const { selectedPlaces } = SelectPlacesStore();
  const { selectedAccommodations } = SelectAccommodationsStore();
  const { userSession, setUserSession } = useSessionStore();
  const [userSessionId, setUserSessionId] = useState<string | undefined>();
  const { selectedPlan, setSelectedPlan } = SelectedPlanStore();
  const router = useRouter();

  //TODO@uniS2: 각 일자에 맞는 숙박 선택 정보 제공을 위한 storage 초기화
  // const clearAccommodationIdStorage = SelectAccommodationStore.persist.clearStorage;

  useEffect(() => {
    const combinedData = selectedPlaces?.map((places, index) => {
      if (selectedAccommodations) {
        const accommodations = selectedAccommodations[index] || [];

        return {
          places,
          accommodations,
        };
      }
    });
    setSelectedPlan(combinedData);
  }, [selectedPlaces, selectedAccommodations]);

  useEffect(() => {
    const getUserSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      setUserSession(data);
      setUserSessionId(data.session?.user.id);
    };
    getUserSession();
  }, []);

  const handleModify = () => {
    resetRegionName();
    resetTripDates();

    router.push("/tripregion");
  };

  const handleSave = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      if (
        selectedRegionName &&
        selectedAccommodations?.length !== 0 &&
        selectedPlaces?.length !== 0
      ) {
        const { error } = await supabase.from("tripplan").insert([
          {
            user_email: userSession?.user.email,
            region_name: selectedRegionName,
            user_id: userSession?.user.id,
            places: selectedPlaces,
            accommodations: selectedAccommodations,
            plan: selectedPlan,
            trip_date: tripDates,
          },
        ]);
        if (error) {
          alert("일정 등록에 실패했습니다");
          console.log(error);
        } else {
          alert("일정이 저장되었습니다.");
          resetRegionName();
          resetTripDates();
          router.reload();
        }
      }
    } catch (error) {
      console.error(error);
      alert("리뷰 등록에 실패했습니다");
    }
  };

  if (tripDates) {
    return (
      <TripEditLayout>
        <div>
          <TripEditMap />
          <div className="w-full h-[80px] bg-contentSecondary flex justify-between items-center px-5">
            <div className="flex flex-col">
              <span className="text-white">{selectedRegionName}</span>

              <span className="text-white">{`${tripDates[0]} - ${tripDates[tripDates?.length - 1]}`}</span>
            </div>
            <button
              className="border-[1px] w-[56px] h-7 rounded-md border-contentMuted text-contentMuted text-sm"
              onClick={handleModify}
            >
              수정
            </button>
          </div>
          <section>
            <div className="mt-7 mb-10">
              <TripDays />
              <SaveButton text="저장" handleSave={handleSave} />
            </div>
          </section>
        </div>
      </TripEditLayout>
    );
  }
}

export default TripEdit;
