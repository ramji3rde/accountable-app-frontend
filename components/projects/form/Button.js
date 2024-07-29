import Link from 'next/link';

function Button(props) {

    function bgColor() {
        if (props?.bg) {
            return (props?.bg)
        } else {
            return ('bg-yellow-400 ')
        }
    }

    function color() {
        if (props?.color) {
            return (props?.color)
        } else {
            return ('text-black')
        }
    }


    return (
        <div
            onClick={props.href} className='shadow-[0_0px_30px_0px_#00000033] h-[45px] rounded-[6px]'>
            <div
                className={
                    bgColor() + color()
                    + ` ${props.boxShadow && ' ' + props.boxShadow}  flex gap-1 justify-center items-center rounded-[6px] h-[45px]  py-3 px-[14px]  hover:border-theme`}>
                <h1 className='text-[16px] font-normal  not-italic text-[#262626]'>{props?.name}</h1>
            </div>
        </div >
    )
}

export default Button