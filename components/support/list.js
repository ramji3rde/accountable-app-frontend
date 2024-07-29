import Link from 'next/link'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../public-com/loader'
import { IoCall } from 'react-icons/io5'
import { singleSupport } from '../../redux/action/supportDetails'
import { useEffect } from 'react'



function List() {
   const router = useRouter()

   const dispatch = useDispatch()

   const Supportlist = useSelector((state) => state.support.support.data)

   const loading = useSelector((state) => state.support.loading)

   const itemNull = useSelector((state) => state?.singleSupport?.singleSupport)

   async function getSingleSupport(ID) {
      const supportID = { userId: ID }
      dispatch(singleSupport(supportID))
      router.push('/support/details')
   }


   useEffect(() => {
      if (itemNull == null) {
         dispatch(singleSupport())
      }

   }, [itemNull])




   return (
      <div className="list">
         {loading ?
            <Loader /> :
            <div className="body">
               <div className="ListDetails  mb-20 bg-[#f4f5f7] pb-[70px] ">

                  {Supportlist?.map((item, index) => (
                     <div key={index}
                        className="mb-[5px] ml-[12px]">
                        <div onClick={() => getSingleSupport(item.ID)}
                           className='flex  w-[100%] h-[66px] gap-[3px] items-center  rounded-l-lg bg-[#FFFFFF] px-4 min-w-fit'>
                           <div className='w-[100%]'>
                              <div
                              >
                                 {item?.first_name ? item.first_name + ' ' + item.last_name : item?.primary_email.split('@')[0]}
                              </div>
                              <div className='flex opacity-80 gap-[10px] items-center mt-2'>
                                 {item.primary_title && <span className="text-[11px] border-set font-sans text-[#000] font-normal capitalize ">
                                    {item.primary_title}
                                 </span>}
                              </div>
                           </div>
                           <div className='w-[20%]  flex justify-end items-center'>
                              <Link href={'tel:' + item.primary_phone}>
                                 <a>
                                    <IoCall className="h-[23.16px] w-[23.65px]" />
                                 </a>
                              </Link>
                           </div>
                        </div>
                     </div>
                  ))}
               </div>

               {Supportlist?.length == 0 && (
                  <div className='fixed w-full h-[100%] top-0 left-0 background-[#f8fafc] z-50'>
                     <div className='w-full h-[100%] grid justify-center items-center'>
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
