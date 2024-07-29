import React from "react";
import SubHeader from "../../components/public-com/header";
import Input from "../../components/public-com/form/Input";
import DeletePhotoPopup from "../../components/tenants/details/deletePhotopopup";
import { useState, useEffect } from "react";
import Link from "next/link";
import AddPhoto from "../../components/public-com/form/addDocs";
import { useFormik } from "formik";
import { IoTrashOutline } from "react-icons/io5";
import { toast } from "react-hot-toast";
import Button from "../../components/projects/form/Button";
import { useSelector, useDispatch } from "react-redux";
import { IoCall } from "react-icons/io5";
import { IoFlagSharp } from "react-icons/io5";
import {
  addDocsAPIS,
  createIncidentsAPI,
  updateIncidentsAPI,
} from "../../redux/APIS/API";
import { useRouter } from "next/router";
import SelectPopup from "../../components/incidents/SelectPopup";
import ContractorPop from "../../components/incidents/contractorPop";
import { getIncidentsDetails } from "../../redux/action/incidentsDetails";
import { getContractors } from "../../redux/action/contractors";
import { getTenantsFilter } from "../../redux/action/tenants";
import TanantsLightbox from "../../components/tenants/details/lightbox";
import PreViewPDF from "../../components/tenants/details/PreViewPDF";

