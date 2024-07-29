import React, { useState } from 'react'
import SubHeader from '../../../components/public-com/header'
import EmergencyContactsDetailComponent from '../../../components/security_info/emergency_contacts/details'
import NavigationButton from '../../../components/tenants/details/navigation_button'
import { useRouter } from 'next/router';
import { reactLocalStorage } from 'reactjs-localstorage';
import CancelComponent from '../../../components/public-com/cancelComponent';
import DeletePopup from '../../../components/security_info/emergency_contacts/deletePopup';

function EmergencyContactsDetail() {

    const [showPopup, setShowPopup] = useState(false);
    const router = useRouter();
    const Manager = reactLocalStorage.get('user_role')

    return (
        <div>

            <SubHeader title={"Contact Details"} backUrl={'/security_info/emergency_contacts'} />

            <EmergencyContactsDetailComponent />

            <DeletePopup
                datashow={showPopup ? "block" : "hidden"}
                onClicked={() => setShowPopup(false)}
            />
            {Manager === 'app_manager' ?
                <CancelComponent /> :
                <NavigationButton
                    BtnFirst={"Edit"}
                    BtnFirstOnclick={() => {
                        router.push(`/security_info/emergency_contacts/form?edit=true`)
                    }}
                    BtnSecond={"Delete"}
                    SecondOnClick={() => setShowPopup(true)} />}


        </div>
    )
}

export default EmergencyContactsDetail