import React from "react";
import { useEffect } from 'react';
import {
    IoMenu,
    IoArrowBackOutline,
} from "react-icons/io5";
import Link from 'next/link';


function Custom(props) {

    useEffect(() => {
      if(props.custom_value == 'custom'){
        props.Formik.setFieldValue(props.custom_name, '')  
      }
    
    }, [])
    

    return (
        <div className={props.datashow}>
            <div style={{transition: '.5s',}} className='Customtype h-screen bg-[#22222238] w-full fixed z-[100] top-0 left-0 overflow-hidden'>

                <div className="">

                    <div className="absolute w-[80%]  top-[30%] left-[10%] mx-auto bg-white rounded-[10px]">
                        <div className="text-black text-center px-4 py-8">
                            <input
                            name={props.custom_name}
                            onChange={props.Formik.handleChange}
                            value={props.custom_value}
                            className="font-medium w-full text-[15px] h-[45px] py-[5px] px-[10px] rounded-[5px]
                             bg-[#FFF] border-[#cfcfcf8f]  text-theme border-2 focus:border-theme focus:outline-none"
                            />

                            <div className="flex justify-center">

                                <div
                                    onClick={props.onClicked}
                                    className="bg-white w-[50%] py-2 flex justify-center">
                                    <div className=" py-2 w-[100%] mx-auto w-full flex justify-center text-green-600 
                                    rounded-[10px] ">
                                        <span className="">Add</span>
                                    </div>
                                </div>

                                <div
                                    onClick={props.onClicked}
                                    className=" bg-white w-[50%]  py-2 flex justify-center">
                                    <div className=" py-2 w-[100%] mx-auto w-full flex justify-center text-gray-500 
                                    rounded-[10px] ">
                                        <span className="">Cancel</span>
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

export default Custom;

