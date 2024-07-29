import { IoAdd } from "react-icons/io5";
import Link from 'next/link';




function AddNew(props) {

    function Bottom() {
        if (props?.bottom) {
            return (props?.bottom)
        } else { return 'bottom-24' }
    }
    return (
        <div className={`fixed  ${Bottom()} right-12 z-50`} >
            <Link href={props.href}>
                <a>
                    <div
                        className="flex gap-1 h-[45px] w-[121px] items-center text-[#262626] bg-[#F2DA31] border-[#F2DA31]  border-2 py-[12px] px-[14px] mx-2  
                        rounded-[6px] shadow-[0_0px_30px_0px_#00000033] hover:border-theme">

                        <IoAdd />
                        <h1>Add New</h1>

                    </div>
                </a>
            </Link>

        </div>
    )
}

export default AddNew;