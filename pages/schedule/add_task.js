import React from 'react'
import Link from 'next/link'
import SubHeader from '../../components/public-com/header'
import Input from '../../components/schedule/form/Input'
import { useFormik } from 'formik'
import Select from '../../components/schedule/form/Select'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { createScheduleTaskAPI } from '../../redux/APIS/API'
import { useDispatch } from 'react-redux'
import { singleSchedule } from '../../redux/action/singleSchedule'
import { format } from 'date-fns'
export default function AddTask() {

    const router = useRouter();
    const userId = useSelector((state) => state.userActive?.user?.id)

    const dispatch = useDispatch();

    const { groupId } = router.query

    const validate = (values) => {
        const errors = {}

        if (!values.schedule_name) {
            errors.schedule_name = 'Please Enter Schedule Name'
        }

        return errors
    }

    const ScheduleFormik = useFormik({


        initialValues: {
            author: '' + userId,
            schedule_name: '',
        },
        validate,
        onSubmit: async (value) => {
            try {
                value.group_id = groupId
                const respon = await createScheduleTaskAPI(value)
                console.log(respon, 'data here')
                dispatch(singleSchedule({ group_id: groupId }))
                router.push(`/schedule/details?groupId=${groupId}`)
            } catch (err) {
                console.log(err)
            }
        }

    })


    return (
        <div>

            {/* <header className="z-50 bg-[#fff] pt-2 shadow-[0px_1px_12px_3px_#0000000d] overflow-scroll "> */}
            <SubHeader title={'Add Task'} backUrl={'/schedule/details'} />
            {/* </header> */}

            <div>
                <div className='mt-[30px] mb-4 px-4'>
                    <p className='text-[16px] font-normal text-[#262626] not-italic'>Add a to-do item to your checklist</p>
                </div>
                <div className="grid grid-cols-1 gap-1 px-4">
                    <span className='text-[12px] font-normal text-[#262626] '>Enter task </span>
                    <div className='mb-4 '>
                        <Input
                            name={'schedule_name'}
                            placeholder={'Enter task'}
                            formik={ScheduleFormik}
                            validation={ScheduleFormik.errors.schedule_name}
                        />

                        {ScheduleFormik.errors.schedule_name && (
                            <span className="text-red-400 font-normal text-[16px]">
                                {ScheduleFormik.errors.schedule_name}
                            </span>
                        )}
                    </div>
                </div>


            </div>


            <div className="fixed bottom-0 left-0 w-full shadow-[1px_-10px_13px_2px_#0000000d]">
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
                    <Link href="/schedule/list">
                        <div className="flex justify-center items-center bg-[#CCD9E6]">
                            <div className="px-4 py-2 w-full  mx-auto flex justify-center ">
                                <span className="text-[#262626] font-normal text-[22px]">Cancel</span>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>


        </div>
    )
}