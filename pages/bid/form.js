import { useFormik } from "formik";
import Input from "../../components/public-com/form/Input";
import { useRouter } from "next/router";
import axios from "axios";
import { token } from "../../utils";
import AddPhoto from "../../components/public-com/form/addDocs";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Select from "../../components/public-com/form/Select";
import logo from "../../public/smi-logo.png";
import { IoCheckmarkOutline, IoTrashOutline } from "react-icons/io5";
import Image from "next/image";
import SubHeader from "../../components/public-com/header";
import DeletePhotoPopup from "../../components/tenants/details/deletePhotopopup";
import { addDocsAPIS } from "../../redux/APIS/API";
import TanantsLightbox from "../../components/tenants/details/lightbox";
import PhoneInput from "../../components/public-com/form/phoneInput";
import Pdfthumbnail from "react-pdf-thumbnail/lib/pdfthumbnail";
import { useSelector } from "react-redux";

const baseAPIURL = "https://dev.api.getaccountableapp.com/wp-json/";

export default function Bids() {
  const router = useRouter();
  const [dataID, setDataID] = useState([]);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [projectItem, setProjectItems] = useState([]);
  const [contractorsItem, setContractorsItems] = useState([]);
  const [show, setShow] = useState(false);
  const [formData, setformData] = useState();
  const [loader, setLoader] = useState(false);
  const [deleteID, setDeleteID] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [author, setAuthorData] = useState([]);
  const [proCont, setCont] = useState([]);
  const [lightBox, setLightBox] = useState(false);
  const [imageSrc, setImageSrc] = useState(true);

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

  const { access_token, access_data, title } = router.query;

  async function validateBid() {
    try {
      let data = {
        project_id: dataID[0],
        contractor_id: dataID[1],
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
      setLoader(false);
    }
  }

  useEffect(() => {
    setLoader(true);
    if (access_data) {
      const ans = atob(access_data).split("@");

      setDataID(ans);
    }
  }, [access_data]);

  useEffect(() => {
    if (dataID.length > 0) {
      validateBid();
      setLoader(false);
    }
  }, [dataID]);

  useEffect(() => {
    try {
      if (dataID.length > 0) {
        (async () => {
          const conID = dataID[1];

          const responContractors = await axios.get(
            baseAPIURL + `api/v1/contractor/detail?contractorId=${conID}`,
            token(access_token)
          );

          setContractorsItems(responContractors?.data?.data?.data);

          let ProjectID = { project_id: dataID[0], contractor_id: dataID[1] };
          const responData = await axios.post(
            baseAPIURL + `api/v1/project/get_single_project`,
            ProjectID,
            token(access_token)
          );
          setProjectItems(responData?.data?.data);
        })();
      }
    } catch (error) {
      console.log(error);
    }
  }, [dataID]);

  const proContlist = projectItem?.contractor_required_docs?.pro_cont_license;

  useEffect(() => {
    if (!proContlist == []) {
      setCont(projectItem?.contractor_required_docs?.pro_cont_license);
    }
  }, [proContlist]);

  const datass = projectItem?.contractor_required_docs?.another_documents;

  useEffect(() => {
    if (!datass == "") {
      setAuthorData(projectItem?.contractor_required_docs?.another_documents);
    }
  }, [datass]);

  let author1 = author?.length === 0 ? 0 : author?.split(",")?.length;
  let authorTotalItems = proCont?.length + author1;

  const validate = (values) => {
    const errors = {};

    if (!values.bid_price) {
      errors.bid_price = "Please enter bid price";
    }

    if (projectItem?.contractor_required_docs?.required_documents === "yes") {
      if (!values?.photos?.localImage.length) {
        errors.photos = `Please Choose 
         ${
           proCont?.length == 0
             ? ""
             : proCont?.length == 2
             ? proCont[0] + ", " + proCont[1]
             : `${proCont[0] || proCont[1]}`
         } 
         ${" , " + author}`;
      }
    }

    if (contractorsItem?.is_new_user === "yes") {
      if (!values.company_name) {
        errors.company_name = "Please enter company name";
      }
    }

    return errors;
  };


  const Bidformik = useFormik({
    initialValues: {
      company_name: formData?.company_name ? formData?.company_name : "",
      first_name: formData?.first_name ? formData?.first_name : "",
      last_name: formData?.last_name ? formData?.last_name : "",
      email_id: formData?.email_id ? formData?.email_id : "",
      services: formData?.services ? formData?.services : "",
      street_address: formData?.street_address ? formData?.street_address : "",
      street_address_2: formData?.street_address_2
        ? formData?.street_address_2
        : "",
      city: formData?.city ? formData?.city : "",
      state: formData?.state ? formData?.state : "SC",
      zip_code: formData?.zip_code ? formData?.zip_code : "",
      honorific: formData?.honorific ? formData?.honorific : "",
      primary_contact_number: formData?.primary_contact_number
        ? formData?.primary_contact_number
        : "",
      primary_contact_number_type: formData?.primary_contact_number_type
        ? formData?.primary_contact_number_type
        : "Work",
      primary_phone_number: formData?.primary_phone_number
        ? formData?.primary_phone_number
        : "",
      primary_phone_number_type: formData?.primary_phone_number_type
        ? formData?.primary_phone_number_type
        : "Work",
      secondary_phone_number: formData?.secondary_phone_number
        ? formData?.secondary_phone_number
        : "",
      secondary_phone_number_type: formData?.secondary_phone_number_type
        ? formData?.secondary_phone_number_type
        : "Work",
      bid_price: formData?.bid_price ? formData?.bid_price : "",
      additional_info: formData?.additional_info
        ? formData?.additional_info
        : "",
      photos: {
        localImage: [],
        detail: "",
      },
    },
    validate,
    onSubmit: async (values, { resetForm }) => {
      try {
        values.project_id = dataID[0];
        values.contractor_id = dataID[1];
        const data = values;
        setformData(values);
        setShow(true);
      } catch (error) {
        console.log(error);
      }
    },
  });

  async function handleSend(formData) {
    try {
      formData.project_id = dataID[0];
      formData.contractor_id = dataID[1];

      const data = formData;

      const respon = await axios.post(
        baseAPIURL + `api/v1/bid/create`,
        data,
        token(access_token)
      );

      const bid_id = respon.data.data.bid_id;

      if (Object.keys(formData?.photos)?.length > 0) {
        var formdataPhoto = new FormData();
        for (var i = 0; i < formData?.photos?.localImage.length; i++) {
          const imageFile = formData?.photos?.localImage[i];
          formdataPhoto.append(
            "upload_media[]",
            imageFile.image,
            imageFile.image.name
          );
        }
        formdataPhoto.append("user_post_id", bid_id);
        formdataPhoto.append("author", 1);
        formdataPhoto.append(
          "detail",
          formData?.photos?.detail ? formData?.photos?.detail : ""
        );
        formdataPhoto.append("upload_for", "post");

        const responPhotos = await axios.post(
          baseAPIURL + `api/v1/photos/add_docs`,
          formdataPhoto,
          token(access_token)
        );
      }

      setShowSuccessMessage(true);
      successPopup();
      toast.success(respon.data.message);

      setTimeout(() => {
        router.push("/bid/alreadyCreated");
      }, 5000);
    } catch (err) {
      console.log(err);
    }
  }

  const DeleteOpen = (id) => {
    setDeleteID(id);
    setShowPopup(true);
  };

  const deletePhoto = (indexDelete) => {
    const currentPhotos = Bidformik.values.photos.localImage;

    if (indexDelete >= 0 && indexDelete < currentPhotos.length) {
      const updatedPhotos = currentPhotos.filter(
        (item, index) => index !== indexDelete
      );
      Bidformik.setFieldValue("photos", {
        ...Bidformik.values.photos,
        localImage: updatedPhotos,
      });

      if (formData?.photos?.localImage.length > 0) {
        setformData({
          ...formData,
          photos: { ...Bidformik.values.photos, localImage: updatedPhotos },
        });
      }

      toast.success("Photo deleted Successfully");
    } else {
      // console.log("Invalid index to delete");
    }

    setShowPopup(false);
  };

  const successPopup = () => {
    return (
      <div className={showSuccessMessage ? "block" : "hidden"}>
        <div
          style={{ transition: ".5s" }}
          className="DeletePopup h-screen bg-[#22222238] w-full fixed z-[100] top-0 left-0 overflow-hidden"
        >
          <div>
            <div>
              <div className="h-screen transition-all bg-[#22222238] w-full fixed z-[100] top-0 left-0 overflow-hidden backdrop-blur-[1px]">
                <div className="">
                  <div className="absolute w-[80%] top-[22%] left-[10%] mx-auto bg-white rounded-[10px]">
                    <div className="text-black text-center py-8">
                      <div className="grid grid-cols-1 mx-4 ">
                        <div className="grid justify-items-center">
                          <div className="text-center mb-3 w-[50px] h-[50px] rounded-full bg-green-500 grid items-center justify-items-center ">
                            <IoCheckmarkOutline className="text-[35px] font-bold text-white " />
                          </div>
                          <h1 className=" text-center font-bold text-[15px] ">
                            Thanks for Your Quote!
                          </h1>
                          <p className="text-center font-medium text-[14px] pt-[5px] ">
                            We will follow up with <br /> more information soon.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const onButtonClick = (file) => {
    // using Java Script method to get PDF file
    // Creating new object of PDF file
    const fileURL = window.URL.createObjectURL(file);
    // Setting various property values
    let alink = document.createElement("a");
    alink.href = fileURL;
    alink.download = file.type;
    alink.click();
  };

  return (
    <>
      {loader ? (
        <div className="font-bold text-xl text-center px-4 py-4  h-screen flex ">
          <div className="m-auto">
            <h1>Loading...</h1>
          </div>
        </div>
      ) : (
        <div className="">
          {!show && (
            <>
              <SubHeader title={"Accountable: Property Management"} />
              <div className="px-4 py-4">
                <div className="py-2">
                  <h1 className="font-normal cursor-pointer text-left text-[14px]">
                    Send your quote for
                  </h1>
                  <p className="cursor-pointer text-left text-[16px] font-bold text-[#262626] ">
                    {projectItem?.post_title}
                  </p>
                </div>
                <div>
                  <label className="text-[12px] font-[400]  not-italic text-[#262626]">
                    Enter your quote
                  </label>
                  <div className="w-[40%]">
                    <Input
                      type="number"
                      name={"bid_price"}
                      placeholder={"0"}
                      formik={Bidformik}
                      validation={Bidformik.errors.bid_price}
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[12px] font-normal text-[#262626] ">
                    Add details about your quote{" "}
                    <span className="font-bold text-black text-[10px] not-italic">
                      optional
                    </span>
                  </label>
                  <textarea
                    name="additional_info"
                    placeholder="Enter  details about this quote"
                    rows="4"
                    onChange={Bidformik.handleChange}
                    value={Bidformik.values.additional_info}
                    className={` ${
                      Bidformik.errors.additional_info
                        ? "border-red-500 focus:border-red-500"
                        : "border-inputBorderColor focus:border-black focus:outline-none"
                    }
                              "font-normal w-full text-[16px] py-[10px] px-[10px] rounded-[5px] bg-[#FFF] text-[#000] border-[1px] "`}
                  />

                  {/* {Bidformik.errors.additional_info && (
                              <span className="text-red-500 font-normal font-sans text-[16px]">
                                 {Bidformik.errors.additional_info}
                              </span>)} */}
                </div>

                {/* {projectItem?.contractor_required_docs?.required_documents === "yes" && */}
                <div className="mt-4">
                  <h1 className="text-[20px] font-[400] border-b border-gray-200 mb-2 Oswald-font text-[#262626]">
                    Required Documents
                  </h1>
                  <p className="text-[12px] font-[400]  pb-2 text-[#262626]">
                    In order for your quote to be approved, you must upload the
                    following required documents
                  </p>
                  {projectItem?.contractor_required_docs?.required_documents ===
                  "yes" ? (
                    <p className="text-[16px] font-[700] pb-2">
                      {proCont?.length == 0
                        ? ""
                        : proCont?.length == 2
                        ? proCont[0] + ", " + proCont[1]
                        : `${proCont[0] || proCont[1]}`}
                      {" , " + author}
                    </p>
                  ) : (
                    <p className="text-[16px] font-[700] pb-2">
                      No document required
                    </p>
                  )}

                  {/* {projectItem?.contractor_required_docs?.required_documents === "yes" && */}
                  {Bidformik.errors.photos && (
                    <span className="text-red-500 font-normal font-sans text-[16px]">
                      {Bidformik.errors.photos}
                    </span>
                  )}
                  {/* } */}

                  {/* <div className='flex justify-center mt-3 '>
                                 {authorTotalItems <= Bidformik?.values?.photos.length ?
                                    null :
                                    <AddPhoto
                                       formik={Bidformik}
                                    />
                                 }
                              </div> */}
                  <div className="flex justify-center mt-3 ">
                    <AddPhoto formik={Bidformik} />
                  </div>
                  <div className="flex mt-[25px] flex-wrap gap-x-[7px] gap-y-[15px] mb-[25px]  ">
                    {Bidformik?.values?.photos?.localImage.map(
                      (item, index) => (
                        <div
                          key={index}
                          className="h-[100px] w-[100px] overflow-hidden shadow-sm rounded-md group relative bg-cover object-center object-fill "
                        >
                          {item?.image?.type.includes("image") ? (
                            <img
                              src={URL.createObjectURL(item.image)}
                              alt=""
                              onClick={() => {
                                OpenLight(URL.createObjectURL(item.image));
                              }}
                              className="w-full object-cover  rounded-md object-center h-full"
                            />
                          ) : (
                            <>
                              <Pdfthumbnail
                                url={URL.createObjectURL(item.image)}
                                className="w-full object-cover  rounded-md object-center h-full"
                                alt=""
                                onClick={() => onButtonClick(item.image)}
                              />

                            </>
                          )}
                          <div
                            className="absolute bg-white shadow-lg top-1 right-1 rounded-[10px] w-[40px] h-[40px] text-center"
                            onClick={() => DeleteOpen(index)}
                          >
                            <IoTrashOutline className="text-[25px] text-red-500 mt-[7px] ml-[8px] " />
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
                {/* } */}

                <div className="grid gap-2">
                  {contractorsItem?.is_new_user === "yes" && (
                    <div>
                      <h1 className="text-[20px] font-[400]  not-italic Oswald-font border-b border-gray-200 mb-2">
                        Company Info
                      </h1>
                      <div>
                        {/* <label className="text-[12px] text-[#262626]">
                                    Company / Owner Name
                                 </label> */}
                        <Input
                          label={"Company / Owner Name"}
                          Required={true}
                          name={"company_name"}
                          placeholder={"Company / Owner Name:"}
                          formik={Bidformik}
                          validation={Bidformik.errors.company_name}
                        />

                      </div>
                      <div>
                        <label className="text-[12px] text-[#262626] font-normal not-italic">
                          Service / Industry{" "}
                          <span className="font-bold text-[10px]  text-[#262626]">
                            optional
                          </span>
                        </label>
                        <Input
                          name={"services"}
                          placeholder={"Service / Industry"}
                          formik={Bidformik}
                        />
                      </div>
                      <div>
                        <label className="text-[12px] text-[#262626] font-normal">
                          Street Address 1
                        </label>
                        <Input
                          name={"street_address"}
                          placeholder={"Street Address 1"}
                          formik={Bidformik}
                          validation={Bidformik.errors.street_address}
                        />

                      </div>
                      <div>
                        <label className="text-[12px] text-[#262626] font-normal">
                          Street Address 2{" "}
                          <span className="font-bold text-[#262626] text-[10px]">
                            optional
                          </span>
                        </label>
                        <Input
                          name={"street_address_2"}
                          placeholder={"Street Address 2"}
                          formik={Bidformik}
                        />

                        <div className="flex gap-2">
                          <div className="w-[40%] mt-1">
                            <Input
                              Required={false}
                              label={"City"}
                              name={"city"}
                              placeholder={"City"}
                              formik={Bidformik}
                              validation={Bidformik.errors.city}
                            />
                          </div>

                          <div className="w-[20%] mt-[2px] ">
                            <Select
                              label={"State"}
                              name={"state"}
                              formik={Bidformik}
                              option={listState}
                            />
                          </div>

                          <div className="w-[40%] mt-1">
                            <Input
                              Required={false}
                              label={"Zip Code"}
                              name={"zip_code"}
                              placeholder={"Zip code"}
                              formik={Bidformik}
                              validation={Bidformik.errors.zip_code}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <div className="w-[60%]">
                          <label className="text-[12px] text-[#262626] font-normal">
                            Primary Phone Number
                          </label>

                          <PhoneInput
                            name={"primary_contact_number"}
                            placeholder={"(999) 843-8999"}
                            formik={Bidformik}
                            validation={Bidformik.errors.primary_contact_number}
                          />

                        </div>
                        <div className="w-[40%]">
                          <label className="text-[12px] text-[#262626] font-normal">
                            Phone type
                          </label>
                          <Select
                            name={"primary_contact_number_type"}
                            formik={Bidformik}
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

                      <div className="grid  gap-2 mt-4">
                        <h1 className="text-[20px] font-[400] Oswald-font text-[#262626] border-b border-gray-200 mb-2">
                          Contact Info
                        </h1>
                        <Input
                          label={"First Name"}
                          name={"first_name"}
                          placeholder={"First Name"}
                          formik={Bidformik}
                          validation={Bidformik.errors.first_name}
                        />
                      </div>
                      <div className="grid  gap-2">
                        <Input
                          label={"Last Name"}
                          name={"last_name"}
                          placeholder={"Last name"}
                          formik={Bidformik}
                          validation={Bidformik.errors.last_name}
                        />
                      </div>

                      <div className="grid  gap-2">
                        <Input
                          label={"Title / Position"}
                          name={"honorific"}
                          placeholder={"Title / Position"}
                          formik={Bidformik}
                          validation={Bidformik.errors.honorific}
                        />
                      </div>

                      <div className="flex gap-4">
                        <div className="w-[60%]">
                          <label className="text-[12px] text-[#262626] font-normal">
                            Primary Phone Number
                          </label>
                          <PhoneInput
                            name={"primary_phone_number"}
                            placeholder={"(999) 999-9999"}
                            formik={Bidformik}
                            validation={Bidformik.errors.primary_phone_number}
                          />

                        </div>
                        <div className="w-[40%]">
                          <label className="text-[12px] text-[#262626] font-normal">
                            Phone type
                          </label>
                          <Select
                            name={"primary_phone_number_type"}
                            formik={Bidformik}
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

                      <div className="flex gap-4">
                        <div className="w-[60%]">
                          <label className="text-[12px] text-[#262626] font-normal">
                            Secondary Phone Number
                          </label>

                          <PhoneInput
                            name={"secondary_phone_number"}
                            placeholder={"(999) 999-9999"}
                            formik={Bidformik}
                          />
                        </div>
                        <div className="w-[40%]">
                          <label className="text-[12px] text-[#262626] font-normal">
                            Phone type
                          </label>
                          <Select
                            name={"secondary_phone_number_type"}
                            formik={Bidformik}
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
                      <div className="grid gap-2">
                        <Input
                          label={"Email"}
                          name={"email_id"}
                          placeholder={"Email*"}
                          type={"email"}
                          formik={Bidformik}
                        />
                      </div>
                    </div>
                  )}

                  <div className="grid w-full justify-items-center my-4 gap-4">
                    <div
                      className="flex gap-1 w-full justify-center  bg-yellow-400  
                               py-2 px-4 rounded-[6px] shadow-[0_0px_30px_0px_#00000033] h-[45px]"
                      onClick={() => Bidformik.handleSubmit()}
                    >
                      <h1 className="text-[#262626] font-normal not-italic text-[16px]">
                        Next, confirm your Details
                      </h1>
                    </div>

                    <div
                      onClick={() => {
                        router.push(
                          `/bid/?access_token=${access_token}&access_data=${access_data}`
                        );
                      }}
                      className="flex gap-1 w-full justify-center  bg-[#CCD9E6] text-black
                         py-2 px-4 rounded-[6px]  shadow-[0_0px_30px_0px_#00000033] h-[45px]"
                    >
                      <span className="font-normal text-[16px] not-italic text-[#262626]">
                        Go back to project details
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {successPopup()}

          {show && (
            <>
              <SubHeader title={"Accountable: Property Management"} />
              <div className="px-4 py-6">
                <p className="text-[#262626] font-[500] text-[16px] ">
                  Confirm your information is correct for
                </p>
                {contractorsItem?.is_new_user === "yes" && (
                  <p className=" font-bold text-[#262626] text-[16px] ">
                    {formData.company_name}
                  </p>
                )}

                <p className="text-[11px] font-normal text-[#595959] pt-2 ">
                  Your Quote
                </p>
                <h3 className="text-[16px] not-italic font-bold">
                  ${formData.bid_price}
                </h3>

                <div>
                  <p className="text-[11px] font-normal text-[#595959] pt-2 ">
                    Quote Details
                  </p>
                  <p className="text-[16px] font-normal not-italic text-[#262626]">
                    {formData.additional_info ? formData.additional_info : "--"}
                  </p>
                  <p>
                    <p className="text-[11px] font-normal text-[#595959] pt-2 ">
                      Required Documents
                    </p>
                    <h3 className="text-[16px] font-bold  not-italic text-[#262626]">
                      {proCont?.length == 0
                        ? ""
                        : proCont?.length == 2
                        ? proCont[0] + ", " + proCont[1]
                        : `${proCont[0] || proCont[1]}`}
                      {" , " + author}
                    </h3>

                    <div className="flex mt-[25px] flex-wrap gap-x-[7px] gap-y-[15px] mb-[25px]">
                      {formData?.photos?.localImage.map((item, index) => (
                        <div
                          key={index}
                          className="h-[100px] w-[100px] overflow-hidden shadow-sm rounded-md group relative bg-cover object-center object-fill "
                        >
                          {
                            item?.image?.type.includes("image") ? (
                              <img
                                src={URL.createObjectURL(item.image)}
                                alt=""
                                onClick={() =>
                                  OpenLight(URL.createObjectURL(item.image))
                                }
                                className="w-full object-cover  rounded-md object-center h-full"
                              />
                            ) : (
                              <Pdfthumbnail
                                url={URL.createObjectURL(item.image)}
                                onClick={() => onButtonClick(item.image)}
                              />
                            )
                          }
                          <div
                            className="absolute bg-white shadow-lg top-1 right-1 rounded-[10px] w-[40px] h-[40px] text-center"
                            onClick={() => DeleteOpen(index)}
                          >
                            <IoTrashOutline className="text-[25px] text-red-500 mt-[7px] ml-[8px] " />
                          </div>
                        </div>
                      ))}
                    </div>
                  </p>
                  {contractorsItem?.is_new_user === "yes" && (
                    <div>
                      <div>
                        <div>
                          <div className="pt-4">
                            <span className="text-[20px] font-normal Oswald-font text-[#262626]">
                              Company Info
                            </span>
                            <hr className="my-1 border-t-2" />
                          </div>
                        </div>

                        <div className=" py-2 ">
                          <p className="text-slate-600 text-[11px]">
                            Company / Owner Name
                          </p>
                          <p>{formData.company_name}</p>
                        </div>

                        <div className=" py-2 ">
                          <p className="text-slate-600 text-[11px]">
                            Service / Industry
                          </p>
                          <p>{formData.services}</p>
                        </div>

                        <div className=" py-2 ">
                          <p className="text-slate-600 text-[11px]">
                            Business Address
                          </p>
                          <p>
                            {formData.street_address}
                            {formData.street_address_2 &&
                              ", " + formData.street_address_2}
                          </p>
                        </div>

                        <div className=" py-2 flex  ">
                          <div className="w-[60%]">
                            <p className="text-slate-600 text-[11px]">
                              Phone Number
                            </p>
                            <p>{formData.primary_contact_number}</p>
                          </div>
                          <div className="w-[40%]">
                            <p className="text-slate-600 text-[11px]">
                              Phone Type
                            </p>
                            <p>{formData.primary_contact_number_type}</p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <div>
                          <div className="pt-4">
                            <span className="text-[20px] font-normal Oswald-font text-[#262626]">
                              Contact Info
                            </span>
                            <hr className="my-1 border-t-2" />
                          </div>
                        </div>

                        <div className=" py-2 flex  ">
                          <div className="w-[33.33%]">
                            <p className="text-slate-600 text-[11px]">
                              First Name
                            </p>
                            <p>{formData.first_name}</p>
                          </div>

                          <div className="w-[33.33%]">
                            <p className="text-slate-600 text-[11px]">
                              Last Name
                            </p>
                            <p>{formData.last_name}</p>
                          </div>

                          <div className="w-[33.33%]">
                            <p className="text-slate-600 text-[11px]">
                              Title / Position
                            </p>
                            <p>{formData.honorific}</p>
                          </div>
                        </div>

                        <div className=" py-2 flex  ">
                          <div className="w-[60%]">
                            <p className="text-slate-600 text-[11px]">
                              Primary Phone Number
                            </p>
                            <p>{formData.primary_phone_number}</p>
                          </div>
                          <div className="w-[40%]">
                            <p className="text-slate-600 text-[11px]">
                              Phone Type
                            </p>
                            <p>{formData.primary_phone_number_type}</p>
                          </div>
                        </div>

                        <div className=" py-2 flex  ">
                          <div className="w-[60%]">
                            <p className="text-slate-600 text-[11px]">
                              Secondary Phone Number
                            </p>
                            <p>{formData.secondary_phone_number}</p>
                          </div>
                          <div className="w-[40%]">
                            <p className="text-slate-600 text-[11px]">
                              Phone Type
                            </p>
                            <p>{formData.secondary_phone_number_type}</p>
                          </div>
                        </div>

                        <div className=" py-2 ">
                          <p className="text-slate-600 text-[11px]">Email</p>
                          <p>{formData.email_id}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div
                  className="flex gap-1 h-[45px] w-full shadow-[0_0px_30px_rgba(0,0,0,0.2)] items-center justify-center  bg-[#F2DA31]  
                           py-2 px-4 rounded-[6px]  "
                  onClick={() => handleSend(formData)}
                >
                  <span className="text-[16px] font-normal text-[#262626] not-italic leading-5">
                    Send Quote
                  </span>
                </div>
                <div
                  className="flex mt-[15px] items-center shadow-[0_0px_30px_rgba(0,0,0,0.2)] gap-1 h-[45px] w-full justify-center  bg-[#CCD9E6] text-black
                           py-2 px-4 rounded-[6px] drop-shadow"
                  onClick={() => {
                    setShow(false);
                  }}
                >
                  <span className="text-[16px] font-normal text-[#262626] not-italic leading-5">
                    Go back and make a change
                  </span>
                </div>
              </div>
            </>
          )}

          {showPopup && (
            <DeletePhotoPopup
              deletePhoto={() => deletePhoto(deleteID)}
              datashow={showPopup ? "block" : "hidden"}
              onClicked={() => setShowPopup(false)}
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
      )}
    </>
  );
}
