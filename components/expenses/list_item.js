import { format } from "date-fns";
import React from "react";
import Loader from "../public-com/loader";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { getIncidentsDetails } from "../../redux/action/incidentsDetails";
import { useDispatch } from "react-redux";
import { getExpensesDetails } from "../../redux/action/expensesDetails";

export default function ExpensesListItem() {
  const router = useRouter();
  const dispatch = useDispatch();
  const clients = useSelector((state) => state?.expenses?.expenses?.data);
  const loading = useSelector((state) => state?.expenses?.loading);

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
                        dispatch(getExpensesDetails(item.expense_id));
                        router.push("/expenses/details");
                      }}
                    >
                      <div className="w-full flex">
                        <div className="grid grid-cols-1 w-[80%] ">
                          <h1 className="text-[16px] font-[400] capitalize text-[#262626] not-italic">
                            {item.item_name}
                          </h1>

                          <div className="flex opacity-80 gap-[10px] items-center mt-1">
                            {item.purchase_date && (
                              <span
                                className={` not-italic text-[11px] font-sans
                                     text-[#262626] font-normal capitalize leading-5 `}
                              >
                                {item?.purchase_date &&
                                  format(
                                    new Date(item?.purchase_date),
                                    "dd-MM-yyyy"
                                  )}
                              </span>
                            )}

                            {item.status && (
                              <span
                                className={`${
                                  item.status ? " border-set" : ""
                                }  not-italic text-[11px]  font-sans
                                     text-[#262626] font-normal capitalize`}
                              >
                                {item.status}
                              </span>
                            )}
                            {item.property_name && (
                              <span
                                className={`${
                                  item.property_name ? " border-set" : ""
                                } not-italic text-[11px] font-sans
                                     text-[#262626] font-normal capitalize`}
                              >
                                {item.property_name}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="w-[20%] flex justify-end items-center">
                          {item?.expense_amount && (
                            <span className="text-[#000000 text-[16px] font-normal not-italic">
                              ${item?.expense_amount}
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
            {clients?.length == 0 && (
              <div className="absolute w-full h-full top-0 left-0 bg-[#f8fafc] z-[-99]">
                <div className="w-full h-full grid justify-center items-center z-[-99]">
                  <div className="text-center">
                    <div>
                      <span>no data</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