function IncidentsForm() {
  const [onSubmitLoader, setOnSubmitLoader] = useState(false);
  const [deleteType, setDeleteType] = useState("");
  const [deleteID, setDeleteID] = useState(true);
  const [photosApi, setPhotosApi] = useState([]);
  const [tenentsApi, setTenantsApi] = useState([]);
  const [lightBox, setLightBox] = useState(false);
  const [imageSrc, setImageSrc] = useState(true);
  const [contractorsApi, setContractorsApi] = useState([]);
  const [showtenantsPopup, setTenantsPopup] = useState(false);
  const [showContractorPopup, setContractorPopup] = useState(false);
  const [showDeletePhotosPopup, setShowDeletePhotosPopup] = useState(false);
  const [showDeleteTenantsPopup, setShowDeleteTenantsPopup] = useState(false);
  const [showDeleteContractorsPopup, setShowDeleteContractorsPopup] =
    useState(false);
  const [pdfUrl, setPdfUrl] = useState("");
  const [showPDFPreview, setShowPDFPreview] = useState(false);

  function onClickPreview(value) {
    setPdfUrl(value);
    setShowPDFPreview(true);
  }

  const router = useRouter();
  const dispatch = useDispatch();

  const IncidentsEditMode = router.query.edit;

  const DeletePopupOpen = (id, type, DataType) => {
    if (DataType === "photos") {
      setDeleteID(id);
      setDeleteType(type);
      setShowDeletePhotosPopup(true);
    }

    if (DataType === "tenants") {
      setDeleteID(id);
      setDeleteType(type);
      setShowDeleteTenantsPopup(true);
    }

    if (DataType === "contractors") {
      setDeleteID(id);
      setDeleteType(type);
      setShowDeleteContractorsPopup(true);
    }
  };

  // get tenents and contractors data
  useEffect(() => {
    let data = {
      posts_per_page: "-1",
      paged: "1",
      sort_by_field: "a-z",
      search_by_keyword: "",
    };

    dispatch(getContractors(data));
    dispatch(getTenantsFilter(data));
  }, [dispatch]);

  const editIncidents = useSelector(
    (state) => state?.incidentsDetails?.incidentsDetails
  );

  const TenantsList = useSelector((state) => state?.tenants?.tenants.data);

  const ContractorList = useSelector(
    (state) => state?.contractors?.contractors?.data
  );

  const userId = useSelector((state) => state.userActive.user?.id);

  // edit mode set items values
  useEffect(() => {
    if (IncidentsEditMode) {
      if (editIncidents.ID) {
        setTenantsApi([...editIncidents.tenants]);
        setContractorsApi([...editIncidents.contractors]);
        setPhotosApi([...editIncidents.photos]);
      } else {
        toast.error("Something is Wrong");
        router.push("/incidents/list");
      }
    } else {
      router.push("/incidents/form");
    }
  }, []);

  const validate = (values) => {
    const errors = {};

    if (!values.title) {
      errors.title = "Please enter Incidents Name";
    }

    return errors;
  };

  const IncidentsFormik = useFormik({
    initialValues: {
      title:
        editIncidents?.post_title && IncidentsEditMode
          ? editIncidents?.post_title
          : "",
      date: editIncidents?.date && IncidentsEditMode ? editIncidents?.date : "",
      detail:
        editIncidents?.post_content && IncidentsEditMode
          ? editIncidents?.post_content
          : "",
      status:
        editIncidents?.status && IncidentsEditMode
          ? editIncidents?.status
          : "Open",
      property:
        editIncidents?.property && IncidentsEditMode
          ? editIncidents?.property
          : "",
      tenant_ids: [],
      contractor_ids: [],
      photos: {
        localImage: [],
        detail: "",
      },
    },
    validate,
    onSubmit: async (values) => {
      try {
        if (IncidentsEditMode === "true") {
          setOnSubmitLoader(true);
          values.incidentId = editIncidents.ID;
          if (values?.tenant_ids.length > 0) {
            const gettenantsID = values?.tenant_ids.map(function (item) {
              return item.ID;
            });

            values.tenant_ids = gettenantsID;
          }

          if (tenentsApi?.length > 0) {
            const gettenantsID = tenentsApi?.map(function (item) {
              return item.ID;
            });
            values.tenant_ids = gettenantsID;
          }

          // for contractors
          if (values?.contractor_ids.length > 0) {
            const getconID = values?.contractor_ids.map(function (item) {
              return item.ID;
            });
            values.contractor_ids = getconID;
          }

          if (contractorsApi?.length > 0) {
            const getconID = contractorsApi?.map(function (item) {
              return item.ID;
            });
            values.contractor_ids = getconID;
          }

          const res = await updateIncidentsAPI(values);

          // if (Object.keys(values?.photos)?.length > 0) {
          //   var formdata = new FormData();
          //   for (var i = 0; i < values?.photos?.localImage.length; i++) {
          //     const imageFile = values?.photos?.localImage[i];
          //     formdata.append(
          //       "upload_media[]",
          //       imageFile.image,
          //       imageFile.image.name
          //     );
          //   }
          //   formdata.append("user_post_id", editIncidents.ID);
          //   formdata.append("author", userId);
          //   formdata.append(
          //     "detail",
          //     values?.photos?.detail ? values?.photos?.detail : ""
          //   );
          //   formdata.append("upload_for", "post");
          //   const addpoes = await addDocsAPIS(formdata);
          //   dispatch(getIncidentsDetails(editIncidents.ID));
          // }


          if (values?.photos?.localImage.length > 0) {
            var formdata = new FormData();

            for (var i = 0; i < values?.photos?.localImage.length; i++) {
              const imageFile = values?.photos?.localImage[i];
              formdata.append(
                "upload_media[]",
                imageFile.image,
                imageFile.image.name
              );
            }

            formdata.append("user_post_id", editIncidents.ID);
            formdata.append("author", userId);
            formdata.append(
              "detail",
              values?.photos?.detail ? values?.photos?.detail : ""
            );
            formdata.append("upload_for", "post");

            const addpoes = await addDocsAPIS(formdata);
            dispatch(getIncidentsDetails(editIncidents.ID));
          }

          dispatch(getIncidentsDetails(editIncidents.ID));

          toast.success(res.data.message);

          setOnSubmitLoader(false);

          router.push("/incidents/details");
        } else {
          setOnSubmitLoader(true);

          // create incidents api data
          // for tenents
          if (values?.tenant_ids.length > 0) {
            const gettenantsID = values?.tenant_ids.map(function (item) {
              return item.ID;
            });
            values.tenant_ids = gettenantsID;
          }
          // for contractors
          if (values?.contractor_ids.length > 0) {
            const getconID = values?.contractor_ids.map(function (item) {
              return item.ID;
            });
            values.contractor_ids = getconID;
          }

          const respon = await createIncidentsAPI(values);

          const resincidentID = respon.data.data.incident_id;

          // if (Object.keys(values?.photos)?.length > 0) {
          //   var formdata = new FormData();
          //   for (var i = 0; i < values?.photos?.localImage.length; i++) {
          //     const imageFile = values?.photos?.localImage[i];
          //     formdata.append(
          //       "upload_media[]",
          //       imageFile.image,
          //       imageFile.image.name
          //     );
          //   }
          //   formdata.append("user_post_id", resincidentID);
          //   formdata.append("author", userId);
          //   formdata.append(
          //     "detail",
          //     values?.photos?.detail ? values?.photos?.detail : ""
          //   );
          //   formdata.append("upload_for", "post");
          //   const addpoes = await addDocsAPIS(formdata);
          // }

          if (values?.photos?.localImage.length > 0) {
            var formdata = new FormData();

            for (var i = 0; i < values?.photos?.localImage.length; i++) {
              const imageFile = values?.photos?.localImage[i];
              formdata.append(
                "upload_media[]",
                imageFile.image,
                imageFile.image.name
              );
            }

            formdata.append("user_post_id", resincidentID);
            formdata.append("author", userId);
            formdata.append(
              "detail",
              values?.photos?.detail ? values?.photos?.detail : ""
            );
            formdata.append("upload_for", "post");

            const addpoes = await addDocsAPIS(formdata);
          }

          toast.success(respon.data.message);
          setOnSubmitLoader(false);

          router.push("/incidents/list");
        }
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
        // console.log("err", error.response);
      }
    },
  });

  // local tenants delete functions
  const deleteTenant = (indexDelete) => {
    const tenant_ids = IncidentsFormik.values.tenant_ids.filter(
      (item, index) => index !== indexDelete
    );
    IncidentsFormik.setFieldValue("tenant_ids", [...tenant_ids]);
    toast.success("Tenants deleted Successfully");
    setShowDeleteTenantsPopup(false);
  };

  // Api tenants delete functions
  const deleteTenantApi = (id) => {
    const tenants = editIncidents.tenants.filter(
      (item, index) => item.ID !== id
    );
    setTenantsApi([...tenants]);

    toast.success("Tenants deleted Successfully");
    setShowDeleteTenantsPopup(false);
  };

  // local Contractors delete functions
  const deleteContractor = (indexDelete) => {
    const contractor_ids = IncidentsFormik.values.contractor_ids.filter(
      (item, index) => index !== indexDelete
    );
    IncidentsFormik.setFieldValue("contractor_ids", [...contractor_ids]);
    toast.success("Contractors deleted Successfully");
    setShowDeleteContractorsPopup(false);
  };

  // Api Contractors delete functions
  const deleteContractorApi = (id) => {
    const contractors = editIncidents.contractors.filter(
      (item, index) => item.ID !== id
    );

    setContractorsApi([...contractors]);
    toast.success("Contractors deleted Successfully");
    setShowDeleteContractorsPopup(false);
  };

  const deletePhoto = (indexDelete) => {
    const currentPhotos = IncidentsFormik.values.photos.localImage;

    if (indexDelete >= 0 && indexDelete < currentPhotos.length) {
      const updatedPhotos = currentPhotos.filter(
        (item, index) => index !== indexDelete
      );
      IncidentsFormik.setFieldValue("photos", {
        ...IncidentsFormik.values.photos,
        localImage: updatedPhotos,
      });

      toast.success("Photo deleted Successfully");
    } else {
      console.log("Invalid index to delete");
    }

    setShowDeletePhotosPopup(false);
  };

  const OpenLight = (img) => {
    setImageSrc(img);
    setLightBox(true);
  };

  return (
    <>
      <div className="App">
        {IncidentsEditMode ? (
          <SubHeader title={"Edit Incidents"} backUrl={"/incidents/details"} />
        ) : (
          <SubHeader title={"Add Incidents"} backUrl={"/incidents/list"} />
        )}

        <div className="px-4 pb-16 pt-6 ">
          <div>
            <div>
              <div className="pb-4">
                <span className="text-[20px] font-normal text-[#262626] Oswald-font ">
                  Incident Info
                </span>
                <hr className="my-1 border-t-2" />
              </div>

              <div className="grid grid-cols-1 gap-2">
                <Input
                  Required={true}
                  label={"Incident Title"}
                  name={"title"}
                  placeholder={"Incident Title"}
                  formik={IncidentsFormik}
                  validation={IncidentsFormik.errors.title}
                />
                <div className="flex w-[70%]">
                  <div>
                    <Input
                      label={"Incident Date"}
                      name={"date"}
                      placeholder={"Incident Date"}
                      type={"date"}
                      formik={IncidentsFormik}
                    />
                  </div>
                </div>

                <div className="flex ">
                  <div className="w-full">
                    <label className="text-[12px] text-gray-500">
                      Incident Details
                    </label>
                    <textarea
                      name="detail"
                      id="detail"
                      placeholder="Enter details about this incident"
                      onChange={IncidentsFormik.handleChange}
                      value={IncidentsFormik.values.detail}
                      rows="4"
                      className="font-normal not-italic h-[98px] w-full text-[16px] py-[6px] px-[5px] rounded-[6px]
                                    bg-[#FFF] text-[#000] border-[0.5px] border-solid border-[#A6A6A6] focus:border-black focus:outline-none"
                    />
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-full">
                    <Input
                      label={"Property"}
                      placeholder={"Default Property"}
                      name={"property"}
                      formik={IncidentsFormik}
                    />

                    <div className="text-[12px] font-normal text-[#000] mt-[15px]">
                      Choose Status
                    </div>

                    <div className="flex items-center gap-[15px]">
                      <div className=" h-[35px]  flex items-center ">
                        <input
                          onChange={IncidentsFormik.handleChange}
                          value="Open"
                          type="radio"
                          id="status"
                          name="status"
                          checked={IncidentsFormik.values.status === "Open"}
                          className="h-[28px] w-[28px] border-[#A6A6A6]  rounded-[6px] "
                        />
                        <div className="text-[16px] ml-[5px] font-normal not-italic text-[#262626]">
                          Open
                        </div>
                      </div>
                      <div className=" py-[10px] flex items-center">
                        <input
                          onChange={IncidentsFormik.handleChange}
                          value="Reported"
                          type="radio"
                          id="status"
                          name="status"
                          checked={IncidentsFormik.values.status === "Reported"}
                          className="h-[28px] w-[28px] border-[#A6A6A6] rounded-[6px] "
                        />
                        <div className="text-[16px] ml-[5px] text-[#262626]  font-normal not-italic">
                          Reported
                        </div>
                      </div>
                      <div className="  flex items-center">
                        <input
                          onChange={IncidentsFormik.handleChange}
                          value="Closed"
                          type="radio"
                          id="status"
                          name="status"
                          checked={IncidentsFormik.values.status === "Closed"}
                          className="h-[28px] w-[28px] border-[#A6A6A6]  rounded-[6px] "
                        />
                        <div className="text-[16px] ml-[5px] text-[#262626]  font-normal not-italic">
                          Closed
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Linked Tenants Code start */}

                <div>
                  <div className="">
                    <span className="text-[20px] font-normal text-[#262626] Oswald-font">
                      Linked Tenants
                    </span>
                    <hr className="my-1 border-t-2" />
                    <span className="text-[14px] font-normal not-italic text-[#262626]">
                      Add Tenants associated with this incident
                    </span>
                  </div>
                  <div
                    className="flex justify-end"
                    onClick={() => setTenantsPopup(true)}
                  >
                    <Button
                      name={"Add Tenants"}
                      boxShadow={"shadow-[0_0px_30px_rgba(0,0,0,0.2)]"}
                    />
                  </div>

                  <div className="mt-4">
                    {IncidentsFormik?.values?.tenant_ids?.length > 0 &&
                      IncidentsFormik?.values?.tenant_ids?.map(
                        (item, index) => (
                          <div
                            key={index}
                            className="flex w-full gap-[10px] mb-3"
                          >
                            <div className="w-[80%]">
                              <span className="text-[16px] font-normal text-[#000] ">
                                {item?.name}
                              </span>
                            </div>
                            <div
                              className="text-center w-[20%]"
                              onClick={() => {
                                DeletePopupOpen(
                                  index,
                                  "deleteTenant",
                                  "tenants"
                                );
                              }}
                            >
                              <div className="grid grid-cols-3 gap-[5px] items-center  justify-center  w-[4.375rem] h-[20px]">
                                <div className=" text-[#D64F52]  items-center flex justify-center">
                                  <svg
                                    width="13"
                                    height="14"
                                    viewBox="0 0 13 14"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      clipRule="evenodd"
                                      d="M8.58341 1.58337L11.8042 1.58337C12.0344 1.58337 12.2209 1.76992 12.2209 2.00004C12.2209 2.23016 12.0344 2.41671 11.8042 2.41671L1.08341 2.41671C0.853296 2.41671 0.666748 2.23016 0.666748 2.00004C0.666748 1.76992 0.853296 1.58337 1.08341 1.58337L4.41675 1.58337V1.16671C4.4146 0.737142 4.73933 0.376326 5.16675 0.333374L7.75008 0.333374C8.21032 0.333374 8.58341 0.70647 8.58341 1.16671V1.58337ZM1.50008 12.4167L1.50008 3.25004L11.5001 3.25004L11.5001 12.4167C11.5079 12.7441 11.3839 13.0609 11.1559 13.2959C10.9279 13.531 10.615 13.6646 10.2876 13.6667L2.69175 13.6667C2.36793 13.6591 2.06043 13.5231 1.83693 13.2886C1.61343 13.0542 1.49225 12.7405 1.50008 12.4167ZM5.25008 11.5834H4.41675L4.41675 5.33337H5.25008L5.25008 11.5834ZM7.75008 11.5834H8.58341L8.58341 5.33337H7.75008L7.75008 11.5834Z"
                                      fill="#D64F52"
                                    />
                                  </svg>
                                </div>
                                <div className="justify-center col-span-2 grid col-start-2 text-[12px] items-center leading-5 not-italic font-bold text-[#D64F52]">
                                  Delete
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                      )}

                    {tenentsApi?.length > 0 &&
                      tenentsApi?.map((item, index) => (
                        <div
                          key={index}
                          className="flex w-full gap-[10px] mb-3"
                        >
                          <div className="w-[80%]">
                            <span className="text-[16px] font-normal text-[#000] ">
                              {item?.company_name}
                            </span>
                          </div>
                          <div
                            className="text-center w-[20%]"
                            onClick={() => {
                              DeletePopupOpen(
                                item?.ID,
                                "deleteTenantApi",
                                "tenants"
                              );
                            }}
                          >
                            <div className="grid grid-cols-3 gap-[5px] items-center  justify-center  w-[4.375rem] h-[20px]">
                              <div className=" text-[#D64F52]  items-center flex justify-center">
                                <svg
                                  width="13"
                                  height="14"
                                  viewBox="0 0 13 14"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M8.58341 1.58337L11.8042 1.58337C12.0344 1.58337 12.2209 1.76992 12.2209 2.00004C12.2209 2.23016 12.0344 2.41671 11.8042 2.41671L1.08341 2.41671C0.853296 2.41671 0.666748 2.23016 0.666748 2.00004C0.666748 1.76992 0.853296 1.58337 1.08341 1.58337L4.41675 1.58337V1.16671C4.4146 0.737142 4.73933 0.376326 5.16675 0.333374L7.75008 0.333374C8.21032 0.333374 8.58341 0.70647 8.58341 1.16671V1.58337ZM1.50008 12.4167L1.50008 3.25004L11.5001 3.25004L11.5001 12.4167C11.5079 12.7441 11.3839 13.0609 11.1559 13.2959C10.9279 13.531 10.615 13.6646 10.2876 13.6667L2.69175 13.6667C2.36793 13.6591 2.06043 13.5231 1.83693 13.2886C1.61343 13.0542 1.49225 12.7405 1.50008 12.4167ZM5.25008 11.5834H4.41675L4.41675 5.33337H5.25008L5.25008 11.5834ZM7.75008 11.5834H8.58341L8.58341 5.33337H7.75008L7.75008 11.5834Z"
                                    fill="#D64F52"
                                  />
                                </svg>
                              </div>
                              <div className="justify-center col-span-2 grid col-start-2 text-[12px] items-center leading-5 not-italic font-bold text-[#D64F52]">
                                Delete
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}

                    {showtenantsPopup && (
                      <SelectPopup
                        Popuptitle={"Choose Tenants"}
                        datashow={showtenantsPopup ? "block" : "hidden"}
                        onClicked={() => setTenantsPopup(false)}
                        ListData={TenantsList}
                        formik={IncidentsFormik}
                        clientName={"tenants"}
                      />
                    )}

                    {showDeleteTenantsPopup && (
                      <DeletePhotoPopup
                        deletePhoto={() => {
                          if (deleteType === "deleteTenant") {
                            deleteTenant(deleteID);
                          } else if (deleteType === "deleteTenantApi") {
                            deleteTenantApi(deleteID);
                          } else {
                            toast.error("try again");
                          }
                        }}
                        datashow={showDeleteTenantsPopup ? "block" : "hidden"}
                        onClicked={() => setShowDeleteTenantsPopup(false)}
                      />
                    )}
                  </div>
                </div>
                {/* Linked Tenants Code end */}

                {/* Linked Contractors Code start */}
                <div>
                  <div className="">
                    <span className="text-[20px] font-normal text-[#262626] Oswald-font">
                      Linked Contractors
                    </span>
                    <hr className="my-1 border-t-2" />
                    <span className="text-[14px] font-normal not-italic text-[#262626]">
                      Add Contractors associated with this incident
                    </span>
                  </div>
                  <div
                    className="flex justify-end "
                    onClick={() => setContractorPopup(true)}
                  >
                    <Button
                      name={"Add Contractors"}
                      boxShadow={"shadow-[0_0px_30px_rgba(0,0,0,0.2)]"}
                    />
                  </div>

                  {/* locally */}
                  <div className="mt-4">
                    {IncidentsFormik?.values?.contractor_ids?.length > 0 &&
                      IncidentsFormik?.values?.contractor_ids?.map(
                        (item, index) => (
                          <div
                            key={index}
                            className="flex w-full gap-[10px] mb-3"
                          >
                            <div className="w-[80%]">
                              <span className="text-[16px] font-normal text-[#000] ">
                                {item?.name}
                              </span>
                            </div>
                            <div
                              className="text-center w-[20%]"
                              onClick={() => {
                                DeletePopupOpen(
                                  index,
                                  "deleteContractor",
                                  "contractors"
                                );
                              }}
                            >
                              <div className="grid grid-cols-3 gap-[5px] items-center  justify-center  w-[4.375rem] h-[20px]">
                                <div className=" text-[#D64F52]  items-center flex justify-center">
                                  <svg
                                    width="13"
                                    height="14"
                                    viewBox="0 0 13 14"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      clipRule="evenodd"
                                      d="M8.58341 1.58337L11.8042 1.58337C12.0344 1.58337 12.2209 1.76992 12.2209 2.00004C12.2209 2.23016 12.0344 2.41671 11.8042 2.41671L1.08341 2.41671C0.853296 2.41671 0.666748 2.23016 0.666748 2.00004C0.666748 1.76992 0.853296 1.58337 1.08341 1.58337L4.41675 1.58337V1.16671C4.4146 0.737142 4.73933 0.376326 5.16675 0.333374L7.75008 0.333374C8.21032 0.333374 8.58341 0.70647 8.58341 1.16671V1.58337ZM1.50008 12.4167L1.50008 3.25004L11.5001 3.25004L11.5001 12.4167C11.5079 12.7441 11.3839 13.0609 11.1559 13.2959C10.9279 13.531 10.615 13.6646 10.2876 13.6667L2.69175 13.6667C2.36793 13.6591 2.06043 13.5231 1.83693 13.2886C1.61343 13.0542 1.49225 12.7405 1.50008 12.4167ZM5.25008 11.5834H4.41675L4.41675 5.33337H5.25008L5.25008 11.5834ZM7.75008 11.5834H8.58341L8.58341 5.33337H7.75008L7.75008 11.5834Z"
                                      fill="#D64F52"
                                    />
                                  </svg>
                                </div>
                                <div className="justify-center col-span-2 grid col-start-2 text-[12px] items-center leading-5 not-italic font-bold text-[#D64F52]">
                                  Delete
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                      )}

                    {contractorsApi?.length > 0 &&
                      contractorsApi?.map((item, index) => (
                        <div
                          key={index}
                          className="flex w-full gap-[10px] mb-3"
                        >
                          <div className="w-[80%]">
                            <span className="text-[16px] font-normal text-[#000] ">
                              {item.company_name.length > 0
                                ? item.company_name
                                : item.user_login.split("@")[0]}
                            </span>
                          </div>
                          <div
                            className="text-center w-[20%]"
                            onClick={() => {
                              DeletePopupOpen(
                                item?.ID,
                                "deleteContractorApi",
                                "contractors"
                              );
                            }}
                          >
                            <div className="grid grid-cols-3 gap-[5px] items-center  justify-center  w-[4.375rem] h-[20px]">
                              <div className=" text-[#D64F52]  items-center flex justify-center">
                                <svg
                                  width="13"
                                  height="14"
                                  viewBox="0 0 13 14"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M8.58341 1.58337L11.8042 1.58337C12.0344 1.58337 12.2209 1.76992 12.2209 2.00004C12.2209 2.23016 12.0344 2.41671 11.8042 2.41671L1.08341 2.41671C0.853296 2.41671 0.666748 2.23016 0.666748 2.00004C0.666748 1.76992 0.853296 1.58337 1.08341 1.58337L4.41675 1.58337V1.16671C4.4146 0.737142 4.73933 0.376326 5.16675 0.333374L7.75008 0.333374C8.21032 0.333374 8.58341 0.70647 8.58341 1.16671V1.58337ZM1.50008 12.4167L1.50008 3.25004L11.5001 3.25004L11.5001 12.4167C11.5079 12.7441 11.3839 13.0609 11.1559 13.2959C10.9279 13.531 10.615 13.6646 10.2876 13.6667L2.69175 13.6667C2.36793 13.6591 2.06043 13.5231 1.83693 13.2886C1.61343 13.0542 1.49225 12.7405 1.50008 12.4167ZM5.25008 11.5834H4.41675L4.41675 5.33337H5.25008L5.25008 11.5834ZM7.75008 11.5834H8.58341L8.58341 5.33337H7.75008L7.75008 11.5834Z"
                                    fill="#D64F52"
                                  />
                                </svg>
                              </div>
                              <div className="justify-center col-span-2 grid col-start-2 text-[12px] items-center leading-5 not-italic font-bold text-[#D64F52]">
                                Delete
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}

                    {showContractorPopup && (
                      <SelectPopup
                        Popuptitle={"Choose Contractor"}
                        datashow={showContractorPopup ? "block" : "hidden"}
                        onClicked={() => setContractorPopup(false)}
                        clientName={"contractors"}
                        ListData={ContractorList}
                        formik={IncidentsFormik}
                      />
                    )}

                    {showDeleteContractorsPopup && (
                      <DeletePhotoPopup
                        deletePhoto={() => {
                          if (deleteType === "deleteContractor") {
                            deleteContractor(deleteID);
                          } else if (deleteType === "deleteContractorApi") {
                            deleteContractorApi(deleteID);
                          } else {
                            toast.error("try again");
                          }
                        }}
                        datashow={
                          showDeleteContractorsPopup ? "block" : "hidden"
                        }
                        onClicked={() => setShowDeleteContractorsPopup(false)}
                      />
                    )}
                  </div>
                </div>
                {/* Linked Contractors Code end */}

                <div className="pb-4">
                  <span className="text-[20px] font-normal text-[#262626] Oswald-font">
                    Photos / Documents
                  </span>
                  <hr className="my-1 border-t-2" />
                </div>

                <div className="flex justify-end">
                  <AddPhoto btnName={"Add Files"} formik={IncidentsFormik} />
                </div>

                <div className="grid mt-[2px] grid-cols-3 gap-x-[10px] gap-y-[15px] mb-[15px]">
                  {IncidentsFormik?.values?.photos?.localImage.map(
                    (item, index) => (
                      <div
                        key={index}
                        className="h-[107px] w-[109px] shadow-sm rounded-md group relative "
                      >
                        {item.image.type.includes("image") ? (
                          <img
                            src={URL.createObjectURL(item?.image)}
                            alt={"Photo"}
                            onClick={() =>
                              OpenLight(URL.createObjectURL(item.image))
                            }
                            className="w-full object-cover  rounded-md object-center h-full"
                          />
                        ) : (
                          <img
                            src={"/assetes/icon/rectangle.svg"}
                            onClick={() =>
                              onClickPreview(URL.createObjectURL(item?.image))
                            }
                            className="w-full object-cover  rounded-md object-center h-full"
                            alt=""
                          />
                        )}

                        <div
                          className="absolute bg-white shadow-lg top-1 right-1 rounded-[10px] w-[40px] h-[40px] text-center"
                          onClick={() =>
                            DeletePopupOpen(index, "deletePhoto", "photos")
                          }
                        >
                          <IoTrashOutline className="text-[25px] text-red-500 mt-[7px] ml-[8px] " />
                        </div>
                      </div>
                    )
                  )}
                  {photosApi?.length > 0 &&
                    photosApi?.map((item, index) => (
                      <div
                        key={index}
                        className="h-[107px] w-[109px] shadow-sm rounded-md group relative "
                      >
                        {item?.photo_src?.includes("pdf") ? (
                          <img
                            src={"/assetes/icon/rectangle.svg"}
                            onClick={() => onClickPreview(item?.photo_src)}
                            className="w-full object-cover  rounded-md object-center h-full"
                            alt=""
                          />
                        ) : (
                          <img
                            src={item?.photo_src}
                            alt={"Photo"}
                            onClick={() => OpenLight(item?.photo_src)}
                            className="w-full object-cover  rounded-md object-center h-full"
                          />
                        )}

                        <div
                          className="absolute bg-white shadow-lg top-1 right-1 rounded-[10px] w-[30px] h-[30px] text-center"
                          onClick={() =>
                            DeletePopupOpen(
                              item.photo_id,
                              "deletePhotoAPI",
                              "photos"
                            )
                          }
                        >
                          <IoTrashOutline className="text-[20px] text-red-500 mt-[5px] ml-[5px] " />
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              {lightBox && (
                <TanantsLightbox
                  src={imageSrc}
                  datashow={lightBox ? "block" : "hidden"}
                  close={() => setLightBox(false)}
                />
              )}

              {showPDFPreview && (
                <PreViewPDF
                  datashow={showPDFPreview}
                  onClick={() => setShowPDFPreview(false)}
                  PDFURL={pdfUrl}
                />
              )}

              {showDeletePhotosPopup && (
                <DeletePhotoPopup
                  deletePhoto={() => {
                    deletePhoto(deleteID);
                  }}
                  datashow={showDeletePhotosPopup ? "block" : "hidden"}
                  onClicked={() => setShowDeletePhotosPopup(false)}
                />
              )}
            </div>
          </div>
        </div>

        <div className="fixed bottom-0 left-0 w-full shadow-[1px_-10px_13px_2px_#0000000d] ">
          <div className="grid grid-cols-2 w-full bg-[#fff] ">
            {onSubmitLoader ? (
              <span
                className="px-4 py-2 w-full mx-auto text-[22px] font-normal text-[#262626]
                            bg-[#4DE060] h-[70px] grid justify-center items-center "
              >
                <div
                  className="animate-spin inline-block  w-[25px] h-[25px] rounded-full border-[2px] border-r-white
                               border-l-[#ffffff75] border-y-[#ffffff75] "
                ></div>
              </span>
            ) : (
              <div className="flex justify-center">
                <div className="w-full flex justify-center h-[70px]">
                  <button
                    type="submit"
                    className="text-[#262626] font-normal not-italic text-[1.375rem] px-4 py-2 w-full mx-auto bg-[#4DE060] "
                    onClick={() => IncidentsFormik.handleSubmit()}
                  >
                    {editIncidents ? "Update" : "Save"}
                  </button>
                </div>
              </div>
            )}
            {IncidentsEditMode ? (
              <Link href="/incidents/details">
                <div className="flex justify-center">
                  <div className="px-4 py-2 w-full items-center mx-auto flex justify-center bg-[#CCD9E6]  text-[#262626] font-normal not-italic text-[1.375rem]">
                    <span className="">Cancel</span>
                  </div>
                </div>
              </Link>
            ) : (
              <Link href="/incidents/list">
                <div className="flex justify-center">
                  <div className="px-4 py-2 w-full mx-auto items-center flex justify-center bg-[#CCD9E6] text-[#262626] font-normal not-italic text-[1.375rem]">
                    <span className="">Cancel</span>
                  </div>
                </div>
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default IncidentsForm;
