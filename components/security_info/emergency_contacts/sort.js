import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AiOutlineSearch } from 'react-icons/ai';
import { getEmergencyContanctFilter } from "../../../redux/action/emergency_contant_list";


function EmergencyNoteSort({ setValue }) {

    const [searchTitle, setSeachTitle] = useState("")
    const [searchOption, setSeachOption] = useState("a-z")

    const dispatch = useDispatch()

    useEffect(() => {
        if (searchTitle !== "" || searchOption !== "a-z") {

            let data = {
                posts_per_page: "10",
                paged: "1",
                sort_by_field: searchOption ? searchOption : "a-z",
                search_by_keyword: searchTitle ? searchTitle : "",
                start_date: "",
                end_date: "",
            }
            const delayDebounceFn = setTimeout(() => {
                dispatch(getEmergencyContanctFilter(data))
            }, 500);

            return () => clearTimeout(delayDebounceFn)
        } else {

            let data = {
                posts_per_page: "-1",
                paged: "1",
                sort_by_field: searchOption ? searchOption : "a-z",
                search_by_keyword: searchTitle ? searchTitle : "",
                start_date: "",
                end_date: "",
            }
            dispatch(getEmergencyContanctFilter(data))

        }


    }, [dispatch, searchOption, searchTitle])


    return (
        <div className="App bg-[#f4f5f7] ">
            <div className='flex justify-between items-center pb-2 px-[20px] gap-3  '>
                <div className='w-[50%] h-[2.18rem]'>
                    <select
                        name='sort_by_field'
                        id='sort_by_field'
                        onChange={(e) => setSeachOption(e.target.value)}
                        placeholder='Sort by Name A-Z'
                        value={searchOption}
                        className="font-normal font-sans  not-italic w-full h-[35px] py-[5px] px-[5px] rounded-[6px] bg-[#FFF] 
                        text-theme border-[1px] focus:border-theme focus:outline-none border-inputBorderColor text-[14px] ">
                        {/* <option selected value=''>Type</option> */}
                        <option className="text-[16px] font-sans  not-italic font-normal text-[#000000]" value='a-z'>Sort by Name (A-Z)</option>
                        <option className="text-[16px] font-sans  not-italic font-normal text-[#000000]" value='z-a'>Sort by Name (Z-A)</option>
                    </select>
                </div>

                <div className='w-[50%] h-[2.18rem] flex relative '>
                    <div className="w-full  " >
                        <input
                            name='search_by_keyword'
                            value={searchTitle}
                            onChange={(e) => setSeachTitle(e.target.value)}
                            className=" font-normal font-sans  not-italic w-full h-[35px] py-[10px] text-[14px] px-[10px] rounded-[6px] bg-[#FFF] 
                            text-theme border-[1px] focus:border-theme focus:outline-none border-inputBorderColor"
                            placeholder="Search" />
                    </div>
                    <div className=" absolute right-[05px] top-[10px] bg-white pl-[2px] ">
                        <AiOutlineSearch className="w-[17.76px] h-[17.78px] text-[#262626]" />
                    </div>
                </div>

            </div>
        </div>
    )
}

export default EmergencyNoteSort;