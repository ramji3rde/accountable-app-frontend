import React, { useState } from "react";

const ReminderPopup = ({ setShowReminder }) => {
  let rows = [];
  for (var i = 1; i < 100; i++) {
    rows.push(i);
  }

  const [toggle, setToggle] = useState(true);
  return (
    <>
      <div
        style={{ transition: ".5s" }}
        className=" h-screen bg-[#22222238] w-full fixed z-[100] top-0 left-0 overflow-hidden"
      >
        <div className=" transition-all bg-[#22222238] w-full fixed z-[100] top-0 left-0 overflow-hidden backdrop-blur-[1px] h-[100%] overflow-y-scroll ">
          {/* <div className=""> */}
          <div className="absolute w-[90%] top-[7%] left-[5%] mx-auto ">
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
                      >
                        {rows.map((row) => {
                          return (
                            <option className="text-xs" key={row}>
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
                      >
                        <option className="text-xs">Minute(s)</option>
                        <option className="text-xs">Hour(s)</option>
                        <option className="text-xs">Day(s)</option>
                        <option className="text-xs">Week(s)</option>
                        <option className="text-xs">Month(s)</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex w-full ">
              <div
                className="bg-[#4DE060] rounded-bl-[10px] font-normal  w-[50%] mb-[50px] flex justify-center"
              >
                <button
                  type="button"
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
                className=" bg-[#CCD9E6] rounded-br-[10px] w-[50%] mb-[50px] flex justify-center"
              >
                <div className="py-4 w-[100%] font-normal text-[16px] mx-auto flex justify-center text-black rounded-[10px]">
                  <span className="">Cancel</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* </fosrm> */}
      </div>
    </>
  );
};

export default ReminderPopup;
