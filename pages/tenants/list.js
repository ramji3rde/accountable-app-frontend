import AddNew from "../../components/tenants/add_user_button";
import BottomNavigation from "../../components/public-com/bottom_navigation";
import ListItem from "../../components/tenants/list";
import TenantsSort from "../../components/tenants/tenants_sort";
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import DefultScreen from "../../components/public-com/DefultScreen";
import { getTenantsFilter } from "../../redux/action/tenants";
import { reactLocalStorage } from "reactjs-localstorage";
import SubHeader from "../../components/public-com/header";

import {sendFcmTokenAPI} from '../../redux/APIS/API'



function TenantsList() {

    const dispatch = useDispatch();

    const item = useSelector((state) => state.tenants.tenants?.any_record_created)

    useEffect(() => {

        let data = {
            posts_per_page: "-1",
            paged: "1",
            sort_by_field: "a-z",
            search_by_keyword: ""
        }
        dispatch(getTenantsFilter(data))

    }, [dispatch])

    const Manager = reactLocalStorage.get('user_role')

    const token = {
        device_token: reactLocalStorage.get('fcm_token')
    }
   

    

    return (
        
        <div className="">
            <SubHeader title={"Tenants"} />


            {item === 'yes' ? <><TenantsSort /> <ListItem />
                {Manager === 'app_manager' ? null :
                    <AddNew href={"/tenants/form"} />} </> :
                <DefultScreen
                    Title={'Add your tenants / leasees to your property'}
                    ButtonTitle={'Add Tenants'}
                    ButtonUrl={'/tenants/form'} />
            }

            <BottomNavigation />
        </div >
        
    )
}

export default TenantsList;