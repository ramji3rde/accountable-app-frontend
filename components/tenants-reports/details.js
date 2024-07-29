import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../public-com/loader";
import Link from "next/link";
import { IoCall, IoMailOutline } from "react-icons/io5";
import { format } from "date-fns";
import { useRouter } from "next/router";
import TanantsLightbox from "../tenants/details/lightbox";
import PreViewPDF from "../tenants/details/PreViewPDF";
import { updateAdminProjectRequestAPI } from "../../redux/APIS/API";
import { getTenantsUserDetails } from "../../redux/action/tenantsuserDetails";
import { toast } from "react-hot-toast";
import { reactLocalStorage } from "reactjs-localstorage";
import SendReply from "../message/sendReply";
import PdfThumbnail from "../public-com/pdfThumbnail";

function SupportDetailComponent() {
  const [lightBox, setLightBox] = useState(false);
  const [imageSrc, setImageSrc] = useState(true);
  const [pdfUrl, setPdfUrl] = useState("");
  const [showPDFPreview, setShowPDFPreview] = useState(false);

  const item = useSelector(
    (state) => state?.tenantsUserDetails?.tenantsUserDetails?.data
  );

  const itemNull = useSelector(
    (state) => state?.tenantsUserDetails?.tenantsUserDetails
  );

  const loading = useSelector((state) => state?.tenantsUserDetails?.loading);

  const router = useRouter();
  const dispatch = useDispatch();

  const OpenLight = (img) => {
    setImageSrc(img);
    setLightBox(true);
  };

  function onClickPreview(value) {
    setPdfUrl(value);
    setShowPDFPreview(true);
  }

  const Manager = reactLocalStorage.get("user_role");

  useEffect(() => {
    if (itemNull == null && !item) {
      if (window.location.pathname.split("/")[1] === "request_tenants") {
        router.push("/request_tenants/list");
      } else if (window.location.pathname.split("/")[1] === "tenant") {
        router.push("/tenant/project_request");
      }
    }
  }, [item, itemNull, router]);

  async function updateTenatnsRequest(item, type) {
    if (type == "accepted") {
      const data = {
        project_id: item.ID,
        project_name: item.project_name,
        project_date: item.project_date,
        services: item.services,
        project_detail: item.project_detail,
        status: "publish",
        author: item.author,
        project_status: "publish",
      };
      const res = await updateAdminProjectRequestAPI(data);
      dispatch(
        getTenantsUserDetails({
          project_id: item.ID,
        })
      );
      toast.success("Accepted");
    } else if (type == "declined") {
      const data = {
        project_id: item.ID,
        project_name: item.project_name,
        project_date: item.project_date,
        services: item.services,
        project_detail: item.project_detail,
        status: "rejected",
        author: item.author,
        project_status: "rejected",
      };
      const res = await updateAdminProjectRequestAPI(data);
      dispatch(
        getTenantsUserDetails({
          project_id: item.ID,
        })
      );
    } else {
      const data = {
        project_id: item.ID,
        project_name: item.project_name,
        project_date: item.project_date,
        services: item.services,
        project_detail: item.project_detail,
        status: "Progress",
        author: item.author,
        project_status: "Progress",
      };
      const res = await updateAdminProjectRequestAPI(data);
      dispatch(
        getTenantsUserDetails({
          project_id: item.ID,
        })
      );
    }
  }

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
                    {item?.project_date &&
                      format(new Date(item?.project_date), "dd-MM-yyyy")}
                  </span>
                </div>
                <div className="flex items-center gap-2 ">
                  <h1 className=" font-[400] text-[16px] not-italic text-[#262626]">
                    {item?.project_name?.length > 0
                      ? item?.project_name + " "
                      : "--"}
                  </h1>
                </div>

                <div className="flex gap-2 items-center">
                  {item?.comment_count > "0" ? (
                    <span
                      className={`text-[12px] 
                                    font-sans text-[#000] bg-[#91EC9D] font-normal capitalize px-1 py-0.5 rounded-[4px] `}
                    >
                      {"Reply Sent"}
                    </span>
                  ) : (
                    <span
                      className={`text-[12px]
                              font-sans text-[#000] bg-[#CCD9E6] font-normal capitalize px-1 py-0.5 rounded-[4px] `}
                    >
                      {"No Reply Sent"}
                    </span>
                  )}

                  <span className="text-[11px] border-set font-sans text-[#262626] bg-[#FFFFFF] font-normal ">
                    {item?.services?.length > 0 ? item?.services : "--"}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 justify-end items-center gap-5">
                <Link href={"tel:" + item?.primary_phone}>
                  <a>
                    <div className="w-[100%] grid justify-end  ">
                      <IoCall className="h-[23.16px] w-[23.65px] " />
                      <h6 className="text-[9px] font-sans font-normal text-[#595959] items-center ml-1">
                        Call
                      </h6>
                    </div>
                  </a>
                </Link>

                <Link href={"mailto:" + item?.primary_email}>
                  <a>
                    <div className="w-[100%] grid justify-end items-center mt-1 ">
                      <svg
                        className="h-[16.67px] w-[22.22px] "
                        width="23"
                        height="17"
                        viewBox="0 0 23 17"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M21.1667 0.166678C21.2614 0.156924 21.3568 0.156924 21.4514 0.166678L11.3889 10.2153L1.35422 0.222234C1.47386 0.187285 1.59765 0.168598 1.72228 0.166678H21.1667ZM12.3681 11.2014L22.4792 1.13196C22.5289 1.26795 22.557 1.41088 22.5626 1.55557V15.4445C22.5626 16.2115 21.9407 16.8333 21.1737 16.8333H1.72922C0.962159 16.8333 0.340332 16.2115 0.340332 15.4445V1.55557C0.341803 1.43824 0.358137 1.32157 0.388943 1.20834L10.4098 11.2014C10.9515 11.7399 11.8264 11.7399 12.3681 11.2014ZM1.71533 15.4445H2.68061L7.74311 10.4236L6.76394 9.44446L1.71533 14.4514V15.4445ZM21.1598 15.4445H20.1876L15.1251 10.4236L16.1042 9.44446L21.1528 14.4514L21.1598 15.4445Z"
                          fill="#262626"
                        />
                      </svg>
                      <h6 className="text-[9px] font-sans font-normal mt-1 text-[#595959] ">
                        Email
                      </h6>
                    </div>
                  </a>
                </Link>
              </div>
            </div>
          </div>
          <div className=" gap-2 w-full p-4 ">
            <h1 className="text-base font-[400] text-[#262626] text-[16px]">
              {item?.project_detail}
            </h1>
          </div>

          <div className="p-4">
            <span className="text-[20px] font-normal Oswald-font  text-[#262626]">
              Photos / Documents
            </span>
            <hr className="my-1 border-t-2" />
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
              ))}
            </div>
          </div>

          {/* {Manager == 'app_manager' ? null :
                        <>
                            <span className='mx-4 text-[15px] '>Project Decision: Accept or decline this project</span>
                            {item?.status == "Progress" ?
                                <div className='flex gap-[15px] px-4 '>
                                    <div className="px-[14px] py-[12px] text-center mt-4 bg-[#4DE060] rounded-[6px]"
                                        onClick={() => { updateTenatnsRequest(item, 'accepted') }}
                                    >
                                        <span className="text-[16px] font-normal py-[12px] px-[14px] text-[#262626]">
                                            Accept
                                        </span>
                                    </div>

                                    <div className="px-[14px] py-[12px] text-center mt-4  bg-[#D64F52] rounded-[6px]"
                                        onClick={() => { updateTenatnsRequest(item, 'declined') }}
                                    >
                                        <span className=" text-[16px] font-normal py-[12px] px-[14px] text-white">
                                            Decline
                                        </span>
                                    </div>
                                </div>
                                :
                                item?.status == "publish" ?
                                    <div className='flex gap-[15px] px-4 '>
                                        <div className="px-[14px] py-[12px] text-center mt-4 bg-[#4DE060] opacity-80 rounded-[6px]"
                                        >
                                            <span className="text-[16px] font-normal py-[12px] px-[14px] text-[#000]">
                                                Accepted
                                            </span>
                                        </div>

                                        <div className="px-[14px] py-[12px] text-center mt-4  bg-[#e91e6326] rounded-[6px]"
                                            onClick={() => { updateTenatnsRequest(item, 'undo') }}
                                        >
                                            <span className=" text-[16px] font-normal py-[12px] px-[14px] text-[#000]">
                                                Undo
                                            </span>
                                        </div>
                                    </div> :
                                    item?.status == "rejected" &&
                                    <div className='flex gap-[15px] px-4 '>
                                        <div className="px-[14px] py-[12px] text-center mt-4 bg-[#D64F52] opacity-80 rounded-[6px]"
                                        >
                                            <span className="text-[16px] font-normal py-[12px] px-[14px] text-white">
                                                Declined
                                            </span>
                                        </div>

                                        <div className="px-[14px] py-[12px] text-center mt-4  bg-[#e91e6326] rounded-[6px]"
                                            onClick={() => { updateTenatnsRequest(item, 'undo') }}
                                        >
                                            <span className=" text-[16px] font-normal py-[12px] px-[14px] text-[#000]">
                                                Undo
                                            </span>
                                        </div>
                                    </div>
                            }
                        </>} */}

          <div className="px-4">
            {Manager == "app_manager" ? null : (
              <SendReply ID={item?.ID} clientname={"report"} />
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

export default SupportDetailComponent;
