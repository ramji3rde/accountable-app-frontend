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
import { useState } from "react";
import { useRouter } from "next/router";
import { format } from "date-fns";
import Button from "../projects/form/Button";
import AddPhoto from "../public-com/form/addDocs";
import { useSelector, useDispatch } from "react-redux";
import { IoCall } from "react-icons/io5";
import TanantsLightbox from "../tenants/details/lightbox";
import PreViewPDF from "../tenants/details/PreViewPDF";
import { reactLocalStorage } from "reactjs-localstorage";
import PdfThumbnail from "../public-com/pdfThumbnail";

function Expensesdetails() {
  const [lightBox, setLightBox] = useState(false);
  const [imageSrc, setImageSrc] = useState(true);
  const [pdfUrl, setPdfUrl] = useState("");
  const [showPDFPreview, setShowPDFPreview] = useState(false);

  const items = useSelector(
    (state) => state?.expenseDetails?.expenseDetails?.data
  );
  const loading = useSelector((state) => state?.expenseDetails?.loading);
  const router = useRouter();
  const dispatch = useDispatch();

  const OpenLight = (img) => {
    setImageSrc(img);
    setLightBox(true);
  };

  useEffect(() => {
    if (items === null) {
      router.push("/expenses/list");
    }
  }, [items]);

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
        <div className="grid w-full  ">
          <div className="flex w-full items-center pt-[20px] px-4 pb-[75px]">
            <div className="w-full grid">
              <div className="flex gap-2 ">
                {/* <span className="text-[11px] font-sans font-normal text-[#595959] ">
                   #{items?.ID}
                   </span> */}
                <span className="text-[11px] font-sans font-normal text-[#595959]  ">
                  {/* {items?.purchase_date} */}
                  {items?.purchase_date &&
                    format(new Date(items?.purchase_date), "dd-MM-yyyy")}
                </span>
              </div>
              <div className="flex gap-2 ">
                <div className="w-[60%]">
                  <div>
                    <h1 className="text-[16px]  font-sans text-[#262626] font-normal pb-1">
                      {items?.item_name}
                    </h1>
                  </div>
                  <div className="flex gap-[10px] w-full pb-[10px]  align-center">
                    {items?.status && (
                      <span
                        className={`${
                          items?.status ? " border-set bg-[#FFFFFF]" : ""
                        }  not-italic text-[11px]  font-sans
                                     text-[#262626] font-normal capitalize`}
                      >
                        {items?.status}
                      </span>
                    )}
                    <span
                      className={
                        items?.property_name
                          ? "text-[11px] text-[#262626] font-normal bg-[#FFFFFF] capitalize service"
                          : null
                      }
                    >
                      {items?.property_name}
                    </span>
                  </div>
                </div>
                {items?.expense_amount && (
                  <div className="text-[20px] w-[20%] font-[600] not-italic text-[#000000]">
                    ${items?.expense_amount}
                  </div>
                )}
                {Manager === "app_manager" ? null : (
                  <div className="w-[20%] ml-[15px]">
                    <div
                      className="grid gap-2 justify-items-center"
                      onClick={() =>
                        router.push(
                          `/support/send_email?type=expense&id=${items?.expense_id}`
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
                  </div>
                )}
              </div>

              <span className="text-[16px] font-normal capitalize text-[#262626] leading-5">
                {items?.description}
              </span>

              {/* send mail button */}

              <div className="my-[10px]">
                <span className="text-[20px] font-normal Oswald-font  text-[#262626]">
                  Receipts / Photos / Documents
                </span>
                <hr className="my-1 border-t-2" />
              </div>

              {Manager === "app_manager" ? null : (
                <AddPhoto
                  btnName={"Add Files"}
                  type={"post"}
                  screenType={"details"}
                  clientname={"expenses"}
                  userID={items?.expense_id}
                />
              )}

              <div className="grid grid-cols-3 gap-2  mb-[15px]">
                {items?.photos?.map((item, index) => (
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
                          className="w-full object-cover rounded-md object-center h-full"
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

              {items?.notes?.length > 0 && (
                <div className="grid w-full py-2 ">
                  <div className="flex gap-2">
                    <div className="w-[100%]">
                      <span className="text-[20px] Oswald-font font-normal text-[#262626] not-italic">
                        Notes
                      </span>
                      <hr className="my-1 border-t-2" />

                      {/* <NotesData /> */}
                      {items?.notes?.map((item, index) => (
                        <div key={index}>
                          <div className="grid gap-x-2	">
                            <div className="w-full">
                              <span className="text-[11px] font-normal text-[#595959] not-italic">
                                {item?.created_date &&
                                  format(
                                    new Date(item?.created_date),
                                    "dd-MM-yyyy"
                                  )}
                              </span>
                            </div>
                            <div className="w-full">
                              <p className="text-[16px] leading-5 font-[400] pb-4 not-italic text-[#262626] ">
                                {item?.note}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
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

export default Expensesdetails;
