import { format } from "date-fns";
import React from "react";
import Loader from "../public-com/loader";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { getIncidentsDetails } from "../../redux/action/incidentsDetails";
import { useDispatch } from "react-redux";
import AddNew from "../tenants/add_user_button";
import DefultScreen from "../public-com/DefultScreen";
import { reactLocalStorage } from "reactjs-localstorage";

export default function ListItem() {
  const router = useRouter();
  const dispatch = useDispatch();
  const clients = useSelector((state) => state?.incidents?.incidents);
  const loading = useSelector((state) => state?.incidents.loading);

  const Manager = reactLocalStorage.get("user_role");

  return (
    <>
      <div className="list">
        {loading ? (
          <Loader />
        ) : (
          <div className="body ">
            <div className="ListDetails mb-20 bg-[#f4f5f7] pb-[70px] ">
              {clients?.map((item, index) => (
                <div key={index} className="mb-[5px] ml-[12px] ">
                  <div className="flex  w-[100%] h-[66px] gap-[3px] items-center  rounded-l-lg bg-[#FFFFFF] px-4 min-w-fit">
                    <div
                      className="w-[100%] "
                      onClick={() => {
                        dispatch(getIncidentsDetails(item?.ID)),
                          router.push("/incidents/details");
                      }}
                    >
                      <div className="w-full">
                        <div className="flex  ">
                          <h1 className="text-[16px] font-[400] capitalize text-[#262626] not-italic">
                            {item.post_title}
                          </h1>
                        </div>
                        <div className="flex opacity-80 gap-[10px] items-center mt-1">
                          {item.date && (
                            <span
                              className={` not-italic text-[11px] font-sans
                                     text-[#262626] font-normal capitalize leading-5 `}
                            >
                              {item?.date &&
                                format(new Date(item?.date), "dd-MM-yyyy")}
                            </span>
                          )}

                          {item.status && (
                            <span
                              className={`${item.status ? " border-set" : ""} ${
                                item.status == "Reported"
                                  ? "bg-[#F2DA31]"
                                  : item.status == "Open"
                                  ? "bg-[#91EC9D]"
                                  : item.status == "Closed"
                                  ? "bg-[#CCD9E6]"
                                  : ""
                              } not-italic text-[11px]  font-sans
                                     text-[#262626] font-normal capitalize`}
                            >
                              {item.status}
                            </span>
                          )}
                          {item.property && (
                            <span
                              className={`${
                                item.property ? " border-set" : ""
                              } not-italic text-[11px] font-sans
                                     text-[#262626] font-normal capitalize`}
                            >
                              {item.property}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr />
                </div>
              ))}
            </div>
            {clients?.length === 0 ? (
              <div className="absolute w-full h-full top-0 left-0 bg-[#f8fafc] z-[-99]">
                <div className="w-full h-full grid justify-center items-center z-[-99]">
                  <div className="text-center">
                    <DefultScreen
                      Title={
                        "Document accidents and illegal activity that happen around your property."
                      }
                      ButtonTitle={"Add Incident"}
                      ButtonUrl={"/incidents/form"}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <>
                {Manager === "app_manager" ? null : (
                  <AddNew href={"/incidents/form"} />
                )}
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
}
