import { useState, useEffect } from "react";
import Link from "next/link";
import { IoCall, IoMailOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import Loader from "../public-com/loader";
import { format } from "date-fns";
import AddPhoto from "../public-com/form/addDocs";
import TanantsLightbox from "../tenants/details/lightbox";
import PreViewPDF from "../tenants/details/PreViewPDF";
import { useRouter } from "next/router";
import SendReply from "./sendReply";
import CancelComponent from "../../components/public-com/cancelComponent";
import { reactLocalStorage } from "reactjs-localstorage";
import PdfThumbnail from "../public-com/pdfThumbnail";

function AdminMessageDetails() {
  const [lightBox, setLightBox] = useState(false);
  const [imageSrc, setImageSrc] = useState(true);
  const [pdfUrl, setPdfUrl] = useState("");
  const [showPDFPreview, setShowPDFPreview] = useState(false);

  const item = useSelector(
    (state) => state?.tenantsMessageDetails?.tenantsMessageDetails?.data
  );

  const router = useRouter();

  const itemNull = useSelector((state) => state?.singleSupport?.singleSupport);

  const loading = useSelector((state) => state?.tenantsMessageDetails?.loading);

  const OpenLight = (img) => {
    setImageSrc(img);
    setLightBox(true);
  };

  function onClickPreview(value) {
    setPdfUrl(value);
    setShowPDFPreview(true);
  }

  useEffect(() => {
    if (itemNull == null && !item) {
      router.push("/message");
    }
  }, [item, itemNull]);

  const Manager = reactLocalStorage.get("user_role");

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div className="pb-[80px] ">
          <div className="grid w-full pt-4 px-4">
            <div className="flex w-full items-center" key={item}>
              <div className="w-[100%] grid">
                <div className="flex gap-2 items-center">
                  <span className="text-[11px] font-sans text-[#262626] font-normal ">
                    {"#" + item?.ID}
                  </span>
                  <span className="text-[11px] font-sans text-[#262626] font-normal ">
                    {item?.date && format(new Date(item?.date), "dd-MM-yyyy")}
                  </span>
                </div>

                <div className="flex items-center gap-2 ">
                  <h1 className=" font-[400] text-[16px] not-italic text-[#262626]">
                    {item?.post_title?.length > 0 ? item?.post_title : "--"}
                  </h1>
                </div>

                <div className="flex gap-2 items-center">
                  <span
                    className={`text-[11px]  font-sans  font-normal px-1 py-0.5 rounded-[4px]
                                     ${
                                       item?.status === "Reported"
                                         ? "bg-[#F2DA31]"
                                         : item?.status === "Accepted"
                                         ? "bg-[#91EC9D]"
                                         : item?.status === "Rejected" &&
                                           "bg-[#F19E9A]"
                                     } `}
                  >
                    {item?.status?.length > 0 ? item?.status : "--"}
                  </span>
                  <span className="text-[11px] border-set font-sans text-[#262626] bg-[#FFFFFF] font-normal ">
                    {item?.property?.length > 0 ? item?.property : "--"}
                  </span>
                </div>
              </div>
            </div>

            <div className=" gap-2 w-full pt-2 ">
              <h1 className="text-base font-[400] text-[#262626] text-[16px]">
                {item?.post_content}
              </h1>
            </div>

            <div className="py-4">
              <span className="text-[20px] font-normal Oswald-font  text-[#262626]">
                Photos
              </span>
              <hr className="my-1 border-t-2" />
            </div>

            <div className="grid grid-cols-3 gap-2  mb-[15px]">
              {item?.photos?.map((item, index) => (
                <div key={index}>
                  <div className="h-[100px] w-[100px] overflow-hidden shadow-sm rounded-md group relative bg-cover object-center object-fill ">
                    {item?.photo_src?.includes("pdf") ? (
                      <PdfThumbnail
                        url={item?.photo_src}
                        onClick={() => onClickPreview(item?.photo_src)}
                      />
                    ) : (
                      <img
                        src={item?.photo_src}
                        alt={item?.real_file_name}
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

            {Manager == "app_manager" ? null : (
              <SendReply ID={item?.ID} clientname={"message"} />
            )}

            <div className="py-2">
              <span className="text-[20px] font-normal Oswald-font  text-[#262626]">
                Sent Replies
              </span>
              <hr className="my-1 border-t-2" />
            </div>

            <div className="grid grid-cols-1 gap-2  mb-[15px]">
              {item?.comments.length > 0 ? (
                item?.comments.map((item, index) => (
                  <div key={index}>
                    <div className=" ">
                      <div className="grid gap-[10px] items-center mt-2">
                        {item?.comment_date && (
                          <span className="text-[12px] font-sans text-[#000] font-normal capitalize ">
                            {item?.comment_date &&
                              format(
                                new Date(item?.comment_date),
                                "dd-MM-yyyy"
                              )}
                          </span>
                        )}

                        {item?.comment_content && (
                          <span
                            className="text-[16px] px-[02px] rounded-[4px] 
                                             font-sans text-[#000] font-normal capitalize "
                          >
                            {item?.comment_content}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div>
                  <div className=" ">
                    <div className="grid items-center">
                      <span
                        className="text-[16px] rounded-[4px] 
                                             font-sans text-[#000] font-normal capitalize "
                      >
                        No replies sent
                      </span>
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

export default AdminMessageDetails;
