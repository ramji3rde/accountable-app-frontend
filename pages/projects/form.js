import SubHeader from "../../components/public-com/header";
import Link from "next/link";
import Input from "../../components/public-com/form/Input";
import { useFormik } from "formik";
import { IoTrashOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import DeletePhotoPopup from "../../components/tenants/details/deletePhotopopup";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import {
  addDocsAPIS,
  assignContractorAPI,
  assignTenantsAPI,
  deleteProjectPhotoAPI,
  EditProjectAPI,
  postProjectsAPI,
  postProjectsPhotosAPI,
  removeAssignContractorAPI,
  removeAssignTenantsAPI,
} from "../../redux/APIS/API";
import Select from "../../components/public-com/form/Select";
import { useRouter } from "next/router";
import { ProjectDetail } from "../../redux/action/projectDetails";
import { useDispatch } from "react-redux";
import Button from "../../components/projects/form/Button";
import DeletePopup from "../../components/tenants/deletepopup";
import { resetAssignContractors } from "../../redux/action/resetAssignContractors";
import { deleteAssignContractors } from "../../redux/action/deleteAssignContractors";
import { resetAssignTenants } from "../../redux/action/resetAssignTenants";
import { deleteAssignTenants } from "../../redux/action/deleteAssignTenants";
import AlignTenant from "../../components/projects/alignTenant";
import AddPhoto from "../../components/public-com/form/addDocs";
import PreViewPDF from "../../components/tenants/details/PreViewPDF";

function Projectform() {
  const [showDeletePhotosPopup, setShowDeletePhotosPopup] = useState(false);
  const [showDeleteContractorsPopup, setShowContractorsDeletePopup] =
    useState(false);
  const [showDeleteTenantsPopup, setShowTenantsDeletePopup] = useState(false);
  const [deleteID, setDeleteID] = useState(true);
  const [deleteType, setDeleteType] = useState("");
  const [photosApi, setPhotos] = useState([]);
  const [showPopup, setShowPopup] = useState(true);
  const [ProjectLoader, setProjectLoader] = useState(false);
  const [pdfUrl, setPdfUrl] = useState("");
  const [showPDFPreview, setShowPDFPreview] = useState(false);

  const open = () => {
    setShowPopup(false);
  };

  const close = () => {
    setShowPopup(true);
  };

  const router = useRouter();
  const dispatch = useDispatch();

  const DeletePopupClose = () => {
    setShowDeletePhotosPopup(false);
  };

  const item = useSelector((state) => state.projectDetails.details?.data?.data);

  const userId = useSelector((state) => state.userActive?.user?.id);

  const getAssignContractors = useSelector(
    (state) => state?.getAssignContractors?.getAssignContractors
  );
  const getAssignTenants = useSelector(
    (state) => state?.assignTenants?.getAssignTenants
  );

  const editProject = useSelector(
    (state) => state.projectDetails.details?.data?.data
  );

  const ProjectEdit = router.query.edit;

  // edit mode set items values
  useEffect(() => {
    if (ProjectEdit) {
      if (editProject.ID) {
        setPhotos([...editProject.photos]);
      } else {
        toast.error("Something is Wrong");
        router.push("/projects/list");
      }
    } else {
      router.push("/projects/form");
    }
  }, []);

  // validation conditon function
  const validate = (values) => {
    const errors = {};

    if (!values.project_name) {
      errors.project_name = "Please enter Project Name";
    }

    return errors;
  };

  // formik function on form submit
  const ProjectsFormik = useFormik({
    initialValues: {
      author: "" + userId,
      status:
        editProject?.status && ProjectEdit
          ? editProject?.status
          : "In Progress",
      services:
        editProject?.services && ProjectEdit ? editProject?.services : "",
      project_name:
        editProject?.project_name && ProjectEdit
          ? editProject?.project_name
          : "",
      project_date:
        editProject?.project_date && ProjectEdit
          ? editProject?.project_date
          : "",
      project_detail:
        editProject?.project_detail && ProjectEdit
          ? editProject?.project_detail
          : "",
      photos: {
        localImage: [],
        detail: "",
      },
    },
    validate,
    onSubmit: async (values) => {
      try {
        if (ProjectEdit === "true") {
          setProjectLoader(true);
          const editProjectID = editProject.ID;
          values.project_id = editProject.ID;
          const respon = await EditProjectAPI(values);

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

            formdata.append("user_post_id", editProjectID);
            formdata.append("author", userId);
            formdata.append(
              "detail",
              values?.photos?.detail ? values?.photos?.detail : ""
            );
            formdata.append("upload_for", "post");

            const addpoes = await addDocsAPIS(formdata);
            dispatch(ProjectDetail(ProjectIDD));
          }

          if (getAssignContractors) {
            getAssignContractors.map(async (item) => {
              item.project_id = "" + editProjectID;
              const respon = await assignContractorAPI(item);
            });
          }

          if (getAssignTenants) {
            getAssignTenants.map(async (item) => {
              item.project_id = "" + editProjectID;
              const respon = await assignTenantsAPI(item);
            });
          }

          const ProjectIDD = { project_id: editProjectID };

          dispatch(ProjectDetail(ProjectIDD));
          dispatch(resetAssignContractors());
          dispatch(resetAssignTenants());
          setProjectLoader(false);
          toast.success("Project Update Successfully");
          router.push("/projects/details");
        } else {
          setProjectLoader(true);
          const respon = await postProjectsAPI(values);

          toast.success(respon.data.message);
          const Addproject_id = respon.data.data.project_id;

          const data = {
            project_id: "" + Addproject_id,
            author: "" + userId,
            photos: values.photos,
          };

          if (getAssignContractors) {
            getAssignContractors.map(async (item) => {
              item.project_id = "" + Addproject_id;
              const respon = await assignContractorAPI(item);
            });
          }

          if (getAssignTenants) {
            getAssignTenants.map(async (item) => {
              item.project_id = "" + Addproject_id;
              const respon = await assignTenantsAPI(item);
            });
          }

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

            formdata.append("user_post_id", Addproject_id);
            formdata.append("author", userId);
            formdata.append(
              "detail",
              values?.photos?.detail ? values?.photos?.detail : ""
            );
            formdata.append("upload_for", "post");

            const addpoes = await addDocsAPIS(formdata);
          }

          dispatch(resetAssignContractors());
          dispatch(resetAssignTenants());
          setProjectLoader(false);
          toast.success("Project Create Successfully");
          router.push("/projects/list");
        }
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
        console.log("err", error.response);
      }
    },
  });

  const DeletePopupOpen = (id, type, Datatype) => {
    if (Datatype === "photo") {
      setDeleteID(id);
      setDeleteType(type);
      setShowDeletePhotosPopup(true);
    }

    if (Datatype === "assignContractors") {
      setDeleteID(id);
      setDeleteType(type);
      setShowContractorsDeletePopup(true);
    }

    if (Datatype === "assignTenants") {
      setDeleteID(id);
      setDeleteType(type);
      setShowTenantsDeletePopup(true);
    }
  };

  // delete assign Tenants in local
  const deleteTenants = (item) => {
    dispatch(deleteAssignTenants(item));
    setShowTenantsDeletePopup(false);
    toast.success("Assign Tenants Delete Successfully");
  };

  // delete assign Tenants in APIS
  const deleteTenantsAPI = async (item) => {
    let data = {
      project_id: editProject.ID,
      tenant_ids: [Number(item)],
    };
    const res = await removeAssignTenantsAPI(data);

    let getProjectID = { project_id: editProject.ID };
    dispatch(ProjectDetail(getProjectID));
    setShowTenantsDeletePopup(false);
    toast.success("Assign Tenants Delete Successfully");
  };

  // delete assign contractors in local
  const deleteContractors = (item) => {
    dispatch(deleteAssignContractors(item));
    setShowContractorsDeletePopup(false);
    toast.success("Assign Contractor Delete Successfully");
  };

  // delete assign contractors in APIS
  const deleteContractorsAPI = async (item) => {
    let data = {
      project_id: editProject.ID,
      contractor_ids: [item],
    };
    const res = await removeAssignContractorAPI(data);

    let getProjectID = { project_id: editProject.ID };
    dispatch(ProjectDetail(getProjectID));
    setShowContractorsDeletePopup(false);
    toast.success("Assign Contractor Delete Successfully");
  };


  const deletePhoto = (indexDelete) => {
    const currentPhotos = ProjectsFormik.values.photos.localImage;

    if (indexDelete >= 0 && indexDelete < currentPhotos.length) {
      const updatedPhotos = currentPhotos.filter(
        (item, index) => index !== indexDelete
      );
      ProjectsFormik.setFieldValue("photos", {
        ...ProjectsFormik.values.photos,
        localImage: updatedPhotos,
      });

      toast.success("Photo deleted Successfully");
    } else {
      console.log("Invalid index to delete");
    }

    setShowDeletePhotosPopup(false);
  };

  // delete Photos on APIS
  const deletePhotoAPI = async (id) => {
    const ProjectId = editProject.ID;
    let data = {
      project_id: ProjectId,
      photo_ids: [id],
    };

    const respon = await deleteProjectPhotoAPI(data);

    const photos = photosApi.filter((item) => item.photo_id !== id);
    toast.success("Photo deleted Successfully");
    setShowDeletePhotosPopup(false);
    setPhotos([...photos]);
  };

  function GoBack() {
    router.back();
    dispatch(resetAssignContractors());
    dispatch(resetAssignTenants());
  }

  function onClickPreview(value) {
    setPdfUrl(value);
    setShowPDFPreview(true);
  }

  return (
    <div className="App bg">
      {ProjectEdit ? (
        <SubHeader title={"Edit Project"} backUrl={"/projects/details"} />
      ) : (
        <SubHeader title={"Add Project"} backFunction={GoBack} />
      )}

      <div className="px-4 pb-16 pt-6 ">
        <div>
          <div>
            {/* Company Info */}
            <div className="pb-4">
              <span className="text-[20px] font-normal text-[#262626] Oswald-font ">
                Project Info
              </span>
              <hr className="my-1 border-t-2" />
            </div>

            <div className="grid grid-cols-1 gap-2">
              <Input
                Required={true}
                label={"Project Name"}
                name={"project_name"}
                placeholder={"Project Name"}
                formik={ProjectsFormik}
                validation={ProjectsFormik.errors.project_name}
              />
              <div className="flex w-[70%]">
                <div>
                  <Input
                    label={"Project Date:"}
                    name={"project_date"}
                    placeholder={"Project Date"}
                    type={"date"}
                    formik={ProjectsFormik}
                    validation={ProjectsFormik.errors.project_date}
                  />
                </div>
              </div>

              <div className="flex ">
                <div className="w-full">
                  <label className="text-[12px] text-gray-500">
                    Project Details:
                  </label>
                  <textarea
                    name="project_detail"
                    id="project_detail"
                    placeholder="Enter Project Details"
                    onChange={ProjectsFormik.handleChange}
                    value={ProjectsFormik.values.project_detail}
                    rows="4"
                    className="font-medium w-full text-[15px] py-[10px] px-[10px] rounded-[5px]
                              bg-[#FFF] text-[#000] border-2 border-[#cfcfcf8f] focus:border-black focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center">
                <div className="w-full">
                  <span className="text-[12px] font-normal text-[#000]">
                    Choose Status
                  </span>

                  <div className="flex items-center gap-2 ">
                    <div className="w-[40%] h-[35px] py-[10px] flex items-center ">
                      <input
                        onChange={ProjectsFormik.handleChange}
                        value="In Progress"
                        type="radio"
                        id="status"
                        name="status"
                        checked={ProjectsFormik.values.status === "In Progress"}
                        className="h-[28px] w-[28px]  rounded-[6px] "
                      />
                      <div className="text-[16px] ml-2  text-[#262626]">
                        In Progress
                      </div>
                    </div>
                    <div className="w-[40%] py-[10px] flex items-center">
                      <input
                        onChange={ProjectsFormik.handleChange}
                        value="Completed"
                        type="radio"
                        id="status"
                        name="status"
                        checked={ProjectsFormik.values.status === "Completed"}
                        className="h-[28px] w-[28px]  rounded-[6px] "
                      />
                      <div className="text-[16px] ml-2 text-[#262626]">
                        Completed
                      </div>
                    </div>
                    {/* {TanantsFramik.errors.status && (
                                 <span className="text-red-500 text-[12px]">
                                    {TanantsFramik.errors.status}
                                 </span>
                              )} */}
                  </div>
                </div>
              </div>

              <div>
                <Input
                  label={" Service/ Industry:"}
                  name={"services"}
                  placeholder={"Service/ Industry"}
                  formik={ProjectsFormik}
                />
              </div>

              <div className="w-[100%] py-2 ">
                {/* <div className=''> */}
                <h1 className="text-[20px] Oswald-font text-[#262626] not-italic">
                  Contractor Quotes
                </h1>
                <hr className="my-1 border-t-2" />
                <p className="text-[12px] leading-[15px]  not-italic font-[400] pb-4 mt-[5px]">
                  Send a request for quote to a contractor in your contact list,
                  or send to a new contractor.
                </p>
                {/* </div> */}
                <div className="flex justify-end">
                  <Button
                    href={() => {
                      ProjectEdit
                        ? router.push(
                            `/projects/contractor?create=false&edit=true`
                          )
                        : router.push(`/projects/contractor?create=true`);
                    }}
                    name={"Request A Quote"}
                    boxShadow={"shadow-[0_0px_30px_rgba(0,0,0,0.2)]"}
                  />
                </div>
              </div>

              {getAssignContractors?.length > 0 &&
                getAssignContractors?.map((item, index) => (
                  <div key={index} className="flex w-full gap-[10px]  ">
                    <div className="w-[80%]">
                      <span className="text-[16px] font-normal text-[#000] ">
                        {item.companyName}
                      </span>
                    </div>

                    <div
                      className="text-center w-[20%]"
                      onClick={() => {
                        DeletePopupOpen(
                          item,
                          "deleteContractors",
                          "assignContractors"
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

              {item?.requested_contractors?.length > 0 &&
                item?.requested_contractors?.map((item, index) => (
                  <div key={index} className="flex w-full gap-[10px]  ">
                    <div className="w-[80%]">
                      <span className="text-[16px] font-normal text-[#000] ">
                        {item.company_name.length > 0
                          ? item.company_name
                          : item.first_name.length > 0
                          ? item.first_name + " " + item.last_name
                          : item.user_email.split("@")[0]}
                      </span>
                    </div>

                    <div
                      className="text-center w-[20%]"
                      onClick={() => {
                        DeletePopupOpen(
                          item.ID,
                          "deleteContractorsAPI",
                          "assignContractors"
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

              {showDeleteContractorsPopup && (
                <DeletePhotoPopup
                  deletePhoto={() => {
                    if (deleteType === "deleteContractors") {
                      deleteContractors(deleteID);
                    } else if (deleteType === "deleteContractorsAPI") {
                      deleteContractorsAPI(deleteID);
                    } else {
                      toast.error("try again leter");
                    }
                  }}
                  datashow={showDeleteContractorsPopup ? "block" : "hidden"}
                  onClicked={() => setShowContractorsDeletePopup(false)}
                />
              )}

              <AlignTenant clientName={"form"} />

              {getAssignTenants?.length > 0 &&
                getAssignTenants?.map((item, index) => (
                  <div key={index} className="flex w-full gap-[10px] mr-5">
                    <div className="w-[80%]">
                      <span className="text-[16px] font-normal text-[#000] ">
                        {item?.companyName}
                      </span>
                    </div>

                    <div
                      className="text-center w-[20%]"
                      onClick={() => {
                        DeletePopupOpen(item, "deleteTenants", "assignTenants");
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

              {item?.requested_tenants?.length > 0 &&
                item?.requested_tenants?.map((item, index) => (
                  <div key={index} className="flex w-full">
                    <div className="w-[80%]">
                      <span className="text-[16px] font-normal text-[#000] ">
                        {item?.company_name}
                      </span>
                    </div>

                    <div
                      className="text-center"
                      onClick={() => {
                        DeletePopupOpen(
                          item.ID,
                          "deleteTenantsAPI",
                          "assignTenants"
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

              {showDeleteTenantsPopup && (
                <DeletePhotoPopup
                  deletePhoto={() => {
                    if (deleteType === "deleteTenants") {
                      deleteTenants(deleteID);
                    } else if (deleteType === "deleteTenantsAPI") {
                      deleteTenantsAPI(deleteID);
                    } else {
                      toast.error("try again leter");
                    }
                  }}
                  datashow={showDeleteTenantsPopup ? "block" : "hidden"}
                  onClicked={() => setShowTenantsDeletePopup(false)}
                />
              )}

              <div className="pb-4">
                <span className="text-[20px] font-normal text-[#262626] Oswald-font">
                  Photos
                </span>
                <hr className="my-1 border-t-2" />
              </div>
              <div className="flex justify-end">
                <AddPhoto btnName={"Add Files"} formik={ProjectsFormik} />
              </div>

              <div className="grid mt-[2px] grid-cols-3 gap-x-[10px] gap-y-[15px] mb-[15px]">
                {ProjectsFormik?.values?.photos?.localImage.map(
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
                          DeletePopupOpen(index, "deletePhoto", "photo")
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
                            "photo"
                          )
                        }
                      >
                        <IoTrashOutline className="text-[20px] text-red-500 mt-[5px] ml-[5px] " />
                      </div>
                    </div>
                  ))}
              </div>

              <div className="w-[100%] pt-[10px] pb-[50px] ">
                <h1 className="text-[20px] Oswald-font font-normal text-[#262626] not-italic">
                  Linked Email
                </h1>
                <hr className="my-1 border-t-2" />
                <div className="flex justify-end">
                  <Button
                    href={() => router.push("/support/send_email")}
                    name={"Send Email"}
                    boxShadow={"shadow-[0_0px_30px_rgba(0,0,0,0.2)]"}
                  />
                </div>
              </div>
            </div>

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
                  if (deleteType === "deletePhoto") {
                    deletePhoto(deleteID);
                  } else {
                    deletePhotoAPI(deleteID);
                  }
                }}
                datashow={showDeletePhotosPopup ? "block" : "hidden"}
                onClicked={DeletePopupClose}
              />
            )}
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 w-full shadow-[1px_-10px_13px_2px_#0000000d] ">
        <div className="grid grid-cols-2 w-full bg-[#fff] ">
          {ProjectLoader ? (
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
                  onClick={() => ProjectsFormik.handleSubmit()}
                >
                  {ProjectEdit ? "Update" : "Save"}
                </button>
              </div>
            </div>
          )}
          {/* {ProjectEdit ? ( */}
          {/* <Link href="/projects/details"> */}
          <div
            className="flex justify-center"
            onClick={() => {
              dispatch(resetAssignContractors());
              dispatch(resetAssignTenants());
              router.push(ProjectEdit ? "/projects/details" : "/projects/list");
            }}
          >
            <div className="px-4 py-2 w-full items-center mx-auto flex justify-center bg-[#CCD9E6]  text-[#262626] font-normal not-italic text-[1.375rem]">
              <span className="">Cancel</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Projectform;
   