import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { assignContractorAPI, postContratorsAPI } from "../../redux/APIS/API";
import toast from "react-hot-toast";
import { getContractors } from "../../redux/action/contractors";
import { useRouter } from "next/router";
import { ProjectDetail } from "../../redux/action/projectDetails";
import { IoClipboardOutline } from "react-icons/io5";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { getAssignContractors } from "../../redux/action/getAssignContractors";

export default function AlignContractor() {
  const router = useRouter();

  const { create, edit } = router?.query;

  const dispatch = useDispatch();

  const [isOn, setIsOn] = useState(false);
  const [email, setEmail] = useState();
  const [error, setError] = useState(false);
  const [requiredDoc, setRequiredDoc] = useState("");
  const [proCont, setProCont] = useState("");
  const [proCont_2, setProCont_2] = useState("");
  const [anotherDoc, setAnotherDoc] = useState([]);
  const [contractorID, setContractorID] = useState(null);
  const [sendBy, setSendBy] = useState("");
  const [allExitsApi, setAllExitsApi] = useState(false);
  const [allExits, setAllExits] = useState();
  const [bidurl, setBidurl] = useState(null);

  useEffect(() => {
    let data = {
      posts_per_page: "-1",
      paged: "1",
      sort_by_field: "a-z",
      search_by_keyword: "",
    };
    dispatch(getContractors(data));
  }, [dispatch]);

  const contractor_list = useSelector(
    (state) => state?.contractors?.contractors?.data
  );

  const ProjectItem = useSelector(
    (state) => state?.projectDetails?.details?.data?.data
  );

  const assignContractorsData = useSelector(
    (state) => state?.getAssignContractors?.getAssignContractors
  );

  const userId = useSelector((state) => state?.userActive?.user?.id);

  const selectConApis = () => {
    const ids = ProjectItem?.requested_contractors.map(function (item) {
      return item?.ID;
    });

    const Conid = ids?.filter((item) => {
      return item == contractorID;
    })[0];

    if (Conid) {
      setAllExitsApi(false);
      // console.log(Conid, contractorID, " this error ");
    } else {
      setAllExitsApi(true);
      // console.log(Conid, contractorID, " this success");
    }
  };

  const selectConLocal = () => {

    const ids = assignContractorsData.map(function (item) {
      return item?.contractor_ids;
    });

    const Conid = ids?.filter((item) => {
      return item == contractorID;
    })[0];

    if (Conid == undefined) {
      setAllExits(true);
    } else {
      setAllExits(false);
    }
  };

  async function getData(e) {
    e.preventDefault();

    let conidthis = null;

    if (isOn === true) {
      if (!email) {
        setError("This Field is requited");
        return;
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
        setError("This is invaild email adress");
        return;
      } else {
        setError(false);
      }

      const firstName = email.split("@");
      try {
        const CreateContractor = await postContratorsAPI({
          author: "" + userId,
          company_name: firstName[0],
          company_email: email,
          is_new_user: "yes",
        });
        // console.log(CreateContractor, "create contractor successfully");

        conidthis = CreateContractor.data.data.contractor_id;
      } catch (err) {
        console.log(err);
        toast.error("This email is already exist.");
        setError("This email is already exist.");
        return;
      }
    }

    let data = {
      project_id: "" + ProjectItem?.ID,
      send_by: [sendBy],
      contractor_ids: conidthis ? [conidthis] : [contractorID],
      required_documents: requiredDoc,
      pro_cont_license:
        proCont && proCont_2
          ? [proCont, proCont_2]
          : proCont
          ? [proCont]
          : proCont_2 && [proCont_2],
      another_documents: anotherDoc,
    };

    if (create === "true") {
      const Company_name = contractor_list.filter((item) => {
        return item.ID == data.contractor_ids;
      })[0];

      data.companyName = Company_name?.company_name;
      dispatch(getAssignContractors(data));
      toast.success("assign contractors successfully");
      router.push("/projects/form");
    } else if (edit === "true") {
      const Company_name = contractor_list.filter((item) => {
        return item.ID == data.contractor_ids;
      })[0];
      data.companyName = Company_name?.company_name;
      dispatch(getAssignContractors(data));
      router.push("/projects/form?edit=true");
      toast.success("assign contractors successfully");
    } else {
      const respon = await assignContractorAPI(data);
      try {
        let data = { project_id: "" + ProjectItem?.ID };
        const respon = dispatch(ProjectDetail(data));

        router.push("/projects/details");
      } catch (error) {
        console.log(error);
      }

      toast.success(respon.data.message);
    }
  }

  useEffect(() => {
    getBidUrl(contractorID);
  }, [contractorID]);

  async function getBidUrl(contractorId) {
    const getToken = localStorage.getItem("token", true);

    let access_data = btoa(ProjectItem?.ID + "@" + contractorId);

    let string = "?access_token=" + getToken + "&access_data=" + access_data;

    let url = window.location.origin + "/bid" + string;

    setBidurl(url);
    // console.log(url, " url");
  }

  function ProCont(e, value) {
    if (e.target.checked == true) {
      setProCont(value);
    } else {
      setProCont("");
    }
  }

  function ProCont2(e, value) {
    if (e.target.checked == true) {
      setProCont_2(value);
    } else {
      setProCont_2("");
    }
  }

  return (
    <div className="pt-8 pb-20 px-4">
      <p className="text-xs pb-1 font-normal not-italic text-[#262626]">
        Special Project Link
      </p>
      <div className="items-center h-[35px] gap-[10px] flex font-medium w-full text-[15px]  py-[9px] px-[5px] rounded-[6px] bg-[#FFF] text-[#000] border-[0.5px] border-[#A6A6A6] focus:border-black focus:outline-none">
        <div className="overflow-y-auto   w-[90%] ">
          {create ? (
            <h6 className="text-[16px] font-normal not-italic text-[#A6A6A6] ">
              Url is availble
            </h6>
          ) : (
            <div className="text-[16px] font-normal not-italic text-[#A6A6A6] ">
              <input
                value={bidurl}
                readOnly
                className="inputTokenailgnurl w-full "
              />
            </div>
          )}
        </div>
        <CopyToClipboard
          text={create ? "Url is availble" : bidurl}
          onCopy={() => {
            {
              create
                ? toast.error("Url is availble")
                : toast.success("Project Link Copied");
            }
          }}
        >
          <div className="w-[10%]  grid justify-center items-center">
            <svg
              width="16"
              height="19"
              viewBox="0 0 16 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M11.6111 0.611115C12.0713 0.611115 12.4444 0.984211 12.4444 1.44445V1.72223L1.33328 1.72223L1.33328 15.6111H1.0555C0.595264 15.6111 0.222168 15.238 0.222168 14.7778L0.222168 1.44445C0.222168 0.984211 0.595264 0.611115 1.0555 0.611115L11.6111 0.611115ZM14.3888 3.38889L3.83328 3.38889C3.37304 3.38889 2.99995 3.76199 2.99995 4.22223L2.99995 17.5556C2.99995 18.0158 3.37304 18.3889 3.83328 18.3889H14.3888C14.8491 18.3889 15.2222 18.0158 15.2222 17.5556L15.2222 4.22223C15.2222 3.76199 14.8491 3.38889 14.3888 3.38889ZM14.1111 17.2778H4.11106L4.11106 4.5L14.1111 4.5L14.1111 17.2778Z"
                fill="#262626"
              />
            </svg>
          </div>
        </CopyToClipboard>
      </div>
      <p className="text-[12px]  font-normal not-italic text-[#262626] leading-[18px] pt-1">
        {
          "This is a unique link for this project only. It will be automatically sent to the selected contractor's email. You can also copy the link and send it manually."
        }
      </p>

      <form onSubmit={getData}>
        <p className="text-[12px]  font-normal not-italic text-[#262626]  mt-4 pb-1">
          Choose contractor from your list
        </p>
        <select
          aria-setsize={"0"}
          onChange={(e) => setContractorID(e.target.value)}
          className="items-center h-[35px] gap-[10px] flex font-medium w-full  text-[16px] px-[5px]  rounded-[6px] bg-[#FFF] text-[#000] border-[0.5px] border-[#A6A6A6] focus:border-black focus:outline-none"
        >
          <option
            disabled
            selected
            className=" py-[9px] px-[5px] optioncon text-[16px] font-normal not-italic text-[#A6A6A6]"
          >
            Choose contractor
          </option>
          {contractor_list?.map((item, index) => (
            <Fragment key={index}>
              {item.auto_generate_email === 0 && (
                <option
                  value={item.ID}
                  className=" py-[9px] px-[5px] optioncon text-[16px] font-normal not-italic text-[#262626]"
                >
                  {item.company_name !== ""
                    ? item.company_name
                    : item.first_name !== ""
                    ? item.first_name + " " + item.last_name
                    : item.company_email.split("@")[0]}
                </option>
              )}
            </Fragment>
          ))}
        </select>
        <div className="flex justify-center items-center my-[10px]">
          <div className="text-[16px] font-normal not-italic text-[#595959] leading-[20px]">
            OR
          </div>
        </div>

        <div className="p-2 bg-[#F0F0F0] border-[1px] border-dashed border-[#A6A6A6] rounded-md grid gap-4">
          <div className="flex gap-2">
            <input
              type="checkbox"
              className=" h-[28px] w-[28px] rounded-[6px] bg-[#FFFFFF] border-[0.5px] border-[#A6A6A6] focus:border-black focus:outline-none"
              id="addnew"
              defaultChecked={isOn}
              onClick={() => setIsOn(!isOn)}
            />
            <label
              htmlFor="addnew"
              className="text-[16px] font-normal not-italic text-[#262626]"
            >
              Send to New Contractor
            </label>
          </div>

          <div>
            <div>
              {error && (
                <span className="text-red-500 text-[12px]">{error}</span>
              )}
              <p className="text-[12px] font-normal not-italic text-[#262626]">
                {"Enter new contractor's email"}
              </p>
              <input
                name="email"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter new contractor's email"
                className={` ${
                  error ? " border-red-400" : "border-gray-400"
                }  'font-normal w-full text-[16px]  py-[9px] px-[5px] rounded-[5px]  text-[#000] 
                         border-[1px] border-gray-400 focus:border-black focus:outline-none  focus:bg-[#FFFFFF]' ${
                           isOn ? "bg-[#FFFFFF]" : "bg-[#F0F0F0]"
                         }`}
              />
            </div>
            <p className="text-[12px] font-normal not-italic text-[#262626] pt-1">
              {
                "Add a new contractor's email address to send them the special project link that they will use to send you a quote for this project."
              }
            </p>
          </div>
        </div>

        <div>
          <h1 className="text-[20px] font-normal not-italic Oswald-font text-[#262626] leading-8 border-b-2 border-[#DEDEDE] mt-[30px]">
            Required Documents
          </h1>

          <p className="text-[12px] font-normal not-italic text-[#262626]  leading-[20px] pt-[10px]">
            Are there any documents that contractors will be required to provide
            to complete this project?
          </p>
          <div className="flex gap-[15px]">
            <div className=" h-[35px] py-[10px] flex items-center mt-[6px]">
              <input
                onChange={(e) => setRequiredDoc(e.target.value)}
                value="yes"
                type="radio"
                id="yes"
                name="required_documents"
                className="h-[28px] w-[28px]  rounded-[6px]  border-[0.5px] border-[#A6A6A6] bg-[#FFFFFF]"
              />
              <div
                htmlFor="yes"
                className="text-[16px] ml-[5px] font-normal not-italic leading-5  text-[#262626]"
              >
                Yes
              </div>
            </div>
            <div className=" h-[35px] py-[   10px] flex items-center mt-[6px]">
              <input
                onChange={(e) => setRequiredDoc(e.target.value)}
                value="no"
                type="radio"
                id="no"
                name="required_documents"
                className="h-[28px] w-[28px]  rounded-[6px]  border-[0.5px] border-[#A6A6A6] bg-[#FFFFFF]"
              />
              <div
                htmlFor="yes"
                className="text-[16px] ml-[5px] font-normal not-italic leading-5  text-[#262626]"
              >
                No
              </div>
            </div>
          </div>
          <div>
            <p className="text-[12px] font-normal not-italic text-[#262626]  leading-5 pt-5 pb-[6px]">
              {" "}
              If Yes, choose which documents you want to require contractors to
              send with their quotes.
            </p>

            <div className="flex justify-start items-center ">
              <input
                className=" h-[28px] w-[28px] rounded-[6px] bg-[#FFFFFF] border-[0.5px] border-[#A6A6A6] focus:border-black focus:outline-none"
                type="checkbox"
                id="liabilityinsurance"
                name="pro_cont_license"
                value="Liability insurance"
                onChange={(e) => ProCont(e, e.target.value)}
              />
              <label
                htmlFor="liabilityinsurance"
                className="ml-[5px] text-[16px] font-normal text-[#262626] leading-5"
              >
                {" "}
                Liability insurance
              </label>
            </div>
            <div className="flex justify-start items-center mt-[10px]">
              <input
                className=" h-[28px] w-[28px] rounded-[6px] bg-[#FFFFFF] border-[0.5px] border-[#A6A6A6] focus:border-black focus:outline-none"
                type="checkbox"
                id="buisnesslicense"
                name="pro_cont_license_2"
                value="Buisness license"
                onChange={(e) => ProCont2(e, e.target.value)}
              />
              <label
                htmlFor="liabilityinsurance"
                className="ml-[5px] text-[16px] font-normal text-[#262626] leading-5"
              >
                {" "}
                Buisness license
              </label>
            </div>
          </div>
          <div className="pt-[6px]">
            <p className="text-[12px] font-normal not-italic text-[#262626] leading-5 pb-1">
              Add any other required documents for this project
            </p>
            <textarea
              name="another_documents"
              onChange={(e) => setAnotherDoc(e.target.value)}
              rows="3"
              className="py-[9px] h-[98px] px-[5px] border-slate-300 w-full  rounded-[6px] border-[1px] text-[16px] font-[400] focus:border-black focus:outline-none "
              placeholder="Add other required documents, separate each with a comma"
            />
          </div>
        </div>

        <button
          type="submit"
          className="flex gap-1 justify-center bg-[#F2DA31]  w-full h-[45px] items-center  py-2 px-4  
                            rounded-[6px] hover:border-theme mt-[30px]"
        >
          <span className="text-[16px] font-normal not-italic text-[#262626]">
            Send Request
          </span>
        </button>
      </form>
    </div>
  );
}
