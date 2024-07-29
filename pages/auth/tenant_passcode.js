import { useEffect } from "react";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import { postForgetAPI, postLoginAPI } from "../../redux/APIS/API";
import toast from "react-hot-toast";
import { IoChevronForwardOutline } from "react-icons/io5";
import Image from "next/image";
import logo from "../../public/smi-logo.png";
import { useState } from "react";
import { reactLocalStorage } from "reactjs-localstorage";
import { useDispatch, useSelector } from "react-redux";
import { UserActive } from "../../redux/action/user-active";
import { getTenantDetail } from "../../redux/action/tenants-detail";

function TenantPasscode() {
  const router = useRouter();
  const [getMail, setGetGmail] = useState(false);

  const dispatch = useDispatch();

  const TenantCompanyName = useSelector(
    (state) => state.tenantsDetails.tenantsDetails?.data?.company_name
  );

  useEffect(() => {
    let { email } = router.query;

    if (email) {
      setGetGmail(email);
    } else setGetGmail(false);
  }, [router]);

  const validate = (values) => {
    const errors = {};

    if (!values.passcode) {
      errors.passcode = "Please enter Passcode";
    }

    return errors;
  };

  const farmik = useFormik({
    initialValues: {
      passcode: "",
    },
    validate,
    onSubmit: async (data, { resetForm }) => {
      try {
        let Logindata = {
          username: getMail,
          password: data.passcode,
        };

        const res = await postLoginAPI(Logindata);


        // console.log(res.data.data.id, 'rsesdadas');

        if (res.data.success == true) {
          reactLocalStorage.set("token", res.data.data.token);
          reactLocalStorage.set(
            "default_post_id",
            res.data.data.default_post_id
          );
          reactLocalStorage.set("displayName", res.data.data.displayName);
          reactLocalStorage.set("email", res.data.data.email);
          reactLocalStorage.set("firstName", res.data.data.firstName);
          reactLocalStorage.set("userid", res.data.data.id);
          reactLocalStorage.set("lastName", res.data.data.lastName);
          reactLocalStorage.set("login_enable", res.data.data.login_enable);
          reactLocalStorage.set("nicename", res.data.data.nicename);
          reactLocalStorage.set("user_role", res.data.data.user_role);

          let tenant_IDS =  res?.data?.data?.default_post_id 

          // console.log(tenant_IDS, 'res15420');

          const TanentIDD = `tenantId: ${tenant_IDS}`


          dispatch(getTenantDetail(tenant_IDS));

          reactLocalStorage.set("company_name", TenantCompanyName);

          let newDate = new Date();
          newDate.setDate(newDate.getDate() + 7);
          reactLocalStorage.set("date", newDate);
          dispatch(UserActive(res.data.data));
          toast.success(res.data.message);
        } else if (res.data.success == false) {
          toast.error(res.data.message);
        } else {
          // toast.error("Please Enter Your Passcode");
        }

        router.push("/tenants/list");
      } catch (error) {
        console.log(error.response);
        toast.error(error.response.data.message);
      }
    },
  });

  return (
    <div className="forget-page w-full h-screen min-h-screen overflow-x-hidden flex items-center gradientLogin">
      <div className="w-[90%] sm:w-[50%] min-h-screen h-full mx-auto grid content-evenly">
        <div className="h-[40%] grid items-center ">
          <div className="grid grid-cols-1 ">
            <div className="logo-wrapper">
              <div className="smi-logo">
                <Image src={logo} />
              </div>
            </div>
          </div>
        </div>

        <div className="h-[60%] grid items-end pb-12 ">
          <div className="md:px-[50px] md:bg-white pt-5 pb-3 px-8 bg-[#ffffffbf] md:shadow-[0_0_8px_3px_#a0a0a11f] rounded-[15px]">
            <div className="mb-5 ">
              <h1 className="text-center font-[400] Oswald-font pb-2 text-[24px]">
                Enter Passcode
              </h1>
              <p className="font-[500] text-blackC text-[14px] leading-[20px]">
                {`Enter the passcode sent to your account email address.`}
              </p>
            </div>

            <form
              method="POST"
              onSubmit={farmik.handleSubmit}
              className="h-[50%]"
            >
              <div className="grid grid-cols-1 gap-[20px]">
                <div className="grid grid-cols-1">
                  <label className="font-medium text-[12px] mb-[3px] text-[#262626] ">
                    Enter passcode
                  </label>
                  <input
                    name="passcode"
                    id="passcode"
                    placeholder="Passcode"
                    onChange={farmik.handleChange}
                    value={farmik.values.email}
                    className={` ${
                      farmik.errors.email
                        ? "border-red-500 focus:border-red-500"
                        : "border-inputBorderColor focus:border-theme"
                    } 
                              font-medium text-[12px] w-full h-[35px] py-[5px] px-[10px] rounded-[5px] bg-[#FFF]text-theme border-[1px]  focus:outline-none `}
                  />
                  <span className="font-medium text-[12px] mb-[5px] text-[#262626] ">
                    Your passcode was sent to your account email
                  </span>
                  {farmik.errors.email && (
                    <span className="font-medium text-red-500 text-[15px]">
                      {farmik.errors.email}
                    </span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 w-full justify-items-start mt-[25px]">
                <div className="grid grid-cols-1 w-full justify-items-center bg-buttonColor shadow-[0_0_8px_3px_#a0a0a11f] rounded-[5px] h-[40px] ">
                  <button
                    type="submit"
                    className="font-medium text-blackC w-full h-[40px]">
                    Login
                  </button>
                </div>

                <div className="grid grid-cols-1 w-full justify-items-center mt-3">
                  <div className="flex flex-row sm:flex-row items-center justify-center sm:justify-between">
                    <Link href="/">
                      <a className="font-medium flex flex-row items-center gap-[2px] text-blackC text-[14px] tracking-[.025em]">
                        Sign in as an admin <IoChevronForwardOutline />
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TenantPasscode;
