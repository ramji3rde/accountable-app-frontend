import { useRouter } from 'next/router'
import React from 'react'


function DefultScreenMap({ Title, ButtonTitle, ButtonUrl }) {

    const router = useRouter();

    return (
        <div className=' absolute top-0 left-0 -z-50 w-full h-screen bg-[#f4f5f7] grid  items-center '>

            <div className=' grid justify-items-center text-center '>
                <p className='font-normal text-[16px] not-italic text-[#262626] pb-5 px-4 '>{Title}</p>
                {/* button */}
                {ButtonTitle &&
                    <div className="w-[100%] flex justify-center ">
                        {ButtonUrl &&
                            <div
                                onClick={() => { ButtonUrl && router.push(ButtonUrl) }}
                                className="py-[12px] mx-auto flex text-[16px] px-[14px]  font-normal not-italic justify-center  text-[#262626] bg-[#F2DA31]  
                                  h-[45px] w-[145px]  rounded-[6px] hover:bg-[#F2DA31] shadow-[0px_0px_30px_0px_rgba(0,0,0,0.2)] gap-[2px]">
                                <span className="flex gap-2  items-center">
                                    <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M7.44488 2.29444L2.89488 6.83333C2.76374 7.00195 2.54755 7.08044 2.33878 7.03524C2.13001 6.99004 1.96564 6.82915 1.916 6.62139C1.86635 6.41364 1.94021 6.19581 2.10599 6.06111L8.00043 0.166664L13.8893 6.05C14.0781 6.27042 14.0654 6.59899 13.8602 6.8042C13.655 7.0094 13.3264 7.0221 13.106 6.83333L8.55599 2.29444V13.7667C8.55599 14.0735 8.30726 14.3222 8.00043 14.3222C7.69361 14.3222 7.44488 14.0735 7.44488 13.7667V2.29444ZM0.222656 16.2778C0.222656 15.9709 0.471387 15.7222 0.778212 15.7222H15.2227C15.5295 15.7222 15.7782 15.9709 15.7782 16.2778C15.7782 16.5846 15.5295 16.8333 15.2227 16.8333H0.778212C0.471387 16.8333 0.222656 16.5846 0.222656 16.2778Z" fill="#262626" />
                                    </svg>
                                    {ButtonTitle}</span>
                            </div>}
                    </div>}
            </div>
        </div>
    )
}

export default DefultScreenMap