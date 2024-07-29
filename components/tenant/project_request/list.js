import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { format } from "date-fns";
import Loader from "../../public-com/loader";
import { getTenantsUserDetails } from "../../../redux/action/tenantsuserDetails";

function List() {
  const router = useRouter();
  const dispatch = useDispatch();

  const loading = useSelector((state) => state.tenantsUserList.loading);

  const item = useSelector(
    (state) => state.tenantsUserList.tenantsUserList?.data
  );

  function getDetail(ID) {
    let data = { project_id: ID };
    dispatch(getTenantsUserDetails(data));
    router.push("/tenant/project_request/details");
  }

  return (
    <div className="list">
      {loading ? (
        <Loader />
      ) : (
        <div className="body">
          <div className="ListDetails  mb-20 bg-[#f4f5f7] pb-[70px] ">
            {item?.map((item, index) => (
              <div
                key={index}
                onClick={() => getDetail(item.ID)}
                className="mb-[5px] ml-[12px]"
              >
                <div className="flex  w-[100%] h-[66px] gap-[3px] items-center border-[#D9D9D9] border-[1px] border-r-[0px] rounded-l-lg bg-[#FFFFFF] px-2 py-4 min-w-fit">
                  <div className="w-[100%]">
                    <div>{item.project_name}</div>
                    <div className="flex opacity-80 gap-[10px] items-center mt-2">
                      {item?.post_date && (
                        <span className="text-[12px] font-sans text-[#000] font-normal capitalize ">
                          {item?.post_date &&
                            format(new Date(item?.post_date), "dd-MM-yyyy")}
                        </span>
                      )}

                      {item?.des && (
                        <span className="text-[11px] border-[1px] px-[02px] py-[05px] rounded-[4px]  border-[#D9D9D9] font-sans text-[#000] font-normal capitalize ">
                          {item?.des}
                        </span>
                      )}

                      {item?.comment_count > "0" ? (
                        <span
                          className={`text-[12px] 
                                    font-sans text-[#000] bg-[#91EC9D] font-normal capitalize px-1 py-0.5 rounded-[4px] `}
                        >
                          {"Reply Sent"}
                        </span>
                      ) : (
                        <span
                          className={`text-[12px]
                              font-sans text-[#000] bg-[#CCD9E6] font-normal capitalize px-1 py-0.5 rounded-[4px] `}
                        >
                          {"No Reply Sent"}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {item?.length == 0 && (
            <div className="absolute w-full h-full top-0 left-0 background-[#f8fafc] z-[-99]">
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
export default List;
