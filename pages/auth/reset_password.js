import { useEffect } from "react";
import { data } from "autoprefixer";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { postNewAPI } from "../../redux/APIS/API";
import toast from "react-hot-toast";
import Image from "next/image";
import logo from "../../public/smi-logo.png";
import { IoChevronForwardOutline } from "react-icons/io5";

function NewPassword() {
  const [showpassword, setShowpassword] = useState(false);
  const [showConformpass, setShowConformpass] = useState(false);

  const router = useRouter();

  const validate = (values) => {
    const errors = {};

    if (!values.password) {
      errors.password = "Please Enter Password";
    }

    if (!values.confirm) {
      errors.confirm = "Please Enter Confirm password";
    }

    if (values.password !== values.confirm) {
      errors.confirm = "password not match";
    }

    return errors;
  };

  const reset_token = router.query.reset_token;

  const Newfarmik = useFormik({
    initialValues: {
      password: "",
      confirm: "",
    },
    validate,
    onSubmit: async (values) => {
      try {
        let resdata = {
          password: values.password,
          reset_token: `${reset_token}`,
        };
        const respon = await postNewAPI(resdata);
        if (respon.data.success == false) {
          toast.error(respon.data.message);
          router.push("/auth/forget_password");
          resetForm();
        } else if (respon.data.success == true) {
          toast.success(respon.data.message);
          router.push("/");
        }
      } catch (error) {
        // console.log(error.response);
        router.push("");
        toast.error(error.response.data.message);
      }
    },
  });

  useEffect(() => {
    if (!router.isReady) return;

    if (reset_token) {
      // console.log("user found");
    } else {
      router.push("/auth/forget_password");
      toast.error("Invalid url");
      // console.log("user id not found");
    }
  }, [reset_token, router.isReady]);

  return (
    <div className="forget-page w-full h-screen min-h-screen overflow-x-hidden gradientLogin">
      <div className="w-[90%] sm:w-[50%] h-full min-h-screen mx-auto grid content-evenly">
        {/* <div className="grid grid-cols-1 mb-[30px] "> */}
        <div className="h-[50%] grid items-center ">
          <div className="logo-wrapper">
            <div className="smi-logo">
              <Image src={logo} />
            </div>
          </div>
          {/* </div> */}
        </div>

        <div className="h-[50%] grid items-end ">
          <div className="md:px-[50px] md:bg-white py-5 px-8 bg-[#ffffffbf] md:shadow-[0_0_8px_3px_#a0a0a11f] rounded-[7px]">
            <div className="mb-5 ">
              <h1 className="text-center font-[400] Oswald-font pb-2 text-[24px]">
                Create New Password
              </h1>
              <p className="font-[500] text-blackC text-[11px] leading-[15px]">
                Enter a different password from your previous one to reset it.
              </p>
            </div>
            <form method="POST" onSubmit={Newfarmik.handleSubmit} className="">
              <div className="grid grid-cols-1 gap-[20px]">
                <div className="grid grid-cols-1 relative">
                  <label className="font-medium text-[12px] mb-[3px] text-[#262626] ">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      name="password"
                      id="password"
                      type={showpassword ? "text" : "password"}
                      onChange={Newfarmik.handleChange}
                      value={Newfarmik.values.password}
                      placeholder="Enter Your Password"
                      className={` ${
                        Newfarmik.errors.password
                          ? "border-red-500 focus:border-red-500"
                          : "border-inputBorderColor focus:border-theme"
                      } 
                                 font-medium text-[12px] w-full h-[35px] py-[5px] px-[10px] rounded-[5px] bg-[#FFF]text-theme border-[1px]  focus:outline-none `}
                    />

                    <span
                      onClick={() => setShowpassword(!showpassword)}
                      title={showpassword ? "Show Password" : "Hide Password"}
                      className="font-mono cursor-pointer text-[1.2em] bg-white pl-2 
                                absolute right-3 bottom-2"
                    >
                      {showpassword ? <BsEye /> : <BsEyeSlash />}
                    </span>
                  </div>

                  {Newfarmik.errors.password && (
                    <span className="text-red-500">
                      {Newfarmik.errors.password}
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 relative">
                  <label className="font-medium text-[12px] mb-[3px] text-[#262626] ">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      name="confirm"
                      id="confirm"
                      type={showConformpass ? "text" : "password"}
                      placeholder="Enter Your Password"
                      onChange={Newfarmik.handleChange}
                      value={Newfarmik.values.confirm}
                      className={` ${
                        Newfarmik.errors.confirm
                          ? "border-red-500 focus:border-red-500"
                          : "border-inputBorderColor focus:border-theme"
                      } 
                                 font-medium text-[12px] w-full h-[35px] py-[5px] px-[10px] rounded-[5px] bg-[#FFF]text-theme border-[1px]  focus:outline-none `}
                    />
                    <span
                      onClick={() => setShowConformpass(!showConformpass)}
                      title={
                        showConformpass ? "Show Password" : "Hide Password"
                      }
                      className="font-mono cursor-pointer text-[1.2em] bg-white pl-2 
                                    absolute right-3 bottom-2"
                    >
                      {showConformpass ? <BsEye /> : <BsEyeSlash />}
                    </span>
                  </div>
                  {Newfarmik.errors.confirm && (
                    <span className="text-red-500">
                      {Newfarmik.errors.confirm}
                    </span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 w-full justify-items-start">
                <div className="grid grid-cols-1 w-full justify-items-center bg-buttonColor rounded-[5px] mt-5 mb-2 h-[40px] ">
                  <button
                    type="submit"
                    className="font-medium text-blackC w-full h-[40px]"
                  >
                    Submit
                  </button>
                </div>

                <div className="flex flex-row sm:flex-row items-center justify-center sm:justify-between">
                  <Link href="/">
                    <a className="font-medium flex flex-row items-center gap-[2px] text-blackC text-[14px] tracking-[.025em]">
                      Sign in to Account <IoChevronForwardOutline />
                    </a>
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewPassword;
