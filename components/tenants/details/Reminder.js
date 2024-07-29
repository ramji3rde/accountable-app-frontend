import React, { useState, useEffect } from "react";
import { sendNotificationAPI } from "../../../redux/APIS/API";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import toast from "react-hot-toast";

const Reminder = ({ show, setShowReminder, id, userType, data }) => {
  const [toggle, setToggle] = useState(true);
  let rows = [];
  for (var i = 1; i < 100; i++) {
    rows.push(i);
  }

  const today = new Date();
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1; // Months start at 0!
  let dd = today.getDate();

  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;

  const formattedToday = dd + "/" + mm + "/" + yyyy;

  const dispatch = useDispatch();

  const tenants_data = useSelector(
    (state) => state.tenantsDetails.tenantsDetails
  );

  const device_token = localStorage.getItem("fcm_token");

  const type_of_user = userType.hasOwnProperty("tenantsDetails")
    ? "tenant"
    : "contractor";

  const notificationFormik = useFormik({
    initialValues: {
      title: "Flag Reminder",
      body: `This is a reminder that you flagged ${tenants_data?.data.post_title} on ${formattedToday}`,
      reminder_status: toggle,
      type: type_of_user,
    },
    onSubmit: async (value, { resetForm }) => {
      try {
        let query_data = `device_token=${device_token}&user_id=${id}&time_period=${frequency}:${period}`;
        const res = await sendNotificationAPI(query_data, value);
        res.status === 200
          ? toast.success("Reminder set successfully")
          : toast.error("Error");
        setShowReminder(false);
      } catch (err) {
        console.log(err, "err");
      }
    },
  });

  const [frequency, setFrequency] = useState("1");

  const [period, setPeriod] = useState("day");

  return (
    <div>
      <div
        className={` h-auto transition-all w-full absolute z-[-12] top-[110px] left-0 overflow-hidden translate-y-[15px] opacity-0
        ${show == true && "!z-[120] !opacity-100 !translate-y-[0px]"}        
        `}
      >
        <div className=" grid justify-end px-[20px] relative  ">
          <div
            className="bg-[#fff] rounded-[6px] drop-shadow-[0_10px_12px_#0000001A]  
                relative mt-[20px] grid gap-2
                 before:block before:absolute 
                 before:top-[-10px]  before:right-[60px] before:z-[-1] before:w-[40px] before:h-[30px]
                 before:rotate-45
                 before:bg-[#fff]
                "
          >
            <form onSubmit={notificationFormik.handleSubmit}>
              <div className="grid grid-cols-1 px-4 pb-4 w-full bg-white  rounded-t-[10px] ">
                <div className="grid sm:grid-cols-2 grid-cols-1 pt-2 sm:gap-[20px] gap-[10px] sm:my-[10px]">
                  <div>
                    <div className="pt-1 flex justify-between">
                      <span className="text-[20px] font-normal text-[#262626] Oswald-font">
                        Send Reminders
                      </span>
                      <div className="pt-2">
                        <button
                          className={
                            toggle
                              ? `toggleContainer isActive`
                              : `toggleContainer`
                          }
                          onClick={() => setToggle(!toggle)}
                        >
                          <span
                            className={
                              toggle ? `toggleKnob isActive ` : `toggleKnob`
                            }
                          ></span>
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 pb-6">
                    <span className="text-[16px] font-normal text-[#262626]">
                      Repeat until unflagged
                    </span>

                    <div className="pt-3 flex">
                      Every
                      <div className="relative  lg:max-w-sm">
                        <select
                          className="ml-2 p-1 pr-5 pl-5 text-gray-500 bg-white border rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600 "
                          disabled={!toggle}
                          value={frequency}
                          onChange={(e) => setFrequency(e.target.value)}
                        >
                          {rows.map((row) => {
                            return (
                              <option className="text-xs" key={row} value={row}>
                                {row}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                      <div className="relative  lg:max-w-sm">
                        <select
                          className="ml-2 p-1 pr-5 pl-5 text-gray-500 bg-white border rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600"
                          disabled={!toggle}
                          value={period}
                          onChange={(e) => setPeriod(e.target.value)}
                        >
                          <option className="text-xs" key={1} value={"minute"}>
                            Minute
                          </option>
                          <option className="text-xs" key={2} value={"hour"}>
                            Hour
                          </option>
                          <option className="text-xs" key={3} value={"day"}>
                            Day
                          </option>
                          <option className="text-xs" key={4} value={"week"}>
                            Week
                          </option>
                          <option className="text-xs" key={5} value={"month"}>
                            Month
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Submit Button */}
              <div className="flex w-full ">
                <div
                  className="bg-[#4DE060] rounded-bl-[10px] font-normal  w-[50%] flex justify-center"
                >
                  <button
                    type="submit"
                    className="font-normal text-[16px] py-4 mx-auto w-full flex justify-center text-black 
                           rounded-[10px] "
                  >
                    Add
                  </button>
                </div>

                <div
                  onClick={() => {
                    setShowReminder(false);
                  }}
                  className=" bg-[#CCD9E6] rounded-br-[10px] w-[50%] flex justify-center"
                >
                  <div className="py-4 w-[100%] font-normal text-[16px] mx-auto flex justify-center text-black rounded-[10px]">
                    <span className="">Cancel</span>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reminder;
