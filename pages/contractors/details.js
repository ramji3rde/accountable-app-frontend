import { useRouter } from "next/router";
import { useState } from "react";
import ContractorsDetailsCom from "../../components/contractors/contractors_detailCom";
import DeletePopup from "../../components/contractors/deletepopup";
import NavigationButton from "../../components/tenants/details/navigation_button";
import SubHeader from "../../components/public-com/header";
import { reactLocalStorage } from "reactjs-localstorage";
import CancelComponent from "../../components/public-com/cancelComponent";





function ContractorsDetails() {
    const [showPopup, setShowPopup] = useState(false);

    const open = () => {
        setShowPopup(true)
    }

    const close = () => {
        setShowPopup(false)
    }

    const router = useRouter();

    const Manager = reactLocalStorage.get('user_role')


    return (
        <div>
            {/* <header className="z-50 bg-[#fff] pt-2 shadow-[1px_5px_13px_2px_#0000000d] sticky top-0 overflow-hidden"> */}
            <SubHeader title={"Contractor Details"} backUrl={'/contractors/list'} />
            {/* </header> */}


            <ContractorsDetailsCom />

            <DeletePopup datashow={showPopup ? "block" : "hidden"} onClicked={close} />
            {Manager === 'app_manager' ?
                <CancelComponent /> :
                <NavigationButton
                    BtnFirst={"Edit"}
                    BtnFirstOnclick={() => {
                        router.push('/contractors/form?edit=true')
                    }}
                    BtnSecond={"Delete"}
                    SecondOnClick={open}
                />}
        </div>
    )
}

export default ContractorsDetails;