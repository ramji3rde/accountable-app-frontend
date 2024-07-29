import SubHeader from "../../components/public-com/header";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import AdminMessageDetails from "../../components/message/details";
import DeleteComponent from "../../components/message/deleteComponent";
import DeletePopup from "../../components/message/deletePopup";
import { reactLocalStorage } from 'reactjs-localstorage';
import CancelComponent from "../../components/public-com/cancelComponent";






function TenantsDetails() {

    const [showPopup, setShowPopup] = useState(false);

    const router = useRouter()

    const open = () => {
        setShowPopup(false)
    }

    const close = () => {
        setShowPopup(false)
    }

    const Manager = reactLocalStorage.get('user_role')


    return (
        <div className="App">
            <SubHeader title={"Tenant Message Details"} backUrl={'/message'} />
            {/* <TanantsDetailsCom /> */}
            <AdminMessageDetails />

            <DeletePopup datashow={showPopup ? "block" : "hidden"} onClicked={close} />
            {Manager === 'app_manager' ?
                <CancelComponent /> :
                <DeleteComponent open={setShowPopup} />}
        </div>
    )
}

export default TenantsDetails;