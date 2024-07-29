import React, { useState } from 'react'
import { RiDeleteBin6Line } from 'react-icons/ri'

function DeletePhotoPopup(props) {
   return (
      <div className={props.datashow}>
         <div style={{ transition: '.5s', }} className='DeletePopup h-screen bg-[#22222238] w-full fixed z-[100] top-0 left-0 overflow-hidden'>

            <div className="">

               <div className="absolute w-[80%]  top-[30%] left-[10%] mx-auto bg-white rounded-[10px]">
                  <div className="text-black text-center pt-6">
                     <div className=' flex items-center justify-center text-[#D64F52]'>
                        <RiDeleteBin6Line className='h-[40px] w-[40px] mb-4' />
                     </div>
                     <p className="text-sm text-[#262626] font-normal text-[16px] px-4 pb-4">
                        Are you sure you want to delete?
                        This will permanently delete all
                        data for this client.</p>

                     <div className="flex justify-center">
                        {props.loading ?
                           <div
                              className="bg-[#D64F52] w-[50%] py-2 flex justify-center rounded-bl-[10px]">
                              <div className=" w-[100%] mx-auto flex justify-center text-[#b6b6b619] ">
                                 <div className='h-[100%] grid justify-center items-center '>
                                    <div className='text-center'>
                                       <div>
                                          <div className="animate-spin inline-block  w-[24px] h-[24px] rounded-full border-[3px] border-[#f6b0b0] border-r-[#ffffff]" >
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </div> :
                           <div
                              onClick={props.deletePhoto}
                              className="bg-[#D64F52] w-[50%] py-2 flex justify-center rounded-bl-[10px]">
                              <div className=" py-2 w-[100%] mx-auto flex justify-center text-white ">
                                 <span className="font-normal text-[16px] ">Yes, Delete</span>
                              </div>
                           </div>
                        }
                        <div
                           onClick={props.onClicked}
                           className=" bg-gray-200 w-[50%]  py-2 flex justify-center rounded-br-[10px]">
                           <div className=" py-2 mx-auto w-full flex justify-center text-blue-600 
                                    rounded-[10px] ">
                              <span className="">No, Go Back</span>
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

export default DeletePhotoPopup
