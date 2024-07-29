import React from 'react'
import Details from '../../components/schedule/details';
import SubHeader from '../../components/public-com/header';
import AddNew from '../../components/tenants/add_user_button';
import NavigationButton from '../../components/tenants/details/navigation_button';
import { useRouter } from 'next/router';
import DeletePopup from '../../components/schedule/deletepopup';
import { useState } from 'react';
import { useEffect } from 'react';
import { reactLocalStorage } from "reactjs-localstorage";
import CancelComponent from "../../components/public-com/cancelComponent";



const ScheduleDetails = () => {

    const [showPopup, setShowPopup] = useState(true);

    const router = useRouter();

    const { groupId } = router.query

    const Manager = reactLocalStorage.get('user_role')


    return (
        <div className='app'>
            <SubHeader title={'Task Checklist'} backUrl={'/schedule/list'} />

            <div>
                <Details />
            </div>

            <DeletePopup datashow={showPopup ? "hidden" : "block"} onClicked={() => setShowPopup(true)} />
            {Manager === 'app_manager' ?
                <CancelComponent /> :
                <div className="fixed bottom-0 left-0 w-full shadow-[1px_-10px_13px_2px_#0000000d] " >
                    <div
                        onClick={() => setShowPopup(false)}
                        className="flex justify-center h-[70px]">
                        <div className="px-4 py-2 w-full mx-auto flex justify-center  bg-[#D64F52]">
                            <span className="text-white self-center text-[22px] font-normal">Delete</span>
                        </div>
                    </div>
                </div>}

        </div>
    )
}

export default ScheduleDetails;