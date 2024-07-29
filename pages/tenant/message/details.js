import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import SubHeader from '../../../components/public-com/header'
import ProjectRequest from '../../../components/tenant/message/details'
import DeletePopup from '../../../components/tenants/deletepopup'
import NavigationButton from '../../../components/tenants/details/navigation_button'

function TenantsDetails() {
    const [showPopup, setShowPopup] = useState(false);

    const router = useRouter();

    return (
        <div>
            <SubHeader title={'Message Details'} backUrl={'/tenant/message'} />


            <ProjectRequest />
            {showPopup &&
                <DeletePopup datashow={!showPopup ? "hidden" : "block"} onClicked={() => setShowPopup(false)} clientName={'tenantMessage'} />}
            <NavigationButton
                BtnFirst={"Edit"}
                BtnFirstOnclick={() => {
                    router.push('/tenant/message/form?edit=true')
                }}
                BtnSecond={"Delete"}
                SecondOnClick={() => setShowPopup(true)} />
        </div>
    )
}

export default TenantsDetails