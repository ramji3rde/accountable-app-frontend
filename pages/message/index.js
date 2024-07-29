import BottomNavigation from "../../components/public-com/bottom_navigation";
import SubHeader from "../../components/public-com/header";
import { useSelector, useDispatch } from "react-redux";
import DefultScreen from "../../components/public-com/DefultScreen";
import List from "../../components/message/list";
import { useEffect } from "react";
import ToggleContainerButton from "../../components/public-com/toggleButton";
import { getAdminMessageList } from "../../redux/action/adminMessageList";

function TenantsRequestList() {
  const dispatch = useDispatch();

  const item = useSelector(
    (state) => state.adminMessageList.adminMessageList?.data
  );

  useEffect(() => {
    let data = {
      posts_per_page: "-1",
      paged: "1",
      sort_by_field: "a-z",
      search_by_keyword: "",
    };
    dispatch(getAdminMessageList(data));
  }, [dispatch]);

  const toggleTabsData = [
    {
      name: "Project Requests",
      link: "/request_tenants/list",
    },
    {
      name: "Messages",
      link: "/message",
    },
  ];

  return (
    <div className="">
      <SubHeader title={"Tenant Messages"} />
      <ToggleContainerButton Tabs={toggleTabsData} />

      {item?.length > 0 ? (
        <>
          <List />
        </>
      ) : (
        <DefultScreen
          Title={
            "New messages from Tenants will automatically\u00A0show up here"
          }
          SecondTitle={"No Messages"}
        />
      )}

      <BottomNavigation />
    </div>
  );
}

export default TenantsRequestList;
