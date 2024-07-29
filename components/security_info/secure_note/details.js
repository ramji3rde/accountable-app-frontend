import { useState, useEffect } from 'react'
import { format } from 'date-fns'
import { BsEye, BsEyeSlash } from 'react-icons/bs'
import Loader from "../../public-com/loader"
import { CopyToClipboard } from 'react-copy-to-clipboard';
import toast from 'react-hot-toast'
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';



function SecureNotesDetailComponent() {

    const [showpassword, setShowpassword] = useState(false)

    const router = useRouter();


    const item = useSelector((state) => state?.secureNotesDetails?.secureNotesDetails?.data)

    const itemData = useSelector((state) => state?.secureNotesDetails?.secureNotesDetails)


    const loading = useSelector((state) => state?.secureNotesDetails?.loading)

    useEffect(() => {
        if (itemData == null && !item) {
            router.push('/security_info/secure_notes')
        }
    }, [itemData, item])





    return (
        <div>
            {loading ? <Loader /> : (
                <div className='pb-[80px] '>
                    <div className="grid w-full pt-4 px-4">
                        <div className="flex w-full items-center" key={item}>
                            <div className="w-[100%] grid">

                                <div className="flex items-center gap-2 ">

                                    <h1 className=" font-[400] text-[16px] not-italic text-[#262626]">
                                        {item?.item_name}
                                    </h1>
                                </div>

                                <div className="flex gap-2 items-center">

                                    <span className="text-[11px] border-set font-sans text-[#262626] bg-[#FFFFFF] font-normal ">
                                        {item?.group?.length > 0 ? item?.group : '--'}
                                    </span>

                                </div>
                            </div>

                            <div className="grid justify-end items-center gap-5">

                                <h1 className="text-base font-[400] text-[#262626] text-[16px]">
                                    {item?.type == 'Login Notes' ? 'LOGIN' : 'NOTES'}
                                </h1>

                            </div>
                        </div>
                    </div>
                    {item?.type == 'Login Notes' &&
                        <div>

                            {/* link */}
                            <div className=" gap-2 w-full px-4 py-2 ">
                                <span className="text-[11px] font-sans text-[#595959] font-normal capitalize ">
                                    {`Username`}
                                </span>
                                <div className='flex gap-2'>
                                    <div className='w-[70%] grid overflow-hidden '>
                                        <span className="w-[70%] font-[400] text-[#262626] text-[16px]">
                                            {item?.username}
                                        </span>
                                    </div>
                                    <div className='w-[30%] grid justify-end items-center'>
                                        <div className='flex gap-5 '>

                                            <CopyToClipboard
                                                text={item?.username && item?.username}
                                                onCopy={() => {
                                                    { item?.username && toast.success('Username copied to clipboard') }

                                                }} >
                                                <div className='w-[10%]  grid justify-center items-center'>
                                                    <svg width="16" className='text-[25px]'
                                                        height="19" viewBox="0 0 16 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path fillRule="evenodd" className='!fill-[#737373]' clipRule="evenodd" d="M11.6111 0.611115C12.0713 0.611115 12.4444 0.984211 12.4444 1.44445V1.72223L1.33328 1.72223L1.33328 15.6111H1.0555C0.595264 15.6111 0.222168 15.238 0.222168 14.7778L0.222168 1.44445C0.222168 0.984211 0.595264 0.611115 1.0555 0.611115L11.6111 0.611115ZM14.3888 3.38889L3.83328 3.38889C3.37304 3.38889 2.99995 3.76199 2.99995 4.22223L2.99995 17.5556C2.99995 18.0158 3.37304 18.3889 3.83328 18.3889H14.3888C14.8491 18.3889 15.2222 18.0158 15.2222 17.5556L15.2222 4.22223C15.2222 3.76199 14.8491 3.38889 14.3888 3.38889ZM14.1111 17.2778H4.11106L4.11106 4.5L14.1111 4.5L14.1111 17.2778Z" fill="#262626" />
                                                    </svg>

                                                </div>

                                            </CopyToClipboard>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* link */}
                            <div className=" gap-2 w-full px-4 py-2 ">
                                <span className="text-[11px] font-sans text-[#595959] font-normal capitalize ">
                                    Password
                                </span>
                                <div className='flex gap-2'>
                                    <div className='w-[70%] '>
                                        <input
                                            value={item?.password || ''}
                                            type={showpassword ? 'text' : 'password'}
                                            readOnly
                                            className="font-[400] focus:outline-none bg-transparent w-full text-[#262626] text-[16px]" />
                                    </div>
                                    <div className='w-[30%] grid justify-end items-center'>
                                        <div className='flex gap-5 '>
                                            {showpassword ? <BsEyeSlash className='text-[20px] !fill-[#737373]' onClick={() => setShowpassword(false)} />
                                                : <BsEye className='text-[20px] !fill-[#737373]' onClick={() => setShowpassword(true)} />}

                                            <CopyToClipboard
                                                text={item?.password && item?.password}
                                                onCopy={() => {
                                                    { item?.password && toast.success('Password copied to clipboard') }

                                                }} >
                                                <div className='w-[10%]  grid justify-center items-center'>
                                                    {/* <IoClipboardOutline /> */}
                                                    <svg width="16" className='text-[25px]'
                                                        height="19" viewBox="0 0 16 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path fillRule="evenodd" className='!fill-[#737373]' clipRule="evenodd" d="M11.6111 0.611115C12.0713 0.611115 12.4444 0.984211 12.4444 1.44445V1.72223L1.33328 1.72223L1.33328 15.6111H1.0555C0.595264 15.6111 0.222168 15.238 0.222168 14.7778L0.222168 1.44445C0.222168 0.984211 0.595264 0.611115 1.0555 0.611115L11.6111 0.611115ZM14.3888 3.38889L3.83328 3.38889C3.37304 3.38889 2.99995 3.76199 2.99995 4.22223L2.99995 17.5556C2.99995 18.0158 3.37304 18.3889 3.83328 18.3889H14.3888C14.8491 18.3889 15.2222 18.0158 15.2222 17.5556L15.2222 4.22223C15.2222 3.76199 14.8491 3.38889 14.3888 3.38889ZM14.1111 17.2778H4.11106L4.11106 4.5L14.1111 4.5L14.1111 17.2778Z" fill="#262626" />
                                                    </svg>

                                                </div>

                                            </CopyToClipboard>
                                        </div>
                                    </div>

                                </div>
                            </div>

                            {/* link */}
                            <div className=" gap-2 w-full px-4 py-2 ">
                                <span className="text-[11px] font-sans text-[#595959] font-normal capitalize ">
                                    {`URI (Link to account)`}
                                </span>


                                <div className='flex gap-2'>
                                    <div className='w-[80%] grid overflow-hidden '>
                                        <span className="break-all font-[400] text-[#262626] text-[16px]">
                                            {item?.account_url}
                                        </span>
                                    </div>
                                    <div className='w-[30%] grid justify-end items-center'>
                                        <div className='flex gap-5 '>

                                            <Link target='_blank' rel="noreferrer"
                                                href={item?.account_url && (item?.account_url.startsWith("https://") || item?.account_url.startsWith("http://")) ?
                                                    item?.account_url : 'http://' + item?.account_url}>
                                                <a target='_blank'>
                                                    <div >
                                                        <svg width="36" className='w-[25px]' height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path fillRule="evenodd" clipRule="evenodd" d="M18 3C18 2.44772 18.4477 2 19 2H34V17C34 17.5523 33.5523 18 33 18C32.4477 18 32 17.5523 32 17V5.41L18.15 19.26C17.9056 19.5454 17.5219 19.6697 17.1566 19.5818C16.7913 19.4939 16.5061 19.2087 16.4182 18.8434C16.3303 18.4781 16.4546 18.0944 16.74 17.85L30.59 4H19C18.4477 4 18 3.55228 18 3ZM6 32H28C29.1046 32 30 31.1046 30 30V20H28V30H6V8H16V6H6C4.89543 6 4 6.89543 4 8V30C4 31.1046 4.89543 32 6 32Z" fill="#737373" />
                                                        </svg>
                                                    </div>
                                                </a>
                                            </Link>


                                            <CopyToClipboard
                                                text={item?.account_url && item?.account_url}
                                                onCopy={() => {
                                                    { item?.account_url && toast.success('URL copied to clipboard') }

                                                }} >
                                                <div className='w-[10%]  grid justify-center items-center'>
                                                    {/* <IoClipboardOutline /> */}
                                                    <svg width="16" className='text-[25px]'
                                                        height="19" viewBox="0 0 16 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path fillRule="evenodd" className='!fill-[#737373]' clipRule="evenodd" d="M11.6111 0.611115C12.0713 0.611115 12.4444 0.984211 12.4444 1.44445V1.72223L1.33328 1.72223L1.33328 15.6111H1.0555C0.595264 15.6111 0.222168 15.238 0.222168 14.7778L0.222168 1.44445C0.222168 0.984211 0.595264 0.611115 1.0555 0.611115L11.6111 0.611115ZM14.3888 3.38889L3.83328 3.38889C3.37304 3.38889 2.99995 3.76199 2.99995 4.22223L2.99995 17.5556C2.99995 18.0158 3.37304 18.3889 3.83328 18.3889H14.3888C14.8491 18.3889 15.2222 18.0158 15.2222 17.5556L15.2222 4.22223C15.2222 3.76199 14.8491 3.38889 14.3888 3.38889ZM14.1111 17.2778H4.11106L4.11106 4.5L14.1111 4.5L14.1111 17.2778Z" fill="#262626" />
                                                    </svg>

                                                </div>

                                            </CopyToClipboard>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    }


                    <div className='px-4'>
                        <div className="py-2">
                            <span className="text-[20px] font-normal Oswald-font  text-[#262626]">Notes</span>
                            <hr className="my-1 border-t-2" />
                        </div>

                        <div className="grid grid-cols-1 gap-2  mb-[15px]">
                            {item?.notes.length > 0 ?
                                item?.notes.map((item, index) => (
                                    <div key={index}>

                                        <div className=" ">
                                            <div className='grid gap-[5px] items-center mt-2'>
                                                {item?.created_date && <span className="text-[11px] font-sans text-[#595959] font-normal capitalize ">
                                                    {item?.created_date && format(
                                                        new Date(item?.created_date),
                                                        'dd-MM-yyyy')}
                                                </span>}

                                                {item?.note && <span className="text-[16px] px-[02px] rounded-[4px] 
                                         font-sans text-[#000] font-normal capitalize ">
                                                    {item?.note}
                                                </span>}
                                            </div>
                                        </div>
                                    </div>
                                ))
                                :

                                <div>
                                    <div className=" ">
                                        <div className='grid items-center'>
                                            <span className="text-[16px] rounded-[4px] 
                                         font-sans text-[#000] font-normal capitalize ">
                                                No replies sent
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>

                    </div>



                </div>

            )
            }



        </div >
    )
}

export default SecureNotesDetailComponent