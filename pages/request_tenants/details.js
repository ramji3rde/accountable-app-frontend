import SubHeader from "../../components/public-com/header";
import TanantsDetailsCom from "../../components/tenants-reports/details";
import NavigationButton from "../../components/tenants/details/navigation_button";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import DeleteComponent from "../../components/message/deleteComponent";
import DeletePopup from "../../components/tenants-reports/deletePopup";
import { reactLocalStorage } from 'reactjs-localstorage'
import CancelComponent from "../../components/public-com/cancelComponent";




function TenantsDetails() {

    const [showPopup, setShowPopup] = useState(false);

    const router = useRouter()

    const open = () => {
        setShowPopup(true)
    }

    const close = () => {
        setShowPopup(false)
    }

    const Manager = reactLocalStorage.get('user_role')

    return (
        <div className="App">
            <SubHeader title={"Tenant Project Requests"} backUrl={'/request_tenants/list'} />

            <TanantsDetailsCom />

            <DeletePopup datashow={showPopup ? "block" : "hidden"} onClicked={close} />

            {Manager === 'app_manager' ?
                <CancelComponent /> :
                <DeleteComponent open={setShowPopup} />}
        </div>
    )
}

export default TenantsDetails;