import React, { useState, useEffect } from "react";
import { IoAdd } from "react-icons/io5";
import { RiShareBoxLine } from "react-icons/ri";
import RecordPayment from "./RecordPayment";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  checkStripeUserAPI,
  createConnectAccountAPI,
} from "../../redux/APIS/API";
import Loader from "../public-com/loader";
import Link from "next/link";
import Sort from "./sort";
import { format } from "date-fns";

const TransactionsList = ({ hasRecord, tenant_id }) => {

  const loading = useSelector((state) => state.getallTransaction.loading);

  const transactionlist = useSelector((state) => state.getallTransaction.transaction.data);

  // console.log(transactionlist, 'transactionlist')



  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div>
            {hasRecord ? (
              <div>

                <div className={` ${tenant_id ? 'pb-[150px]' : 'pb-[70px]'} "ListDetails mb-20 bg-[#f4f5f7] "`}>
                  {transactionlist.length > 0 && transactionlist?.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center w-[100%]  gap-[3px] pt-[5px] pl-[12px] "
                    >
                      <div className="w-full list-bg flex">
                        <div
                          className="w-[80%] py-[10px] pl-[16px]"
                        //onClick={() => ProjectsItem(item.ID)}
                        >
                          <h1 className="text-[16px] font-[400] text-[#262626] capitalize pb-2">
                            {item.description}
                          </h1>
                          <div className="flex opacity-75 gap-[10px] items-center ">
                            <span className="text-[11px] text-[#262626]  font-normal capitalize ">
                              {item?.created_at &&
                                format(
                                  new Date(item?.created_at),
                                  "dd/MM/yyyy"
                                )
                              }
                            </span>
                            <span className="text-[11px] text-[#262626]  font-normal ">
                              {item.payment_method ? "Manual" :item.type === 'one_time' ? "One Time" : item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                            </span>
                            <span className="text-[11px] text-[#262626]  font-normal ">
                              {item.payment_method ? item.payment_method : "Stripe"}
                            </span>
                            <span className={`
                              ${item.status == 'paid' ? "bg-[#91EC9D]" : item.status == 'refunded' ? 'bg-[#154B88] !text-white '
                                : 'bg-[#F19E9A]'}
                              text-[11px] text-[#000] font-normal font-sans capitalize rounded-[3px] p-[3px]`}>
                              {item.status == 'paid' ? "Paid" : item.status == 'refunded' ? 'Refunded' : 'Unpaid'}
                            </span>
                          </div>
                          <div>
                            <span className="text-[12px]">
                              {item?.company_name}
                            </span>
                          </div>
                        </div>
                        <div className="align-middle m-auto text-center">
                          <span className="text-[16px] font-normal text-[#000]  capitalize ">
                            {/* {item.total_bids}{" "}
                            {item.total_bids === 1 ? "Bid" : "Bids"} */}
                          </span>
                        </div>
                        <div className=" flex p-2 align-middle m-auto">
                          <RiShareBoxLine className="text-[22px] mr-2" />
                          <span>{item.amount}</span>
                        </div>
                      </div>
                    </div>
                  ))}

                  {transactionlist?.length == 0 && (
                    tenant_id ? (
                      <div className="flext justify-center items-center text-center mt-[10%]">
                        <span className="text-[#A6A6A6]">No transactions</span>
                      </div>
                    )
                      : (
                        <div className='absolute w-full h-full top-0 left-0 background-[#f8fafc] z-[-99]'>
                          <div className='w-full h-full grid justify-center items-center z-[-99]'>
                            <div className='text-center'>
                              <div>
                                <span>No transactions</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}

                </div>
                <RecordPayment href={"/payment/record-payment"} />
              </div>
            ) : (
              tenant_id ? (
                <div className="flex flex-col justify-center items-center px-4 pb-[50%] text-center mt-[25%]">
                  {/* <span className="text-[#A6A6A6]">No transactions</span> */}
                  <p>
                    Create a payment to see financial information for this tenant
                  </p>
                  <Link href={"/payment/create"}>
                    <a>
                      <div
                        className="flex gap-1 h-[45px] w-[180px] items-center text-[#262626] bg-[#F2DA31] border-[#F2DA31]  border-2 py-[12px] mt-2 px-[14px] mx-2  
                        rounded-[6px] shadow-[0_0px_30px_0px_#00000033] hover:border-theme"
                      >
                        <IoAdd />
                        <h1>Create Payment</h1>
                      </div>
                    </a>
                  </Link>
                </div>
              ) : (
                <div className="flex flex-col justify-center items-center p-2 text-center mt-[50%]">
                  <span className="text-[#A6A6A6]">No transactions</span>
                  <p>
                    {` Create a payment, then once your tenants pay, you’ll see
                    transaction data here`}
                  </p>
                  <Link href={"/payment/create"}>
                    <a>
                      <div
                        className="flex gap-1 h-[45px] w-[180px] items-center text-[#262626] bg-[#F2DA31] border-[#F2DA31]  border-2 py-[12px] mt-2 px-[14px] mx-2  
                          rounded-[6px] shadow-[0_10px_20px_0px_#7e7e7e29] hover:border-theme"
                      >
                        <IoAdd />
                        <h1>Create Payment</h1>
                      </div>
                    </a>
                  </Link>
                </div>
              ))}
          </div>
        </>
      )}
    </>
  );
};

export default TransactionsList;
