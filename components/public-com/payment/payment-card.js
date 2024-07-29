import React from 'react'
import { RiShareBoxLine } from 'react-icons/ri'

function PaymentCard({ index, item }) {

    const OneTimetype = item.type == "One-Time"; 

    return (
        <div className="grid w-[95%] my-2 mx-auto   pb-2">
            <div className="w-[100%] bg-[#154B88] flex justify-between border-[1px] px-[10px] h-[25px] rounded-t-[6px]">
                <span className="text-[16px] font-normal Oswald-font text-white">
                    {index + 1}. {item?.type} payment
                </span>
                <RiShareBoxLine className="text-white text-[22px] " />
            </div>
            <div className="py-[23px] px-[15px] bg-[#FFFFFF]">
                <div className="flex">
                    <div className="flex flex-col w-[50%] justify-center items-center ">
                        <span className="text-[11px] font-400 text-[#595959] pb-[8px]">
                            Current Bill Amount
                        </span>
                        <span className="text-[30px] font-400 leading-[20px] pb-[10px]">
                            ${item.current_balance ? item.current_balance  : 0 }
                        </span>
                        <span className="flex text-[12px]">
                            <svg
                                width="13"
                                height="12"
                                viewBox="0 0 13 12"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="mr-1 mt-1"
                            >
                                <g id="pencil / solid">
                                    <path
                                        id="icon"
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M10.0565 1.13983L12.0232 3.10649C12.1533 3.23549 12.2267 3.41093 12.2274 3.59414C12.228 3.77735 12.1557 3.95328 12.0265 4.08316L10.9332 5.17649L7.98985 2.23316L9.08318 1.13983C9.35236 0.872011 9.78734 0.872011 10.0565 1.13983ZM1.52318 10.7998L2.15651 8.06649L7.41651 2.79983L10.3632 5.73983L5.08318 10.9998L2.33318 11.6332C2.28552 11.638 2.2375 11.638 2.18985 11.6332C1.98271 11.6319 1.7872 11.5372 1.6578 11.3755C1.5284 11.2137 1.47893 11.0022 1.52318 10.7998Z"
                                        fill="#262626"
                                    />
                                </g>
                            </svg>
                            Edit Amount
                        </span>
                    </div>
                    <div className="h-[66px] w-[1px] bg-[#262626]"></div>
                    <div className="flex flex-col w-[50%] justify-center items-center ">
                        <span className="text-[11px] font-400 text-[#595959] pb-[8px]">
                            Balance Due
                        </span>
                        <span className="text-[30px] font-400 leading-[20px] pb-[10px]">
                            ${item.due_balance ? item.due_balance  : 0 }
                        </span>
                        <span className="flex text-[12px]">
                            <svg
                                width="13"
                                height="12"
                                viewBox="0 0 13 12"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="mr-1 mt-1"
                            >
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M10.8902 2.00009C10.9357 1.99541 10.9815 1.99541 11.0269 2.00009L6.19689 6.82343L1.38022 2.02676C1.43765 2.00998 1.49707 2.00102 1.55689 2.00009H10.8902ZM6.66689 7.29676L11.5202 2.46343C11.5441 2.52871 11.5576 2.59731 11.5602 2.66676V9.33343C11.5602 9.70162 11.2617 10.0001 10.8936 10.0001H1.56022C1.19203 10.0001 0.893555 9.70162 0.893555 9.33343V2.66676C0.894261 2.61044 0.902101 2.55444 0.916888 2.50009L5.72689 7.29676C5.98691 7.55524 6.40686 7.55524 6.66689 7.29676ZM1.55355 9.33343H2.01689L4.44689 6.92343L3.97689 6.45343L1.55355 8.85676V9.33343ZM10.8869 9.33343H10.4202L7.99022 6.92343L8.46022 6.45343L10.8836 8.85676L10.8869 9.33343Z"
                                    fill="#262626"
                                />
                            </svg>
                            Send Email Reminder
                        </span>
                    </div>
                </div>
                <div className="grid grid-cols-3  pt-4 pb-4 pl-[15px] pr-[15px] gap-[10px]">
                    <div className="flex flex-col  ">
                        <span className="text-[11px] text-[#595959] front-400 ">
                            Period
                        </span>
                        <span className="text-[14px] text-[#262626] front-400 ">
                            {item.period ?  OneTimetype ? 'One-time' : item.period : '--' }
                        </span>
                    </div>
                    <div className="flex flex-col ">
                        <span className="text-[11px] text-[#595959] front-400 ">

                            {OneTimetype ? 'Created Date' : "Start Date"}
                        </span>
                        <span className="text-[14px] text-[#262626] front-400 ">
                            {OneTimetype ? item.create_date ? item.create_date : "--" : item.start_date ?  item.start_date : '--' }
                        </span>
                    </div>
                    <div className="flex flex-col ">
                        <span className="text-[11px] text-[#595959] front-400 ">
                            {OneTimetype ? 'Due Date' : "End Date"}
                        </span>
                        <span className="text-[14px] text-[#262626] front-400  ">
                            {OneTimetype ? item.due_date ? item.due_date : "--" : item.due_date ?  item.due_date : '--' }
                        </span>
                    </div>
                </div>
                <div>
                    <div className="grid grid-cols-3 gap-3  mb-[15px]">
                        {/* {tenants_detail?.photos?.map((item, index) => (
                            <div key={index}>
                                <div className="h-[100px] w-[100px] overflow-hidden shadow-sm rounded-md group relative bg-cover object-center object-fill ">
                                    <img
                                        src={item?.photo_src}
                                        alt={item?.real_file_name}
                                        onClick={() => OpenLight(item?.photo_src)}
                                        className="w-full object-cover  rounded-md object-center h-full"
                                    />
                                </div>
                            </div>
                        ))} */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PaymentCard