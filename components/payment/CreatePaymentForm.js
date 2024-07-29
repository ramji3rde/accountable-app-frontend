import React, { useEffect, useState } from "react";
import { useFormik, setFieldValue } from "formik";
import Select from "react-select";
import Input from "../public-com/form/Input";
import AddPhoto from "../public-com/form/addDocs";
import PdfThumbnail from "../public-com/pdfThumbnail";
import { IoTrashOutline, IoFlagSharp } from "react-icons/io5";
import DeletePhotoPopup from "../tenants/details/deletePhotopopup";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { createPaymentAPI, getTenantsAPI } from "../../redux/APIS/API";
import { getTenants, getTenantsFilter } from "../../redux/action/tenants";
import Link from "next/link";
import { reactLocalStorage } from "reactjs-localstorage";
import { useRouter } from "next/router";

const CreatePaymentForm = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);
  // const [selectedOption, setSelectedTenentOption] = useState();
  const [custom, setCustom] = useState(false);
  const [selectedBPPeriod, setSelectedBPPeriod] = useState("day");
  const [selectedBPNumber, setBPSelectedNumber] = useState();
  const [latePayment, setLatePayment] = useState(false);
  const [photosApi, setPhotos] = useState([]);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [deleteID, setDeleteID] = useState(true);
  const [deleteType, setDeleteType] = useState("");
  const [paymentType, setPaymentType] = useState("");
  const [forever, setForever] = useState(false);
  const [lateFeeAmount, setLateFeeAmount] = useState(0);
  const [lateFeeChargeAmount, setLateFeeChargeAmount] = useState(0);
  const [lateFeeDuePeriod, setLateFeeDuePeriod] = useState("day");
  const [onSubmitLoader, setOnSubmitLoader] = useState(false)

  const dispatch = useDispatch();


  const tenants = useSelector((state) => state?.tenants?.tenants?.data);

  const AdminDetails = reactLocalStorage.get('persist:persist-store')

  const AdminId = JSON.parse(JSON.parse(AdminDetails).user).id

  const router = useRouter();

  useEffect(() => {
    if (tenants == null) {
      // dispatch(getTenants());

      let data = {
        posts_per_page: "-1",
        paged: "1",
        sort_by_field: "a-z",
        search_by_keyword: ""
      }
      dispatch(getTenantsFilter(data))

    }
  }, [tenants]);


  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };


  const handleCheckboxChange2 = () => {
    setIsChecked2(!isChecked2);
  };

  const handleTypeSelectTenents = (e) => {
    paymentFormik.setFieldValue("customer_ids", [e.value]);
  };

  console.log("tenants", tenants)


  const staticOption = {
    // value: 'all', 
    label: 'Select Tenants / Units',
  };

  const options = [...(tenants?.map((data) => {
    return {
      value: data.tenant_user_id,
      label: data.post_title,
    };
  }) || [])];

  // const options = [
  //   { value: "all", label: "All Tenants / Unit" },
  //   { value: "tenants", label: "All Tenants" },
  // ];

  const billingPeriodOPtions = [
    { value: "daily", label: "Daily" },
    { value: "weekly", label: "Weekly" },
    { value: "3|months", label: "Every 3 months" },
    { value: "6|months", label: "Every 6 months" },
    { value: "yearly", label: "Yearly" },
    { value: "custom", label: "Custom" },
  ];

  const handleTypeSelectBilling = (e) => {
    e.value === "custom"
      ? (setCustom(true))
      : (setCustom(false));

    e.value === "custom" ? null : paymentFormik.setFieldValue("billing_period", e.value);
  };


  const periodOPtions = [
    { value: "day", label: "Day(s)" },
    { value: "week", label: "Week(s)" },
    { value: "month", label: "Month(s)" },
    { value: "Year", label: "Year(s)" },
  ];


  const paymentFormik = useFormik({
    initialValues: {
      admin_id: AdminId,
      customer_ids: "3",
      photos: {
        localImage: [],
        detail: ""
      },
      forever: forever ? 'Yes' : 'No',
      amount: '',
      start_date: '',
      type: '',
      description: '',
      due_date: '',
      end_date: '',
      let_fee: latePayment ? 'Yes' : "No",
      let_fee_amount: lateFeeAmount,
      let_fee_type: isChecked2 ? 'percent' : 'dollar',
      let_fee_due_period: lateFeeDuePeriod,
      billing_period: '',
      payment_method: "cash",
      status: "pending",
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        setOnSubmitLoader(true);

        // Create FormData object
        const formData = new FormData();
        // Append form values to FormData
        formData.append('admin_id', values.admin_id);
        formData.append('amount', values.amount);
        // values.customer_ids.forEach((id, index) => {
        //   formData.append(`customer_ids[${index}]`, id);
        // });
        formData.append('customer_ids', values.customer_ids);
        values?.photos?.localImage.forEach((item, index) => {
          formData.append(`files[${index}]`, item.image);
        });
        // formData.append('photos[detail]', values.photos.detail);
        formData.append('forever', forever ? 'Yes' : 'No');
        if (forever) {
          formData.append('end_date', "");
        }
        else{
          formData.append('end_date', values.end_date);
        }
        formData.append('start_date', values.start_date);
        formData.append('type', values.type);
        formData.append('description', values.description);
        // formData.append('due_date', values.due_date);
        formData.append('let_fee', latePayment ? 'Yes' : "No");
        if (latePayment) {
          formData.append('let_fee_amount', lateFeeAmount);
          formData.append('let_fee_type', isChecked2 ? 'percent' : 'dollar');
          formData.append('let_fee_due_period', lateFeeDuePeriod);
        }
        formData.append('billing_period', values.billing_period);
        formData.append('payment_method', "online");
        formData.append('status', "pending");

        console.log([...formData], 'formData');

        const respon = await createPaymentAPI(formData);

        if (respon.data.success) {
          toast.success("Payment Created Successfully");
          router.push('/payment/transactions');
        } else {
          toast.error("There is a problem in creating payment, try after some time.");
        }

        resetForm();
        setOnSubmitLoader(false);

      } catch (err) {
        console.log(err, 'create payment have some issue');
        router.push('/payment/transactions');
        setOnSubmitLoader(false);
      }
    },
  });

  const DeleteOpen = (id, type) => {
    setDeleteID(id);
    setDeleteType(type);
    setShowDeletePopup(true);
  };

  const DeleteClose = () => {
    setShowDeletePopup(false);
  };

  const deletePhoto = (indexDelete) => {
    const currentPhotos = paymentFormik.values.photos.localImage;

    if (indexDelete >= 0 && indexDelete < currentPhotos.length) {
      const updatedPhotos = currentPhotos.filter(
        (item, index) => index !== indexDelete
      );
      paymentFormik.setFieldValue("photos", {
        ...paymentFormik.values.photos,
        localImage: updatedPhotos,
      });

      toast.success("Photo deleted Successfully");
    } else {
      console.log("Invalid index to delete");
    }

    setShowDeletePopup(false);
  };


  return (
    <div >
      <div className="px-4 pb-20 pt-6 ">
        <p className="pb-2 text-[15px]">
          Create a payment like a recurring lease or a one-time payment billed
          to your tenants
        </p>
        <form method="POST" onSubmit={paymentFormik.handleSubmit}>
          <div className="pb-2">
            <label className="text-[12px] font-[400]">
              Choose Tenant or Unit
            </label>
            <Select
              label={"Choose a Tenant or Unit"}
              name={"customer_ids"}
              options={options}
              onChange={handleTypeSelectTenents}
              className="text-[14px] border-[0.5px] rounded border-[#A6A6A6]"
            />
          </div>
          <div>
            <span className="text-[12px] font-[400]">
              Is this a recurring or a one-time charge?
            </span>
            <label className="themeSwitcherTwo shadow-card relative inline-flex cursor-pointer select-none items-center justify-center rounded-[2px]  bg-[#CCD9E6] p-1 w-[70%] h-[35px]">
              <input
                type="checkbox"
                className="sr-only"
                name="type"
                checked={isChecked}
                onChange={handleCheckboxChange}
                formik={
                  (paymentFormik.values.type = !isChecked
                    ? "recurring"
                    : "one_time")
                }
              />
              <span
                className={`flex items-center  space-x-[6px] w-[100%] h-[25px] rounded py-2 px-[18px] text-sm font-medium ${!isChecked ? "text-primary bg-white " : "text-body-color"
                  }`}
              >
                <p className="ml-auto mr-auto">Recurring</p>
              </span>
              <span
                className={`flex items-center space-x-[6px] w-[100%] h-[25px] rounded py-2 px-[18px] text-sm font-medium ${isChecked ? "text-primary bg-white" : "text-body-color"
                  }`}
              >
                <p className="ml-auto mr-auto">One Time</p>
              </span>
            </label>
          </div>
          <div className="grid grid-cols-1 pt-2 pb-2">

            <Input
              label={"Amount"}
              name={"amount"}
              placeholder={"$0.00"}
              formik={paymentFormik}
              className="border-[0.5px] rounded border-[#A6A6A6]"
            />

          </div>
          <div className="grid grid-cols-1 pt-2 pb-2">
            <Input
              label={"Description of Payment"}
              name={"description"}
              placeholder={"Enter Description"}
              formik={paymentFormik}
              className="border-[0.5px] rounded border-[#A6A6A6]"
            //validation={TanantsFramik.errors.street_address}
            />
          </div>
          {!isChecked ? (
            <div>
              <div>
                <Input
                  label={"Starting Date"}
                  name={"start_date"}
                  placeholder={"Starting Date"}
                  type={"date"}
                  formik={paymentFormik}
                  //validation={ProjectsFormik.errors.project_date}
                  className="border-[0.5px] rounded border-[#A6A6A6]"
                />
              </div>
              <div className="pt-2 pb-2">
                <label className="text-[12px] font-[400]">Billing Period</label>
                <Select
                  name={"billing_period"}
                  // formik={paymentFormik.values.billing_period}
                  options={billingPeriodOPtions}
                  placeholder={"Choose Billing Period"}
                  onChange={handleTypeSelectBilling}
                  className="text-[14px] border-[0.5px] rounded border-[#A6A6A6]"
                />
              </div>
              {custom ? (
                <div>
                  <div className="flex pt-2 pb-2">
                    <span>Every </span>
                    <input
                      type="number"
                      name={"every"}
                      onChange={(e) => setBPSelectedNumber(e.target.value)}
                      className="w-[15%] pl-2 ml-2 border-[1px] rounded border-[#abb0bd]"
                    />
                    <select
                      className="ml-2 p-1 pl-2 text-gray-500 bg-white rounded-md shadow-sm outline-none  w-[30%] border-[1px]  border-[#abb0bd]"
                      value={selectedBPPeriod}
                      onChange={(e) => {
                        setSelectedBPPeriod(e.target.value);
                      }}
                      name={"period"}
                    >
                      <option className="text-xs" key={1} value={"day"}>
                        {` Day(s)`}
                      </option>
                      <option className="text-xs" key={2} value={"week"}>
                        {` Week(s)`}
                      </option>
                      <option className="text-xs" key={3} value={"month"}>
                        {`Month(s)`}
                      </option>
                      <option className="text-xs" key={4} value={"year"}>
                        {`Year(s)`}
                      </option>
                    </select>
                  </div>
                </div>
              ) : null}
              <div>
                <Input
                  label={"End Date"}
                  name={"end_date"}
                  placeholder={"End Date"}
                  type={"date"}
                  disabled={forever ? true : false}
                  formik={paymentFormik}
                  className={`"pb-2 border-[0.5px] rounded  "`}
                />
              </div>
              <div className="pt-2 pb-2">
                <label className=" text-[16px]">
                  <input
                    type="checkbox"
                    className="w-[15px] h-[15px] mr-2 rounded-checkbox"
                    name={"forever"}
                    onChange={(e) => {
                      // console.log(e.target.checked);
                      setForever(e.target.checked);
                    }}
                  //formik={paymentFormik.values.forever}
                  /> {`Forever (No end date)`}
                </label>
              </div>
            </div>
          ) : (
            <div>
              <div className="pb-2">
                <Input
                  label={"Due Date"}
                  name={"due_date"}
                  placeholder={"due Date"}
                  type={"date"}
                  formik={paymentFormik}
                //validation={ProjectsFormik.errors.project_date}
                />
              </div>
            </div>
          )}
          <div className="pt-2 pb-2">
            <label className="text-[16px] ">
              <input
                type="checkbox"
                className="w-[15px] h-[15px] mr-2"
                name="late_payment_fee"
                onChange={(e) => {
                  setLatePayment(e.target.checked);
                }}
                checked={latePayment}
              />
              Add late payment fee</label>
          </div>
          {latePayment ? (
            <div>
              <div>
                <div className="flex justify-between pt-2 pb-2">
                  <div className="w-[40%]">
                    <label className="text-[12px]">Amount</label>
                    <input
                      className="h-[35px] border-[1px] rounded border-[#abb0bd] p-2 w-[100%]"
                      label="Amount"
                      name="late_amount"
                      placeholder={"0"}
                      value={lateFeeAmount}
                      onChange={(e) => setLateFeeAmount(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col justify-end w-[50%] mt-auto">
                    <span className="text-[12px] ">
                      Type in Dollar or Percent
                    </span>
                    <label className="themeSwitcherTwo shadow-card relative inline-flex cursor-pointer select-none items-center justify-center rounded-[2px]  bg-[#CCD9E6] p-1 w-[100%] h-[35px]">
                      <input
                        type="checkbox"
                        className="sr-only"
                        checked={isChecked2}
                        onChange={handleCheckboxChange2}
                      />
                      <span
                        className={`flex items-center  space-x-[6px] w-[100%] h-[25px] rounded py-2 px-[18px] text-sm font-medium ${!isChecked2
                          ? "text-primary bg-white "
                          : "text-body-color"
                          }`}
                      >
                        <p className="ml-auto mr-auto">$ (Dollar)</p>
                      </span>
                      <span
                        className={`flex items-center space-x-[6px] w-[100%] h-[25px] rounded py-2 px-[18px] text-sm font-medium ${isChecked2
                          ? "text-primary bg-white"
                          : "text-body-color"
                          }`}
                      >
                        <p className="ml-auto mr-auto">% (Percent)</p>
                      </span>
                    </label>
                  </div>
                </div>
                <div className="pt-2 pb-2">
                  <p className="text-[12px]">
                    Charge fee when payment is past due after :
                  </p>
                  <div className="flex pt-2 pb-2">
                    <input
                      type="number"
                      name="late_fee_charge_amount"
                      onChange={(e) => setLateFeeChargeAmount(e.target.value)}
                      className="w-[30%] border-[1px] rounded border-[#abb0bd] pl-2"
                    />
                    <select
                      className="ml-2 p-1 pr-5 pl-2 text-gray-500 bg-white border rounded-md shadow-sm outline-none border-[#abb0bd]  w-[50%]"
                      onChange={(e) => {
                        setLateFeeDuePeriod(e.target.value);
                      }}
                      value={lateFeeDuePeriod}
                      name="late_fee_duePeriod"
                    >
                      <option className="text-xs" value="">
                        Select due period
                      </option>
                      <option className="text-xs" value="day">
                        Days
                      </option>
                      <option className="text-xs" value="week">
                        Weeks
                      </option>
                      <option className="text-xs" value="month">
                        Months
                      </option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
          <div>
            <div className="my-[10px]">
              <span className="text-[20px] font-[400] Oswald-font   text-[#262626]">
                Attach Files
              </span>
              <hr className="my-1 border-t-2" />
            </div>

            <div className="flex justify-end">
              <AddPhoto btnName={"Add Files"} formik={paymentFormik} />
            </div>

            <div className="grid mt-[2px] grid-cols-3 gap-x-[10px] gap-y-[15px] mb-[15px]">

              {paymentFormik?.values?.photos?.localImage?.map((item, index) => (
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
          </div>
          {/* <div className="flex justify-center">
            <div className="w-full flex justify-center h-[30px] ">
              <button
                type="submit"
                className="px-4 py-2 w-full mx-auto text-[12px] font-normal text-[#262626] bg-[#4DE060]"
              >
                Submit
              </button>
            </div>
          </div> */}
          <div className="fixed left-0 bottom-0 w-full shadow-[1px_-10px_13px_2px_#0000000d] ">
            <div className="flex w-full bg-[#fff] ">
              {onSubmitLoader ? (
                <span
                  className="px-4 py-2 w-[60%] mx-auto text-[22px] font-normal text-[#262626] opacity-[0.9]
                            bg-[#4DE060] h-[70px] grid justify-center items-center "
                >
                  <div
                    className="animate-spin inline-block  w-[25px] h-[25px] rounded-full border-[2px] border-r-white
                               border-l-[#ffffff75] border-y-[#ffffff75] "
                  ></div>
                </span>
              ) : (
                <div className="flex justify-center w-[60%]">
                  <div className="w-full flex justify-center h-[70px] ">
                    <button
                      type="submit"
                      className="px-4 py-2 w-full mx-auto text-[22px] font-normal text-[#262626] bg-[#4DE060]"
                    >
                      Save
                    </button>
                  </div>
                </div>
              )}
              {onSubmitLoader ?
                <div className="flex justify-center items-center bg-[#CCD9E6] opacity-[0.5] w-[40%]">
                  <div className="px-4 py-2 w-full mx-auto flex justify-center  text-[22px] font-normal text-[#262626]">
                    <span className="">Cancel</span>
                  </div>
                </div>
                :
                <Link href="/payment/transactions">
                  <div className="flex justify-center items-center bg-[#CCD9E6] w-[40%]">
                    <div className="px-4 py-2 w-full mx-auto flex justify-center  text-[22px] font-normal text-[#262626]">
                      <span className="">Cancel</span>
                    </div>
                  </div>
                </Link>
              }
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
              // delete photo by API
              // deletePhotoapi(deleteID);
            }
          }}
          datashow={showDeletePopup ? "block" : "hidden"}
          onClicked={DeleteClose}
        />
      }
    </div>
  );
};

export default CreatePaymentForm;
