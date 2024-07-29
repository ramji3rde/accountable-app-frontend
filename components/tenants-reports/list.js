import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../public-com/loader'
import { IoCall } from 'react-icons/io5'
import { getTenantsUserDetails } from '../../redux/action/tenantsuserDetails'
import { format } from 'date-fns'


function List() {
   const router = useRouter()
   const dispatch = useDispatch()
   const [toggleActive, setToggleActive] = useState(false)

   const loading = useSelector((state) => state.projectsRequest.loading)
   const item = useSelector((state) => state.projectsRequest.projectsRequest.data)

   const itemNull = useSelector((state) => state?.tenantsUserDetails?.tenantsUserDetails)


   useEffect(() => {
      if (itemNull == null) {
         dispatch(getTenantsUserDetails())
      }
   }, [])

   function handleDetailspage(ID) {
      dispatch(getTenantsUserDetails({
         project_id: ID
      }))
      if (window.location.pathname.split('/')[1] === 'request_tenants') {
         router.push('/request_tenants/details')
      } else if (window.location.pathname.split('/')[1] === 'tenant') {
         router.push('/tenant/project_request/details')
      }
   }



   return (
      <div className="list">
         {loading ?
            <Loader /> :
            <div className="body">
               <div className="ListDetails  mb-20 bg-[#f4f5f7] pb-[70px] ">

                  <div className='w-[100%] flex gap items-center gap-[5px] '>





                  </div>

                  <div className='w-[30%] flex gap items-center gap-[5px] '>





                  </div>

                  {item?.map((item, index) => (
                     <div key={index}
                        className="mb-[5px] ml-[12px]">
                        <div className='flex  w-[100%] h-[66px] gap-[3px] items-center border-[#D9D9D9] border-[1px] border-r-[0px] rounded-l-lg bg-[#FFFFFF] px-2 py-4 min-w-fit'>
                           <div
                              className='w-[100%]'
                              onClick={() => handleDetailspage(item.ID)}
                           >
                              <div
                              >
                                 {item.project_name}
                              </div>
                              <div className='flex opacity-80 gap-[10px] items-center mt-2'>
                                 {item?.project_date && <span className="text-[12px] font-sans text-[#000] font-normal capitalize ">
                                    {/* {item?.project_date} */}

                                    {item?.project_date &&
                                       format(
                                          new Date(item?.project_date),
                                          'dd-MM-yyyy'
                                       )}
                                 </span>}

                                 {item?.des && <span className="text-[11px] border-[1px] px-[02px] py-[05px] rounded-[4px]  border-[#D9D9D9] font-sans text-[#000] font-normal capitalize ">
                                    {item?.project_detail}
                                 </span>}

                                 {/* {item?.status && <span
                                    className={`text-[12px] 
                                    ${item?.status === "Progress" ? 'bg-[#F2DA31]' :
                                          item?.status === 'publish' ? 'bg-[#91EC9D]' :
                                             item?.status === 'rejected' && 'bg-[#D64F52]'}
                                    font-sans text-[#000] font-normal capitalize px-1 py-0.5 rounded-[4px] `}>
                                    {item?.status}
                                 </span>} */}

                                 {item?.comment_count > '0' ? <span
                                    className={`text-[12px] 
                                    font-sans text-[#000] bg-[#91EC9D] font-normal capitalize px-1 py-0.5 rounded-[4px] `}>
                                    {'Reply Sent'}
                                 </span>
                                    :
                                    <span
                                       className={`text-[12px]
                              font-sans text-[#000] bg-[#CCD9E6] font-normal capitalize px-1 py-0.5 rounded-[4px] `}>
                                       {'No Reply Sent'}
                                    </span>
                                 }

                              </div>
                           </div>
                           {/* <div className='w-[20%]  flex justify-end items-center'>
                              <Link href={'tel:' + item.tel}>
                                 <a>
                                    <IoCall className="h-[23.16px] w-[23.65px]" />
                                 </a>
                              </Link>
                           </div> */}
                        </div>
                     </div>
                  ))}
               </div>


               {item?.length == 0 && (
                  <div className='absolute w-full h-full top-0 left-0 background-[#f8fafc] z-[-99]'>
                     <div className='w-full h-full grid justify-center items-center z-[-99]'>
                        <div className='text-center'>
                           <div>
                              <span>no data</span>
                           </div>
                        </div>
                     </div>
                  </div>
               )}
            </div>}
      </div>
   )
}
export default List;
