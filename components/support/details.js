import { useEffect } from "react";
import { useSelector } from "react-redux";
import Loader from "../public-com/loader";
import Link from "next/link";
import { IoCall, IoMailOutline } from "react-icons/io5";
import { format } from "date-fns";
import { useRouter } from "next/router";

function SupportDetailComponent() {
  const item = useSelector(
    (state) => state?.singleSupport?.singleSupport?.data?.data
  );

  const itemNull = useSelector((state) => state?.singleSupport?.singleSupport);

  const loading = useSelector((state) => state?.singleSupport?.loading);

  const router = useRouter();

  useEffect(() => {
    if (itemNull == null && !item) {
      router.push("/support/list");
    }
  }, [item, itemNull]);

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div className="pb-[80px] ">
          <div className="grid w-full pt-4 px-4">
            <div className="flex w-full items-center" key={item}>
              <div className="w-[100%] grid">
                <div className="flex items-center gap-2 ">
                  <h1 className=" font-[400] text-[16px] not-italic text-[#262626]">
                    {item?.first_name?.length > 0
                      ? item?.first_name + " "
                      : "--"}
                    {item?.last_name?.length > 0 ? item?.last_name : "--"}
                  </h1>
                </div>
                <div className="flex gap-2 items-center">
                  <span className="text-[11px] border-set font-sans text-[#262626] bg-[#FFFFFF] font-normal ">
                    {item?.primary_title?.length > 0
                      ? item?.primary_title
                      : "--"}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 justify-end items-center gap-5">
                <Link href={"tel:" + item?.primary_phone}>
                  <a>
                    <div className="w-[100%] grid justify-end  ">
                      <IoCall className="h-[23.16px] w-[23.65px] " />
                      <h6 className="text-[9px] font-sans font-normal text-[#595959] items-center ml-1">
                        Call
                      </h6>
                    </div>
                  </a>
                </Link>

                <Link href={"mailto:" + item?.primary_email}>
                  <a>
                    <div className="w-[100%] grid justify-end items-center mt-1 ">
                      <svg
                        className="h-[16.67px] w-[22.22px] "
                        width="23"
                        height="17"
                        viewBox="0 0 23 17"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M21.1667 0.166678C21.2614 0.156924 21.3568 0.156924 21.4514 0.166678L11.3889 10.2153L1.35422 0.222234C1.47386 0.187285 1.59765 0.168598 1.72228 0.166678H21.1667ZM12.3681 11.2014L22.4792 1.13196C22.5289 1.26795 22.557 1.41088 22.5626 1.55557V15.4445C22.5626 16.2115 21.9407 16.8333 21.1737 16.8333H1.72922C0.962159 16.8333 0.340332 16.2115 0.340332 15.4445V1.55557C0.341803 1.43824 0.358137 1.32157 0.388943 1.20834L10.4098 11.2014C10.9515 11.7399 11.8264 11.7399 12.3681 11.2014ZM1.71533 15.4445H2.68061L7.74311 10.4236L6.76394 9.44446L1.71533 14.4514V15.4445ZM21.1598 15.4445H20.1876L15.1251 10.4236L16.1042 9.44446L21.1528 14.4514L21.1598 15.4445Z"
                          fill="#262626"
                        />
                      </svg>
                      <h6 className="text-[9px] font-sans font-normal mt-1 text-[#595959] ">
                        Email
                      </h6>
                    </div>
                  </a>
                </Link>
              </div>
            </div>
          </div>
          <div className=" gap-2 w-full pt-2  px-4 ">
            <span className="text-[11px]  text-[#595959] font-normal  not-italic">
              Location
            </span>
            <h1 className="text-base font-[400] text-[#262626] text-[16px]">
              {/* {item?.primary_email?.length > 0 ? item?.primary_email : '--'} */}
              {item?.street_address ? item?.street_address + ", " : null}
              {item?.street_address_2 ? item?.street_address_2 + ", " : null}
              {item?.city ? item?.city + ", " : null}
              {item?.state ? item?.state + ", " : null}
              {item?.zip_code ? item?.zip_code : null}
            </h1>
          </div>
          <div className="flex gap-2 w-full py-[10px] px-4 ">
            {/* <div className="flex gap-2"> */}
            <div className="w-[50%]">
              <span className="text-[11px]  text-[#595959] font-normal  not-italic">
                Primary Phone:{" "}
                {item?.primary_phone_type?.length > 0
                  ? item?.primary_phone_type
                  : "--"}
              </span>
              <h1 className="text-base font-[400] text-[#262626]">
                {item?.primary_phone?.length > 0 ? (
                  <Link href={"tel:" + item?.primary_phone}>
                    {item?.primary_phone}
                  </Link>
                ) : (
                  "--"
                )}
              </h1>
            </div>

            <div className="w-[50%]">
              <span className="text-[11px] text-[#595959] font-normal not-italic">
                Secondary Phone:{" "}
                {item?.secondary_phone_type?.length > 0
                  ? item?.secondary_phone_type
                  : "--"}
              </span>
              <h1 className="text-base font-[400] text-[#262626]">
                {item?.secondary_phone?.length > 0 ? (
                  <Link href={"tel:" + item?.secondary_phone}>
                    {item?.secondary_phone}
                  </Link>
                ) : (
                  "--"
                )}
              </h1>
            </div>
          </div>

          <div className="flex gap-2 w-full py-2 px-4 flex-wrap ">
            {/* <div className="flex gap-2"> */}
            <div className="w-[50%] ">
              <span className="text-[11px] text-[#595959] font-normal not-italic">
                Primary Email
              </span>

              <h1 className="text-base font-[400] text-[#262626] text-[16px] not-italic">
                {item?.primary_email?.length > 0 ? (
                  <Link href={"mailto:" + item?.primary_email}>
                    {item?.primary_email}
                  </Link>
                ) : (
                  "--"
                )}
              </h1>
            </div>

            <div className="w-[50%]">
              <span className="text-[11px] text-[#595959] font-normal not-italic">
                Secondary Email
              </span>
              <h1 className="text-base font-[400] text-[#262626] text-[16px] not-italic">
                {item?.secondary_email?.length > 0 ? (
                  <Link href={"mailto:" + item?.secondary_email}>
                    {item?.secondary_email}
                  </Link>
                ) : (
                  "--"
                )}
              </h1>
            </div>
          </div>

          {item?.notes?.length === 0 ? (
            <div className="grid w-full py-2 px-4 ">
              <div className="flex gap-2">
                <div className="w-[100%]">
                  <span className="text-[20px] font-normal Oswald-font text-[#262626]">
                    Notes
                  </span>
                  <hr className="my-1 border-t-2" />
                  <div>
                    <div className="grid gap-x-2">
                      <div className="w-full">
                        <p className="text-gray-500 text-sm ">No Note Here</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid w-full py-2 px-4 ">
              <div className="flex gap-2">
                <div className="w-[100%]">
                  <span className="text-[15px] text-gray-500">Note</span>
                  <hr className="my-1 border-t-2" />

                  {item?.notes?.map((item, index) => (
                    <div key={index}>
                      <div className="grid gap-x-2	">
                        <div className="w-full">
                          <span className=" text-[12px]">
                            {item?.created_date &&
                              format(
                                new Date(item?.created_date),
                                "dd-MM-yyyy"
                              )}
                          </span>
                        </div>
                        <div className="w-full">
                          <p className="text-gray-500 text-sm ">{item?.note}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default SupportDetailComponent;
