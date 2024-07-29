import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react'
import { useState, useEffect } from 'react'
import AddPhoto from '../../../components/public-com/form/addDocs';
import SubHeader from '../../../components/public-com/header'
import { IoTrashOutline } from 'react-icons/io5'
import Input from '../../../components/public-com/form/Input';
import { useFormik } from 'formik';
import { toast } from 'react-hot-toast';
import DeletePhotoPopup from '../../../components/tenants/details/deletePhotopopup';
import { createProjectRequest, deleteTenantsPhotoAPI, updateProjectRequest, addDocsAPIS } from '../../../redux/APIS/API';
import { useDispatch, useSelector } from 'react-redux';
import { getTenantsUserDetails } from '../../../redux/action/tenantsuserDetails';
import PreViewPDF from '../../../components/tenants/details/PreViewPDF';
import TanantsLightbox from '../../../components/tenants/details/lightbox';


function Form() {

    const [Loader, setLoader] = useState(false);
    const [deleteType, setDeleteType] = useState('')
    const [deleteID, setDeleteID] = useState(true)
    const [photosApi, setPhotosApi] = useState([])
    const [lightBox, setLightBox] = useState(false)
    const [imageSrc, setImageSrc] = useState(true)
    const [pdfUrl, setPdfUrl] = useState('')
    const [showPDFPreview, setShowPDFPreview] = useState(false)
    const [showDeletePhotosPopup, setShowDeletePhotosPopup] = useState(false)

    const item = useSelector((state) => state?.tenantsUserDetails?.tenantsUserDetails?.data)

    // console.log(item, 'edititem')

    const userId = useSelector((state) => state?.userActive?.user?.id)

    const dispatch = useDispatch();

    const OpenLight = (img) => {
        setImageSrc(img)
        setLightBox(true)
    }

    function onClickPreview(value) {
        setPdfUrl(value)
        setShowPDFPreview(true)
    }


    const router = useRouter();

    const { edit } = router.query

    useEffect(() => {
        if (edit) {
            // console.log(edit, 'params')
            setPhotosApi([...item.photos])
        } else {
            router.push('/tenant/project_request/form')
        }

    }, [edit])


    const validate = (values) => {
        const errors = {}

        if (!values.project_name) {
            errors.project_name = 'Please enter Project Name'
        }

        return errors
    }


    const TenantsUserFormik = useFormik({
        initialValues: {
            project_name: item?.project_name && edit ? item?.project_name : '',
            project_date: item?.project_date && edit ? item?.project_date : '',
            project_detail: item?.project_detail && edit ? item?.project_detail : '',
            services: item?.services && edit ? item?.services : 'Oakland',
            status: item?.status && edit ? item?.status : "Progress",
            author: " ",
            photos: {
                localImage: [],
                detail: ''
            }
        },
        validate,
        onSubmit: async (values) => {
            try {
                if (edit === 'true') {
                    setLoader(true)
                    values.project_id = '' + item?.ID

                    // console.log(values, 'values values values')
                    const res = await updateProjectRequest(values)

                    // console.log(res, 'res values')
                    const projectID = item?.ID

                    if (Object.keys(values?.photos)?.length > 0) {
                        var formdata = new FormData();

                        for (var i = 0; i < values?.photos?.localImage.length; i++) {
                            const imageFile = values?.photos?.localImage[i];
                            formdata.append("upload_media[]", imageFile.image, imageFile.image.name);
                        }

                        formdata.append("user_post_id", projectID);
                        formdata.append("author", userId);
                        formdata.append("detail", values?.photos?.detail ? values?.photos?.detail : '');
                        formdata.append("upload_for", 'post');

                        const addpoes = await addDocsAPIS(formdata);
                    }


                    let data = { project_id: item?.ID }

                    dispatch(getTenantsUserDetails(data))
                    toast.success('Project Request Update Successfully')
                    router.push('/tenant/project_request/details')
                    setLoader(false)
                } else {
                    setLoader(true)

                    // console.log(values, 'values')

                    const res = await createProjectRequest(values)

                    // console.log(res, 'res values')


                    if (Object.keys(values?.photos)?.length > 0) {
                        var formdata = new FormData();

                        for (var i = 0; i < values?.photos?.localImage.length; i++) {
                            const imageFile = values?.photos?.localImage[i];
                            formdata.append("upload_media[]", imageFile.image, imageFile.image.name);
                        }

                        formdata.append("user_post_id", res?.data?.data?.project_id);
                        formdata.append("author", userId);
                        formdata.append("detail", values?.photos?.detail ? values?.photos?.detail : '');
                        formdata.append("upload_for", 'post');

                        const addpoes = await addDocsAPIS(formdata);
                    }

                    toast.success('Project Request Created Successfully')

                    router.push('/tenant/project_request/')

                    setLoader(false)
                }
            } catch (err) {
                console.log(err, 'err')
            }


        }
    })




    const DeletePopupOpen = (id, type, DataType) => {
        if (DataType === 'photos') {
            setDeleteID(id)
            setDeleteType(type)
            setShowDeletePhotosPopup(true)
        }
    }

    const deletePhoto = (indexDelete) => {
        const currentPhotos = TenantsUserFormik.values.photos.localImage;

        if (indexDelete >= 0 && indexDelete < currentPhotos.length) {
            const updatedPhotos = currentPhotos.filter((item, index) => index !== indexDelete);
            TenantsUserFormik.setFieldValue('photos', { ...TenantsUserFormik.values.photos, localImage: updatedPhotos });

            toast.success('Photo deleted Successfully');
        } else {
            // console.log('Invalid index to delete');
        }

        setShowDeletePhotosPopup(false);
    };

    // APIS delete Photo
    const deletePhotoapi = async (id) => {
        try {
            const data = {
                photo_ids: [id]
            }
            await deleteTenantsPhotoAPI(data)
            const photos = photosApi.filter((item) => item.photo_id !== id)
            toast.success('Photo deleted Successfully')
            setShowDeletePhotosPopup(false)
            setPhotosApi([...photos])
        } catch (error) { }
    }

    return (
        <div>
            <SubHeader title={edit ? 'Edit Project Requests' : 'Project Requests'}
                backUrl={edit ? '/tenant/project_request/details' : '/tenant/project_request'} />







            <div className="px-4 pb-16 pt-6 ">
                <div>
                    <div>
                        <div className="pb-4">
                            <span className="text-[20px] font-normal text-[#262626] Oswald-font ">
                                Project Info
                            </span>
                            <hr className="my-1 border-t-2" />
                        </div>
        
                        <div className="grid grid-cols-1 gap-2">
                            <Input
                                Required={true}
                                label={'Project Name'}
                                name={'project_name'}
                                placeholder={'Project Name'}
                                formik={TenantsUserFormik}
                                validation={TenantsUserFormik.errors.project_name}
                            />

                            <div className="flex w-[70%]">
                                <div>
                                    <Input
                                        label={'Project Date'}
                                        name={'project_date'}
                                        placeholder={'Project Date'}
                                        type={'date'}
                                        formik={TenantsUserFormik}
                                    />
                                </div>
                            </div>

                            <div className="flex ">
                                <div className='w-full'>
                                    <label className="text-[12px] text-gray-500">
                                        Project Details
                                    </label>
                                    <textarea
                                        name="project_detail"
                                        id="project_detail"
                                        placeholder="Enter project details"
                                        onChange={TenantsUserFormik.handleChange}
                                        value={TenantsUserFormik.values.project_detail}
                                        rows="4"
                                        className="font-normal not-italic h-[98px] w-full text-[16px] py-[6px] px-[5px] rounded-[6px]
                                              bg-[#FFF] text-[#000] border-[0.5px] border-solid border-[#A6A6A6] focus:border-black focus:outline-none"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center">
                                <div className='w-full'>
                                    <Input
                                        label={'Service / Industry'}
                                        placeholder={'Service / Industry'}
                                        name={'services'}
                                        formik={TenantsUserFormik}
                                    />

                                </div>
                            </div>
                            <div className="pb-4">
                                <span className="text-[20px] font-normal text-[#262626] Oswald-font">
                                    Photos / Documents
                                </span>
                                <hr className="my-1 border-t-2" />
                            </div>

                            <div className='flex justify-end'>
                                <AddPhoto btnName={'Add Files'} formik={TenantsUserFormik} />
                            </div>


                            <div className="grid mt-[2px] grid-cols-3 gap-x-[10px] gap-y-[15px] mb-[15px]">

                                {TenantsUserFormik?.values?.photos?.localImage.map((item, index) =>

                                    <div
                                        key={index}
                                        className="h-[107px] w-[109px] shadow-sm rounded-md group relative "
                                    >

                                        {item.image.type.includes("image") ?
                                            <img src={
                                                URL.createObjectURL(item?.image)
                                            } alt={'Photo'}
                                                onClick={() => OpenLight(URL.createObjectURL(item.image))}
                                                className='w-full object-cover  rounded-md object-center h-full'
                                            /> :
                                            <img
                                                src={'/assetes/icon/rectangle.svg'}
                                                onClick={() => onClickPreview(URL.createObjectURL(item?.image))}
                                                className='w-full object-cover  rounded-md object-center h-full' alt=""
                                            />}

                                        <div
                                            className="absolute bg-white shadow-lg top-1 right-1 rounded-[10px] w-[40px] h-[40px] text-center"
                                            onClick={() =>
                                                DeletePopupOpen(index, 'deletePhoto', 'photos')
                                            }
                                        >
                                            <IoTrashOutline className="text-[25px] text-red-500 mt-[7px] ml-[8px] " />
                                        </div>

                                    </div>)}
                                    
                                {photosApi?.length > 0 &&
                                    photosApi?.map((item, index) => (
                                        <div
                                            key={index}
                                            className="h-[107px] w-[109px] shadow-sm rounded-md group relative "
                                        >
                                            {item?.photo_src?.includes('pdf') ?
                                                <img
                                                    src={'/assetes/icon/rectangle.svg'}
                                                    onClick={() => onClickPreview(item?.photo_src)}
                                                    className='w-full object-cover  rounded-md object-center h-full' alt=""
                                                /> :
                                                <img src={item?.photo_src} alt={'Photo'}
                                                    onClick={() => OpenLight(item?.photo_src)}
                                                    className='w-full object-cover  rounded-md object-center h-full'
                                                />
                                            }

                                            <div
                                                className="absolute bg-white shadow-lg top-1 right-1 rounded-[10px] w-[30px] h-[30px] text-center"
                                                onClick={() =>
                                                    DeletePopupOpen(item.photo_id, 'deletePhotoAPI', 'photos')
                                                }
                                            >
                                                <IoTrashOutline className="text-[20px] text-red-500 mt-[5px] ml-[5px] " />
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>

                        {lightBox && (
                            <TanantsLightbox
                                src={imageSrc}
                                datashow={lightBox ? 'block' : 'hidden'}
                                close={() => setLightBox(false)}
                            />
                        )}

                        {showPDFPreview &&
                            <PreViewPDF
                                datashow={showPDFPreview}
                                onClick={() => setShowPDFPreview(false)}
                                PDFURL={pdfUrl}
                            />
                        }



                        {showDeletePhotosPopup &&
                            <DeletePhotoPopup
                                deletePhoto={() => {
                                    if (deleteType === 'deletePhoto') {
                                        deletePhoto(deleteID)
                                    } else {
                                        deletePhotoapi(deleteID)
                                    }
                                }}
                                datashow={showDeletePhotosPopup ? 'block' : 'hidden'}
                                onClicked={() => setShowDeletePhotosPopup(false)}
                            />}
                    </div>
                </div>
            </div>



            <div className="fixed bottom-0 left-0 w-full shadow-[1px_-10px_13px_2px_#0000000d] ">
                <div className="grid grid-cols-2 w-full bg-[#fff] ">
                    {Loader ? (
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
                                    onClick={() => TenantsUserFormik.handleSubmit()}
                                    className="px-4 py-2 w-full mx-auto text-[22px] font-normal text-[#262626] bg-[#4DE060]"
                                >
                                    {edit ? 'Update' : 'Save'}

                                </button>
                            </div>
                        </div>
                    )}


                    <Link href={edit ? "/tenant/project_request/details" : "/tenant/project_request"}>
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

export default Form