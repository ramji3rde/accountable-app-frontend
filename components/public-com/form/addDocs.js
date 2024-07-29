import { useState, useRef } from "react";
import { useFormik } from "formik";
import { IoAddSharp } from "react-icons/io5";
import toast from "react-hot-toast";
import { addDocsAPIS, sendFiles } from "../../../redux/APIS/API";
import { useDispatch, useSelector } from "react-redux";
import { getTenantDetail } from "../../../redux/action/tenants-detail";
import { useRouter } from "next/router";
import { IoTrashOutline } from "react-icons/io5";
import { getContractorsDetail } from "../../../redux/action/contractors-detail";
import { BsUpload } from "react-icons/bs";
import { getIncidentsDetails } from "../../../redux/action/incidentsDetails";
import { getExpensesDetails } from "../../../redux/action/expensesDetails";
import { ProjectDetail } from "../../../redux/action/projectDetails";
import { getTenantsUserDetails } from "../../../redux/action/tenantsuserDetails";
import { getMessageUserDetails } from "../../../redux/action/tenantsMessageDetails";

function AddPhoto({
  updateState,
  btnName,
  type,
  userID,
  screenType,
  formik,
  clientname,
  inputType,
}) {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedImage, setSelectedImage] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [onSubmitIsLoading, setOnSubmitIsLoading] = useState(false);
  const [imageError, setImageError] = useState(false);

  const router = useRouter();

  const dispatch = useDispatch();

  const open = () => {
    setShowPopup(true);
  };

  const close = () => {
    setShowPopup(true);
  };

  const multipleSelctor = (e) => {
    const newImages = Array.from(e.target.files); // Convert FileList to an array

    if (newImages.length > 0) {
      setSelectedImage([...selectedImage, ...newImages]);
      setImageError(null);
    } else {
      setImageError("Please select an image");
    }
  };

  const PhotoFormik = useFormik({
    initialValues: {
      image: "",
      detail: "",
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        setOnSubmitIsLoading(true);

        if (selectedImage.length > 0) {
          setImageError(null);

          if (screenType === "details") {
            var formdata = new FormData();

            for (var i = 0; i < selectedImage.length; i++) {
              formdata.append(
                "upload_media[]",
                selectedImage[i],
                selectedImage[i].name
              );
            }
            formdata.append("user_post_id", userID);
            formdata.append("author", 1);
            formdata.append("detail", values.detail ? values.detail : " ");
            formdata.append("upload_for", type);

            if (clientname == "tenantsSendFile") {
              var sharedformdata = new FormData();

              for (var i = 0; i < selectedImage.length; i++) {
                sharedformdata.append(
                  "upload_media[]",
                  selectedImage[i],
                  selectedImage[i].name
                );
              }

              sharedformdata.append("to_id", userID);
              sharedformdata.append("detail", values.detail);
              sharedformdata.append("shared_for", "tenant");

              const respon = await sendFiles(sharedformdata);
              toast.success(respon.data.message);
            } else {
              console.log(formdata, "this is value details");
              const respon = await addDocsAPIS(formdata);
              toast.success(respon.data.message);
            }
            if (clientname === "contractors") {
              dispatch(getContractorsDetail(userID));
            }

            if (clientname === "incident") {
              dispatch(getIncidentsDetails(userID));
            }

            if (clientname === "tenants" || clientname === "tenantsSendFile") {
              dispatch(getTenantDetail(userID));
            }

            if (clientname === "project") {
              let data = { project_id: "" + userID };
              dispatch(ProjectDetail(data));
            }

            if (clientname === "expenses") {
              dispatch(getExpensesDetails(userID));
            }

            if (clientname === "proparty") {
              console.log("proparty proparty proparty");
            }

            if (clientname === "projectRequest") {
              let data = { project_id: userID };
              dispatch(getTenantsUserDetails(data));
            }
            if (clientname === "tenantMessage") {
              let data = { messageId: userID };
              dispatch(getMessageUserDetails(data));
            }

            setShowPopup(false);

            setOnSubmitIsLoading(false);

            resetForm();
            {
              updateState && updateState();
            }

          } else {
            
            resetForm();

            const localImage = selectedImage.map((item) => {
              return { image: item };
            });

            formik.setFieldValue("photos", {
              localImage: formik?.values?.photos?.localImage
                ? formik?.values?.photos?.localImage.concat(localImage)
                : localImage,
              detail: values.detail,
            });

            setSelectedImage([]);
            setShowPopup(false);
            resetForm();
          }
        } else {
          {
            resetForm();
          }
          setOnSubmitIsLoading(false);
          setImageError("Please select an image");
        }

        setOnSubmitIsLoading(false);
      } catch (error) {
        setOnSubmitIsLoading(false);
        console.log(error);
      }
    },
  });

  return (
    <div>
      <div
        className={`${
          clientname === "incident" || "expenses"
            ? "flex justify-end"
            : screenType === "details"
            ? "flex justify-start"
            : "flex justify-end"
        }  items-center mb-[10px]`}
      >
        <div className=" flex justify-center ">
          {btnName ? (
            <div
              onClick={() => open()}
              className="w-[100%] py-[12px] px-[14px] h-[45px]  items-center font-normal not-italic  mx-auto flex text-[16px] justify-center text-[#262626] bg-[#F2DA31] 
                                rounded-[6px] hover:bg-[#F2DA31] hover:text-white shadow-[0_0px_30px_0px_#00000033]"
            >
              <span className="flex gap-2">
                <img
                  src={"/bottom-icon/plus-icon.svg"}
                  alt="plus-icon-active"
                  className="h-[14.44px] w-[14.44px] mt-1"
                />
                {btnName}
              </span>
            </div>
          ) : (
            <div
              onClick={() => open()}
              className={`' w-[100%] py-[12px] px-[14px] mx-auto  flex text-[16px] justify-center 
                         bg-yellow-400 rounded-[6px] font-sans  shadow-[0_0px_30px_0px_#00000033] '`}
            >
              <BsUpload className="mt-1 mr-2" />
              <span className="">Upload Documents</span>
            </div>
          )}
        </div>
      </div>
      <div className={showPopup ? "block" : "hidden"}>
        <div
          className="h-screen transition-all bg-[#22222238] w-full fixed z-[100] top-0 left-0 overflow-x-hidden 
            overflow-y-auto backdrop-blur-[1px]"
        >
          {/* <form method='POST' onSubmit={PhotoFormik.handleSubmit}> */}

          <div className="">
            <div className="absolute w-[80%] top-[18%] mb-[50px] left-[10%] mx-auto bg-white rounded-[10px]">
              <div className="text-black text-center px-4 pt-8">
                <div className="grid grid-cols-2 gap-x-[10px] mb-2">
                  <label
                    className="w-full flex flex-col items-center  py-[5px] h-[35px] px-[10px]  text-blue rounded-lg 
                                        tracking-wide bg-[#CCD9E6] cursor-pointer"
                  >
                    <span className=" text-[16px] font-normal leading-normal">
                      Take Photo
                    </span>
                    <input
                      type="file"
                      capture={inputType === "image" ? "environment" : ""}
                      accept={inputType === "image" ? "image/*" : ""}
                      name="image"
                      id="image"
                      multiple
                      onChange={async (e) => {
                        PhotoFormik?.handleChange;
                        multipleSelctor(e);
                      }}
                      className="hidden"
                    />
                  </label>

                  <label
                    className="w-full flex flex-col items-center py-[5px] h-[35px] text-blue rounded-lg 
                                        tracking-wide bg-[#CCD9E6] cursor-pointer"
                  >
                    <span className="text-[16px] font-normal leading-normal">
                      Choose File
                    </span>
                    <input
                      accept={inputType === "image" ? "image/*" : ""}
                      type="file"
                      name="image"
                      multiple
                      onChange={async (e) => {
                        PhotoFormik?.handleChange;
                        multipleSelctor(e);
                      }}
                      className="hidden"
                    />
                  </label>
                </div>
                {imageError && (
                  <div>
                    {" "}
                    <h1 className="text-[15px] text-red-500 text-left mb-2 ">
                      {imageError}
                    </h1>{" "}
                  </div>
                )}

                <div className="mb-4 flex gap-2 flex-wrap">
                  <label
                    className="w-[75px] justify-center flex flex-col items-center  h-[75px] bg-white text-blue rounded-lg 
                                        tracking-wide cursor-pointer border-2 border-black border-dashed"
                  >
                    <IoAddSharp className="text-2xl " />
                    <input
                      accept={inputType === "image" ? "image/*" : ""}
                      type="file"
                      name="image"
                      multiple
                      onChange={async (e) => {
                        PhotoFormik?.handleChange;
                        multipleSelctor(e);
                      }}
                      className="hidden"
                    />
                  </label>

                  {selectedImage &&
                    selectedImage.map((item, index) => (
                      <div
                        key={index}
                        className="h-[75px] w-[75px] rounded-md shadow-lg mb-4 group relative "
                      >
                        {item?.type.includes("image") ? (
                          <>
                            <img
                              src={
                                isLoading
                                  ? URL.createObjectURL(item)
                                  : "/assetes/icon/img-loader.svg"
                              }
                              alt=""
                              className="w-full object-cover Dumysy  rounded-md object-center h-full"
                              onLoad={() => setIsLoading(true)}
                            />
                          </>
                        ) : (
                          <img
                            src={
                              isLoading
                                ? "/assetes/icon/rectangle.svg"
                                : "/assetes/icon/img-loader.svg"
                            }
                            onLoad={() => setIsLoading(true)}
                            className="w-full object-cover rounded-md object-center h-full"
                            alt=""
                          />
                        )}
                      </div>
                    ))}
                </div>

                <textarea
                  rows="6"
                  placeholder="Enter details (Optional)"
                  name="detail"
                  id="detail"
                  onChange={PhotoFormik.handleChange}
                  value={PhotoFormik.values.detail}
                  className=" w-full text-[16px]  font-normal py-[5px] px-[10px] h-[70px] rounded-[5px]
                                      bg-[#FFF] border-[#cfcfcf8f]  text-theme border-2 focus:border-theme focus:outline-none"
                />
              </div>

              <div className="flex justify-center mt-4">
                {onSubmitIsLoading ? (
                  <span className="bg-[#4DE060] rounded-bl-[10px] w-[50%] flex justify-center items-center">
                    <div
                      className="animate-spin inline-block  w-[25px] h-[25px] rounded-full border-[2px] border-r-white
                               border-l-[#ffffff75] border-y-[#ffffff75] "
                    ></div>
                  </span>
                ) : (
                  <div
                    onClick={() => {
                      PhotoFormik.handleSubmit();
                    }}
                    className="bg-[#4DE060] rounded-bl-[10px] w-[50%] flex justify-center"
                  >
                    <button
                      type="button"
                      className=" py-4 w-[100%] text-[16px] font-normal mx-auto flex justify-center text-[#262626] 
                                            rounded-[10px] "
                    >
                      Add
                    </button>
                  </div>
                )}
                <div
                  onClick={() => {
                    PhotoFormik.handleReset();
                    setSelectedImage([]);
                    setShowPopup(false);
                    setImageError(null);
                  }}
                  className=" bg-[#CCD9E6] rounded-br-[10px] w-[50%]  flex justify-center"
                >
                  <div
                    className="py-4 w-[100%] text-[16px] font-normal  mx-auto flex justify-center text-[#262626] 
                                            rounded-[10px]"
                  >
                    <span className="">Cancel</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddPhoto;
