import React from 'react'
import { useState } from 'react';
import DeletePopup from '../../components/expenses/deletePopup'
import NavigationButton from '../../components/tenants/details/navigation_button'
import SubHeader from '../../components/public-com/header'
import { useRouter } from 'next/router';
import IncidentsDetailComponent from '../../components/incidents/details'
import Expensesdetails from '../../components/expenses/details';
import { reactLocalStorage } from "reactjs-localstorage";
import CancelComponent from "../../components/public-com/cancelComponent";


function Details() {

    const [showPopup, setShowPopup] = useState(false);
    const router = useRouter();
    const Manager = reactLocalStorage.get('user_role')


    return (
        <div>
            <SubHeader title={'Expense Details'} backUrl={'/expenses/list'} />

            <Expensesdetails />

            <DeletePopup
                datashow={showPopup ? "block" : "hidden"}
                onClicked={() => setShowPopup(false)}
            />
            {Manager === 'app_manager' ?
                <CancelComponent /> :
                <NavigationButton
                    BtnFirst={"Edit"}
                    BtnFirstOnclick={() => router.push(`/expenses/form?edit=true`)}
                    BtnSecond={"Delete"}
                    SecondOnClick={() => setShowPopup(true)}
                />}

        </div>
    )
}

export default Details