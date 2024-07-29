import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  deleteScheduleTaskAPI,
  rearrangeSchedulesAPI,
} from "../../redux/APIS/API";
import { GiHamburgerMenu } from "react-icons/gi";
import { singleSchedule } from "../../redux/action/singleSchedule";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { format } from "date-fns";

const Editpopup = ({ list, setList, setShow }) => {
  const dispatch = useDispatch();

  async function deleteItem(schedule_id, group_id) {
    try {
      const response = await deleteScheduleTaskAPI({
        schedule_ids: [schedule_id],
      });

      dispatch(
        singleSchedule({
          group_id: group_id,
          current_date: format(new Date(), "dd-MM-yyyy"),
        })
      );
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  }

  async function rearrangeList(ids) {
    try {
      const response = await rearrangeSchedulesAPI({
        schedule_ids: ids,
      });

    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  }

  return (
    <div>
      <div className="h-screen transition-all bg-[#22222238] w-full fixed z-[100] top-0 left-0 overflow-hidden backdrop-blur-[1px]">
        <div className="">
          <div className="absolute w-[80%] top-[22%] left-[10%] mx-auto bg-white rounded-[18px]">
            <div className="text-black text-center pt-3 ">
              <div className="grid grid-cols-1 mx-4 ">
                <div className="">
                  <h1 className="text-[20px] font-normal Oswald-font text-left pb-4 ">
                    Edit Checklist
                  </h1>
                </div>
              </div>
              <div className="flex w-full pb-4  mx-4 ">
                <div className="w-[60%]">
                  <h1 className=" text-left font-[400] text-[.6em] ">
                    Drag items to rearrange
                  </h1>
                </div>
              </div>

              <DragDropContext
                onDragEnd={(param) => {
                  const srcI = param.source.index;
                  const destI = param.destination?.index;

                  list.splice(destI, 0, list.splice(srcI, 1)[0]);

                  rearrangeList(list.map((d) => d.schedule_id));
                }}
              >
                <Droppable droppableId="droppable-1">
                  {(provided, snapshot) => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                      {list?.map((item, index) => (
                        <Draggable
                          key={index}
                          draggableId={"draggable-" + index}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <div
                              className="flex gap-3 px-4 py-2 "
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              style={{
                                ...provided.draggableProps.style,
                                boxShadow: snapshot.isDragging
                                  ? "0 0 .4rem #666"
                                  : "none",
                              }}
                            >
                              <div
                                className="flex gap-3 items-center w-[70%]"
                                {...provided.dragHandleProps}
                              >
                                <GiHamburgerMenu className="font-[16px] font-normal text-[#000000]" />
                                <label
                                  className={`${
                                    item.schedule_complete === "1"
                                      ? "line-through"
                                      : "none"
                                  } text-start`}
                                >
                                  {item.schedule_name}
                                </label>
                              </div>
                              <div className=" flex items-center justify-end w-[20%] ">
                                <div className="h-[10.42px] w-[10px]  font-bold text-[#D64F52] items-center ">
                                  <RiDeleteBin5Fill />
                                </div>
                                <div
                                  className=" text-[#D64F52] text-[12px] font-[700] mt-2 ml-3"
                                  onClick={() =>
                                    deleteItem(item.schedule_id, item.group_id)
                                  }
                                >
                                  Delete
                                </div>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>

              <div className="flex justify-center pt-3 ">
                <div
                  onClick={() => setShow(false)}
                  className="bg-[#4DE060] w-[50%] flex justify-center rounded-bl-[10px]"
                >
                  <div className=" py-3 w-[100%] mx-auto flex justify-center text-[#262626] ">
                    <span className="">Save</span>
                  </div>
                </div>

                <div
                  onClick={() => setShow(false)}
                  className=" bg-[#CCD9E6] w-[50%] flex justify-center rounded-br-[10px]"
                >
                  <div className=" py-3 w-[100%] mx-auto  flex justify-center text-[#262626] rounded-[10px] ">
                    <span className="">Cancel</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editpopup;
