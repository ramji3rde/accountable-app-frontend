import React, { useState, useEffect } from 'react'
import { useFormik } from 'formik'
import Link from 'next/link';
import toast from 'react-hot-toast'
import SubHeader from '../../../components/public-com/header'
import Input from '../../../components/public-com/form/Input';
import Select from '../../../components/public-com/form/Select';
import AddNotes from '../../../components/tenants/details/addnotes';
import DeleteNotesPopup from '../../../components/tenants/details/deleteNotesPopup';
import EditNotesPopup from '../../../components/tenants/details/editNotesPopup';
import { craeteEmergencyContactAPI, updateEmergencyContactAPI, createNoteAPI, deleteNoteAPI } from '../../../redux/APIS/API';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import PhoneInput from '../../../components/public-com/form/phoneInput';
import { useDispatch } from 'react-redux';
import { getSingleEmergencyContact } from '../../../redux/action/emergency_contact_detail';


function EmergencyContactsForm() {

    const [submitLoader, setSubmitLoader] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [deleteNoteID, setDeleteNoteID] = useState(false)
    const [deleteNoteType, setDeleteNoteType] = useState(false)
    const [showNotesDeletePopup, setShowNotesDeletePopup] = useState(false)
    const [showEditNotesPopup, setShowEditNotesPopup] = useState(false)
    const [notesApi, setNotesApi] = useState([])
    const [detail, setDetail] = useState(false)
    const [index, setIndex] = useState(false)


    const router = useRouter();

    const editEmergency = useSelector((state) => state?.emergencyDetails?.emergencyDetails?.data)

    const EmergencyEditMode = router.query.edit

    const dispatch = useDispatch()

    useEffect(() => {

        if (editEmergency == null) {

            router.push('/security_info/emergency_contacts/form')

        } else if (EmergencyEditMode) {

            setNotesApi([...editEmergency?.notes])

        } else {
            router.push('/security_info/emergency_contacts/form')
        }

    }, [editEmergency])


    // formik form handling
    const EmergencyContactsFormik = useFormik({
        initialValues: {
            item_name: editEmergency?.item_name && EmergencyEditMode ? editEmergency?.item_name : '',
            title: editEmergency?.title && EmergencyEditMode ? editEmergency?.title : '',
            service: editEmergency?.service && EmergencyEditMode ? editEmergency?.service : '',
            street_address: editEmergency?.street_address && EmergencyEditMode ? editEmergency?.street_address : '',
            street_address_2: editEmergency?.street_address_2 && EmergencyEditMode ? editEmergency?.street_address_2 : '',
            city: editEmergency?.city && EmergencyEditMode ? editEmergency?.city : '',
            state: editEmergency?.state && EmergencyEditMode ? editEmergency?.state : '',
            zip_code: editEmergency?.zip_code && EmergencyEditMode ? editEmergency?.zip_code : '',
            primary_phone: editEmergency?.primary_phone && EmergencyEditMode ? editEmergency?.primary_phone : '',
            primary_phone_type: editEmergency?.primary_phone_type && EmergencyEditMode ? editEmergency?.primary_phone_type : 'Mobile',
            secondary_phone: editEmergency?.secondary_phone && EmergencyEditMode ? editEmergency?.secondary_phone : '',
            secondary_phone_type: editEmergency?.secondary_phone_type && EmergencyEditMode ? editEmergency?.secondary_phone_type : 'Mobile',
            primary_email: editEmergency?.primary_email && EmergencyEditMode ? editEmergency?.primary_email : '',
            secondary_email: editEmergency?.secondary_email && EmergencyEditMode ? editEmergency?.secondary_email : '',
            notes: [],
        },
        onSubmit: async (value, { resetForm }) => {
            try {

                if (EmergencyEditMode) {

                    setSubmitLoader(true)

                    value.emergencyId = editEmergency?.emergency_id

                    const res = await updateEmergencyContactAPI(value)

                    console.log(res)


                    const Notedata = {
                        post_id: '' + editEmergency?.emergency_id,
                        author: 1,
                        notes: value.notes
                    }

                    if (Notedata.notes.length > 0) {
                        const responNotes = await createNoteAPI(Notedata)
                    }


                    if (res.data.success) {

                        dispatch(getSingleEmergencyContact(editEmergency?.emergency_id))
                        toast.success("Update Emergency Contact successfully")
                        router.push('/security_info/emergency_contacts/detail')
                        resetForm()

                    } else {
                        router.push('/security_info/emergency_contacts')
                        toast.error("Emergency Contact Not Update Try Later")
                        resetForm()

                    }

                    setSubmitLoader(false)
                } else {

                    setSubmitLoader(true)

                    const res = await craeteEmergencyContactAPI(value)

                    console.log(res)

                    const EmrID = res?.data?.data?.emergency_id

                    const Notedata = {
                        post_id: '' + EmrID,
                        author: 1,
                        notes: value.notes
                    }

                    if (Notedata.notes.length > 0) {
                        const responNotes = await createNoteAPI(Notedata)
                    }


                    if (EmrID) {

                        toast.success("create Emergency Contact successfully")
                        router.push('/security_info/emergency_contacts')
                        resetForm()

                    } else {

                        toast.error("Emergency Contact Not Create Try Later")
                        resetForm()

                    }
                }

                setSubmitLoader(false)
            } catch (err) {
                console.log(err, 'err')
            }


        }
    })

    // delete notes manange functions 
    const DeleteNotes = (id, type) => {
        setDeleteNoteID(id)
        setDeleteNoteType(type)
        setShowNotesDeletePopup(true)
    }

    // local delete notes
    const deleteNotes = (indexDelete) => {
        const notes = EmergencyContactsFormik.values.notes.filter(
            (item, index) => index !== indexDelete
        )
        EmergencyContactsFormik.setFieldValue('notes', [...notes])
        toast.success('Notes deleted Successfully')
        setShowNotesDeletePopup(false)
    }



    // APIS delete notes
    const deleteNotesapi = async (id) => {
        try {
            const data = {
                note_ids: [id]
            }
            await deleteNoteAPI(data)
            const notes = notesApi.filter((item) => item.note_id !== id)
            toast.success('Notes deleted Successfully')
            setShowNotesDeletePopup(false)
            setNotesApi([...notes])
        } catch (error) { }
    }

    return (
        <div>

            <SubHeader title={EmergencyEditMode ? "Edit Contact" : "Add Contact"}
                backUrl={EmergencyEditMode ? '/security_info/emergency_contacts/detail' : '/security_info/emergency_contacts'} />

            <div className="px-4 pb-32 pt-6 ">
                <div className="grid gap-2">



                    <Input
                        Required={true}
                        label={'Name'}
                        name='item_name'
                        placeholder={'Name'}
                        formik={EmergencyContactsFormik}
                    />

                    <Input
                        label={'Title / Position'}
                        name='title'
                        placeholder={'Title / Position'}
                        formik={EmergencyContactsFormik}
                    />


                    <Input
                        label={'Type of Service'}
                        name='service'
                        placeholder={'Ex. Security Team'}
                        formik={EmergencyContactsFormik}
                    />


                    <Input
                        label={'Street Address 1'}
                        name='street_address'
                        placeholder={'Street Address 1'}
                        formik={EmergencyContactsFormik}
                    />

                    <Input
                        label={'Street Address 2'}
                        name='street_address_2'
                        placeholder={'Street Address 2'}
                        formik={EmergencyContactsFormik}
                    />

                    <div className="flex gap-2">

                        <div className='mt-1 w-[40%]'>

                            <Input
                                label={'City '}
                                name={'city'}
                                placeholder={'City'}
                                formik={EmergencyContactsFormik}
                            />
                        </div>
                        <div className='mt-0.5 w-[20%]'>
                            <Select
                                label={'State'}
                                name={'state'}
                                formik={EmergencyContactsFormik}
                                option={[
                                    'SC',
                                    'Bldg',
                                    'Dept',
                                    'Fl',
                                    'Rm',
                                    'Ste',
                                    'Unit'
                                ]}
                            />
                        </div>
                        <div className='mt-1 w-[40%]'>

                            <Input
                                label={'Zip Code'}
                                name={'zip_code'}
                                type={'number'}
                                placeholder={'Zip Code'}
                                formik={EmergencyContactsFormik}
                            />

                        </div>
                    </div>

                    <div className="flex gap-2">
                        <div className="w-[65%]">
                            <label className="text-[12px] text-[#262626] leading-5 font-normal">
                                Primary Phone
                            </label>
                            <PhoneInput
                                name={'primary_phone'}
                                placeholder={'Primary Phone'}
                                formik={EmergencyContactsFormik}
                            />
                        </div>

                        <div className="w-[35%] mt-1">
                            <label className="text-[12px] text-[#262626] leading-5 font-normal">
                                Phone Type
                            </label>
                            <select
                                name="primary_phone_type"
                                onChange={EmergencyContactsFormik.handleChange}
                                className="font-medium w-full text-[16px] h-[35px] py-[5px] px-[5px] rounded-[6px]
                                                bg-[#FFF] border-[0.5px] border-solid border-[#A6A6A6] text-theme  focus:border-theme focus:outline-none"
                            >
                                <option value="Mobile">Mobile</option>
                                <option value="Work">Work</option>
                                <option value="Office">Office</option>
                                <option value="Work fax">Work fax</option>
                                <option value="Other">Other</option>
                                <option value="custom">Custom</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <div className="w-[65%]">
                            <label className="text-[12px] text-[#262626] leading-5 font-normal">
                                Secondary Phone
                            </label>
                            <PhoneInput
                                name={'secondary_phone'}
                                placeholder={'Primary Phone'}
                                formik={EmergencyContactsFormik}
                            />
                        </div>

                        <div className="w-[35%] mt-1">
                            <label className="text-[12px] text-[#262626] leading-5 font-normal">
                                Phone Type
                            </label>
                            <select
                                name="secondary_phone_type"
                                onChange={EmergencyContactsFormik.handleChange}
                                className="font-medium w-full text-[16px] h-[35px] py-[5px] px-[5px] rounded-[6px]
                                                bg-[#FFF] border-[0.5px] border-solid border-[#A6A6A6] text-theme  focus:border-theme focus:outline-none"
                            >
                                <option value="Mobile">Mobile</option>
                                <option value="Work">Work</option>
                                <option value="Office">Office</option>
                                <option value="Work fax">Work fax</option>
                                <option value="Other">Other</option>
                                <option value="custom">Custom</option>
                            </select>
                        </div>
                    </div>

                    <Input
                        label={'Primary Email'}
                        name='primary_email'
                        placeholder={'Primary Email'}
                        formik={EmergencyContactsFormik}
                    />

                    <Input
                        label={'Secondary Email'}
                        name='secondary_email'
                        placeholder={'Secondary Email'}
                        formik={EmergencyContactsFormik}
                    />

                </div>

                <div className="grid sm:grid-cols-2 grid-cols-1 py-0 sm:gap-[20px] gap-[10px] sm:my-[10px]">
                    <div>
                        <div className="pt-4">
                            <span className="text-[20px] font-normal Oswald-font text-[#262626]">
                                Notes
                            </span>
                            <hr className="my-1 border-t-2" />
                        </div>
                    </div>

                    <AddNotes formik={EmergencyContactsFormik} />






                    {/* local */}
                    {EmergencyContactsFormik?.values?.notes?.length > 0 &&
                        EmergencyContactsFormik?.values?.notes?.map((item, index) => (
                            <div key={index} className="flex w-full gap-[10px]">
                                <div className="w-[60%]">
                                    <span className="text-[16px] font-normal text-[#000] ">
                                        {' '}
                                        {item?.detail}
                                    </span>
                                </div>
                                <div
                                    className="w-[3.375rem]  items-center h-[20px]"
                                    onClick={() => {
                                        setShowEditNotesPopup(true)
                                        setDetail(item)
                                        setIndex(index)
                                    }}
                                >
                                    <div className="grid grid-cols-2 gap-[5px] items-center  ">
                                        <div className=' text-[#154B88] flex justify-center items-center '>
                                            {/* <MdEdit /> */}
                                            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M11.6333 0.925028L14.0916 3.38336C14.2542 3.5446 14.3461 3.7639 14.3468 3.99291C14.3476 4.22193 14.2573 4.44185 14.0958 4.60419L12.7291 5.97086L9.04993 2.29169L10.4166 0.925028C10.7531 0.590258 11.2968 0.590258 11.6333 0.925028ZM0.966596 13L1.75826 9.58336L8.33326 3.00003L12.0166 6.67503L5.4166 13.25L1.9791 14.0417C1.91953 14.0477 1.8595 14.0477 1.79993 14.0417C1.54101 14.0401 1.29662 13.9218 1.13487 13.7196C0.973121 13.5174 0.911286 13.253 0.966596 13Z" fill="#154B88" />
                                            </svg>
                                        </div>
                                        <div className='text-[12px] items-center leading-5 not-italic font-bold text-[#154B88]'>
                                            Edit
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className="text-center"
                                    onClick={() =>
                                        DeleteNotes(index, 'deleteNotes')
                                    }
                                >
                                    <div className="grid grid-cols-3 gap-[5px] items-center  justify-center  w-[4.375rem] h-[20px]">
                                        <div className=' text-[#D64F52]  items-center flex justify-center'>
                                            <svg width="13" height="14" viewBox="0 0 13 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M8.58341 1.58337L11.8042 1.58337C12.0344 1.58337 12.2209 1.76992 12.2209 2.00004C12.2209 2.23016 12.0344 2.41671 11.8042 2.41671L1.08341 2.41671C0.853296 2.41671 0.666748 2.23016 0.666748 2.00004C0.666748 1.76992 0.853296 1.58337 1.08341 1.58337L4.41675 1.58337V1.16671C4.4146 0.737142 4.73933 0.376326 5.16675 0.333374L7.75008 0.333374C8.21032 0.333374 8.58341 0.70647 8.58341 1.16671V1.58337ZM1.50008 12.4167L1.50008 3.25004L11.5001 3.25004L11.5001 12.4167C11.5079 12.7441 11.3839 13.0609 11.1559 13.2959C10.9279 13.531 10.615 13.6646 10.2876 13.6667L2.69175 13.6667C2.36793 13.6591 2.06043 13.5231 1.83693 13.2886C1.61343 13.0542 1.49225 12.7405 1.50008 12.4167ZM5.25008 11.5834H4.41675L4.41675 5.33337H5.25008L5.25008 11.5834ZM7.75008 11.5834H8.58341L8.58341 5.33337H7.75008L7.75008 11.5834Z" fill="#D64F52" />
                                            </svg>
                                        </div>
                                        <div className='justify-center col-span-2 grid col-start-2 text-[12px] items-center leading-5 not-italic font-bold text-[#D64F52]'>
                                            Delete
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}


                    {/* local */}
                    {notesApi?.length > 0 &&
                        notesApi?.map((item, index) => (
                            <div key={index} className="flex w-full gap-[10px]">
                                <div className="w-[60%]">
                                    <span className="text-[16px] font-normal text-[#000] ">
                                        {' '}
                                        {item?.note}
                                    </span>
                                </div>
                                <div
                                    className="w-[3.375rem]  items-center h-[20px]"
                                    onClick={() => {
                                        setShowEditNotesPopup(true)
                                        setDetail(item)
                                        setIndex(index)
                                    }}
                                >
                                    <div className="grid grid-cols-2 gap-[5px] items-center  ">
                                        <div className=' text-[#154B88] flex justify-center items-center '>
                                            {/* <MdEdit /> */}
                                            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M11.6333 0.925028L14.0916 3.38336C14.2542 3.5446 14.3461 3.7639 14.3468 3.99291C14.3476 4.22193 14.2573 4.44185 14.0958 4.60419L12.7291 5.97086L9.04993 2.29169L10.4166 0.925028C10.7531 0.590258 11.2968 0.590258 11.6333 0.925028ZM0.966596 13L1.75826 9.58336L8.33326 3.00003L12.0166 6.67503L5.4166 13.25L1.9791 14.0417C1.91953 14.0477 1.8595 14.0477 1.79993 14.0417C1.54101 14.0401 1.29662 13.9218 1.13487 13.7196C0.973121 13.5174 0.911286 13.253 0.966596 13Z" fill="#154B88" />
                                            </svg>
                                        </div>
                                        <div className='text-[12px] items-center leading-5 not-italic font-bold text-[#154B88]'>
                                            Edit
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className="text-center"
                                    onClick={() =>
                                        DeleteNotes(item.note_id, 'deleteNotesapi')
                                    }
                                >
                                    <div className="grid grid-cols-3 gap-[5px] items-center  justify-center  w-[4.375rem] h-[20px]">
                                        <div className=' text-[#D64F52]  items-center flex justify-center'>
                                            <svg width="13" height="14" viewBox="0 0 13 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M8.58341 1.58337L11.8042 1.58337C12.0344 1.58337 12.2209 1.76992 12.2209 2.00004C12.2209 2.23016 12.0344 2.41671 11.8042 2.41671L1.08341 2.41671C0.853296 2.41671 0.666748 2.23016 0.666748 2.00004C0.666748 1.76992 0.853296 1.58337 1.08341 1.58337L4.41675 1.58337V1.16671C4.4146 0.737142 4.73933 0.376326 5.16675 0.333374L7.75008 0.333374C8.21032 0.333374 8.58341 0.70647 8.58341 1.16671V1.58337ZM1.50008 12.4167L1.50008 3.25004L11.5001 3.25004L11.5001 12.4167C11.5079 12.7441 11.3839 13.0609 11.1559 13.2959C10.9279 13.531 10.615 13.6646 10.2876 13.6667L2.69175 13.6667C2.36793 13.6591 2.06043 13.5231 1.83693 13.2886C1.61343 13.0542 1.49225 12.7405 1.50008 12.4167ZM5.25008 11.5834H4.41675L4.41675 5.33337H5.25008L5.25008 11.5834ZM7.75008 11.5834H8.58341L8.58341 5.33337H7.75008L7.75008 11.5834Z" fill="#D64F52" />
                                            </svg>
                                        </div>
                                        <div className='justify-center col-span-2 grid col-start-2 text-[12px] items-center leading-5 not-italic font-bold text-[#D64F52]'>
                                            Delete
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}


                    {showEditNotesPopup && (
                        <EditNotesPopup
                            datashow={showEditNotesPopup ? 'block' : 'hidden'}
                            onClick={() => setShowEditNotesPopup(false)}
                            formik={EmergencyContactsFormik}
                            detail={detail}
                            index={index}
                            EditId={editEmergency?.emergency_id}
                            clientName={'emergency'}
                        />
                    )}

                    {showNotesDeletePopup &&
                        <DeleteNotesPopup
                            deleteNote={() => {
                                if (deleteNoteType === 'deleteNotes') {
                                    deleteNotes(deleteNoteID)
                                } else {
                                    deleteNotesapi(deleteNoteID)
                                }
                            }}
                            datashow={showNotesDeletePopup ? 'block' : 'hidden'}
                            onClicked={() => setShowNotesDeletePopup(false)}
                        />}




                </div>



            </div>

            <div className="fixed bottom-0 left-0 w-full shadow-[1px_-10px_13px_2px_#0000000d] ">
                <div className="grid grid-cols-2 w-full bg-[#fff] ">
                    {submitLoader ? (
                        <span className="px-4 py-2 w-full mx-auto text-[22px] font-normal text-[#262626]
                            bg-[#4DE060] h-[70px] grid justify-center items-center " >
                            <div className="animate-spin inline-block  w-[25px] h-[25px] rounded-full border-[2px] border-r-white
                               border-l-[#ffffff75] border-y-[#ffffff75] " >
                            </div>
                        </span>
                    ) : (
                        <div className="flex justify-center">
                            <div className="w-full flex justify-center h-[70px] ">
                                <button
                                    type="submit"
                                    onClick={() => EmergencyContactsFormik.handleSubmit()}
                                    className="px-4 py-2 w-full mx-auto text-[22px] font-normal text-[#262626] bg-[#4DE060]"
                                >{EmergencyEditMode ? "Update" : "Save"}</button>
                            </div>
                        </div>
                    )}


                    <Link href={EmergencyEditMode ? '/security_info/emergency_contacts/detail' : '/security_info/emergency_contacts'}>
                        <div className="flex justify-center items-center bg-[#CCD9E6]">
                            <div className="px-4 py-2 mx-auto w-full flex justify-center  text-[22px] font-normal text-[#262626]">
                                <span className="">Cancel</span>
                            </div>
                        </div>
                    </Link>


                </div>
            </div>


        </div>
    )
}

export default EmergencyContactsForm;