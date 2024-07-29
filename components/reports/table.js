import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Loader from "../public-com/loader";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { format } from "date-fns";
import Button from "../projects/form/Button";
import { useRouter } from "next/router";
import { addDocsAPIS } from "../../redux/APIS/API";

function Table({ searchOptions }) {
  const [select, setSelect] = useState([]);

  const [maxContact, setMaxContact] = useState([]);

  const [localArray, setLocalArray] = useState([]);

  const router = useRouter();

  const contractors = useSelector((state) => state?.contractors);

  const tenants = useSelector((state) => state?.tenants);

  const expenses = useSelector((state) => state?.expenses);

  const Schedulelist = useSelector((state) => state.filterSchedule);

  const Supportlist = useSelector((state) => state.support);

  const incidents = useSelector((state) => state?.incidents);

  const project = useSelector((state) => state?.projects);

  useEffect(() => {
    Array.prototype.max = function () {
      return Math.max.apply(null, this);
    };

    if (searchOptions === "Tenants") {
      const getTenID = tenants?.tenants?.data?.map(function (item) {
        return item.contacts.length;
      });
      if (getTenID) {
        let arr = Array.from(
          {
            length: getTenID?.max(),
          },
          (value) => (value = getTenID?.max())
        );

        setMaxContact(arr);
      }
    }

    if (searchOptions === "Contractors") {
      const getConID = contractors?.contractors?.data?.map(function (item) {
        return item.contacts.length;
      });
      if (getConID) {
        let arr = Array.from(
          {
            length: getConID?.max(),
          },
          (value) => (value = getConID?.max())
        );

        setMaxContact(arr);
      }
    }

    if (searchOptions === "Projects") {
      const getProID = project?.projects?.data?.map(function (item) {
        return item.total_bid_list.length;
      });
      if (getProID) {
        let arr = Array.from(
          {
            length: getProID?.max(),
          },
          (value) => (value = getProID?.max())
        );

        setMaxContact(arr);
      }
    }

  }, [tenants, contractors, project]);

  async function upload(formData) {
    const respon = await addDocsAPIS(formData);

    router.push(
      `/support/send_email?type=report&url=${respon?.data?.data?.s3_bucket_file_url}`
    );
  }

  const print = (send_email) => {
    if (searchOptions === "Tenants") {
      var doc = new jsPDF("l", "px", [3000, 600]);

      let contactsHead = [];

      maxContact.map((item, index) => {
        contactsHead = [
          ...contactsHead,
          `Contact ${index + 1} First Name`,
          `Contact ${index + 1} Last Name`,
          `Contact ${index + 1} Title / Position`,
          `Contact ${index + 1} Primary Phone`,
          ` Contact ${index + 1} Primary Phone Type`,
          ` Contact${index + 1} Secondary Phone`,
          `Contact ${index + 1} Secondary Phone Type`,
          ` Contact ${index + 1} Email`,
        ];
      });

      let head = [
        [
          "Company/Lessee Name",
          "Street Address 1",
          "Street Address 2",
          "City",
          "State",
          "Zip",
          "Unit Type",
          "Unit Value",
          "Mailbox #",
          "Property",
          "Status",
          "Flagged",
          ...contactsHead,
        ],
      ];

      const body = tenants?.tenants?.data?.map(function (item) {
        let contactsBody = [];

        item.contacts.map((Inneritem, index) => {
          contactsBody = [
            ...contactsBody,
            Inneritem?.first_name,
            Inneritem?.last_name,
            Inneritem?.title,
            Inneritem?.primary_phone,
            Inneritem?.primary_phone_type,
            Inneritem?.secondary_phone,
            Inneritem?.secondary_phone_type,
            Inneritem?.email,
          ];
        });

        return [
          item?.company_name,
          item?.street_address,
          item?.street_address_2,
          item?.city,
          item?.state,
          item?.zip_code,
          item?.unit_type,
          item?.unit,
          item?.mailbox,
          item?.property,
          item?.status,
          item?.company_flag,
          ...contactsBody,
        ];
      });

      doc.autoTable({
        head: head,
        body: body,
        startY: 25,
        horizontalPageBreakRepeat: true,

        theme: "striped",
        margin: { right: 10, left: 10 },
        tableWidth: "auto",
        styles: {
          fontSize: 5,
        },
        headStyles: { fillColor: "#0b366b", textColor: "#fff", halign: "left" },
        columnStyles: {
          id: { fillColor: "#0b366b", textColor: "#fff" },
        },
      });

      if (send_email == "sendmail") {
        var blob = doc.output("blob");
        blob.name = "Tenants-Reports*--225252.pdf";

        var formData = new FormData();
        formData.append("upload_media[]", blob, blob?.name);
        formData.append("author", 1);
        formData.append("detail", "");
        formData.append("upload_for", "post");
        upload(formData);
      } else {
        doc.save("Tenants-Reports*--225252.pdf");
      }
    }

    if (searchOptions === "Contractors") {
      var doc = new jsPDF("l", "px", [3000, 600]);

      let contactsHead = [];

      maxContact.map((item, index) => {
        contactsHead = [
          ...contactsHead,
          `Contact ${index + 1} First Name`,
          `Contact ${index + 1} Last Name`,
          `Contact ${index + 1} Title / Position`,
          `Contact ${index + 1} Primary Phone`,
          ` Contact ${index + 1} Primary Phone Type`,
          ` Contact${index + 1} Secondary Phone`,
          `Contact ${index + 1} Secondary Phone Type`,
          ` Contact ${index + 1} Email`,
        ];
      });

      let head = [
        [
          "Company/Lessee Name",
          "Account Number",
          "Service/Industry",
          "Street Address 1",
          "Street Address 2",
          "City",
          "State",
          "Zip Code",
          "Primary Phone Number",
          "Primary Phone Type",
          "Email",
          ...contactsHead,
        ],
      ];

      const body = contractors?.contractors?.data?.map(function (item) {
        let contactsBody = [];

        item.contacts.map((item, index) => {
          contactsBody = [
            ...contactsBody,
            item?.first_name,
            item?.last_name,
            item?.title,
            item?.primary_phone,
            item?.primary_phone_type,
            item?.secondary_phone,
            item?.secondary_phone_type,
            item?.email,
          ];
        });

        return [
          item?.company_name,
          item?.account_number,
          item?.services,
          item?.street_address,
          item?.street_address_2,
          item?.city,
          item?.state,
          item?.zip,
          item?.company_primary_phone,
          item?.company_primary_phone_type,
          item?.company_email,
          ...contactsBody,
        ];
      });
      doc.autoTable({
        head: head,
        body: body,
        startY: 25,
        horizontalPageBreakRepeat: true,

        theme: "striped",
        margin: { right: 10, left: 10 },
        tableWidth: "auto",
        styles: {
          fontSize: 5,
        },
        headerStyles: {
          fillColor: "#0b366b",
          textColor: "#fff",
          halign: "center",
        },
        columnStyles: {
          id: { fillColor: "#0b366b", textColor: "#fff" },
        },
      });

      if (send_email == "sendmail") {
        var blob = doc.output("blob");

        blob.name = "Contractors-Reports.pdf";

        var formData = new FormData();
        formData.append("upload_media[]", blob, blob?.name);
        formData.append("author", 1);
        formData.append("detail", "");
        formData.append("upload_for", "post");
        upload(formData);
      } else {
        doc.save("Contractors-Reports.pdf");
      }
    }

    if (searchOptions === "Projects") {
      var doc = new jsPDF("l", "px", [3000, 600]);

      let contactsHead = [];

      maxContact.map((item, index) => {
        contactsHead = [
          ...contactsHead,
          `Quote  Contact ${index + 1} Date`,
          `Quote ${index + 1} Company/Owner Name`,
          `Quote ${index + 1} Details`,
          `Quote ${index + 1} Amount`,
          `Quote ${index + 1} Decision`,
        ];
      });

      let head = [
        [
          "Date",
          "Project Name",
          "Details",
          "Status",
          "Service/Industry",
          "Attached Tenants",
          "Total Bids",
          ...contactsHead,
        ],
      ];

      const body = project?.projects?.data?.map(function (item) {
        let contactsBody = [];

        item.total_bid_list.map((item, index) => {
          contactsBody = [
            ...contactsBody,
            item?.post_date && format(new Date(item?.post_date), "dd-MM-yyyy"),
            item?.company_name,
            item?.additional_info,
            item?.bid_price,
            item?.bid_accepted_by_admin === "1"
              ? "Accepted"
              : item?.bid_accepted_by_admin === "0"
              ? "Declined"
              : "Decision Pandding",
          ];
        });

        return [
          item?.project_date,
          item?.project_name,
          item?.project_detail,
          item?.status,
          item?.services,
          " ",
          item?.total_bids,
          ...contactsBody,
        ];
      });
      doc.autoTable({
        head: head,
        body: body,
        startY: 25,
        horizontalPageBreakRepeat: true,

        theme: "striped",
        margin: { right: 10, left: 10 },
        tableWidth: "auto",
        styles: {
          fontSize: 5,
        },
        headStyles: { fillColor: "#0b366b", textColor: "#fff", halign: "left" },
        columnStyles: {
          id: { fillColor: "#0b366b", textColor: "#fff" },
        },
      });

      if (send_email == "sendmail") {
        var blob = doc.output("blob");

        blob.name = "Project-Reports.pdf";

        var formData = new FormData();
        formData.append("upload_media[]", blob, blob?.name);
        formData.append("author", 1);
        formData.append("detail", "");
        formData.append("upload_for", "post");
        upload(formData);
      } else {
        doc.save("Project-Reports.pdf");
      }
    }

    if (searchOptions === "Schedule") {
      var doc = new jsPDF("l");

      let head = [["Date Completed", "Task", "Task Group Name", "Period"]];

      const body = Schedulelist?.schedule?.data?.map(function (item) {
        return [
          item?.created_date &&
            format(new Date(item?.created_date), "dd-MM-yyyy"),
          item?.first_schedule_info &&
            item?.first_schedule_info.map((item) => item.title),
          item?.group_name,
          item?.schedule_period === "1"
            ? "Daily"
            : item?.schedule_period === "2"
            ? "Weekly"
            : item.schedule_period === "3"
            ? "Monthly"
            : item.schedule_period === "4"
            ? "Quarterly"
            : item.schedule_period === "5"
            ? "Semi-annally"
            : item.schedule_period === "6" && "Yearly",
        ];
      });
      doc.autoTable({
        head: head,
        body: body,
        startY: 25,
        horizontalPageBreakRepeat: true,

        theme: "striped",
        margin: { right: 10, left: 10 },
        tableWidth: "auto",
        styles: {
          fontSize: 5,
        },
        headStyles: { fillColor: "#0b366b", textColor: "#fff", halign: "left" },
        columnStyles: {
          id: { fillColor: "#0b366b", textColor: "#fff" },
        },
      });

      if (send_email == "sendmail") {
        var blob = doc.output("blob");

        blob.name = "Schedule-Reports.pdf";

        var formData = new FormData();
        formData.append("upload_media[]", blob, blob?.name);
        formData.append("author", 1);
        formData.append("detail", "");
        formData.append("upload_for", "post");
        upload(formData);
      } else {
        doc.save("Schedule-Reports.pdf");
      }
    }

    if (searchOptions === "Support") {
      var doc = new jsPDF("l");

      let head = [
        [
          "First Name",
          "Last Name",
          "Title/Position",
          "Street Address 1",
          "Street Address 2",
          "City",
          "State",
          "Zip Code",
          "Primary Phone Number",
          "Primary Phone Type",
          "Secondary Phone Number",
          "Secondary Phone Type",
          "Primary Email",
          "Secondary Email",
        ],
      ];

      const body = Supportlist?.support?.data?.map(function (item) {
        return [
          item?.first_name,
          item?.last_name,
          item?.primary_title,
          item?.street_address,
          item?.street_address_2,
          item?.city,
          item?.state,
          item?.zip_code,
          item?.primary_phone,
          item?.primary_phone_type,
          item?.secondary_phone,
          item?.secondary_phone_type,
          item?.primary_email,
          item?.secondary_email,
        ];
      });
      doc.autoTable({
        head: head,
        body: body,
        startY: 25,
        horizontalPageBreakRepeat: true,

        theme: "striped",
        margin: { right: 10, left: 10 },
        tableWidth: "auto",
        styles: {
          fontSize: 5,
        },
        headStyles: { fillColor: "#0b366b", textColor: "#fff", halign: "left" },
        columnStyles: {
          id: { fillColor: "#0b366b", textColor: "#fff" },
        },
      });

      if (send_email == "sendmail") {
        var blob = doc.output("blob");

        blob.name = "Support-Reports.pdf";

        var formData = new FormData();
        formData.append("upload_media[]", blob, blob?.name);
        formData.append("author", 1);
        formData.append("detail", "");
        formData.append("upload_for", "post");
        upload(formData);
      } else {
        doc.save("Support-Report.pdf");
      }
    }

    if (searchOptions === "Incidents") {
      var doc = new jsPDF("l");

      let head = [
        [
          "Date",
          "Title",
          "Details",
          "Property",
          "Status",
          "Linked Tenant",
          "Linked Contractor",
        ],
      ];

      const body = incidents?.incidents?.map(function (item) {
        return [
          item?.date && format(new Date(item?.date), "dd-MM-yyyy"),
          item?.post_title,
          item?.post_content,
          item?.property,
          item?.status,
          item?.state,
          item?.tenant_ids.map(
            (item, index) => index === 0 && item.company_name
          ),
          item?.contractor_ids.map(
            (item, index) => index === 0 && item.company_name
          ),
        ];
      });
      doc.autoTable({
        head: head,
        body: body,
        startY: 25,
        horizontalPageBreakRepeat: true,

        theme: "striped",
        margin: { right: 10, left: 10 },
        tableWidth: "auto",
        styles: {
          fontSize: 5,
        },
        headStyles: { fillColor: "#0b366b", textColor: "#fff", halign: "left" },
        columnStyles: {
          id: { fillColor: "#0b366b", textColor: "#fff" },
        },
      });

      if (send_email == "sendmail") {
        var blob = doc.output("blob");

        blob.name = "Incidents-Reports.pdf";

        var formData = new FormData();
        formData.append("upload_media[]", blob, blob?.name);
        formData.append("author", 1);
        formData.append("detail", "");
        formData.append("upload_for", "post");
        upload(formData);
      } else {
        doc.save("Incidents-table*--225252.pdf");
      }
    }

    if (searchOptions === "Expenses") {
      var doc = new jsPDF("l");

      let head = [
        [
          "Purchase Date",
          "Item Name",
          "Amount",
          "Details",
          "Category",
          "Property",
          "Notes",
        ],
      ];

      const body = expenses?.expenses?.data?.map(function (item) {
        return [
          item?.purchase_date &&
            format(new Date(item?.purchase_date), "dd-MM-yyyy"),
          item?.item_name,
          "$" + item?.expense_amount,
          item?.description,
          item?.expense_category,
          item?.property_name,
          item?.all_notes.map((item, index) => index === 0 && item.note),
        ];
      });
      doc.autoTable({
        head: head,
        body: body,
        startY: 25,
        horizontalPageBreakRepeat: true,

        theme: "striped",
        margin: { right: 10, left: 10 },
        tableWidth: "auto",
        styles: {
          fontSize: 5,
        },
        headStyles: { fillColor: "#0b366b", textColor: "#fff", halign: "left" },
        columnStyles: {
          id: { fillColor: "#0b366b", textColor: "#fff" },
        },
      });

      if (send_email == "sendmail") {
        var blob = doc.output("blob");

        blob.name = "Expenses-Reports.pdf";

        var formData = new FormData();
        formData.append("upload_media[]", blob, blob?.name);
        formData.append("author", 1);
        formData.append("detail", "");
        formData.append("upload_for", "post");
        upload(formData);
      } else {
        doc.save("Expenses-Reports.pdf");
      }
    }
  };

  function sendMail() {
    print("sendmail");
  }

  return (
    <div className="flex flex-col ml-3 mb-5 pb-[70px] ">
      {tenants.loading ||
      contractors.loading ||
      project.loading ||
      Schedulelist.loading ||
      Supportlist.loading ||
      incidents.loading ||
      expenses.loading ? (
        <Loader />
      ) : (
        <>
          {searchOptions && (
            <>
              <div className=" flex justify-end pt-4 mx-[12px] gap-1 ">
                <span
                  className="flex gap-2 bg-[#CCD9E6] py-3 px-[14px] items-center h-[35px]  rounded-[6px]"
                  onClick={() => print()}
                >
                  <span className="">
                    <svg
                      width="16"
                      height="17"
                      viewBox="0 0 16 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M13.8949 8.48334L8.00043 14.3778L2.11155 8.48334C1.953 8.34757 1.88394 8.13439 1.93276 7.93144C1.98158 7.7285 2.14003 7.57004 2.34298 7.52122C2.54592 7.47241 2.75911 7.54146 2.89488 7.70001L7.44488 12.25L7.44488 0.777785C7.44488 0.47096 7.69361 0.222229 8.00043 0.222229C8.30726 0.222229 8.55599 0.47096 8.55599 0.777785L8.55599 12.25L13.1115 7.70001C13.332 7.51124 13.6605 7.52393 13.8657 7.72914C14.071 7.93434 14.0836 8.26292 13.8949 8.48334ZM0.222656 15.7778C0.222656 15.471 0.471387 15.2222 0.778212 15.2222L15.2227 15.2222C15.5295 15.2222 15.7782 15.471 15.7782 15.7778C15.7782 16.0846 15.5295 16.3333 15.2227 16.3333L0.778212 16.3333C0.471387 16.3333 0.222656 16.0846 0.222656 15.7778Z"
                        fill="#262626"
                      />
                    </svg>
                  </span>
                  <span className="text-[16px] font-normal not-italic text-[#262626]">
                    Download PDF
                  </span>
                </span>
                <div className="w-[20%]">
                  <div
                    className="grid gap-2 justify-items-center"
                    onClick={() => sendMail()}
                  >
                    <span className="">
                      <svg
                        width="22.22"
                        height="16"
                        viewBox="0 0 33 25"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M30.92 1.00001C31.0563 0.98596 31.1937 0.98596 31.33 1.00001L16.84 15.47L2.38999 1.08001C2.56227 1.02968 2.74054 1.00277 2.91999 1.00001H30.92ZM18.25 16.89L32.81 2.39001C32.8815 2.58584 32.922 2.79166 32.93 3.00001V23C32.93 24.1046 32.0346 25 30.93 25H2.92999C1.82542 25 0.929993 24.1046 0.929993 23V3.00001C0.932111 2.83105 0.955632 2.66305 0.999993 2.50001L15.43 16.89C16.2101 17.6655 17.4699 17.6655 18.25 16.89ZM2.90999 23H4.29999L11.59 15.77L10.18 14.36L2.90999 21.57V23ZM30.91 23H29.51L22.22 15.77L23.63 14.36L30.9 21.57L30.91 23Z"
                          fill="#000"
                        />
                      </svg>
                    </span>
                    <span className="text-[13px] text-center font-normal not-italic text-[#262626]">
                      Share via Email
                    </span>
                  </div>
                </div>
              </div>
            </>
          )}
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-[10px] inline-block min-w-full sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                {tenants?.clientName === "Tenants" &&
                  searchOptions === "Tenants" &&
                  tenants?.tenants?.data?.length > 0 && (
                    <table className="min-w-full">
                      <thead className="border-b bg-[#0c366b] ">
                        <tr className="tableHead">
                          <th scope="col">Company/Lessee Name</th>
                          <th scope="col">Street Address 1</th>
                          <th scope="col">Street Address 2</th>
                          <th scope="col">City</th>
                          <th scope="col">State</th>
                          <th scope="col">Zip</th>
                          <th scope="col">Unit Type</th>
                          <th scope="col">Unit Value</th>
                          <th scope="col">Mailbox #</th>
                          <th scope="col">Property</th>
                          <th scope="col">Status</th>
                          <th scope="col">Flagged</th>
                          {maxContact.map((item, index) => (
                            <>
                              <th scope="col">
                                Contact {index + 1} First Name
                              </th>
                              <th scope="col">Contact {index + 1} Last Name</th>
                              <th scope="col">
                                Contact {index + 1} Title/Position
                              </th>
                              <th scope="col">
                                Contact {index + 1} Primary Phone
                              </th>
                              <th scope="col">
                                Contact {index + 1} Primary Phone Type
                              </th>
                              <th scope="col">
                                Contact {index + 1} Secondary Phone
                              </th>
                              <th scope="col">
                                Contact {index + 1} Secondary Phone Type
                              </th>
                              <th scope="col">Contact {index + 1} Email</th>
                            </>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {tenants?.tenants?.data?.map((item, index) => (
                          <tr
                            className="tableBody bg-[#fff] shadow-sm "
                            key={index}
                          >
                            <td>{item?.company_name}</td>
                            <td>{item?.street_address}</td>
                            <td>{item?.street_address_2}</td>
                            <td>{item?.city}</td>
                            <td>{item?.state}</td>
                            <td>{item?.zip_code}</td>
                            <td>{item?.unit_type}</td>
                            <td>{item?.unit}</td>
                            <td>{item?.mailbox}</td>
                            <td>{item?.property}</td>
                            <td>{item?.status}</td>
                            <td>{item?.company_flag}</td>
                            {item.contacts.map((item, index) => (
                              <>
                                <td>{item?.first_name} </td>
                                <td>{item?.last_name} </td>
                                <td>{item?.title} </td>
                                <td>{item?.primary_phone} </td>
                                <td>{item?.primary_phone_type} </td>
                                <td>{item?.secondary_phone} </td>
                                <td>{item?.secondary_phone_type} </td>
                                <td>{item?.email} </td>
                              </>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}

                {contractors?.clientName === "Contractors" &&
                  searchOptions === "Contractors" &&
                  contractors?.contractors?.data?.length > 0 && (
                    <table className="min-w-full">
                      <thead className="bg-[#154B88] ">
                        <tr className="tableHead">
                          <th scope="col">Company/Owner Name</th>
                          <th scope="col">Account Number</th>
                          <th scope="col">Service/Industry</th>
                          <th scope="col">Street Address 1</th>
                          <th scope="col">Street Address 2</th>
                          <th scope="col">City</th>
                          <th scope="col">State</th>
                          <th scope="col">Zip</th>
                          <th scope="col">Primary Phone Number</th>
                          <th scope="col">Primary Phone Type</th>
                          <th scope="col">Email</th>
                          {maxContact.map((item, index) => (
                            <>
                              <th scope="col">
                                Contact {index + 1} First Name
                              </th>
                              <th scope="col">Contact {index + 1} Last Name</th>
                              <th scope="col">
                                Contact {index + 1} Title/Position
                              </th>
                              <th scope="col">
                                Contact {index + 1} Primary Phone
                              </th>
                              <th scope="col">
                                Contact {index + 1} Primary Phone Type
                              </th>
                              <th scope="col">
                                Contact {index + 1} Secondary Phone
                              </th>
                              <th scope="col">
                                Contact {index + 1} Secondary Phone Type
                              </th>
                              <th scope="col">Contact {index + 1} Email</th>
                            </>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {contractors?.contractors?.data?.map((item, index) => (
                          <tr
                            className="tableBody bg-[#fff] shadow-sm "
                            key={index}
                          >
                            <td>{item?.company_name}</td>
                            <td>{item?.account_number}</td>
                            <td>{item?.services}</td>
                            <td>{item?.street_address}</td>
                            <td>{item?.street_address_2}</td>
                            <td>{item?.city}</td>
                            <td>{item?.state}</td>
                            <td>{item?.zip}</td>
                            <td>{item?.company_primary_phone}</td>
                            <td>{item?.company_primary_phone_type}</td>
                            <td>{item?.company_email}</td>
                            {item.contacts.map((item, index) => (
                              <>
                                <td>{item?.first_name} </td>
                                <td>{item?.last_name} </td>
                                <td>{item?.title} </td>
                                <td>{item?.primary_phone} </td>
                                <td>{item?.primary_phone_type} </td>
                                <td>{item?.secondary_phone} </td>
                                <td>{item?.secondary_phone_type} </td>
                                <td>{item?.email} </td>
                              </>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}

                {project?.clientName === "Projects" &&
                  searchOptions === "Projects" &&
                  project?.projects?.data?.length > 0 && (
                    <table className="min-w-full">
                      <thead className="border-b bg-[#0c366b] ">
                        <tr className="tableHead">
                          <th scope="col">Date</th>
                          <th scope="col">Project Name</th>
                          <th scope="col">Details</th>
                          <th scope="col">Status</th>
                          <th scope="col">Service/Industry</th>
                          <th scope="col">Attached Tenants</th>
                          <th scope="col">Total Bids</th>
                          {maxContact.map((item, index) => (
                            <>
                              <th scope="col">
                                Quote Contact {index + 1} Date
                              </th>
                              <th scope="col">
                                Quote {index + 1} Company/Owner Name
                              </th>
                              <th scope="col">Quote {index + 1} Details</th>
                              <th scope="col">Quote {index + 1} Amount</th>
                              <th scope="col">Quote {index + 1} Decision</th>
                            </>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {project?.projects?.data?.map((item, index) => (
                          <tr
                            className="tableBody border-b bg-[#fff] shadow-sm "
                            key={index}
                          >
                            <td>{item?.project_date}</td>
                            <td>{item?.project_name}</td>
                            <td>{item?.project_detail}</td>
                            <td>{item?.status}</td>
                            <td>{item?.services}</td>
                            <td> </td>
                            <td>{item?.total_bids}</td>
                            {item?.total_bid_list.map((item, index) => (
                              <>
                                <td scope="col">
                                  {item?.post_date &&
                                    format(
                                      new Date(item?.post_date),
                                      "dd-MM-yyyy"
                                    )}
                                </td>
                                <td scope="col">{item?.company_name}</td>
                                <td scope="col">{item?.additional_info}</td>
                                <td scope="col">{item?.bid_price}</td>
                                <td scope="col">
                                  {item?.bid_accepted_by_admin === "1"
                                    ? "Accepted"
                                    : item?.bid_accepted_by_admin === "0"
                                    ? "Declined"
                                    : "Decision Pandding"}
                                </td>
                              </>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}

                {Schedulelist?.clientName === "Schedule" &&
                  searchOptions === "Schedule" &&
                  Schedulelist?.schedule?.data?.length > 0 && (
                    <table className="min-w-full">
                      <thead className="border-b bg-[#0c366b] ">
                        <tr className="tableHead">
                          <th scope="col">Date Completed</th>
                          <th scope="col">Task</th>
                          <th scope="col">Task Group Name</th>
                          <th scope="col">Period</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Schedulelist?.schedule?.data?.map((item, index) => (
                          <tr
                            className="tableBody border-b bg-[#fff] shadow-sm "
                            key={index}
                          >
                            <td>
                              {item?.created_date &&
                                format(
                                  new Date(item?.created_date),
                                  "dd-MM-yyyy"
                                )}
                            </td>
                            <td>
                              {item?.first_schedule_info &&
                                item?.first_schedule_info.map(
                                  (item) => item.title
                                )}
                            </td>
                            <td>{item?.group_name}</td>
                            <td>
                              {item.schedule_period === "1" && "Daily"}
                              {item.schedule_period === "2" && "Weekly"}
                              {item.schedule_period === "3" && "Monthly"}
                              {item.schedule_period === "4" && "Quarterly"}
                              {item.schedule_period === "5" && "Semi-annally"}
                              {item.schedule_period === "6" && "Yearly"}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}

                {Supportlist?.clientName === "Support" &&
                  searchOptions === "Support" &&
                  Supportlist?.support?.data?.length > 0 && (
                    <table className="min-w-full">
                      <thead className="border-b bg-[#0c366b] ">
                        <tr className="tableHead">
                          <th scope="col">First Name</th>
                          <th scope="col">Last Name</th>
                          <th scope="col">Title/Position</th>
                          <th scope="col">Street Address 1</th>
                          <th scope="col">Street Address 2</th>
                          <th scope="col">City</th>
                          <th scope="col">State</th>
                          <th scope="col">Zip Code</th>
                          <th scope="col">Primary Phone Number</th>
                          <th scope="col">Primary Phone Type</th>
                          <th scope="col">Secondary Phone Number</th>
                          <th scope="col">Secondary Phone Type</th>
                          <th scope="col">Primary Email</th>
                          <th scope="col">Secondary Email</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Supportlist?.support?.data?.map((item, index) => (
                          <tr
                            className="tableBody border-b bg-[#fff] shadow-sm "
                            key={index}
                          >
                            <td>{item?.first_name}</td>
                            <td>{item?.last_name}</td>
                            <td>{item?.primary_title}</td>
                            <td>{item?.street_address}</td>
                            <td>{item?.street_address_2}</td>
                            <td>{item?.city}</td>
                            <td>{item?.state}</td>

                            <td>{item?.zip_code}</td>

                            <td>{item?.primary_phone}</td>
                            <td>{item?.primary_phone_type}</td>
                            <td>{item?.secondary_phone}</td>
                            <td>{item?.secondary_phone_type}</td>
                            <td>{item?.primary_email}</td>
                            <td>{item?.secondary_email}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}

                {incidents?.clientName === "Incidents" &&
                  searchOptions === "Incidents" &&
                  incidents?.incidents?.length > 0 && (
                    <table className="min-w-full">
                      <thead className="border-b bg-[#0c366b] ">
                        <tr className="tableHead">
                          <th scope="col">Date</th>
                          <th scope="col">Title</th>
                          <th scope="col">Details</th>
                          <th scope="col">Property</th>
                          <th scope="col">Status</th>
                          <th scope="col">Linked Tenant</th>
                          <th scope="col">Linked Contractor</th>
                        </tr>
                      </thead>
                      <tbody>
                        {incidents?.incidents?.map((item, index) => (
                          <tr
                            className="tableBody border-b bg-[#fff] shadow-sm "
                            key={index}
                          >
                            <td>
                              {item?.date &&
                                format(new Date(item?.date), "dd-MM-yyyy")}
                            </td>
                            <td>{item?.post_title}</td>
                            <td>{item?.post_content}</td>
                            <td>{item?.property}</td>
                            <td>{item?.status}</td>
                            <td>
                              {item?.tenant_ids.map(
                                (item, index) =>
                                  index === 0 && item.company_name
                              )}
                            </td>
                            <td>
                              {/* {item?.contractor_ids[0] && 'Contractor'} */}
                              {item?.contractor_ids.map(
                                (item, index) =>
                                  index === 0 && item.company_name
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}

                {expenses?.clientName === "Expenses" &&
                  searchOptions === "Expenses" &&
                  expenses?.expenses?.data?.length > 0 && (
                    <table className="min-w-full">
                      <thead className="border-b bg-[#0c366b] ">
                        <tr className="tableHead">
                          <th scope="col">Purchase Date</th>
                          <th scope="col">Item Name</th>
                          <th scope="col">Amount</th>
                          <th scope="col">Details</th>
                          <th scope="col">Category</th>
                          <th scope="col">Property</th>
                          <th scope="col">Notes</th>
                        </tr>
                      </thead>
                      <tbody>
                        {expenses?.expenses?.data?.map((item, index) => (
                          <tr
                            className="tableBody border-b bg-[#fff] shadow-sm "
                            key={index}
                          >
                            <td>
                              {item?.purchase_date &&
                                format(
                                  new Date(item?.purchase_date),
                                  "dd-MM-yyyy"
                                )}
                              {/* {item?.item_name} */}
                            </td>
                            <td>{item?.item_name}</td>
                            <td>{"$" + item?.expense_amount}</td>
                            <td>{item?.description}</td>
                            <td>{item?.expense_category}</td>
                            <td>{item?.property_name}</td>
                            <td>
                              {item?.all_notes.map(
                                (item, index) => index === 0 && item.note
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Table;
