import React, { useState } from "react";
import { useFormik } from "formik";
import Input from "../../../components/public-com/form/Input";
import Button from "../../../components/public-com/form/button";
import { useRouter } from "next/router";

function ForgotMasterPassword() {
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const validate = (values) => {
    const errors = {};

    if (!values.master_username) {
      errors.master_username = "Please Enter master_username";
    }

    if (!values.master_password) {
      errors.master_password = "Please Enter master_password";
    }

    return errors;
  };

  const SecureMasterPasswordFormik = useFormik({
    initialValues: {
      master_username: "",
      master_password: "",
    },
    validate,
    onSubmit: async (value) => {
      try {
        // setSubmitLoader(true)
        console.log(value);
        router.push("/security_info/secure_notes");
        // setSubmitLoader(false)
      } catch (err) {
        console.log(err, "err");
      }
    },
  });

  return (
    <div>
      <div className="px-4 pb-32 pt-3 ">
        <div className="mb-3 ">
          <h1 className="text-center font-[400] Oswald-font text-[24px]">
            Forgot Password
          </h1>
          <p className="font-[500] text-blackC text-[15px] px-5 py-1 ">{`Enter your email and we'll send you a\nlink to reset your password.`}</p>
        </div>

        <div className="grid gap-4">
          <div className="grid gap-4">
            <Input
              label={"Enter your admin email"}
              name="master_username"
              placeholder={"Email"}
              formik={SecureMasterPasswordFormik}
              validation={SecureMasterPasswordFormik.errors.master_username}
            />

            <Input
              label={"Enter your admin password"}
              name="master_password"
              placeholder={"Password"}
              type={"password"}
              formik={SecureMasterPasswordFormik}
              // Onchange={(e) => checkPasswordStrength(e.target.password)}
              eyeToggle={() => setShowPassword(!showPassword)}
              toggleValue={showPassword}
              validation={SecureMasterPasswordFormik.errors.master_password}
            />
          </div>

          <div className="w-full py-5">
            <Button
              Type={"submit"}
              OnClick={() => SecureMasterPasswordFormik.handleSubmit()}
              bgcolor={"bg-buttonColor drop-shadow-2xl"}
              lebal={"Send Email Link"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotMasterPassword;
