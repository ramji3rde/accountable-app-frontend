import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns";
import Button from "../../components/projects/form/Button";
import ProjectDecline from "../../components/projects/form/ProjectDecline";
import { useRouter } from "next/router";
import axios from "axios";
import { token } from "../../utils";
import toast from "react-hot-toast";
import SubHeader from "../../components/public-com/header";
import Image from "next/image";
import logo from "../../public/smi-logo.png";
import TanantsLightbox from "../../components/tenants/details/lightbox";
import PreViewPDF from "../../components/tenants/details/PreViewPDF";

const baseAPIURL = "https://dev.api.getaccountableapp.com/wp-json/";

export default function Projectview() {
  const [showPopup, setShowPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [IDdata, setIDData] = useState([]);
  const [projectItem, setProjectItems] = useState([]);
  const [profileData, setProfileData] = useState([]);
  const [lightBox, setLightBox] = useState(false);
  const [imageSrc, setImageSrc] = useState(true);
  const [pdfUrl, setPdfUrl] = useState("");
  const [showPDFPreview, setShowPDFPreview] = useState(false);

  const OpenLight = (img) => {
    setImageSrc(img);
    setLightBox(true);
  };

  function closePopup() {
    setShowPopup(false);
  }

  function openPopup() {
    setShowPopup(true);
  }

  useEffect(() => {
    if (IDdata.length > 0) {
      validateBid();
    }
  }, [IDdata]);

  async function validateBid() {
    try {
      let data = {
        project_id: IDdata[0],
        contractor_id: IDdata[1],
      };
      const response = await axios.post(
        baseAPIURL + `api/v1/bid/validate`,
        data,
        token(access_token)
      );

      if (response.data.data.redirect === true) {
        router.push("/bid/alreadyCreated");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  const router = useRouter();
  const { access_token, access_data } = router.query;

  useEffect(() => {
    if (access_data) {
      var decodedString = atob(access_data).split("@");

      setIDData(decodedString);
    }
  }, [access_data]);

  function onClickPreview(value) {
    setPdfUrl(value);
    setShowPDFPreview(true);
  }

  useEffect(() => {
    try {
      if (IDdata.length > 0) {
        (async () => {
          let ProjectID = { project_id: IDdata[0], contractor_id: IDdata[1] };
          const responData = await axios.post(
            baseAPIURL + `api/v1/project/get_single_project`,
            ProjectID,
            token(access_token)
          );
          setProjectItems(responData.data.data);
          const userProfileApis = await axios.get(
            baseAPIURL + `api/v1/get-profile`,
            token(access_token)
          );
          // console.log(userProfileApis);
          setProfileData(userProfileApis.data.data[0]);

          setIsLoading(false);
        })();
      }
    } catch (error) {
      console.log(error);
    }
  }, [IDdata]);

  const DetailsView = {};

  async function NotInterested() {
    try {
      let NotInterData = {
        project_id: IDdata[0],
        contractor_id: IDdata[1],
      };
      const InterRespon = await axios.post(
        baseAPIURL + `api/v1/project/not_interested`,
        NotInterData,
        token(access_token)
      );
      toast.success(InterRespon.data.message);
      setShowPopup(false);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      {/* <Image src={logo} width={23} height={24}/> */}
      <SubHeader title={"Accountable: Property Management"} />
      <div className="px-4 ">
        {isLoading ? (
          <div className="fixed w-full h-[100%] top-0 left-0 background-white z-50">
            <div className="w-full h-[100%] grid justify-center items-center">
              <div className="text-center">
                <div>
                  <div className="animate-spin inline-block w-8 h-8 rounded-full border-[0.25em] border-r-[#000]"></div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div>
              <div className="grid w-full ">
                <div className="flex w-full items-center">
                  <div className="w-full grid mb-8 mt-2">
                    <div>
                      <span className="text-[11px] font-[400] text-[#595959] pr-2 ">
                        #{projectItem?.ID}
                      </span>
                      <span className="text-[11px] font-[400] text-[#595959]  ">
                        {projectItem?.project_date &&
                          format(
                            new Date(projectItem?.project_date),
                            "dd/MM/yyyy"
                          )}{" "}
                      </span>
                    </div>
                    <div className="flex gap-2 asdasd justify-between items-center ">
                      <h1 className="text-[16px] font-[700]  not-italic text-[#262626]">
                        {projectItem?.project_name}
                      </h1>
                    </div>

                    {/* <hr className="my-1 border-t-2" /> */}

                    <span className="text-[16px] font-[400] text-black-400 not-italic leading-5 text-[#262626]">
                      {projectItem.project_detail}
                    </span>

                    <div className="py-4">
                      <span className="text-[20px] font-[400] Oswald-font ">
                        Photos
                      </span>
                      <hr className="my-1 border-t-2" />
                    </div>

                    <div className="grid grid-cols-3 gap-1 ">
                      {projectItem.photos?.map((item, index) => (
                        <div key={index}>
                          <div className="w-[109px] h-[107px] ">
                            {item?.photo_src.includes("pdf") ? (
                              <>
                                <img
                                  src={"/assetes/icon/rectangle.svg"}
                                  onClick={() =>
                                    onClickPreview(item?.photo_src)
                                  }
                                  className="w-full object-cover  rounded-md object-center h-full"
                                  alt=""
                                />
                              </>
                            ) : (
                              <img
                                src={item?.photo_src}
                                onClick={() => OpenLight(item?.photo_src)}
                                className="h-full object-cover shadow-lg rounded-md object-center w-full"
                              />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* profile data here */}
                    <div className="pt-4 pb-2">
                      <span className="text-[20px] font-[400] Oswald-font ">
                        Contact Details
                      </span>
                      <hr className="my-1 border-t-2" />
                    </div>

                    <div className="grid grid-cols-1 gap-1 ">
                      <div>
                        <h1 className="text-[11px] font-[400] text-[#595959]">
                          Property Name
                        </h1>
                        <h1 className="text-[16px] font-[400] text-[#262626]">
                          {profileData.property_name}
                        </h1>
                      </div>

                      <div>
                        <h1 className="text-[11px] font-[400] text-[#595959]">
                          Contact Name
                        </h1>
                        <h1 className="text-[16px] font-[400] text-[#262626]">
                          {profileData.first_name + " " + profileData.last_name}
                        </h1>
                      </div>

                      <div>
                        <h1 className="text-[11px] font-[400] text-[#595959]">
                          Contact Email
                        </h1>
                        <h1 className="text-[16px] font-[400] text-[#262626]">
                          {profileData.user_email}
                        </h1>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 w-full justify-items-center my-10">
                      <div className="w-full grid gap-2  text-center">
                        <Button
                          href={() =>
                            router.push(
                              `/bid/form?access_token=${access_token}&access_data=${access_data}`
                            )
                          }
                          name={"Bid on project"}
                        />
                        <Button
                          href={openPopup}
                          bg={"bg-sky-100"}
                          color={" black"}
                          name={"I’m not interested"}
                        />
                      </div>
                    </div>
                    {showPopup && (
                      <ProjectDecline
                        datashow={showPopup ? "block" : "hidden"}
                        firstClick={NotInterested}
                        onClicked={closePopup}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {showPDFPreview && (
        <PreViewPDF
          datashow={showPDFPreview}
          onClick={() => setShowPDFPreview(false)}
          PDFURL={pdfUrl}
        />
      )}

      {lightBox && (
        <TanantsLightbox
          src={imageSrc}
          datashow={lightBox ? "block" : "hidden"}
          close={() => setLightBox(false)}
        />
      )}
    </>
  );
}
