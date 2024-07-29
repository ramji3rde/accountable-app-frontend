import Link from "next/link";
import { useFormik } from "formik";
import { postRegistationAPI } from "../../redux/APIS/API";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { useState } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import Image from "next/image";
import logo from "../../public/smi-logo.png";
import { IoChevronForwardOutline } from "react-icons/io5";

function Register() {
  const router = useRouter();
  const [showpassword, setShowpassword] = useState(false);
  const [showRepassword, setShowRepassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = (values) => {
    const errors = {};

    if (!values.fname) {
      errors.fname = "Please enter first name";
    }

    if (!values.lname) {
      errors.lname = "Please enter last name";
    }

    if (!values.property_name) {
      errors.property_name = "Please enter property name";
    }

    if (!values.email) {
      errors.email = "Please enter email";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Invalid email address";
    }

    if (!values.password) {
      errors.password = "Please enter password";
    }

    if (!values.re_password) {
      errors.re_password = "Please Re-Enter your password";
    }

    if (values.password !== values.re_password) {
      errors.re_password = "password not match";
    }

    return errors;
  };

  const RegiFarmik = useFormik({
    initialValues: {
      fname: "",
      lname: "",
      property_name: "",
      email: "",
      password: "",
      re_password: "",
    },
    validate,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        let data = {
          fname: values.fname,
          lname: values.lname,
          property_name: values.property_name,
          email: values.email,
          password: values.password,
          user_type: "vendor",
        };

        const respon = await postRegistationAPI(data);

        const ResponStatus = respon?.data?.success

        if (!ResponStatus) {

          toast.error(respon.data.message);

        } else {

          // console.log(respon.data.success, 'respon987')
          toast.success(respon.data.message);
          router.push("/");

        }

        setLoading(false);

      } catch (error) {
        toast.error(error.response.data.message);
      }
    },
  });

  return (
    <div className="register-page  h-full  min-h-screen sm:h-screen gradientLogin ">
      <div className="w-[90%] sm:w-[50%] h-full min-h-screen mx-auto grid content-evenly">
        <div className="h-[40%]  grid items-center py-10 ">
          <div className="grid grid-cols-1 ">
            <div className="logo-wrapper">
              <div className="smi-logo">
                <Image src={logo} />
              </div>
            </div>
          </div>
        </div>

        <div className="h-[60%] grid items-end pb-12">
          <div className="sm:px-[50px] px-[30px] py-[30px] rounded-[18px] sm:py-[30px] sm:shadow-[0_0_8px_3px_#a0a0a11f] bg-[#ffffffbf] ">
            <div className="mb-5 ">
              <h1 className="text-center font-[400] Oswald-font pb-2 text-[24px]">
                Join Accountable: Property Management!
              </h1>
              <p className="font-[500] text-blackC text-[11px] leading-[15px]">
                Sign up today to save time and money while managing your
                properties!
              </p>
            </div>

            <form method="POST" onSubmit={RegiFarmik.handleSubmit} className="">
              <div className="grid sm:grid-cols-2 grid-cols-2 sm:gap-[20px] gap-[15px] sm:my-[10px]">
                <div className="grid grid-cols-1">
                  <label className="font-medium text-[12px] mb-[3px] text-[#262626] ">
                    First Name
                  </label>
                  <input
                    name="fname"
                    id="fname"
                    placeholder="First Name"
                    onChange={RegiFarmik.handleChange}
                    value={RegiFarmik.values.fname}
                    className={` ${RegiFarmik.errors.fname
                      ? "border-red-500 focus:border-red-500"
                      : "border-inputBorderColor focus:border-theme"
                      } 
                              font-medium text-[12px] w-full h-[35px] py-[5px] px-[10px] rounded-[5px] bg-[#FFF]text-theme border-[1px]  focus:outline-none `}
                  />
                  {RegiFarmik.errors.fname && (
                    <span className="text-red-500 font-medium text-[10px]">
                      {RegiFarmik.errors.fname}
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1">
                  <label className="font-medium text-[12px] mb-[3px] text-[#262626] ">
                    Last Name
                  </label>
                  <input
                    name="lname"
                    id="lname"
                    placeholder="Last Name"
                    onChange={RegiFarmik.handleChange}
                    value={RegiFarmik.values.lname}
                    className={` ${RegiFarmik.errors.lname
                      ? "border-red-500 focus:border-red-500"
                      : "border-inputBorderColor focus:border-theme"
                      } 
                              font-medium text-[12px] w-full h-[35px] py-[5px] px-[10px] rounded-[5px] bg-[#FFF]text-theme border-[1px]  focus:outline-none `}
                  />

                  {RegiFarmik.errors.lname && (
                    <span className="text-red-500 font-medium text-[10px]">
                      {RegiFarmik.errors.lname}
                    </span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:gap-[20px] gap-[10px] my-[10px]">
                <div className="grid grid-cols-1">
                  <label className="font-medium text-[12px] mb-[3px] text-[#262626] ">
                    Enter Property Name
                  </label>
                  <input
                    name="property_name"
                    id="property_name"
                    placeholder="Enter Your Property Name"
                    type="text"
                    onChange={RegiFarmik.handleChange}
                    value={RegiFarmik.values.property_name}
                    className={` ${RegiFarmik.errors.property_name
                      ? "border-red-500 focus:border-red-500"
                      : "border-inputBorderColor focus:border-theme"
                      } 
                              font-medium text-[12px] w-full h-[35px] py-[5px] px-[10px] rounded-[5px] bg-[#FFF] text-theme border-[1px]  focus:outline-none `}
                  />
                  {RegiFarmik.errors.property_name && (
                    <span className="text-red-500 font-medium text-[10px]">
                      {RegiFarmik.errors.property_name}
                    </span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:gap-[20px] gap-[10px] my-[10px]">
                <div className="grid grid-cols-1">
                  <label className="font-medium text-[12px] mb-[3px] text-[#262626] ">
                    Enter Your Email
                  </label>
                  <input
                    name="email"
                    id="email"
                    placeholder="Example@gmail.com"
                    type="email"
                    onChange={RegiFarmik.handleChange}
                    value={RegiFarmik.values.email}
                    className={` ${RegiFarmik.errors.email
                      ? "border-red-500 focus:border-red-500"
                      : "border-inputBorderColor focus:border-theme"
                      } 
                              font-medium text-[12px] w-full h-[35px] py-[5px] px-[10px] rounded-[5px] bg-[#FFF]text-theme border-[1px]  focus:outline-none `}
                  />
                  {RegiFarmik.errors.email && (
                    <span className="text-red-500 font-medium text-[10px]">
                      {RegiFarmik.errors.email}
                    </span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 relative">
                <label className="font-medium text-[12px] mb-[3px] text-[#262626] ">
                  Password
                </label>
                <div className="relative">
                  <input
                    name="password"
                    id="password"
                    type={showpassword ? "text" : "password"}
                    onChange={RegiFarmik.handleChange}
                    value={RegiFarmik.values.password}
                    placeholder="Enter Your Password"
                    className={` ${RegiFarmik.errors.password
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

                {RegiFarmik.errors.password && (
                  <span className="text-red-500 font-medium text-[10px]">
                    {RegiFarmik.errors.password}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 relative">
                <label className="font-medium text-[12px] mb-[3px] text-[#262626] ">
                  Re-Enter Password
                </label>
                <div className="relative">
                  <input
                    name="re_password"
                    id="re_password"
                    type={showRepassword ? "text" : "password"}
                    onChange={RegiFarmik.handleChange}
                    value={RegiFarmik.values.re_password}
                    placeholder="Enter Your Password"
                    className={` ${RegiFarmik.errors.re_password
                      ? "border-red-500 focus:border-red-500"
                      : "border-inputBorderColor focus:border-theme"
                      } 
                              font-medium text-[12px] w-full h-[35px] py-[5px] px-[10px] rounded-[5px] bg-[#FFF]text-theme border-[1px]  focus:outline-none `}
                  />

                  <span
                    onClick={() => setShowRepassword(!showRepassword)}
                    title={showRepassword ? "Show Password" : "Hide Password"}
                    className="font-mono cursor-pointer text-[1.2em] bg-white pl-2 
                                absolute right-3 bottom-2"
                  >
                    {showRepassword ? <BsEye /> : <BsEyeSlash />}
                  </span>
                </div>

                {RegiFarmik.errors.re_password && (
                  <span className="text-red-500 font-medium text-[10px]">
                    {RegiFarmik.errors.re_password}
                  </span>
                )}
              </div>

              <div style={{ opacity: loading ? "0.85": 1 ,  }} className="grid grid-cols-1 w-full justify-items-center bg-buttonColor rounded-[5px] mt-5 mb-2 h-[40px] ">
              {loading ?
                <div className="animate-spin mt-1.5 inline-block w-[25px]
                 h-[25px] rounded-full border-[2px] border-r-blackC border-l-[#00000075] 
                 border-y-[#00000075] "></div>
                :
                <button
                  type="submit"
                  className="font-medium text-blackC w-full h-[40px]"
                >
                  Create Account
                </button>}

              </div>
            </form>

            <div className="flex flex-row sm:flex-row items-center justify-center sm:justify-between">
              <Link href="/">
                <a className="font-medium flex flex-row items-center gap-[2px] text-blackC text-[14px] tracking-[.025em]">
                  Have an account? Sign in <IoChevronForwardOutline />
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
