import Link from "next/link";
import { IoCall, IoFlagSharp } from "react-icons/io5";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  getContractors,
  getContractorsFilter,
} from "../../redux/action/contractors";
import { getContractorsDetail } from "../../redux/action/contractors-detail";
import Loader from "../public-com/loader";
import DefultScreen from "../public-com/DefultScreen";

function ConListItem() {
  const dispatch = useDispatch();

  const router = useRouter();

  const contractors = useSelector(
    (state) => state.contractors.contractors.data
  );

  const loading = useSelector((state) => state.contractors.loading);

  const getContractorDetails = useSelector(
    (state) => state.contractorsDetail.contractorsDetail?.data?.data
  );

  useEffect(() => {
    if (getContractorDetails == null) {
      dispatch(getContractorsDetail());
    }
  }, []);

  return (
    <div className="list">
      {loading ? (
        <Loader />
      ) : (
        <div className="body">
          <div className="ListDetails mb-20 bg-[#f4f5f7] pb-[70px]">
            {contractors?.map((item, index) => (
              <div key={index} className="mb-[5px] ml-[12px]  ">
                <div className="flex  w-[100%] h-[66px] gap-[3px] items-center rounded-l-lg bg-[#FFFFFF] px-4">
                  <div className="w-[100%]">
                    <div
                      className="w-full"
                      onClick={() => {
                        dispatch(getContractorsDetail(item.ID));
                        router.push("/contractors/details");
                      }}
                    >
                      <h1 className="text-[16px]  font-[400] capitalize text-[#262626]">
                        {item.company_name.length > 0
                          ? item.company_name
                          : item.first_name.length > 0
                            ? item.first_name + " " + item.last_name
                            : item.company_email.split("@")[0]}
                      </h1>

                      <div className="flex opacity-80 gap-[10px] items-center mt-1 ">
                        {item.services && (
                          <span className="text-[11px] not-italic border-set text-[#000] font-[400] capitalize font-sans ">
                            {item.services}
                          </span>
                        )}
                        {item.account_number && (
                          <span className="text-[11px] not-italic border-set text-[#000] font-[400] capitalize font-sans">
                            {item.account_number}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="w-[20%] flex justify-between items-center">
                    <div>
                      {item?.company_flag === "true" && (
                        <IoFlagSharp className="text-lg  text-red-500" />
                      )}
                    </div>
                    <Link href={"tel:" + item.company_primary_phone}>
                      <a>
                        <IoCall className="h-[23.16px] w-[23.65px]" />
                      </a>
                    </Link>
                  </div>
                </div>
                <hr />
              </div>
            ))}
          </div>
          {contractors?.length == 0 && (
            <div className="absolute w-full h-full top-0 left-0 background-[#f8fafc] z-[-99]">
              <div className="w-full h-full grid justify-center items-center z-[-99]">
                <div className="text-center">
                  <div>
                    <DefultScreen
                      Title={'Add Contractors you work with'}
                      ButtonTitle={'Add Contractors'}
                      ButtonUrl={'/contractors/form'} />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ConListItem;
