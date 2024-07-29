import { useRouter } from "next/router";
import Link from "next/link";
import { useFormik, setFieldValue } from "formik";
import SubHeader from "../../components/public-com/header";
import { IoTrashOutline, IoFlagSharp } from "react-icons/io5";
import Input from "../../components/public-com/form/Input";
import Select from "../../components/public-com/form/Select";
import { useState, useEffect } from "react";
import Custom from "../../components/contractors/form/custom";
import {
  createContactsAPI,
  createNotesSupportTeamAPI,
  createPhotoAPI,
  deleteContactsAPI,
  deleteNoteAPI,
  EditContractorsAPI,
  postContratorsAPI,
  deleteTenantsPhotoAPI,
  addDocsAPIS,
} from "../../redux/APIS/API";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { getContractors } from "../../redux/action/contractors";
import AddContacts from "../../components/tenants/details/addContacts";
import DeleteContactsPopup from "../../components/tenants/details/DeleteContactsPopup";
import AddNotes from "../../components/tenants/details/addnotes";
import { getContractorsDetail } from "../../redux/action/contractors-detail";
import EditNotesPopup from "../../components/tenants/details/editNotesPopup";
import EditContactPopup from "../../components/tenants/details/editContactPopup";
import AddPhoto from "../../components/public-com/form/addDocs";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import TanantsLightbox from "../../components/tenants/details/lightbox";
import PhoneInput from "../../components/public-com/form/phoneInput";
import PreViewPDF from "../../components/tenants/details/PreViewPDF";

