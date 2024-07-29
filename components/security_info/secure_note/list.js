import { useRouter } from "next/router";
import Loader from "../../public-com/loader";
import { useSelector } from "react-redux";
import { getSingleSecureNotes } from "../../../redux/action/secureNoteSingle";
import { useDispatch } from "react-redux";
import { useEffect } from 'react'



function ListItem() {

    const router = useRouter();

    const dispatch = useDispatch();

    const item = useSelector((state) => state.secureNotesList.secureNotesList?.data?.result)

    const loading = useSelector((state) => state.secureNotesList.loading)
    const itemData = useSelector((state) => state?.secureNotesDetails?.secureNotesDetails)

    useEffect(() => {
        if (itemData == null) {
            dispatch(getSingleSecureNotes(item?.id))
        }
    }, [item])


    return (
        <div className="list">


            {loading ?
                <Loader /> :
                <div className="body ">
                    <div className="ListDetails mb-20 bg-[#f4f5f7] pb-[70px] ">
                        {item?.map((item, index) =>
                            <div key={index} className='mb-[5px] ml-[12px] '>
                                <div className='flex  w-[100%] h-[66px] gap-[3px] items-center  rounded-l-lg bg-[#FFFFFF] px-4 min-w-fit'>

                                    <div className="w-[100%] " >

                                        <div className="w-full "
                                            onClick={() => {
                                                dispatch(getSingleSecureNotes(item?.id))
                                                router.push('/security_info/secure_notes/detail')
                                            }}>
                                            <div className="flex overflow-hidden ">
                                                <h1 className="text-[16px] font-[400] capitalize oneLineTextlimit text-[#262626] not-italic ">
                                                    {item.title}
                                                </h1>

                                            </div>
                                            <div className="flex opacity-80 gap-[10px] items-center  mt-1">
                                                {item.group && <span className={`${item.group ? ' border-set' : ''} not-italic text-[11px]  font-sans
                                                 text-[#000] font-normal capitalize`}>{item.group}</span>}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="w-[20%]  flex justify-between items-center">
                                        <h1 className="text-[16px] font-[400] capitalize oneLineTextlimit text-[#262626] not-italic ">
                                            {item.type == "Login Notes" ? 'LOGIN' : 'NOTES'}
                                        </h1>
                                        {/* <div>
                                            {item?.company_flag === "true" && <IoFlagSharp className="text-lg  text-red-500" />}
                                        </div>
                                        <Link href={'tel:' + item.primary_phone}>
                                            <a>
                                                <IoCall className="h-[23.16px] w-[23.65px]" />
                                            </a>
                                        </Link> */}
                                    </div>
                                </div>
                                <hr />
                            </div>
                        )}

                    </div>
                    {item?.length == 0 && (
                        <div className='absolute w-full h-full top-0 left-0 bg-[#f8fafc] z-[-99]'>
                            <div className='w-full h-full grid justify-center items-center z-[-99]'>
                                <div className='text-center'>
                                    <div>
                                        <span>no data</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                </div>
            }
        </div>
    )
}

export default ListItem;

