import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'
import BottomNavigation from '../../components/public-com/bottom_navigation'
import SubHeader from '../../components/public-com/header'
import { getProfileData } from '../../redux/action/getProfile';
import { reactLocalStorage } from 'reactjs-localstorage'
import toast from 'react-hot-toast'
import LogOutPopup from '../../components/public-com/LogOutPopup';
import { getTenantsFilter } from '../../redux/action/tenants';


function Profile() {
    const dispatch = useDispatch();

    const router = useRouter()

    useEffect(() => {

        dispatch(getProfileData())

        let data = {
            posts_per_page: "100",
            paged: "-1",
            sort_by_field: "",
            search_by_keyword: ""
        }

        dispatch(getTenantsFilter(data))


    }, [profile])

    const profile = useSelector((state) => state?.getProfile?.profile?.data)

    const tenants = useSelector((state) => state?.tenants?.tenants?.data)

    const [showPopup, setShowPopup] = useState(false);
    const close = () => {
        setShowPopup(false)
    }

    function LogOut() {
        setShowPopup(true)
    }

    async function userLogout() {
        reactLocalStorage.clear()
        router.push('/')
        toast.success('Log Out SuccessFully')
    }



    const Manager = reactLocalStorage.get('user_role')



    return (
        <div className='App bg-[#f4f5f7] h-[100vh]'>
            {/* <header className='z-50 bg-[#fff] pt-2 shadow-[1px_5px_13px_2px_#0000000d] overflow-scroll'> */}
            <SubHeader title={'My Profile'} className='text-[16px] text-normal font-sans' />
            {/* </header> */}


            <div className="grid w-full py-4 px-4 mb-[75px]">
                {profile?.map((item, index) =>
                    <div className="flex w-full items-center" key={index} >
                        <div className="w-[100%] grid">
                            <div className="flex items-center gap-2 mb-5 ">
                                <h1 className="text-[26px] font-normal Oswald-font">
                                    Hi {item.first_name}
                                </h1>
                            </div>

                            <div className="grid gap-2 grid-cols-2 ">
                                <div >
                                    <span className='text-[10px] text-gray-600 font-normal font-sans ' >Name</span>
                                    <h1 className="text-[16px] font-[400] font-sans text-[#262626]">
                                        {item?.first_name.length > 0 ? item?.first_name : "--"}
                                        {' '}
                                        {item?.last_name.length > 0 ? item?.last_name : "--"}
                                    </h1>
                                </div>
                                <div>
                                    <span className='text-[10px] text-gray-600  font-normal font-sans' >Property Name</span>
                                    <h1 className="text-[16px] font-[400] font-sans text-[#262626]">
                                        {item?.property_name.length > 0 ? item?.property_name : "--"}
                                    </h1>
                                </div>

                            </div>

                            <div className="grid gap-2 grid-cols-1 my-4">
                                <div >
                                    <span className='text-[10px] text-gray-600 font-normal font-sans' >Email</span>
                                    <h1 className="text-[16px] font-[400] font-sans text-[#262626]">
                                        {item?.user_email.length > 0 ? item?.user_email : "--"}
                                    </h1>
                                </div>

                            </div>
                            <hr />
                        </div>
                    </div>
                )}

                <hr className="border-t-1 bg-[#c9c8c8]" />
                <div className="grid gap-2 mt-4 mb-10">
                    {Manager === 'app_manager' ? null :
                        <div
                            className='py-2'
                            onClick={() => Manager === 'app_manager' ? null : router.push('/profile/edit_profile')}
                        >
                            <h1 className="font-[400] text-[16px] font-sans ">
                                Edit Profile Details
                            </h1>
                        </div>}
                    {Manager === 'app_manager' ? null :
                        <div
                            className='py-2'
                            onClick={() => Manager === 'app_manager' ? null : router.push('/profile/notification')}
                        >
                            <h1 className=" font-[400] text-[16px] font-sans">
                                App Notifications
                            </h1>
                        </div>}


                    {Manager === 'app_manager' ? null :
                        <div
                            className='py-2'
                            onClick={() => Manager === 'app_manager' ? null : router.push('/profile/change_password')}
                        >
                            <h1 className=" font-[400] text-[16px] font-sans">
                                Change Password
                            </h1>
                        </div>}


                    <div
                        className='py-2'
                        onClick={LogOut}
                    >
                        <h1 className=" font-[400] text-[16px] font-sans">
                            Log Out
                        </h1>
                    </div>


                </div>
            </div>


            <LogOutPopup datashow={showPopup ? "block" : "hidden"} onClicked={close} userLogout={userLogout} />

            <BottomNavigation />


        </div>
    )
}

export default Profile