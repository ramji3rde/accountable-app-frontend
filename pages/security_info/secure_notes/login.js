import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import Input from "../../../components/public-com/form/Input";
import Button from "../../../components/public-com/form/button";
import { useRouter } from "next/router";
import { reactLocalStorage } from "reactjs-localstorage";
import { loginMasterAPI } from "../../../redux/APIS/API";
import { toast } from "react-hot-toast";

function LoginMasterPassword() {
  const [showPassword, setShowPassword] = useState(false);

  const [showhint, setShowhint] = useState(false);

  const [showhintPassword, setShowhintPassword] = useState(false);

  const masterUser = reactLocalStorage.get("masterUser");

  const masterPasswordHint = reactLocalStorage.get("masterPasswordHint");

  useEffect(() => {
    if (masterUser) {
      router.push("/security_info/secure_notes");
    }
  }, [masterUser]);

  const router = useRouter();

  const validate = (values) => {
    const errors = {};

    if (!values.master_password) {
      errors.master_password = "Please Enter master_password";
    }

    return errors;
  };

  const SecureMasterPasswordFormik = useFormik({
    initialValues: {
      master_password: "",
    },
    validate,
    onSubmit: async (value) => {
      try {
        // setSubmitLoader(true)
        // console.log(value)

        const res = await loginMasterAPI(value);

        // reactLocalStorage.set('masterPassword', value?.master_password)

        console.log(res.data.data);

        if (res.data.success) {
          reactLocalStorage.set("masterUser", true);
          reactLocalStorage.set("masterPassword", res?.data?.data[0]);
          toast.success("Login Successfully");
          router.push("/security_info/secure_notes");
        } else {
          toast.error("Login Not Successfully Try Again Later");
        }

        // router.push('/security_info/secure_notes')
        // setSubmitLoader(false)
      } catch (err) {
        console.log(err, "err");
      }
    },
  });

  function ShowhintPassword() {
    setShowhint(!showhint);
    setShowhintPassword(masterPasswordHint);
  }

  return (
    <div>
      <div className="px-4 pb-32 pt-4 ">
        <div className="mb-3 ">
          <h1 className="text-center font-[400] Oswald-font text-[22px]">
            Enter Your Master Password
          </h1>
        </div>

        <div className="grid gap-4">
          <div>
            <Input
              label={"Master Password"}
              name="master_password"
              placeholder={"Enter master password"}
              type={"password"}
              Required={true}
              formik={SecureMasterPasswordFormik}
              // Onchange={(e) => checkPasswordStrength(e.target.password)}
              eyeToggle={() => setShowPassword(!showPassword)}
              toggleValue={showPassword}
              validation={SecureMasterPasswordFormik.errors.master_password}
            />
          </div>

          <div className="w-full ">
            <div
              className="flex flex-col justify-between mb-3 "
              onClick={() =>
                router.push("/security_info/secure_notes?forgot=true")
              }
            >
              <span className="font-medium text-theme text-[15px]">
                Forgot password ?
              </span>
            </div>

            <Button
              Type={"submit"}
              OnClick={() => SecureMasterPasswordFormik.handleSubmit()}
              bgcolor={"bg-buttonColor drop-shadow-2xl"}
              lebal={"Sign in"}
            />

            <div className="flex flex-col justify-between mt-4 ">
              <div onClick={() => ShowhintPassword()}>
                <span className="font-medium text-theme text-[15px]">
                  {showhint ? "Hide password hint" : "Show password hint"}
                </span>
              </div>
              {showhint && (
                <span className="font-medium text-theme mt-2 text-[20px]">
                  {showhintPassword}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginMasterPassword;
