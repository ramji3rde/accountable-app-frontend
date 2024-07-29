import React, { useEffect, useState } from 'react'
import SubHeader from '../../../components/public-com/header'
import BottomNavigation from '../../../components/public-com/bottom_navigation'
import ToggleContainerButton from '../../../components/public-com/toggleButton'
import DefultScreen from '../../../components/public-com/DefultScreen'
import SecureNoteSort from '../../../components/security_info/secure_note/sort'
import ListItem from '../../../components/security_info/secure_note/list'
import AddNew from '../../../components/tenants/add_user_button'
import { useRouter } from 'next/router'
import LoginMasterPassword from './login'
import ForgotMasterPassword from './forgot-password'
import { reactLocalStorage } from 'reactjs-localstorage'
import { noteValidationAPI } from '../../../redux/APIS/API'


function Secure_Notes() {

    const [masterlogin, setMasterlogin] = useState(false)

    const router = useRouter()

    const Login = router.query.login

    const Forgot = router.query.forgot


    const masterUser = reactLocalStorage.get('masterUser')

    const validatMasterCheck = async () => {
        const res = await noteValidationAPI()
        const masterCreated = res?.data?.success
        console.log(res?.data?.data?.password_hint, 'validatMasterCheck');
        reactLocalStorage.set('masterPasswordHint', res?.data?.data?.password_hint)
        if (masterCreated) {
            router.push('/security_info/secure_notes?login=true')
        } else {
            router.push('/security_info/secure_notes')
        }
    }


    useEffect(() => {

        if (!masterUser) {
            validatMasterCheck()
        }

    }, [masterUser])





    const toggleTabsData = [
        {
            name: 'Emergency Contacts',
            link: '/security_info/emergency_contacts'
        },
        {
            name: 'Passwords / Secure Notes',
            link: '/security_info/secure_notes'
        }
    ]


    const welcomeScreen = "yes"




    return (
        <div>
            <SubHeader title={"Security Info"} />
            <ToggleContainerButton Tabs={toggleTabsData} />

            {Login == 'true' ?

                <LoginMasterPassword /> :

                Forgot == 'true' ?

                    <ForgotMasterPassword />

                    : masterUser ?
                        <>
                            {welcomeScreen == "yes" ?
                                <>
                                    <SecureNoteSort />
                                    <ListItem />
                                    <AddNew href={"/security_info/secure_notes/form"} />
                                </>
                                :
                                <DefultScreen
                                    Title={`Add private information like login credentials, passcodes, and secure notes.\n
                                    All info in this section is encrypted and requires a master password to access`}
                                    ButtonTitle={'Add Item'}
                                    ButtonIcon={'/bottom-icon/plus-icon.svg'}
                                    ButtonUrl={'/security_info/secure_notes/form'}
                                />
                            }
                        </> :
                        <DefultScreen
                            Title={`Create a master password to secure your sensitive information. 
                               This password must be different from  your admin login password.\n
                                Save this password in a safe place.`}
                            ButtonTitle={'Create Master Password'}
                            ButtonIcon={'/bottom-icon/lock-icon-solid.svg'}
                            ButtonUrl={'/security_info/secure_notes/create-master-password'}
                        />
            }



            <BottomNavigation />

        </div>
    )
}

export default Secure_Notes