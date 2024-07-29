import { useState } from "react";
import { useFormik } from "formik";
import { updateContactsAPI } from "../../../redux/APIS/API";
import { useDispatch } from "react-redux";
import { getTenantDetail } from "../../../redux/action/tenants-detail";
import toast from "react-hot-toast";
import { getContractorsDetail } from "../../../redux/action/contractors-detail";
import PhoneInput from "../../public-com/form/phoneInput";

const EditContactPopup = ({
  index,
  detail,
  datashow,
  onClick,
  formik,
  editId,
  clientName,
}) => {

  const dispatch = useDispatch();

  const ContactFormik = useFormik({
    initialValues: {
      first_name: detail?.first_name ? detail?.first_name : "",
      last_name: detail?.last_name ? detail?.last_name : "",
      title: detail?.title ? detail?.title : "",
      primary_phone: detail?.primary_phone ? detail?.primary_phone : "",
      primary_phone_type: detail?.primary_phone_type
        ? detail?.primary_phone_type
        : "",
      secondary_phone: detail?.secondary_phone ? detail?.secondary_phone : "",
      secondary_phone_type: detail?.secondary_phone_type
        ? detail?.secondary_phone_type
        : "",
      email: detail?.email ? detail?.email : "",
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        if (detail.contact_id) {
          let Contactdata = {
            contacts: [
              {
                contact_id: detail.contact_id,
                first_name: values.first_name,
                last_name: values.last_name,
                title: values.title,
                primary_phone: values.primary_phone,
                primary_phone_type: values.primary_phone_type,
                secondary_phone: values.secondary_phone,
                secondary_phone_type: values.secondary_phone_type,
                email: values.email,
              },
            ],
          };

          if (clientName === "contactors") {
            const respon = await updateContactsAPI(Contactdata);

            toast.success(respon.data.message);

            dispatch(getContractorsDetail(editId));
          }

          // tanants functions
          if (clientName === "tanants") {
            const respon = await updateContactsAPI(Contactdata);

            toast.success(respon.data.message);

            dispatch(getTenantDetail(editId));
          }
        } else {
          const oldData = formik.values.contacts;

          oldData[index] = values;

          formik.setFieldValue("contacts", [...oldData]);

          resetForm();
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <div className={datashow}>
      <div
        style={{ transition: ".5s" }}
        className=" h-screen bg-[#22222238] w-full fixed z-[100] top-0 left-0 overflow-hidden"
      >
        <div className=" transition-all bg-[#22222238] w-full fixed z-[100] top-0 left-0 overflow-hidden backdrop-blur-[1px] h-[100%] overflow-y-scroll ">
          {/* <div className=""> */}
          <div className="absolute w-[90%] top-[7%] left-[5%] mx-auto ">
            <div className="grid grid-cols-1 px-4 pb-4 w-full bg-white  rounded-t-[10px] ">
              <div className="grid sm:grid-cols-2 grid-cols-1 pt-2 sm:gap-[20px] gap-[10px] sm:my-[10px]">
                <div>
                  <div className="pt-1">
                    <span className="text-[20px] font-normal text-[#262626] Oswald-font">
                      Contact Info
                    </span>
                    <hr className="my-1 border-t-2" />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-2">
                  <div className="">
                    <label className="text-[12px] text-[#262626] leading-5 font-normal">
                      First Name
                    </label>
                    <input
                      name="first_name"
                      id="first_name"
                      placeholder="First Name"
                      onChange={ContactFormik.handleChange}
                      value={ContactFormik.values.first_name}
                      className="font-normal w-full text-[16px] h-[35px] rounded-[6px]
                                 bg-[#FFF] py-[9px] px-[5px] border-[0.5px] border-solid border-[#A6A6A6] text-[#000]  focus:border-theme focus:outline-none"
                    />
                  </div>

                  <div className="">
                    <label className="text-[12px] text-[#262626] leading-5 font-normal">
                      Last Name
                    </label>
                    <input
                      name="last_name"
                      id="last_name"
                      placeholder="Last Name"
                      onChange={ContactFormik.handleChange}
                      value={ContactFormik.values.last_name}
                      className="font-medium  w-full text-[16px] h-[35px] py-[9px] px-[5px] border-[0.5px] border-solid border-[#A6A6A6] rounded-[6px]
                                 bg-[#FFF]  text-[#000]  focus:border-theme focus:outline-none"
                    />
                    {/* {TanantsFramik.errors.primary_lname && (
                                       <span className="text-red-500 text-[12px]">
                                          {TanantsFramik.errors.primary_lname}
                                       </span>
                                    )} */}
                  </div>
                </div>

                <div className="flex gap-2">
                  <div className="w-[100%]">
                    <label className="text-[12px] text-[#262626] leading-5 font-normal">
                      Title / Position
                    </label>
                    <input
                      name="title"
                      id="title"
                      placeholder="  Title / Position"
                      onChange={ContactFormik.handleChange}
                      value={ContactFormik.values.title}
                      className="font-medium w-full text-[16px] h-[35px] py-[9px] px-[5px] border-[0.5px] border-solid border-[#A6A6A6] rounded-[6px]
                                       bg-[#FFF]   text-[#000]  focus:border-theme focus:outline-none"
                    />
                  </div>
                </div>

                {/* {TanantsFramik.errors.primary_title && (
                                 <span className="text-red-500 text-[12px]">
                                    {TanantsFramik.errors.primary_title}
                                 </span>
                              )} */}

                <div className="flex gap-2">
                  <div className="w-[65%]">
                    <label className="text-[12px] text-[#262626] leading-5 font-normal">
                      Primary Phone
                    </label>
                    {/* <input
                                 name="primary_phone"
                                 id="primary_phone"
                                 placeholder="Primary Phone"
                                 type="number"
                                 onChange={ContactFormik.handleChange}
                                 value={ContactFormik.values.primary_phone}
                                 className="font-medium w-full text-[16px] h-[35px] py-[10px] px-[5px] rounded-[6px]
                                 bg-[#FFF] border-[#A6A6A6]  text-[#000] border-2 focus:border-theme focus:outline-none"
                              /> */}

                    <PhoneInput
                      name={"primary_phone"}
                      placeholder={"Primary Phone"}
                      formik={ContactFormik}
                    />

                    {/* {TanantsFramik.errors.primary_phone && (
                                       <span className="text-red-500 text-[12px]">
                                          {TanantsFramik.errors.primary_phone}
                                       </span>
                                    )} */}
                  </div>

                  <div className="w-[35%] mt-1">
                    <label className="text-[12px] text-[#262626] leading-5 font-normal">
                      Phone Type
                    </label>
                    <select
                      name="primary_phone_type"
                      onChange={ContactFormik.handleChange}
                      value={ContactFormik.values.primary_phone_type}
                      className="font-medium w-full text-[16px] h-[35px] py-[5px] px-[5px] rounded-[6px]
                                 bg-[#FFF]  text-theme  border-[0.5px] border-solid border-[#A6A6A6] focus:border-theme focus:outline-none"
                    >
                      <option value="Mobile">Mobile</option>
                      <option value="Work">Work</option>
                      <option value="Office">Office</option>
                      <option value="Work fax">Work fax</option>
                      <option value="Other">Other</option>
                      <option value="custom">Custom</option>
                    </select>
                  </div>
                </div>

                <div className="flex gap-2">
                  <div className="w-[65%]">
                    <label className="text-[12px] text-[#262626] leading-5 font-normal">
                      Secondary Phone
                    </label>
                    {/* <input
                                 name="secondary_phone"
                                 id="secondary_phone"
                                 placeholder="Secondary Phone"
                                 type="number"
                                 onChange={ContactFormik.handleChange}
                                 value={
                                    ContactFormik.values.secondary_phone
                                 }
                                 className="font-medium w-full text-[16px] h-[35px] py-[10px] px-[5px] rounded-[6px]
                                 bg-[#FFF] border-[#A6A6A6]  text-[#000] border-2 focus:border-theme focus:outline-none"
                              /> */}

                    <PhoneInput
                      name={"secondary_phone"}
                      placeholder={"Secondary phone"}
                      formik={ContactFormik}
                    />
                    {/* {TanantsFramik.errors.primary_second_phone && (
                                       <span className="text-red-500 text-[12px]">
                                          {TanantsFramik.errors.primary_second_phone}
                                       </span>
                                    )} */}
                  </div>

                  <div className="w-[35%] mt-1">
                    <label className="text-[12px] text-[#262626] leading-5 font-normal">
                      Phone Type
                    </label>
                    <select
                      name="secondary_phone_type"
                      onChange={ContactFormik.handleChange}
                      value={ContactFormik.values.secondary_phone_type}
                      className="font-medium w-full text-[16px] h-[35px] py-[5px] px-[5px] rounded-[6px]
                                 bg-[#FFF]   text-theme border-[0.5px] border-solid border-[#A6A6A6] focus:border-theme focus:outline-none"
                    >
                      <option value="Mobile">Mobile</option>
                      <option value="Work">Work</option>
                      <option value="Office">Office</option>
                      <option value="Work fax">Work fax</option>
                      <option value="Other">Other</option>
                      <option value="custom">Custom</option>
                    </select>
                  </div>
                </div>

                <div className="flex gap-2">
                  <div className="w-[100%]">
                    <label className="text-[12px] text-[#262626] leading-5 font-normal">
                      Email
                    </label>
                    <input
                      name="email"
                      id="email"
                      placeholder="Email"
                      onChange={ContactFormik.handleChange}
                      value={ContactFormik.values.email}
                      className={
                        "font-medium w-full text-[16px] h-[35px] py-[9px] px-[5px] border-[0.5px] border-solid  rounded-[6px] bg-[#FFF] border-[#A6A6A6]  text-[#000] focus:border-theme focus:outline-none"
                      }
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex w-full ">
              <div
                onClick={() => {
                  ContactFormik.handleSubmit();
                  onClick();
                }}
                className="bg-[#4DE060] rounded-bl-[10px] font-normal  w-[50%] mb-[50px] flex justify-center"
              >
                <button
                  type="button"
                  className="font-normal text-[16px] py-4 mx-auto w-full flex justify-center text-black 
                           rounded-[10px] "
                >
                  Add
                </button>
              </div>

              <div
                onClick={() => {
                  ContactFormik.handleReset();
                  onClick();
                }}
                className=" bg-[#CCD9E6] rounded-br-[10px] w-[50%] mb-[50px] flex justify-center"
              >
                <div className="py-4 w-[100%] font-normal text-[16px] mx-auto flex justify-center text-black rounded-[10px]">
                  <span className="">Cancel</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default EditContactPopup;
