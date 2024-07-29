function Input(props) {

    return (
        <input
            name={props?.name}
            id={props?.name}
            type={props?.type}
            placeholder={props?.placeholder}
            onChange={props?.formik.handleChange}
            value={props.formik.values[`${props.name}`]}
            className={`${props?.validation ? ' border-red-500 focus:border-red-500' : 'border-[#cfcfcf8f] focus:border-black '} " mt-1 font-color font-normal w-full text-[16px] h-[35px] py-[10px] 
            px-[10px] rounded-[5px] bg-[#FFF] ext-[#000] border-2 focus:outline-none "`} />
    )
}

export default Input;


