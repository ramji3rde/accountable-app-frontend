import Link from "next/link";
import { useSelector } from "react-redux";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import {
  IoCall,
  IoMailOutline,
  IoListOutline,
  IoList,
  IoGridOutline,
  IoGrid,
  IoFlagSharp,
  IoFlagOutline,
  IoTrashOutline,
} from "react-icons/io5";
import { useRouter } from "next/router";
import Loader from "../public-com/loader";
import { ProjectDetail } from "../../redux/action/projectDetails";
import { useDispatch } from "react-redux";
import AddPhoto from "../public-com/form/addDocs";
import { getContractorsDetail } from "../../redux/action/contractors-detail";
import {
  deleteTenantsPhotoAPI,
  postContractorsFlagAPI,
} from "../../redux/APIS/API";
import DeletePhotoPopup from "../tenants/details/deletePhotopopup";
import toast from "react-hot-toast";
import TanantsLightbox from "../tenants/details/lightbox";
import PreViewPDF from "../tenants/details/PreViewPDF";
import { reactLocalStorage } from "reactjs-localstorage";
import PdfThumbnail from "../public-com/pdfThumbnail";
import Reminder from "../tenants/details/Reminder";

function ContractorsDetailsCom() {
  const [layoutOption, setLayoutOption] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [deleteID, setDeleteID] = useState("");
  const [loader, setLoader] = useState(false);
  const [lightBox, setLightBox] = useState(false);
  const [imageSrc, setImageSrc] = useState(true);
  const [pdfUrl, setPdfUrl] = useState("");
  const [showPDFPreview, setShowPDFPreview] = useState(false);
  const [showReminder, setShowReminder] = useState(false);

  const OpenLight = (img) => {
    setImageSrc(img);
    setLightBox(true);
  };

  const router = useRouter();
  const dispatch = useDispatch();

  const item_status = useSelector(
    (state) => state.contractorsDetail.contractorsDetail
  );
  const userType = useSelector((state) => state.contractorsDetail);

  const loggedInUserId = useSelector((state) => state.userActive.user?.id);

  const item = useSelector(
    (state) => state.contractorsDetail.contractorsDetail?.data?.data
  );

  const loading = useSelector((state) => state.contractorsDetail.loading);

  function ProjectsItem(id) {
    try {
      const data = { project_id: "" + id };
      dispatch(ProjectDetail(data));
      router.push("/projects/details");
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (item_status == null && !item) {
      router.push("/contractors/list");
    }
  }, [item_status, item]);

  async function DeleteOpen(id) {
    setShowPopup(true);
    setDeleteID(id);
  }

  async function deletePhotoapi(id) {
    try {
      setLoader(true);
      const data = {
        photo_ids: [id],
      };
      const respon = await deleteTenantsPhotoAPI(data);
      toast.success(respon.data.message);
      dispatch(getContractorsDetail(item.ID));
      setShowPopup(false);
      setLoader(false);
    } catch (err) {
      console.log(err);
    }
  }

  // flag toggle code start
  async function ClickIcon(val) {
    try {
      const respon = await postContractorsFlagAPI({
        contractor_id: "" + item.ID,
        company_flag: val,
      });
      dispatch(getContractorsDetail(item.ID));
    } catch (error) {
      console.log(error);
    }
  }
  function companyFlag() {
    const flag = item?.company_flag;
    if (flag === "true") {
      return (
        <IoFlagSharp
          onClick={() => {
            Manager === "app_manager" ? null : ClickIcon("false");
          }}
          className="w-[18.06px] h-[22.22px] cursor-pointer text-red-500"
        />
      );
    } else {
      return (
        <IoFlagOutline
          className="w-[18.06px] h-[22.22px] cursor-pointer"
          onClick={() => {
            setShowReminder(!showReminder);
            Manager === "app_manager" ? null : ClickIcon("true");
          }}
        />
      );
    }
  }
  // flag toggle code end

  function onClickPreview(value) {
    setPdfUrl(value);
    setShowPDFPreview(true);
  }

  const Manager = reactLocalStorage.get("user_role");

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div className="contractors-details mb-14">
          {/* {contractors.map((item, index) => */}
          <div key={item}>
            <div className="grid w-full pt-4 pb-2 px-4 ">
              <div className="flex w-full items-center">
                <div className="w-[80%] grid">
                  <h1 className="text-[16px]  font-sans font-[400]">
                    {item?.company_name.length > 0 ? item?.company_name : "--"}
                  </h1>
                  {item?.services.length > 0 && (
                    <div className="flex opacity-80 gap-[10px] items-center mt-2 ">
                      {item?.services ? (
                        <span className="text-[11px] border-set bg-[#FFFFFF] text-[#262626] font-[400] capitalize font-sans">
                          {item?.services}
                        </span>
                      ) : null}
                    </div>
                  )}
                </div>
                <div className="grid grid-cols-3  justify-end items-end w-[30%] h-[42px]">
                  <div className="w-[100%] grid justify-end ">
                    {companyFlag()}
                    <h6 className="text-[10px] ">Flag</h6>
                  </div>
                  <Link href={"tel:" + item?.company_primary_phone}>
                    <a>
                      <div className="w-[100%] grid justify-items-end ">
                        <IoCall className="h-[23.16px] w-[23.65px] " />
                        <h6 className="text-[9px] font-sans font-normal mr-[5px]">
                          Call
                        </h6>
                      </div>
                    </a>
                  </Link>

                  <Link
                    href={
                      item?.auto_generate_email == 0
                        ? "mailto:" + item?.company_email
                        : ""
                    }
                  >
                    <a>
                      <div className="w-[100%] grid justify-items-end ">
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
                        <h6 className="text-[9px] font-sans font-normal mt-1 ">
                          Email
                        </h6>
                      </div>
                    </a>
                  </Link>
                </div>
              </div>
            </div>

            <div className="grid w-full  px-4 ">
              <div className="grid gap-2">
                <div className="w-[100%]">
                  <span className="text-[11px] text-[#595959] font-san0s font-normal">
                    Account Number
                  </span>
                  <h1 className="text-[16px] font-[400] font-sans  text-[#262626]">
                    {item?.account_number.length > 0
                      ? item?.account_number
                      : "--"}
                  </h1>
                </div>
              </div>
            </div>

            <div className="grid w-full py-2 px-4 ">
              <div className="grid gap-2">
                <div className="w-[100%]">
                  <span className="text-[11px] text-[#595959] font-sans font-normal">
                    Location
                  </span>
                  <h1 className="text-[16px] font-[400] font-sans  text-[#262626]">
                    {item?.street_address
                      ? item?.street_address + ", " + item?.state + ", "
                      : null}
                    {item?.street_address_2.length > 0
                      ? item?.street_address_2 + ", "
                      : null}
                    {item?.city ? item?.city + ", " : null}
                    {item?.zip ? item?.zip : null}
                  </h1>
                </div>
              </div>
            </div>

            <div className="grid w-full py-2 px-4">
              <span className="text-[11px] text-[#595959] font-sans font-normal">
                Primary Phone {item?.company_primary_phone_type}
              </span>
              <h1 className="text-[16px] font-[400] font-sans  text-[#262626]">
                {item?.company_primary_phone.length > 0 ? (
                  <Link href={"tel:" + item?.company_primary_phone}>
                    {item?.company_primary_phone}
                  </Link>
                ) : (
                  "--"
                )}
              </h1>
            </div>

            {item?.auto_generate_email == 0 && (
              <div className="grid w-full py-2 px-4">
                <span className="text-[11px] text-[#595959] font-sans font-normal">
                  Primary Email
                </span>
                <h1 className="text-[16px] font-[400] font-sans  text-[#262626]">
                  {item?.company_email?.length > 0 &&
                  item?.auto_generate_email == "0" ? (
                    <Link href={"mailto:" + item?.company_email}>
                      {item?.company_email}
                    </Link>
                  ) : (
                    "--"
                  )}
                </h1>
              </div>
            )}

            {item?.contacts?.map((item, index) => (
              <div key={index}>
                <div className="grid w-[95%] my-2 mx-auto  border-gray  bg-[#FFFFFF]">
                  <div className="w-[100%] bg-[#154B88]  border-[1px] rounded-t-[6px] px-2 h-[25px]">
                    <span className="text-[16px] text-white font-normal Oswald-font">
                      Contact {index + 1}{" "}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 px-[20px]  py-[15px]">
                    <div className="">
                      <span className="text-[11px] text-[#595959] font-sans font-normal">
                        Name
                      </span>
                      <h1 className="text-[16px] font-[400] font-sans  text-[#262626]">
                        {item?.first_name.length > 0 ? item?.first_name : "--"}{" "}
                        {item?.last_name.length > 0 ? item?.last_name : "--"}
                      </h1>
                    </div>

                    <div className="">
                      <span className="text-[11px] text-[#595959] font-sans font-normal">
                        Title
                      </span>
                      <h1 className="text-[16px] font-[400] font-sans  text-[#262626]">
                        {item?.title.length > 0 ? item?.title : "--"}
                      </h1>
                    </div>

                    <div className="">
                      <span className="text-[11px] text-[#595959] font-sans font-normal">
                        Primary Phone {item?.primary_phone_type}
                      </span>
                      <h1 className="text-[16px] font-[400] font-sans  text-[#262626]">
                        {item?.primary_phone.length > 0 ? (
                          <Link href={"tel:" + item?.primary_phone}>
                            {item?.primary_phone}
                          </Link>
                        ) : (
                          "--"
                        )}
                      </h1>
                    </div>

                    <div className="">
                      <span className="text-[11px] text-[#595959] font-sans font-normal">
                        Secondary Phone {item?.secondary_phone_type}
                      </span>
                      <h1 className="text-[16px] font-[400] font-sans  text-[#262626]">
                        {item?.secondary_phone.length > 0 ? (
                          <Link href={"tel:" + item?.secondary_phone}>
                            {item?.secondary_phone}
                          </Link>
                        ) : (
                          "--"
                        )}
                      </h1>
                    </div>

                    <div className="col-span-2">
                      <span className="text-[11px] text-[#595959] font-sans font-normal">
                        Email Address
                      </span>
                      <h1 className="text-[16px] font-[400] font-sans  text-[#262626]">
                        {item?.email.length > 0 ? (
                          <Link href={"mailto:" + item?.email}>
                            {item?.email}
                          </Link>
                        ) : (
                          "--"
                        )}
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {item?.notes.length > 0 && (
              <div className="grid w-full py-4 px-4 ">
                <div className="flex gap-2">
                  <div className="w-[100%]">
                    <span className="text-[20px] font-normal Oswald-font text-[#262626]">
                      Note
                    </span>
                    <hr className="my-1 border-t-2" />

                    <div>
                      {item?.notes.map((item, index) => (
                        <div
                          className="grid grid-cols-1 gap-1 w-full"
                          key={index}
                        >
                          <div className="w-[100%]">
                            <span className=" text-[11px] text-[#595959] font-sans font-normal">
                              {item?.created_date &&
                                format(
                                  new Date(item?.created_date),
                                  "dd-MM-yyyy"
                                )}
                            </span>
                          </div>
                          <div className="w-[100%] grid overflow-hidden">
                            <p className=" w-[100%] grid text-[16px] font-[400] font-sans  text-[#262626]">
                              {item?.note}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
            {/* add photo on details screen */}
            <div className="grid w-full py-2 px-4 ">
              <div className="flex gap-2">
                <div className="w-[100%]">
                  <div className="flex justify-between items-center">
                    <div className="">
                      <span className="text-[20px] font-normal Oswald-font text-[#262626]">
                        Photos
                      </span>
                    </div>

                    <div className="flex w-[20%] gap-1 justify-end">
                      <div
                        className="p-[5px]"
                        onClick={() => setLayoutOption(false)}
                      >
                        {layoutOption ? (
                          <IoListOutline className="text-lg cursor-pointer" />
                        ) : (
                          <IoList className="text-lg cursor-pointer" />
                        )}
                      </div>

                      <div
                        className="p-[5px]"
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

                  {Manager === "app_manager" ? null : (
                    <AddPhoto
                      btnName={"Add Photos"}
                      type={"user"}
                      userID={item?.ID}
                      screenType={"details"}
                      clientname={"contractors"}
                    />
                  )}

                  {/* list view */}
                  <div className={layoutOption ? "hidden" : "block"}>
                    <div className="grid grid-cols-3 gap-3  mb-[15px]">
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

                            {Manager === "app_manager" ? null : (
                              <div
                                className="absolute bg-white shadow-lg top-1 right-1 rounded-[10px] w-[40px] h-[40px] text-center"
                                onClick={() => DeleteOpen(item.photo_id)}
                              >
                                <IoTrashOutline className="text-[25px] text-red-500 mt-[7px] ml-[8px] " />
                              </div>
                            )}
                          </div>

                          <h1 className="text-[10px] break-all text-ellipsis	whitespace-nowrap	overflow-hidden font-normal text-[#262626] ">
                            {item?.real_file_name.length > 0
                              ? item?.real_file_name
                              : "--"}
                          </h1>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className={layoutOption ? "block" : "hidden"}>
                    <div className="grid grid-cols-3 gap-2 ">
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

                            {Manager === "app_manager" ? null : (
                              <div
                                className="absolute bg-white shadow-lg top-1 right-1 rounded-[10px] w-[40px] h-[40px] text-center"
                                onClick={() => DeleteOpen(item.photo_id)}
                              >
                                <IoTrashOutline className="text-[25px] text-red-500 mt-[7px] ml-[8px] " />
                              </div>
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

            {/* project part  */}

            {item?.contractor_projects.length > 0 && (
              <div className="grid w-full py-4 px-4">
                <div className="flex gap-2">
                  <div className="w-[100%]">
                    <span className="text-[20px] font-normal Oswald-font text-[#262626]">
                      Projects
                    </span>
                    <hr className="my-1 border-t-2" />
                    <div className="my-4">
                      {item?.contractor_projects?.map((item, index) => (
                        <div key={index} className="pb-4 ">
                          <div className="grid w-full mx-auto shadow-lg shadow-gray-200 bg-[#FFFFFF] overflow-hidden ">
                            <div className="w-[100%] bg-[#154B88]  rounded-t-[6px]  px-2 h-[25px]  flex">
                              <div className="w-[60%] flex gap-2  ">
                                <span className="text-[16px] text-white font-[400] Oswald-font">
                                  ID#:{item.ID}
                                </span>
                                <span className="text-[16px] text-white font-[400] Oswald-font">
                                  DATE:{" "}
                                  {item?.project_date &&
                                    format(
                                      new Date(item?.project_date),
                                      "MM/dd/yyyy"
                                    )}
                                </span>
                              </div>

                              <div
                                className="w-[40%] flex justify-end items-center gap-2 "
                                onClick={() => ProjectsItem(item.ID)}
                              >
                                <span className="text-[12px] text-white font-normal font-sans">
                                  Go to project
                                </span>
                                <img
                                  src={"/assetes/icon/angle-icon.svg"}
                                  alt={"angle-icon"}
                                />
                              </div>
                            </div>

                            <div className="grid w-full gap-2 px-[20px] py-[15px] ">
                              <div className="w-full">
                                <h1 className="text-[16px] font-[700] font-sans  text-[#262626]">
                                  {item?.project_name}
                                </h1>
                              </div>

                              <div className="w-full">
                                <h1 className="text-[14px] text-[#262626] font-sans font-[400]">
                                  {item?.project_detail}
                                </h1>
                              </div>

                              <div className="flex items-center gap-3">
                                <div className="">
                                  <span className="text-[11px] font-sans font-normal text-[#595959]">
                                    Quote
                                  </span>
                                  <h1 className="text-[16px] text-[#262626] font-sans  font-[400]">
                                    {item?.bid_price && "$" + item?.bid_price}
                                  </h1>
                                </div>
                                {item.bid_accepted_by_admin === "0" && (
                                  <span className="text-[11px] text-[#262626] capitalize bg-[#F19E9A] px-1.5 py-0.5 rounded-[3px]">
                                    Declined
                                  </span>
                                )}

                                {item.bid_accepted_by_admin === "1" && (
                                  <span className="text-[11px] text-[#262626] capitalize bg-[#91EC9D] px-1.5 py-0.5 rounded-[3px] ">
                                    Accepted
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {
        <Reminder
          show={showReminder}
          setShowReminder={setShowReminder}
          id={item?.ID}
          data={item_status}
          userType={userType}
        />
      }
      {showPDFPreview && (
        <PreViewPDF
          datashow={showPDFPreview}
          onClick={() => setShowPDFPreview(false)}
          PDFURL={pdfUrl}
        />
      )}
      {showPopup && (
        <DeletePhotoPopup
          deletePhoto={() => {
            deletePhotoapi(deleteID);
          }}
          datashow={showPopup ? "block" : "hidden"}
          onClicked={() => setShowPopup(false)}
          loading={loader}
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

export default ContractorsDetailsCom;
