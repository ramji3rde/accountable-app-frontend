import SubHeader from "../../components/public-com/header";
import { useFormik, setFieldValue } from "formik";
import {
  createNoteAPI,
  deleteNoteAPI,
  deleteTenantsPhotoAPI,
  EditTenantsAPI,
  postTenantsAddPhotosAPI,
  postTenantsAPI,
  getAllContactsAPI,
  createContactsAPI,
  updateContactsAPI,
  deleteContactsAPI,
  addDocsAPIS,
  getProfile,
} from "../../redux/APIS/API";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import Customtype from "../../components/tenants/details/customtype";
import { useState, useEffect, Fragment } from "react";
import AddPhoto from "../../components/public-com/form/addDocs";
import { useDispatch, useSelector } from "react-redux";
import DeletePhotoPopup from "../../components/tenants/details/deletePhotopopup";
import DeleteNotesPopup from "../../components/tenants/details/deleteNotesPopup";
import EditNotesPopup from "../../components/tenants/details/editNotesPopup";
import { IoTrashOutline, IoFlagSharp } from "react-icons/io5";
import { RiDeleteBin6Line } from "react-icons/ri";
import Link from "next/link";
import AddNotes from "../../components/tenants/details/addnotes";
import { assignTenantsAPI } from "../../redux/APIS/API";
import AddContacts from "../../components/tenants/details/addContacts";
import EditContactPopup from "../../components/tenants/details/editContactPopup";
import DeleteContactsPopup from "../../components/tenants/details/DeleteContactsPopup";
import { getTenantDetail } from "../../redux/action/tenants-detail";
import Input from "../../components/public-com/form/Input";
import Select from "../../components/public-com/form/Select";
import TanantsLightbox from "../../components/tenants/details/lightbox";
import PreViewPDF from "../../components/tenants/details/PreViewPDF";

