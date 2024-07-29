import { useFormik } from "formik";
import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Button from "../../components/public-com/form/button";
import Input from "../../components/public-com/form/Input";
import SubHeader from "../../components/public-com/header";
import { changePasswordAPI, updateEditProfileAPI } from "../../redux/APIS/API";

function EditProfile() {
  const router = useRouter();

  const dispatch = useDispatch();

  const validate = (values) => {
    const errors = {};

    if (!values.email) {
      errors.email = "Please enter email";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Invalid email address";
    }

    return errors;
  };

  const profiledata = useSelector((state) => state?.getProfile?.profile?.data);
  const EditProfile = profiledata[0];

  const ChangePasswordFormik = useFormik({
    initialValues: {
      fname: EditProfile?.first_name ? EditProfile?.first_name : "",
      lname: EditProfile?.last_name ? EditProfile?.last_name : "",
      property_name: EditProfile?.property_name
        ? EditProfile?.property_name
        : "",
      location: EditProfile?.location ? EditProfile?.location : "",
      email: EditProfile?.user_email ? EditProfile?.user_email : "",
    },
    validate,
    onSubmit: async (values) => {
      try {
        const respon = await updateEditProfileAPI(values);

        toast.success(respon.data.message);

      } catch (err) {
        console.log(err);
      }
    },
  });

  return (
    <div className="App">
      <SubHeader
        title={"Edit Profile"}
        className="text-[16px] font-normal font-sans"
        backUrl={"/profile/"}
      />

      <div className="grid w-full mb-[75px] px-4 py-4 ">
        <div className="grid w-full gap-[10px]">
          <Input
            label={"Frist Name"}
            name={"fname"}
            placeholder={"Enter Your Frist Name"}
            formik={ChangePasswordFormik}
          />

          <Input
            label={"Last Name"}
            name={"lname"}
            placeholder={"Enter Your Last Name"}
            formik={ChangePasswordFormik}
          />

          <Input
            label={"Property Name"}
            name={"property_name"}
            placeholder={"Enter Your Property Name"}
            formik={ChangePasswordFormik}
          />

          <Input
            label={"Location"}
            name={"location"}
            placeholder={"Enter Your Location"}
            formik={ChangePasswordFormik}
          />

          <Input
            label={"Email"}
            name={"email"}
            type={"email"}
            placeholder={"Enter Your Email"}
            formik={ChangePasswordFormik}
            validation={ChangePasswordFormik.errors.email}
          />

          <Input
            label={"Password"}
            name={"email"}
            placeholder={"**********"}
            disabled={true}
          />

          <div
            className="pb-10 pt-1"
            onClick={() => router.push("/profile/change_password")}
          >
            <h1 className="text-[14px] font-sans  font-[400]">
              Change Password
            </h1>
          </div>
        </div>

        <div className="w-[100%] text-center mx-auto gap-2 grid ">
          <Button
            lebal={"Update Profile"}
            OnClick={() => ChangePasswordFormik.handleSubmit()}
          />
        </div>
      </div>
      <div
        className="bg-[#CCD9E6] h-[70px] w-[100%] text-center pt-4 rounded-[6px] fixed bottom-0"
        onClick={() => router.push("/profile")}
      >
        <span className="text-[22px] font-normal font-sans ">Cancel</span>
      </div>
    </div>
  );
}

export default EditProfile;
