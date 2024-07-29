import { useRouter } from "next/router";
import { useState } from "react";
import ProjectDetails from "../../components/projects/ProjectDetails";
import DeletePopup from "../../components/projects/deletepopup";
import NavigationButton from "../../components/tenants/details/navigation_button";
import SubHeader from "../../components/public-com/header";
import { useSelector } from "react-redux";
import { reactLocalStorage } from "reactjs-localstorage";
import CancelComponent from "../../components/public-com/cancelComponent";





function Details() {

    const [showPopup, setShowPopup] = useState(true);

    const router = useRouter();

    const openPopup = () => {
        setShowPopup(false)
    }

    const closePopup = () => {
        setShowPopup(true)
    }


    const Manager = reactLocalStorage.get('user_role')

    return (
        <div className="bg">
            {/* <header className="z-50 bg-[#fff] pt-2  shadow-[1px_5px_13px_2px_#0000000d] overflow-scroll "> */}
            <SubHeader title={'Projects Details'} backUrl={'/projects/list'} />
            {/* </header> */}

            <ProjectDetails />

            <DeletePopup datashow={showPopup ? "hidden" : "block"} onClicked={closePopup} />
            {Manager === 'app_manager' ?
                <CancelComponent /> :
                <NavigationButton
                    BtnFirst={"Edit"}
                    BtnFirstOnclick={() => router.push('/projects/form?edit=true')}
                    BtnSecond={"Delete"}
                    SecondOnClick={openPopup}
                />}
        </div>
    )
}
export default Details;

