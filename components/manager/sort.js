import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AiOutlineSearch } from 'react-icons/ai'
import { getProjectRequest } from "../../redux/action/projectRequest";
import { getAdminManagerList } from "../../redux/action/ManagerList";





function Sort() {

    const [searchTitle, setSeachTitle] = useState("")
    const [searchOption, setSeachOption] = useState("a-z")

    const dispatch = useDispatch();

    useEffect(() => {
        if (searchTitle !== "" || searchOption !== "a-z") {

            let data = {
                posts_per_page: "-1",
                paged: "1",
                sort_by_field: searchOption ? searchOption : "a-z",
                search_by_keyword: searchTitle ? searchTitle : ""
            }
            const delayDebounceFn = setTimeout(() => {
                dispatch(getAdminManagerList(data))
            }, 500);


            return () => clearTimeout(delayDebounceFn)
        } else {
            let data = {
                posts_per_page: "-1",
                paged: "1",
                sort_by_field: searchOption ? searchOption : "a-z",
                search_by_keyword: searchTitle ? searchTitle : ""
            }
            dispatch(getAdminManagerList(data))

        }


    }, [dispatch, searchOption, searchTitle])




    return (
        <div className="App bg-[#f4f5f7]">
            <div className='flex justify-between items-center py-4 px-3 gap-3   '>

                <div className='w-[50%] h-[2.18rem]'>
                    <select
                        name='sort_by_field'
                        id='sort_by_field'
                        onChange={(e) => setSeachOption(e.target.value)}
                        placeholder='Sort by Name (A-Z)'
                        value={searchOption}
                        className="font-normal font-sans  w-full h-[35px] py-[5px] px-[5px] rounded-[6px] bg-[#FFF] 
                        text-theme border-[1px] focus:border-theme focus:outline-none border-inputBorderColor text-[13px] ">
                        {/* <option de>selectOption</option> */}
                        <option value='a-z'>Sort by Name (A-Z)</option>
                        <option value='z-a'>Sort by Name (Z-A)</option>
                    </select>
                </div>

                <div className='w-[50%] h-[2.18rem] flex relative '>
                    <div className="w-full  " >
                        <input
                            name='search_by_keyword'
                            value={searchTitle}
                            onChange={(e) => setSeachTitle(e.target.value)}
                            className=" font-normal font-sans  w-full h-[35px] py-[10px] text-[13px] px-[10px] rounded-[6px] bg-[#FFF] 
                            text-theme border-[1px] focus:border-theme focus:outline-none border-inputBorderColor"
                            placeholder="Search, hit enter " />
                    </div>
                    <div className=" absolute right-[05px] top-[10px] bg-white pl-[2px] ">
                        <AiOutlineSearch />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sort;