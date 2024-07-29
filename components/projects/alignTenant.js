import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { assignTenantsAPI } from "../../redux/APIS/API";
import toast from "react-hot-toast";
import Link from "next/link";
import { useRouter } from "next/router";
import { ProjectDetail } from "../../redux/action/projectDetails";
import { getAssignTenants } from "../../redux/action/getAssignTenants";
import SelectPopup from "../incidents/SelectPopup";
import Button from "./form/Button";
import { getTenantsFilter } from "../../redux/action/tenants";

export default function AlignTenant({ clientName, disableBtn }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const tenant_list = useSelector((state) => state?.tenants?.tenants?.data);
  const projectId = useSelector(
    (state) => state?.projectDetails?.details?.data?.data?.ID
  );
  const [showPopup, setShowPopup] = useState(false);
  const [selectValue, setSelectValue] = useState();

  useEffect(() => {
    let data = {
      posts_per_page: "-1",
      paged: "1",
      sort_by_field: "a-z",
      search_by_keyword: "",
    };
    dispatch(getTenantsFilter(data));
  }, [dispatch]);

  async function handleClick(value) {
    let data = {
      project_id: "" + projectId,
      tenant_ids: [value],
    };

    try {
      if (clientName === "form") {
        const Company_name = tenant_list.filter((item) => {
          return item.ID == data.tenant_ids;
        })[0];
        data.companyName = Company_name.company_name;
        dispatch(getAssignTenants(data));
        toast.success("assign tenants successfully");
      } else if (clientName === "details") {
        const respon = await assignTenantsAPI(data);

        let ProjectID = { project_id: "" + projectId };
        dispatch(ProjectDetail(ProjectID));

        toast.success(respon.data.message);
      } else {
        toast.error("try again");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="w-[100%] py-2 mb-3 ">
      <h1 className="text-[20px] Oswald-font font-normal text-[#262626] not-italic">
        Attached Tenants
      </h1>
      <hr className="my-1 border-t-2" />
      <p className="text-[12px] leading-[15px] font-[400] pb-4 not-italic text-[#262626]">
        Attach tenants associated with this project.
      </p>
      <div className="flex justify-end">
        {disableBtn && (
          <Button
            href={() => setShowPopup(true)}
            name={"Attach Tenants"}
            boxShadow={"shadow-[0_0px_30px_rgba(0,0,0,0.2)]"}
          />
        )}

        {showPopup && (
          <SelectPopup
            Popuptitle={"Choose Tenant"}
            datashow={showPopup ? "block" : "hidden"}
            onClicked={() => setShowPopup(false)}
            handleClick={handleClick}
            ListData={tenant_list}
          />
        )}
      </div>
    </div>
  );
}
