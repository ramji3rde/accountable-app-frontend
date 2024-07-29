



function Input(props) {

    return (
        <input
            name={props?.name}
            id={props?.name}
            type={props?.type}
            placeholder={props?.placeholder}
            onChange={props?.formik.handleChange}
            value={props.formik.values[`${props.name}`]}
            className={props?.validation ?
            "font-medium w-full text-[15px]  py-[5px] px-[10px] rounded-[5px] bg-[#FFF] text-[#000] border-2 border-red-500 focus:border-red-500 focus:outline-none"
            :
            "font-medium w-full text-[15px]  py-[5px] px-[10px] rounded-[5px] bg-[#FFF] text-[#000] border-2 border-[#cfcfcf8f] focus:border-black focus:outline-none"
            }
        />
    )
}

export default Input;


