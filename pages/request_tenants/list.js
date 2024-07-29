import AddNew from "../../components/tenants/add_user_button";
import BottomNavigation from "../../components/public-com/bottom_navigation";
import SubHeader from "../../components/public-com/header";
import ListItem from "../../components/tenants/list";
import { useSelector, useDispatch } from "react-redux";
import DefultScreen from "../../components/public-com/DefultScreen";
import Sort from "../../components/tenants-reports/sort";
import List from "../../components/tenants-reports/list";
import { reactLocalStorage } from "reactjs-localstorage";
import { getProjectRequest } from "../../redux/action/projectRequest";
import { useEffect } from "react";
import ToggleContainerButton from "../../components/public-com/toggleButton";




function TenantsRequestList() {

    const dispatch = useDispatch();

    const item = useSelector((state) => state.projectsRequest?.projectsRequest?.any_record_created)

    useEffect(() => {

        let data = {
            posts_per_page: "-1",
            paged: "1",
            sort_by_field: "a-z",
            search_by_keyword: ""
        }
        dispatch(getProjectRequest(data))

    }, [dispatch])

    const toggleTabsData = [
        {
            name: 'Project Requests',
            link: '/request_tenants/list'
        },
        {
            name: 'Messages',
            link: '/message'
        }
    ]

    return (
        <div className="">
            <SubHeader title={"Tenant Project Requests"} />

            <ToggleContainerButton Tabs={toggleTabsData} />

            {item === 'yes' ?
                <>
                    <List /></>
                :
                <DefultScreen
                    Title={'New project requests from Tenants will automatically show up here'}
                    SecondTitle={'No Requests'} />
            }

            <BottomNavigation />
        </div >
    )
}

export default TenantsRequestList;