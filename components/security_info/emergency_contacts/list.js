import { useRouter } from "next/router";
import Loader from "../../public-com/loader";
import { IoCall } from "react-icons/io5";
import { useSelector } from "react-redux";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { getSingleEmergencyContact } from "../../../redux/action/emergency_contact_detail";
import { useEffect } from "react";

function ListItem() {
  const dispatch = useDispatch();

  const router = useRouter();

  const Item = useSelector(
    (state) => state.emergencyContactsList.emergencyContactsList?.data
  );

  const itemData = useSelector(
    (state) => state?.emergencyDetails?.emergencyDetails
  );

  const loading = useSelector((state) => state.emergencyContactsList?.loading);

  useEffect(() => {
    if (itemData == null) {
      dispatch(getSingleEmergencyContact());
    }
  }, [itemData]);

  return (
    <div className="list">
      {loading ? (
        <Loader />
      ) : (
        <div className="body ">
          <div className="ListDetails mt-3 mb-20 bg-[#f4f5f7] pb-[70px] ">
            {Item?.map((item, index) => (
              <div key={index} className="mb-[5px] ml-[12px] ">
                <div className="flex  w-[100%] h-[66px] gap-[3px] items-center  rounded-l-lg bg-[#FFFFFF] px-4 min-w-fit">
                  <div className="w-[100%] ">
                    <div
                      className="w-full "
                      onClick={() => {
                        dispatch(getSingleEmergencyContact(item.emergency_id)),
                          router.push(
                            "/security_info/emergency_contacts/detail"
                          );
                      }}
                    >
                      <div className="flex overflow-hidden ">
                        <h1 className="text-[16px] font-[400] capitalize oneLineTextlimit text-[#262626] not-italic ">
                          {item.item_name}
                        </h1>
                      </div>
                      <div className="flex opacity-80 gap-[10px] items-center  mt-1">
                        {item.service && (
                          <span
                            className={`${
                              item.service ? " border-set" : ""
                            } not-italic text-[11px]  font-sans
                                                 text-[#000] font-normal capitalize`}
                          >
                            {item.service}
                          </span>
                        )}
                      </div>

                      {/* <div className="flex opacity-80 gap-[10px] items-center  mt-1">
                                                
                                            </div> */}
                    </div>
                  </div>

                  <div className="w-[20%]  flex justify-between items-center">
                    {/* <IoCall className="h-[23.16px] w-[23.65px]" /> */}
                    {/* <div>
                                            {item?.company_flag === "true" && <IoFlagSharp className="text-lg  text-red-500" />}
                                        </div> */}
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
          {Item?.length == 0 && (
            <div className="absolute w-full h-full top-0 left-0 bg-[#f8fafc] z-[-99] px-4 text-4 leading-5">
              <div className="w-full h-full grid justify-center items-center z-[-99]">
                <div className="text-center">
                  <div>
                    <span>
                      Add important contacts like security personnel, fire or
                      police departments, emergency medical services, etc.
                    </span>
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
