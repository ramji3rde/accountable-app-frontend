import React,
{ useState } from 'react';
import { BsEye, BsEyeSlash } from 'react-icons/bs'


function Input(
    {
        Onchange,
        name,
        type,
        placeholder,
        formik,
        label,
        eyeToggle,
        toggleValue,
        value,
        validation,
        disabled,
        fontSize,
        Required,
        inputHeight,
        Optional
    }) {



    return (
        <div className='w-full'>

            <div className='flex gap-1 '>
                <label className="font-normal text-[12px] font-sans mb-[3px] text-[#262626]">
                    {label}
                </label>

                {Required && (
                    <span className="text-[#D64F52] font-bold font-sans text-[12px]">
                        {Required && '*Required'}
                    </span>
                )}


                {Optional && (
                    <span className="text-[#000] font-bold font-sans text-[12px]">
                        {Optional && 'Optional'}
                    </span>
                )}
            </div>


            <div className="relative">
                <input
                    disabled={disabled}
                    // style={{ borderColor: '#cccccc9c', color : "#ccc"}}
                    name={name}
                    id={name}
                    type={toggleValue ? 'text' : !type ? 'text' : type}
                    placeholder={placeholder}
                    onChange={Onchange ? Onchange : formik?.handleChange}
                    value={value ? value : formik?.values[`${name}`]}
                    className={`  ${disabled ? '!border-[#cccccc9c] text-[#ccc]' : 'border-inputBorderColor'}
                     ${validation ? 'border-red-500 focus:border-red-500' : 'border-inputBorderColor'} 
                    ${fontSize ? fontSize : 'text-[16px]'} ${inputHeight ? inputHeight : 'h-[35px]'}
                     font-normal font-sans  w-full  py-[5px] px-[10px] rounded-[6px] bg-[#FFF] 
                     text-theme border-[1px] focus:border-theme focus:outline-none `} />

                {type === 'password' &&
                    <span
                        onClick={eyeToggle}
                        title={
                            toggleValue ? 'Show Password' : 'Hide Password'
                        }
                        className="font-mono cursor-pointer text-[1.2em] bg-white pl-2 
                                absolute right-3 bottom-2"
                    >
                        {toggleValue ? <BsEye /> : <BsEyeSlash />}
                    </span>
                }
            </div>

            {validation && (
                <span className="text-red-500 font-normal font-sans text-[16px]">
                    {validation}
                </span>
            )}
        </div>
    )
}

export default Input;



