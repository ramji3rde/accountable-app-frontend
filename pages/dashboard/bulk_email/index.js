import React, { useState, KeyboardEventHandler } from "react";
import SubHeader from "../../../components/public-com/header";
import { useRouter } from "next/router";
import Input from "../../../components/public-com/form/Input";
import Button from "../../../components/public-com/form/button";
import AddPhoto from "../../../components/public-com/form/addDocs";
import { IoTrashOutline } from "react-icons/io5";
import DeletePhotoPopup from "../../../components/tenants/details/deletePhotopopup";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import { useFormik, setFieldValue } from "formik";
import { bulkEMailAPI, addDocsAPIS } from "../../../redux/APIS/API";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const Index = () => {
  const router = useRouter();
  function GoBack() {
    router.back();
  }
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [inputValue1, setInputValue1] = useState("");
  const [inputValue2, setInputValue2] = useState("");
  const [value, setValue] = useState([]);
  const [value1, setValue1] = useState([]);
  const [value2, setValue2] = useState([]);
  const [deleteID, setDeleteID] = useState(true);
  const [photosApi, setPhotos] = useState([]);
  const [deleteType, setDeleteType] = useState("");
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [custom, setCustom] = useState(false);
  const [custom1, setCustom1] = useState(false);
  const [custom2, setCustom2] = useState(false);
  const [selectedOption, setSelectedOption] = useState("none");
  const [selectedOption1, setSelectedOption1] = useState("none");
  const [selectedOption2, setSelectedOption2] = useState("none");
  const [cc, setCc] = useState(false);
  const [bcc, setBcc] = useState(false);

  const options = [
    { value: "everyone", label: "Everyone" },
    { value: "tenants", label: "All Tenants" },
    { value: "contractors", label: "All Contractors" },
    { value: "support_team", label: "Support Team" },
    { value: "custom", label: "Custom" },
  ];

  const profileEmail = useSelector((state) => state?.userActive?.user?.email);

  const components = {
    DropdownIndicator: null,
  };

  // const router = Router()

  const createOption = (label) => ({
    label,
    value: label,
  });

  const handleCreate = (inputValue) => {
    setIsLoading(true);
    setTimeout(() => {
      const newOption = createOption(inputValue);
      setIsLoading(false);
      setOptions((prev) => [...prev, newOption]);
      setValue(newOption);
    }, 1000);
  };

  const DeleteOpen = (id, type) => {
    setDeleteID(id);
    setDeleteType(type);
    setShowDeletePopup(true);
  };

  const DeleteClose = () => {
    setShowDeletePopup(false);
  };

  const deletePhoto = (indexDelete) => {
    const currentPhotos = EmailFormik.values.photos.localImage;

    if (indexDelete >= 0 && indexDelete < currentPhotos.length) {
      const updatedPhotos = currentPhotos.filter(
        (item, index) => index !== indexDelete
      );
      EmailFormik.setFieldValue("photos", {
        ...EmailFormik.values.photos,
        localImage: updatedPhotos,
      });

      toast.success("Photo deleted Successfully");
    } else {
      // console.log("Invalid index to delete");
    }

    setShowDeletePopup(false);
  };

  const deletePhotoapi = (id) => {
    const photos = photosApi.filter((item) => item.photo_id !== id);
    toast.success("Photo deleted Successfully");

    setPhotos([...photos]);
  };
  const EmailFormik = useFormik({
    initialValues: {
      from: "charles@getaccountableapp.com",
      to: selectedOption,
      subject: "",
      body: "",
      photos: {
        localImage: [],
        cloudImage: [],
      },
      multiple: value,
      cc: "",
      bcc: "",
      ccCustom: [],
      bccCustom: [],
    },
    validate,
    onSubmit: async (values) => {
      values.multiple = value;
      values.to = selectedOption;
      values.cc = selectedOption1;
      values.bcc = selectedOption2;
      values.ccCustom = value1;
      values.bccCustom = value2;

      try {
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

          formdata.append(
            "detail",
            values?.photos?.detail ? values?.photos?.detail : ""
          );
          formdata.append("upload_for", "post");

          const addpoes = await addDocsAPIS(formdata);

          values.photos.cloudImage = addpoes?.data?.data?.s3_bucket_file_url;
        }

        const res = await bulkEMailAPI(values);

        if (res?.data) {
          toast.success("Mail Sent SuccessFully");
          router.push("/");
        } else {
          toast.error("Mail is Not Try Again Later");
          router.push("/");
        }

        // console.log(res?.data, "bulk mail");
      } catch (err) {
        console.log(err);
      }
    },
  });

  const handleKeyDown = (event) => {
    // console.log(event);
    //alert(event.which)
    if (!inputValue) return;
    // if(event.key === 'Enter'){
    //   setValue((prev) => [...prev, createOption(inputValue)]);
    //   setInputValue("");
    //   event.preventDefault();
    // }
    switch (event.key) {
      case "Enter":
      case "Tab":
        setValue((prev) => [...prev, createOption(inputValue)]);
        setInputValue("");
        event.preventDefault();
    }
  };

  const handleKeyDown1 = (event) => {
    if (!inputValue1) return;
    switch (event.key) {
      case "Enter":
      case "Tab":
        setValue1((prev) => [...prev, createOption(inputValue1)]);
        setInputValue1("");
        event.preventDefault();
    }
  };

  const handleKeyDown2 = (event) => {
    if (!inputValue2) return;
    switch (event.key) {
      case "Enter":
      case "Tab":
        setValue2((prev) => [...prev, createOption(inputValue2)]);
        setInputValue2("");
        event.preventDefault();
    }
    ``;
  };
  const handleTypeSelect = (e) => {
    e.value === "custom"
      ? (setCustom(true), setSelectedOption(e.value))
      : (setCustom(false), setSelectedOption(e.value));
  };

  const handleTypeSelect1 = (e) => {
    e.value === "custom"
      ? (setCustom1(true), setSelectedOption1(e.value))
      : (setCustom1(false), setSelectedOption1(e.value));
  };

  const handleTypeSelect2 = (e) => {
    e.value === "custom"
      ? (setCustom2(true), setSelectedOption2(e.value))
      : (setCustom2(false), setSelectedOption2(e.value));
  };

  const validate = (values) => {
    const errors = {};

    if (!values.multiple) {
      errors.email = "Please enter email";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.multiple)
    ) {
      errors.multiple = "Invalid email address";
    }

    return errors;
  };

  return (
    <div className="App bg">
      <SubHeader title={"Send Bulk Email"} backFunction={GoBack} />
      <div className="px-4 pb-16 pt-6 ">
        <form method="POST" onSubmit={EmailFormik.handleSubmit}>
          <div className="flex flex-col gap-3 max-w-[400px] ">
            <div className="flex items-center justify-end">
              <span className="text-[12px] pr-1">From</span>
              <div className="w-[300px] ml-1">
                <Input
                  name={"from"}
                  placeholder={`<charles@getaccountableapp.com>`}
                  formik={EmailFormik}
                  disabled={true}
                />
              </div>
            </div>

            <div className="flex items-center justify-end Toselectbox ">
              <span className="text-[12px]">To</span>
              <div>
                <div className="w-[300px] ml-2 Toselectboxdiv1">
                  <Select
                    name={"to"}
                    options={options}
                    formik={EmailFormik}
                    onChange={handleTypeSelect}
                    value={options.filter(function (option) {
                      return option.value === selectedOption;
                    })}
                    className="SelectLib"
                  />
                </div>
                {custom && (
                  <div className=" w-[300px] ml-2">
                    <CreatableSelect
                      name={"emails"}
                      formik={EmailFormik}
                      components={components}
                      inputValue={inputValue}
                      isClearable
                      isMulti
                      menuIsOpen={false}
                      onChange={(newValue) => {
                        setValue(newValue);
                        EmailFormik.handleChange;
                      }}
                      onInputChange={(newValue) => {
                        setInputValue(newValue);
                        EmailFormik.handleChange;
                      }}
                      onKeyDown={handleKeyDown}
                      placeholder="Type Emails here and press enter..."
                      value={value}
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="flex w-[300px] gap-2 items-center ml-auto min-[375px]:w-[250px] ">
              {/* <div className=" flex"> */}
              <p
                className={`${cc ? "text-[12px] font-[600]" : "text-[12px] "}`}
                onClick={() => setCc(!cc)}
              >
                {`${cc ? "Hide Cc" : "Show Cc"}`}
              </p>
              <p
                className={`${bcc ? "text-[12px] font-[600]" : "text-[12px] "}`}
                onClick={() => setBcc(!bcc)}
              >
                {`${bcc ? "Hide Bcc" : "Show Bcc"}`}
              </p>
              {/* </div> */}
            </div>

            {cc && (
              <div className="flex items-center w-[320px] Toselectbox ml-auto ">
                <span className="text-[12px]">Cc</span>
                <div>
                  <div className="w-[300px] ml-2 Toselectboxdiv1">
                    <Select
                      name={"cc"}
                      options={options}
                      formik={EmailFormik}
                      onChange={handleTypeSelect1}
                      value={options.filter(function (option) {
                        return option.value === selectedOption1;
                      })}
                      className="SelectLib"
                    />
                  </div>
                  {custom1 && (
                    <div className=" w-[300px] ml-2">
                      <CreatableSelect
                        name={"emails"}
                        formik={EmailFormik}
                        components={components}
                        inputValue={inputValue1}
                        isClearable
                        isMulti
                        menuIsOpen={false}
                        onChange={(newValue) => {
                          setValue1(newValue);
                          EmailFormik.handleChange;
                        }}
                        onInputChange={(newValue) => {
                          setInputValue1(newValue);
                          EmailFormik.handleChange;
                        }}
                        onKeyDown={handleKeyDown1}
                        placeholder="Type Emails here and press enter..."
                        value={value1}
                      />
                    </div>
                  )}
                </div>
              </div>
            )}

            {bcc && (
              <div className="flex items-center w-[317px] mr-2 Toselectbox ml-auto">
                <span className="text-[12px]">Bcc</span>
                <div className="w-full">
                  <div className="w-full ml-2 Toselectboxdiv1">
                    <Select
                      name={"to"}
                      options={options}
                      formik={EmailFormik}
                      onChange={handleTypeSelect2}
                      value={options.filter(function (option) {
                        return option.value === selectedOption2;
                      })}
                      className="SelectLib"
                    />
                  </div>
                  {custom2 && (
                    <div className=" w-[300px] ml-2">
                      <CreatableSelect
                        name={"emails"}
                        formik={EmailFormik}
                        components={components}
                        inputValue={inputValue2}
                        isClearable
                        isMulti
                        menuIsOpen={false}
                        onChange={(newValue) => {
                          setValue(newValue);
                          EmailFormik.handleChange;
                        }}
                        onInputChange={(newValue) => {
                          setInputValue2(newValue);
                          EmailFormik.handleChange;
                        }}
                        onKeyDown={handleKeyDown2}
                        placeholder="Type Emails here and press enter..."
                        value={value2}
                      />
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="flex  items-center justify-end">
              <span className=" text-[12px] ml-[-10px]">Subject</span>
              <div className="w-[300px] ml-2">
                <Input
                  name={"subject"}
                  placeholder={"Subject"}
                  type={"text"}
                  formik={EmailFormik}
                  className="p-2 "
                />
              </div>
            </div>

            <div className=" flex justify-end">
              <span className="text-[12px] ml-[-13px]">Message</span>
              <textarea
                name="body"
                rows="5"
                placeholder="Write your message here"
                // formik={EmailFormik}
                type={"textarea"}
                onChange={EmailFormik.handleChange}
                className="w-[300px] py-[10px] px-[10px] bg-[#FFF] text-[#000]  ml-2
                border-[1px] rounded-[6px] border-inputBorderColor focus:border-black focus:outline-none"
              ></textarea>
            </div>

            <div className="pb-4">
              <span className="text-[20px] font-normal text-[#262626] Oswald-font">
                Attach Files
              </span>
              <hr className="my-1 border-t-2" />
            </div>
            <div className="flex justify-start">
              <AddPhoto btnName={"Add Files"} formik={EmailFormik} />
            </div>

            <div className="grid mt-[2px] grid-cols-3 gap-x-[10px] gap-y-[15px] mb-[15px]">
              {EmailFormik?.values?.photos?.localImage.map((item, index) => (
                <div
                  key={index}
                  className="h-[107px] w-[109px] shadow-sm rounded-md group relative "
                >
                  {item.image.type.includes("image") ? (
                    <img
                      src={URL.createObjectURL(item?.image)}
                      alt={"Photo"}
                      onClick={() => OpenLight(URL.createObjectURL(item.image))}
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
                        DeleteOpen(item.photo_id, "deletePhotoapi")
                      }
                    >
                      <IoTrashOutline className="text-[20px] text-red-500 mt-[5px] ml-[5px] " />
                    </div>
                  </div>
                ))}
            </div>
            <div className="fixed bottom-0 left-0 w-full shadow-[1px_-10px_13px_2px_#0000000d] ">
              <div className="grid grid-cols-2 w-full bg-[#fff] ">
                <div className="flex justify-center">
                  <div className="w-full flex justify-center h-[70px]">
                    <button
                      type="submit"
                      className="text-[#262626] font-normal not-italic text-[1.375rem] px-4 py-2 w-full mx-auto bg-[#4DE060] "
                    >
                      Send
                    </button>
                  </div>
                </div>

                <div className="flex justify-center">
                  <div
                    onClick={GoBack}
                    className="px-4 py-2 w-full items-center mx-auto flex justify-center bg-[#CCD9E6]  text-[#262626] font-normal not-italic text-[1.375rem]"
                  >
                    <span className="">Cancel</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
      {
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
      }
    </div>
  );
};

export default Index;
