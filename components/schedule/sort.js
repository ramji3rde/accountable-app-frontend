import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getSchedule } from "../../redux/action/scheduleFilter";
import { IoCalendarOutline } from "react-icons/io5";
import { useRouter } from "next/router";

function Sort() {
  const router = useRouter();

  const [searchOption, setSeachOption] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    let data = {
      posts_per_page: "10",
      paged: "1",
      schedule_period: searchOption ? searchOption : "",
    };
    const delayDebounceFn = setTimeout(() => {
      dispatch(getSchedule(data));
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchOption]);

  return (
    <div className="App bg-[#f4f5f7]">
      <div className="flex items-center gap-[10px] py-4 px-3">
        <div className="w-[50%] flex gap-[4px] items-center ">
          {/* <div className='w-[15%] mr-[15px]'>
                        <h1 className="md:text-5xl font-medium cursor-pointer text-center text-[12px] pr-[10px]">Filter: </h1>
                    </div> */}

          {/* <div className='w-[50%] h-[2.18rem]'> */}
          <select
            name="schedule_period"
            id="schedule_period"
            onChange={(e) => setSeachOption(e.target.value)}
            placeholder="Sort by Name (A-Z)"
            value={searchOption}
            className="font-normal font-sans  w-full h-[35px] py-[5px] px-[5px] rounded-[6px] bg-[#FFF] 
                        text-theme border-[1px] focus:border-theme focus:outline-none border-inputBorderColor text-[13px] "
          >
            <option value="">Show All</option>
            <option value="1">Filter by Daily</option>
            <option value="2">Filter by Weekly</option>
            <option value="3">Filter by Monthly</option>
            <option value="4">Filter by Quarterly</option>
            <option value="5">Filter by Semi-annually</option>
            <option value="6">Filter by Yearly</option>
          </select>
          {/* </div> */}
        </div>
        <div className="w-[50%] justify-end mr-1">
          <div
            className="w-full flex items-center justify-end gap-2 mt-1 "
            onClick={() => router.push("/schedule/calendar")}
          >
            <img
              src={"/assetes/icon/calender-line.svg"}
              className="h-[20px] w-[20px] text-[#262626]"
              alt="schedule-icon"
            />
            <h1 className=" font-normal font-sans text-[#262626] cursor-pointer text-center text-[16px] ">
              Calendar View
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sort;
