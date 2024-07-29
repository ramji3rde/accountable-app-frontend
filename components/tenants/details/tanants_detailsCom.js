import Link from "next/link";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import AddPhotoD from "./addPhotoD";
import TanantsLightbox from "./lightbox";
import { format } from "date-fns";
import {
  AdmintenantAccessLoginAPI,
  deleteTenantsPhotoAPI,
  postTenantsFlagAPI,
} from "../../../redux/APIS/API";
import { getTenantDetail } from "../../../redux/action/tenants-detail";
import Loader from "../../public-com/loader";
import DeletePhotoPopup from "./deletePhotopopup";
import AddPhoto from "../../public-com/form/addDocs";
import PreViewPDF from "./PreViewPDF";
import { reactLocalStorage } from "reactjs-localstorage";
import ShowPdfTumbnail from "../../public-com/showPdfTumbnail";
import TenantContact from "./tenant-contact";
import PdfThumbnail from "../../public-com/pdfThumbnail";
import ReminderPopup from "./ReminderPopup";
import Reminder from "./Reminder";
// import SignUp from "../../transactions/SignUp";
import TenantsFinancials from "./tenantsFinancials";


function TanantsDetailsCom({setToShow}) {
  const [layoutOption, setLayoutOption] = useState(false);
  const [openLightBox, setOpenLightBox] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [deleteID, setDeleteID] = useState(null);
  const [imageSrc, setImageSrc] = useState(true);
  const [imageDis, setImageDis] = useState(true);
  const [hidden, setHidden] = useState("");
  const [pdfUrl, setPdfUrl] = useState("");
  const [showPDFPreview, setShowPDFPreview] = useState(false);
  const [contactPopup, setContactPopup] = useState(false);
  const [showReminder, setShowReminder] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const hasAccount = true;
  const hasData = true;
  const projects = [1, 2, 3, 4];

  const OpenLight = (img) => {
    setImageSrc(img);
    setOpenLightBox(true);
  };

  const router = useRouter();
  const dispatch = useDispatch();

  const tenants_data = useSelector(
    (state) => state.tenantsDetails.tenantsDetails
  );
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    setToShow(!isChecked);
  };

  const userType = useSelector((state) => state.tenantsDetails);

  const tenants_detail = useSelector(
    (state) => state.tenantsDetails.tenantsDetails?.data
  );

  const tenantId = useSelector(
    (state) => state.tenantsDetails.tenantsDetails?.data?.ID
  );
  const author_id = useSelector(
    (state) => state.tenantsDetails.tenantsDetails?.data?.post_author
  );

  const loading = useSelector((state) => state.tenantsDetails.loading);

  const dtoken = localStorage.getItem("fcm_token");

  const userId = useSelector((state) => state.userActive.user?.id);

  useEffect(() => {
    if (tenants_data == null && !tenants_detail) {
      router.push("/tenants/list");
    }
  }, [tenants_data, tenants_detail]);

  useEffect(() => {
    if (tenants_detail?.secondary_fname === "") {
      setHidden(true);
    }

    if (tenants_detail?.secondary_lname === "") {
      setHidden(true);
    }

    if (tenants_detail?.secondary_phone === "") {
      setHidden(true);
    }

    if (tenants_detail?.secondary_primary_phone === "") {
      setHidden(true);
    }

    if (tenants_detail?.secondary_title === "") {
      setHidden(true);
    }

    if (tenants_detail?.secondary_contact_email === "") {
      setHidden(true);
    }

    if (hidden == true) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  }, [
    tenants_detail?.secondary_fname,
    tenants_detail?.secondary_lname,
    tenants_detail?.secondary_phone,
    tenants_detail?.secondary_primary_phone,
    tenants_detail?.secondary_title,
    tenants_detail?.secondary_contact_email,
  ]);

  // flag toggle code
  async function ClickIcon(val) {
    try {
      const respon = await postTenantsFlagAPI({
        tenant_id: "" + tenantId,
        company_flag: val,
      });
      dispatch(getTenantDetail(tenantId));
    } catch (error) {
      console.log(error);
    }
  }

  const flag = () => {
    setShowReminder(true);
  };
  function companyFlag() {
    const flag = tenants_detail?.company_flag;
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

  // delete photos code
  const DeleteOpen = (id) => {
    setDeleteID(id);
    setShowPopup(true);
  };

  async function deletePhotoapi(id) {
    try {
      const data = {
        photo_ids: [id],
      };
      const respon = await deleteTenantsPhotoAPI(data);
      toast.success(respon.data.message);
      dispatch(getTenantDetail(tenantId));
      setShowPopup(false);
    } catch (err) {
      console.log(err);
    }
  }

  function onClickPreview(value) {
    setPdfUrl(value);
    setShowPDFPreview(true);
  }

  async function AccessLoginFunction(ID, value) {
    let data = {
      login_access: value,
      tenantId: ID,
    };

    const res = await AdmintenantAccessLoginAPI(data);

    dispatch(getTenantDetail(tenantId));
  }

  async function UndoLoginAccess() {
    let data = {
      login_access: "reset",
      tenantId: tenantId,
    };

    const res = await AdmintenantAccessLoginAPI(data);

    dispatch(getTenantDetail(tenantId));
  }

  const Manager = reactLocalStorage.get("user_role");

  return (
    <div className="Tenants-details mb-14">
      {loading ? (
        <Loader />
      ) : (
        <div onClick={() => contactPopup == true && setContactPopup(false)}>
          <div className="grid w-full py-4 px-4 ">
            <div className="flex w-full items-center" key={tenants_detail}>
              <div className="w-[70%] grid">
                <div className="flex items-center gap-2 overflow-hidden ">
                  <h1 className="text-[16px] font-[400] font-sans text-[#262626] oneLineTextlimit">
                    {tenants_detail?.company_name.length > 0
                      ? tenants_detail?.company_name
                      : "--"}
                  </h1>
                </div>
                <div className="flex gap-2 my-1 ">
                  {tenants_detail?.status.length > 0 && (
                    <span className="text-[11px] font-normal  text-[#262626] font-sans border-set ">
                      {tenants_detail?.status}
                    </span>
                  )}
                  {tenants_detail?.property.length > 0 && (
                    <span className="text-[11px] font-normal text-[#262626] font-sans border-set  ">
                      {tenants_detail?.property}
                    </span>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-3 justify-end items-center w-[30%] gap-3">
                <div className="w-[100%] grid justify-end ">
                  {companyFlag()}
                  <h6 className="text-[10px] ">Flag</h6>
                </div>

                <div
                  className="w-[100%]  grid justify-end "
                  onClick={() => setContactPopup(!contactPopup)}
                >
                  <IoCall className="h-[23.16px] w-[23.65px] " />
                  <h6 className="text-[9px] font-sans font-normal items-center ml-1">
                    Call
                  </h6>
                </div>

                <Link href={"mailto:" + tenants_detail?.primary_contact_email}>
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
                      <h6 className="text-[9px] font-sans font-normal mt-1 ">
                        Email
                      </h6>
                    </div>
                  </a>
                </Link>
              </div>
            </div>

            <div className="w-[70%] grid">
              <div className="flex items-center py-3 gap-2 ">
                <div className="flex gap-2 text-gray-500 ">
                  <span className="text-[11px] font-sans font-normal text-[#595959] ">
                    Unit Type
                    <p className="text-[16px] font-normal text-[#262626]">
                      {tenants_detail?.unit_type}
                    </p>
                  </span>

                  <span className="text-[11px] font-sans font-normal text-[#595959] ">
                    Unit Value
                    <p className="text-[16px] font-normal text-[#262626]">
                      {tenants_detail?.unit}
                    </p>
                  </span>

                  <span className="text-[11px] font-sans font-normal text-[#595959]   ">
                    Mailbox
                    <p className="text-[16px] font-normal text-[#262626]">
                      {tenants_detail?.mailbox.length > 0
                        ? tenants_detail?.mailbox
                        : "--"}
                    </p>
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-2 w-full  ">
              <div className="w-[100%]">
                <span className="text-[11px] font-sans font-normal text-[#595959]">
                  Location
                </span>
                <h1 className="text-base  font-normal text-[#262626]">
                  {tenants_detail?.street_address
                    ? tenants_detail?.street_address +
                      ", " +
                      tenants_detail?.state +
                      ", "
                    : null}
                  {tenants_detail?.street_address_2
                    ? tenants_detail?.street_address_2 + ", "
                    : null}
                  {tenants_detail?.city ? tenants_detail?.city + ", " : null}
                  {tenants_detail?.zip_code ? tenants_detail?.zip_code : null}
                </h1>
              </div>
            </div>
          </div>
          <div className="p-3">
            <label className="themeSwitcherTwo shadow-card relative inline-flex cursor-pointer select-none items-center justify-center rounded-[2px]  bg-[#CCD9E6] p-1 w-[100%] h-[35px]">
              <input
                type="checkbox"
                className="sr-only"
                checked={isChecked}
                onChange={handleCheckboxChange}
              />
              <span
                className={`flex items-center  space-x-[6px] w-[100%] h-[25px] rounded py-2 px-[18px] text-sm font-medium ${
                  !isChecked ? "text-primary bg-white " : "text-body-color"
                }`}
              >
                <p className="ml-auto mr-auto">Summary</p>
              </span>
              <span
                className={`flex items-center space-x-[6px] w-[100%] h-[25px] rounded py-2 px-[18px] text-sm font-medium ${
                  isChecked ? "text-primary bg-white" : "text-body-color"
                }`}
              >
                <p className="ml-auto mr-auto">Financials</p>
              </span>
            </label>
          </div>
          {!isChecked ? (
            <>
              {/* contact map data */}
              {tenants_detail?.contacts?.map((contact, index) => (
                <div key={index}>
                  <div className="grid w-[95%] my-2 mx-auto border-[1px] border-gray ">
                    <div className="w-[100%] bg-[#154B88]  border-[1px] px-2 h-[25px] rounded-t-[6px]">
                      <span className="text-[16px] font-normal Oswald-font text-white">
                        Contact {index + 1}{" "}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 py-[15px] px-[20px] bg-[#FFFFFF]">
                      <div className="">
                        <span className="text-[11px] font-sans font-normal text-[#595959] ">
                          Name
                        </span>
                        <h1 className="text-[16px] font-normal text-[#262626]">
                          {contact?.first_name.length > 0
                            ? contact?.first_name
                            : "--"}{" "}
                          {contact?.last_name.length > 0
                            ? contact?.last_name
                            : "--"}
                        </h1>
                      </div>

                      <div className="">
                        <span className="text-[11px] font-sans font-normal text-[#595959] ">
                          Title
                        </span>
                        <h1 className="text-[16px] font-normal text-[#262626]">
                          {contact?.title.length > 0 ? contact?.title : "--"}
                        </h1>
                      </div>

                      <div className="">
                        <span className="text-[11px] font-sans font-normal text-[#595959] ">
                          Primary Phone: {contact?.primary_phone_type}
                        </span>
                        <h1 className="text-[16px] font-normal text-[#262626]">
                          {contact?.primary_phone.length > 0 ? (
                            <Link href={"tel:" + contact?.primary_phone}>
                              {contact?.primary_phone}
                            </Link>
                          ) : (
                            "--"
                          )}
                        </h1>
                      </div>

                      <div className="">
                        <span className="text-[11px] font-sans font-normal text-[#595959] ">
                          Secondary Phone: {contact?.secondary_phone_type}
                        </span>
                        <h1 className="text-[16px] font-normal text-[#262626]">
                          {contact?.secondary_phone.length > 0 ? (
                            <Link href={"tel:" + contact?.secondary_phone}>
                              {contact?.secondary_phone}
                            </Link>
                          ) : (
                            "--"
                          )}
                        </h1>
                      </div>

                      <div className="col-span-2">
                        <span className="text-[11px] font-sans font-normal text-[#595959] ">
                          Email Address
                        </span>
                        <h1 className="text-[16px] font-normal text-[#262626] break-all ">
                          {contact?.email.length > 0 ? (
                            <Link href={"mailto:" + contact?.email}>
                              {contact?.email}
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

              {tenants_detail?.notes.length > 0 && (
                <div className="grid w-full py-2 px-4 ">
                  <div className="flex gap-2">
                    <div className="w-[100%]">
                      <span className="text-[20px] font-normal Oswald-font text-[#262626]">
                        Note
                      </span>
                      <hr className="my-1 border-t-2" />

                      {/* <NotesData /> */}
                      {tenants_detail?.notes?.map((item, index) => (
                        <div key={index}>
                          <div className="grid gap-x-2	">
                            <div className="w-full">
                              <span className=" text-[12px]">
                                {item?.created_date &&
                                  format(
                                    new Date(item?.created_date),
                                    "dd-MM-yyyy"
                                  )}
                              </span>
                            </div>
                            <div className="w-full">
                              <p className="text-gray-500 text-sm ">
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

              <div className="grid w-full py-2 px-4 ">
                <div className="flex gap-2">
                  <div className="w-[100%]">
                    <div className="flex justify-between items-center">
                      <div className="">
                        <span className="text-[20px] font-normal Oswald-font text-[#262626]">
                          Photos / Documents
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

                    {/* <AddPhotoD clientName={'tenants'} /> */}

                    {Manager === "app_manager" ? null : (
                      <AddPhoto
                        btnName={"Add Files"}
                        type={"post"}
                        userID={tenantId}
                        screenType={"details"}
                        clientname={"tenants"}
                      />
                    )}

                    {/* list view */}

                    <div className={layoutOption ? "hidden" : "block"}>
                      <div className="grid grid-cols-3 gap-3  mb-[15px]">
                        {tenants_detail?.photos?.map((item, index) => (
                          <div key={index}>
                            <div className="h-[100px] w-[100px] overflow-hidden shadow-sm rounded-md group relative bg-cover object-center object-fill ">
                              {item?.photo_src?.includes("pdf") ? (
                                <PdfThumbnail
                                  url={item?.photo_src}
                                  onClick={() =>
                                    onClickPreview(item?.photo_src)
                                  }
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

                    {/* grid view */}
                    <div className={layoutOption ? "block" : "hidden"}>
                      <div className="grid grid-cols-3 gap-2 ">
                        {tenants_detail?.photos?.map((item, index) => (
                          <div key={index}>
                            <div className="h-[100px] w-[100px] overflow-hidden shadow-sm rounded-md group relative bg-cover object-center object-fill ">
                              {item?.photo_src?.includes("pdf") ? (
                                <PdfThumbnail
                                  url={item?.photo_src}
                                  onClick={() =>
                                    onClickPreview(item?.photo_src)
                                  }
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
                  </div>
                </div>
              </div>

              {/*  Shared Files module */}
              <div className="grid w-full py-2 mb-[6.25rem] px-4 ">
                <div className="flex gap-2">
                  <div className="w-[100%]">
                    <div className="flex justify-between items-center">
                      <div className="">
                        <span className="text-[20px] font-normal Oswald-font text-[#262626]">
                          Shared Files
                        </span>
                      </div>

                      <div className="flex w-[20%] gap-1 justify-end ">
                        <div className=" p-[5px] ">
                          <IoList className="text-lg cursor-pointer" />
                        </div>

                        <div className=" p-[5px] ">
                          <IoGridOutline className="text-lg cursor-pointer " />
                        </div>
                      </div>
                    </div>

                    <hr className="my-1 border-t-2" />

                    <span className="text-[15px] font-normal text-[#262626] ">
                      Add files you want to share with this tenant. Only you and
                      this tenant can view these files.
                    </span>

                    {/* <AddPhotoD clientName={'tenants'} /> */}

                    {Manager === "app_manager" ? null : (
                      <div className="my-[10px]">
                        <AddPhoto
                          btnName={"Add Files"}
                          type={"post"}
                          userID={tenantId}
                          screenType={"details"}
                          clientname={"tenantsSendFile"}
                        />
                      </div>
                    )}

                    {/* Share File Location */}
                    <div className={"block"}>
                      <div className="grid grid-cols-3 gap-2 ">
                        {tenants_detail?.shared_files?.map((item, index) => (
                          <div key={index}>
                            <div className="h-[100px] w-[100px] overflow-hidden shadow-sm rounded-md group relative bg-cover object-center object-fill ">
                              {item?.photo_src?.includes("pdf") ? (
                                <PdfThumbnail
                                  url={item?.photo_src}
                                  onClick={() =>
                                    onClickPreview(item?.photo_src)
                                  }
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
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="">
                <TenantsFinancials tenants_detail={tenants_detail} />
              </div>
            </>
          )}
        </div>
      )}

      {showPDFPreview && (
        <PreViewPDF
          datashow={showPDFPreview}
          onClick={() => setShowPDFPreview(false)}
          PDFURL={pdfUrl}
        />
      )}

      {<TenantContact show={contactPopup} data={tenants_detail?.contacts} />}

      {
        <Reminder
          show={showReminder}
          setShowReminder={setShowReminder}
          id={tenants_data?.data?.ID}
          data={tenants_data}
          userType={userType}
        />
      }

      {showPopup && (
        <DeletePhotoPopup
          deletePhoto={() => deletePhotoapi(deleteID)}
          datashow={showPopup ? "block" : "hidden"}
          onClicked={() => setShowPopup(false)}
        />
      )}

      {openLightBox && (
        <TanantsLightbox
          data={imageDis}
          src={imageSrc}
          datashow={openLightBox ? "block" : "hidden"}
          close={() => setOpenLightBox(false)}
          photo_detail={imageDis ? imageDis : "--"}
        />
      )}
    </div>
  );
}

export default TanantsDetailsCom;
