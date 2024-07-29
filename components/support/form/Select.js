import { Fragment } from "react";




function Select(props) {
    return (
        <select
            name={props?.name}
            id={props?.name}
            onChange={props?.setOption ? props?.setOption : props?.formik.handleChange}
            value={props?.setValue ? props?.setValue : props?.formik.values[`${props.name}`]}
            className=" w-full text-[14px] font-normal py-[5px] px-[5px] rounded-[5px] mt-1
            bg-[#FFF] border-[#cfcfcf8f] h-[35px]  text-theme border-2 focus:border-theme focus:outline-none"
        >
            {props?.option.map((item, index) =>
                <Fragment key={index}>
                    <option value={item}>{item}</option>
                </Fragment>
            )}
        </select>
    )


}

export default Select;