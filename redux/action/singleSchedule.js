import { SINGLE_SCHEDULE_LOADING, SINGLE_SCHEDULE } from "./type"
import { getAllScheduleTaskAPI } from '../APIS/API'



export const singleSchedule = (item, callback = () => { }) => {
    return async dispatch => {
        try {

            dispatch({ type: SINGLE_SCHEDULE_LOADING })

            const respon = await getAllScheduleTaskAPI(item)
       
            dispatch(setSingleSchedule(respon.data))

            callback()

        } catch (err) { console.log(err, 'single Schedule') }
    }
}

const setSingleSchedule = data => ({
    type: SINGLE_SCHEDULE,
    payload: {
        data,
    },
})