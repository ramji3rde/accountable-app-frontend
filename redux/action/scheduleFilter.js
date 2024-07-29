import { filterScheduleAPI } from "../APIS/API"
import { FILTER_SCHEDULE, FILTER_SCHEDULE_LOADING } from "./type"



export const getSchedule = (data) => {
    return async dispatch => {
        try {

            dispatch({ type: FILTER_SCHEDULE_LOADING })

            const respon = await filterScheduleAPI(data)

            dispatch(setProjects(respon.data))


        } catch (error) {
            console.log(error)
        }
    }
}

const setProjects = data => ({
    type: FILTER_SCHEDULE,
    payload: {
        data,
        clientName: 'Schedule',
    },
})