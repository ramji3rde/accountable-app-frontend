import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns";
import { singleSchedule } from "../../redux/action/singleSchedule";
import Loader from "../public-com/loader";
import AddNew from "../tenants/add_user_button";
import UpdateSchedule from "./updateSchedule";
import BottomNavigation from "../public-com/bottom_navigation";
import { getAllTask } from "../../redux/action/getTask";
import { reactLocalStorage } from "reactjs-localstorage";

function List() {
  const [editschedule, setEditSchedule] = useState(false);

  const router = useRouter();

  const dispatch = useDispatch();

  const Schedulelist = useSelector(
    (state) => state.filterSchedule.schedule.data
  );

  const loading = useSelector((state) => state.filterSchedule.loading);

  const Manager = reactLocalStorage.get("user_role");

  return (
    <div className="list">
      {loading ? (
        <Loader />
      ) : (
        <div className="body">
          <div
            className={` ${
              editschedule ? "h-0" : "h-screen"
            }  ListDetails mb-[130px] bg-[#f4f5f7] pb-[60px]`}
          >
            <div className="pb-4">
              <div className="flex justify-between">
                <div className="w-[60%] flex">
                  <span className="text-[20px] font-normal Oswald-font text-[#262626] pl-4 pr-3">
                    Task Group
                  </span>
                  {Manager ? null : (
                    <div className="flex w-[50px] items-center gap-1 ">
                      <img
                        src={"/assetes/icon/pencil-solid.svg"}
                        className="w-[17px]"
                        alt="pensil-icon"
                      />
                      <span
                        className="text-[12px] text-black-500 font-[500] "
                        onClick={() => setEditSchedule(true)}
                      >
                        Edit
                      </span>
                      <cds-icon shape="store" solid></cds-icon>
                      <cds-icon shape="store" solid></cds-icon>
                    </div>
                  )}
                </div>
                <div className="w-[40%] justify-end	 flex ">
                  <span className="text-[20px] font-normal Oswald-font text-[#262626] px-4">
                    # of Tasks
                  </span>
                </div>
              </div>
            </div>
            {editschedule && (
              <UpdateSchedule cancel={() => setEditSchedule(false)} />
            )}
            {Schedulelist?.map((item, index) => (
              <div key={index} className="mb-[5px] ml-[12px]">
                <div className="flex  w-[100%] h-[66px] gap-[3px] items-center  rounded-l-lg bg-[#FFFFFF] px-4">
                  <div className="w-[80%]">
                    <h1
                      className="text-[16px] font-[400] font-sans capitalize "
                      onClick={() => {
                        dispatch(
                          singleSchedule(
                            {
                              group_id: item.group_id,
                              current_date: format(new Date(), "dd-MM-yyyy"),
                            },
                            () => {
                              router.push(
                                `/schedule/details?groupId=${item.group_id}`
                              );
                            }
                          )
                        );
                      }}
                    >
                      {item.group_name}
                    </h1>
                    <div>
                      <span className="opacity-80 gap-[10px] text-[11px] font-normal border-set items-center mt-2">
                        {item.schedule_period === "1" && "Daily"}
                        {item.schedule_period === "2" && "Weekly"}
                        {item.schedule_period === "3" && "Monthly"}
                        {item.schedule_period === "4" && "Quarterly"}
                        {item.schedule_period === "5" && "Semi-annally"}
                        {item.schedule_period === "6" && "Yearly"}
                      </span>
                    </div>
                  </div>
                  <div className="w-[20%] text-end">
                    <span className="text-[16px] font-normal text-[#000] capitalize ">
                      {item.total_schedules} Task
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
export default List;
