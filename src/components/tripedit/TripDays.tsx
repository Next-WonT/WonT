import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import AddPlanButton from "./AddPlanButton";
import React, { useEffect } from "react";
import { CiSquareChevDown, CiSquareChevUp } from "react-icons/ci";
import { motion } from "framer-motion";
import { useViewPlanStore } from "@/store/useViewPlanStore";
import { DatesStore } from "@/store/DatesStore";
import Router from "next/router";
import { SelectPlacesStore } from "@/store/PlacesStore";
import AddSchedule from "./AddSchedule";
import { SelectAccommodationsStore } from "@/store/AccommodationsStore";

interface TripDaysProps {
  days?: string;
  // date?: string;
  date?: any;
  tripDate?: string[];
}

function TripDays() {
  const { viewPlanStates, setViewPlanStates } = useViewPlanStore();
  const { selectedPlaces /* setSelectedPlacesArray */ } = SelectPlacesStore();
  const { selectedAccommodations /* setSelectedAccommodationArray */ } =
    SelectAccommodationsStore();
  const { tripDates } = DatesStore();
  console.log(selectedAccommodations);
  console.log(selectedPlaces);

  useEffect(() => {
    setViewPlanStates(new Array(tripDates?.length).fill(true));
  }, []);

  const onDragEnd = (result: { destination: any; source: any }) => {
    const { destination, source } = result;

    if (destination && destination.index !== source.index) {
      // const newSelectedAccommodations = Array.from(selectedAccommodations);
      const newSelectedPlaces = Array.from(selectedPlaces || []);
      console.log(...newSelectedPlaces, 1);

      const [removed] = newSelectedPlaces.splice(source.index, 1);
      newSelectedPlaces.splice(destination.index, 0, removed);

      // setSelectedPlacesArray(newSelectedPlaces);
    }
  };

  const handleViewPlan = (e: React.MouseEvent, index: number) => {
    const newViewPlanStates = [...viewPlanStates];
    newViewPlanStates[index] = !newViewPlanStates[index];

    setViewPlanStates(newViewPlanStates);
  };

  // const handleRoute = (e: React.MouseEvent) => {
  //   const target = e.currentTarget.textContent;
  //   console.log(target);

  //   // if (target === "장소를 추가해주세요.") {
  //   //   Router.push("/tripplace");
  //   // } else if (target === "숙소를 추가해주세요.") {
  //   //   Router.push("/tripaccommodation");
  //   // }
  // };

  const variants = {
    open: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
    closed: {
      height: 0,
      transition: {
        type: "spring",
        bounce: 0,
        duration: 0.3,
      },
    },
  };

  // console.log("selectedPlaces", selectedPlaces);
  console.log("0번", selectedPlaces && selectedPlaces[0]);
  // console.log(selectedPlaces?.map((item, index) => index));

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <ul className="flex flex-col my-5 gap-[10px]">
        {(tripDates?.length !== 0 && selectedAccommodations?.length !== 0) ||
        selectedPlaces?.length !== 0 ? (
          tripDates?.map((item, index) => (
            <React.Fragment key={item}>
              <div className="bg-secondary flex items-center h-14 px-5 gap-2 font-semibold justify-between">
                <span className="font-light text-contentMuted">
                  {`Day${index + 1} | ${item}`}
                </span>
                <button
                  className="p-0 m-0"
                  onClick={(e) => handleViewPlan(e, index)}
                >
                  {viewPlanStates[index] ? (
                    <CiSquareChevUp size={20} color="#828282" />
                  ) : (
                    <CiSquareChevDown size={20} color="#828282" />
                  )}
                </button>
              </div>
              <AddSchedule index={index} />
              <Droppable droppableId={`day-${index}`}>
                {(provided) => (
                  <motion.div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="overflow-hidden"
                    animate={viewPlanStates[index] ? "open" : "closed"}
                    variants={variants}
                    transition={{ ease: "easeIn", duration: 0.3 }}
                    style={{ originY: 0.55 }}
                  >
                    {selectedPlaces &&
                      selectedPlaces[index]?.map((item, index) => (
                        <Draggable
                          key={item.title}
                          draggableId={item.title}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <AddPlanButton
                                text="장소"
                                place={item.title}
                                key={index}
                                index={index}
                                // handleRemove={handleRemove}
                              />
                            </div>
                          )}
                        </Draggable>
                      ))}

                    {selectedAccommodations &&
                      selectedAccommodations[index]?.map((item, index) => (
                        <Draggable
                          key={item?.title}
                          draggableId={item.title}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <AddPlanButton
                                text="숙소"
                                place={item?.title}
                                key={index}
                                index={index}
                                // handleRemove={handleRemove}
                              />
                            </div>
                          )}
                        </Draggable>
                      ))}
                    {provided.placeholder}
                  </motion.div>
                )}
              </Droppable>
            </React.Fragment>
          ))
        ) : (
          <>
            {tripDates?.map((item, index) => (
              <React.Fragment key={index}>
                <div className="bg-secondary flex items-center h-14 px-5 gap-2 font-semibold justify-between">
                  <span className="font-light text-contentMuted">
                    {`Day${index + 1} | ${item}`}
                  </span>
                </div>

                <AddPlanButton
                  text="장소"
                  // handleRoute={handleRoute}
                  // handleRoute={(e) => handleRoute(e, index)}
                  index={index}
                />
                <AddPlanButton
                  text="숙소"
                  // handleRoute={(e) => handleRoute(e, index)}
                  index={index}
                />
              </React.Fragment>
            ))}
          </>
        )}
      </ul>
    </DragDropContext>
  );
}

export default TripDays;
