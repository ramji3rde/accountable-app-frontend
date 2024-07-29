import { useState } from "react";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import {
  postProjectsPhotosAPI,
  postTenantsAddPhotosAPI,
} from "../../../redux/APIS/API";
import { useDispatch, useSelector } from "react-redux";
import { getTenantDetail } from "../../../redux/action/tenants-detail";
import { useRouter } from "next/router";
import { IoTrashOutline } from "react-icons/io5";
import { IoAddSharp } from "react-icons/io5";
import { ProjectDetail } from "../../../redux/action/projectDetails";

function AddPhotoD({ clientName, ID, buttonAline }) {
  const [showPopup, setShowPopup] = useState(true);
  const [selectedImage, setSelectedImage] = useState();

  const dispatch = useDispatch();
  const open = () => {
    setShowPopup(false);
  };

  const close = () => {
    setShowPopup(true);
  };

  const router = useRouter();

  const Tenants_id = useSelector(
    (state) => state?.tenantsDetails?.tenantsDetails?.data?.ID
  );

  const userId = useSelector((state) => state.userActive.user?.id);

  const PhotoFormik = useFormik({
    initialValues: {
      image: "",
      detail: "",
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        if (clientName === "project") {
          const data = {
            project_id: ID,
            author: userId,
            photos: [values],
          };

          const respon = await postProjectsPhotosAPI({
            project_id: ID,
            author: userId,
            photos: [values],
          });

          toast.success(respon.data.message);

          const ProjectIDD = { project_id: ID };

          dispatch(ProjectDetail(ProjectIDD));

          setShowPopup(true);

          resetForm();
        }

        if (clientName === "tenants") {
          const respon = await postTenantsAddPhotosAPI({
            post_id: Tenants_id,
            author: userId,
            photos: [values],
          });
          toast.success(respon.data.message);
          setShowPopup(true);
          dispatch(getTenantDetail(Tenants_id));
          resetForm();
        }
      } catch (error) {
        toast.error(error.response.data.message);
      }
    },
  });

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  return (
    <div>
      <div
        className={`${
          buttonAline ? buttonAline : "justify-start"
        } flex  items-center mb-[10px] `}
      >
        <div className="w-[50%] flex justify-center ">
          <div
            onClick={open}
            className="w-[100%] py-[12px] px-[14px] h-[45px]  font-normal not-italic  mx-auto flex text-[16px] justify-center text-[#262626] bg-[#F2DA31] 
                                    rounded-[6px] hover:bg-[#F2DA31] hover:text-white shadow-[0_0px_30px_0px_#00000033]"
          >
            <span className="flex gap-2">
              <img
                src={"/bottom-icon/plus-icon.svg"}
                alt="plus-icon-active"
                className="h-[14.44px] w-[14.44px] mt-1"
              />
              Add Photos
            </span>
          </div>
        </div>
      </div>
      <div className={showPopup ? "hidden" : "block"}>
        <div className="h-screen transition-all bg-[#22222238] w-full fixed z-[100] top-0 left-0 overflow-hidden backdrop-blur-[1px]">
          <form method="POST" onSubmit={PhotoFormik.handleSubmit}>
            <div className="">
              <div className="absolute w-[80%] top-[22%] left-[10%] mx-auto bg-white rounded-[10px]">
                <div className="text-black text-center px-4 pt-6">
                  <div className="grid grid-cols-2 gap-x-[10px] mb-4">
                    <label
                      className="w-full flex flex-col items-center  py-[5px] h-[35px] px-[10px]  text-blue rounded-lg 
                                        tracking-wide bg-[#CCD9E6] cursor-pointer"
                    >
                      <span className="text-[13px] font-normal leading-normal">
                        Take Photo
                      </span>
                      <input
                        type="file"
                        capture="environment"
                        accept="image/*"
                        name="image"
                        id="image"
                        onChange={async (e) => {
                          const file = e.target.files[0];
                          const base64 = await convertToBase64(file);
                          PhotoFormik.setFieldValue("image", base64);
                        }}
                        value={PhotoFormik.image}
                        className="hidden"
                      />
                    </label>

                    <label
                      className="w-full flex flex-col items-center py-[5px] h-[35px]  bg-white text-blue rounded-lg 
                                        tracking-wide bg-[#CCD9E6] cursor-pointer"
                    >
                      <span className="text-[13px] font-normal leading-normal">
                        Choose File
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        name="image"
                        id="image"
                        onChange={async (e) => {
                          const file = e.target.files[0];
                          const base64 = await convertToBase64(file);
                          PhotoFormik.setFieldValue("image", base64);
                        }}
                        value={PhotoFormik.image}
                        className="hidden"
                      />
                    </label>
                  </div>

                  <div className="mb-4 flex gap-2">
                    <label
                      className="w-[75px] justify-center flex flex-col items-center  h-[75px] bg-white text-blue rounded-lg 
                                        tracking-wide cursor-pointer border-2 border-black border-dashed"
                    >
                      <IoAddSharp className="text-2xl " />
                      <input
                        type="file"
                        accept="image/*"
                        name="image"
                        id="image"
                        onChange={async (e) => {
                          const file = e.target.files[0];

                          const base64 = await convertToBase64(file);
                          setSelectedImage(base64);
                          PhotoFormik.setFieldValue("image", base64);
                        }}
                        value={PhotoFormik.image}
                        className="hidden"
                      />
                    </label>

                    {PhotoFormik.values.image && (
                      <div className="h-[75px] w-[75px] rounded-md shadow-lg mb-4 group relative ">
                        <img
                          src={PhotoFormik.values.image}
                          className="w-full object-cover rounded-md object-center h-full"
                        />
                      </div>
                    )}
                  </div>

                  <textarea
                    rows="6"
                    placeholder="Enter details (Optional)"
                    name="detail"
                    id="detail"
                    onChange={PhotoFormik.handleChange}
                    value={PhotoFormik.values.detail}
                    className="w-full text-[16px]  font-normal py-[5px] px-[10px] h-[70px] rounded-[5px]
                                        bg-[#FFF] border-[#cfcfcf8f]  text-theme border-2 focus:border-theme focus:outline-none"
                  />
                </div>

                <div className="flex justify-center mt-4">
                  <div className="bg-[#4DE060] rounded-bl-[10px] w-[50%] flex justify-center">
                    <button
                      type="submit"
                      className=" py-4 w-[100%] text-[16px] font-normal mx-auto flex justify-center text-[#262626] 
                                            rounded-[10px] "
                    >
                      Add
                    </button>
                  </div>

                  <button
                    onClick={() => {
                      PhotoFormik.handleReset();
                      setShowPopup(true);
                    }}
                    type="reset"
                    className=" bg-[#CCD9E6] rounded-br-[10px] w-[50%]  flex justify-center"
                  >
                    <div
                      className="py-4 w-[100%] text-[16px] font-normal  mx-auto flex justify-center text-[#262626] 
                                            rounded-[10px] "
                    >
                      <span className="">Cancel</span>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddPhotoD;
