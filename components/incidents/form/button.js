import React from 'react'

function button({lebal}) {
    return (
        <div>
            <div
                className="w-[100%] py-[12px] px-[14px] h-[45px]  items-center font-normal not-italic  mx-auto flex text-[16px] justify-center text-[#262626] bg-[#F2DA31] 
                                rounded-[6px] hover:bg-[#F2DA31] hover:text-white shadow-[0_0px_30px_0px_#00000033]">
                <span className="flex gap-2">
                    <img src={'/bottom-icon/plus-icon.svg'} alt='plus-icon-active' className='h-[14.44px] w-[14.44px] mt-1' />
                    {lebal}</span>
            </div>
        </div>
    )
}

export default button
