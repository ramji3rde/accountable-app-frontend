import { useRouter } from 'next/router'
import React from 'react'

function CancelComponent() {

    const router = useRouter()

    return (
        <div className="fixed bottom-0 left-0 w-full shadow-[1px_-10px_13px_2px_#0000000d]  " >
            <div className="grid-cols-1 grid w-full bg-white">

                <div onClick={() => router.back()} className="flex justify-center h-[70px]">
                    <div className="px-4 py-2 w-full mx-auto  flex justify-center bg-[#CCD9E6]">
                        <button type="submit" className="text-[#262626] text-[22px] font-normal">Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CancelComponent