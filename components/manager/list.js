import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../public-com/loader";
import { IoCall } from "react-icons/io5";
import { singleSupport } from "../../redux/action/supportDetails";
import { getAdminManagerList } from "../../redux/action/ManagerList";
import {
  AdminLoginAcceess,
  resendMailManager,
  deleteContractorsAPI,
} from "../../redux/APIS/API";
import { reactLocalStorage } from "reactjs-localstorage";
import { toast } from "react-hot-toast";
import DeletePopup from "./deletepopup";
import DefultScreen from "../public-com/DefultScreen";
import AddNew from "../tenants/add_user_button";
import Sort from "../../components/manager/sort";

function List() {
  const router = useRouter();

  const dispatch = useDispatch();
  const [showdeletePopup, setShowDeletePopup] = useState(false);
  const [showdeleteID, setShowID] = useState(false);

  const loading = useSelector((state) => state.managerList.loading);
  const item = useSelector((state) => state.managerList.managerList.data);

  async function loginAccess(id, value) {
    let searchList = {
      posts_per_page: "-1",
      paged: "1",
      sort_by_field: "a-z",
      search_by_keyword: "",
    };
    if (value === "Disable") {
      let data = {
        user_id: id,
        user_login_access: "0",
      };
      const res = await AdminLoginAcceess(data);

      dispatch(getAdminManagerList(searchList));
    } else {
      let data = {
        user_id: id,
        user_login_access: "1",
      };
      const res = await AdminLoginAcceess(data);
      dispatch(getAdminManagerList(searchList));
    }
  }

  const Manager = reactLocalStorage.get("user_role");

  async function resendInvite(id) {
    let data = { user_id: id };
    const res = await resendMailManager(data);
    toast.success(res.data.message);
  }

  async function deleteManager(id) {
    setShowDeletePopup(true);
    setShowID(id);
  }

  return (
    <>
      {item?.length !== 0 && <Sort />}
      <div className="list">
        {/* {loading ?
            <Loader /> : */}

        <div className="body">
          <div className="ListDetails  mb-20 bg-[#f4f5f7] pb-[70px] ">
            {item?.map((item, index) => (
              <div key={index} className="mb-[5px] ml-[12px]">
                <div className="flex  w-[100%] h-[66px] gap-[3px] items-center border-[#D9D9D9] border-[1px] border-r-[0px] rounded-l-lg bg-[#FFFFFF] px-2 py-4 min-w-fit">
                  <div className="w-[70%]">
                    <h1>
                      {item.first_name
                        ? item.first_name + "\n" + item.last_name
                        : item?.display_name}
                    </h1>
                    {Manager === "app_manager" ? null : (
                      <div className="flex gap-[5px] items-center ">
                        <div
                          onClick={() => resendInvite(item.ID)}
                          className="flex items-center gap-[3px]  "
                        >
                          <h1 className=" text-[11px] font-[500] ">
                            Resend Invite
                          </h1>
                          <img
                            className=" w-[10px] h-[10px] "
                            src={"/assetes/icon/resend.svg"}
                          />
                        </div>
                        <div
                          onClick={() => deleteManager(item.ID)}
                          className="flex items-center gap-[3px] "
                        >
                          <h1 className=" text-[11px] font-bold text-[#D64F52] ">
                            Delete Manager
                          </h1>
                          <img
                            className=" w-[10px] h-[10px] "
                            src={"/assetes/icon/trash.svg"}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="w-[30%] flex gap items-center gap-[5px] ">
                    {/* <h1 className='text-[7px] ' >{item.user_login_access === '1' ? 'Disable' : 'Disabled'}</h1> */}
                    {item.user_login_access === "1" ? (
                      <button
                        className={`toggleContainer isActive`}
                        onClick={() =>
                          Manager === "app_manager"
                            ? null
                            : loginAccess(item.ID, "Disable")
                        }
                      >
                        <span className={`toggleKnob isActive `}></span>
                      </button>
                    ) : (
                      <button
                        className={`toggleContainer `}
                        onClick={() =>
                          Manager === "app_manager"
                            ? null
                            : loginAccess(item.ID, "Enable")
                        }
                      >
                        <span className={`toggleKnob`}></span>
                      </button>
                    )}

                    <h1 className="text-[10px] ">
                      {item.user_login_access === "1" ? "Access" : "No Access"}
                    </h1>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {showdeletePopup && (
            <DeletePopup
              deleteID={showdeleteID}
              datashow={showdeletePopup ? "block" : "hidden"}
              onClicked={() => setShowDeletePopup(false)}
            />
          )}
          {item?.length === 0 ? (
            <div className="absolute w-full h-full top-0 left-0 background-[#f8fafc] z-[-99]">
              <div className="w-full h-full grid justify-center items-center z-[-99]">
                <div className="text-center">
                  <DefultScreen
                    Title={
                      "Add managers who can only view your data. Managers cannot edit or delete data."
                    }
                    ButtonTitle={"Add Manager"}
                    ButtonUrl={"/manager/form"}
                  />
                </div>
              </div>
            </div>
          ) : (
            <>
              {Manager === "app_manager" ? null : (
                <AddNew href={"/manager/form"} />
              )}{" "}
            </>
          )}
        </div>
        {/* } */}
      </div>
    </>
  );
}
export default List;
