import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import { GiHamburgerMenu } from "react-icons/gi";
import Input from "../public-com/form/Input";
import { useFormik } from "formik";
import Select from "../public-com/form/Select";
import {
  rearrangeSchedulesGroupAPI,
  updateScheduleAPI,
} from "../../redux/APIS/API";
import toast from "react-hot-toast";
import { getSchedule } from "../../redux/action/scheduleFilter";

const UpdateSchedule = ({ cancel }) => {
  const dispatch = useDispatch();
  

  // rearrengelist apis
  async function rearrangeList(ids) {
    try {
      const response = await rearrangeSchedulesGroupAPI({
        group_ids: ids,
      });
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  }

  const Schedulelist = useSelector(
    (state) => state.filterSchedule.schedule.data
  );

  const updateScheduleFormik = useFormik({
    initialValues: {
      task_groups: [],
    },
    onSubmit: async (values) => {
      try {
        const respon = await updateScheduleAPI(values);

        toast.success(respon.data.message);

        dispatch(getSchedule());
        cancel();
      } catch (err) {
        console.log(err);
      }
    },
  });

  useEffect(() => {
    const updatedListData = Schedulelist.map(function (item) {
      return {
        group_id: item.group_id,
        group_name: item.group_name,
        schedule_period: item.schedule_period,
      };
    });
    updateScheduleFormik.setFieldValue("task_groups", updatedListData);
  }, []);

  return (
    <div
      style={{ overflow: "hidden !important" }}
      className="h-screen transition-all bg-[#22222238] w-full fixed z-[100] top-0 left-0 overflow-hidden backdrop-blur-[5px]"
    >
      <div className="">
        <div className="absolute w-[85%] top-[7%] left-[7.5%] mx-auto bg-white rounded-[10px]">
          <div className="text-black text-center pt-3 ">
            <div className="grid grid-cols-1 pb-2 px-2 ">
              <div className="">
                <h1 className=" text-left  font-[400] text-[20px] Oswald-font">
                  Edit Task Group
                </h1>
              </div>
            </div>

            <div className="flex w-full pb-4 px-2 ">
              <div className="w-[60%]">
                <h1 className=" text-left font-[500] text-[.6em] ">
                  Drag items to rearrange
                </h1>
              </div>
              <div className="w-[40%]">
                <h1 className=" text-left font-[500] text-[.6em] ">
                  Change time period
                </h1>
              </div>
            </div>

            <DragDropContext
              onDragEnd={(param) => {
                const srcI = param.source.index;
                const destI = param.destination?.index;

                updateScheduleFormik.values.task_groups.splice(
                  destI,
                  0,
                  updateScheduleFormik.values.task_groups.splice(srcI, 1)[0]
                );

                rearrangeList(
                  updateScheduleFormik.values.task_groups.map((d) => d.group_id)
                );
                console.log(
                  updateScheduleFormik.values.task_groups.map((d) => d.group_id)
                );
              }}
            >
              <Droppable droppableId="droppable-1">
                {(provided, snapshot) => (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    {updateScheduleFormik.values.task_groups?.map(
                      (item, index) => (
                        <Draggable
                          key={index}
                          draggableId={"draggable-" + index}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <div
                              className="flex gap-3 px-4 py-2 justify-between"
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              style={{
                                ...provided.draggableProps.style,
                                boxShadow: snapshot.isDragging
                                  ? "0 0 .4rem #666"
                                  : "none",
                              }}
                            >
                              {/* {Schedulelist.map((item, index) => ( */}
                              <div
                                className="flex w-full gap-[8px] "
                                key={index}
                                {...provided.dragHandleProps}
                              >
                                <div className="w-[60%] flex gap-[8px]">
                                  <img
                                    src={"/assetes/icon/bars-icon.svg"}
                                    className="w-[17px]"
                                    alt="pensil-icon"
                                  />
                                  <Input
                                    name={`task_groups[${index}].group_name`}
                                    placeholder={"Enter Task Group"}
                                    formik={updateScheduleFormik}
                                    value={
                                      updateScheduleFormik.values.task_groups[
                                        index
                                      ].group_name
                                    }
                                    fontSize={"text-[14px]"}
                                  />
                                </div>
                                <div className="w-[40%]">
                                  <Select
                                    name={`task_groups[${index}].schedule_period`}
                                    formik={updateScheduleFormik}
                                    fontSize={"text-[14px]"}
                                    value={
                                      updateScheduleFormik.values.task_groups[
                                        index
                                      ].schedule_period
                                    }
                                    option={[
                                      { value: "1", name: "Daily" },
                                      { value: "2", name: "Weekly" },
                                      { value: "3", name: "Monthly" },
                                      { value: "4", name: "Quarterly" },
                                      { value: "5", name: "Semi-annally" },
                                      { value: "6", name: "Yearly" },
                                    ]}
                                  />
                                </div>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      )
                    )}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>

            <div className="flex justify-center pt-3 ">
              <div
                onClick={() => {
                  updateScheduleFormik.handleSubmit();
                }}
                className="bg-[#4DE060] w-[50%] flex justify-center rounded-bl-[10px]"
              >
                <div className=" py-3 w-[100%] mx-auto flex justify-center text-[#262626] ">
                  <span className="">Save</span>
                </div>
              </div>

              <div
                onClick={cancel}
                className=" bg-[#CCD9E6] w-[50%] flex justify-center rounded-br-[10px]"
              >
                <div
                  className=" py-3 w-[100%] mx-auto  flex justify-center text-[#262626]
                                    rounded-[10px] "
                >
                  <span className="">Cancel</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateSchedule;
