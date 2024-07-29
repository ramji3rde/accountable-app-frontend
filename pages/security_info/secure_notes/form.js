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
import { reactLocalStorage } from 'reactjs-localstorage';
import { createSecureNotesAPI, deleteNoteAPI, updateSecureNotesAPI, createNoteAPI } from '../../../redux/APIS/API';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { getSingleSecureNotes } from '../../../redux/action/secureNoteSingle';
import { useSelector } from 'react-redux'; 


function SecureNotesForm() {

    const [submitLoader, setSubmitLoader] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [deleteNoteID, setDeleteNoteID] = useState(false)
    const [deleteNoteType, setDeleteNoteType] = useState(false)
    const [showNotesDeletePopup, setShowNotesDeletePopup] = useState(false)
    const [showEditNotesPopup, setShowEditNotesPopup] = useState(false)
    const [detail, setDetail] = useState(false)
    const [index, setIndex] = useState(false) 
    const [notesApi, setNotesApi] = useState([])


    const getMasterPassword = reactLocalStorage.get('masterPassword')

    const router = useRouter();


    const editSecure = useSelector((state) => state?.secureNotesDetails?.secureNotesDetails?.data)

    const SecureEditMode = router.query.edit

    const dispatch = useDispatch()

    useEffect(() => {

        if (editSecure == null) {

            router.push('/security_info/secure_notes/form')

        } else if (SecureEditMode && editSecure) {

            setNotesApi([...editSecure?.notes])

        } else {
            router.push('/security_info/secure_notes/form')
        }

    }, [editSecure])


    const validate = (values) => {
        const errors = {}

        if (!values.url) {
            errors.url = 'Please Enter Url'
        } else if (!/^(https?:\/\/)?([\w.-]+)(\.[a-z]{2,})(:\d{1,5})?([\/?#].*)?$/i.test(values.url)) {
            errors.url = 'Please Enter Valid Url'
        }

        return errors
    }


    // formik form handling
    const SecureNotesFormik = useFormik({
        initialValues: {
            category: editSecure?.type && SecureEditMode ? editSecure?.type : 'Login Notes',
            name: editSecure?.item_name && SecureEditMode ? editSecure?.item_name : '',
            username: editSecure?.username && SecureEditMode ? editSecure?.username : '',
            password: editSecure?.password && SecureEditMode ? editSecure?.password : '',
            url: editSecure?.account_url && SecureEditMode ? editSecure?.account_url : '',
            group: editSecure?.group && SecureEditMode ? editSecure?.group : '',
            notes: [],
        },
        validate,
        onSubmit: async (value, { resetForm }) => {
            if (SecureEditMode) {
                setSubmitLoader(true)

                let updateData =
                {
                    "fname": value.name,
                    "username": value.username,
                    'password': value.password,
                    'account_url': value.url,
                    'group': value.group,
                    'category': value.category,
                    "master_password": getMasterPassword,
                    "id": editSecure?.id

                }

                const res = await updateSecureNotesAPI(updateData)


                const Notedata = {
                    post_id: '' + editSecure?.id,
                    author: 1,
                    notes: value.notes
                }

                if (Notedata.notes.length > 0) {
                    const responNotes = await createNoteAPI(Notedata)
                }

                if (res.data.success) {
                    dispatch(getSingleSecureNotes(editSecure?.id))
                    toast.success("Update Secure Notes successfully")
                    router.push('/security_info/secure_notes/detail')
                    resetForm()

                } else {
                    router.push('/security_info/secure_notes')
                    toast.error("Secure Notes Not Update Try Later")
                    resetForm()

                }


                setSubmitLoader(false)
            } else {
                try {
                    setSubmitLoader(true)

                    value.master_password = getMasterPassword

                    const res = await createSecureNotesAPI(value)

                    console.log(res, 'res res create');

                    const sucureCreateId = res?.data?.data?.note_id

                    const Notedata = {
                        post_id: '' + sucureCreateId,
                        author: 1,
                        notes: value.notes
                    }

                    if (Notedata.notes.length > 0) {
                        const responNotes = await createNoteAPI(Notedata)
                    }

                    if (res?.data?.success) {
                        toast.success('Create Secure Notes SuccessFully')
                        router.push('/security_info/secure_notes')
                    } else {
                        toast.error('Secure Notes Not Create, Try again Later')
                    }

                    setSubmitLoader(false)
                } catch (err) {
                    console.log(err, 'err')
                }
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
        const notes = SecureNotesFormik.values.notes.filter(
            (item, index) => index !== indexDelete
        )
        SecureNotesFormik.setFieldValue('notes', [...notes])
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

            <SubHeader title={SecureEditMode ? 'Edit Item' : "Add Item "}
                backUrl={SecureEditMode ? '/security_info/secure_notes/detail' : '/security_info/secure_notes'} />

            <div className="px-4 pb-32 pt-6 ">
                <div className="grid gap-2">

                    <Select
                        Required={true}
                        label={'What type of item?'}
                        name='category' 
                        formik={SecureNotesFormik}
                        option={[
                            {
                                name: 'Login',
                                value: 'Login Notes'
                            },
                            {
                                name: 'Secure Note',
                                value: 'Secure Notes'
                            }]}
                    />



                    <Input
                        Required={true}
                        label={'Name'}
                        name='name'
                        placeholder={'Name'}
                        formik={SecureNotesFormik}
                    />

                    {SecureNotesFormik.values.category == 'Login Notes' &&
                        <>
                            <Input
                                label={'Username'}
                                name='username'
                                placeholder={'Username'}
                                formik={SecureNotesFormik}
                            />


                            <Input
                                label={'Password'}
                                name='password'
                                placeholder={'Password'}
                                type={'password'}
                                formik={SecureNotesFormik}
                                eyeToggle={() => setShowPassword(!showPassword)}
                                toggleValue={showPassword}
                            />


                            <Input
                                label={'URI (Link to account)'}
                                name='url'
                                placeholder={'https://example.com'}
                                formik={SecureNotesFormik}
                                validation={SecureNotesFormik.errors.url}
                            />

                            {/* {SecureNotesFormik.errors.url && */}
                            <p className="text-[12px] font-normal text-[#262626]">
                                The correct format of the url should be like this https://example.com </p>
                            {/* } */}


                        </>
                    }
                    <Input
                        label={'Group'}
                        name='group'
                        type={'url'}
                        placeholder={'Enter custom group name'}
                        formik={SecureNotesFormik}
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

                    <AddNotes formik={SecureNotesFormik} />






                    {/* local */}
                    {SecureNotesFormik?.values?.notes?.length > 0 &&
                        SecureNotesFormik?.values?.notes?.map((item, index) => (
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
                            formik={SecureNotesFormik}
                            detail={detail}
                            index={index}
                            EditId={editSecure?.id}
                            clientName={'secure_notes'}
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
                                    onClick={() => SecureNotesFormik.handleSubmit()}
                                    className="px-4 py-2 w-full mx-auto text-[22px] font-normal text-[#262626] bg-[#4DE060]"
                                >Save</button>
                            </div>
                        </div>
                    )}


                    <Link href={SecureEditMode ? '/security_info/secure_notes/detail' : '/security_info/secure_notes'}>
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

export default SecureNotesForm