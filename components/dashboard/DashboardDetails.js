import React, { useState, useEffect } from "react";
import { IoCall, IoFlagSharp } from "react-icons/io5";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { getTenantDetail } from "../../redux/action/tenants-detail";
import { getContractorsDetail } from "../../redux/action/contractors-detail";
import {
  getFlaggedTenantListAPI,
  getFlaggedContractorsListAPI,
  getIncidentListAPI,
  getExpenseListAPI,
  getProjectsListAPI,
  getSupportTeamListAPI,
  getTenantsListAPI,
  getContractorsListAPI,
} from "../../redux/APIS/API";
import { useRouter } from "next/router";

import { getProfileData } from "../../redux/action/getProfile";

const DashboardDetails = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [flaggedTenants, setFlaggedTenants] = useState([]);
  const [tenantsList, setTenantsList] = useState([]);
  const [flaggedContractors, setFlaggedContractors] = useState([]);
  const [contractorsList, setContractorsList] = useState([]);
  const [incidents, setIncidents] = useState([]);
  const [expense, setExpense] = useState([]);
  const [projects, setProjects] = useState([]);
  const [supportTeam, setSupportTeam] = useState([]);

  const dispatch = useDispatch();

  const router = useRouter();

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  useEffect(() => {
    if (tenants_data == null) {
      dispatch(getTenantDetail());
    }
  }, []);

  useEffect(() => {
    if (flagged_tenants == null) {
      dispatch(getFlaggedTenantListAPI());
    }
  }, []);

  useEffect(() => {
    dispatch(getProfileData());
  }, []);

  const tenants_data = useSelector(
    (state) => state.tenantsDetails.tenantsDetails
  );

  const flagged_tenants = useSelector((state) => state);

  const profile = useSelector((state) => state?.getProfile?.profile?.data);

  const clients = useSelector((state) => state.tenants.tenants?.data);

  async function getTenantsList() {
    try {
      const res = await getTenantsListAPI();
      setTenantsList(res.data.tenant_list);
    } catch (err) {
      console.log(err);
    }
  }

  async function getFlaggedTenantsList() {
    try {
      const res = await getFlaggedTenantListAPI();
      setFlaggedTenants(res.data.tenant_list);
    } catch (err) {
      console.log(err);
    }
  }

  async function getFlaggedContractorsList() {
    try {
      const res = await getFlaggedContractorsListAPI();
      setFlaggedContractors(res.data.data);
    } catch (err) {
      console.log(err);
    }
  }

  async function getContractorsList() {
    try {
      const res = await getContractorsListAPI();
      setContractorsList(res.data.data);
    } catch (err) {
      console.log(err);
    }
  }

  async function getIncidentList() {
    try {
      const res = await getIncidentListAPI();
      setIncidents(res.data.total_incidents);
    } catch (err) {
      console.log(err);
    }
  }

  async function getExpenseList() {
    try {
      const res = await getExpenseListAPI();
      setExpense(res.data.total_expenses_in_sp);
    } catch (err) {
      console.log(err);
    }
  }

  async function getProjectsList() {
    try {
      const res = await getProjectsListAPI();
      setProjects(res.data.total_projects);
    } catch (err) {
      console.log(err);
    }
  }

  async function getSupportTeamList() {
    try {
      const res = await getSupportTeamListAPI();
      setSupportTeam(res.data.totak_supportTeam);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getTenantsList();
    getFlaggedTenantsList();
    getFlaggedContractorsList();
    getContractorsList();
    getIncidentList();
    getExpenseList();
    getProjectsList();
    getSupportTeamList();
  }, []);

  return (
    <>
      <div className="m-4">
        <div className="flex pb-3 justify-between">
          <div className="flex gap-4">
            <div>
              <span className="text-[11px]">Good afternoon,</span>
              {profile?.map((item, index) => (
                <h2 key={index} className="text-[16px] font-[500]">
                  {item?.first_name.length > 0 ? item?.first_name : "--"}{" "}
                  {item?.last_name.length > 0 ? item?.last_name : "--"}
                </h2>
              ))}
            </div>
            <div>
              <span className="text-[11px]">Your property</span>
              {profile?.map((item, index) => (
                <h2 key={index} className="text-[16px] font-[500]">
                  {item?.property_name.length > 0 ? item?.property_name : "--"}
                </h2>
              ))}
            </div>
          </div>
          <div className="pt-1">
            <Link href="/dashboard/bulk_email">
              <div className="w-[100%] mt-1 ">
                <svg
                  className="h-[16.67px] w-[22.22px] m-auto"
                  width="23"
                  height="17"
                  viewBox="0 0 23 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M21.1667 0.166678C21.2614 0.156924 21.3568 0.156924 21.4514 0.166678L11.3889 10.2153L1.35422 0.222234C1.47386 0.187285 1.59765 0.168598 1.72228 0.166678H21.1667ZM12.3681 11.2014L22.4792 1.13196C22.5289 1.26795 22.557 1.41088 22.5626 1.55557V15.4445C22.5626 16.2115 21.9407 16.8333 21.1737 16.8333H1.72922C0.962159 16.8333 0.340332 16.2115 0.340332 15.4445V1.55557C0.341803 1.43824 0.358137 1.32157 0.388943 1.20834L10.4098 11.2014C10.9515 11.7399 11.8264 11.7399 12.3681 11.2014ZM1.71533 15.4445H2.68061L7.74311 10.4236L6.76394 9.44446L1.71533 14.4514V15.4445ZM21.1598 15.4445H20.1876L15.1251 10.4236L16.1042 9.44446L21.1528 14.4514L21.1598 15.4445Z"
                    fill="#262626"
                  />
                </svg>
                <h6 className="text-[9px] font-sans font-normal mt-1 ">
                  Send Bulk Email
                </h6>
              </div>
            </Link>
          </div>
        </div>
        <hr className="my-1 border-t-2" />
        <div className="flex justify-between gap-4 mt-4">
          <Link href="/tenants/list">
            <div className="border-solid border-[#D9D9D9] border-[1px] rounded p-2 text-center w-[100%] bg-white">
              <h3 className="text-[12px]">Tenants</h3>
              <h1 className="text-[30px]">{tenantsList?.length}</h1>
              <span className="text-[9px]">Click to view full list</span>
            </div>
          </Link>
          <Link href="/contractors/list">
            <div className="border-solid border-[#D9D9D9] border-[1px] rounded p-2 text-center w-[100%] bg-white">
              <h3 className="text-[12px]">Contractors</h3>
              <h1 className="text-[30px]">{contractorsList?.length}</h1>
              <span className="text-[9px]">Click to view full list</span>
            </div>
          </Link>
          <Link href="/support/list">
            <div className="border-solid border-[#D9D9D9] border-[1px] rounded p-2 text-center w-[100%] bg-white">
              <h3 className="text-[12px]">Support Team</h3>
              <h1 className="text-[30px]">{supportTeam}</h1>
              <span className="text-[9px]">Click to view full list</span>
            </div>
          </Link>
        </div>
        <div className="flex justify-between gap-4 mt-4">
          <Link href="/projects/list">
            <div className="border-solid border-[#D9D9D9] border-[1px] rounded p-2 text-center w-[100%] bg-white">
              <h3 className="text-[12px]">Projects</h3>
              <h1 className="text-[30px]">{projects}</h1>
              <span className="text-[9px]">Click to view full list</span>
            </div>
          </Link>
          <Link href="/incidents/list">
            <div className="border-solid border-[#D9D9D9] border-[1px] rounded p-2 text-center w-[100%] bg-white">
              <h3 className="text-[12px]">Incidents</h3>
              <h1 className="text-[30px]">{incidents}</h1>
              <span className="text-[9px]">Click to view full list</span>
            </div>
          </Link>
          <Link href="/expenses/list">
            <div className="border-solid border-[#D9D9D9] border-[1px] rounded p-2 text-center w-[100%] bg-white">
              <h3 className="text-[12px]">Expenses</h3>
              <h1 className="text-[30px]">{expense}</h1>
              <span className="text-[9px]">Click to view full list</span>
            </div>
          </Link>
        </div>

        <div className="pb-5">
          <h1 className="pt-6 pb-3">Flagged Items</h1>
          <label className="themeSwitcherTwo shadow-card relative inline-flex cursor-pointer select-none items-center justify-center rounded-[2px]  bg-[#CCD9E6] p-1 w-[100%] h-[35px]">
            <input
              type="checkbox"
              className="sr-only"
              checked={isChecked}
              onChange={handleCheckboxChange}
            />
            <span
              className={`flex items-center  space-x-[6px] w-[100%] h-[25px] rounded py-2 px-[18px] text-sm font-medium ${
                !isChecked ? "text-primary bg-white " : "text-body-color"
              }`}
            >
              <p className="ml-auto mr-auto">Tenants</p>
            </span>
            <span
              className={`flex items-center space-x-[6px] w-[100%] h-[25px] rounded py-2 px-[18px] text-sm font-medium ${
                isChecked ? "text-primary bg-white" : "text-body-color"
              }`}
            >
              <p className="ml-auto mr-auto">Contractors</p>
            </span>
          </label>
        </div>
      </div>
      {!isChecked ? (
        <div className="ListDetails mb-20 bg-[#f4f5f7] pb-[70px] ml-2">
          {flaggedTenants?.map((item, index) => (
            <div key={index} className="mb-[5px] ml-[12px] ">
              <div className="flex  w-[100%] h-[66px] gap-[3px] items-center  rounded-l-lg bg-[#FFFFFF] px-4 min-w-fit">
                <div
                  className="w-[100%] "
                  onClick={() => {
                    dispatch(getTenantDetail(item.ID)),
                      router.push("/tenants/details");
                  }}
                >
                  <div className="w-full">
                    <div className="flex overflow-hidden  ">
                      <h1 className="text-[16px] font-[400] capitalize oneLineTextlimit text-[#262626] not-italic ">
                        {item.company_name}
                      </h1>
                    </div>
                    <div className="flex opacity-80 gap-[10px] items-center  mt-1">
                      {item.unit && (
                        <span
                          className={`${
                            item.unit ? " border-set" : ""
                          } not-italic text-[11px] border-set font-sans
                                                 text-[#000] font-normal capitalize`}
                        >
                          Unit #{item.unit}
                        </span>
                      )}
                      {item.property && (
                        <span
                          className={`${
                            item.property ? " border-set" : ""
                          } not-italic text-[11px] font-sans
                                                 text-[#000] font-normal capitalize`}
                        >
                          {item.property}
                        </span>
                      )}
                      {item.status && (
                        <span
                          className={`${
                            item.status ? " border-set" : ""
                          } not-italic text-[11px]  font-sans
                                                 text-[#000] font-normal capitalize`}
                        >
                          {item.status}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="w-[20%]  flex justify-between items-center">
                  <div>
                    <IoFlagSharp className="text-lg  text-red-500" />
                  </div>
                  <Link href={"tel:"}>
                    <a>
                      <IoCall className="h-[23.16px] w-[23.65px]" />
                    </a>
                  </Link>
                </div>
              </div>
              <hr />
            </div>
          ))}
        </div>
      ) : (
        <div>
          {flaggedContractors?.map((item, index) => (
            <div key={index} className="mb-[5px] ml-[12px] ">
              <div className="flex  w-[100%] h-[66px] gap-[3px] items-center  rounded-l-lg bg-[#FFFFFF] px-4 min-w-fit">
                <div
                  className="w-[100%]"
                  onClick={() => {
                    dispatch(getContractorsDetail(item.ID));
                    router.push("/contractors/details");
                  }}
                >
                  <div className="w-full">
                    <div className="flex overflow-hidden  ">
                      <h1 className="text-[16px] font-[400] capitalize oneLineTextlimit text-[#262626] not-italic ">
                        {item.company_name}
                      </h1>
                    </div>
                    <div className="flex opacity-80 gap-[10px] items-center  mt-1">
                      {item.unit && (
                        <span
                          className={`${
                            item.unit ? " border-set" : ""
                          } not-italic text-[11px] border-set font-sans
                                                 text-[#000] font-normal capitalize`}
                        >
                          Unit #{item.unit}
                        </span>
                      )}
                      {item.property && (
                        <span
                          className={`${
                            item.property ? " border-set" : ""
                          } not-italic text-[11px] font-sans
                                                 text-[#000] font-normal capitalize`}
                        >
                          {item.property}
                        </span>
                      )}
                      {item.status && (
                        <span
                          className={`${
                            item.status ? " border-set" : ""
                          } not-italic text-[11px]  font-sans
                                                 text-[#000] font-normal capitalize`}
                        >
                          {item.status}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="w-[20%]  flex justify-between items-center">
                  <div>
                    <IoFlagSharp className="text-lg  text-red-500" />
                  </div>
                  <Link href={"tel:"}>
                    <a>
                      <IoCall className="h-[23.16px] w-[23.65px]" />
                    </a>
                  </Link>
                </div>
              </div>
              <hr />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default DashboardDetails;
