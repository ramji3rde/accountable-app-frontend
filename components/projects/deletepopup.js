import React from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { deleteProjectAPI } from "../../redux/APIS/API";
import { useSelector } from "react-redux";
import { getProjectFilter } from "../../redux/action/projectFilter";
import { RiDeleteBin6Line } from "react-icons/ri";

function DeletePopup(props) {
  const router = useRouter();

  const project_ids = useSelector(
    (state) => state.projectDetails.details?.data?.data?.ID
  );

  async function deleteUser() {
    try {
      const respon = await deleteProjectAPI({
        project_ids: [project_ids],
      });

      toast.success(respon.data.message);
      dispatch(getProjectFilter());
      router.push("/projects/list");
    } catch (error) {
      console.log(error)
      router.push("/projects/list");
    }
  }

  return (
    <div className={props.datashow}>
      <div
        style={{ transition: ".5s" }}
        className="DeletePopup h-screen bg-[#22222238] w-full fixed z-[100] top-0 left-0 overflow-hidden"
      >
        <div className="">
          <div className="absolute w-[80%]  top-[30%] left-[10%] mx-auto bg-white rounded-[10px]">
            <div className="text-black text-center pt-6">
              <div className=" flex items-center justify-center text-[#D64F52]">
                <RiDeleteBin6Line className="h-[40px] w-[40px] mb-4" />
              </div>
              <p className="text-[16px] text-[#262626] font-normal px-4 pb-4">
                Are you sure you want to delete? This will permanently delete
                all data for this client.
              </p>

              <div className="flex justify-center">
                <div
                  onClick={deleteUser}
                  className="bg-[#D64F52] w-[50%] py-2 flex justify-center rounded-bl-[10px]"
                >
                  <div className=" py-2 w-[100%] mx-auto flex justify-center text-white ">
                    <span className="text-[16px] font-normal ">
                      Yes, Delete
                    </span>
                  </div>
                </div>

                <div
                  onClick={props.onClicked}
                  className=" bg-[#CCD9E6] w-[50%]  py-2 flex justify-center rounded-br-[10px]"
                >
                  <div
                    className=" py-2 mx-auto w-full flex justify-center  
                                    rounded-[10px] "
                  >
                    <span className="text-[16px] font-normal text-[#262626]">
                      No, Go Back
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeletePopup;
