import React, { useState } from "react";
import { useFormik } from "formik";
import { useEffect } from "react";
import PhoneInput from "../../public-com/form/phoneInput";

const AddContacts = (props) => {
  const [showForm, setShowForm] = useState(false);

  const validate = (values) => {
    const errors = {};

    if (!values.email) {
      errors.email = "Please Enter Contact Email";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Invalid Contact Email ";
    }


    return errors;
  };

  const ContactFormik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      title: "",
      primary_phone: "",
      primary_phone_type: "",
      secondary_phone: "",
      secondary_phone_type: "",
      email: "",
    },
    validate,
    onSubmit: async (values, { resetForm }) => {
      try {
        props.formik.setFieldValue("contacts", [
          ...props.formik.values.contacts,
          values,
        ]);

        resetForm();

        setShowForm(false);
      } catch (error) {
        console.log(error);
      }
    },
  });

  useEffect(() => {
    return () => {
      ContactFormik.resetForm();
    };
  }, []);

  return (
    <div>
      <div className="flex justify-end items-center mb-[10px]">
        <div className="w-[50%] flex justify-end ">
          <div
            onClick={() => setShowForm(true)}
            className="w-[100%] py-[12px] px-[14px] h-[45px] flex text-[16px] font-normal justify-center text-[#262626] bg-[#F2DA31] 
                  rounded-[6px] hover:bg-[#F2DA31] hover:text-white shadow-[0_0px_30px_0px_#00000033]"
          >
            <span className="flex gap-2">
              <img
                src={"/bottom-icon/plus-icon.svg"}
                alt="plus-icon-active"
                className="h-[14.44px] w-[14.44px] mt-1"
              />
              Add Contact
            </span>
          </div>
        </div>
        <div className={showForm ? "block" : "hidden"}>
          <div className="transition-all bg-[#22222238] w-full fixed z-[100] top-0 left-0 backdrop-blur-[1px] h-[100%] overflow-y-scroll  ">
            <div className="bg-black">
              <div className="absolute w-[90%] top-[7%] left-[5%] mx-auto ">
                {/* <div className=""> */}
                <div className="grid grid-cols-1 px-4 pb-4 w-full bg-white  rounded-t-[10px]">
                  <div className="grid sm:grid-cols-2 grid-cols-1 pt-2 sm:gap-[20px] gap-[10px] sm:my-[10px]">
                    <div>
                      <div className="pt-1">
                        <span className="text-[20px] font-normal text-[#262626] Oswald-font">
                          Contact Info
                        </span>
                        <hr className="my-1 border-[1px] border-solid border-[#DEDEDE]" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-2">
                      <div className="">
                        <label className="text-[12px] text-[#262626] leading-5 font-normal ">
                          First Name
                        </label>
                        <input
                          name="first_name"
                          id="first_name"
                          placeholder="First Name"
                          onChange={ContactFormik.handleChange}
                          value={ContactFormik.values.first_name}
                          className="font-normal w-full text-[16px] h-[35px]  rounded-[6px]
                                       bg-[#FFF]  text-[#000] py-[9px] px-[5px] border-[0.5px] border-solid border-[#A6A6A6]  focus:border-theme focus:outline-none"
                        />
                        {/* {TanantsFramik.errors.primary_fname && (
                                       <span className="text-red-500 text-[12px]">
                                          {TanantsFramik.errors.primary_fname}
                                       </span>
                                    )} */}
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
                          className="font-medium  w-full text-[16px] h-[35px]  rounded-[6px]
                                       bg-[#FFF] py-[9px] px-[5px] border-[0.5px] border-solid border-[#A6A6A6]  text-[#000]  focus:border-theme focus:outline-none"
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
                          placeholder="Title / Position"
                          onChange={ContactFormik.handleChange}
                          value={ContactFormik.values.title}
                          className="font-medium w-full text-[16px] h-[35px] rounded-[6px]
                                       bg-[#FFF] py-[9px] px-[5px] border-[0.5px] border-solid border-[#A6A6A6]  text-[#000] focus:border-theme focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <div className="w-[65%]">
                        <label className="text-[12px] text-[#262626] leading-5 font-normal">
                          Primary Phone
                        </label>
                        <PhoneInput
                          name={"primary_phone"}
                          placeholder={"Primary Phone"}
                          formik={ContactFormik}
                        />
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
                                                bg-[#FFF] border-[0.5px] border-solid border-[#A6A6A6] text-theme  focus:border-theme focus:outline-none"
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
                                                bg-[#FFF]   text-theme  border-[0.5px] border-solid border-[#A6A6A6] focus:border-theme focus:outline-none"
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
                          className={`
                            ${ ContactFormik.errors.email ? "border-red-500" : "border-[#A6A6A6]" }
                            "font-medium w-full text-[16px] h-[35px]  rounded-[6px] bg-[#FFF] focus:outline-none   text-[#000] py-[9px] px-[5px] border-[0.5px] border-solid  "
                          `}
                        />

                        {ContactFormik.errors.email && (
                                       <span className="text-red-500 text-[12px]">
                                          {ContactFormik.errors.email}
                                       </span>
                                    )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex w-full ">
                  <div
                    onClick={() => ContactFormik.handleSubmit()}
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
                      setShowForm(false);
                    }}
                    className=" bg-[#CCD9E6] rounded-br-[10px] w-[50%] mb-[50px] flex justify-center"
                  >
                    <div className="py-4 w-[100%] font-normal text-[16px] mx-auto flex justify-center text-black rounded-[10px]">
                      <span className="">Cancel</span>
                    </div>
                  </div>
                </div>
              </div>
              {/* </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddContacts;
