import Link from "next/link";
import { IoCall, IoFlagSharp } from "react-icons/io5";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { getTenantDetail } from "../../redux/action/tenants-detail";
import { useEffect, useState } from "react";
import Loader from "../public-com/loader";
import { getCurrentTransaction } from "../../redux/action/getCurrentTransaction";
// import SuccessPopup from "../success-popup";

function ListItem() {
  const dispatch = useDispatch();

  const router = useRouter();

  const TenentList = useSelector((state) => state.tenants.tenants?.data);
  // console.log(TenentList.filter(item =>  item.tenant_user_id).map(item => item.tenant_user_id));


  const loading = useSelector((state) => state.tenants.loading);

  const tenants_data = useSelector(
    (state) => state.tenantsDetails.tenantsDetails
  );

  useEffect(() => {
    if (tenants_data == null) {
      dispatch(getTenantDetail());
    }
  }, [dispatch, tenants_data]);

 
  function handleDetailClick(item){

    dispatch(getTenantDetail(item.ID));
    const tenantuserID = {"tenant_user_id" : item.tenant_user_id};

    // console.log(tenantuserID)
    dispatch(getCurrentTransaction(tenantuserID));
    router.push("/tenants/details");

  }


  return (
    <div className="list">
      {loading ? (
        <Loader />
      ) : (
        <div className="body ">
          <div className="ListDetails mb-20 bg-[#f4f5f7] pb-[70px] ">
            {TenentList?.map((item, index) => (
              <div key={index} className="mb-[5px] ml-[12px] ">
                <div className="flex  w-[100%] h-[66px] gap-[3px] items-center  rounded-l-lg bg-[#FFFFFF] px-4 min-w-fit">
                  <div
                    className="w-[100%] "
                    onClick={() => {
                      handleDetailClick(item)
                    }}
                  >
                    <div className="w-full">
                      <div className="flex overflow-hidden  ">
                        <h1 className="text-[16px] font-[400] capitalize oneLineTextlimit text-[#262626] not-italic ">
                          {item.company_name}
                        </h1>
                      </div>
                      <div className="flex opacity-80 gap-[10px] items-center  mt-1">
                        {item.unit && (
                          <span
                            className={`${
                              item.unit ? " border-set" : ""
                            } not-italic text-[11px] border-set font-sans
                                                 text-[#000] font-normal capitalize`}
                          >
                            Unit #{item.unit}
                          </span>
                        )}
                        {item.property && (
                          <span
                            className={`${
                              item.property ? " border-set" : ""
                            } not-italic text-[11px] font-sans
                                                 text-[#000] font-normal capitalize`}
                          >
                            {item.property}
                          </span>
                        )}
                        {item.status && (
                          <span
                            className={`${
                              item.status ? " border-set" : ""
                            } not-italic text-[11px]  font-sans
                                                 text-[#000] font-normal capitalize`}
                          >
                            {item.status}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="w-[20%]  flex justify-between items-center">
                    <div>
                      {item?.company_flag === "true" && (
                        <IoFlagSharp className="text-lg  text-red-500" />
                      )}
                    </div>
                    <Link href={"tel:" + item.primary_phone}>
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
          {TenentList?.length == 0 && (
            <div className="absolute w-full h-full top-0 left-0 bg-[#f8fafc] z-[-99]">
              <div className="w-full h-full grid justify-center items-center z-[-99]">
                <div className="text-center">
                  <div>
                    <span>no data</span>
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

export default ListItem;
