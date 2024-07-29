import { Fragment } from "react";




function Select({ name, formik, fontSize, value, validation, option, label, Required, OnChange }) {


    return (
        <div>
            {label &&
                <div className='flex gap-1 '>
                    <label className="font-normal text-[12px] font-sans mb-[3px] text-[#262626] mt-[2px]">
                        {label}
                    </label>
                    {Required && (
                        <span className="text-[#D64F52] font-bold font-sans text-[12px]">
                            {Required && '*Required'}
                        </span>
                    )}
                </div>}
            <select
                name={name}
                id={name}
                onChange={OnChange ? OnChange : formik?.handleChange}
                value={value ? value : formik?.values[`${name}`]}
                className={` ${validation ? 'border-red-500 focus:border-red-500' : 'border-inputBorderColor'} 
                    ${fontSize ? fontSize : 'text-[16px]'}
                     font-normal font-sans  w-full h-[35px] py-[5px] px-[10px]  rounded-[6px] bg-[#FFF] 
                     text-theme border-[1px] focus:border-theme focus:outline-none `}
            >
                {option?.map((item, index) =>
                    <Fragment key={index}>
                        <option value={item.value ? item.value : item.name ? item.name : item}>{item.name ? item.name : item}</option>
                    </Fragment>
                )}
            </select>

            {/* {validation && (
                <span className="text-red-500 font-normal font-sans text-[16px]">
                    {validation}
                </span>
            )} */}

        </div>
    )


}

export default Select;