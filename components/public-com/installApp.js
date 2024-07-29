import React, { useState } from "react";
import { AiOutlineCloudDownload } from "react-icons/ai";
import useWebInstallPrompt from "../../pwahook/useWebInstallPrompt";
import useIosInstallPrompt from "../../pwahook/useIosInstallPrompt";

function InstallAPPSMI({ showPopup }) {

    const [iosInstallPrompt, handleIOSInstallDeclined] = useIosInstallPrompt();
    const [webInstallPrompt, handleWebInstallDeclined, handleWebInstallAccepted] = useWebInstallPrompt();

    if (!iosInstallPrompt && !webInstallPrompt) {
        return null;
    }


    return (
        <div className={showPopup == true ? 'block' : 'hidden'}>
            <div style={{ transition: '.5s', }} className='DeletePopup h-screen bg-[#22222238] w-full fixed z-[100] top-0 left-0 overflow-hidden'>

                <div className="">

                    <div className="absolute w-[80%]  top-[30%] left-[10%] mx-auto bg-white rounded-[10px]">
                        <div className="text-black text-center pt-6">

                            {iosInstallPrompt && (
                                <>
                                    <div className=' flex items-center justify-center text-blue-500 '>
                                        <AiOutlineCloudDownload className='h-[40px] w-[40px] mb-4' />
                                    </div>
                                    <p className="text-[16px] text-[#262626] font-normal px-4 pb-4">
                                        tap then &quot;Add to Home Screen&quot;</p>
                                    <div className="flex justify-center my-4">
                                        <div
                                            onClick={handleIOSInstallDeclined}
                                            className=" bg-[#CCD9E6] w-[50%]  py-1 flex justify-center rounded-[10px]">
                                            <div className=" py-2 mx-auto w-full flex justify-center cursor-pointer
                                    rounded-[10px] ">
                                                <span className="text-[16px] font-normal text-[#262626]">Close</span>
                                            </div>
                                        </div>

                                    </div>
                                </>
                            )}

                            {webInstallPrompt && (
                                <>
                                    <div className=' flex items-center justify-center text-blue-500 '>
                                        <AiOutlineCloudDownload className='h-[40px] w-[40px] mb-4' />
                                    </div>
                                    <p className="text-[16px] text-[#262626] font-normal px-4 pb-4">
                                        Install Now App</p>

                                    <div className="flex justify-center">
                                        <div
                                            onClick={handleWebInstallAccepted}
                                            className="bg-blue-500 w-[50%] py-2 flex justify-center rounded-bl-[10px]">
                                            <div className=" py-2 w-[100%] mx-auto flex justify-center text-white ">
                                                <span className="text-[16px] font-normal cursor-pointer">Install Now</span>
                                            </div>
                                        </div>

                                        <div
                                            onClick={handleWebInstallDeclined}
                                            className=" bg-[#CCD9E6] w-[50%]  py-2 flex justify-center rounded-br-[10px]">
                                            <div className=" py-2 mx-auto w-full flex justify-center cursor-pointer
                                    rounded-[10px] ">
                                                <span className="text-[16px] font-normal text-[#262626]">No, Go Back</span>
                                            </div>
                                        </div>

                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default InstallAPPSMI;

