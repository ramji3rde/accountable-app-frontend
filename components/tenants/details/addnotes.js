import React, { useState, useEffect } from 'react'
import { useFormik } from 'formik'

export default function AddNotes(props) {
   const [showNotes, setShowNotes] = useState(false)

   const NoteFormik = useFormik({
      initialValues: {
         detail: ''
      },
      onSubmit: async (values, { resetForm }) => {
         try {

            props.formik.setFieldValue('notes', [
               ...props.formik.values.notes,
               values
            ])

            resetForm()

            setShowNotes(false)
         } catch (error) {
            console.log(error)
         }
      }
   })

   useEffect(() => {
      return () => {
         NoteFormik.resetForm()
      }
   }, [])

   return (
      <div>
         <div className="flex justify-end items-center mb-[10px]">
            <div className="w-[50%] flex justify-center ">
               <div
                  onClick={() => setShowNotes(true)}
                  className="w-[100%] py-[12px] px-[14px] h-[45px]  mx-auto flex text-[16px] font-normal justify-center text-[#262626] bg-[#F2DA31] 
                                    rounded-[6px] hover:bg-[#F2DA31] hover:text-white shadow-[0_0px_30px_0px_#00000033]"
               >
                  <span className="flex gap-2">
                  <img src={'/bottom-icon/plus-icon.svg'} alt='plus-icon-active'  className='h-[14.44px] w-[14.44px] mt-1'/>
                      Add Notes</span>
               </div>
            </div>
         </div>

         <div className={showNotes ? 'block' : 'hidden'}>
            <div className="h-screen transition-all bg-[#22222238] w-full fixed z-[100] top-0 left-0 overflow-hidden backdrop-blur-[1px]">
               <div className="">
                  <div className="absolute w-[80%] top-[22%] left-[10%] mx-auto bg-white rounded-[10px]">
                     <div className="text-black  pt-8">
                        <div className="grid grid-cols-1 mx-4 ">
                           <div className="">
                              <span className="text-[20px] font-normal text-[#262626] Oswald-font ">Add Notes</span>
                           </div>
                           <hr className='bg-[#DEDEDE] mb-3 ' />
                           <textarea
                              rows="6"
                              placeholder="Enter Your Details"
                              name="detail"
                              id="detail"
                              onChange={NoteFormik.handleChange}
                              value={NoteFormik.values.detail}
                              className="font-normal w-full text-[16px] py-[5px] px-[10px] rounded-[6px] h-[70px]
                                     bg-[#FFF] border-[#cfcfcf8f]  text-theme border-2 focus:border-theme focus:outline-none"
                           />
                        </div>

                        <div className="flex justify-center mt-4">
                           <div
                              onClick={() => NoteFormik.handleSubmit()}
                              className="bg-[#4DE060] rounded-bl-[10px] w-[50%] flex justify-center"
                           >
                              <button
                                 type="button"
                                 className=" py-4 mx-auto w-full text-[16px] flex justify-center text-[#262626] font-normal 
                                        rounded-[10px] "
                              >
                                 Add
                              </button>
                           </div>

                           <div
                              onClick={() => {
                                 NoteFormik.handleReset()
                                 setShowNotes(false)
                              }}
                              className=" bg-[#CCD9E6] rounded-br-[10px] w-[50%]  flex justify-center"
                           >
                              <div
                                 className="py-4 w-[100%] mx-auto text-[16px] flex justify-center text-[#262626] 
                                               rounded-[10px]"
                              >
                                 <span className="">Cancel</span>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>

                  {/* </fosrm> */}
               </div>
            </div>
         </div>
      </div>
   )
}
