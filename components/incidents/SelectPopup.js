import { useFormik } from "formik";
import React from "react";
import { useState, useEffect } from "react";
import Select from "../public-com/form/Select";

function SelectPopup({
  Popuptitle,
  datashow,
  onClicked,
  ListData,
  clientName,
  SelectBoxTitle,
  SelectBoxValue,
  formik,
  handleClick,
}) {
  const [value, setValue] = useState([]);
  const [onChangeValue, setOnChangeValue] = useState();

  useEffect(() => {
    if (ListData) {
      const updatedListData = ListData.map(function (item) {
        return {
          value: item.ID,
          name: item.company_name,
        };
      });

      setValue(updatedListData);
    } else if (ListData) {
      setValue(ListData);
    } else {
      setValue([]);
    }
  }, []);

  // validation
  const validate = (values) => {
    const errors = {};

    if (!values.ID) {
      errors.ID = "Please Select Item";
    }

    return errors;
  };

  const SelectPopFormik = useFormik({
    initialValues: {
      ID: "",
    },
    validate,
    onSubmit: async (values) => {
      try {
        const Company_name = value.filter((item) => {
          return item.value == values.ID;
        })[0];

        if (clientName === "tenants") {
          formik.setFieldValue("tenant_ids", [
            ...formik.values.tenant_ids,
            {
              ID: values.ID,
              name: Company_name.name,
            },
          ]);
        }

        if (clientName === "contractors") {
          formik.setFieldValue("contractor_ids", [
            ...formik.values.contractor_ids,
            {
              ID: values.ID,
              name: Company_name.name,
            },
          ]);
        }

        onClicked();
      } catch (err) {
        console.log(err);
      }
    },
  });

  function OnSubmit() {
    if (handleClick) {
      handleClick(onChangeValue);
      onClicked();
    } else {
      SelectPopFormik.handleSubmit();
    }
  }

  function getOnChangeValue(value) {
    setOnChangeValue(value);
  }

  return (
    <div className={datashow}>
      <div>
        <div className="h-screen transition-all bg-[#22222238] w-full fixed z-[100] top-0 left-0 overflow-hidden backdrop-blur-[1px]">
          <div className="">
            <div className="absolute w-[80%] top-[22%] left-[10%] mx-auto bg-white rounded-[18px]">
              <div className="text-black text-center ">
                <div className="my-5 flex justify-center ">
                  <div className="">
                    <h1 className="text-[20px] font-normal Oswald-font text-left">
                      {Popuptitle}
                    </h1>
                  </div>
                </div>

                <div className=" mx-4">
                  {handleClick ? (
                    <Select
                      name={"ID"}
                      OnChange={(e) => getOnChangeValue(e.target.value)}
                      option={value}
                    />
                  ) : (
                    <Select
                      name={"ID"}
                      formik={SelectPopFormik}
                      option={value}
                      validation={SelectPopFormik.errors.ID}
                    />
                  )}
                </div>

                <div className="flex justify-center mt-5 ">
                  <div
                    onClick={() => OnSubmit()}
                    className="bg-[#4DE060] w-[50%] flex justify-center rounded-bl-[10px]"
                  >
                    <div className=" py-3 w-[100%] mx-auto  text-[16px] font-normal flex justify-center text-[#262626] ">
                      <span className="">Add</span>
                    </div>
                  </div>

                  <div
                    onClick={onClicked}
                    className=" bg-[#CCD9E6] w-[50%]  flex justify-center rounded-br-[10px]"
                  >
                    <div className=" py-3 w-[100%] mx-auto text-[16px] font-normal flex justify-center text-[#262626] rounded-[10px] ">
                      <span className="">Cancel</span>
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
}

export default SelectPopup;
