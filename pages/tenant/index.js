import React from "react";
import { useEffect, useState } from "react";
import { reactLocalStorage } from "reactjs-localstorage";
import SubHeader from "../../components/public-com/header";
import { useDispatch, useSelector } from "react-redux";
import { getTenantDetail } from "../../redux/action/tenants-detail";
import { getProfileData } from "../../redux/action/getProfile";
import { useRouter } from "next/router";
import BottomNavigation from "../../components/public-com/bottom_navigation";
import { IoListOutline, IoList, IoGridOutline, IoGrid } from "react-icons/io5";
import { getSendFiles, checkStripeUserAPI } from "../../redux/APIS/API";
import PreViewPDF from "../../components/tenants/details/PreViewPDF";
import TanantsLightbox from "../../components/tenants/details/lightbox";
import PdfThumbnail from "../../components/public-com/pdfThumbnail";
import Link from "next/link";
import a1 from "../../public/a1.png";

function Index() {
  const userID = reactLocalStorage.get("default_post_id");
  const [imageSrc, setImageSrc] = useState(true);
  const [pdfUrl, setPdfUrl] = useState("");
  const [showPDFPreview, setShowPDFPreview] = useState(false);
  const [openLightBox, setOpenLightBox] = useState(false);
  const [layoutOption, setLayoutOption] = useState(false);
  const [sharePhotos, setSharePhotos] = useState([]);
  const [hasAccount, setHasAccount] = useState(false);

  const photos = [a1, a1];

  const dispatch = useDispatch();
  const router = useRouter();

  const item = useSelector(
    (state) => state.tenantsDetails.tenantsDetails?.data
  );

  const email = useSelector(
    (state) => state?.getProfile?.profile?.data[0]?.user_email
  );
  // console.log(email);

  const checkUser = async () => {
    if (email) {
      const data = { email: "" + email };
      try {
        const res = await checkStripeUserAPI(data);
        // console.log(res);
        setHasAccount(res.data);
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    dispatch(getProfileData());
    checkUser();
  }, []);

  async function GetSendFiles(ID) {
    let data = { tenant_id: ID };
    const res = await getSendFiles(data);
    // console.log(res?.data?.data, "resdata");
    setSharePhotos(res?.data?.data);
  }

  useEffect(() => {
    if (userID) {
      dispatch(getTenantDetail(userID));
      GetSendFiles(userID);
      dispatch(getProfileData());
    }
  }, [userID]);

  const Boxdata = [
    {
      name: "Project Request",
      discription:
        "Send a service, maintenance or inspection request to your property manager",
      link: "/tenant/project_request",
    },
    {
      name: "Send A Message",
      discription:
        "Send a message to your property manager with your questions, comments or concerns",
      link: "/tenant/message",
    },
  ];

  const OpenLight = (img) => {
    setImageSrc(img);
    setOpenLightBox(true);
  };

  function onClickPreview(value) {
    setPdfUrl(value);
    setShowPDFPreview(true);
  }

  return (
    <div>
      <SubHeader title={"Home"} />

      <div className="grid w-full py-4 px-4   mb-[75px]">
        <div className="flex w-full items-center">
          <div className="w-[100%] grid">
            <div className="grid items-center gap-2 mb-5  ">
              <div className="flex items-center">
                <h1 className="text-[16px] font-normal ">
                  {item?.company_name}
                </h1>
              </div>
              <div className="w-full ">
                {item?.property?.length > 0 && (
                  <span className="text-[11px] w-[75px] border-set bg-[#FFFFFF] text-[#262626] px-[3px] py-[5px] font-[400] capitalize font-sans ">
                    {item?.property}
                  </span>
                )}
              </div>
            </div>
            <div className="grid  my-2  ">
              <div className="w-[100%] bg-[#154B88]  border-[1px] px-2 h-[25px] rounded-t-[6px]">
                <span className="text-[16px] font-normal Oswald-font text-white">
                  Account Info
                </span>
              </div>

              {hasAccount ? (
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
                  <div className="h-[1px] bg-[#DEDEDE] w-full "></div>
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
                                src={item?.photo_src}
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
                  <Link href="/tenant/transactions">
                    <div className="flex pt-[10px]">
                      <span className="text-[16px] text-[#262626] pr-[3px] ">
                        View Transactions
                      </span>
                      <svg
                        width="16"
                        height="25"
                        viewBox="0 0 15 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="mt-auto mb-auto align-middle"
                      >
                        <path
                          d="M5.61927 12.7981L10.5859 7.9981L5.61927 3.1981C5.33738 2.92656 4.88873 2.93496 4.61719 3.21685C4.34565 3.49875 4.35404 3.9474 4.63594 4.21894L8.54844 7.9981L4.63594 11.7814C4.35404 12.053 4.34565 12.5016 4.61719 12.7835C4.88873 13.0654 5.33737 13.0738 5.61927 12.8023L5.61927 12.7981Z"
                          fill="#262626"
                        />
                      </svg>
                    </div>
                  </Link>
                </div>
              ) : (
                <>
                  {" "}
                  <div className="flex flex-col justify-center items-center pb-[10%] text-center pt-[20%] - bg-[#fff] ">
                    <a>
                      <div
                        className="flex gap-1 h-[45px] w-[180px] items-center text-[#262626] bg-[#F2DA31] border-[#F2DA31]  border-2 py-[12px] mt-2 px-[14px] mx-2  
                        rounded-[6px] shadow-[0_10px_20px_0px_#7e7e7e29] hover:border-theme"
                      >
                        <h1>Sign Up for Account</h1>
                      </div>
                    </a>
                    {/* </Link> */}
                  </div>
                </>
              )}
            </div>

            <span className="text-[12px] text-[#262626] mb-4 mt-[30px] ">
              Choose an option to get started
            </span>
            <div className="grid gap-y-6 gap-x-4 grid-cols-2 ">
              {Boxdata.map((item, index) => (
                <div
                  key={index}
                  onClick={() => router.push(item.link)}
                  className="px-4 py-4 border-[1px] border-[#D9D9D9] rounded-[10px] bg-[#fff] "
                >
                  <h1 className="text-[13px] font-[400] font-sans text-[#262626]">
                    <p className="text-[30px] text-[#262626] font-normal font-sans Oswald-font">
                      {item.name}
                    </p>
                    {item.discription}
                  </h1>
                </div>
              ))}
            </div>

            <div className="grid w-full py-4 px-2 ">
              <div className="flex gap-2">
                <div className="w-[100%]">
                  <div className="flex justify-between items-center">
                    <div className="">
                      <span className="text-[20px] font-normal Oswald-font text-[#262626]">
                        Shared Files
                      </span>
                    </div>

                    <div className="flex w-[20%] gap-1 justify-end ">
                      <div
                        className=" p-[5px] "
                        onClick={() => setLayoutOption(false)}
                      >
                        {layoutOption ? (
                          <IoListOutline className="text-lg cursor-pointer" />
                        ) : (
                          <IoList className="text-lg cursor-pointer" />
                        )}
                      </div>

                      <div
                        className=" p-[5px] "
                        onClick={() => setLayoutOption(true)}
                      >
                        {layoutOption ? (
                          <IoGrid className="text-lg cursor-pointer " />
                        ) : (
                          <IoGridOutline className="text-lg cursor-pointer " />
                        )}
                      </div>
                    </div>
                  </div>

                  <hr className="my-1 border-t-2" />

                  <span className="text-[12px] text-[#262626]">
                    View files shared with you by your administrator
                  </span>

                  {/* <AddPhotoD clientName={'tenants'} /> */}

                  {/* list view */}

                  <div className={layoutOption ? "hidden" : "block"}>
                    <div className="grid grid-cols-3 gap-3 mt-2 mb-[15px]">
                      {sharePhotos?.map((item, index) => (
                        <div key={index}>
                          <div className="h-[100px] w-[100px] overflow-hidden shadow-sm rounded-md group relative bg-cover object-center object-fill ">
                            {item?.photo_src?.includes("png") ||
                            item?.photo_src?.includes("jpg") ||
                            item?.photo_src?.includes("jpeg") ? (
                              <img
                                src={item?.photo_src}
                                alt={"Photo"}
                                onClick={() => OpenLight(item?.photo_src)}
                                className="w-full object-cover  rounded-md object-center h-full"
                              />
                            ) : (
                              <PdfThumbnail
                                url={item?.photo_src}
                                onClick={() => onClickPreview(item?.photo_src)}
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

                  {/* grid view */}
                  <div className={layoutOption ? "block" : "hidden"}>
                    <div className="grid grid-cols-3 gap-2 ">
                      {sharePhotos?.map((item, index) => (
                        <div key={index}>
                          <div className="h-[100px] w-[100px] overflow-hidden shadow-sm rounded-md group relative bg-cover object-center object-fill ">
                            {item?.photo_src?.includes("png") ||
                            item?.photo_src?.includes("jpg") ||
                            item?.photo_src?.includes("jpeg") ? (
                              <img
                                src={item?.photo_src}
                                alt={"Photo"}
                                onClick={() => OpenLight(item?.photo_src)}
                                className="w-full object-cover  rounded-md object-center h-full"
                              />
                            ) : (
                              <PdfThumbnail
                                url={item?.photo_src}
                                onClick={() => onClickPreview(item?.photo_src)}
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
                </div>
              </div>
            </div>
          </div>
        </div>

        {showPDFPreview && (
          <PreViewPDF
            datashow={showPDFPreview}
            onClick={() => setShowPDFPreview(false)}
            PDFURL={pdfUrl}
          />
        )}

        {openLightBox && (
          <TanantsLightbox
            src={imageSrc}
            datashow={openLightBox ? "block" : "hidden"}
            close={() => setOpenLightBox(false)}
          />
        )}
      </div>

      <BottomNavigation />
    </div>
  );
}

export default Index;
