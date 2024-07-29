import React from "react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { updateProparty } from "../../../redux/APIS/API";
import Input from "../../public-com/form/Input";

export default function PropertyPopUp({ value, datashow, onClicked }) {
  const [update, setUpdate] = useState(value?.post_content);
  const [loader, setLoader] = useState(false);

  async function OnSubmit() {
    try {
      setLoader(true);

      const res = await updateProparty({
        map_name: update,
        map_id: value?.ID,
      });

      onClicked();
      setLoader(false);
    } catch (err) {
      console.log(err, "updateProparty err msg");
    }
  }

  return (
    <div className={datashow}>
      <div>
        <div className="h-screen transition-all bg-[#22222238] w-full fixed z-[100] top-0 left-0 overflow-hidden backdrop-blur-[1px]">
          <div className="">
            <div className="absolute w-[80%] top-[22%] left-[10%] mx-auto bg-white rounded-[18px]">
              <div className="text-black text-center ">
                <div className="my-5 flex justify-start ml-4 ">
                  <div className="">
                    <h1 className="text-[20px] font-normal Oswald-font not-italic text-left">
                      Edit Property Name
                    </h1>
                  </div>
                </div>

                <div className=" mx-4">
                  <Input
                    Onchange={(e) => setUpdate(e.target.value)}
                    value={update}
                  />
                </div>

                <div className="flex justify-center mt-5 ">
                  {loader ? (
                    <span className="bg-[#4DE060] opacity-70 w-[50%] flex justify-center rounded-bl-[10px]  pt-3 ">
                      <div
                        className="animate-spin inline-block  w-[25px] h-[25px] rounded-full border-[2px] border-r-white
                                               border-l-[#ffffff75] border-y-[#ffffff75] "
                      ></div>
                    </span>
                  ) : (
                    <div
                      onClick={() => OnSubmit()}
                      className="bg-[#4DE060] w-[50%] flex justify-center rounded-bl-[10px]"
                    >
                      <div className=" py-3 w-[100%] mx-auto  text-[16px] font-normal flex justify-center text-[#262626] ">
                        <span className="">Save</span>
                      </div>
                    </div>
                  )}
                  <div
                    onClick={onClicked}
                    className=" bg-[#CCD9E6] w-[50%]  flex justify-center rounded-br-[10px]"
                  >
                    <div className=" py-3 w-[100%] mx-auto text-[16px] font-normal flex justify-center text-[#262626] rounded-[10px] ">
                      <span className="">Cancel</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
