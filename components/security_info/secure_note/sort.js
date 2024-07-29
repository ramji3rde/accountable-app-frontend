import { useEffect, useState, Fragment } from "react";
import { useDispatch } from "react-redux";
import { AiOutlineSearch } from "react-icons/ai";
import { getAllSecureNotes } from "../../../redux/action/secureNotesList";
import { reactLocalStorage } from "reactjs-localstorage";
import { useSelector } from "react-redux";

function SecureNoteSort({ setValue }) {
  const [searchOption, setSeachOption] = useState("Login Notes");
  const [searchOptionGroup, setSeachOptionGroup] = useState("");
  const [searchTitle, setSearchTitle] = useState("");
  const [groupNames, setGroupNames] = useState([]);

  const dispatch = useDispatch();

  const masterPassword = reactLocalStorage.get("masterPassword");

  const Groupdata = useSelector(
    (state) => state.secureNotesList.secureNotesList?.data?.groups
  );

  useEffect(() => {
    if (Groupdata) {
      let GroupNames = Object.values(Groupdata);

      setGroupNames(GroupNames);
    }
  }, [Groupdata]);

  useEffect(() => {
    if (
      searchOption !== "Login Notes" ||
      searchOptionGroup !== "" ||
      searchTitle !== ""
    ) {
      
      let data = {
        master_password: masterPassword,
        category: searchOption,
        group: searchOptionGroup,
        keywords: searchTitle,
      };
      const delayDebounceFn = setTimeout(() => {
        dispatch(getAllSecureNotes(data));
      }, 500);

      return () => clearTimeout(delayDebounceFn);
    } else {
      let data = {
        master_password: masterPassword,
        category: searchOption,
        group: searchOptionGroup,
        keywords: searchTitle,
      };
      dispatch(getAllSecureNotes(data));
    }
  }, [dispatch, searchOption, searchOptionGroup, searchTitle]);

  return (
    <div className="App bg-[#f4f5f7] ">
      <div className="flex justify-between items-center pb-2 px-[20px] gap-3  ">
        <div className="w-[33%] h-[2.18rem]">
          <select
            name="sort_by_field"
            id="sort_by_field"
            onChange={(e) => setSeachOption(e.target.value)}
            placeholder="Type"
            value={searchOption}
            className="font-normal font-sans  not-italic w-full h-[35px] py-[5px] px-[5px] rounded-[6px] bg-[#FFF] 
                        text-theme border-[1px] focus:border-theme focus:outline-none border-inputBorderColor text-[14px] "
          >
            <option
              className="text-[16px] font-sans  not-italic font-normal text-[#000000]"
              value="Login Notes"
            >
              Login Notes
            </option>
            <option
              className="text-[16px] font-sans  not-italic font-normal text-[#000000]"
              value="Secure Notes"
            >
              Secure Notes
            </option>
          </select>
        </div>

        <div className="w-[33%] h-[2.18rem]">
          <select
            name="sort_by_field"
            id="sort_by_field"
            onChange={(e) => setSeachOptionGroup(e.target.value)}
            placeholder="Group"
            value={searchOptionGroup}
            className="font-normal font-sans  not-italic w-full h-[35px] py-[5px] px-[5px] rounded-[6px] bg-[#FFF] 
                        text-theme border-[1px] focus:border-theme focus:outline-none border-inputBorderColor text-[14px] "
          >
            {groupNames?.length > 0 ? (
              groupNames?.map((item, index) => (
                <Fragment key={index}>
                  <option
                    className="text-[16px] font-sans  not-italic font-normal text-[#000000]"
                    value={item}
                  >
                    {item}
                  </option>
                </Fragment>
              ))
            ) : (
              <option
                className="text-[16px] font-sans  not-italic font-normal text-[#000000]"
                value=""
              >
                {"No Group"}
              </option>
            )}
          </select>
        </div>

        <div className="w-[33%] h-[2.18rem] flex relative ">
          <div className="w-full  ">
            <input
              name="search_by_keyword"
              value={searchTitle}
              onChange={(e) => setSearchTitle(e.target.value)}
              className=" font-normal font-sans  not-italic w-full h-[35px] py-[10px] text-[14px] px-[10px] rounded-[6px] bg-[#FFF] 
                            text-theme border-[1px] focus:border-theme focus:outline-none border-inputBorderColor"
              placeholder="Search"
            />
          </div>
          <div className=" absolute right-[05px] top-[10px] bg-white pl-[2px] ">
            <AiOutlineSearch className="w-[17.76px] h-[17.78px] text-[#262626]" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SecureNoteSort;
