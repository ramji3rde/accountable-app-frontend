import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { IoTrashOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import AddPhoto from "../../components/public-com/form/addDocs";
import Input from "../../components/public-com/form/Input";
import DeletePhotoPopup from "../../components/tenants/details/deletePhotopopup";
import SubHeader from "../../components/public-com/header";
import AddNotes from "../../components/tenants/details/addnotes";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import EditNotesPopup from "../../components/tenants/details/editNotesPopup";
import DeleteNotesPopup from "../../components/tenants/details/deleteNotesPopup";
import {
  addDocsAPIS,
  createCategory,
  createExpensesAPI,
  createNoteAPI,
  getProfile,
  deleteNoteAPI,
  deleteTenantsPhotoAPI,
  getAllCategory,
  updateExpenseAPI,
} from "../../redux/APIS/API";
import { getExpensesDetails } from "../../redux/action/expensesDetails";
import PreViewPDF from "../../components/tenants/details/PreViewPDF";
import TanantsLightbox from "../../components/tenants/details/lightbox";
import Button from "../../components/projects/form/Button";

function ExpensesForm() {
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showNotesPopup, setShowNotesPopup] = useState(false);
  const [showContractorPopup, setContractorPopup] = useState(false);
  const [showtenantsPopup, setTenantsPopup] = useState(false);
  const [deleteType, setDeleteType] = useState("");
  const [deleteID, setDeleteID] = useState(true);
  const [editNote, setEditNote] = useState();
  const [index, setIndex] = useState();
  const [showEditNotesPopup, setShowEditNotesPopup] = useState(false);
  const [photosApi, setPhotos] = useState([]);
  const [notesApi, setNotesApi] = useState([]);
  const [detail, setDetail] = useState();
  const [selectedOption, setSelectedOption] = useState([]);
  const [allCategory, setAllCategory] = useState([]);
  const [userProperty, setUserProperty] = useState("");
  const [pdfUrl, setPdfUrl] = useState("");
  const [showPDFPreview, setShowPDFPreview] = useState(false);
  const [lightBox, setLightBox] = useState(false);
  const [imageSrc, setImageSrc] = useState(true);

  const addNewCategory = async (value) => addNewCategoryReturn(value);

  const OpenLight = (img) => {
    setImageSrc(img);
    setLightBox(true);
  };

  const addNewCategoryReturn = async (value) => {
    let data = { category_name: value };
    const addNewCategory = await createCategory(data);

    getCategory();
    return {
      label: value,
      value: addNewCategory?.data?.data?.category_id?.term_id,
    };
  };

  async function getCategory() {
    const res = await getAllCategory();

    const updateArray = res?.data?.data.map(function (item) {
      return {
        label: item.name,
        value: item.term_id,
      };
    });
    setAllCategory(updateArray);
  }

  useEffect(() => {
    getCategory();
  }, [selectedOption]);

  const dispatch = useDispatch();
  const router = useRouter();

  const userId = useSelector((state) => state.userActive?.user?.id);

  const ExpensesEditMode = router.query.edit;

  const DeletePopupOpen = (id, type) => {
    setDeleteID(id);
    setDeleteType(type);
    setShowDeletePopup(true);
  };

  const editExpenses = useSelector(
    (state) => state?.expenseDetails?.expenseDetails?.data
  );

  const projectId = null;

  useEffect(() => {
    if (ExpensesEditMode) {
      setPhotos([...editExpenses.photos]);
      setNotesApi([...editExpenses.notes]);
    } else {
      router.push("/expenses/form");
    }
  }, [editExpenses]);

  const validate = (values) => {
    const errors = {};

    if (!values.item_name) {
      errors.item_name = "Please enter Expenses Name";
    }

    return errors;
  };

  useEffect(() => {
    getProfile().then((el) => {
      setUserProperty(el?.data?.data[0]?.property_name);
    });
  }, []);

  // formik data
  const ExpenseFormik = useFormik({
    initialValues: {
      author: "" + userId,
      item_name:
        editExpenses?.item_name && ExpensesEditMode
          ? editExpenses?.item_name
          : "",
      expense_amount:
        editExpenses?.expense_amount && ExpensesEditMode
          ? editExpenses?.expense_amount
          : "",
      purchase_date:
        editExpenses?.purchase_date && ExpensesEditMode
          ? editExpenses?.purchase_date
          : "",
      expense_detail:
        editExpenses?.expense_detail && ExpensesEditMode
          ? editExpenses?.expense_detail
          : "",
      expense_category:
        editExpenses?.expense_category && ExpensesEditMode
          ? editExpenses?.expense_category
          : "",
      property_name:
        editExpenses?.property_name && ExpensesEditMode
          ? editExpenses?.property_name
          : "",
      photos: {
        localImage: [],
        detail: "",
      },
      notes: [],
    },
    validate,
    onSubmit: async (values) => {
      try {
        if (ExpensesEditMode === "true") {
          values.expenseId = editExpenses?.expense_id;

          const res = await updateExpenseAPI(values);

          toast.success(res.data.message);

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
          //   formdata.append("user_post_id", editExpenses?.expense_id);
          //   formdata.append("author", userId);
          //   formdata.append(
          //     "detail",
          //     values?.photos?.detail ? values?.photos?.detail : ""
          //   );
          //   formdata.append("upload_for", "post");
          //   const addpoes = await addDocsAPIS(formdata);
          //   dispatch(getExpensesDetails(editExpenses?.expense_id));
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

            formdata.append("user_post_id", editExpenses?.expense_id);
            formdata.append("author", userId);
            formdata.append(
              "detail",
              values?.photos?.detail ? values?.photos?.detail : ""
            );
            formdata.append("upload_for", "post");

            const addpoes = await addDocsAPIS(formdata);
            dispatch(getExpensesDetails(editExpenses?.expense_id));
          }

          const Notedata = {
            post_id: editExpenses?.expense_id,
            author: "" + userId,
            notes: values.notes,
          };

          if (Notedata.notes.length > 0) {
            const responNotes = await createNoteAPI(Notedata);
          }

          dispatch(getExpensesDetails(editExpenses?.expense_id));
          router.push("/expenses/details");
        } else {
          const respon = await createExpensesAPI(values);
          const resExpenseID = respon?.data?.data?.expense_id;
          
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

            formdata.append("user_post_id", resExpenseID);
            formdata.append("author", userId);
            formdata.append(
              "detail",
              values?.photos?.detail ? values?.photos?.detail : ""
            );
            formdata.append("upload_for", "post");

            const addpoes = await addDocsAPIS(formdata);
            // dispatch(getExpensesDetails(editExpenses?.expense_id));
          }

          const Notedata = {
            post_id: "" + resExpenseID,
            author: "" + userId,
            notes: values.notes,
          };

          if (Notedata.notes.length > 0) {
            const responNotes = await createNoteAPI(Notedata);
          }

          toast.success(respon.data.message);
          router.push("/expenses/list");
        }
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
        // console.log("err", error.response);
      }
    },
  });

  useEffect(() => {
    if (
      ExpensesEditMode !== "true" &&
      userProperty &&
      ExpenseFormik.values.property_name == ""
    ) {
      ExpenseFormik.setFieldValue("property_name", userProperty);
    }
  }, [userProperty]);

  // delete functions
  const DeleteNotes = (id, type) => {
    setDeleteID(id);
    setDeleteType(type);
    setShowNotesPopup(true);
  };

  const deletePhoto = (indexDelete) => {
    const currentPhotos = ExpenseFormik.values.photos.localImage;

    if (indexDelete >= 0 && indexDelete < currentPhotos.length) {
      const updatedPhotos = currentPhotos.filter(
        (item, index) => index !== indexDelete
      );
      ExpenseFormik.setFieldValue("photos", {
        ...ExpenseFormik.values.photos,
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

  // delete local
  const deleteNotes = (indexDelete) => {
    const notes = ExpenseFormik.values.notes.filter(
      (item, index) => index !== indexDelete
    );
    ExpenseFormik.setFieldValue("notes", [...notes]);
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

  function onClickPreview(value) {
    setPdfUrl(value);
    setShowPDFPreview(true);
  }

  return (
    <>
      <div className="App">
        {ExpensesEditMode ? (
          <SubHeader title={"Edit Expense"} backUrl={"/expenses/details"} />
        ) : (
          <SubHeader title={"Add Expense"} backUrl={"/expenses/list"} />
        )}

        <div className="px-4 pb-16 pt-6 ">
          <div>
            <div>
              <div className="pb-4">
                <span className="text-[20px] font-normal text-[#262626] Oswald-font ">
                  Expense Info
                </span>
                <hr className="my-1 border-t-2" />
              </div>

              <div className="grid grid-cols-1 gap-2 mb-5">
                <div className="flex gap-4">
                  <div className=" w-[50%]">
                    <Input
                      Required={true}
                      label={"Item Name"}
                      name={"item_name"}
                      placeholder={"Item Name"}
                      formik={ExpenseFormik}
                      validation={ExpenseFormik.errors.item_name}
                    />
                    <div className="mt-3">
                      <Input
                        label={"Purchase Date"}
                        name={"purchase_date"}
                        placeholder={"Purchase Date"}
                        type={"date"}
                        formik={ExpenseFormik}
                      />
                    </div>
                  </div>
                  <div className="w-[50%] relative">
                    <Input
                      inputHeight={"h-[104px] text-[36px] pl-[40px]"}
                      label={"Amount"}
                      name={"expense_amount"}
                      placeholder={"0"}
                      type={"number"}
                      formik={ExpenseFormik}
                    />
                    <div className=" absolute top-[60.5px] left-[12px]">
                      <svg
                        width="17"
                        height="28"
                        viewBox="0 0 17 28"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M15.6675 16.625C14.8857 15.2378 13.5643 14.2362 12.0175 13.8584C11.2994 13.6429 10.5706 13.4649 9.83412 13.325L9.83412 5.76669C11.2984 5.92375 12.6953 6.46414 13.8841 7.33335C14.1074 7.53134 14.4194 7.59516 14.7025 7.50078C14.9856 7.40639 15.1968 7.16814 15.2566 6.87578C15.3164 6.58341 15.2157 6.28134 14.9925 6.08335C13.501 4.93469 11.7101 4.2403 9.83412 4.08335V1.50002C9.83412 1.03978 9.46102 0.666687 9.00078 0.666687C8.54055 0.666687 8.16745 1.03978 8.16745 1.50002V4.00002C4.50078 4.08335 2.47578 5.90835 1.85912 7.48335C1.00968 9.57749 1.79491 11.9789 3.71745 13.1667C5.07278 13.9929 6.59086 14.516 8.16745 14.7L8.16745 22.3334C5.99188 22.2238 3.90777 21.424 2.21745 20.05C2.01161 19.8051 1.6837 19.6996 1.37365 19.7786C1.0636 19.8576 0.826173 20.1072 0.76269 20.4208C0.699206 20.7344 0.82088 21.0566 1.07578 21.25C3.06906 22.9282 5.56391 23.8956 8.16745 24V26.5C8.16745 26.9603 8.54055 27.3334 9.00078 27.3334C9.46102 27.3334 9.83412 26.9603 9.83412 26.5V24C12.1841 23.8417 14.8925 23.0917 15.9175 20.0334C16.292 18.9094 16.202 17.6823 15.6675 16.625ZM4.65912 11.7667C3.40205 11.0184 2.87557 9.46722 3.41745 8.10835C3.50912 7.85835 4.44245 5.76669 8.16745 5.66669L8.16745 13C6.92432 12.8401 5.72888 12.4198 4.65912 11.7667ZM9.83412 22.3C12.4008 22.1084 13.7341 21.25 14.3341 19.4667C14.5487 18.7759 14.486 18.0287 14.1591 17.3834C13.5754 16.4018 12.6144 15.7029 11.5008 15.45C10.9175 15.275 10.3675 15.1417 9.83412 15.025V22.3Z"
                          fill="#262626"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="flex ">
                  <div className="w-full">
                    <label className="text-[12px] text-[400]  text-[#262626] not-italic">
                      Expense Details
                    </label>
                    <textarea
                      name="expense_detail"
                      id="expense_detail"
                      placeholder="Enter details about this expense"
                      onChange={ExpenseFormik.handleChange}
                      value={ExpenseFormik.values.expense_detail}
                      rows="4"
                      className="font-normal not-italic h-[98px] w-full text-[16px] py-[6px] px-[5px] rounded-[6px]
                                bg-[#FFF] text-[#000] border-[0.5px] border-solid border-[#A6A6A6] focus:border-black focus:outline-none"
                    />
                  </div>
                </div>

                <div className="items-center ">
                  <Input
                    label={"Category"}
                    placeholder={"Add Category"}
                    name={"expense_category"}
                    formik={ExpenseFormik}
                  />

                  <div className="mt-3">
                    <Input
                      label={"Property"}
                      placeholder={"Add Property"}
                      name={"property_name"}
                      formik={ExpenseFormik}
                    />
                  </div>
                </div>

                <div className=" mt-[30px]">
                  <span className="text-[20px] font-normal text-[#262626] Oswald-font">
                    Receipts / Photos / Documents
                  </span>
                  <hr className="my-1 border-t-2" />
                </div>

                <div className="flex justify-end">
                  <AddPhoto btnName={"Add Files"} formik={ExpenseFormik} />
                </div>

                <div className="grid mt-[2px] grid-cols-3 gap-x-[10px] gap-y-[15px] mb-[15px]">
                  {ExpenseFormik?.values?.photos?.localImage.map(
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
                          onClick={() => DeletePopupOpen(index, "deletePhoto")}
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
                            DeletePopupOpen(item.photo_id, "deletePhotoAPI")
                          }
                        >
                          <IoTrashOutline className="text-[20px] text-red-500 mt-[5px] ml-[5px] " />
                        </div>
                      </div>
                    ))}

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

                <div className="mt-[10px] ">
                  <span className="text-[20px] Oswald-font font-normal text-black">
                    Notes
                  </span>
                  <hr className="border-t-2" />
                </div>
                <AddNotes formik={ExpenseFormik} />

                {/* local */}
                {ExpenseFormik?.values?.notes?.length > 0 &&
                  ExpenseFormik?.values?.notes?.map((item, index) => (
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
                          setEditNote(item);
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
                          setEditNote(item);
                          setIndex(index);
                          setShowEditNotesPopup(true);
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
                    formik={ExpenseFormik}
                    detail={editNote}
                    index={index}
                    EditId={editExpenses?.expense_id}
                    clientName={"expenses"}
                  />
                )}

                <div className="w-[100%] pt-[10px] pb-[50px] ">
                  <h1 className="text-[20px] Oswald-font font-normal text-[#262626] not-italic">
                    Linked Email
                  </h1>
                  <hr className="my-1 border-t-2" />
                  <div className="flex justify-end">
                    <Button
                      href={() => router.push("/expenses/send_email")}
                      name={"Send Email"}
                      boxShadow={"shadow-[0_0px_30px_rgba(0,0,0,0.2)]"}
                    />
                  </div>
                </div>

                <DeleteNotesPopup
                  deleteNote={() => {
                    if (deleteType === "deleteNotes") {
                      deleteNotes(deleteID);
                    } else deleteNotesapi(deleteID);
                  }}
                  datashow={showNotesPopup ? "block" : "hidden"}
                  onClicked={() => setShowNotesPopup(false)}
                />
              </div>

              <DeletePhotoPopup
                deletePhoto={() => {
                  if (deleteType === "deletePhoto") {
                    deletePhoto(deleteID);
                  } else {
                    deletePhotoapi(deleteID);
                  }
                }}
                datashow={showDeletePopup ? "block" : "hidden"}
                onClicked={() => setShowDeletePopup(false)}
              />
            </div>
          </div>
        </div>

        <div className="fixed bottom-0 left-0 w-full shadow-[1px_-10px_13px_2px_#0000000d] ">
          <div className="grid grid-cols-2 w-full bg-[#fff] ">
            <div className="flex justify-center">
              <div className="w-full flex justify-center h-[70px]">
                <button
                  type="submit"
                  className="text-[#262626] font-normal not-italic text-[1.375rem] px-4 py-2 w-full mx-auto bg-[#4DE060] "
                  onClick={() => ExpenseFormik.handleSubmit()}
                >
                  {ExpensesEditMode ? "Update" : "Save"}
                </button>
              </div>
            </div>
            {ExpensesEditMode ? (
              <Link href="/expenses/details">
                <div className="flex justify-center">
                  <div className="px-4 py-2 w-full items-center mx-auto flex justify-center bg-[#CCD9E6]  text-[#262626] font-normal not-italic text-[1.375rem]">
                    <span className="">Cancel</span>
                  </div>
                </div>
              </Link>
            ) : (
              <Link href="/expenses/list">
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

export default ExpensesForm;