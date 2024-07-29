import React from 'react'
import { useState , useEffect } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { useDispatch } from 'react-redux'
import { getIncidents } from '../../../redux/action/incidents'

export default function IncidentsSort() {
 
    const [searchTitle, setSeachTitle] = useState("")
    const [searchOption, setSeachOption] = useState("a-z")

    const dispatch = useDispatch()

    useEffect(() => {
        if (searchTitle !== "" || searchOption !== "a-z") {

            let data = {
                posts_per_page: "10",
                paged: "1",
                sort_by_field: searchOption ? searchOption : "",
                search_by_keyword: searchTitle ? searchTitle : ""
            }
            const delayDebounceFn = setTimeout(() => {
                dispatch(getIncidents(data))
            }, 500);


            return () => clearTimeout(delayDebounceFn)
        } else {


            let data = {
                posts_per_page: "-1",
                paged: "1",
                sort_by_field: searchOption ? searchOption : "",
                search_by_keyword: searchTitle ? searchTitle : ""
            }
            dispatch(getIncidents(data))

        }


    }, [dispatch, searchOption, searchTitle])




  return (
    <>
     <div className="App bg-[#f4f5f7] ">
            <div className='flex justify-between items-center  py-4 px-3 gap-3 '>
                <div className='w-[171px] h-[35px]'>
                    <select
                        name='sort_by_field'
                        id='sort_by_field'
                        onChange={(e) => setSeachOption(e.target.value)}
                        placeholder='Sort by Date'
                        value={searchOption}
                        className="font-normal font-sans not-italic  w-full h-[35px] py-[5px] px-[5px] rounded-[6px] bg-[#FFF] 
                       text-[#262626] border-[1px] focus:border-theme focus:outline-none border-inputBorderColor text-[14px] ">
                        <option className="text-[16px] font-sans font-normal text-[#000000]" value='date'>Sort by Date</option>
                        <option className="text-[16px] font-sans font-normal text-[#000000]" value='a-z'>Sort by Name (A-Z)</option>
                        <option className="text-[16px] font-sans font-normal text-[#000000]" value='Status'>Sort by Status</option>
                    </select>

                </div>

                <div className='w-[50%] h-[2.18rem] flex relative '>
                    <div className="w-full  " >
                        <input
                            name='search_by_keyword'
                            value={searchTitle}
                            onChange={(e) => setSeachTitle(e.target.value)}
                            className=" font-normal font-sans  w-full h-[35px] py-[9px] text-[14px] not-italic px-[5px] rounded-[6px] bg-[#FFF] 
                            text-theme border-[1px] focus:border-theme focus:outline-none border-inputBorderColor"
                            placeholder="Search, hit enter " />
                    </div>
                    <div className=" absolute right-[05px] top-[10px] bg-white pl-[2px] ">
                        <AiOutlineSearch className="w-[17.76px] h-[17.78px] text-[#262626]"/>
                    </div>
                </div>
            </div>
        </div>
    
    </>
  )
}
