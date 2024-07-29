import { useRouter } from "next/router";
import React from "react";
import { useEffect, useState } from "react";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTask } from "../../redux/action/getTask";
import {
  getAllScheduleTaskAPI,
  updateScheduleTaskAPI,
} from "../../redux/APIS/API";
import Editpopup from "./Editpopup";
import { setAllTAsk } from "../../redux/action/getTask";
import toast from "react-hot-toast";
import { singleSchedule } from "../../redux/action/singleSchedule";
import Loader from "../public-com/loader";
import AddNew from "../../components/tenants/add_user_button";
import { MdEdit } from "react-icons/md";
import { format } from "date-fns";
import { reactLocalStorage } from "reactjs-localstorage";

const Details = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const [candidateSelected, setCandidateSelected] = useState(false);

  const [checkLoader, setCheckLoader] = useState(false);

  const itemSingle = useSelector(
    (state) => state?.singleSchedule?.singleSchedule?.data
  );

  const { groupId } = router.query;

  async function handleChange(item) {
    if (item.schedule_complete === 0) {
      try {
        setCheckLoader(item.schedule_id);
        const response = await updateScheduleTaskAPI({
          schedule_name: item.schedule_name,
          group_id: item.group_id,
          schedule_id: item.schedule_id,
          schedule_complete: 1,
          current_date: format(new Date(), "dd-MM-yyyy"),
        });

        dispatch(singleSchedule({ group_id: item.group_id }));

        setCheckLoader(false);
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
      } finally {
        setCheckLoader(false);
      }
    } else {
      try {
        setCheckLoader(item.schedule_id);

        const response = await updateScheduleTaskAPI({
          schedule_name: item.schedule_name,
          group_id: item.group_id,
          schedule_id: item.schedule_id,
          schedule_complete: 0,
          current_date: format(new Date(), "dd-MM-yyyy"),
        });

        dispatch(singleSchedule({ group_id: item.group_id }));
        setCheckLoader(false);
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
      }
    }
  }

  const Manager = reactLocalStorage.get("user_role");

  return (
    <div className="list">
      {/* {loading ?
            <Loader /> : */}
      <div className="body">
        <div className="ListDetails mb-20 bg-[#E5E5E5">
          <div className="pt-4 pb-3">
            <div className="flex ">
              <div className="w-[70%] px-4">
                <h1 className="text-[20px] text-black font-[400] Oswald-font">
                  {itemSingle?.group_name}
                </h1>
                {itemSingle?.schedule_period && (
                  <span className="opacity-80 gap-[10px] text-[11px] font-normal border-set items-center text-center">
                    {itemSingle.schedule_period === "1" && "Daily"}
                    {itemSingle.schedule_period === "2" && "Weekly"}
                    {itemSingle.schedule_period === "3" && "Monthly"}
                    {itemSingle.schedule_period === "4" && "Quarterly"}
                    {itemSingle.schedule_period === "5" && "Semi-annally"}
                    {itemSingle.schedule_period === "6" && "Yearly"}
                  </span>
                )}
              </div>
              {Manager === "app_manager" ? null : (
                <div className="flex w-[30%] justify-center mt-2">
                  <div className="h-[12px] w-[12px] text-[#000000] mr-2">
                    <MdEdit />
                  </div>
                  <div
                    className="text-[12px] font-normal text-black "
                    onClick={() => setShow(!show)}
                  >
                    Edit Items
                  </div>
                </div>
              )}
            </div>
            {/* <hr className="my-1 border-t-2" /> */}
          </div>
          <div>
            <div className="grid px-2 py-5">
              {itemSingle?.schedule_list?.map((item, index) => (
                <div key={index} className="grid gap-2 px-2 py-1 items-center">
                  <div className="flex gap-2  ">
                    {checkLoader === item?.schedule_id ? (
                      <div className="h-[100%] grid justify-center items-center pt-[2px]">
                        <div className="text-center">
                          <div>
                            <div className="animate-spin inline-block  w-[24px] h-[24px] rounded-full border-[2px] border-r-[#000]"></div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <>
                        <input type="checkbox" className="hidden" />
                        {item?.schedule_complete == "1" ? (
                          <div
                            onClick={(e) => {
                              Manager === "app_manager"
                                ? null
                                : handleChange(item);
                            }}
                            className="w-[24px] h-[24px] rounded-[6px] overflow-hidden bg-[#154B88] 
                                             focus:border-[2px] focus:border-[rgb(166,166,166)] grid justify-center items-center "
                          >
                            <img
                              src={"/assetes/icon/check-icon.svg"}
                              className="w-[18px] h-[18px]"
                            />
                          </div>
                        ) : (
                          <div
                            onClick={(e) => {
                              Manager === "app_manager"
                                ? null
                                : handleChange(item);
                            }}
                            className="w-[24px] h-[24px] rounded-[6px] overflow-hidden border-[1px] border-[#A6A6A6]
                                              bg-white focus:ring-indigo-500"
                          ></div>
                        )}
                      </>
                    )}
                    <label
                      className={`${
                        item.schedule_complete === "1" ? "line-through" : "none"
                      } text-[16px] font-normal text-[#262626]`}
                    >
                      {item?.schedule_name}
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {show && (
            <Editpopup list={itemSingle?.schedule_list} setShow={setShow} />
          )}
        </div>
        {Manager === "app_manager" ? null : (
          <AddNew href={`/schedule/add_task?groupId=${groupId}`} />
        )}
      </div>
      {/* } */}
    </div>
  );
};

export default Details;
