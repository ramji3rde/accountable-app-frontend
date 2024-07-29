import { useState } from "react";
import { useFormik, setFieldValue } from "formik";
import { IoAddSharp } from "react-icons/io5";
import toast from "react-hot-toast";
import { postTenantsAddPhotosAPI } from "../../../redux/APIS/API";
import { useDispatch, useSelector } from "react-redux";
import { getTenantDetail } from "../../../redux/action/tenants-detail";
import { useRouter } from "next/router";
import { BsUpload } from "react-icons/bs";

function AddPhoto(props) {
  const [showPopup, setShowPopup] = useState(true);
  const [selectedImage, setSelectedImage] = useState();
  const [count, setCount] = useState(1);

  const router = useRouter();

  const openPopup = () => {
    setShowPopup(false);
  };

  const closePopup = () => {
    setShowPopup(true);
  };

  const ProjectPhotoFormik = useFormik({
    initialValues: {
      Id: "",
      image: "",
      detail: "",
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        props.formik.setFieldValue("photos", [
          ...props.formik.values.photos,
          values,
        ]);

        setShowPopup(true);
        resetForm();
      } catch (error) {
        console.log(error);
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
      <div className="flex justify-start items-center mb-[10px]">
        <div
          onClick={openPopup}
          className="w-[100%] py-[12px] px-[14px] h-[45px]  items-center font-normal not-italic  mx-auto flex text-[16px] justify-center text-[#262626] bg-[#F2DA31] 
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
        {/* <div
                    className=" flex justify-center ">
                    <div
                        onClick={openPopup}
                        className={`' w-[100%] py-[12px] px-[14px] mx-auto  flex text-[16px] justify-center 
                         bg-yellow-400 rounded-[6px] font-sans  shadow-[0_0px_30px_0px_#00000033] '`}>
                        <BsUpload className="mt-1 mr-2" />
                        <span className="">Upload Documents</span>
                    </div>
                </div> */}
      </div>
      <div className={showPopup ? "hidden" : "block"}>
        <div className="h-screen transition-all bg-[#22222238] w-full fixed z-[100] top-0 left-0 overflow-hidden backdrop-blur-[1px]">
          <div className="">
            <div className="absolute w-[80%] top-[22%] left-[10%] mx-auto bg-white rounded-[10px]">
              <div className="text-black text-center px-4 pt-8">
                <div className="grid grid-cols-2 gap-x-[10px] mb-4">
                  <label
                    className="w-full flex flex-col items-center  py-[5px] h-[35px] px-[10px] text-blue rounded-lg 
                                        tracking-wide bg-[#CCD9E6] cursor-pointer"
                  >
                    <span className="mt-1 text-[12px] leading-normal">
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
                        setSelectedImage(base64);
                        ProjectPhotoFormik.setFieldValue("image", base64);
                        setCount(count + 1);
                        ProjectPhotoFormik.setFieldValue("Id", count);
                      }}
                      value={ProjectPhotoFormik.image}
                      className="hidden"
                    />
                  </label>

                  <label
                    className="w-full flex flex-col items-center py-[5px] h-[35px] text-blue rounded-lg 
                                        tracking-wide bg-[#CCD9E6] cursor-pointer"
                  >
                    <span className="mt-1 text-[12px] leading-normal">
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
                        setSelectedImage(base64);
                        ProjectPhotoFormik.setFieldValue("image", base64);
                        setCount(count + 1);
                        ProjectPhotoFormik.setFieldValue("Id", count);
                      }}
                      value={ProjectPhotoFormik.image}
                      className="hidden"
                    />
                  </label>
                </div>

                <div className="mb-2 flex gap-2">
                  <label
                    className="w-[75px] justify-center flex flex-col items-center py-[5px] h-[75px] bg-white text-blue 
                                    rounded-lg tracking-wide cursor-pointer border-[1px] border-black border-dashed"
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
                        ProjectPhotoFormik.setFieldValue("image", base64);
                        setCount(count + 1);
                        ProjectPhotoFormik.setFieldValue("Id", count);
                      }}
                      value={ProjectPhotoFormik.image}
                      className="hidden"
                    />
                  </label>

                  {ProjectPhotoFormik.values.image && (
                    <div className="h-[75px] w-[75px] rounded-md shadow-lg mb-4 group relative ">
                      <img
                        src={ProjectPhotoFormik.values.image}
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
                  onChange={ProjectPhotoFormik.handleChange}
                  value={ProjectPhotoFormik.values.detail}
                  className="w-full text-[16px]  font-normal py-[5px] px-[10px] h-[70px] rounded-[5px]
                                        bg-[#FFF] border-[#cfcfcf8f]  text-theme border-[1px] focus:border-theme focus:outline-none"
                />
              </div>

              <div className="flex justify-center mt-4">
                <div
                  onClick={() => ProjectPhotoFormik.handleSubmit()}
                  className="bg-[#4DE060] rounded-bl-[10px] w-[50%] flex justify-center"
                >
                  <button
                    type="button"
                    className=" py-4 w-[100%] mx-auto flex justify-center text-black 
                                            rounded-[10px] "
                  >
                    Add
                  </button>
                </div>

                <div
                  onClick={() => {
                    ProjectPhotoFormik.handleReset();
                    setShowPopup(true);
                  }}
                  className=" bg-[#9e9e9e4f] rounded-br-[10px] w-[50%]  flex justify-center"
                >
                  <div
                    className="py-4 w-[100%] mx-auto flex justify-center text-black 
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
