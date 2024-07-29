import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import SubHeader from '../../../components/public-com/header'
import ProjectRequest from '../../../components/tenant/project_request/details'
import DeletePopup from '../../../components/tenants/deletepopup'
import NavigationButton from '../../../components/tenants/details/navigation_button'

function TenantsDetails() {
    const [showPopup, setShowPopup] = useState(false);

    const router = useRouter();

    return (
        <div>
            <SubHeader title={'Project Requests'} backUrl={'/tenant/project_request'} />


            <ProjectRequest />
            {showPopup &&
                <DeletePopup datashow={!showPopup ? "hidden" : "block"} onClicked={() => setShowPopup(false)} clientName={'projectRequest'} />}
            <NavigationButton
                BtnFirst={"Edit"}
                BtnFirstOnclick={() => {
                    router.push('/tenant/project_request/form?edit=true')
                }}
                BtnSecond={"Delete"}
                SecondOnClick={() => setShowPopup(true)} />
        </div>
    )
}

export default TenantsDetails