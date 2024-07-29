import { getAllScheduleTaskAPI } from '../APIS/API'
import { GET_TASK, GET_TASK_LOADING } from './type'

export const getAllTask = (id) => {
   return async (dispatch) => {
      try {

         dispatch({ type: GET_TASK_LOADING })

         const respon = await getAllScheduleTaskAPI({
            id: id, 
            current_date: format(
               new Date(),
               'dd-MM-yyyy'
            )
         })

         dispatch(setAllTAsk(respon))
      } catch (error) {
         console.log(error)
      }
   }
}

export const setAllTAsk = (data) => ({
   type: GET_TASK,
   payload: {
      data
   }
})
