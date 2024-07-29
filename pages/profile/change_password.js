import { useFormik } from "formik";
import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import Button from "../../components/public-com/form/button";
import Input from "../../components/public-com/form/Input";
import SubHeader from "../../components/public-com/header";
import { changePasswordAPI } from "../../redux/APIS/API";

function ChangePassword() {
  const [showpassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);

  const router = useRouter();

  const validate = (values) => {
    const errors = {};

    if (!values.password) {
      errors.password = "Please enter Password";
    }

    if (!values.re_password) {
      errors.re_password = "Please enter Re Enter Password";
    }

    if (values.password !== values.re_password) {
      errors.re_password = "password not match";
    }

    return errors;
  };

  const ChangePasswordFormik = useFormik({
    initialValues: {
      password: "",
      re_password: "",
    },
    validate,
    onSubmit: async (values) => {
      try {
        let data = { password: values.password };

        const respon = await changePasswordAPI(data);

        toast.success(respon.data.message);

        router.push("/profile");
      } catch (err) {
        console.log(err);
      }
    },
  });

  return (
    <div className="App">
      {/* <header className='z-50 bg-[#fff] pt-2 shadow-[1px_5px_13px_2px_#0000000d] overflow-scroll'> */}
      <SubHeader title={"Change Password"} backUrl={"/profile/"} />
      {/* </header> */}

      <div className="grid w-full py-4 px-4  mb-[75px] ">
        <p className="text-[16px] font-normal text-center px-[05px] pt-3 font-sans">{`Type your new password then tap "Change Password" To change password`}</p>

        <div className="grid w-full gap-[12px] mt-8 mb-10">
          <Input
            label={"New Password"}
            name={"password"}
            placeholder={"Enter Your Password"}
            type={"password"}
            formik={ChangePasswordFormik}
            eyeToggle={() => setShowPassword(!showpassword)}
            toggleValue={showpassword}
            validation={ChangePasswordFormik.errors.password}
          />

          <Input
            label={"Re Enter Password"}
            name={"re_password"}
            placeholder={"Enter Your Re Enter Password"}
            type={"password"}
            formik={ChangePasswordFormik}
            eyeToggle={() => setShowRePassword(!showRePassword)}
            toggleValue={showRePassword}
            validation={ChangePasswordFormik.errors.re_password}
          />
        </div>

        <div className="w-[100%] text-center mx-auto gap-2 grid ">
          <Button
            lebal={"Change Password"}
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

export default ChangePassword;
