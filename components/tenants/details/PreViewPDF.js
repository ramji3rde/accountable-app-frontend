import React, { useEffect } from 'react'
import { Viewer, Worker } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import '@phuocng/react-pdf-viewer/cjs/react-pdf-viewer.css';



export default function PreViewPDF({ datashow, onClick, PDFURL, Localurl }) {





   useEffect(() => {
      if (datashow) {
         document.body.classList.add('overflow-hidden');
      }
   }, [datashow])



   return (
      <div>
         <div className={datashow ? 'block' : 'hidden'}>
            <div onClick={() => {
               onClick(),
                  document.body.classList.remove('overflow-hidden');
            }}
               className="h-screen transition-all bg-[#22222238] w-full fixed z-[100] top-0 left-0 overflow-hidden backdrop-blur-[1px]">
               <div className="">
                  <div className="absolute w-[80%] top-[8%] left-[10%] mx-auto bg-white rounded-[10px]">
                     <div className="text-black  pt-2">
                        <div className="flex justify-between items-center mx-4 pb-3 ">

                           <div className="w-[40%]">
                              <span className="text-[20px] font-normal text-[#262626] Oswald-font ">Preview PDF</span>
                           </div>

                           <div className="w-[60%] flex justify-end mt-0.5 ">
                              <a href={PDFURL} target="_blank" rel="noopener noreferrer">
                                 <span className="text-[13px] rounded-[4px] font-normal text-[#fff] bg-[#075985] py-[5px] px-[10px] ">Download PDF</span>
                              </a>
                           </div>


                        </div>


                        <div className='w-full flex justify-center align-center h-auto overflow-y-auto '>

                           <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.5.207/build/pdf.worker.min.js">
                              <div id="pdfviewer"  >
                                 <Viewer fileUrl={PDFURL} />
                              </div>
                           </Worker>

                        </div>

                        <div className="flex justify-center mt-4">
                           <div
                              onClick={() => {
                                 onClick(),
                                    document.body.classList.remove('overflow-hidden');
                              }}
                              className=" bg-[#CCD9E6] rounded-b-[10px] w-[100%]  flex justify-center"
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
               </div>
            </div>
         </div>
      </div>
   )
}
