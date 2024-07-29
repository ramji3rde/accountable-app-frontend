import { useState } from "react";
import SupportDetailComponent from '../../components/support/details'
import DeletePopup from '../../components/support/deletePopup'
import NavigationButton from '../../components/tenants/details/navigation_button'
import SubHeader from '../../components/public-com/header'
import { useRouter } from 'next/router';
import { useSelector } from "react-redux";
import { reactLocalStorage } from "reactjs-localstorage";
import CancelComponent from "../../components/public-com/cancelComponent";




function SupportDetail() {

    const [showPopup, setShowPopup] = useState(false);

    const router = useRouter();

    const Manager = reactLocalStorage.get('user_role')

    return (
        <div>
            <SubHeader title={'Support Details'} backUrl={'/support/list'} />

            <SupportDetailComponent />

            <DeletePopup
                datashow={showPopup ? "block" : "hidden"}
                onClicked={() => setShowPopup(false)}
            />

            {Manager === 'app_manager' ?
                <CancelComponent /> :
                <NavigationButton
                    BtnFirst={"Edit"}
                    BtnFirstOnclick={() => router.push(`/support/form?edit=true`)}
                    BtnSecond={"Delete"}
                    SecondOnClick={() => setShowPopup(true)}
                />}

        </div>
    )
}

export default SupportDetail