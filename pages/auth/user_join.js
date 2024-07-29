import React, { useState, useEffect } from "react";
import Image from "next/image";
import logo from "../../public/smi-logo.png";
import Button from "../../components/public-com/form/button";
import { useRouter } from "next/router";
import { UserJoinVarifyAPI } from "../../redux/APIS/API";
import { toast } from "react-hot-toast";

function UserJoin() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(false);

  const router = useRouter();

  const { activation_key, access_key } = router.query;

  useEffect(() => {
    if (!router.isReady) return;
    userVafity();

    if (!activation_key && !access_key) {
    }
  }, [activation_key, access_key, router.isReady]);

  async function userVafity() {
    try {
      setLoading(true);
      let data = {
        activation_key: activation_key,
        access_key: access_key,
      };

      const res = await UserJoinVarifyAPI(data);

      if (res.data.data.mail_status) {
        toast.success(res.data.message);
        setData(res.data.data);
      } else {
        router.push("/");
        toast.error(res.data.message);
      }

      setLoading(false);
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  }

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
                Manager Verification
              </h1>
              {loading ? (
                <div className="relative h-auto ">
                  <div className="text-center">
                    <div>
                      <div className="animate-spin inline-block border-[#00000036] w-8 h-8 rounded-full border-[0.25em] !border-r-[#000] "></div>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <p className="font-[500] text-blackC text-[13px] leading-[20px] text-center ">
                    {`We'll send a passcode to your email to login.`}
                  </p>
                  <div className=" mt-4 w-[200px] mx-auto">
                    {data.email && (
                      <Button
                        OnClick={() =>
                          router.push({
                            pathname: "/",
                            query: {
                              email: data.email,
                              password: data.password,
                            },
                          })
                        }
                        lebal={"Go to Login"}
                        textColor={"#fff"}
                        bgcolor={"bg-[#000]"}
                      />
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserJoin;
