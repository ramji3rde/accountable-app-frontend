import { useState, useEffect } from 'react'
import SubHeader from '../../../components/public-com/header'
import SecureNotesDetailComponent from '../../../components/security_info/secure_note/details'
import NavigationButton from '../../../components/tenants/details/navigation_button'
import { useRouter } from 'next/router';
import { reactLocalStorage } from 'reactjs-localstorage';
import CancelComponent from '../../../components/public-com/cancelComponent';
import DeletePopup from '../../../components/security_info/secure_note/deletePopup';

function SecureNotesDetail() {

    const [showPopup, setShowPopup] = useState(false);
    const router = useRouter();
    const Manager = reactLocalStorage.get('user_role')




    return (
        <div>

            <SubHeader title={"Item Details "} backUrl={'/security_info/secure_notes'} />

            <SecureNotesDetailComponent />

            <DeletePopup
                datashow={showPopup ? "block" : "hidden"}
                onClicked={() => setShowPopup(false)}
            />
            {Manager === 'app_manager' ?
                <CancelComponent /> :
                <NavigationButton
                    BtnFirst={"Edit"}
                    BtnFirstOnclick={() => {
                        router.push("/security_info/secure_notes/form?edit=true")
                    }}
                    BtnSecond={"Delete"}
                    SecondOnClick={() => setShowPopup(true)} />}


        </div>
    )
}

export default SecureNotesDetail