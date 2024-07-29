import React from "react";
import { useState, useEffect } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { getExpense } from "../../../redux/action/expense";
import { getIncidents } from "../../../redux/action/incidents";
import { getTenantsFilter } from "../../../redux/action/tenants";
import { getProjectFilter } from "../../../redux/action/projectFilter";
import { getSupportTeam } from "../../../redux/action/supportFiter";
import { getSchedule } from "../../../redux/action/scheduleFilter";
import { getContractorsFilter } from "../../../redux/action/contractors";
import ReportListItem from "../list_Report";

export default function ReportsSort({ setOption }) {
  const [searchTitle, setSearchTitle] = useState("");
  const [searchOption, setSeachOption] = useState("");
  const dispatch = useDispatch();

  function CreateReport() {
    setOption(searchOption);
    let data = {
      posts_per_page: "-1",
      paged: "1",
      sort_by_field: "a-z",
      search_by_keyword: "",
    };

    if (searchOption === "Tenants") {
      dispatch(getTenantsFilter(data));
    }

    if (searchOption === "Contractors") {
      dispatch(getContractorsFilter(data));
    }

    if (searchOption === "Projects") {
      dispatch(getProjectFilter(data));
    }

    if (searchOption === "Schedule") {
      let data = {
        posts_per_page: "10",
        paged: "1",
        schedule_period: "",
      };
      dispatch(getSchedule(data));
    }

    if (searchOption === "Support") {
      dispatch(getSupportTeam(data));
    }

    if (searchOption === "Incidents") {
      dispatch(getIncidents(data));
      dispatch(getContractorsFilter(data));
      dispatch(getTenantsFilter(data));
    }

    if (searchOption === "Expenses") {
      let data = {
        posts_per_page: "-1",
        paged: "1",
        sort_by_field: "a-z",
        search_by_keyword: "",
        start_date: "",
        end_date: "",
      };
      dispatch(getExpense(data));
    }
  }

  return (
    <>
      <div className="App bg-[#f4f5f7]  px-4 pt-5">
        <div className="w-[100%]">
          <div className="flex w-full items-center  pb-4  gap-4 ">
            <div className="w-[100%] h-[35px]">
              <select
                name="sort_by_field"
                id="sort_by_field"
                onChange={(e) => setSeachOption(e.target.value)}
                placeholder="Sort by Date"
                value={searchOption}
                className="font-normal font-sans not-italic  w-full h-[35px] py-[5px] px-[5px] rounded-[6px] bg-[#FFF] 
                            text-[#262626] border-[1px] focus:border-theme focus:outline-none border-inputBorderColor text-[14px] "
              >
                <option
                  className="text-[16px] font-sans font-normal text-[#000000]"
                  selected={true}
                >
                  Select Report Data
                </option>
                <option
                  className="text-[16px] font-sans font-normal text-[#000000]"
                  value="Tenants"
                >
                  Tenants
                </option>
                <option
                  className="text-[16px] font-sans font-normal text-[#000000]"
                  value="Contractors"
                >
                  Contractors
                </option>
                <option
                  className="text-[16px] font-sans font-normal text-[#000000]"
                  value="Projects"
                >
                  Projects
                </option>
                <option
                  className="text-[16px] font-sans font-normal text-[#000000]"
                  value="Schedule"
                >
                  Schedule
                </option>
                <option
                  className="text-[16px] font-sans font-normal text-[#000000]"
                  value="Support"
                >
                  Support Team
                </option>
                <option
                  className="text-[16px] font-sans font-normal text-[#000000]"
                  value="Incidents"
                >
                  Incidents
                </option>
                <option
                  className="text-[16px] font-sans font-normal text-[#000000]"
                  value="Expenses"
                >
                  Expenses
                </option>
              </select>
              <div className="mt-1.5 text-[12px] leading-[18px]">
                Select an item from the list then click ‘Generate Report’
              </div>
            </div>

            <div
              onClick={() => CreateReport()}
              className="flex h-[35px] min-w-[137px] justify-center  items-center  bg-[#F2DA31] border-[#F2DA31]  border-2 
                        rounded-[6px] shadow-[0_0px_30px_0px_#00000033] hover:border-theme"
            >
              <span className="text-[14px] leading-[20px] text-[#262626]">
                Generate Report
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
