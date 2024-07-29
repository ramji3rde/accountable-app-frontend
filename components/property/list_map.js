import React, { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { IoTrashOutline } from "react-icons/io5";
import { reactLocalStorage } from "reactjs-localstorage";
import {
  AllProparty,
  createPropartyAPI,
  deleteProparty,
  deleteTenantsPhotoAPI,
} from "../../redux/APIS/API";
import AddPhoto from "../public-com/form/addDocs";
import Loader from "../public-com/loader";
import DeletePhotoPopup from "../tenants/details/deletePhotopopup";
import DefultScreenMap from "./defultScreenMap";
import PropertyPopUp from "./form/editPropertyPopUp";

export default function PropertylistMap() {
  const [showPopUp, setShowPop] = useState(false);
  const [getPropartyData, setGetPropartyData] = useState([]);
  const [updatePropartyData, setUpdatePropartyData] = useState([]);
  const [showPhotoDeletePopup, setShowPhotoDeletePopup] = useState(false);
  const [photoDeleteID, setPhotoDeleteID] = useState();
  const [addPhoto, setAddPhoto] = useState(false);

  async function fetchData() {
    let data = {
      paged: 1,
      posts_per_page: 10,
    };

    const response = await AllProparty(data);

    if (response?.data?.total_project_maps == 0) {
      createProparty();
    } else if (response?.data?.total_project_maps == 1) {
      setGetPropartyData(response.data.data);
    }
  }

  const Manager = reactLocalStorage.get("user_role");

  useEffect(() => {
    fetchData();
  }, [addPhoto, updatePropartyData, showPhotoDeletePopup, showPopUp]);

  async function createProparty() {
    const res = await createPropartyAPI({ map_name: "Oakland" });
  }

  function UpdateProparty(item) {
    setUpdatePropartyData(item);
    setShowPop(true);
  }

  async function DeleteProparty(item) {
    const res = await deleteProparty({ map_ids: [item] });

    fetchData();
  }

  function deleteOpen(id) {
    setShowPhotoDeletePopup(true);
    setPhotoDeleteID(id);
  }

  async function deletePhotoapi(id) {
    try {
      const data = {
        photo_ids: [id],
      };
      const respon = await deleteTenantsPhotoAPI(data);

      toast.success(respon.data.message);
      setShowPhotoDeletePopup(false);
      fetchData();
    } catch (err) {
      console.log(err);
    }
  }

  const loading = false;
  return (
    <div className="list">
      {loading ? (
        <Loader />
      ) : (
        <div className="body mx-3">
          <div className="mt-4 ">
            <span className="text-[11px] text-[#595959] font-normal not-italic">
              Property Name
            </span>
          </div>
          {getPropartyData &&
            getPropartyData.map(
              (item, index) =>
                index === 0 && (
                  <div key={index} className="grid items-center h-auto ">
                    <div className="flex items-center gap-5 ">
                      <div className="text-[16px] font-normal not-italic text-[#262626]">
                        {item.post_content}
                      </div>
                      {Manager === "app_manager" ? null : (
                        <div
                          className="flex gap-[5px] items-center"
                          onClick={() => UpdateProparty(item)}
                        >
                          <svg
                            width="15"
                            height="14"
                            viewBox="0 0 15 14"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M11.6338 0.424998L14.0921 2.88333C14.2547 3.04457 14.3465 3.26387 14.3473 3.49288C14.3481 3.7219 14.2578 3.94182 14.0963 4.10416L12.7296 5.47083L9.05042 1.79166L10.4171 0.424998C10.7536 0.090227 11.2973 0.090227 11.6338 0.424998ZM0.967084 12.5L1.75875 9.08333L8.33375 2.5L12.0171 6.175L5.41708 12.75L1.97958 13.5417C1.92001 13.5477 1.85999 13.5477 1.80042 13.5417C1.54149 13.5401 1.29711 13.4217 1.13536 13.2195C0.973609 13.0174 0.911774 12.7529 0.967084 12.5Z"
                              fill="#262626"
                            />
                          </svg>
                          <div className="text-[12px] font-normal not-italic text-[#262626]">
                            Edit
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="w-full grid mt-5 mb-24 ">
                      {item.photos.length > 0 ? (
                        item?.photos.map((item, index1) => (
                          <div className="relative" key={index1}>
                            <img
                              className="w-full h-auto object-cover object-center border-[2px] 
                                            border-solid border-[#DEDEDE]"
                              src={item.photo_src}
                            />

                            {Manager === "app_manager" ? null : (
                              <div
                                className="absolute bg-white shadow-lg top-1 right-1 rounded-[10px] w-[40px] h-[40px] text-center"
                                onClick={() => deleteOpen(item.photo_id)}
                              >
                                <IoTrashOutline className="text-[25px] text-red-500 mt-[7px] ml-[8px] " />
                              </div>
                            )}
                          </div>
                        ))
                      ) : (
                        <div className=" absolute top-0 left-0 -z-50 w-full h-screen bg-[#f4f5f7] grid  items-center ">
                          <div className=" grid justify-items-center text-center ">
                            <p
                              className="font-normal text-[16px] not-italic
                                             text-[#262626] pb-5 px-4 "
                            >
                              Add a map of your property to quickly locate
                              streets, buildings or landmarks
                            </p>
                            {Manager === "app_manager" ? null : (
                              <div className="w-[100%] flex justify-center ">
                                <AddPhoto
                                  btnName={"Upload Map"}
                                  type={"post"}
                                  userID={item?.ID}
                                  screenType={"details"}
                                  clientname={"proparty"}
                                  updateState={() => setAddPhoto(!addPhoto)}
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )
            )}
        </div>
      )}

      {showPhotoDeletePopup && (
        <DeletePhotoPopup
          deletePhoto={() => deletePhotoapi(photoDeleteID)}
          datashow={showPhotoDeletePopup ? "block" : "hidden"}
          onClicked={() => setShowPhotoDeletePopup(false)}
        />
      )}

      {showPopUp && (
        <PropertyPopUp
          datashow={showPopUp ? "block" : "hidden"}
          onClicked={() => setShowPop(false)}
          value={updatePropartyData}
        />
      )}
    </div>
  );
}