function ContractorsForm() {
  const [custom, setCustom] = useState(false);
  const [loader, setLoader] = useState(false);
  const [deleteID, setDeleteID] = useState(true);
  const [deleteType, setDeleteType] = useState("");
  const [contactApi, setContactApi] = useState([]);
  const [noteApi, setNotesApi] = useState([]);
  const [photoApi, setPhotoApi] = useState([]);
  const [showDeleteContactPopup, setShowDeleteContactPopup] = useState(false);
  const [showDeleteNotesPopup, setShowDeleteNotesPopup] = useState(false);
  const [showDeletePhotoPopup, setShowDeletePhotoPopup] = useState(false);
  const [editDetail, setEditDetail] = useState();
  const [editIndex, setEditIndex] = useState();
  const [showEditContactPopup, setShowEditContactPopup] = useState(false);
  const [showEditNotesPopup, setShowEditNotesPopup] = useState(false);
  const [lightBox, setLightBox] = useState(false);
  const [imageSrc, setImageSrc] = useState(true);
  const [pdfUrl, setPdfUrl] = useState("");
  const [showPDFPreview, setShowPDFPreview] = useState(false);

  const OpenLight = (img) => {
    setImageSrc(img);
    setLightBox(true);
  };

  let listState = [
    "AK",
    "AL",
    "AR",
    "AS",
    "AZ",
    "CA",
    "CO",
    "CT",
    "DC",
    "DE",
    "FL",
    "GA",
    "GU",
    "HI",
    "IA",
    "ID",
    "IL",
    "IN",
    "KS",
    "KY",
    "LA",
    "MA",
    "MD",
    "ME",
    "MI",
    "MN",
    "MO",
    "MS",
    "MT",
    "NC",
    "ND",
    "NE",
    "NH",
    "NJ",
    "NM",
    "NV",
    "NY",
    "OH",
    "OK",
    "OR",
    "PA",
    "PR ",
    "RI",
    "SC",
    "SD",
    "TN",
    "TX",
    "UT",
    "VA",
    "VI",
    "VT",
    "WA",
    "WI",
    "WV ",
    "WY ",
  ];

  function CustomClose() {
    setCustom(false);
  }

  const dispatch = useDispatch();

  const router = useRouter();

  const userEdit = router.query.edit;

  const userId = useSelector((state) => state.userActive.user?.id);

  const editContractors = useSelector(
    (state) => state.contractorsDetail.contractorsDetail?.data.data
  );

  useEffect(() => {
    if (userEdit) {
      setContactApi(editContractors?.contacts);
      setNotesApi(editContractors?.notes);
      setPhotoApi(editContractors?.photos);
    } else {
      router.push("/contractors/form");
    }
  }, [editContractors]);

  useEffect(() => {
    getContractorsDetail();
  }, []);

  // validations
  const validate = (values) => {
    const errors = {};

    if (!values.company_name) {
      errors.company_name = "Please enter company name";
    }

    return errors;
  };

  // formiks on submit functions
  const ContractorFormik = useFormik({
    initialValues: {
      author: "" + userId,
      company_name:
        editContractors?.company_name && userEdit
          ? editContractors?.company_name
          : "",
      unit: editContractors?.unit && userEdit ? editContractors?.unit : "",
      account_number:
        editContractors?.account_number && userEdit
          ? editContractors?.account_number
          : "",
      street_address:
        editContractors?.street_address && userEdit
          ? editContractors?.street_address
          : "",
      street_address_2:
        editContractors?.street_address_2 && userEdit
          ? editContractors?.street_address_2
          : "",
      services:
        editContractors?.services && userEdit ? editContractors?.services : "",
      city: editContractors?.city && userEdit ? editContractors?.city : "",
      state: editContractors?.state && userEdit ? editContractors?.state : "SC",
      zip: editContractors?.zip && userEdit ? editContractors?.zip : "",
      company_primary_phone:
        editContractors?.company_primary_phone && userEdit
          ? editContractors?.company_primary_phone
          : "",
      company_primary_phone_type:
        editContractors?.company_primary_phone_type && userEdit
          ? editContractors?.company_primary_phone_type
          : "",
      company_secondary_phone:
        editContractors?.company_secondary_phone && userEdit
          ? editContractors?.company_secondary_phone
          : "",
      company_secondary_phone_type:
        editContractors?.company_secondary_phone_type && userEdit
          ? editContractors?.company_secondary_phone_type
          : "",
      company_email:
        editContractors?.company_email && userEdit
          ? editContractors?.company_email
          : "",

      // primary detalis
      contacts: [],

      // notes
      notes: [],

      // photos
      photos: {
        localImage: [],
        detail: "",
      },
    },
    validate,
    onSubmit: async (values) => {
      try {
        if (userEdit === "true") {
          values.contractorId = editContractors.ID;
          const respon = await EditContractorsAPI(values);

          const ContactsData = {
            contacts: values.contacts,
            user_id: editContractors.ID,
            post_id: "",
            contact_category: "user",
            author: userId,
          };

          if (ContactsData.contacts.length > 0) {
            const responseContacts = await createContactsAPI(ContactsData);
          }

          const Notedata = {
            user_id: editContractors.ID,
            author: userId,
            notes: values.notes,
          };

          if (Notedata.notes.length > 0) {
            const responNotes = await createNotesSupportTeamAPI(Notedata);
          }

          if (
            values &&
            values.photos &&
            values.photos.localImage &&
            values.photos.localImage.length > 0
          ) {
            var formdata = new FormData();
            for (var i = 0; i < values?.photos?.localImage.length; i++) {
              const imageFile = values?.photos?.localImage[i];
              formdata.append(
                "upload_media[]",
                imageFile.image,
                imageFile.image.name
              );
            }

            formdata.append("user_post_id", editContractors.ID);
            formdata.append("author", userId);
            formdata.append(
              "detail",
              values?.photos?.detail ? values?.photos?.detail : ""
            );
            formdata.append("upload_for", "user");
            const addpoes = await addDocsAPIS(formdata);
            dispatch(getContractorsDetail(editContractors.ID));
          }

          dispatch(getContractorsDetail(editContractors.ID));
          toast.success(respon.data.message);
          router.push("/contractors/details");
        } else {
          // setLoader(true)

          const respon = await postContratorsAPI(values);

          const conID = respon?.data?.data?.contractor_id;

          const ContactsData = {
            contacts: values.contacts,
            user_id: conID,
            post_id: "",
            contact_category: "user",
            author: userId,
          };

          if (ContactsData.contacts.length > 0) {
            const responseContacts = await createContactsAPI(ContactsData);
          }

          const Notedata = {
            user_id: conID,
            author: userId,
            notes: values.notes,
          };

          if (Notedata.notes.length > 0) {
            const responNotes = await createNotesSupportTeamAPI(Notedata);
          }

          if (
            values &&
            values.photos &&
            values.photos.localImage &&
            values.photos.localImage.length > 0
          ) {
            var formdata = new FormData();
            for (var i = 0; i < values?.photos?.localImage.length; i++) {
              const imageFile = values?.photos?.localImage[i];
              formdata.append(
                "upload_media[]",
                imageFile.image,
                imageFile.image.name
              );
            }

            formdata.append("user_post_id", conID);
            formdata.append("author", userId);
            formdata.append(
              "detail",
              values?.photos?.detail ? values?.photos?.detail : ""
            );
            formdata.append("upload_for", "user");
            const addpoes = await addDocsAPIS(formdata);
          }

          toast.success(respon.data.message);

          router.push("/contractors/list");
        }
      } catch (error) {
        setLoader(false);
        toast.error(error.response.data.message);
        console.log("err", error.response);
      }
    },
  });

  // custom popup code
  useEffect(() => {
    if (ContractorFormik.values.services === "Custom") {
      setCustom("services");
    }

    if (ContractorFormik.values.company_primary_phone_type === "Custom") {
      setCustom("company_primary_phone_type");
    }

    if (ContractorFormik.values.company_secondary_phone_type === "Custom") {
      setCustom("company_secondary_phone_type");
    }

    if (ContractorFormik.values.primary_phone_type === "Custom") {
      setCustom("primary_phone_type");
    }

    if (ContractorFormik.values.primary_secondary_number_type === "Custom") {
      setCustom("primary_secondary_number_type");
    }
  }, [
    ContractorFormik.values.services,
    ContractorFormik.values.company_primary_phone_type,
    ContractorFormik.values.company_secondary_phone_type,
    ContractorFormik.values.primary_phone_type,
    ContractorFormik.values.primary_secondary_number_type,
  ]);

  // delete contact notes functions setvalues
  const DeleteFunction = (id, type, Datatype) => {
    if (Datatype === "contact") {
      // toast.success(Datatype)
      setDeleteID(id);
      setDeleteType(type);
      setShowDeleteContactPopup(true);
    }

    if (Datatype === "note") {
      // toast.success(Datatype)
      setDeleteID(id);
      setDeleteType(type);
      setShowDeleteNotesPopup(true);
    }

    if (Datatype === "photo") {
      setDeleteID(id);
      setDeleteType(type);
      setShowDeletePhotoPopup(true);
    }
  };

  // edit contact notes functions setvalues
  const Editfunction = (item, index, Datatype) => {
    if (Datatype === "contact") {
      // toast.success(Datatype)
      setEditDetail(item);
      setEditIndex(index);
      setShowEditContactPopup(true);
    }

    if (Datatype === "note") {
      // toast.success(Datatype)
      setEditDetail(item);
      setEditIndex(index);
      setShowEditNotesPopup(true);
    }
  };

  // deleting on local array
  const deleteCantact = (indexDelete) => {
    const cantact = ContractorFormik.values.contacts.filter(
      (item, index) => index !== indexDelete
    );
    ContractorFormik.setFieldValue("contacts", [...cantact]);
    toast.success("Contact deleted Successfully");
    setShowDeleteContactPopup(false);
  };
  // notes delete locals
  const deleteNote = (indexDelete) => {
    const note = ContractorFormik.values.notes.filter(
      (item, index) => index !== indexDelete
    );
    ContractorFormik.setFieldValue("notes", [...note]);
    toast.success("Notes Deleted Successfully");
    setShowDeleteNotesPopup(false);
  };

  const deletePhoto = (indexDelete) => {
    const currentPhotos = ContractorFormik.values.photos.localImage;

    if (indexDelete >= 0 && indexDelete < currentPhotos.length) {
      const updatedPhotos = currentPhotos.filter(
        (item, index) => index !== indexDelete
      );
      ContractorFormik.setFieldValue("photos", {
        ...ContractorFormik.values.photos,
        localImage: updatedPhotos,
      });

      toast.success("Photo deleted Successfully");
    } else {
      // console.log("Invalid index to delete");
    }

    setShowDeletePhotoPopup(false);
  };

  // APIS delete Photo
  const deletePhotoapi = async (id) => {
    try {
      const data = {
        photo_ids: [id],
      };
      await deleteTenantsPhotoAPI(data);
      const photos = photoApi.filter((item) => item.photo_id !== id);
      toast.success("Photo deleted Successfully");
      setShowDeletePhotoPopup(false);
      setPhotoApi([...photos]);
    } catch (error) {}
  };

  // APIS delete notes
  const deleteNotesapi = async (id) => {
    try {
      const data = {
        note_ids: [id],
      };
      await deleteNoteAPI(data);
      const notes = noteApi.filter((item) => item.note_id !== id);

      toast.success("Notes deleted Successfully");
      setNotesApi([...notes]);

      setShowDeleteNotesPopup(false);
    } catch (error) {}
  };

  // APIS delete conatct
  const deleteCantactsApi = async (id) => {
    try {
      const data = {
        contact_ids: [id],
      };
      await deleteContactsAPI(data);
      const contacts = contactApi.filter((item) => item.contact_id !== id);

      toast.success("Contact deleted Successfully");
      setContactApi([...contacts]);

      setShowDeleteContactPopup(false);
    } catch (error) {}
  };

  function onClickPreview(value) {
    setPdfUrl(value);
    setShowPDFPreview(true);
  }

  return (
    <div className="App">
      {userEdit ? (
        <SubHeader
          title={"Edit Contractors"}
          backUrl={"/contractors/details"}
        />
      ) : (
        <SubHeader title={"Add Contractors"} backUrl={"/contractors/list"} />
      )}
      {/* </header> */}

      <div className="px-4 pb-16 pt-6 ">
        <div>
          <div>
            {/* Company Info */}
            <div className="pb-4">
              <span className="text-[20px] font-normal Oswald-font text-[#262626]">
                Company Info
              </span>
              <hr className="my-1 border-t-2" />
            </div>
            <div className="grid grid-cols-1 gap-2">
              <Input
                Required={true}
                label={"Company / Owner Name"}
                name={"company_name"}
                placeholder={"Company or Owner Name"}
                formik={ContractorFormik}
                validation={ContractorFormik.errors.company_name}
              />

              <div className="grid grid-cols-2 gap-4">
                <Input
                  label={"Account Number"}
                  name={"account_number"}
                  placeholder={"Account Number"}
                  formik={ContractorFormik}
                  type={"text"}
                />
                <Input
                  label={"Service / Industry"}
                  name={"services"}
                  placeholder={"Services"}
                  formik={ContractorFormik}
                />
              </div>
              <Input
                label={"Street Address 1"}
                name={"street_address"}
                placeholder={"Street Address 1"}
                formik={ContractorFormik}
              />

              <Input
                label={"Street Address 2"}
                name={"street_address_2"}
                placeholder={"Street Address 2"}
                formik={ContractorFormik}
              />

              {/* city state zip */}

              <div className="flex gap-2">
                <div className="w-[40%] mt-1">
                  <Input
                    label={"City"}
                    name={"city"}
                    placeholder={"City"}
                    formik={ContractorFormik}
                  />
                </div>

                <div className="w-[30%]">
                  <Select
                    label={"State"}
                    name={"state"}
                    formik={ContractorFormik}
                    option={listState}
                  />
                </div>

                <div className="w-[30%] mt-1">
                  <Input
                    label={"Zip Code"}
                    name={"zip"}
                    placeholder={"Zip Code"}
                    type={"number"}
                    formik={ContractorFormik}
                  />
                </div>
              </div>

              {/* number and email */}

              <div className="grid gap-2">
                <div className="flex gap-4">
                  <div className="w-[60%] mt-1">
                    <PhoneInput
                      label={"Primary Phone Number"}
                      name={"company_primary_phone"}
                      placeholder={"Primary Phone Number"}
                      formik={ContractorFormik}
                    />
                  </div>

                  <div className="w-[40%]">
                    <Select
                      label={"Phone type"}
                      name={"company_primary_phone_type"}
                      formik={ContractorFormik}
                      option={[
                        "Mobile",
                        "Work",
                        "Office",
                        "Work fax",
                        "Other",
                        "Custom",
                      ]}
                    />
                  </div>
                </div>

                <div>
                  <Input
                    Required={false}
                    label={"Email"}
                    name={"company_email"}
                    placeholder={"Primary Email"}
                    formik={ContractorFormik}
                    validation={ContractorFormik.errors.company_email}
                  />
                </div>
              </div>

              {/* Company Info */}

              <div className="grid sm:grid-cols-2 grid-cols-1 py-0 sm:gap-[20px] gap-[10px] sm:my-[10px]">
                <div>
                  <div className="pt-4">
                    <span className="text-[20px] text-[#262626] Oswald-font">
                      Contacts
                    </span>
                    <hr className="my-1 border-t-2" />
                  </div>
                </div>
              </div>

              <AddContacts formik={ContractorFormik} />
              {/* contacts details add edit update delete */}

              <div>
                {ContractorFormik?.values?.contacts?.length > 0 &&
                  ContractorFormik?.values?.contacts?.map((item, index) => (
                    <div
                      key={index}
                      className="flex  items-center w-full gap-[10px] mb-3"
                    >
                      <div className="w-[60%]">
                        <span className="text-[16px] font-normal text-[#000] ">
                          {item?.first_name + " " + item?.last_name}
                        </span>
                      </div>
                      <div
                        className="w-[3.375rem]  items-center h-[20px]"
                        onClick={() => Editfunction(item, index, "contact")}
                      >
                        <div className="grid grid-cols-2 gap-[5px] items-center  ">
                          <div className=" text-[#154B88] flex justify-center items-center ">
                            {/* <MdEdit /> */}
                            <svg
                              width="15"
                              height="15"
                              viewBox="0 0 15 15"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M11.6333 0.925028L14.0916 3.38336C14.2542 3.5446 14.3461 3.7639 14.3468 3.99291C14.3476 4.22193 14.2573 4.44185 14.0958 4.60419L12.7291 5.97086L9.04993 2.29169L10.4166 0.925028C10.7531 0.590258 11.2968 0.590258 11.6333 0.925028ZM0.966596 13L1.75826 9.58336L8.33326 3.00003L12.0166 6.67503L5.4166 13.25L1.9791 14.0417C1.91953 14.0477 1.8595 14.0477 1.79993 14.0417C1.54101 14.0401 1.29662 13.9218 1.13487 13.7196C0.973121 13.5174 0.911286 13.253 0.966596 13Z"
                                fill="#154B88"
                              />
                            </svg>
                          </div>
                          <div className="text-[12px] items-center leading-5 not-italic font-bold text-[#154B88]">
                            Edit
                          </div>
                        </div>
                      </div>
                      <div
                        className="  text-center"
                        onClick={() =>
                          DeleteFunction(index, "deleteCantact", "contact")
                        }
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

                {contactApi?.length > 0 &&
                  contactApi?.map((item, index) => (
                    <div key={index} className="flex w-full gap-[10px] mb-3">
                      <div className="w-[60%]">
                        <span className="text-[16px] font-normal text-[#000] ">
                          {item?.first_name + " " + item?.last_name}
                        </span>
                      </div>
                      <div
                        className="w-[3.375rem]  items-center h-[20px]"
                        onClick={() => Editfunction(item, index, "contact")}
                      >
                        <div className="grid grid-cols-2 gap-[5px] items-center  ">
                          <div className=" text-[#154B88] flex justify-center items-center ">
                            {/* <MdEdit /> */}
                            <svg
                              width="15"
                              height="15"
                              viewBox="0 0 15 15"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M11.6333 0.925028L14.0916 3.38336C14.2542 3.5446 14.3461 3.7639 14.3468 3.99291C14.3476 4.22193 14.2573 4.44185 14.0958 4.60419L12.7291 5.97086L9.04993 2.29169L10.4166 0.925028C10.7531 0.590258 11.2968 0.590258 11.6333 0.925028ZM0.966596 13L1.75826 9.58336L8.33326 3.00003L12.0166 6.67503L5.4166 13.25L1.9791 14.0417C1.91953 14.0477 1.8595 14.0477 1.79993 14.0417C1.54101 14.0401 1.29662 13.9218 1.13487 13.7196C0.973121 13.5174 0.911286 13.253 0.966596 13Z"
                                fill="#154B88"
                              />
                            </svg>
                          </div>
                          <div className="text-[12px] items-center leading-5 not-italic font-bold text-[#154B88]">
                            Edit
                          </div>
                        </div>
                      </div>
                      <div
                        className="text-center"
                        onClick={() =>
                          DeleteFunction(index, "deleteCantact", "contact")
                        }
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
                {showEditContactPopup && (
                  <EditContactPopup
                    datashow={showEditContactPopup ? "block" : "hidden"}
                    onClick={() => setShowEditContactPopup(false)}
                    formik={ContractorFormik}
                    detail={editDetail}
                    index={editIndex}
                    editId={editContractors?.ID}
                    clientName={"contactors"}
                  />
                )}

                {showDeleteContactPopup && (
                  <DeleteContactsPopup
                    DeleteCantact={() => {
                      if (deleteType === "deleteCantact") {
                        deleteCantact(deleteID);
                      } else {
                        deleteCantactsApi(deleteID);
                      }
                    }}
                    datashow={showDeleteContactPopup ? " block" : "hidden"}
                    onClicked={() => setShowDeleteContactPopup(false)}
                  />
                )}
              </div>

              <div className="grid sm:grid-cols-2 grid-cols-1 py-0 sm:gap-[20px] gap-[10px] sm:my-[10px]">
                <div>
                  <div className="pt-4">
                    <span className="text-[20px] text-[#262626] Oswald-font">
                      Notes
                    </span>
                    <hr className="my-1 border-t-2" />
                  </div>
                </div>
              </div>

              <AddNotes formik={ContractorFormik} />
              {/* notes details add edit update delete */}
              <div>
                {ContractorFormik?.values?.notes?.length > 0 &&
                  ContractorFormik?.values?.notes?.map((item, index) => (
                    <div key={index} className="flex w-full gap-[10px] mb-3">
                      <div className="w-[60%]">
                        <span className="text-[16px] font-normal text-[#000] ">
                          {item.detail}
                        </span>
                      </div>
                      <div
                        className="w-[3.375rem]  items-center h-[20px]"
                        onClick={() => Editfunction(item, index, "note")}
                      >
                        <div className="grid grid-cols-2 gap-[5px] items-center  ">
                          <div className=" text-[#154B88] flex justify-center items-center ">
                            {/* <MdEdit /> */}
                            <svg
                              width="15"
                              height="15"
                              viewBox="0 0 15 15"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M11.6333 0.925028L14.0916 3.38336C14.2542 3.5446 14.3461 3.7639 14.3468 3.99291C14.3476 4.22193 14.2573 4.44185 14.0958 4.60419L12.7291 5.97086L9.04993 2.29169L10.4166 0.925028C10.7531 0.590258 11.2968 0.590258 11.6333 0.925028ZM0.966596 13L1.75826 9.58336L8.33326 3.00003L12.0166 6.67503L5.4166 13.25L1.9791 14.0417C1.91953 14.0477 1.8595 14.0477 1.79993 14.0417C1.54101 14.0401 1.29662 13.9218 1.13487 13.7196C0.973121 13.5174 0.911286 13.253 0.966596 13Z"
                                fill="#154B88"
                              />
                            </svg>
                          </div>
                          <div className="text-[12px] items-center leading-5 not-italic font-bold text-[#154B88]">
                            Edit
                          </div>
                        </div>
                      </div>
                      <div
                        className="text-center"
                        onClick={() =>
                          DeleteFunction(index, "deleteNote", "note")
                        }
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

                {noteApi?.length > 0 &&
                  noteApi?.map((item, index) => (
                    <div key={index} className="flex w-full gap-[10px] mb-3">
                      <div className="w-[60%]">
                        <span className="text-[16px] font-normal text-[#000] ">
                          {item.note}
                        </span>
                      </div>
                      <div
                        className="w-[3.375rem]  items-center h-[20px]"
                        onClick={() => Editfunction(item, index, "note")}
                      >
                        <div className="grid grid-cols-2 gap-[5px] items-center  ">
                          <div className=" text-[#154B88] flex justify-center items-center ">
                            {/* <MdEdit /> */}
                            <svg
                              width="15"
                              height="15"
                              viewBox="0 0 15 15"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M11.6333 0.925028L14.0916 3.38336C14.2542 3.5446 14.3461 3.7639 14.3468 3.99291C14.3476 4.22193 14.2573 4.44185 14.0958 4.60419L12.7291 5.97086L9.04993 2.29169L10.4166 0.925028C10.7531 0.590258 11.2968 0.590258 11.6333 0.925028ZM0.966596 13L1.75826 9.58336L8.33326 3.00003L12.0166 6.67503L5.4166 13.25L1.9791 14.0417C1.91953 14.0477 1.8595 14.0477 1.79993 14.0417C1.54101 14.0401 1.29662 13.9218 1.13487 13.7196C0.973121 13.5174 0.911286 13.253 0.966596 13Z"
                                fill="#154B88"
                              />
                            </svg>
                          </div>
                          <div className="text-[12px] items-center leading-5 not-italic font-bold text-[#154B88]">
                            Edit
                          </div>
                        </div>
                      </div>
                      <div
                        className="text-center"
                        onClick={() =>
                          DeleteFunction(
                            item?.note_id,
                            "deleteNotesAPI",
                            "note"
                          )
                        }
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

                {showDeleteNotesPopup && (
                  <DeleteContactsPopup
                    DeleteCantact={() => {
                      if (deleteType === "deleteNote") {
                        deleteNote(deleteID);
                      } else {
                        deleteNotesapi(deleteID);
                      }
                    }}
                    datashow={showDeleteNotesPopup ? " block" : "hidden"}
                    onClicked={() => setShowDeleteNotesPopup(false)}
                  />
                )}
                {showEditNotesPopup && (
                  <EditNotesPopup
                    datashow={showEditNotesPopup ? "block" : "hidden"}
                    onClick={() => setShowEditNotesPopup(false)}
                    formik={ContractorFormik}
                    detail={editDetail}
                    index={editIndex}
                    EditId={editContractors?.ID}
                    clientName={"contactors"}
                  />
                )}
              </div>

              <div className="grid sm:grid-cols-2 grid-cols-1 py-0 sm:gap-[20px] gap-[10px] sm:my-[10px]">
                <div>
                  <div className="pt-4">
                    <span className="text-[20px] text-[#262626] Oswald-font ">
                      Photos
                    </span>
                    <hr className="my-1 border-t-2" />
                  </div>
                </div>

                {/* <AddPhoto formik={ContractorFormik} /> */}
                <AddPhoto btnName={"Add Files"} formik={ContractorFormik} />
              </div>
              <div className="grid-cols-3 mb-[15px] grid justify-evenly gap-x-[5px] gap-y-[15px] overflow-hidden">
                {ContractorFormik?.values?.photos?.localImage.length > 0 &&
                  ContractorFormik?.values?.photos?.localImage.map(
                    (item, index) => (
                      <div
                        key={index}
                        className="h-[100px] w-[100px] overflow-hidden shadow-sm rounded-md group relative bg-cover object-center object-fill "
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
                            DeleteFunction(index, "deletePhoto", "photo")
                          }
                        >
                          <IoTrashOutline className="text-[25px] text-red-500 mt-[7px] ml-[8px] " />
                        </div>
                      </div>
                    )
                  )}

                {photoApi?.length > 0 &&
                  photoApi?.map((item, index) => (
                    <div
                      key={index}
                      className="h-[100px] w-[100px] overflow-hidden shadow-sm rounded-md group relative bg-cover object-center object-fill "
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
                        className="absolute bg-white shadow-lg top-1 right-1 rounded-[10px] w-[40px] h-[40px] text-center"
                        onClick={() =>
                          DeleteFunction(
                            item?.photo_id,
                            "deletePhotoApi",
                            "photo"
                          )
                        }
                      >
                        <IoTrashOutline className="text-[25px] text-red-500 mt-[7px] ml-[8px] " />
                      </div>
                    </div>
                  ))}
              </div>

              {showDeletePhotoPopup && (
                <DeleteContactsPopup
                  DeleteCantact={() => {
                    if (deleteType === "deletePhoto") {
                      deletePhoto(deleteID);
                    } else if (deleteType === "deletePhotoApi") {
                      deletePhotoapi(deleteID);
                    } else {
                      toast.error("try again");
                    }
                  }}
                  datashow={showDeletePhotoPopup ? " block" : "hidden"}
                  onClicked={() => setShowDeletePhotoPopup(false)}
                />
              )}

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
            </div>
          </div>
        </div>

        <div className="fixed bottom-0 left-0 w-full shadow-[1px_-10px_13px_2px_#0000000d] ">
          <div className="grid grid-cols-2 w-full bg-[#fff] ">
            {loader ? (
              <span className="text-white px-4 py-2 w-full mx-auto bg-blue-300 text-center">
                <div className="animate-spin inline-block  w-[15px] h-[15px] rounded-full border-[2px] border-r-white"></div>
              </span>
            ) : (
              <div className="flex justify-center">
                <div className="w-full flex justify-center  h-[70px]">
                  <button
                    type="button"
                    className="text-[#262626] font-normal not-italic text-[1.375rem] px-4 py-2 w-full mx-auto bg-[#4DE060]"
                    onClick={() => ContractorFormik.handleSubmit()}
                  >
                    {userEdit ? "Update" : "Save"}
                  </button>
                </div>
              </div>
            )}

            {userEdit ? (
              <Link href="/contractors/details">
                <div className="flex justify-center">
                  <div className="px-4 py-2 w-full items-center mx-auto flex justify-center bg-[#CCD9E6]  text-[#262626] font-normal not-italic text-[1.375rem]">
                    <span className="">Cancel</span>
                  </div>
                </div>
              </Link>
            ) : (
              <Link href="/contractors/list">
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
    </div>
  );
}

export default ContractorsForm;
