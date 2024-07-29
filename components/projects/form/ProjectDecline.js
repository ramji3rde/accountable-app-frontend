import React from 'react'
import toast from 'react-hot-toast'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'

function ProjectDecline(props) {
   const router = useRouter()

   return (
      <div className={props.datashow}>
         <div
            style={{ transition: '.5s' }}
            className="ProjectDecline h-screen bg-[#22222238] w-full fixed z-[100] top-0 left-0 overflow-hidden"
         >
            <div className="">
               <div className="absolute w-[80%]  top-[30%] left-[10%] mx-auto bg-white rounded-[10px]">
                  <div className="text-black text-center px-4 py-8">
                     <p className="text-sm text-gray-500">
                        Are you sure you want to decline? This will let the
                        property manager know you are not interested in this
                        project.
                     </p>
                     <div className="flex justify-center">
                        <div
                           onClick={props.firstClick}
                           className="bg-white w-[50%] py-2 flex justify-center"
                        >
                           <div className=" py-2 w-[100%] mx-auto flex justify-center text-red-600 
                                    rounded-[10px] ">
                              <span className="">Yes, Decline</span>
                           </div>
                        </div>

                        <div
                           onClick={props.onClicked}
                           className=" bg-white w-[50%]  py-2 flex justify-center"
                        >
                           <div
                              className=" py-2 w-[100%] mx-auto flex justify-center text-blue-600 
                                    rounded-[10px] "
                           >
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

export default ProjectDecline
