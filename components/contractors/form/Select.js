import { Fragment } from "react";




function Select(props) {
    return (
        <select
            name={props?.name}
            id={props?.name}
            onChange={props?.formik.handleChange}
            value={props?.formik.values[`${props.name}`]}
            className="font-medium w-full text-[12px] h-[50px] py-[10px] px-[5px] rounded-[5px]
            bg-[#FFF] border-[#cfcfcf8f]  text-theme border-2 focus:border-theme focus:outline-none"
        >
            {props?.option.map((item, index) =>
                <Fragment key={index}>
                <option value={item} disabled={item.value === 'Select Service' ? true : false} >{item}</option>
                </Fragment>
            )}
        </select>
    )


}

export default Select;