import { getAllIncidentsAPI } from "../APIS/API";
import { GET_INCIDENTS , GET_INCIDENTS_LOADING} from "./type";



export const getIncidents = (data) => {
    return async dispatch => {
        try {
            dispatch({type : GET_INCIDENTS_LOADING})

            const res  = await getAllIncidentsAPI(data)

            dispatch(setContractor(res.data.data))

        } catch (error) {
            
        }
    }
}

const setContractor = (data) => ({
   type: GET_INCIDENTS,
   payload: {
    data,
    clientName: 'Incidents',
   }
})