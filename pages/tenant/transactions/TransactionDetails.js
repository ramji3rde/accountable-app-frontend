import React from "react";
import { IoAdd } from "react-icons/io5";
import { AiOutlineSearch } from "react-icons/ai";
import { RiShareBoxLine } from "react-icons/ri";
import AddNew from "../../../components/tenants/add_user_button";
import PdfThumbnail from "../../../components/public-com/pdfThumbnail";
import a1 from "../../../public/a1.png";



const TransactionDetails = () => {
  const hasAccount = true;
  const hasData = true;
  const projects = [1, 2, 3, 4];
  const photos = [a1, a1];

  return (
    <>
      <div>
        <div>
          <div>
            <div>
              <div className="grid w-[95%] my-2 mx-auto  ">
                <div className="flex flex-col gap-[7px] pt-4 pb-4">
                  <span className="text-[16px] font-400 ">
                    Red Pepper Bistro
                  </span>
                  <div>
                    <span className="text-[11px]  border-set bg-[#FFFFFF] text-[#262626] px-[3px] py-[5px] font-[400] capitalize font-sans">
                      The Markets
                    </span>
                  </div>
                </div>
                <div className="w-[100%] bg-[#154B88]  border-[1px] px-2 h-[25px] rounded-t-[6px]">
                  <span className="text-[16px] font-normal Oswald-font text-white">
                    Account Info
                  </span>
                </div>

                <div className="flex flex-col py-[23px] px-[15px] bg-[#FFFFFF] ">
                  <span className="text-[11px] text-[#595959] ">
                    Your Current Balance
                  </span>
                  <div className="flex justify-between">
                    <div>
                      <span className="text-[30px] font-400">$5000</span>
                    </div>
                    <div>
                      <button
                        className=" py-[12px] px-[14px] h-[45px]   font-normal not-italic  mx-auto flex text-[16px]  text-[#262626] bg-[#F2DA31] 
                                rounded-[6px] hover:bg-[#F2DA31] hover:text-white "
                      >
                        Make Payment
                      </button>
                    </div>
                  </div>
                  <span className="text-[11px] text-[#595959] ">
                    Next payment due 12/04/2024
                  </span>
                  <div className="grid grid-cols-3  pt-4 pb-4  ">
                    <div className="flex flex-col  ">
                      <span className="text-[11px] text-[#595959] front-400 ">
                        Period
                      </span>
                      <span className="text-[14px] text-[#262626] front-400 ">
                        Monthly
                      </span>
                    </div>
                    <div className="flex flex-col ">
                      <span className="text-[11px] text-[#595959] front-400 ">
                        Start Date
                      </span>
                      <span className="text-[14px] text-[#262626] front-400 ">
                        12/10/2024
                      </span>
                    </div>
                    <div className="flex flex-col ">
                      <span className="text-[11px] text-[#595959] front-400 ">
                        End Date
                      </span>
                      <span className="text-[14px] text-[#262626] front-400 ">
                        12/10/2025
                      </span>
                    </div>
                  </div>
                  <div className="pt-[20px]">
                    <div className="grid grid-cols-3 gap-3  mb-[15px]">
                      {photos?.map((item, index) => (
                        <div key={index}>
                          <div className="h-[100px] w-[100px] overflow-hidden shadow-sm rounded-md group relative bg-cover object-center object-fill ">
                            {item?.photo_src?.includes("pdf") ? (
                              <PdfThumbnail
                                url={item?.photo_src}
                                onClick={() => onClickPreview(item?.photo_src)}
                              />
                            ) : (
                              <img
                                src={item}
                                alt={item?.real_file_name}
                                onClick={() => OpenLight(item?.photo_src)}
                                className="w-full object-cover  rounded-md object-center h-full"
                              />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>

          <div className="m-3 pt-2">
            <span className="text-[16px]">Transactions</span>
            {hasData ? (
              <>
                <div className="grid grid-cols-3 gap-3 pt-2">
                  <div className="">
                    <select
                      name="sort_date"
                      placeholder="Sort Date"
                      className="font-normal font-sans not-italic  w-full h-[35px] py-[5px] px-[5px] rounded-[6px] bg-[#FFF] 
                        text-theme border-[1px] focus:border-theme focus:outline-none border-inputBorderColor text-[14px] "
                    >
                      <option
                        className="text-[16px] font-sans  not-italic font-normal text-[#000000]"
                        value="a-z"
                        disabled
                        selected
                        hidden
                      >
                        Sort Date
                      </option>
                      <option
                        className="text-[16px] font-sans  not-italic font-normal text-[#000000]"
                        value="a-z"
                      >
                        Date (DSC)
                      </option>
                      <option
                        className="text-[16px] font-sans  not-italic font-normal text-[#000000]"
                        value="a-z"
                      >
                        Date (ASC)
                      </option>
                    </select>
                  </div>
                  <div>
                    <select
                      name="type"
                      placeholder="Type"
                      className="font-normal font-sans not-italic  w-full h-[35px] py-[5px] px-[5px] rounded-[6px] bg-[#FFF] 
                        text-theme border-[1px] focus:border-theme focus:outline-none border-inputBorderColor text-[14px] "
                    >
                      <option
                        className="text-[16px] font-sans  not-italic font-normal text-[#000000]"
                        value="a-z"
                        disabled
                        selected
                        hidden
                      >
                        Filter Type
                      </option>
                      <option
                        className="text-[16px] font-sans  not-italic font-normal text-[#000000]"
                        value="a-z"
                      >
                        Manual
                      </option>
                      <option
                        className="text-[16px] font-sans  not-italic font-normal text-[#000000]"
                        value="a-z"
                      >
                        Recurring
                      </option>
                      <option
                        className="text-[16px] font-sans  not-italic font-normal text-[#000000]"
                        value="a-z"
                      >
                        One Time
                      </option>
                    </select>
                  </div>
                  <div>
                    <select
                      name="method"
                      placeholder="Method"
                      className="font-normal font-sans not-italic  w-full h-[35px] py-[5px] px-[5px] rounded-[6px] bg-[#FFF] 
                        text-theme border-[1px] focus:border-theme focus:outline-none border-inputBorderColor text-[14px] "
                    >
                      <option
                        className="text-[16px] font-sans  not-italic font-normal text-[#000000]"
                        value="a-z"
                        disabled
                        selected
                        hidden
                      >
                        Filter Method
                      </option>
                      <option
                        className="text-[16px] font-sans  not-italic font-normal text-[#000000]"
                        value="a-z"
                      >
                        Cash
                      </option>
                      <option
                        className="text-[16px] font-sans  not-italic font-normal text-[#000000]"
                        value="a-z"
                      >
                        {`Cashier's`} Check
                      </option>
                      <option
                        className="text-[16px] font-sans  not-italic font-normal text-[#000000]"
                        value="a-z"
                      >
                        Check
                      </option>
                      <option
                        className="text-[16px] font-sans  not-italic font-normal text-[#000000]"
                        value="a-z"
                      >
                        Credit Card
                      </option>
                      <option
                        className="text-[16px] font-sans  not-italic font-normal text-[#000000]"
                        value="a-z"
                      >
                        Direct Deposit
                      </option>
                      <option
                        className="text-[16px] font-sans  not-italic font-normal text-[#000000]"
                        value="a-z"
                      >
                        Electronic Payment
                      </option>
                      <option
                        className="text-[16px] font-sans  not-italic font-normal text-[#000000]"
                        value="a-z"
                      >
                        Money Order
                      </option>
                    </select>
                  </div>
                </div>
                <div className="flex gap-3 mt-2">
                  <div className="w-[65.5%] h-[2.18rem] flex relative ">
                    <div className="w-full  ">
                      <input
                        name="search_by_keyword"
                        className=" font-normal font-sans  w-full h-[35px] py-[10px] text-[14px] not-italic px-[10px] rounded-[6px] bg-[#FFF] 
                        text-theme border-[1px] focus:border-theme focus:outline-none border-inputBorderColor"
                        placeholder="Search transactions"
                      />
                    </div>
                    <div className=" absolute right-[05px] top-[10px] bg-white pl-[2px] ">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="21"
                        viewBox="0 0 20 21"
                        fill="none"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M8.51519 1.61084C4.52647 1.61084 1.29297 4.84434 1.29297 8.83306C1.29297 12.8218 4.52647 16.0553 8.51519 16.0553C12.5039 16.0553 15.7374 12.8218 15.7374 8.83306C15.7374 4.84434 12.5039 1.61084 8.51519 1.61084ZM8.51519 2.74973C10.9762 2.74748 13.1961 4.22821 14.1394 6.50122C15.0828 8.77423 14.5637 11.3917 12.8243 13.1327C11.0849 14.8736 8.46791 15.3951 6.19404 14.4539C3.92017 13.5126 2.43741 11.294 2.43741 8.83306C2.4526 5.4818 5.16395 2.76797 8.51519 2.74973ZM14.793 14.3164L18.8874 18.4386C19.0273 18.5795 19.0815 18.7844 19.0294 18.976C18.9773 19.1677 18.8269 19.317 18.6349 19.3677C18.4429 19.4184 18.2385 19.3629 18.0985 19.222L14.0041 15.0997L14.793 14.3164Z"
                          fill="#262626"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="">
                    <span
                      className="flex gap-2 bg-[#CCD9E6] py-3 py-[12px] px-[14px] items-center h-[35px]  rounded-[6px]"
                      // onClick={() => print()}
                    >
                      <span className="">
                        <svg
                          width="16"
                          height="17"
                          viewBox="0 0 16 17"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M13.8949 8.48334L8.00043 14.3778L2.11155 8.48334C1.953 8.34757 1.88394 8.13439 1.93276 7.93144C1.98158 7.7285 2.14003 7.57004 2.34298 7.52122C2.54592 7.47241 2.75911 7.54146 2.89488 7.70001L7.44488 12.25L7.44488 0.777785C7.44488 0.47096 7.69361 0.222229 8.00043 0.222229C8.30726 0.222229 8.55599 0.47096 8.55599 0.777785L8.55599 12.25L13.1115 7.70001C13.332 7.51124 13.6605 7.52393 13.8657 7.72914C14.071 7.93434 14.0836 8.26292 13.8949 8.48334ZM0.222656 15.7778C0.222656 15.471 0.471387 15.2222 0.778212 15.2222L15.2227 15.2222C15.5295 15.2222 15.7782 15.471 15.7782 15.7778C15.7782 16.0846 15.5295 16.3333 15.2227 16.3333L0.778212 16.3333C0.471387 16.3333 0.222656 16.0846 0.222656 15.7778Z"
                            fill="#262626"
                          />
                        </svg>
                      </span>
                      <span className="text-[16px] font-normal not-italic text-[#262626] ">
                        Download
                      </span>
                    </span>
                  </div>
                </div>
              </>
            ) : null}
          </div>
          <div className="ListDetails mb-20 bg-[#f4f5f7] pb-[70px]">
            {projects.length == 0 ? (
              <div className="flext justify-center items-center text-center mt-[10%]">
                <span className="text-[#A6A6A6]">No transactions</span>
              </div>
            ) : (
              <>
                {projects?.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center w-[100%]  gap-[3px] pt-[5px] pl-[12px] "
                  >
                    <div className="w-full list-bg flex">
                      <div
                        className="w-[80%] py-[10px] pl-[16px]"
                      >
                        <h1 className="text-[16px] font-[400] text-[#262626] capitalize pb-2">
                          Partial cash payment for lease
                        </h1>
                        <div className="flex opacity-75 gap-[10px] items-center ">
                          <span className="text-[11px] text-[#262626]  font-normal capitalize ">
                            25/06/2024
                          </span>
                          <span className="text-[11px] text-[#262626]  font-normal ">
                            Manual
                          </span>
                          <span className="text-[11px] text-[#262626]  font-normal ">
                            Stripe
                          </span>
                          <span className="text-[11px] text-[#262626] font-normal font-sans capitalize publish">
                            Paid
                          </span>
                        </div>
                      </div>
                      <div className="align-middle m-auto text-center">
                        <span className="text-[16px] font-normal text-[#000]  capitalize ">
                        </span>
                      </div>
                      <div className=" flex p-2 align-middle m-auto">
                        <RiShareBoxLine className="text-[22px] mr-2" />
                        <span>$2000</span>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default TransactionDetails;