function TanantsFrom() {
  const [custom, setCustom] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showDeleteContactPopup, setShowDeleteContactPopup] = useState(false);
  const [showNotesPopup, setShowNotesPopup] = useState(false);
  const [showEditNotesPopup, setShowEditNotesPopup] = useState(false);
  const [showEditContactPopup, setShowEditContactPopup] = useState(false);
  const [photosApi, setPhotos] = useState([]);
  const [notesApi, setNotesApi] = useState([]);
  const [contactsApi, setContactsApi] = useState([]);
  const [tenantLoader, setTenantLoader] = useState(false);
  const [deleteID, setDeleteID] = useState(true);
  const [deleteType, setDeleteType] = useState("");
  const [detail, setDetail] = useState();
  const [contactDetail, setContactDetail] = useState();
  const [contactIndex, setContactIndex] = useState();
  const [index, setIndex] = useState();
  const [showToggleEle, setShowToggleEle] = useState(true);
  const [lightBox, setLightBox] = useState(false);
  const [imageSrc, setImageSrc] = useState(true);
  const [userProperty, setUserProperty] = useState("");
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

  function Closecustom() {
    setCustom(false);
  }

  const LoaderinActive = () => {
    setTenantLoader(true);
  };

  const DeleteOpen = (id, type) => {
    setDeleteID(id);
    setDeleteType(type);
    setShowDeletePopup(true);
  };

  const DeleteNotes = (id, type) => {
    setDeleteID(id);
    setDeleteType(type);
    setShowNotesPopup(true);
  };

  const DeleteCantact = (id, type) => {
    setDeleteID(id);
    setDeleteType(type);
    setShowDeleteContactPopup(true);
  };

  const DeleteClose = () => {
    setShowDeletePopup(false);
  };

  const dispatch = useDispatch();

  const editTenants = useSelector(
    (state) => state.tenantsDetails.tenantsDetails?.data
  );

  const editTenants_id = useSelector(
    (state) => state.tenantsDetails.tenantsDetails?.data?.ID
  );

  useEffect(() => {
    getProfile().then((el) => {
      setUserProperty(el?.data?.data[0]?.property_name);
    });
  }, []);

  const userId = useSelector((state) => state.userActive.user?.id);

  const router = useRouter();
  const userEdit = router.query.edit;
  const projectId = router.query.project_id;

  useEffect(() => {
    if (userEdit) {
      setPhotos([...editTenants?.photos]);
      setNotesApi([...editTenants?.notes]);
      setContactsApi([...editTenants?.contacts]);
      setShowToggleEle(false);
    } else if (projectId) {
      setShowToggleEle(false);
    } else {
      router.push("/tenants/form");
    }
  }, [editTenants]);

  useEffect(() => {
    getTenantDetail();
  }, []);

  // validation
  const validate = (values) => {
    const errors = {};

    if (!values.company_name) {
      errors.company_name = "Please Enter Company Name";
    }

    return errors;
  };

  // apis code
  const TanantsFramik = useFormik({
    initialValues: {
      author: "" + userId,
      company_name:
        editTenants?.company_name && userEdit ? editTenants?.company_name : "",
      street_address:
        editTenants?.street_address && userEdit
          ? editTenants?.street_address
          : "",
      street_address_2:
        editTenants?.street_address_2 && userEdit
          ? editTenants?.street_address_2
          : "",
      unit: editTenants?.unit && userEdit ? editTenants?.unit : "",
      unit_type:
        editTenants?.unit_type && userEdit ? editTenants?.unit_type : "",
      mailbox: editTenants?.mailbox && userEdit ? editTenants?.mailbox : "",
      city: editTenants?.city && userEdit ? editTenants?.city : "",
      state: editTenants?.state && userEdit ? editTenants?.state : "SC",
      zip_code: editTenants?.zip_code && userEdit ? editTenants?.zip_code : "",
      phone_number:
        editTenants?.phone_number && userEdit ? editTenants?.phone_number : "",
      phone_number_type:
        editTenants?.phone_number_type && userEdit
          ? editTenants?.phone_number_type
          : "",
      primary_email:
        editTenants?.primary_email && userEdit
          ? editTenants?.primary_email
          : "",
      status: editTenants?.status && userEdit ? editTenants?.status : "",

      property: editTenants?.property && userEdit ? editTenants?.property : "",

      complex: editTenants?.complex && userEdit ? editTenants?.complex : "",

      first_name:
        editTenants?.first_name && userEdit ? editTenants?.first_name : "",
      last_name:
        editTenants?.last_name && userEdit ? editTenants?.last_name : "",
      primary_title:
        editTenants?.primary_title && userEdit
          ? editTenants?.primary_title
          : "",
      primary_phone:
        editTenants?.primary_phone && userEdit
          ? editTenants?.primary_phone
          : "",
      primary_phone_type:
        editTenants?.primary_phone_type && userEdit
          ? editTenants?.primary_phone_type
          : "",
      primary_second_phone:
        editTenants?.primary_second_phone && userEdit
          ? editTenants?.primary_second_phone
          : "",
      primary_second_phone_type:
        editTenants?.primary_second_phone_type && userEdit
          ? editTenants?.primary_second_phone_type
          : "",
      primary_contact_email:
        editTenants?.primary_contact_email && userEdit
          ? editTenants?.primary_contact_email
          : "",

      secondary_fname:
        editTenants?.secondary_fname && userEdit
          ? editTenants?.secondary_fname
          : "",
      secondary_lname:
        editTenants?.secondary_lname && userEdit
          ? editTenants?.secondary_lname
          : "",
      secondary_title:
        editTenants?.secondary_title && userEdit
          ? editTenants?.secondary_title
          : "",
      secondary_primary_phone:
        editTenants?.secondary_primary_phone && userEdit
          ? editTenants?.secondary_primary_phone
          : "",
      secondary_primary_phone_type:
        editTenants?.company_name && userEdit ? editTenants?.company_name : "",
      secondary_phone:
        editTenants?.secondary_phone && userEdit
          ? editTenants?.secondary_phone
          : "",
      secondary_phone_type:
        editTenants?.secondary_phone_type && userEdit
          ? editTenants?.secondary_phone_type
          : "",
      secondary_contact_email:
        editTenants?.secondary_contact_email && userEdit
          ? editTenants?.secondary_contact_email
          : "",

      contacts: [],

      notes: [],

      photos: {
        localImage: [],
        detail: "",
      },
    },
    validate,
    onSubmit: async (values) => {
      try {
        if (userEdit === "true") {
          setTenantLoader(true);

                  values.author = "" + userId;
                  values.tenantId = "" + editTenants_id;
                  const respon = await EditTenantsAPI(values);
                  toast.success(respon.data.message);

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

                    formdata.append("user_post_id", editTenants_id);
                    formdata.append("author", userId);
                    formdata.append(
                      "detail",
                      values?.photos?.detail ? values?.photos?.detail : ""
                    );
                    formdata.append("upload_for", "post");

                    const addpoes = await addDocsAPIS(formdata);
                    dispatch(getTenantDetail(editTenants_id));
                  }

                  const Notedata = {
                    post_id: "" + editTenants_id,
                    author: "" + userId,
                    notes: values.notes,
                  };

                  if (Notedata.notes.length > 0) {
                    const responNotes = await createNoteAPI(Notedata);
                  }

                  const ContactsData = {
                    contacts: values.contacts,
                    user_id: userId,
                    post_id: "" + editTenants_id,
                    contact_category: "post",
                    author: editTenants_id,
                  };

                  if (ContactsData.contacts.length > 0) {
                    const responseContacts = await createContactsAPI(ContactsData);
                  }
                  dispatch(getTenantDetail(editTenants_id));
                  setTenantLoader(false);
                  router.push("/tenants/details");

        } else if (projectId) {
          setTenantLoader(true);

          const respon = await postTenantsAPI(values);

          const tenant_idd = respon.data.data.tenant_id;

          const Notedata = {
            post_id: "" + tenant_idd,
            author: "" + userId,
            notes: values.notes,
          };

          if (Notedata.notes.length > 0) {
            const responNotes = await createNoteAPI(Notedata);
          }

          const ContactsData = {
            contacts: values.contacts,
            user_id: userId,
            post_id: "" + tenant_idd,
            contact_category: "post",
            author: tenant_idd,
          };

          if (ContactsData.contacts.length > 0) {
            const responseContacts = await createContactsAPI(ContactsData);
          }

          const response = await assignTenantsAPI({
            project_id: "" + projectId,
            tenant_ids: [tenant_idd],
          });

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
            formdata.append("user_post_id", editTenants_id);
            formdata.append("author", userId);
            formdata.append(
              "detail",
              values?.photos?.detail ? values?.photos?.detail : ""
            );
            formdata.append("upload_for", "post");

            const addpoes = await addDocsAPIS(formdata);
            dispatch(getTenantDetail(editTenants_id));
          }

          toast.success(response.data.message);
          setTenantLoader(false);
          router.push("/projects/list");
        } else {

          setTenantLoader(true);
          
          // console.log(values);

          if (!values.contacts.length > 0) {

            toast.error("Email address is missing. Please provide an email address for the first contact to create tenants");
            // throw new Error("No contacts found");
            setTenantLoader(false); 
          }else if(!values.contacts[0].email){
            toast.error("Email address is missing. Please provide an email address for the first contact to create tenants");
            // throw new Error("No contacts found");
            setTenantLoader(false); 

          } else if (values.contacts[0].email){

              const respon = await postTenantsAPI(values);
              
              const tenant_idd = respon.data.data.tenant_id;

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

                formdata.append("user_post_id", tenant_idd);
                formdata.append("author", userId);
                formdata.append(
                  "detail",
                  values?.photos?.detail ? values?.photos?.detail : ""
                );
                formdata.append("upload_for", "post");

                const addpoes = await addDocsAPIS(formdata);
              }

              const Notedata = {
                post_id: "" + tenant_idd,
                author: "" + userId,
                notes: values.notes,
              };

              if (Notedata.notes.length > 0) {
                const responNotes = await createNoteAPI(Notedata);
              }

              const ContactsData = {
                contacts: values.contacts,
                user_id: userId,
                post_id: "" + tenant_idd,
                contact_category: "post",
                author: tenant_idd,
              };

              if (ContactsData.contacts.length > 0) {
                const responseContacts = await createContactsAPI(ContactsData);
              }

              toast.success(respon.data.message);
              setTenantLoader(false);
              router.push("/tenants/list");
        }
      }
      } catch (error) {
        // console.log(error);
        toast.error(error.response.data.message);
        // console.log(error.response);
        setTenantLoader(false);
      }
    },
  });

  useEffect(() => {
    if (
      userEdit !== "true" &&
      userProperty &&
      TanantsFramik.values.property == ""
    ) {
      TanantsFramik.setFieldValue("property", userProperty);
    }
  }, [userProperty]);

  // custom popup code
  useEffect(() => {
    if (TanantsFramik.values.phone_number_type === "custom") {
      setCustom("phone_number_type");
    }

    if (TanantsFramik.values.primary_phone_type === "custom") {
      setCustom("primary_phone_type");
    }

    if (TanantsFramik.values.primary_second_phone_type === "custom") {
      setCustom("primary_second_phone_type");
    }

    if (TanantsFramik.values.secondary_primary_phone_type === "custom") {
      setCustom("secondary_primary_phone_type");
    }

    if (TanantsFramik.values.secondary_phone_type === "custom") {
      setCustom("secondary_phone_type");
    }
  }, [
    TanantsFramik.values.phone_number_type,
    TanantsFramik.values.primary_phone_type,
    TanantsFramik.values.primary_second_phone_type,
    TanantsFramik.values.secondary_primary_phone_type,
    TanantsFramik.values.secondary_phone_type,
  ]);

  // delete functionaty on notes, photo and Contact
  // local delete conatct
  const deleteCantact = (indexDelete) => {
    const cantact = TanantsFramik.values.contacts.filter(
      (item, index) => index !== indexDelete
    );
    TanantsFramik.setFieldValue("contacts", [...cantact]);
    toast.success("Contact deleted Successfully");
    setShowDeleteContactPopup(false);
  };

  // APIS delete conatct
  const deleteCantactsApi = async (id) => {
    try {

      if(contactsApi.length > 0) {
        toast.error("Unable to delete 'First Contact'.")
        setShowDeleteContactPopup(false);

      }else {
        const data = {
          contact_ids: [id],
        };
        await deleteContactsAPI(data);
        const contacts = contactsApi.filter((item) => item.contact_id !== id);
        toast.success("Contact deleted Successfully");
        setShowDeleteContactPopup(false);
        setContactsApi([...contacts]);
    }
    } catch (error) {}
  };

  // local delete notes
  const deleteNotes = (indexDelete) => {
    const notes = TanantsFramik.values.notes.filter(
      (item, index) => index !== indexDelete
    );
    TanantsFramik.setFieldValue("notes", [...notes]);
    toast.success("Notes deleted Successfully");
    setShowNotesPopup(false);
  };
  // APIS delete notes
  const deleteNotesapi = async (id) => {
    try {
      const data = {
        note_ids: [id],
      };
      await deleteNoteAPI(data);
      const notes = notesApi.filter((item) => item.note_id !== id);
      toast.success("Notes deleted Successfully");
      setShowNotesPopup(false);
      setNotesApi([...notes]);
    } catch (error) {}
  };

  const deletePhoto = (indexDelete) => {
    const currentPhotos = TanantsFramik.values.photos.localImage;

    if (indexDelete >= 0 && indexDelete < currentPhotos.length) {
      const updatedPhotos = currentPhotos.filter(
        (item, index) => index !== indexDelete
      );
      TanantsFramik.setFieldValue("photos", {
        ...TanantsFramik.values.photos,
        localImage: updatedPhotos,
      });

      toast.success("Photo deleted Successfully");
    } else {
      // console.log("Invalid index to delete");
    }

    setShowDeletePopup(false);
  };

  // APIS delete Photo
  const deletePhotoapi = async (id) => {
    try {
      const data = {
        photo_ids: [id],
      };
      await deleteTenantsPhotoAPI(data);
      const photos = photosApi.filter((item) => item.photo_id !== id);
      toast.success("Photo deleted Successfully");
      setShowDeletePopup(false);

      setPhotos([...photos]);
    } catch (error) {}
  };

  function onClickPreview(value) {
    setPdfUrl(value);
    setShowPDFPreview(true);
  }

  return (
    <div className="App">
      {projectId && (
        <SubHeader title={"Add Tenants"} backUrl={"/projects/list"} />
      )}

      {userEdit && (
        <SubHeader title={"Edit Tenants"} backUrl={"/tenants/details"} />
      )}

      {showToggleEle && (
        <SubHeader title={"Add Tenants"} backUrl={"/tenants/list"} />
      )}
      {/* </header> */}
      {/* {console.log("thisis userid", userId)} */}
      <div className="px-4 pb-20 pt-6 ">
        <form method="POST" onSubmit={TanantsFramik.handleSubmit}>
          {/* Company Info */}
          <div>
            <div className="pb-4">
              <span className="text-[20px]  font-normal Oswald-font text-black">
                Company / Lessee Info
              </span>
              <hr className="border-t-2" />
            </div>

            <div className="grid sm:grid-cols-2 grid-cols-1 sm:gap-[20px] gap-[16px] sm:my-[10px]">
              <div className="grid grid-cols-1">
                <Input
                  Required={true}
                  label={"Company / Lessee Name"}
                  name={"company_name"}
                  placeholder={"Company / Lessee Name"}
                  formik={TanantsFramik}
                  validation={TanantsFramik.errors.company_name}
                />
              </div>

              <div className="grid grid-cols-1">
                <Input
                  label={"Street Address 1"}
                  name={"street_address"}
                  placeholder={"Street Address 1"}
                  formik={TanantsFramik}
                  validation={TanantsFramik.errors.street_address}
                />
              </div>

              <div className="grid grid-cols-1">
                <Input
                  label={"Street Address 2"}
                  name={"street_address_2"}
                  placeholder={"Street Address 2"}
                  formik={TanantsFramik}
                  validation={TanantsFramik.errors.street_address}
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <Select
                    label={"Unit Type"}
                    name={"unit_type"}
                    formik={TanantsFramik}
                    option={["Apt", "Bldg", "Dept", "Fl", "Rm", "Ste", "Unit"]}
                  />
                </div>
                <div className="mt-1">
                  <Input
                    label={"Unit Value"}
                    name={"unit"}
                    placeholder={"Unit Value"}
                    formik={TanantsFramik}
                    validation={TanantsFramik.errors.unit}
                  />
                </div>
                <div className="mt-1">
                  <Input
                    label={"Mailbox #"}
                    name={"mailbox"}
                    placeholder={"Mailbox #"}
                    formik={TanantsFramik}
                    validation={TanantsFramik.errors.mailbox}
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <div className="w-[40%] mt-1">
                  <Input
                    Required={false}
                    label={"City"}
                    name={"city"}
                    placeholder={"City"}
                    formik={TanantsFramik}
                    validation={TanantsFramik.errors.city}
                  />
                </div>

                <div className="w-[20%]">
                  <Select
                    label={"State"}
                    name={"state"}
                    formik={TanantsFramik}
                    option={listState}
                  />
                </div>

                <div className="w-[40%] mt-1">
                  <Input
                    Required={false}
                    label={"Zip Code"}
                    name={"zip_code"}
                    placeholder={"Zip Code"}
                    formik={TanantsFramik}
                    validation={TanantsFramik.errors.zip_code}
                  />
                </div>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 grid-cols-1 py-4 sm:gap-[20px] gap-[10px] sm:my-[10px]">
              <div className="grid grid-cols-1 gap-2 ">
                <div>
                  <Input
                    Required={false}
                    label={"Property"}
                    name={"property"}
                    placeholder={"Default Property"}
                    formik={TanantsFramik}
                    validation={TanantsFramik.errors.property}
                  />
                  <p className="text-[12px] font-normal text-[#000]">
                    This is the name of your property, complex, or business. You
                    can change the default name in your profile.
                  </p>
                </div>

                <div>
                  <span className="text-[12px] font-normal text-[#000]">
                    Choose Occupant Status
                  </span>

                  <div className="flex items-center">
                    <div className="w-[40%] h-[35px] py-[10px] flex items-center ">
                      <input
                        onChange={TanantsFramik.handleChange}
                        value="Occupied"
                        type="radio"
                        id="status"
                        name="status"
                        checked={TanantsFramik.values.status === "Occupied"}
                        className="h-[28px] w-[28px]  rounded-[6px] "
                      />
                      <div className="text-[16px] ml-4  text-[#262626]">
                        Occupied
                      </div>
                    </div>
                    <div className="w-[40%] py-[10px] flex items-center">
                      <input
                        onChange={TanantsFramik.handleChange}
                        value="Vacant"
                        type="radio"
                        id="status"
                        name="status"
                        checked={TanantsFramik.values.status === "Vacant"}
                        className="h-[28px] w-[28px]  rounded-[6px]"
                      />
                      <div className="text-[16px] ml-4 text-[#262626]">
                        Vacant
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 grid-cols-1 py-0 sm:gap-[20px] gap-[10px] sm:my-[10px]">
              <div>
                <div className="pt-4">
                  <span className="text-[20px] font-normal Oswald-font text-[#262626]">
                    Contacts
                  </span>
                  <hr className="my-1 border-t-2" />
                </div>
              </div>
            </div>

            <AddContacts formik={TanantsFramik} />

            {TanantsFramik?.values?.contacts?.length > 0 &&
              TanantsFramik?.values?.contacts?.map((item, index) => (
                <div key={index} className="flex w-full gap-[10px] mb-3">
                  <div className="w-[60%]">
                    <span className="text-[16px] font-normal text-[#000] ">
                      {item?.first_name + " " + item?.last_name}
                    </span>
                  </div>
                  <div
                    className="w-[3.375rem]  items-center h-[20px]"
                    onClick={() => {
                      setContactDetail(item);
                      setContactIndex(index);
                      setShowEditContactPopup(true);
                    }}
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
                    onClick={() => DeleteCantact(index, "deleteCantact")}
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

            {contactsApi?.length > 0 &&
              contactsApi?.map((item, index) => (
                <div key={index} className="flex w-full gap-[10px] mb-2 ">
                  <div className="w-[60%]">
                    <span className="text-[16px] font-normal text-[#000] ">
                      {item?.first_name + " " + item?.last_name}
                    </span>
                  </div>
                  <div
                    className="w-[3.375rem]  items-center h-[20px]"
                    onClick={() => {
                      setContactDetail(item);
                      setContactIndex(index);
                      setShowEditContactPopup(true);
                    }}
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
                      DeleteCantact(item.contact_id, "deleteCantactsapi")
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
                formik={TanantsFramik}
                detail={contactDetail}
                index={contactIndex}
                editId={editTenants_id}
                clientName={"tanants"}
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
                datashow={showNotesPopup ? "hidden" : "block"}
                onClicked={() => setShowDeleteContactPopup(false)}
              />
            )}
            <div className="grid sm:grid-cols-2 grid-cols-1 py-0 sm:gap-[20px] gap-[10px] sm:my-[10px]">
              <div>
                <div className="pt-4">
                  <span className="text-[20px] font-normal Oswald-font text-[#262626]">
                    Notes
                  </span>
                  <hr className="my-1 border-t-2" />
                </div>
              </div>

              <AddNotes formik={TanantsFramik} />

              {/* local */}
              {TanantsFramik?.values?.notes?.length > 0 &&
                TanantsFramik?.values?.notes?.map((item, index) => (
                  <div key={index} className="flex w-full gap-[10px]">
                    <div className="w-[60%]">
                      <span className="text-[16px] font-normal text-[#000] ">
                        {" "}
                        {item?.detail}
                      </span>
                    </div>
                    <div
                      className="w-[3.375rem]  items-center h-[20px]"
                      onClick={() => {
                        setShowEditNotesPopup(true);
                        setDetail(item);
                        setIndex(index);
                      }}
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
                      onClick={() => DeleteNotes(index, "deleteNotes")}
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
              {notesApi?.length > 0 &&
                notesApi?.map((item, index) => (
                  <div key={index} className="flex w-full gap-[10px]  ">
                    <div className="w-[60%]">
                      <span className="text-[16px] font-normal text-[#000] ">
                        {item.note}
                      </span>
                    </div>
                    <div
                      className="w-[3.375rem]  items-center h-[20px]"
                      onClick={() => {
                        setDetail(item);
                        setIndex(index);
                        setShowEditNotesPopup(true);
                      }}
                    >
                      <div className="grid grid-cols-2 gap-[5px] items-center  ">
                        <div className=" text-[#154B88] flex justify-center items-center ">
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
                        DeleteNotes(item.note_id, "deleteNotesapi")
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

              {showEditNotesPopup && (
                <EditNotesPopup
                  datashow={showEditNotesPopup ? "block" : "hidden"}
                  onClick={() => setShowEditNotesPopup(false)}
                  formik={TanantsFramik}
                  detail={detail}
                  index={index}
                  EditId={editTenants_id}
                  clientName={"tanants"}
                />
              )}

              <DeleteNotesPopup
                deleteNote={() => {
                  if (deleteType === "deleteNotes") {
                    deleteNotes(deleteID);
                  } else {
                    deleteNotesapi(deleteID);
                  }
                }}
                datashow={showNotesPopup ? "block" : "hidden"}
                onClicked={() => setShowNotesPopup(false)}
              />
            </div>

            <div className="grid sm:grid-cols-2 grid-cols-1 py-0 sm:gap-[20px] gap-[10px] sm:my-[10px]">
              <div>
                <div className="pt-4">
                  <span className="text-[20px] font-normal Oswald-font text-[#262626]">
                    Photos / Documents
                  </span>
                  <hr className="my-1 border-t-2" />
                </div>
              </div>

              {/* <AddPhoto btnName={'Add Files'} formik={TanantsFramik} /> */}

              <AddPhoto btnName={"Add Files"} formik={TanantsFramik} />
            </div>
            <div className="grid-cols-3  grid justify-evenly gap-x-[5px] gap-y-[15px] overflow-hidden">
              {TanantsFramik?.values?.photos?.localImage.map((item, index) => (
                <div
                  key={index}
                  className="h-[100px] w-[100px] overflow-hidden shadow-sm rounded-md group relative bg-cover object-center object-fill "
                >
                  {/* {console.log(item, "map item")} */}

                  {item?.image?.name.includes("pdf") ? (
                    <img
                      src={"/assetes/icon/rectangle.svg"}
                      key={index}
                      onClick={() =>
                        onClickPreview(URL.createObjectURL(item.image))
                      }
                      className="w-full object-cover  rounded-md object-center h-full"
                      alt=""
                    />
                  ) : (
                    <img
                      src={URL.createObjectURL(item.image)}
                      alt={"Photo"}
                      key={index}
                      onClick={() => OpenLight(URL.createObjectURL(item.image))}
                      className="w-full object-cover  rounded-md object-center h-full"
                    />
                  )}

                  <div
                    className="absolute bg-white shadow-lg top-1 right-1 rounded-[10px] w-[40px] h-[40px] text-center"
                    onClick={() => DeleteOpen(index, "deletePhoto")}
                  >
                    <IoTrashOutline className="text-[25px] text-red-500 mt-[7px] ml-[8px] " />
                  </div>
                </div>
              ))}

              {photosApi?.length > 0 &&
                photosApi?.map((item, index) => (
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
                        DeleteOpen(item.photo_id, "deletePhotoapi")
                      }
                    >
                      <IoTrashOutline className="text-[25px] text-red-500 mt-[7px] ml-[8px] " />
                    </div>
                  </div>
                ))}
            </div>

            <div className="fixed bottom-0 left-0 w-full shadow-[1px_-10px_13px_2px_#0000000d] ">
              <div className="grid grid-cols-2 w-full bg-[#fff] ">
                {tenantLoader ? (
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
                    <div className="w-full flex justify-center h-[70px] ">
                      <button
                        type="submit"
                        className="px-4 py-2 w-full mx-auto text-[22px] font-normal text-[#262626] bg-[#4DE060]"
                      >
                        {userEdit && "Update"}
                        {projectId && "Save"}
                        {showToggleEle && "Save"}
                      </button>
                    </div>
                  </div>
                )}

                {projectId && (
                  <Link href="/projects/list">
                    <div className="flex justify-center items-center bg-[#CCD9E6]">
                      <div className="px-4 py-2 mx-auto w-full flex justify-center  text-[22px] font-normal text-[#262626]">
                        <span className="">Cancel</span>
                      </div>
                    </div>
                  </Link>
                )}

                {userEdit && (
                  <Link href="/tenants/details">
                    <div className="flex justify-center items-center bg-[#CCD9E6]">
                      <div className="px-4 py-2 w-full mx-auto flex justify-center  text-[22px] font-normal text-[#262626]">
                        <span className="">Cancel</span>
                      </div>
                    </div>
                  </Link>
                )}

                {showToggleEle && (
                  <Link href="/tenants/list">
                    <div className="flex justify-center items-center bg-[#CCD9E6]">
                      <div className="px-4 py-2 mx-auto w-full flex justify-center  text-[22px] font-normal text-[#262626]">
                        <span className="">Cancel</span>
                      </div>
                    </div>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>

      {showPDFPreview && (
        <PreViewPDF
          datashow={showPDFPreview}
          onClick={() => setShowPDFPreview(false)}
          PDFURL={pdfUrl}
        />
      )}

      <DeletePhotoPopup
        deletePhoto={() => {
          if (deleteType === "deletePhoto") {
            deletePhoto(deleteID);
          } else {
            deletePhotoapi(deleteID);
          }
        }}
        datashow={showDeletePopup ? "block" : "hidden"}
        onClicked={DeleteClose}
      />

      {lightBox && (
        <TanantsLightbox
          src={imageSrc}
          datashow={lightBox ? "block" : "hidden"}
          close={() => setLightBox(false)}
        />
      )}
    </div>
  );
}

export default TanantsFrom;
