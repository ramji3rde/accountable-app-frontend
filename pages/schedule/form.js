import React from 'react'
import Link from 'next/link'
import SubHeader from '../../components/public-com/header'
import Input from '../../components/schedule/form/Input'
import { useFormik } from 'formik'
import Select from '../../components/schedule/form/Select'
import { useDispatch, useSelector } from 'react-redux'
import { createScheduleAPI, updateScheduleAPI } from '../../redux/APIS/API'
import { format } from 'date-fns'
import toast from 'react-hot-toast'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { getSchedule } from '../../redux/action/scheduleFilter'
import { singleSchedule } from '../../redux/action/singleSchedule'

export default function Form() {

    const router = useRouter()
    const dispatch = useDispatch()
    const { edit, groupId } = router.query


    const userId = useSelector((state) => state.userActive?.user?.id)

    const editSchedule = useSelector((state) => state?.singleSchedule?.singleSchedule?.data)

    const validate = (values) => {
        const errors = {}

        if (!values.schedule_period.length) {
            errors.schedule_period = 'Please enter Schedule Period'
        }

        if (!values.group_name) {
            errors.group_name = 'Please enter Group Name'
        }

        return errors
    }



    const ScheduleFormik = useFormik({
        initialValues: {
            author: '' + userId,
            group_name: editSchedule?.group_name && edit
                ? editSchedule?.group_name : '',
            schedule_period: editSchedule?.schedule_period && edit
                ? editSchedule?.schedule_period : '1',
        },
        validate,
        onSubmit: async (value) => {
            try {
                if (edit) {

                    let updateData = {
                        task_groups: [{
                            group_id: groupId,
                            group_name: value.group_name,
                            schedule_period: value.schedule_period
                        }]
                    }
                    const respon = await updateScheduleAPI(updateData)
                    console.log(respon.data)
                    toast.success(respon.data.message)
                    dispatch(singleSchedule({
                        group_id: groupId, current_date: format(
                            new Date(),
                            'dd-MM-yyyy'
                        )
                    }))
                    router.push(`/schedule/details?groupId=${groupId}`)
                } else {
                    const respon = await createScheduleAPI(value)
                    console.log(respon, 'schedule data')
                    toast.success(respon.data.message)
                    router.push(`/schedule/add_task?groupId=${respon?.data?.data?.schedule_group_id}`)
                }
            } catch (err) {
                console.log(err)
            }
        }

    })


    return (
        <div>

            {/* <header className="z-50 bg-[#fff] pt-2 shadow-[0px_1px_12px_3px_#0000000d] overflow-scroll "> */}
            <SubHeader
                title={edit ? 'Edit Task Group' : 'Add Task Group'}
                backUrl={edit ? '/schedule/details' : '/schedule/list'} />
            {/* </header> */}

            <div>
                <div>
                    <p className='text-[16px] font-normal text-[#262626] px-4 mt-5 mb-4'>Create a group to keep all of your to-do tasks organized by time period.</p>
                </div>
                <div className="grid grid-cols-1 gap-2  px-4">
                    <span className='text-[12px] font-normal text-[#262626] '>Enter task group name</span>
                    <div className=' '>
                        <Input
                            name={'group_name'}
                            placeholder={'Enter Task Group Name'}
                            formik={ScheduleFormik}
                            validation={ScheduleFormik.errors.group_name}
                        />
                        {ScheduleFormik.errors.group_name && (
                            <span className="text-red-400 font-normal text-[16px]">
                                {ScheduleFormik.errors.group_name}
                            </span>
                        )}
                    </div>

                    <div>
                        <span className='text-[12px] font-normal text-[#262626]'>Select a time period</span>
                        <select
                            name='schedule_period'
                            id='schedule_period'
                            onChange={ScheduleFormik.handleChange}
                            value={ScheduleFormik.values.schedule_period}
                            className={`  ${ScheduleFormik.errors.schedule_period ? 'border-red-500 focus:border-red-500' : 'border-inputBorderColor'} 
                            font-normal w-full text-[16px] py-[5px] px-[5px] rounded-[6px] h-[35px]
                        bg-[#FFF] text-theme border-[0.5px] border-[#A6A6A6] border-solid focus:border-theme focus:outline-none `}
                        >
                            <option value="1">Daily</option>
                            <option value="2">Weekly</option>
                            <option value="3">Monthly</option>
                            <option value="4">Quarterly</option>
                            <option value="5">Semi-annally</option>
                            <option value="6">Yearly</option>
                        </select>

                        {ScheduleFormik.errors.schedule_period && (
                            <span className="text-red-500 font-medium text-[12px]">
                                {ScheduleFormik.errors.schedule_period}
                            </span>
                        )}
                    </div>
                </div>



            </div>


            <div className="fixed bottom-0 left-0 w-full shadow-[1px_-10px_13px_2px_#0000000d] ">
                <div className="grid grid-cols-2 w-full bg-[#fff] h-[70px] ">
                    <div className="flex justify-center">
                        <div className="w-full flex justify-center">
                            <button
                                type="submit"
                                className="text-[#262626] font-normal text-[22px] px-4 py-2 w-full mx-auto bg-[#4DE060]"
                                onClick={() => ScheduleFormik.handleSubmit()}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                    <Link href={edit ? `/schedule/details?groupId=${groupId}` : "/schedule/list"}>
                        <div className="flex justify-center items-center bg-[#CCD9E6]">
                            <div className="px-4 py-2 w-full  mx-auto flex justify-center  ">
                                <span className="text-[#262626] font-normal text-[22px]">Cancel</span>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>





        </div>
    )
}