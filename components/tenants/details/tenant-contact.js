import React from "react";
import Link from "next/link";

function TenantContact({ data, show }) {
  return (
    <div
      className={` h-auto transition-all w-full absolute z-[-12] top-[110px] left-0 overflow-hidden translate-y-[15px] opacity-0
        ${show == true && "!z-[120] !opacity-100 !translate-y-[0px]"}        
        `}
    >
      <div className=" grid justify-end px-[20px] relative  ">
        <div
          className="bg-[#fff] p-[10px_13px] rounded-[6px] drop-shadow-[0_4px_10px_0_#0000001A]  
                relative mt-[20px] grid gap-2
                 before:block before:absolute 
                 before:top-[-10px]  before:right-[28px] before:z-[-1] before:w-[30px] before:h-[30px]
                 before:rotate-45
                 before:bg-[#fff]
                "
        >
          {data?.length > 0 &&
            data?.map(
              (item, index) =>
                item?.primary_phone && (
                  <Link
                    key={index}
                    href={item?.primary_phone && "tel:" + item?.primary_phone}
                  >
                    <a
                      href={item?.primary_phone && "tel:" + item?.primary_phone}
                    >
                      <h1>
                        {item?.first_name +
                          " " +
                          item?.last_name +
                          " | " +
                          item?.primary_phone}
                      </h1>
                    </a>
                  </Link>
                )
            )}
        </div>
      </div>
    </div>
  );
}

export default TenantContact;
