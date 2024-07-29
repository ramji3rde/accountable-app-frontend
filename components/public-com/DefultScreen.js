import { useRouter } from "next/router";
import React from "react";

function DefultScreen({
  Title,
  ButtonTitle,
  ButtonUrl,
  SecondTitle,
  ButtonIcon,
}) {
  const router = useRouter();

  return (
    <div className="w-full py-[200px] bg-[#f4f5f7] grid justify-center items-center ">
      <div className=" grid justify-items-center font-[400] text-center ">

        <p className="text-[16px] leading-[20px] px-3 text-[#262626]">
          {Title}
        </p>

        {SecondTitle && (
          <p className="text-[16px] leading-[20px] mt-5 text-[#595959] ">
            {SecondTitle}
          </p>

        )}
        {/* button */}
        {ButtonTitle && (
          <div className="w-[100%] flex justify-center mt-[20px]">
            <div
              onClick={() => {
                ButtonUrl && router.push(ButtonUrl);
              }}
              className="py-[13px] mx-auto flex text-[16px] px-8  font-normal justify-center  text-[#262626] bg-[#F2DA31]  
                            rounded-[6px] hover:bg-[#F2DA31] shadow-[0_0px_30px_0px_#00000033] gap-[2px]"
            >



              <span className="flex gap-2 text-4 leading-5">
                <img
                  src={ButtonIcon ? ButtonIcon : "/bottom-icon/plus-icon.svg"}
                  alt="plus-icon-active"
                  className="h-[14.44px] w-[14.44px] mt-1 "

                />

                {ButtonTitle}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DefultScreen;
