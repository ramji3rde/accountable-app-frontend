import React from 'react'

function Loader() {
    return (
        <div className='absolute w-full h-full top-0 left-0 background-[#f8fafc] z-[-99]'>
            <div className='w-full h-[100%] grid justify-center items-center'>
                <div className='text-center'>
                    <div>
                        <div className="animate-spin inline-block w-8 h-8 rounded-full border-[0.25em] border-r-[#000]" >
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Loader