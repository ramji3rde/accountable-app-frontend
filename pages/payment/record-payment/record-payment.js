import React, { useState, useEffect } from "react";
import Link from "next/link";
// import SubHeader from "../../../components/public-com/header";
// import Select from "react-select";
import Input from "../../../components/public-com/form/Input";
import { useFormik, setFieldValue } from "formik";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getTenantsFilter } from "../../../redux/action/tenants";
import { reactLocalStorage } from "reactjs-localstorage";
import { useRouter } from "next/router";
import { createPaymentAPI } from "../../../redux/APIS/API";
import toast from "react-hot-toast";

const RecordPayment = () => {

  const [onSubmitLoader, setOnSubmitLoader] = useState(false)

  const dispatch = useDispatch();

  const router = useRouter();

  const tenantlist = useSelector((state) => state?.tenants?.tenants?.data);


  const AdminDetails = reactLocalStorage.get('persist:persist-store')

  const AdminId = JSON.parse(JSON.parse(AdminDetails).user).id


  useEffect(() => {
    if (tenantlist == null) {
      let data = {
        posts_per_page: "-1",
        paged: "1",
        sort_by_field: "a-z",
        search_by_keyword: ""
      }
      dispatch(getTenantsFilter(data))

    }
  }, [tenantlist]);


  const MethodOption = [
    { value: "cash", label: "Cash" },
    { value: "cashiers_check", label: "Cashier's Check" },
    { value: "check", label: "Check" },
    // { value: "credit_card", label: "Credit Card" },
    { value: "direct_deposit", label: "Direct Deposit" },
    { value: "electronic_payment", label: "Electronic Payment" },
    { value: "money_order", label: "Money Order" },
  ];


  const paymentFormik = useFormik({
    initialValues: {
      admin_id: AdminId,
      customer_ids: [],
      amount: '',
      type: 'one_time' ,      //defult one_time
      start_date: '',         //payment date
      payment_method: '',
      description: '',
      reference_number: "",
      send_receipt: false,
      status: 'paid' // status is paid in defult
    },
    onSubmit: async (values, { resetForm }) => {
      try{
      setOnSubmitLoader(true)
      // console.log(values);

      values.customer_ids = [values.customer_ids]

      const respon = await createPaymentAPI(values);

      // console.log(respon ,'responcreatePaymentAPI')

      toast.success("Record Create Successfully")

    }catch(error){
      console.log(error)
      toast.error("Something is wrong please try again later")
    }



      // resetForm()

      router.back()

    },
  });

  // transaction module done in transaction module in single tenents api work is pandding;


  return (
    <div>
      {/* <SubHeader title={"Record a Payment"} backUrl={"/tenants/details"} /> */}
      <div>
        <div className="px-4 pb-20 pt-4 ">
          <p className="pb-2 text-[14px]">
            Record a manual payment you received from a tenant offline
          </p>
          <form method="POST" onSubmit={paymentFormik.handleSubmit}>
            <div className="pb-2">
              <label className="text-[12px] font-[400]">
                Choose Tenant or Unit
              </label>

              <select
                name="customer_ids"
                onChange={paymentFormik.handleChange}
                value={paymentFormik.values.customer_ids}
                defaultValue=""
                className="w-full p-[5px] rounded-[5px] border-[1px] border-solid border-[#A6A6A6] focus:outline-none ">
                <option value="" disabled hidden>Select an option</option>
                {tenantlist?.map((item) =>
                  <option key={item.ID} value={item.tenant_user_id}>{item.post_title}</option>
                )}
              </select>
            </div>
            <div className="py-[2px]">
              <Input
                label={"Payment Date"}
                name={"payment_date"}
                placeholder={"Payment Date"}
                type={"date"}
                formik={paymentFormik}
                className="border-[1px] rounded border-[#A6A6A6]"
              //validation={ProjectsFormik.errors.project_date}
              />
            </div>

            <div className="grid grid-cols-1 pt-2 pb-2">
              <Input
                label={"Amount"}
                name={"amount"}
                placeholder={"$0.00"}
                formik={paymentFormik}
                type={'number'}
                className="border-[0.5px] rounded border-[#A6A6A6]"
              />
            </div>
            <div className="pb-2">
              <label className="text-[12px] font-[400]">Payment Method</label>
              <select
                name="payment_method"
                onChange={paymentFormik.handleChange}
                value={paymentFormik.values.payment_method}
                defaultValue=""
                className="w-full p-[5px] rounded-[5px] border-[1px] border-solid border-[#A6A6A6] focus:outline-none ">
                <option value="" disabled hidden>Select an option</option>
                {MethodOption?.map((item, index) =>
                  <option key={index} value={item.value}>{item.label}</option>
                )}
              </select>
            </div>
            <div className="grid grid-cols-1 pt-2 pb-2">
              <label className="text-[12px] font-[400]">
                Reference/ Check Number{" "}
                <span className="text-[10px] font-[700]">Optional</span>
              </label>
              <Input
                // label={"Description of Payment"}
                name={"reference_number"}
                placeholder={"Enter Reference/ Check Number"}
                formik={paymentFormik}
                type="number"
                //validation={TanantsFramik.errors.street_address}
                className="border-[1px] rounded border-[#A6A6A6]"
              />
            </div>
            <div className="grid grid-cols-1 pt-2 pb-2">
              <Input
                label={"Description of Payment"}
                name={"description"}
                placeholder={"Enter Description"}
                formik={paymentFormik}
                className="border-[1px] rounded border-[#A6A6A6]"

              //validation={TanantsFramik.errors.street_address}
              />
            </div>
            <div className="pt-2 pb-2">
              <label className=" text-[16px]">
                <input
                  type="checkbox"
                  className="w-[25px] mr-2 h-[25px] rounded-checkbox align-middle"
                  name={"send_receipt"}
                  onChange={paymentFormik.handleChange}
                  value={paymentFormik.values.send_receipt}
                  checked={paymentFormik.values.send_receipt}
                // value={}
                />
                Send Receipt</label>
            </div>
            <div className="fixed bottom-0 left-0 w-full shadow-[1px_-10px_13px_2px_#0000000d] ">
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
{/*               
                <div className="w-[60%]">
                  <div className="w-full flex justify-center h-[70px] ">
                    <button
                      type="submit"
                      className="px-4 py-2 w-full mx-auto text-[22px] font-normal text-[#262626] bg-[#4DE060]"
                    >
                      Save
                    </button>
                  </div>
                </div> */}
                {/* <Link href="/payment/transactions?"> */}
                  <div onClick={()=> router.back()} className="flex justify-center items-center bg-[#CCD9E6] w-[40%]">
                    <div className="px-4 py-2 mx-auto w-full flex justify-center  text-[22px] font-normal text-[#262626]">
                      <span className="">Cancel</span>
                    </div>
                  </div>
                {/* </Link> */}
              </div>
            </div>
          </form>
        </div>
      </div>

    </div>
  );
};

export default RecordPayment;
