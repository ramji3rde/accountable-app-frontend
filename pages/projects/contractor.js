import React from 'react'
import { useRouter } from 'next/router'
import AlignContractor from '../../components/projects/aligncontractor'
import NavigationButton from '../../components/tenants/details/navigation_button'
import SubHeader from '../../components/public-com/header'



export default function Aligncontractor() {


    const router = useRouter()




    function data() {
        router.back()
    }

    return (
        <div>
            <SubHeader
                Subtitle={'Request New Quote'}
                GoBack={true}
            />
            <div>
                <AlignContractor />
            </div>

            <NavigationButton
                BtnSecond={"Cancel"}
                BgcolorCancle={'bg-[#CCD9E6] text-[#262626]'}
                SecondOnClick={data}
            />
        </div>
    )
}
