import Link from "next/link";
import {
  acceptDeclineBidAPI,
  addIncidentsContractorsAPI,
  addIncidentsTenantsAPI,
} from "../../redux/APIS/API";
import toast from "react-hot-toast";
import { GrFormCheckmark } from "react-icons/gr";
import { ProjectDetail } from "../../redux/action/projectDetails";
import { useEffect } from "react";
import Loader from "../public-com/loader";
import AddPhotoD from "../tenants/details/addPhotoD";
import { getContractorsDetail } from "../../redux/action/contractors-detail";
import { IoFlagSharp } from "react-icons/io5";
import { getTenantDetail } from "../../redux/action/tenants-detail";
import { useState } from "react";
import { useRouter } from "next/router";
import { format } from "date-fns";
import Button from "../projects/form/Button";
import AddPhoto from "../public-com/form/addDocs";
import { useSelector, useDispatch } from "react-redux";
import { IoCall } from "react-icons/io5";
import TanantsLightbox from "../tenants/details/lightbox";
import SelectPopup from "./SelectPopup";
import { getIncidentsDetails } from "../../redux/action/incidentsDetails";
import PreViewPDF from "../tenants/details/PreViewPDF";
import { reactLocalStorage } from "reactjs-localstorage";
import PdfThumbnail from "../public-com/pdfThumbnail";

