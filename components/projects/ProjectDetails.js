import { useState } from "react";
import TanantsLightbox from "../tenants/details/lightbox";
import { format } from "date-fns";
import { useSelector, useDispatch } from "react-redux";
import Button from "./form/Button";
import { useRouter } from "next/router";
import { IoCall } from "react-icons/io5";
import Link from "next/link";
import { acceptDeclineBidAPI } from "../../redux/APIS/API";
import toast from "react-hot-toast";
import { GrFormCheckmark } from "react-icons/gr";
import { ProjectDetail } from "../../redux/action/projectDetails";
import { useEffect } from "react";
import Loader from "../public-com/loader";
import AddPhotoD from "../tenants/details/addPhotoD";
import { getContractorsDetail } from "../../redux/action/contractors-detail";
import { IoFlagSharp } from "react-icons/io5";
import { getTenantDetail } from "../../redux/action/tenants-detail";
import AlignTenant from "./alignTenant";
import AddPhoto from "../public-com/form/addDocs";
import PreViewPDF from "../tenants/details/PreViewPDF";
import { reactLocalStorage } from "reactjs-localstorage";
import PdfThumbnail from "../public-com/pdfThumbnail";

function ProjectDetails() {
  const [lightBox, setLightBox] = useState(false);
  const [imageSrc, setImageSrc] = useState(true);
  const [pdfUrl, setPdfUrl] = useState("");
  const [showPDFPreview, setShowPDFPreview] = useState(false);

  const router = useRouter();
  const dispatch = useDispatch();

  const OpenLight = (img) => {
    setImageSrc(img);
    setLightBox(true);
  };

  const item = useSelector((state) => state.projectDetails.details?.data?.data);

  const itemData = useSelector((state) => state.projectDetails.details);

  const loading = useSelector((state) => state.projectDetails.loading);

  useEffect(() => {
    if (itemData == null && !item) {
      router.push("/projects/list");
    }
  }, [item, itemData]);

  async function getData(id, author, status) {
    const respon = await acceptDeclineBidAPI({
      bid: id,
      author: author,
      bid_status: status,
    });
    try {
      let data = { project_id: "" + item.ID };
      const respon = dispatch(ProjectDetail(data));
    } catch (error) {
      console.log(error);
    }

    toast.success(respon.data.message);
  }

  function ContractorsItem(id) {
    try {
      dispatch(getContractorsDetail(id));
      router.push("/contractors/details");
    } catch (error) {
      console.log(error);
    }
  }

  function onClickPreview(value) {
    setPdfUrl(value);
    setShowPDFPreview(true);
  }

  const Manager = reactLocalStorage.get("user_role");

  return (
    <div className="App">
      {loading ? (
        <Loader />
      ) : (
        <div key={item} className="grid w-full  ">
          <div className="flex w-full items-center py-4 px-4">
            <div className="w-full grid">
              <div className="flex gap-2 items-center ">
                <div className="w-[80%]">
                  <div className="flex gap-2 ">
                    <span className="text-[12px] font-sans font-normal text-[#595959] ">
                      #{item?.ID}{" "}
                    </span>
                    <span className="text-[12px] font-sans font-normal text-[#595959]  ">
                      {item?.project_date &&
                        format(new Date(item?.project_date), "dd/MM/yyyy")}{" "}
                    </span>
                  </div>
                  <h1 className="text-[16px] font-[400] font-sans text-[#262626] pb-1">
                    {item?.project_name}
                  </h1>
                  <div className="flex gap-2 w-full pb-4 mb-2">
                    <span
                      className={
                        item?.status === "Completed"
                          ? "text-[11px] text-[#000] capitalize publish"
                          : "text-[11px] text-[#000] capitalize in-progress"
                      }
                    >
                      {item?.status}
                    </span>
                    <span
                      className={
                        item?.services
                          ? "text-[11px] text-[#000]  capitalize service"
                          : null
                      }
                    >
                      {item?.services}
                    </span>
                  </div>
                </div>

                <div className="w-[20%]">
                  {Manager === "app_manager" ? null : (
                    <div
                      className="grid gap-2 justify-items-center"
                      onClick={() =>
                        router.push(
                          `/support/send_email?type=project&id=${item?.ID}`
                        )
                      }
                    >
                      <span className="">
                        <svg
                          width="22.22"
                          height="16"
                          viewBox="0 0 33 25"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M30.92 1.00001C31.0563 0.98596 31.1937 0.98596 31.33 1.00001L16.84 15.47L2.38999 1.08001C2.56227 1.02968 2.74054 1.00277 2.91999 1.00001H30.92ZM18.25 16.89L32.81 2.39001C32.8815 2.58584 32.922 2.79166 32.93 3.00001V23C32.93 24.1046 32.0346 25 30.93 25H2.92999C1.82542 25 0.929993 24.1046 0.929993 23V3.00001C0.932111 2.83105 0.955632 2.66305 0.999993 2.50001L15.43 16.89C16.2101 17.6655 17.4699 17.6655 18.25 16.89ZM2.90999 23H4.29999L11.59 15.77L10.18 14.36L2.90999 21.57V23ZM30.91 23H29.51L22.22 15.77L23.63 14.36L30.9 21.57L30.91 23Z"
                            fill="#000"
                          />
                        </svg>
                      </span>
                      <span className="text-[13px] text-center font-normal not-italic text-[#262626]">
                        Share via Email
                      </span>
                    </div>
                  )}
                </div>
              </div>
              <span className="text-[16px] font-normal capitalize text-[#262626] leading-5">
                {item?.project_detail}
              </span>
              <div className="py-4">
                <span className="text-[20px] font-normal Oswald-font  text-[#262626]">
                  Photos
                </span>
                <hr className="my-1 border-t-2" />
              </div>
              {/* <AddPhotoD clientName={'project'} ID={item?.ID} buttonAline={'justify-end'} /> */}
              {Manager === "app_manager" ? null : (
                <AddPhoto
                  btnName={"Add Photos"}
                  type={"post"}
                  userID={item?.ID}
                  screenType={"details"}
                  clientname={"project"}
                />
              )}
              <div className="grid grid-cols-3 gap-2  mb-[15px]">
                {item?.photos?.map((item, index) => (
                  <div key={index}>
                    <div>
                      <div className="w-[109px] h-[107px] ">
                        {item?.photo_src?.includes("pdf") ? (
                      
                          <PdfThumbnail
                            url={item?.photo_src}
                            onClick={() => onClickPreview(item?.photo_src)}
                          />
                        ) : (
                          <img
                            src={item?.photo_src}
                            onClick={() => OpenLight(item?.photo_src)}
                            className="h-full object-cover shadow-lg rounded-md object-center w-full"
                          />
                        )}
                      </div>
                      <h1 className="text-[10px] break-all text-ellipsis	whitespace-nowrap	overflow-hidden font-normal text-[#262626]">
                        {item?.real_file_name.length > 0
                          ? item?.real_file_name
                          : "--"}
                      </h1>
                    </div>
                  </div>
                ))}
              </div>

              <div className="w-[100%] py-2 ">
                {/* <div className=''> */}
                <h1 className="text-[20px] Oswald-font text-[#262626] not-italic">
                  Contractor Quotes
                </h1>
                <hr className="my-1 border-t-2" />
                <p className="text-[12px] leading-[15px]  not-italic font-[400] pb-4 mt-[5px]">
                  Send a request for quote to a contractor in your contact list,
                  or send to a new contractor.
                </p>
                {/* </div> */}
                <div className="flex justify-end">
                  {Manager === "app_manager" ? null : (
                    <Button
                      href={() => router.push("/projects/contractor")}
                      name={"Request A Quote"}
                      boxShadow={"shadow-[0_0px_30px_rgba(0,0,0,0.2)]"}
                    />
                  )}
                </div>
              </div>

              {/* send mail button */}
              {Manager === "app_manager" ? null : (
                <div className="w-[100%] pt-[10px] pb-[50px] ">
                  <h1 className="text-[20px] Oswald-font font-normal text-[#262626] not-italic">
                    Linked Email
                  </h1>
                  <hr className="my-1 border-t-2" />
                  <div className="flex justify-end">
                    <Button
                      href={() =>
                        router.push(
                          `/support/send_email?type=project&id=${item?.ID}`
                        )
                      }
                      name={"Send Email"}
                      boxShadow={"shadow-[0_0px_30px_rgba(0,0,0,0.2)]"}
                    />
                  </div>
                </div>
              )}

              <div>
                {item?.total_bids?.length > 0 &&
                  item?.total_bids?.map((bid) => (
                    <div
                      className="rounded-[10px] gap-2 border-2 border-gray-100 my-4 project-details-post bg-white"
                      key={bid?.ID}
                    >
                      <div className="grid w-[100%]   x-auto shadow-lg shadow-gray-200 rounded-t-[6px] overflow-hidden ">
                        <div className="w-[100%] bg-[#154B88] h-[25px]  flex  px-[10px]">
                          <div className="w-[40%] flex gap-2  ">
                            <span className="text-[16px] font-normal Oswald-font text-white">
                              Date:{" "}
                              {bid?.post_date &&
                                format(new Date(bid?.post_date), "dd-MM-yyyy")}
                            </span>
                          </div>

                          <div
                            className="w-[60%] flex justify-end gap-2 items-center"
                            onClick={() => {
                              ContractorsItem(bid?.contractor_id);
                            }}
                          >
                            <span className="text-[12px] text-white font-sans font-normal">
                              {" "}
                              Go to contractor details{" "}
                            </span>

                            {/* {
                                             item?.photo_src?.includes('pdf') ? */}
                            <img
                              src={"/assetes/icon/angle-icon.svg"}
                              alt={"angle-icon"}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="px-[20px]  py-[15px] bg-[#FFFFFF]">
                        <div className=" ">
                          <h1 className="text-[16px] font-[700] text-[#262626]">
                            {bid?.company_name}
                          </h1>
                          <span className="text-[12px] text-[#262626]">
                            {bid?.additional_info}
                          </span>

                          <p className="text-[11px] mt-[15px] font-normal text-[#595959]">
                            Photos / Documents
                          </p>
                          <div className="grid grid-cols-4 gap-x-[10px] justify-between">
                            {bid?.bid_documents.length > 0 &&
                              bid?.bid_documents.map((item, index) => (
                                <div key={index}>
                                  {item?.photo_src.includes("pdf") ? (
                                    <>
                                      <img
                                        src={"/assetes/icon/rectangle.svg"}
                                        onClick={() =>
                                          onClickPreview(item?.photo_src)
                                        }
                                        className="w-full object-cover  rounded-md object-center h-full"
                                        alt=""
                                      />
                                    </>
                                  ) : (
                                    <img
                                      src={item?.photo_src}
                                      onClick={() => OpenLight(item?.photo_src)}
                                      className="w-[60.56px]  h-[59.44px]  object-cover  rounded-md object-center border-[2px] border-gray-100"
                                    />
                                  )}
                                </div>
                              ))}
                          </div>
                        </div>

                        <div className="flex">
                          <span className="text-[20px] font-[700] mt-auto mr-auto  text-[#262626]">
                            <p className="text-[11px] font-normal text-[#595959]">
                              Quote
                            </p>
                            ${bid?.bid_price}
                          </span>

                          {bid?.bid_accepted_by_admin === "0" && (
                            <div className="flex gap-[15px]">
                              <div className="flex gap-1 px-[14px] py-[12px] text-center mt-4 bg-stone-200  text-gray-400 rounded-[6px]">
                                <span className="h-[13.33px] w-[13.33] mt-[1px]">
                                  <img
                                    src={"/bottom-icon/time-circle.svg"}
                                    alt="time-circle-active"
                                  />
                                </span>
                                <span className="text-center text-[16px] font-normal ">
                                  Declined
                                </span>
                              </div>

                              <div className="flex justify-center">
                                <span
                                  className="px-[14px] py-[12px] text-center text-[16px] font-normal mt-4 shadow-[0_0px_30px_0px_#00000033] bg-[#CCD9E6] rounded-[6px]"
                                  onClick={() => {
                                    Manager === "app_manager"
                                      ? null
                                      : getData(bid?.ID, bid?.post_author, "");
                                  }}
                                >
                                  Undo
                                </span>
                              </div>
                            </div>
                          )}
                          {bid?.bid_accepted_by_admin === "1" && (
                            <div className="flex gap-[15px]">
                              <div className="flex px-[14px] py-[12px] text-center   gap-1 mt-4 bg-[#E8E8E8] text-[#A6A6A6] rounded-[6px]">
                                <span className="h-[13.33px] w-[13.33] mt-[2px]">
                                  <img
                                    src={"/bottom-icon/check-circle.svg"}
                                    alt="check-circle-active"
                                  />
                                </span>
                                <span className="text-center  text-[16px] font-normal ">
                                  Accepted
                                </span>
                              </div>
                              <div className="flex justify-center ">
                                <span
                                  className="px-[14px] py-[12px] text-center text-[16px] font-normal shadow-[0_0px_30px_0px_#00000033] mt-4 bg-[#CCD9E6] rounded-[6px]"
                                  onClick={() => {
                                    Manager === "app_manager"
                                      ? null
                                      : getData(bid?.ID, bid?.post_author, "");
                                  }}
                                >
                                  Undo
                                </span>
                              </div>
                            </div>
                          )}
                          {bid?.bid_accepted_by_admin === "" && (
                            <div className="flex gap-[15px]">
                              <div
                                style={{
                                  boxShadow: "0px 0px 30px rgba(0, 0, 0, 0.2)",
                                }}
                                className="px-[14px] py-[12px] text-center mt-4 
                                                shadow-[0_0px_30px_0px_#00000033] bg-[#4DE060] rounded-[6px]"
                                onClick={() => {
                                  Manager === "app_manager"
                                    ? null
                                    : getData(bid?.ID, bid?.post_author, 1);
                                }}
                              >
                                <span className="text-[16px] font-normal py-[12px] px-[14px] text-[#262626]">
                                  Accept
                                </span>
                              </div>

                              <div
                                style={{
                                  boxShadow: "0px 0px 30px rgba(0, 0, 0, 0.2)",
                                }}
                                className="px-[14px] py-[12px] text-center mt-4  bg-[#D64F52] rounded-[6px]"
                                onClick={() => {
                                  Manager === "app_manager"
                                    ? null
                                    : getData(bid?.ID, bid?.post_author, 0);
                                }}
                              >
                                <span className=" text-[16px] font-normal py-[12px] px-[14px] text-white">
                                  Decline
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}

                {item?.not_interested_contractor?.map((contractor) => (
                  <div
                    className="flex px-2 py-4 rounded-[10px] gap-2 border-2 shadow-[0_0px_30px_0px_#00000033] border-gray-100 mt-1 mb-1 "
                    key={contractor?.ID}
                  >
                    <div className="w-[70%]">
                      <h1 className="text-[15px] font-[600]">
                        {contractor?.user_nicename}
                      </h1>
                      <span className="text-xs  text-black-400">
                        {contractor?.user_email}
                      </span>
                    </div>
                    <div className="w-[30%] grid items-center">
                      <p className="text-[12px] text-red-500 font-medium flex ">
                        X Declined
                      </p>
                    </div>
                  </div>
                ))}
                <AlignTenant
                  clientName={"details"}
                  disableBtn={Manager === "app_manager" ? false : true}
                />
              </div>
            </div>
          </div>
          <div className="mb-[100px]">
            {item?.requested_tenants?.length > 0 &&
              item?.requested_tenants?.map((item, index) => (
                <div key={index} className="mb-[5px] ml-[12px] ">
                  <div className="flex border-[1px] border-[#D9D9D9] w-[100%] h-[66px] gap-[3px] items-center  rounded-l-lg bg-[#FFFFFF] px-4 min-w-fit">
                    <div
                      className="w-[100%] "
                      onClick={() => {
                        dispatch(getTenantDetail(item.ID)),
                          router.push("/tenants/details");
                      }}
                    >
                      <div className="w-full">
                        <div className="flex  ">
                          <h1 className="text-[16px] font-[400] capitalize ">
                            {item.company_name}
                          </h1>
                        </div>
                        <div className="flex opacity-80 gap-[10px] items-center mt-2">
                          {item.unit && (
                            <span
                              className={`${
                                item.unit ? " border-set" : ""
                              } text-[11px] border-set font-sans
                                                 text-[#000] font-normal capitalize`}
                            >
                              Unit #{item.unit}
                            </span>
                          )}
                          {item.complex && (
                            <span
                              className={`${
                                item.complex ? " border-set" : ""
                              } text-[11px] font-sans
                                                 text-[#000] font-normal capitalize`}
                            >
                              {item.complex}
                            </span>
                          )}
                          {item.status && (
                            <span
                              className={`${
                                item.status ? " border-set" : ""
                              } text-[11px]  font-sans
                                                 text-[#000] font-normal capitalize`}
                            >
                              {item.status}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="w-[20%]  flex justify-between items-center">
                      <div>
                        {item.company_flag?.length == 5 && (
                          <IoFlagSharp className="text-lg  text-red-500" />
                        )}
                      </div>
                      <Link href={"tel:" + item.primary_phone}>
                        <a>
                          <IoCall className="h-[23.16px] w-[23.65px]" />
                        </a>
                      </Link>
                    </div>
                  </div>
                  <hr />
                </div>
              ))}
          </div>
        </div>
      )}

      {showPDFPreview && (
        <PreViewPDF
          datashow={showPDFPreview}
          onClick={() => setShowPDFPreview(false)}
          PDFURL={pdfUrl}
        />
      )}

      {lightBox && (
        <TanantsLightbox
          src={imageSrc}
          datashow={lightBox ? "block" : "hidden"}
          close={() => setLightBox(false)}
        />
      )}
    </div>
  );
}

export default ProjectDetails;
