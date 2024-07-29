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
                "font-normal   w-full text-[16px] h-[35px] py-[9px] px-[5px] rounded-[6px] text-[#262626] bg-text-color  border-[0.5px] border-red-500 focus:border-red-500 focus:outline-none"
                :
                "font-normal w-full text-[16px] h-[35px] py-[9px] px-[5px] rounded-[6px] text-[#262626] bg-text-color border-[0.5px] border-solid border-[#A6A6A6] focus:border-black focus:outline-none"
            }
        />
    )
}

export default Input;