function Incidentsdetails() {
  const [lightBox, setLightBox] = useState(false);
  const [imageSrc, setImageSrc] = useState(true);
  const [showTenantsPopup, setShowTenantsPopup] = useState(false);
  const [showContractorsPopup, setShowContractorsPopup] = useState(false);
  const [pdfUrl, setPdfUrl] = useState("");
  const [showPDFPreview, setShowPDFPreview] = useState(false);

  const item = useSelector(
    (state) => state?.incidentsDetails?.incidentsDetails
  );
  const loading = useSelector((state) => state?.incidentsDetails?.loading);
  const tenant_list = useSelector((state) => state?.tenants?.tenants?.data);
  const ContractorList = useSelector(
    (state) => state?.contractors?.contractors?.data
  );

  const router = useRouter();
  const dispatch = useDispatch();

  const OpenLight = (img) => {
    setImageSrc(img);
    setLightBox(true);
  };

  async function handleClick(value) {
    try {
      if (showTenantsPopup == true) {
        let data = {
          incident_id: item?.ID,
          tenant_ids: [value],
        };
        const respon = await addIncidentsTenantsAPI(data);
        console.log(respon);
        dispatch(getIncidentsDetails(item?.ID));
        toast.success(respon.data.message);
      } else if (showContractorsPopup == true) {
        let data = {
          incident_id: item?.ID,
          contractor_ids: [value],
        };
        const respon = await addIncidentsContractorsAPI(data);

        dispatch(getIncidentsDetails(item?.ID));
        toast.success(respon.data.message);
      } else {
        toast.error("Try again");
      }
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
        <div className="grid w-full mb-[100px] ">
          <div className="flex w-full item-center pt-[20px] px-4">
            <div className="w-full grid">
              <div className="flex gap-2 items-center ">
                <div className="w-[80%]">
                  <div className="flex gap-2 ">
                    <span className="text-[11px] font-sans font-normal text-[#595959] ">
                      #{item?.ID}
                    </span>
                    <span className="text-[11px] font-sans font-normal text-[#595959]  ">
                      {item?.date && format(new Date(item?.date), "dd-MM-yyyy")}
                    </span>
                  </div>
                  <h1 className="text-[16px]  font-sans text-[#262626] font-normal pb-1">
                    {item?.post_title}
                  </h1>
                  <div className="flex gap-2 w-full pb-[10px]  align-center">
                    <span
                      className={`${item?.status ? " border-set" : ""} ${
                        item?.status == "Reported"
                          ? "bg-[#F2DA31]"
                          : item?.status == "Open"
                          ? "bg-[#91EC9D]"
                          : item?.status == "Closed"
                          ? "bg-[#CCD9E6]"
                          : ""
                      } not-italic text-[11px]  font-sans
                                     text-[#262626] font-normal capitalize`}
                    >
                      {item?.status}
                    </span>
                    <span
                      className={
                        item?.property
                          ? "text-[11px] text-[#262626] font-normal  capitalize service"
                          : null
                      }
                    >
                      {item?.property}
                    </span>
                  </div>
                </div>
                <div className="w-[20%]">
                  {Manager === "app_manager" ? null : (
                    <div
                      className="grid gap-2 justify-items-center"
                      onClick={() =>
                        router.push(
                          `/support/send_email?type=incident&id=${item?.ID}`
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
                {item?.post_content}
              </span>

              <div className="mt-[30px] pb-2">
                <span className="text-[20px] font-normal Oswald-font  text-[#262626]">
                  Photos
                </span>
                <hr className="my-1 border-t-2" />
              </div>
              {/* <AddPhotoD clientName={'project'} ID={item?.ID} buttonAline={'justify-end'} /> */}
              {Manager === "app_manager" ? null : (
                <AddPhoto
                  btnName={"Add Files"}
                  type={"post"}
                  userID={item?.ID}
                  screenType={"details"}
                  clientname={"incident"}
                />
              )}

              <div className="grid grid-cols-3 gap-2  mb-[15px]">
                {item?.photos?.map((item, index) => (
                  <div key={index}>
                    <div className="w-[109px] h-[107px] ">
                      {item?.photo_src?.includes("pdf") ? (
                        <PdfThumbnail
                          url={item?.photo_src}
                          onClick={() => onClickPreview(item?.photo_src)}
                        />
                      ) : (
                        <img
                          src={item?.photo_src}
                          alt={"Photo"}
                          onClick={() => OpenLight(item?.photo_src)}
                          className="w-full object-cover  rounded-md object-center h-full"
                        />
                      )}
                    </div>

                    <h1 className="text-[10px] break-all text-ellipsis	whitespace-nowrap	overflow-hidden font-normal text-[#262626]">
                      {item?.real_file_name.length > 0
                        ? item?.real_file_name
                        : "--"}
                    </h1>
                  </div>
                ))}
              </div>

              {/* tenatns data */}
              <div>
                <div className="w-[100%] py-[10px] ">
                  <h1 className="text-[20px] Oswald-font font-normal text-[#262626] not-italic">
                    Linked Tenants
                  </h1>
                  <hr className="my-1 border-t-2" />
                  <p className="text-[14px] leading-[15px] font-[400] pb-4 not-italic text-[#262626]">
                    Add Tenants associated with this incident
                  </p>
                  <div className="flex justify-end">
                    {Manager === "app_manager" ? null : (
                      <Button
                        href={() => setShowTenantsPopup(true)}
                        name={"Add Tenants"}
                        boxShadow={"shadow-[0_0px_30px_rgba(0,0,0,0.2)]"}
                      />
                    )}

                    {showTenantsPopup && (
                      <SelectPopup
                        Popuptitle={"Choose Tenant"}
                        datashow={showTenantsPopup ? "block" : "hidden"}
                        onClicked={() => setShowTenantsPopup(false)}
                        handleClick={handleClick}
                        ListData={tenant_list}
                      />
                    )}
                  </div>

                  <div className="mt-4">
                    {item?.tenants?.length > 0 &&
                      item?.tenants?.map((item, index) => (
                        <div key={index} className="mb-[5px] ml-[12px] ">
                          <div className="flex border-[1px] border-[#D9D9D9] w-[100%] pt-[2px] h-[68px] gap-[3px] item-center  rounded-l-lg bg-[#FFFFFF] px-4 min-w-fit">
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
                                <div className="flex opacity-80 gap-[10px] item-center mt-2">
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

                            <div className="w-[20%]  flex justify-between items-center  ">
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
              </div>

              {/* send mail button */}
              {/* {Manager === 'app_manager' ? null :
                        <div className="w-[100%] pt-[10px] pb-[50px] ">
                           <h1 className='text-[20px] Oswald-font font-normal text-[#262626] not-italic' >Linked Email</h1>
                           <hr className="my-1 border-t-2" />
                           <div className="flex justify-end">
                              <Button
                                 href={() => router.push(`/support/send_email?type=incident&id=${item?.ID}`)}
                                 name={'Send Email'}
                                 boxShadow={'shadow-[0_0px_30px_rgba(0,0,0,0.2)]'}
                              />
                           </div>
                        </div>} */}

              {/* contractors data */}

              <div>
                <div className="w-[100%] py-[10px] ">
                  <h1 className="text-[20px] Oswald-font font-normal text-[#262626] not-italic">
                    Linked Contractors
                  </h1>
                  <hr className="my-1 border-t-2" />
                  <p className="text-[14px] leading-[15px] font-[400] pb-4 not-italic text-[#262626]">
                    Add Contractors associated with this incident
                  </p>
                  <div className="flex justify-end">
                    {Manager === "app_manager" ? null : (
                      <Button
                        href={() => setShowContractorsPopup(true)}
                        name={"Add Contractors"}
                        boxShadow={"shadow-[0_0px_30px_rgba(0,0,0,0.2)]"}
                      />
                    )}

                    {showContractorsPopup && (
                      <SelectPopup
                        Popuptitle={"Choose Contractor"}
                        datashow={showContractorsPopup ? "block" : "hidden"}
                        onClicked={() => setShowContractorsPopup(false)}
                        handleClick={handleClick}
                        ListData={ContractorList}
                      />
                    )}
                  </div>

                  <div className="mt-4">
                    {item?.contractors?.map((item, index) => (
                      <div key={index} className="mb-[5px] ml-[12px]  ">
                        <div className="flex  w-[100%] h-[66px] gap-[3px] items-center rounded-l-lg bg-[#FFFFFF] px-4">
                          <div className="w-[100%]">
                            <div className="w-full">
                              <h1 className="text-[16px] font-[400] capitalize text-[#262626]">
                                {item.company_name.length > 0
                                  ? item.company_name
                                  : item.user_login.split("@")[0]}
                              </h1>

                              <div className="flex opacity-80 gap-[10px] items-center mt-1 ">
                                {item.services && (
                                  <span className="text-[11px] not-italic border-set text-[#000] font-[400] capitalize font-sans ">
                                    {item.services}
                                  </span>
                                )}
                                {item.account_number && (
                                  <span className="text-[11px] not-italic border-set text-[#000] font-[400] capitalize font-sans">
                                    {item.account_number}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="w-[20%]  flex justify-end items-center">
                            <Link href={"tel:" + item.company_primary_phone}>
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
              </div>
            </div>
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

export default Incidentsdetails;
