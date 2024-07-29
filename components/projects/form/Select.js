import { Fragment } from "react";




function Select(props) {
    return (
        <select
            name={props?.name}
            id={props?.name}
            onChange={props?.formik.handleChange}
            value={props?.formik.values[`${props.name}`]}
            className={props?.validation ?
                "font-medium w-full text-[15px]  py-[5px] px-[5px] rounded-[5px] bg-[#FFF] text-[#000] border-2 border-red-500 focus:border-red-500 focus:outline-none"
                :
                "font-medium w-full text-[15px]  py-[5px] px-[5px] rounded-[5px] bg-[#FFF] text-[#000] border-2 border-[#cfcfcf8f] focus:border-black focus:outline-none"
            }
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