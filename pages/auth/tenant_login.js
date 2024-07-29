import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { IoChevronForwardOutline } from "react-icons/io5";
import Image from "next/image";
import logo from "../../public/smi-logo.png";
import { tenantLoginAPI } from "../../redux/APIS/API";

function TenantLogin() {
  const router = useRouter();

  const validate = (values) => {
    const errors = {};

    if (!values.tenant_email) {
      errors.tenant_email = "Please enter email";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.tenant_email)
    ) {
      errors.tenant_email = "Invalid email address";
    }

    return errors;
  };

  const farmik = useFormik({
    initialValues: {
      tenant_email: "",
    },
    validate,
    onSubmit: async (data, { resetForm }) => {
      try {
        const res = await tenantLoginAPI(data);

        if (res?.data?.success == true) {
          toast.success(res?.data?.message);
          router.push(`/auth/tenant_passcode?email=${data?.tenant_email}`);
        } else if (res?.data?.success == false) {
          toast.error(res?.data?.message);
          resetForm();
        } else {
          toast.error("try again");
          resetForm();
        }
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
                Tenant Login
              </h1>
              <p className="font-[500] text-blackC text-[14px] leading-[20px]">
                {` Request service projects from management. We’ll send a passcode to your email to login. `}
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
                    Enter your account email
                  </label>
                  <input
                    name="tenant_email"
                    id="username"
                    placeholder="Email"
                    onChange={farmik.handleChange}
                    value={farmik.values.tenant_email}
                    className={` ${
                      farmik.errors.tenant_email
                        ? "border-red-500 focus:border-red-500"
                        : "border-inputBorderColor focus:border-theme"
                    } 
                              font-medium text-[12px] w-full h-[35px] py-[5px] px-[10px] rounded-[5px] bg-[#FFF]text-theme border-[1px]  focus:outline-none `}
                  />
                  {farmik.errors.tenant_email && (
                    <span className="font-medium text-red-500 text-[15px]">
                      {farmik.errors.tenant_email}
                    </span>
                  )}
                  <span className="font-medium text-[12px] mb-[5px] text-[#262626] ">
                    Forgot or can’t access your email? Contact your app
                    administrator
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 w-full justify-items-start mt-[25px]">
                <div className="grid grid-cols-1 w-full justify-items-center bg-buttonColor shadow-[0_0_8px_3px_#a0a0a11f] rounded-[5px] h-[40px] ">
                  <button
                    type="submit"
                    className="font-medium text-blackC w-full h-[40px]"
                  >
                    Send Passcode
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

export default TenantLogin;
