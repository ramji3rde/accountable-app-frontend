import { useState } from "react";
import { useFormik } from "formik";
import { IoAddSharp } from "react-icons/io5";
import toast from "react-hot-toast";
import { postTenantsAddPhotosAPI } from "../../../redux/APIS/API";
import { useDispatch, useSelector } from "react-redux";
import { getTenantDetail } from "../../../redux/action/tenants-detail";
import { useRouter } from "next/router";
import { IoTrashOutline } from "react-icons/io5";

function AddPhoto(props) {
  const [showPopup, setShowPopup] = useState(true);
  const [selectedImage, setSelectedImage] = useState([]);

  const router = useRouter();

  const open = () => {
    setShowPopup(false);
  };

  const close = () => {
    setShowPopup(true);
  };

  const PhotoFormik = useFormik({
    initialValues: {
      image: [],
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

  const multipleSelctor = (e) => {
    console.log(e.target.files, "photos file");
  };

  return (
    <div>
      <div className="flex justify-end items-center mb-[10px]">
        <div className="w-[50%] flex justify-center ">
          <div
            onClick={open}
            className="w-[100%] h-[45px] py-[12px] px-[14px] mx-auto flex text-[16px]  font-normal justify-center  text-[#262626] bg-[#F2DA31]  
                                    rounded-[6px] hover:bg-[#F2DA31] hover:text-white  shadow-[0_0px_30px_0px_#00000033] gap-[2px]  "
          >
            <span className="flex gap-2">
              <img
                src={"/bottom-icon/plus-icon.svg"}
                alt="plus-icon-active"
                className="h-[14.44px] w-[14.44px] mt-1"
              />
              Add files
            </span>
          </div>
        </div>
      </div>
      <div className={showPopup ? "hidden" : "block"}>
        <div className="h-screen transition-all bg-[#22222238] w-full fixed z-[100] top-0 left-0 overflow-hidden backdrop-blur-[1px]">
          {/* <form method='POST' onSubmit={PhotoFormik.handleSubmit}> */}

          <div className="">
            <div className="absolute w-[80%] top-[22%] left-[10%] mx-auto bg-white rounded-[10px]">
              <div className="text-black text-center px-4 pt-8">
                <div className="grid grid-cols-2 gap-x-[10px] mb-4">
                  <label
                    className="w-full flex flex-col items-center  py-[5px] h-[35px] px-[10px]  text-blue rounded-lg 
                                        tracking-wide bg-[#CCD9E6] cursor-pointer"
                  >
                    <span className=" text-[16px] font-normal leading-normal">
                      Take Photoss
                    </span>
                    <input
                      type="file"
                      capture="environment"
                      accept="image/*"
                      name="image"
                      id="image"
                      multiple
                      onChange={async (e) => {

                        multipleSelctor(e);
                      }}
                      value={PhotoFormik.image}
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
                      value={PhotoFormik?.image}
                      className="hidden"
                    />
                  </label>

                  {PhotoFormik.values.image &&
                    PhotoFormik.values.image.map((item, index) => (
                      <div
                        key={index}
                        className="h-[75px] w-[75px] rounded-md shadow-lg mb-4 group relative "
                      >
                        <img
                          src={item}
                          className="w-full object-cover rounded-md object-center h-full"
                        />
                      </div>
                    ))}
                </div>

                <textarea
                  rows="6"
                  placeholder="Enter details (Optional)"
                  name="detail"
                  id="detail"
                  onChange={PhotoFormik.handleChange}
                  value={PhotoFormik?.values?.detail}
                  className=" w-full text-[16px]  font-normal py-[5px] px-[10px] h-[70px] rounded-[5px]
                                      bg-[#FFF] border-[#cfcfcf8f]  text-theme border-2 focus:border-theme focus:outline-none"
                />
              </div>

              <div className="flex justify-center mt-4">
                <div
                  onClick={() => PhotoFormik?.handleSubmit()}
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

                <div
                  onClick={() => {
                    PhotoFormik?.handleReset();
                    setShowPopup(true);
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
