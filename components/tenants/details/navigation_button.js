
function NavigationButton(props) {
    return (
        <div className="fixed bottom-0 left-0 w-full shadow-[1px_-10px_13px_2px_#0000000d]  " >
            <div className={props?.BtnFirst ? 'grid-cols-2 grid w-full bg-white' : "grid-cols-1 grid w-full bg-white"}>
                {props?.BtnFirst ?
                    <div onClick={props?.BtnFirstOnclick} className="flex justify-center h-[70px]">
                        <div className="px-4 py-2 w-full mx-auto  flex justify-center bg-[#154B88]">
                            <button type="submit" className="text-white text-[22px] font-normal">{props?.BtnFirst}</button>
                        </div>
                    </div>
                    : null}
                <div
                    onClick={props?.SecondOnClick}
                    className="flex justify-center  h-[70px]">
                    <div className={`${props?.BgcolorCancle ? props?.BgcolorCancle : 'bg-[#D64F52] text-white '}  px-4 py-2 w-full mx-auto flex justify-center items-center `}>
                        <span className="text-[22px] font-normal">{props?.BtnSecond}</span>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default NavigationButton;