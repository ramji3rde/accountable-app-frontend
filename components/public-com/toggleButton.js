import React from "react";
import { useRouter } from "next/router";

function ToggleContainerButton({ Tabs }) {
  const router = useRouter();

  const location = router.pathname;

  return (
    <div className="px-[20px] w-[100%] my-4 ">
      <div className={`toggleSMContainer`}>
        <div className="flex">
          {Tabs?.map((item, index) => (
            <span
              key={index}
              onClick={() => router.push(item.link)}
              className={`${
                location == item.link
                  ? "isActive w-[50%] flex justify-center items-center toggleSMButton"
                  : "w-[50%] flex justify-center items-center toggleSMButton"
              } `}
            >
              <h1 className="text-[12px] text-center ">{item.name}</h1>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ToggleContainerButton;
