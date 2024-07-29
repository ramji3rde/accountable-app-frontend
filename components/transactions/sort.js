import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineSearch } from 'react-icons/ai'
import { getallTransaction } from "../../redux/action/getAllTransaction";
import { format } from "date-fns";
import jsPDF from "jspdf";
import "jspdf-autotable";
import toast from "react-hot-toast";





function Sort({ tenant_id }) {

    const [searchTitle, setSeachTitle] = useState("")
    const [searchDate, setSearchDate] = useState("")
    const [searchType, setSearchType] = useState("")
    const [seachMethod, setSeachMethod] = useState("")

    // console.log(seachMethod, searchType, searchDate)

    const dispatch = useDispatch();

    const transactionlist = useSelector((state) => state.getallTransaction.transaction.data);

    useEffect(() => {

        if (tenant_id) {

            if (searchTitle !== "" || searchDate !== "") {
                let data = {
                    posts_per_page: "100",
                    paged: "-1",
                    type_filter: searchType ? searchType : "",
                    // payment_method: seachMethod ? seachMethod : '',
                    date_filter: searchDate ? searchDate : "",
                    search_by_keyword: searchTitle ? searchTitle : "",
                    tenant_user_id: tenant_id

                }
                const delayDebounceFn = setTimeout(() => {
                    dispatch(getallTransaction(data))
                }, 500);


                return () => clearTimeout(delayDebounceFn)
            } else {
                let data = {
                    posts_per_page: "100",
                    paged: "-1",
                    type_filter: searchType ? searchType : "",
                    // payment_method: seachMethod ? seachMethod : '',
                    sort_by_field: searchDate ? searchDate : "a-z",
                    search_by_keyword: searchTitle ? searchTitle : "",
                    tenant_user_id: tenant_id
                }
                dispatch(getallTransaction(data))
            }

        } else {
            if (searchTitle !== "" || searchDate !== "") {
                let data = {
                    posts_per_page: "100",
                    paged: "-1",
                    type_filter: searchType ? searchType : "",
                    // payment_method: seachMethod ? seachMethod : '',
                    date_filter: searchDate ? searchDate : "date_asc",
                    search_by_keyword: searchTitle ? searchTitle : "",
                    tenant_user_id: tenant_id

                }
                const delayDebounceFn = setTimeout(() => {
                    dispatch(getallTransaction(data))
                }, 500);


                return () => clearTimeout(delayDebounceFn)
            } else {
                let data = {
                    posts_per_page: "100",
                    paged: "-1",
                    type_filter: searchType ? searchType : "",
                    // payment_method: seachMethod ? seachMethod : '',
                    sort_by_field: searchDate ? searchDate : "date_asc",
                    search_by_keyword: searchTitle ? searchTitle : ""
                }
                dispatch(getallTransaction(data))
            }
        }

    }, [dispatch, searchDate, searchTitle, searchType, tenant_id])

    // this use to download pdf function
    function generateRandomString(length = 10) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    function downloadPDF() {

        // !transactionlist > 0 ? 
        //     toast.error("We have not transaction so able to download pdf.")        
        // : 
        if (transactionlist.length > 0) {

            var doc = new jsPDF("l", "px", [800, 600]);

            let head = [
                [
                    "Transaction Date",
                    "Payment Amount",
                    "Payment Description",
                    "Payment Type",
                    "Payment Method",
                    "Payment Status",
                ],
            ];

            let body = transactionlist.map(function (item) {
                
                return [
                    item?.created_at &&
                    format(
                        new Date(item?.created_at),
                        "dd/MM/yyyy"
                    ),
                    item.amount,
                    item.description,
                    item.payment_method ? "Manual" :item.type === 'one_time' ? "One Time" : item.type.charAt(0).toUpperCase() + item.type.slice(1),
                    item.payment_method ? item.payment_method : "Stripe",
                    item.status == 'paid' ? "Paid" : item.status == 'refunded' ? 'Refunded' : 'Unpaid',
                ];
                //   ];
            });
            doc.autoTable({
                head: head,
                body: body,
                startY: 50,
                horizontalPageBreakRepeat: true,

                theme: "striped",
                margin: { right: 10, left: 10 },
                tableWidth: "auto",
                styles: {
                    fontSize: 12,
                },
                headStyles: { fillColor: "#0b366b", textColor: "#fff", halign: "left" },
                columnStyles: {
                    id: { fillColor: "#0b366b", textColor: "#fff" },
                },
                didDrawPage: function (data) {

                    // Header
                    doc.setFontSize(20);
                    doc.setTextColor(40);
                    // doc.text("Transaction List ", data.settings.margin.left, 22);
                    const header = 'Transaction List';

                    const textWidth = doc.getTextWidth(header);

                    const pageWidth = doc.internal.pageSize.getWidth();

                    const xPos = (pageWidth - textWidth) / 2;


                    doc.text(header, xPos, 15, { baseline: 'top' });

                    // Footer
                    var str = "Page " + doc.internal.getNumberOfPages();

                    doc.setFontSize(10);

                    // jsPDF 1.4+ uses getWidth, <1.4 uses .width
                    var pageSize = doc.internal.pageSize;
                    var pageHeight = pageSize.height
                        ? pageSize.height
                        : pageSize.getHeight();
                    doc.text(str, data.settings.margin.left, pageHeight - 10);
                }


            });

            const uniqueText = generateRandomString();

            doc.save(`transaction-report-${uniqueText}.pdf`);

            toast.success(" PDF download successfully")
        } else {
            toast.error("Currently, there are no transactions to display. Therefore, the PDF download is not available.")
        }

    }



    return (
        <div className="App bg-[#f4f5f7]">
            <div className="m-3">
                <div className="grid grid-cols-3 gap-3 ">
                    <div className="">
                        <select
                            name="sort_date"
                            placeholder="Sort Date"
                            onClick={(e) => setSearchDate(e.target.value)}
                            className="font-normal font-sans not-italic  w-full h-[35px] py-[5px] px-[5px] rounded-[6px] bg-[#FFF] 
                            text-theme border-[1px] focus:border-theme focus:outline-none border-inputBorderColor text-[14px] "
                        >
                            <option className="text-[16px] font-sans  not-italic font-normal text-[#000000]"
                                value=""> Sort Date </option>
                            <option className="text-[16px] font-sans  not-italic font-normal text-[#000000]"
                                value="date_asc">{`Date (ASC)`}</option>
                            <option className="text-[16px] font-sans  not-italic font-normal text-[#000000]"
                                value="date_dsc">{`Date (DSC)`}</option>
                        </select>
                    </div>
                    <div>
                        <select
                            name="type"
                            placeholder="Type"
                            onClick={(e) => setSearchType(e.target.value)}
                            className="font-normal font-sans not-italic  w-full h-[35px] py-[5px] px-[5px] rounded-[6px] bg-[#FFF] 
                      text-theme border-[1px] focus:border-theme focus:outline-none border-inputBorderColor text-[14px] "
                        >
                            <option
                                value=''
                                className="text-[16px] font-sans  not-italic font-normal text-[#000000]"
                            > Type </option>
                            <option
                                className="text-[16px] font-sans  not-italic font-normal text-[#000000]"
                                value="manual" > Manual </option>
                            <option
                                className="text-[16px] font-sans  not-italic font-normal text-[#000000]"
                                value="recurring" > Recurring </option>
                            <option
                                className="text-[16px] font-sans  not-italic font-normal text-[#000000]"
                                value="one_time" > One-Time </option>
                        </select>
                    </div>
                    <div>
                        <select
                            name="method"
                            placeholder="Method"
                            onClick={(e) => setSeachMethod(e.target.value)}
                            className="font-normal font-sans not-italic  w-full h-[35px] py-[5px] px-[5px] rounded-[6px] bg-[#FFF] 
                      text-theme border-[1px] focus:border-theme focus:outline-none border-inputBorderColor text-[14px] "
                        >
                            <option
                                className="text-[16px] font-sans  not-italic font-normal text-[#000000]"
                                value=""  >
                                Method
                            </option>
                            <option
                                className="text-[16px] font-sans  not-italic font-normal text-[#000000]"
                                value="stripe"  >
                                Stripe
                            </option>
                        </select>
                    </div>
                </div>
                <div className="flex gap-3 mt-2">
                    <div className="w-[65.5%] h-[2.18rem] flex relative ">
                        <div className="w-full  ">
                            <input
                                name="search_by_keyword"
                                value={searchTitle}
                                onChange={(e) => setSeachTitle(e.target.value)}
                                className=" font-normal font-sans  w-full h-[35px] py-[10px] text-[14px] not-italic px-[10px] rounded-[6px] bg-[#FFF] 
                            text-theme border-[1px] focus:border-theme focus:outline-none border-inputBorderColor"
                                placeholder="Search transactions"
                            />
                        </div>
                        <div className=" absolute right-[05px] top-[10px] bg-white pl-[2px] ">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="21"
                                viewBox="0 0 20 21"
                                fill="none"
                            >
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M8.51519 1.61084C4.52647 1.61084 1.29297 4.84434 1.29297 8.83306C1.29297 12.8218 4.52647 16.0553 8.51519 16.0553C12.5039 16.0553 15.7374 12.8218 15.7374 8.83306C15.7374 4.84434 12.5039 1.61084 8.51519 1.61084ZM8.51519 2.74973C10.9762 2.74748 13.1961 4.22821 14.1394 6.50122C15.0828 8.77423 14.5637 11.3917 12.8243 13.1327C11.0849 14.8736 8.46791 15.3951 6.19404 14.4539C3.92017 13.5126 2.43741 11.294 2.43741 8.83306C2.4526 5.4818 5.16395 2.76797 8.51519 2.74973ZM14.793 14.3164L18.8874 18.4386C19.0273 18.5795 19.0815 18.7844 19.0294 18.976C18.9773 19.1677 18.8269 19.317 18.6349 19.3677C18.4429 19.4184 18.2385 19.3629 18.0985 19.222L14.0041 15.0997L14.793 14.3164Z"
                                    fill="#262626"
                                />
                            </svg>
                        </div>
                    </div>
                    <div className="">
                        <span
                            className="flex gap-2 bg-[#CCD9E6] py-3 py-[12px] px-[14px] items-center h-[35px]  rounded-[6px]"
                            onClick={() => downloadPDF()}
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
                            <span className="text-[16px] font-normal not-italic text-[#262626] ">
                                Download
                            </span>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sort;