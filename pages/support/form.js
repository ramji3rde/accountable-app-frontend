import React from 'react'
import { useFormik } from 'formik'
import Link from 'next/link'
import SubHeader from '../../components/public-com/header'
import Input from '../../components/public-com/form/Input'
import { useSelector } from 'react-redux'
import {
    createSupportTeamAPI,
    createNotesSupportTeamAPI,
    updateSupportTeamAPI,
    deleteNotesSupportTeamAPI
} from '../../redux/APIS/API'
import toast from 'react-hot-toast'
import { useRouter } from 'next/router'
import AddNotes from '../../components/tenants/details/addnotes'
import Customtype from '../../components/tenants/details/customtype'
import { useState, useEffect } from 'react'
import EditNotesPopup from "../../components/support/editNotespopup"
import DeleteNotesPopup from '../../components/tenants/details/deleteNotesPopup'
import { useDispatch } from 'react-redux'
import { singleSupport } from '../../redux/action/supportDetails'
import { MdEdit } from 'react-icons/md'
import { RiDeleteBin6Line } from 'react-icons/ri'
import Select from '../../components/public-com/form/Select'
import PhoneInput from '../../components/public-com/form/phoneInput'




function SupportADD_EDIT() {
    // this is working file
    const [custom, setCustom] = useState(false)
    const [showNotesPopup, setShowNotesPopup] = useState(false)
    const [showEditNotesPopup, setShowEditNotesPopup] = useState(false)
    const [deleteID, setDeleteID] = useState(true)
    const [deleteType, setDeleteType] = useState('')
    const [notesApi, setNotes] = useState([])
    const [editNote, setEditNote] = useState()
    const [index, setIndex] = useState()
    const [submitLoader, setSubmitLoader] = useState(false)


    const dispatch = useDispatch();

    let listState = [
        "AK",
        "AL",
        "AR",
        "AS",
        "AZ",
        "CA",
        "CO",
        "CT",
        "DC",
        "DE",
        "FL",
        "GA",
        "GU",
        "HI",
        "IA",
        "ID",
        "IL",
        "IN",
        "KS",
        "KY",
        "LA",
        "MA",
        "MD",
        "ME",
        "MI",
        "MN",
        "MO",
        "MS",
        "MT",
        "NC",
        "ND",
        "NE",
        "NH",
        "NJ",
        "NM",
        "NV",
        "NY",
        "OH",
        "OK",
        "OR",
        "PA",
        "PR ",
        "RI",
        "SC",
        "SD",
        "TN",
        "TX",
        "UT",
        "VA",
        "VI",
        "VT",
        "WA",
        "WI",
        "WV ",
        "WY "]

    const router = useRouter();

    const userId = useSelector((state) => state.userActive?.user?.id)

    const editSupport = useSelector(
        (state) => state?.singleSupport?.singleSupport?.data?.data
    )

    const validate = (values) => {
        const errors = {}

        if (!values.first_name) {
            errors.first_name = 'Please enter first name'
        }

        return errors
    }

    const SupportEdit = router.query.edit

    useEffect(() => {
        if (SupportEdit) {
            console.log(SupportEdit)
            setNotes([...editSupport.notes])
            singleSupport()
        } else {
            router.push('/support/form')
        }

    }, [editSupport])




    const SupportFormik = useFormik({
        initialValues: {
            author: '' + userId,

            first_name: editSupport?.first_name && SupportEdit ? editSupport?.first_name : '',

            last_name: editSupport?.last_name && SupportEdit ? editSupport?.last_name : '',

            primary_title: editSupport?.primary_title && SupportEdit ? editSupport?.primary_title : '',

            street_address: editSupport?.street_address && SupportEdit ? editSupport?.street_address : '',

            street_address_2: editSupport?.street_address_2 && SupportEdit ? editSupport?.street_address_2 : '',

            state: editSupport?.state && SupportEdit ? editSupport?.state : 'SC',

            zip_code: editSupport?.zip_code && SupportEdit ? editSupport?.zip_code : '',

            city: editSupport?.city && SupportEdit ? editSupport?.city : '',

            primary_phone: editSupport?.primary_phone && SupportEdit ? editSupport?.primary_phone : '',

            primary_phone_type: editSupport?.primary_phone_type && SupportEdit ? editSupport?.primary_phone_type : 'Mobile',

            secondary_phone: editSupport?.secondary_phone && SupportEdit ? editSupport?.secondary_phone : '',

            secondary_phone_type: editSupport?.secondary_phone_type && SupportEdit ? editSupport?.secondary_phone_type : 'Mobile',

            primary_email: editSupport?.primary_email && SupportEdit ? editSupport?.primary_email : '',

            secondary_email: editSupport?.secondary_email && SupportEdit ? editSupport?.secondary_email : '',

            notes: []
        },
        validate,
        onSubmit: async (value) => {
            try {
                if (SupportEdit === 'true') {
                    setSubmitLoader(true)
                    console.log(value, 'this is edit data')
                    let ValueSupportID = editSupport.ID

                    value.userId = ValueSupportID

                    const respon = await updateSupportTeamAPI(value)

                    console.log(respon)

                    const Notedata = {
                        user_id: ValueSupportID,
                        author: userId,
                        notes: value.notes
                    }

                    if (Notedata.notes.length > 0) {
                        const responNotes = await createNotesSupportTeamAPI(Notedata)
                    }

                    //  go to datails 

                    let singleID = { userId: ValueSupportID }

                    dispatch(singleSupport(singleID))

                    toast.success(respon.data.message)

                    router.push('/support/details')

                    setSubmitLoader(false)
                } else {
                    setSubmitLoader(true)
                    console.log(value)
                    const respon = await createSupportTeamAPI(value)
                    toast.success(respon.data.message)
                    console.log(respon.data)
                    const SupportID = respon.data.data.user_id

                    console.log(SupportID)

                    const Notedata = {
                        user_id: '' + SupportID,
                        author: '' + userId,
                        notes: value.notes
                    }

                    if (Notedata.notes.length > 0) {
                        const responNotes = await createNotesSupportTeamAPI(Notedata)
                    }

                    router.push('/support/list')
                    setSubmitLoader(false)
                }
            } catch (err) { console.log(err) }
        }
    })

    useEffect(() => {
        if (SupportFormik.values.primary_phone_type === 'Custom') {
            setCustom('primary_phone_type')
        }

        if (SupportFormik.values.secondary_phone_type === 'Custom') {
            setCustom('secondary_phone_type')
        }
    }, [
        SupportFormik.values.primary_phone_type,
        SupportFormik.values.secondary_phone_type,
    ])

    // delete functions
    const DeleteNotes = (id, type) => {
        setDeleteID(id)
        setDeleteType(type)
        setShowNotesPopup(true)
    }

    // delete local 
    const deleteNotes = (indexDelete) => {
        const notes = SupportFormik.values.notes.filter(
            (item, index) => index !== indexDelete
        )
        SupportFormik.setFieldValue('notes', [...notes])
        toast.success('Notes deleted Successfully')
        setShowNotesPopup(false)
    }


    // APIS delete notes
    const deleteNotesapi = async (id) => {
        try {
            const data = {
                note_ids: [id]
            }
            await deleteNotesSupportTeamAPI(data)
            const notes = notesApi.filter((item) => item.note_id !== id)
            console.log(notes)
            toast.success('Notes deleted Successfully')
            setShowNotesPopup(false)
            setNotes([...notes])
        } catch (error) { console.log(error, 'notes apis error'); }
    }



    return (
        <div className='form_app pb-[70px]'>

            {SupportEdit ? <SubHeader Subtitle={'Edit Support Person'} backUrl={'/support/details'} />
                : <SubHeader Subtitle={'Add Support Person'} backUrl={'/support/list'} />}


            <div className='form mb-[70px]'>

                <div className="grid grid-cols-1 gap-1 mt-6 px-4">
                    <div>
                        <div className="pb-4">
                            <span className="text-[20px] Oswald-font font-normal text-black">
                                Contact Info
                            </span>
                            <hr className="border-t-2" />
                        </div>
                        <Input
                            Required={true}
                            label={'First Name'}
                            name={'first_name'}
                            placeholder={'First Name'}
                            formik={SupportFormik}
                            validation={SupportFormik.errors.first_name}
                        />
                    </div>


                    <div>
                        <label className="text-[12px] font-normal text-[#262626] ">
                            Last Name
                        </label>
                        <Input
                            name={'last_name'}
                            placeholder={'Last Name'}
                            formik={SupportFormik}
                        />
                    </div>
                    <div>
                        <label className="text-[12px] font-normal text-[#262626]">
                            Title / Position
                        </label>
                        <Input
                            name={'primary_title'}
                            placeholder={'Title / Position'}
                            formik={SupportFormik} 
                        />
                    </div>
                    <div>
                        <label className="text-[12px] font-normal text-[#262626] ">
                            Street Address 1
                        </label>
                        <Input
                            name={'street_address'}
                            placeholder={'Street Address 1'}
                            formik={SupportFormik}
                        />
                    </div>
                    <div>
                        <label className="text-[12px] font-normal text-[#262626] ">
                            Street Address 2
                        </label>
                        <Input
                            name={'street_address_2'}
                            placeholder={'Street Address 2'}
                            formik={SupportFormik}
                        />
                    </div>
                </div>

                <div className="flex gap-2 mt-2 px-4">


                    <div className='w-[40%] '>
                        <Input
                            label={'City'}
                            name={'city'}
                            placeholder={'City'}
                            formik={SupportFormik}
                        />
                    </div>
                    <div className='w-[20%]'>
                        <Select
                            label={'state'}
                            name={'state'}
                            formik={SupportFormik}
                            option={listState}
                        />
                    </div>
                    <div className='w-[40%]'>
                        <Input
                            label={'Zip Code'}
                            name={'zip_code'}
                            placeholder={'Zip Code'}
                            formik={SupportFormik}
                        />
                    </div>
                </div>

                <div className="grid gap-2 mt-2 px-4">
                    <div className="flex gap-1">
                        <div className="w-[60%]">

                            <PhoneInput
                                label={'Primary Phone'}
                                name={'primary_phone'}
                                placeholder={'Primary Phone'}
                                formik={SupportFormik}
                            />
                        </div>

                        <div className="w-[40%]">
                            <Select
                                label={'Phone type'}
                                name={'primary_phone_type'}
                                formik={SupportFormik}
                                option={[
                                    'Mobile',
                                    'Work',
                                    'Office',
                                    'Work fax',
                                    'Other',
                                    'Custom'
                                ]}
                            />
                        </div>
                    </div>

                    <div className="flex gap-1">
                        <div className="w-[60%]">
                            <PhoneInput
                                label={'Secondary Phone'}
                                name={'secondary_phone'}
                                placeholder={'Secondary Phone'}
                                formik={SupportFormik}
                            />
                        </div>

                        <div className="w-[40%]">
                            <Select
                                label={'Phone type'}
                                name={'secondary_phone_type'}
                                formik={SupportFormik}
                                option={[
                                    'Mobile',
                                    'Work',
                                    'Office',
                                    'Work fax',
                                    'Other',
                                    'Custom'
                                ]}
                            />
                        </div>
                    </div>
                </div>

                <Customtype
                    custom_name={custom}
                    Formik={SupportFormik}
                    custom_value={SupportFormik.values[custom]}
                    datashow={custom ? 'block' : 'hidden'}
                    onClicked={() => setCustom(false)}
                />

                <div className="grid grid-cols-1 gap-1 mt-2 px-4">
                    <div>
                        <Input
                            label={'Primary Email'}
                            name={'primary_email'}
                            placeholder={'Enter Primary Email'}
                            formik={SupportFormik}
                        />
                    </div>

                    <div>
                        <Input
                            label={'Secondary Email'}
                            name={'secondary_email'}
                            placeholder={'Enter Secondary Email'}
                            formik={SupportFormik}
                        />
                    </div>
                </div>
                <div className='my-4 mx-4'>

                    <div className="pb-4">
                        <span className="text-[20px] Oswald-font font-normal text-black">
                            Notes
                        </span>
                        <hr className="border-t-2" />
                    </div>

                    <AddNotes formik={SupportFormik} />


                    {SupportFormik?.values?.notes?.length > 0 &&
                        SupportFormik?.values?.notes?.map((item, index) => (


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
                                        setEditNote(item)
                                        setIndex(index)
                                        setShowEditNotesPopup(true)
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
                                        setEditNote(item)
                                        setIndex(index)
                                        setShowEditNotesPopup(true)
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
                                        DeleteNotes(item?.note_id, 'deleteNotesAPIS')
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
                            formik={SupportFormik}
                            detail={editNote}
                            index={index}
                            SupportID={editSupport}
                        />
                    )}

                    <DeleteNotesPopup
                        deleteNote={() => {
                            if (deleteType === 'deleteNotes') {
                                deleteNotes(deleteID)
                            } else (
                                deleteNotesapi(deleteID)
                            )
                        }}
                        datashow={showNotesPopup ? 'block' : 'hidden'}
                        onClicked={() => setShowNotesPopup(false)}
                    />



                </div>
            </div>


            <div className="fixed bottom-0 left-0 w-full shadow-[1px_-10px_13px_2px_#0000000d] ">
                <div className="grid grid-cols-2 w-full bg-[#fff] h-[70px]">
                    <div className="flex justify-center">
                        <div className="w-full flex justify-center">
                            {submitLoader ?
                                <span className="text-white px-4 py-2 w-full mx-auto bg-blue-300 text-center" >
                                    <div className="animate-spin inline-block  w-[15px] h-[15px] rounded-full border-[2px] border-r-white" >
                                    </div>
                                </span>

                                :
                                <button
                                    type="submit"
                                    className="text-[#262626] font-normal text-[22px] px-4 py-2 w-full mx-auto bg-[#4DE060]"
                                    onClick={() => SupportFormik.handleSubmit()}
                                >
                                    {SupportEdit ? 'Update' : 'Save'}
                                </button>
                            }
                        </div>
                    </div>
                    <Link
                        href={SupportEdit ? '/support/details' : '/support/list'}>
                        <div className="flex justify-center">
                            <div className="px-4 py-2 w-full mx-auto  bg-[#CCD9E6] flex justify-center items-center ">
                                <span className="text-[22px] font-normal text-[#262626]">Cancel</span>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>



        </div>
    )
}

export default SupportADD_EDIT