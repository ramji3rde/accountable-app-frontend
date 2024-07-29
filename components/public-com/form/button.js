import React from 'react';


function Button({ OnClick, lebal, bgcolor, textColor, Type, addOnClass }) {

    return (
        <div className={`grid grid-cols-1 ${bgcolor ? bgcolor : "bg-buttonColor"} rounded-[6px] h-[45px]  `}>
            <button onClick={OnClick} type={Type ? Type : null}
                className={` ${textColor ? `text-[${textColor}]` : "text-blackC"} ${addOnClass && addOnClass}  w-full  h-[45px] focus:outline-none  text-[16px] font-sans font-normal`}>
                {lebal}
            </button>
        </div>
    )
}

export default Button;


