import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { IoChevronForwardOutline } from "react-icons/io5";
import { useFormik } from "formik";
import { checkOnBoardingStatusAPI, createConnectAccountOnStripeApi, postLoginAPI, sendFcmTokenAPI } from "../redux/APIS/API";
import toast from "react-hot-toast";
import { reactLocalStorage } from "reactjs-localstorage";
import { useDispatch } from "react-redux";
import { UserActive } from "../redux/action/user-active";
import Image from "next/image";
import logo from "../public/smi-logo.png";
import InstallAPPSMI from "../components/public-com/installApp";
import Notification from "../components/public-com/Notification";


function Login() {
  const [showpassword, setShowpassword] = useState(false);
  const [count, setCount] = useState(1);
  const router = useRouter();

  const queryEmail = router?.query?.email;

  const queryPassword = router?.query?.password;

  const fcmToken = {
    device_token: reactLocalStorage.get("fcm_token"),
  };

  const dispatch = useDispatch();

  useEffect(() => {
    const tokenVaild = reactLocalStorage.get("token", true);
    const xpireDate = reactLocalStorage.get("date", true);
    const user_role = reactLocalStorage.get("user_role");

    if (tokenVaild == true) {
      router.push("/");
    } else if (user_role === "tenant") {
      router.push("/tenant");
    } else {
      router.push("/dashboard");
    }

    pushnotification();
  }, []);

  function pushnotification() {
    <Notification />;
  }

  const validate = (values) => {
    const errors = {};

    if (!values.username) {
      errors.username = "Please Enter Email";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.username)
    ) {
      errors.username = "Please Enter Vaild Email";
    }

    if (!values.password) {
      errors.password = "Please Enter Password";
    }

    return errors;
  };

  const Loginfarmik = useFormik({
    initialValues: {
      username: queryEmail ? queryEmail : "",
      password: queryPassword ? queryPassword : "",
      device_token: localStorage.getItem("fcm_token"),
    },
    validate,
    onSubmit: async (value, { resetForm }) => {
      try {
        const respon = await postLoginAPI(value);


        const authToken = respon.data.data.token

        // if (authToken) {



        // console.log(authToken, "tokenVaild")

        reactLocalStorage.set("token", authToken);

        reactLocalStorage.set("user_role", respon.data.data.user_role);

        let newDate = new Date();

        newDate.setDate(newDate.getDate() + 7);

        reactLocalStorage.set("date", newDate);



        dispatch(UserActive(respon.data.data));

        // const token = reactLocalStorage.get("token", false)


        const OnBoardDetailsdata = []

        // const OnBoardDetails = await createConnectAccountOnStripeApi(OnBoardDetailsdata)

        
        // const OnBoardDetails = await checkOnBoardingStatusAPI(OnBoardDetailsdata);

        // if (OnBoardDetails) {
        //   reactLocalStorage.set("onboard_user_status", OnBoardDetails?.data?.response  );
        //   // reactLocalStorage.set("onboard_user_account_url", OnBoardDetails?.data?.onboarding_url);
        // }

        toast.success(respon.data.message);
        // const res = await sendFcmTokenAPI(fcmToken);

        // alert(fcmToken)

        // console.log(fcmToken, 'fcmToken504550')

        const Tenantuser = respon.data.data.user_role;
        if (Tenantuser == "tenant") {
          router.push("/tenant");
        } else {
          router.push("/dashboard");
        }

        // }
      } catch (error) {
        // resetForm();

        toast.error("Your username or password is incorrect, please try again");

        setCount(() => count + 1);

        if (count == 3) {
          router.push("/auth/forget_password");
        }
        console.log(error);
      }
    },
  });

  useEffect(() => {
    navigator.serviceWorker.register('/firebase-messaging-sw.js')
      .then((registration) => {
        // console.log('ServiceWorker registration successful:', registration);
      })
      .catch((error) => {
        // console.error('ServiceWorker registration failed:', error);
      });

  }, [])



  return (
    <div className="Login page w-full h-screen min-h-screen overflow-x-hidden gradientLogin">
      <div className="w-[90%] sm:w-[50%] h-full min-h-screen mx-auto grid content-evenly">
        <div className="h-[40%] grid items-center ">
          <div className="logo-wrapper">
            <div className="smi-logo" >
              <Image src={logo} />
            </div>
          </div>
        </div>
        <div className="h-[60%] grid items-end pb-12">
          <form className=" ">
            <div className="md:px-[50px] md:bg-white py-5 px-8 bg-[#ffffffbf] md:shadow-[0_0_8px_3px_#a0a0a11f] rounded-[7px]">
              <div className="grid grid-cols-1 gap-[10px]">
                <div className="grid grid-cols-1">
                  <label className="font-medium text-[12px] mb-[3px] text-[#262626] ">
                    {`Email`}
                  </label>
                  <input
                    name="username"
                    id="username"
                    placeholder="Enter Your Email"
                    onChange={Loginfarmik.handleChange}
                    value={Loginfarmik.values.username}
                    className={` ${Loginfarmik.errors.username
                      ? "border-red-500 focus:border-red-500"
                      : "border-inputBorderColor"
                      } 
                           font-medium text-[12px] w-full h-[35px] py-[5px] px-[10px] rounded-[5px] bg-[#FFF]
                           text-theme border-[1px] focus:border-theme focus:outline-none `}
                  />

                  {Loginfarmik.errors.username && (
                    <span className="text-red-500 font-medium text-[12px]">
                      {Loginfarmik.errors.username}
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 relative">
                  <label className="font-medium text-[12px] mb-[3px] text-[#262626]">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      name="password"
                      id="password"
                      type={showpassword ? "text" : "password"}
                      onChange={Loginfarmik.handleChange}
                      value={Loginfarmik.values.password}
                      placeholder="Enter Your Password"
                      className={` ${Loginfarmik.errors.password
                        ? "border-red-500 focus:border-red-500"
                        : "border-inputBorderColor"
                        } 
                              font-medium text-[12px] w-full h-[35px] py-[5px] px-[10px] rounded-[5px] bg-[#FFF]  text-theme border-[1px] focus:border-theme focus:outline-none `}
                    />
                    <span
                      onClick={() => setShowpassword(!showpassword)}
                      className="font-mono cursor-pointer text-[1.2em] bg-white pl-2 
                            absolute right-3 bottom-2"
                    >
                      {showpassword ? <BsEye /> : <BsEyeSlash />}
                    </span>
                  </div>
                  {Loginfarmik.errors.password && (
                    <span className="text-red-500 font-medium text-[12px]">
                      {Loginfarmik.errors.password}
                    </span>
                  )}
                </div>

                <div className="flex flex-col justify-between mb-3 ">
                  <Link href="/auth/forget_password">
                    <a className="font-medium text-theme text-[15px]">
                      Forgot password ?
                    </a>
                  </Link>
                </div>
              </div>

              <div className="grid grid-cols-1 w-full justify-items-center bg-buttonColor rounded-[5px] h-[40px] shadow-[0_0_30px_0_#0003] ">
                <button
                  onClick={Loginfarmik.handleSubmit}
                  className="font-medium text-blackC w-full h-[40px]"
                >
                  Login
                </button>
              </div>

              <div className="grid grid-cols-1 w-full justify-items-center mt-3">
                <div className="flex flex-row sm:flex-row items-center justify-center sm:justify-between">
                  <Link href="/auth/register">
                    <a className="font-medium flex flex-row items-center gap-[2px] text-blackC text-[14px] tracking-[.025em]">
                      Create New Account <IoChevronForwardOutline />
                    </a>
                  </Link>
                </div>
              </div>

              <div className="grid grid-cols-1 w-full justify-items-center py-[20px] ">
                <span>OR</span>
              </div>

              <div
                onClick={() => router.push("/auth/tenant_login")}
                className="grid grid-cols-1 w-full justify-items-center bg-[#CCD9E6] rounded-[5px]
                         shadow-[0_0_30px_0_#0003] ">
                <span className="font-medium text-blackC py-2 ">
                  Login as Tenant
                </span>
              </div>

              <InstallAPPSMI showPopup={true} />
              <Notification />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
