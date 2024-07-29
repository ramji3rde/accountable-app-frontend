import React from 'react'
import Select from '../public-com/form/Select'

export default function ContractorPop(props) {
    return (
        <div className={props.datashow}>
            <div>
                <div className="h-screen transition-all bg-[#22222238] w-full fixed z-[100] top-0 left-0 overflow-hidden backdrop-blur-[1px]">
                    <div className="">
                        <div className="absolute w-[80%] top-[22%] left-[10%] mx-auto bg-white rounded-[18px]">
                            <div className="text-black text-center ">
                                <div className="my-5 flex justify-center ">
                                    <div className="">
                                        <h1 className="text-[20px] font-normal Oswald-font text-left">Choose Contractor</h1>
                                    </div>
                                </div>

                                <div className=' mx-4'>
                                    <Select />
                                </div>

                                <div className="flex justify-center mt-5 ">
                                    <div
                                        className="bg-[#4DE060] w-[50%] flex justify-center rounded-bl-[10px]">
                                        <div

                                            className=" py-3 w-[100%] mx-auto  text-[16px] font-normal flex justify-center text-[#262626] ">
                                            <span className="">Add</span>
                                        </div>
                                    </div>

                                    <div
                                        onClick={props.onClicked}
                                        className=" bg-[#CCD9E6] w-[50%]  flex justify-center rounded-br-[10px]">
                                        <div className=" py-3 w-[100%] mx-auto text-[16px] font-normal flex justify-center text-[#262626] rounded-[10px] ">
                                            <span className="">Cancel</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    )
}
