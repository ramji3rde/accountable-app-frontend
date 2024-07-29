import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import Input from "../../components/public-com/form/Input";
import SubHeader from "../../components/public-com/header";
import { AdminCreateManager } from "../../redux/APIS/API";

function ExpensesForm() {
  const dispatch = useDispatch();
  const router = useRouter();

  const validate = (values) => {
    const errors = {};

    if (!values.first_name) {
      errors.first_name = "Please enter Manager Frist Name";
    }

    if (!values.last_name) {
      errors.last_name = "Please enter Manager Last Name";
    }

    if (!values.email) {
      errors.email = "Please enter Manager email";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Invalid email Manager address";
    }

    return errors;
  };

  // formik data
  const ExpenseFormik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
    },
    validate,
    onSubmit: async (values) => {
      try {
        let data = {
          fname: values.first_name,
          lname: values.last_name,
          user_type: "app_manager",
          email: values.email,
        };

        const res = await AdminCreateManager(data);

        if (res.data.success == true) {
          toast.success(res.data.message);
        } else {
          toast.error(res.data.message);
        }

        router.push("/manager/list");
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
        console.log("err", error.response);
      }
    },
  });

  return (
    <>
      <div className="App">
        <SubHeader title={"Add Manager"} backUrl={"/manager/list"} />
        <div className="px-4 pb-16 pt-6 ">
          <div>
            <div>
              <div className="pb-4">
                <span className="text-[20px] font-normal text-[#262626] Oswald-font ">
                  Manager Info
                </span>
                <hr className="my-1 border-t-2" />
              </div>

              <div className="grid grid-cols-1 gap-2 mb-5">
                <div className="items-center grid grid-cols-1 gap-2 ">
                  <Input
                    label={"First Name"}
                    placeholder={"First Name"}
                    name={"first_name"}
                    formik={ExpenseFormik}
                    validation={ExpenseFormik.errors.first_name}
                  />

                  <Input
                    label={"Last Name"}
                    placeholder={"Last Name"}
                    name={"last_name"}
                    formik={ExpenseFormik}
                    validation={ExpenseFormik.errors.last_name}
                  />

                  <Input
                    label={"Email"}
                    placeholder={"example@devsmiapp.com"}
                    name={"email"}
                    formik={ExpenseFormik}
                    validation={ExpenseFormik.errors.email}
                  />
                </div>
              </div>
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
                  {"Save"}
                </button>
              </div>
            </div>
            <Link href="/manager/list">
              <div className="flex justify-center">
                <div className="px-4 py-2 w-full mx-auto items-center flex justify-center bg-[#CCD9E6] text-[#262626] font-normal not-italic text-[1.375rem]">
                  <span className="">Cancel</span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default ExpensesForm;
