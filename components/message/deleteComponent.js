import { useRouter } from 'next/router'
import React from 'react'

function DeleteComponent({ open }) {

    const router = useRouter()

    return (
        <div className="fixed bottom-0 left-0 w-full shadow-[1px_-10px_13px_2px_#0000000d]  " >
            <div className="grid-cols-1 grid w-full bg-white">

                <div onClick={() => open(true)} className="flex justify-center h-[70px]">
                    <div className="px-4 py-2 w-full mx-auto  flex justify-center bg-[#D64F52]">
                        <button type="submit" className="text-white text-[22px] font-normal">Delete</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeleteComponent